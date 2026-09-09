// Servidor da aplicação "Sistema de Gestão da Escola Sabatina".
// Serve os ficheiros estáticos (HTML/CSS/JS) e uma API JSON com dados
// partilhados numa base de dados Postgres (Supabase), para que várias
// pessoas em vários dispositivos vejam sempre a mesma informação.
//
// Dependências: apenas "pg" (npm install pg). O resto usa só módulos
// nativos do Node.js (http, crypto).

const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { Pool } = require("pg");

const root = __dirname;
const port = process.env.PORT || 4173;
const host = process.env.HOST || "0.0.0.0";
const SESSION_DAYS = 30;

if (!process.env.DATABASE_URL) {
  console.error(
    "\nFalta a variável de ambiente DATABASE_URL (connection string do Supabase).\n" +
      "Defina-a antes de arrancar o servidor, ex:\n" +
      '  DATABASE_URL="postgresql://postgres:...@db.xxxx.supabase.co:5432/postgres" node servidor.js\n'
  );
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // necessário para ligar ao Supabase
});

// ---------------------------------------------------------------------------
// Dados iniciais (usados apenas na primeira execução, quando a base de
// dados ainda não tem nenhum utilizador)
// ---------------------------------------------------------------------------
function todayISO(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

// Converte um valor de data devolvido pelo pg (Date object ou string) para
// "YYYY-MM-DD", ou null.
function dateStr(value) {
  if (!value) return null;
  if (typeof value === "string") return value.slice(0, 10);
  return value.toISOString().slice(0, 10);
}

// Senha inicial da conta DIRECAO (a mesma que já vinha antes). Só é usada
// para criar a conta na primeira execução, quando a base de dados ainda
// não tem nenhum utilizador. Mude-a logo a seguir em Minha Conta.
const INITIAL_DIRECAO_PASSWORD = process.env.INITIAL_DIRECAO_PASSWORD || "@Direcao26";

function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return { hash, salt };
}

function verifyPassword(password, salt, expectedHash) {
  const { hash } = hashPassword(password, salt);
  const a = Buffer.from(hash, "hex");
  const b = Buffer.from(expectedHash, "hex");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

// ---------------------------------------------------------------------------
// Semear a conta inicial da direcção, se ainda não existir nenhum utilizador
// (o schema das tabelas já foi criado à mão no SQL Editor do Supabase)
// ---------------------------------------------------------------------------
async function seedIfEmpty() {
  const { rows } = await pool.query("SELECT COUNT(*)::int AS count FROM users");
  if (rows[0].count === 0) {
    const id = "u0";
    const { hash, salt } = hashPassword(INITIAL_DIRECAO_PASSWORD);
    await pool.query(
      `INSERT INTO users (id, username, password_hash, salt, role, name, member_id)
       VALUES ($1, 'DIRECAO', $2, $3, 'secretary', 'Direção', NULL)`,
      [id, hash, salt]
    );
    console.log("Conta inicial criada: DIRECAO / " + INITIAL_DIRECAO_PASSWORD);
    console.log("IMPORTANTE: mude esta senha assim que entrar (menu Minha Conta).");
  }
}

// ---------------------------------------------------------------------------
// Leitura/escrita dos dados partilhados (agora em tabelas normalizadas,
// em vez de um único blob JSON)
// ---------------------------------------------------------------------------
async function getAppData() {
  const settingsRes = await pool.query(
    "SELECT attendance_weight, lesson_weight, participation_weight FROM settings WHERE id = 1"
  );
  const settings = settingsRes.rows[0]
    ? {
        attendanceWeight: settingsRes.rows[0].attendance_weight,
        lessonWeight: settingsRes.rows[0].lesson_weight,
        participationWeight: settingsRes.rows[0].participation_weight,
      }
    : { attendanceWeight: 50, lessonWeight: 30, participationWeight: 20 };

  const classesRes = await pool.query("SELECT id, name FROM classes ORDER BY name");
  const classes = classesRes.rows;

  const membersRes = await pool.query(
    `SELECT id, name, contact, class_id AS "classId", joined_at, active FROM members`
  );
  const members = membersRes.rows.map((m) => ({
    id: m.id,
    name: m.name,
    contact: m.contact,
    classId: m.classId,
    joinedAt: dateStr(m.joined_at),
    active: m.active,
  }));

  const attendanceRes = await pool.query(
    `SELECT id, date, class_id AS "classId", visitor_count, note FROM attendance`
  );
  const entriesRes = await pool.query(
    `SELECT attendance_id, member_id AS "memberId", status FROM attendance_entries`
  );
  const entriesByAttendance = {};
  for (const e of entriesRes.rows) {
    (entriesByAttendance[e.attendance_id] ||= []).push({ memberId: e.memberId, status: e.status });
  }
  const attendance = attendanceRes.rows.map((a) => ({
    id: a.id,
    date: dateStr(a.date),
    classId: a.classId,
    visitorCount: a.visitor_count,
    note: a.note,
    entries: entriesByAttendance[a.id] || [],
  }));

  const lessonsRes = await pool.query(
    `SELECT id, date, quarter, class_id AS "classId", topic, leader FROM lessons`
  );
  const lessons = lessonsRes.rows.map((l) => ({ ...l, date: dateStr(l.date) }));

  const requestsRes = await pool.query(
    `SELECT id, quarter, class_id AS "classId", quantity, status, created_at FROM quarterly_requests`
  );
  const quarterlyRequests = requestsRes.rows.map((r) => ({
    id: r.id,
    quarter: r.quarter,
    classId: r.classId,
    quantity: r.quantity,
    status: r.status,
    createdAt: dateStr(r.created_at),
  }));

  const programsRes = await pool.query(
    `SELECT id, date, order_num AS "order", time, activity, responsible, note, class_id AS "classId" FROM programs`
  );
  const programs = programsRes.rows.map((p) => ({ ...p, date: dateStr(p.date) }));

  const reportsRes = await pool.query(`SELECT id, date FROM weekly_reports`);
  const reportClassesRes = await pool.query(
    `SELECT report_id, class_id AS "classId", enrolled, present, visits,
            studied_lesson AS "studiedLesson", offering, baptized
     FROM weekly_report_classes`
  );
  const classesByReport = {};
  for (const rc of reportClassesRes.rows) {
    (classesByReport[rc.report_id] ||= []).push({
      classId: rc.classId,
      enrolled: rc.enrolled,
      present: rc.present,
      visits: rc.visits,
      studiedLesson: rc.studiedLesson,
      offering: Number(rc.offering),
      baptized: rc.baptized,
    });
  }
  const weeklyReports = reportsRes.rows.map((r) => ({
    id: r.id,
    date: dateStr(r.date),
    classes: classesByReport[r.id] || [],
  }));

  // sender_user_id é a fonte de verdade para permissões; o nome é só apresentação.
  const messagesRes = await pool.query(
    `SELECT id, created_at, from_name AS "from", from_role AS "fromRole", sender_user_id AS "senderUserId", target,
            recipient_member_id AS "recipientMemberId", recipient_name AS "recipientName",
            subject, body, read
     FROM messages ORDER BY created_at DESC`
  );
  const messages = messagesRes.rows.map((m) => ({ ...m, createdAt: m.created_at.toISOString() }));

  return { settings, classes, members, attendance, lessons, quarterlyRequests, weeklyReports, programs, messages };
}

// Aplica uma actualização "em bloco" a uma ou mais das chaves partilhadas.
// Mantém o mesmo comportamento que a versão anterior (substituição total de
// cada lista enviada), mas agora grava em tabelas relacionais em vez de um
// blob JSON — cada chave é apagada e reinserida dentro de uma transacção.
const SHARED_KEYS = ["settings", "classes", "members", "attendance", "lessons", "quarterlyRequests", "weeklyReports", "programs"];

async function setAppData(next) {
  // Cada coleção recebida substitui a coleção inteira dentro desta transação.
  // Não altere esta ordem sem rever as dependências entre as tabelas.
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    if (next.settings) {
      await client.query(
        `UPDATE settings SET attendance_weight = $1, lesson_weight = $2, participation_weight = $3 WHERE id = 1`,
        [next.settings.attendanceWeight, next.settings.lessonWeight, next.settings.participationWeight]
      );
    }

    if (next.classes) {
      await client.query("DELETE FROM classes");
      for (const c of next.classes) {
        await client.query("INSERT INTO classes (id, name) VALUES ($1, $2)", [c.id, c.name]);
      }
    }

    if (next.members) {
      await client.query("DELETE FROM members");
      for (const m of next.members) {
        await client.query(
          `INSERT INTO members (id, name, contact, class_id, joined_at, active) VALUES ($1, $2, $3, $4, $5, $6)`,
          [m.id, m.name, m.contact || null, m.classId || null, m.joinedAt || null, m.active]
        );
      }
    }

    if (next.attendance) {
      await client.query("DELETE FROM attendance"); // cascata apaga attendance_entries também
      for (const a of next.attendance) {
        await client.query(
          `INSERT INTO attendance (id, date, class_id, visitor_count, note) VALUES ($1, $2, $3, $4, $5)`,
          [a.id, a.date, a.classId, a.visitorCount || 0, a.note || null]
        );
        for (const e of a.entries || []) {
          await client.query(
            `INSERT INTO attendance_entries (attendance_id, member_id, status) VALUES ($1, $2, $3)`,
            [a.id, e.memberId, e.status]
          );
        }
      }
    }

    if (next.lessons) {
      await client.query("DELETE FROM lessons");
      for (const l of next.lessons) {
        await client.query(
          `INSERT INTO lessons (id, date, quarter, class_id, topic, leader) VALUES ($1, $2, $3, $4, $5, $6)`,
          [l.id, l.date || null, l.quarter || null, l.classId || null, l.topic || null, l.leader || null]
        );
      }
    }

    if (next.quarterlyRequests) {
      await client.query("DELETE FROM quarterly_requests");
      for (const r of next.quarterlyRequests) {
        await client.query(
          `INSERT INTO quarterly_requests (id, quarter, class_id, quantity, status, created_at)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [r.id, r.quarter || null, r.classId || null, r.quantity || 0, r.status || null, r.createdAt || null]
        );
      }
    }

    if (next.programs) {
      await client.query("DELETE FROM programs");
      for (const p of next.programs) {
        await client.query(
          `INSERT INTO programs (id, date, order_num, time, activity, responsible, note, class_id)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [p.id, p.date || null, p.order || 1, p.time || null, p.activity || null, p.responsible || null, p.note || null, p.classId || null]
        );
      }
    }

    if (next.weeklyReports) {
      await client.query("DELETE FROM weekly_reports"); // cascata apaga weekly_report_classes também
      for (const r of next.weeklyReports) {
        await client.query(`INSERT INTO weekly_reports (id, date) VALUES ($1, $2)`, [r.id, r.date]);
        for (const c of r.classes || []) {
          await client.query(
            `INSERT INTO weekly_report_classes
               (report_id, class_id, enrolled, present, visits, studied_lesson, offering, baptized)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [r.id, c.classId, c.enrolled || 0, c.present || 0, c.visits || 0, c.studiedLesson || 0, c.offering || 0, c.baptized || 0]
          );
        }
      }
    }

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

function sanitizeUser(row) {
  if (!row) return null;
  return { id: row.id, username: row.username, role: row.role, name: row.name, memberId: row.member_id };
}

async function createSession(userId) {
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  await pool.query("INSERT INTO sessions (token, user_id, expires_at) VALUES ($1, $2, $3)", [token, userId, expiresAt]);
  return token;
}

async function getUserByToken(token) {
  if (!token) return null;
  const { rows } = await pool.query("SELECT * FROM sessions WHERE token = $1", [token]);
  const session = rows[0];
  if (!session) return null;
  if (Number(session.expires_at) < Date.now()) {
    await pool.query("DELETE FROM sessions WHERE token = $1", [token]);
    return null;
  }
  const userRes = await pool.query("SELECT * FROM users WHERE id = $1", [session.user_id]);
  return userRes.rows[0] || null;
}

// ---------------------------------------------------------------------------
// Protecção contra tentativas de login por força bruta
// ---------------------------------------------------------------------------
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutos

async function getLoginAttempt(username) {
  const { rows } = await pool.query("SELECT * FROM login_attempts WHERE username = $1", [username]);
  return rows[0] || null;
}
async function isLockedOut(username) {
  const row = await getLoginAttempt(username);
  return !!(row && row.locked_until && Number(row.locked_until) > Date.now());
}
async function registerFailedLogin(username) {
  const row = await getLoginAttempt(username);
  const count = (row?.failed_count || 0) + 1;
  const lockedUntil = count >= MAX_FAILED_ATTEMPTS ? Date.now() + LOCKOUT_MS : null;
  await pool.query(
    `INSERT INTO login_attempts (username, failed_count, locked_until) VALUES ($1, $2, $3)
     ON CONFLICT (username) DO UPDATE SET failed_count = EXCLUDED.failed_count, locked_until = EXCLUDED.locked_until`,
    [username, count, lockedUntil]
  );
}
async function clearLoginAttempts(username) {
  await pool.query("DELETE FROM login_attempts WHERE username = $1", [username]);
}

// ---------------------------------------------------------------------------
// Utilitários HTTP
// ---------------------------------------------------------------------------
function sendJSON(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
  });
  res.end(body);
}

function readJSONBody(req, maxBytes = 2 * 1024 * 1024) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > maxBytes) {
        reject(new Error("payload too large"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => {
      if (!chunks.length) return resolve({});
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString("utf8")));
      } catch (err) {
        reject(err);
      }
    });
    req.on("error", reject);
  });
}

// Materiais (lições eletrónicas) podem incluir fotos, vídeos e PDFs em
// base64, por isso aceitam um corpo bem maior do que as restantes rotas.
const MATERIAL_MAX_BYTES = 30 * 1024 * 1024; // ~30MB (o base64 acrescenta ~33%)

async function authenticate(req) {
  const header = req.headers["authorization"] || "";
  let token = header.startsWith("Bearer ") ? header.slice(7) : null;
  // Pedidos de navegação directa (ex: abrir um material num separador novo)
  // não conseguem enviar o cabeçalho Authorization, por isso aceitamos
  // também o token por query string só para esse caso.
  if (!token) {
    const queryToken = new URL(req.url, "http://localhost").searchParams.get("token");
    if (queryToken) token = queryToken;
  }
  return getUserByToken(token);
}

// ---------------------------------------------------------------------------
// Rotas da API
// ---------------------------------------------------------------------------
async function handleApi(req, res, urlPath) {
  const parts = urlPath.split("/").filter(Boolean); // ["api", ...]

  if (req.method === "POST" && urlPath === "/api/auth/login") {
    const body = await readJSONBody(req);
    const username = String(body.username || "").trim();
    const password = String(body.password || "");

    if (await isLockedOut(username)) {
      return sendJSON(res, 429, { error: "Demasiadas tentativas falhadas. Tente novamente dentro de 15 minutos." });
    }

    const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    const row = rows[0];
    if (!row || !verifyPassword(password, row.salt, row.password_hash)) {
      await registerFailedLogin(username);
      return sendJSON(res, 401, { error: "Utilizador ou senha inválidos." });
    }
    await clearLoginAttempts(username);
    const token = await createSession(row.id);
    return sendJSON(res, 200, { token, user: sanitizeUser(row) });
  }

  const user = await authenticate(req);

  if (req.method === "POST" && urlPath === "/api/auth/logout") {
    const header = req.headers["authorization"] || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (token) await pool.query("DELETE FROM sessions WHERE token = $1", [token]);
    return sendJSON(res, 200, { ok: true });
  }

  if (!user) return sendJSON(res, 401, { error: "Sessão inválida. Inicie sessão novamente." });

  if (req.method === "GET" && urlPath === "/api/auth/me") {
    return sendJSON(res, 200, { user: sanitizeUser(user) });
  }

  if (req.method === "POST" && urlPath === "/api/auth/password") {
    const body = await readJSONBody(req);
    const currentPassword = String(body.currentPassword || "");
    const newPassword = String(body.newPassword || "");
    if (newPassword.length < 6) return sendJSON(res, 400, { error: "A nova senha deve ter pelo menos 6 caracteres." });
    if (!verifyPassword(currentPassword, user.salt, user.password_hash)) {
      return sendJSON(res, 401, { error: "A senha actual está incorrecta." });
    }
    const { hash, salt } = hashPassword(newPassword);
    await pool.query("UPDATE users SET password_hash = $1, salt = $2 WHERE id = $3", [hash, salt, user.id]);
    return sendJSON(res, 200, { ok: true });
  }

  // Repor a senha de outra conta — só a direcção, sem precisar da senha antiga
  if (req.method === "POST" && parts[1] === "accounts" && parts[2] && parts[3] === "password") {
    if (user.role !== "secretary") return sendJSON(res, 403, { error: "Só a direcção pode repor senhas." });
    const targetId = parts[2];
    const body = await readJSONBody(req);
    const newPassword = String(body.newPassword || "");
    if (newPassword.length < 6) return sendJSON(res, 400, { error: "A nova senha deve ter pelo menos 6 caracteres." });
    const targetRes = await pool.query("SELECT id FROM users WHERE id = $1", [targetId]);
    if (!targetRes.rows[0]) return sendJSON(res, 404, { error: "Conta não encontrada." });
    const { hash, salt } = hashPassword(newPassword);
    await pool.query("UPDATE users SET password_hash = $1, salt = $2 WHERE id = $3", [hash, salt, targetId]);
    return sendJSON(res, 200, { ok: true });
  }

  // Listar contas (id, username, nome, papel) — só a direcção, para poder repor senhas
  if (req.method === "GET" && urlPath === "/api/accounts") {
    if (user.role !== "secretary") return sendJSON(res, 403, { error: "Só a direcção pode ver as contas." });
    const { rows } = await pool.query("SELECT id, username, role, name, member_id FROM users ORDER BY name");
    return sendJSON(res, 200, { accounts: rows.map(sanitizeUser) });
  }

  if (req.method === "GET" && urlPath === "/api/state") {
    return sendJSON(res, 200, await getAppData());
  }

  if (req.method === "POST" && urlPath === "/api/state") {
    if (user.role !== "secretary") return sendJSON(res, 403, { error: "Só a direcção pode alterar estes dados." });
    const body = await readJSONBody(req);
    const next = {};
    for (const key of SHARED_KEYS) {
      if (body[key] !== undefined) next[key] = body[key];
    }
    await setAppData(next);
    return sendJSON(res, 200, await getAppData());
  }

  // Mensagens: qualquer utilizador autenticado pode enviar; só a direcção
  // ou o autor (se for membro) pode remover.
  if (req.method === "POST" && urlPath === "/api/messages") {
    const body = await readJSONBody(req);
    const target = body.target || "all";
    const recipientMemberId = body.recipientMemberId || null;
    let recipientName = null;
    if (target === "member") {
      if (!recipientMemberId) return sendJSON(res, 400, { error: "Escolha um membro específico para receber a mensagem." });
      const memberRes = await pool.query("SELECT name FROM members WHERE id = $1", [recipientMemberId]);
      if (!memberRes.rows[0]) return sendJSON(res, 400, { error: "Escolha um membro específico para receber a mensagem." });
      recipientName = memberRes.rows[0].name;
    }
    const id = `msg_${crypto.randomBytes(6).toString("hex")}`;
    await pool.query(
      `INSERT INTO messages (id, from_name, from_role, sender_user_id, target, recipient_member_id, recipient_name, subject, body, read)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, false)`,
      [id, user.name, user.role, user.id, target, target === "member" ? recipientMemberId : null, recipientName, String(body.subject || "").trim(), String(body.body || "").trim()]
    );
    const data = await getAppData();
    return sendJSON(res, 200, { messages: data.messages });
  }

  if (req.method === "DELETE" && parts[1] === "messages" && parts[2]) {
    const id = parts[2];
    const { rows } = await pool.query("SELECT * FROM messages WHERE id = $1", [id]);
    const message = rows[0];
    if (!message) return sendJSON(res, 404, { error: "Mensagem não encontrada." });
    const canDelete = user.role === "secretary" || (message.from_role === "member" && message.sender_user_id === user.id);
    if (!canDelete) return sendJSON(res, 403, { error: "Só pode remover a sua própria mensagem." });
    await pool.query("DELETE FROM messages WHERE id = $1", [id]);
    const data = await getAppData();
    return sendJSON(res, 200, { messages: data.messages });
  }

  // Contas de membros (criar/remover conta associada a um membro) — só a direcção
  if (req.method === "POST" && urlPath === "/api/accounts") {
    if (user.role !== "secretary") return sendJSON(res, 403, { error: "Só a direcção pode criar contas." });
    const body = await readJSONBody(req);
    const username = String(body.username || "").trim().toLowerCase();
    const password = String(body.password || "");
    const name = String(body.name || "").trim();
    const memberId = body.memberId || null;
    if (!username || !password || !name) return sendJSON(res, 400, { error: "Dados em falta para criar a conta." });
    const existsRes = await pool.query("SELECT 1 FROM users WHERE username = $1", [username]);
    if (existsRes.rows[0]) return sendJSON(res, 409, { error: "Esse nome de utilizador já existe." });
    const id = `u_${crypto.randomBytes(6).toString("hex")}`;
    const { hash, salt } = hashPassword(password);
    await pool.query(
      "INSERT INTO users (id, username, password_hash, salt, role, name, member_id) VALUES ($1, $2, $3, $4, 'member', $5, $6)",
      [id, username, hash, salt, name, memberId]
    );
    return sendJSON(res, 200, { user: sanitizeUser({ id, username, role: "member", name, member_id: memberId }) });
  }

  if (req.method === "DELETE" && parts[1] === "accounts" && parts[2] === "member" && parts[3]) {
    if (user.role !== "secretary") return sendJSON(res, 403, { error: "Só a direcção pode remover contas." });
    const memberId = parts[3];
    const { rows } = await pool.query("SELECT id FROM users WHERE member_id = $1", [memberId]);
    for (const r of rows) {
      await pool.query("DELETE FROM sessions WHERE user_id = $1", [r.id]);
      await pool.query("DELETE FROM users WHERE id = $1", [r.id]);
    }
    return sendJSON(res, 200, { ok: true });
  }

  // ---------------------------------------------------------------------
  // Lições eletrónicas (materiais) — a direcção partilha fotos, vídeos,
  // PDFs ou links; todos os utilizadores autenticados podem ver e
  // descarregar. Só a direcção pode publicar ou remover.
  // ---------------------------------------------------------------------

  // Listar materiais (apenas metadados — o ficheiro em si só é enviado
  // quando pedido em /api/materials/:id/file, para a lista carregar rápido)
  if (req.method === "GET" && urlPath === "/api/materials") {
    const { rows } = await pool.query(
      `SELECT id, title, description, quarter, type, file_name AS "fileName",
              mime_type AS "mimeType", url, created_by AS "createdBy", created_at AS "createdAt",
              (file_data IS NOT NULL) AS "hasFile"
       FROM materials ORDER BY created_at DESC`
    );
    return sendJSON(res, 200, { materials: rows.map((r) => ({ ...r, createdAt: r.createdAt.toISOString() })) });
  }

  if (req.method === "POST" && urlPath === "/api/materials") {
    if (user.role !== "secretary") return sendJSON(res, 403, { error: "Só a direcção pode partilhar lições eletrónicas." });
    const body = await readJSONBody(req, MATERIAL_MAX_BYTES);
    const title = String(body.title || "").trim();
    const type = String(body.type || "").trim(); // "foto" | "video" | "pdf" | "link"
    if (!title) return sendJSON(res, 400, { error: "Indique um título para o material." });
    if (!["foto", "video", "pdf", "link"].includes(type)) return sendJSON(res, 400, { error: "Tipo de material inválido." });

    let fileBuffer = null;
    if (body.dataBase64) {
      try {
        fileBuffer = Buffer.from(String(body.dataBase64), "base64");
      } catch {
        return sendJSON(res, 400, { error: "Ficheiro inválido." });
      }
      if (fileBuffer.length > MATERIAL_MAX_BYTES) {
        return sendJSON(res, 413, { error: "Ficheiro demasiado grande (máx. ~22MB)." });
      }
    }
    if (type === "link" && !fileBuffer && !String(body.url || "").trim()) {
      return sendJSON(res, 400, { error: "Indique o link do material." });
    }
    if (["foto", "pdf"].includes(type) && !fileBuffer) {
      return sendJSON(res, 400, { error: "Escolha um ficheiro para enviar." });
    }
    if (type === "video" && !fileBuffer && !String(body.url || "").trim()) {
      return sendJSON(res, 400, { error: "Envie um ficheiro de vídeo ou indique um link (ex: YouTube)." });
    }

    const id = `mat_${crypto.randomBytes(6).toString("hex")}`;
    await pool.query(
      `INSERT INTO materials (id, title, description, quarter, type, file_name, mime_type, file_data, url, created_by, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW())`,
      [
        id,
        title,
        String(body.description || "").trim() || null,
        body.quarter || null,
        type,
        body.fileName || null,
        body.mimeType || null,
        fileBuffer,
        String(body.url || "").trim() || null,
        user.name,
      ]
    );
    const { rows } = await pool.query(
      `SELECT id, title, description, quarter, type, file_name AS "fileName",
              mime_type AS "mimeType", url, created_by AS "createdBy", created_at AS "createdAt",
              (file_data IS NOT NULL) AS "hasFile"
       FROM materials WHERE id = $1`,
      [id]
    );
    return sendJSON(res, 200, { material: { ...rows[0], createdAt: rows[0].createdAt.toISOString() } });
  }

  // Descarregar/ver o ficheiro de um material. Como é um pedido de
  // navegação directa (ex: abrir num separador novo), aceita o token
  // também por query string além do cabeçalho Authorization.
  if (req.method === "GET" && parts[1] === "materials" && parts[2] && parts[3] === "file") {
    const id = parts[2];
    const { rows } = await pool.query("SELECT file_name, mime_type, file_data FROM materials WHERE id = $1", [id]);
    const row = rows[0];
    if (!row || !row.file_data) return sendJSON(res, 404, { error: "Ficheiro não encontrado." });
    res.writeHead(200, {
      "Content-Type": row.mime_type || "application/octet-stream",
      "Content-Length": row.file_data.length,
      "Content-Disposition": `inline; filename="${(row.file_name || "material").replace(/"/g, "")}"`,
      "Cache-Control": "private, max-age=3600",
    });
    return res.end(row.file_data);
  }

  if (req.method === "DELETE" && parts[1] === "materials" && parts[2]) {
    if (user.role !== "secretary") return sendJSON(res, 403, { error: "Só a direcção pode remover materiais." });
    await pool.query("DELETE FROM materials WHERE id = $1", [parts[2]]);
    return sendJSON(res, 200, { ok: true });
  }

  return sendJSON(res, 404, { error: "Rota não encontrada." });
}

// ---------------------------------------------------------------------------
// Ficheiros estáticos
// ---------------------------------------------------------------------------
const staticTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
};

function serveStatic(req, res, urlPath) {
  const decodedPath = decodeURIComponent(urlPath === "/" ? "/index.html" : urlPath);
  const filePath = path.resolve(root, "." + decodedPath);
  const rootAbs = path.resolve(root);
  if (!filePath.startsWith(rootAbs)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    res.writeHead(200, { "Content-Type": staticTypes[path.extname(filePath)] || "application/octet-stream" });
    res.end(data);
  });
}

// ---------------------------------------------------------------------------
// Servidor
// ---------------------------------------------------------------------------
const server = http.createServer((req, res) => {
  const urlPath = req.url.split("?")[0];
  if (urlPath.startsWith("/api/")) {
    handleApi(req, res, urlPath).catch((err) => {
      console.error(err);
      sendJSON(res, 400, { error: "Pedido inválido." });
    });
    return;
  }
  serveStatic(req, res, urlPath);
});

seedIfEmpty()
  .then(() => {
    server.listen(port, host, () => {
      console.log(`Servidor em http://${host}:${port}`);
    });
  })
  .catch((err) => {
    console.error("Falha ao ligar à base de dados Supabase:", err.message);
    process.exit(1);
  });
