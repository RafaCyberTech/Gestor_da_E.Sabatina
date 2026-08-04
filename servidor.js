// Servidor da aplicação "Sistema de Gestão da Escola Sabatina".
// Serve os ficheiros estáticos (HTML/CSS/JS) e uma API JSON com dados
// partilhados numa base de dados SQLite, para que várias pessoas em
// vários dispositivos vejam sempre a mesma informação.
//
// Não usa nenhuma dependência externa (sem npm install necessário):
// usa apenas módulos nativos do Node.js 22+ (http, crypto, node:sqlite).

const [MAJOR, MINOR] = process.versions.node.split(".").map(Number);
if (MAJOR < 22 || (MAJOR === 22 && MINOR < 5)) {
  console.error(
    `\nEste servidor precisa do Node.js 22.5 ou mais recente (usa o módulo nativo node:sqlite).\n` +
      `Versão instalada: ${process.versions.node}.\n` +
      `Actualize o Node.js e tente novamente.\n`
  );
  process.exit(1);
}

const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { DatabaseSync } = require("node:sqlite");

const root = __dirname;
const port = process.env.PORT || 4173;
const host = process.env.HOST || "0.0.0.0";
const DB_PATH = process.env.DB_PATH || path.join(root, "data", "escola-sabatina.db");
const BACKUP_DIR = process.env.BACKUP_DIR || path.join(root, "data", "backups");
const SESSION_DAYS = 30;
const BACKUP_INTERVAL_HOURS = Number(process.env.BACKUP_INTERVAL_HOURS || 6);
const BACKUP_KEEP = Number(process.env.BACKUP_KEEP || 28); // ~1 semana ao ritmo de 6/6h

fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
const db = new DatabaseSync(DB_PATH);

// ---------------------------------------------------------------------------
// Esquema da base de dados
// ---------------------------------------------------------------------------
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    salt TEXT NOT NULL,
    role TEXT NOT NULL,
    name TEXT NOT NULL,
    member_id TEXT
  );

  CREATE TABLE IF NOT EXISTS sessions (
    token TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    expires_at INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS app_data (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    json TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS login_attempts (
    username TEXT PRIMARY KEY,
    failed_count INTEGER NOT NULL DEFAULT 0,
    locked_until INTEGER
  );
`);

// ---------------------------------------------------------------------------
// Dados iniciais (usados apenas na primeira execução, quando a base de
// dados está vazia)
// ---------------------------------------------------------------------------
function localISODate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
function todayISO(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return localISODate(d);
}
function defaultAppData() {
  return {
    settings: { attendanceWeight: 50, lessonWeight: 30, participationWeight: 20 },
    classes: [
      { id: "classe-01-adultos", name: "Classe 01-Adultos" },
      { id: "classe-02-adultos", name: "Classe 02-Adultos" },
      { id: "classe-03-adultos", name: "Classe 03-Adultos" },
      { id: "classe-04-adultos", name: "Classe 04-Adultos" },
      { id: "classe-05-adultos", name: "Classe 05-Adultos" },
      { id: "pos-batismal", name: "Pos-Batismal" },
      { id: "batismal", name: "Batismal" },
      { id: "juvenis", name: "Juvenis" },
      { id: "primarios", name: "Primarios" },
      { id: "jardim-de-infancia", name: "Jardim de infancia" },
      { id: "rol-de-berco", name: "Rol de Berco" },
      { id: "adolescentes", name: "Adolescentes" },
    ],
    members: [],
    attendance: [],
    lessons: [],
    quarterlyRequests: [],
    weeklyReports: [],
    programs: [],
    messages: [],
  };
}

// Senha inicial da conta DIRECAO (a mesma que já vinha antes). Só é usada
// para criar a conta na primeira execução, quando a base de dados ainda
// não tem nenhum utilizador. Mude-a logo a seguir em Minha Conta.
const INITIAL_DIRECAO_PASSWORD = "@Direcao26";

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
// Protecção contra tentativas de login por força bruta
// ---------------------------------------------------------------------------
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutos

function getLoginAttempt(username) {
  return db.prepare("SELECT * FROM login_attempts WHERE username = ?").get(username);
}
function isLockedOut(username) {
  const row = getLoginAttempt(username);
  return !!(row && row.locked_until && row.locked_until > Date.now());
}
function registerFailedLogin(username) {
  const row = getLoginAttempt(username);
  const count = (row?.failed_count || 0) + 1;
  const lockedUntil = count >= MAX_FAILED_ATTEMPTS ? Date.now() + LOCKOUT_MS : null;
  db.prepare(
    `INSERT INTO login_attempts (username, failed_count, locked_until) VALUES (?, ?, ?)
     ON CONFLICT(username) DO UPDATE SET failed_count = excluded.failed_count, locked_until = excluded.locked_until`
  ).run(username, count, lockedUntil);
}
function clearLoginAttempts(username) {
  db.prepare("DELETE FROM login_attempts WHERE username = ?").run(username);
}

// ---------------------------------------------------------------------------
// Cópias de segurança automáticas da base de dados
// ---------------------------------------------------------------------------
function runBackup() {
  try {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    const dest = path.join(BACKUP_DIR, `escola-sabatina-${stamp}.db`);
    db.exec(`VACUUM INTO '${dest.replace(/'/g, "''")}'`);
    const files = fs
      .readdirSync(BACKUP_DIR)
      .filter((f) => f.endsWith(".db"))
      .sort();
    while (files.length > BACKUP_KEEP) {
      fs.unlinkSync(path.join(BACKUP_DIR, files.shift()));
    }
    console.log(`Cópia de segurança criada: ${dest}`);
  } catch (err) {
    console.error("Falha ao criar cópia de segurança:", err.message);
  }
}

function seedIfEmpty() {
  const row = db.prepare("SELECT COUNT(*) as count FROM app_data").get();
  if (row.count === 0) {
    db.prepare("INSERT INTO app_data (id, json) VALUES (1, ?)").run(JSON.stringify(defaultAppData()));
  }
  const userCount = db.prepare("SELECT COUNT(*) as count FROM users").get().count;
  if (userCount === 0) {
    // Cria apenas a conta inicial da direcção, para poder entrar pela
    // primeira vez e começar a cadastrar membros (que geram as suas
    // próprias contas automaticamente — ver rota /api/accounts).
    const id = "u0";
    const { hash, salt } = hashPassword(INITIAL_DIRECAO_PASSWORD);
    db.prepare(
      "INSERT INTO users (id, username, password_hash, salt, role, name, member_id) VALUES (?, ?, ?, ?, 'secretary', ?, ?)"
    ).run(id, "DIRECAO", hash, salt, "Direção", null);
    console.log("Conta inicial criada: DIRECAO / " + INITIAL_DIRECAO_PASSWORD);
    console.log("IMPORTANTE: mude esta senha assim que entrar (menu Minha Conta).");
  }
}
seedIfEmpty();
runBackup();
setInterval(runBackup, BACKUP_INTERVAL_HOURS * 60 * 60 * 1000);

function getAppData() {
  const row = db.prepare("SELECT json FROM app_data WHERE id = 1").get();
  return JSON.parse(row.json);
}
function setAppData(data) {
  db.prepare("UPDATE app_data SET json = ? WHERE id = 1").run(JSON.stringify(data));
}

function sanitizeUser(row) {
  if (!row) return null;
  return { id: row.id, username: row.username, role: row.role, name: row.name, memberId: row.member_id };
}

function createSession(userId) {
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  db.prepare("INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)").run(token, userId, expiresAt);
  return token;
}

function getUserByToken(token) {
  if (!token) return null;
  const session = db.prepare("SELECT * FROM sessions WHERE token = ?").get(token);
  if (!session) return null;
  if (session.expires_at < Date.now()) {
    db.prepare("DELETE FROM sessions WHERE token = ?").run(token);
    return null;
  }
  return db.prepare("SELECT * FROM users WHERE id = ?").get(session.user_id) || null;
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

function readJSONBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    let size = 0;
    const MAX = 2 * 1024 * 1024; // 2MB é mais do que suficiente para este uso
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX) {
        reject(new Error("payload too large"));
        req.destroy();
        return;
      }
      data += chunk;
    });
    req.on("end", () => {
      if (!data) return resolve({});
      try {
        resolve(JSON.parse(data));
      } catch (err) {
        reject(err);
      }
    });
    req.on("error", reject);
  });
}

function authenticate(req) {
  const header = req.headers["authorization"] || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  return getUserByToken(token);
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
// Rotas da API
// ---------------------------------------------------------------------------
const SHARED_KEYS = ["settings", "classes", "members", "attendance", "lessons", "quarterlyRequests", "weeklyReports", "programs"];

async function handleApi(req, res, urlPath) {
  const parts = urlPath.split("/").filter(Boolean); // ["api", ...]

  // POST /api/auth/login
  if (req.method === "POST" && urlPath === "/api/auth/login") {
    const body = await readJSONBody(req);
    const username = String(body.username || "").trim();
    const password = String(body.password || "");

    if (isLockedOut(username)) {
      return sendJSON(res, 429, { error: "Demasiadas tentativas falhadas. Tente novamente dentro de 15 minutos." });
    }

    const row = db.prepare("SELECT * FROM users WHERE username = ?").get(username);
    if (!row || !verifyPassword(password, row.salt, row.password_hash)) {
      registerFailedLogin(username);
      return sendJSON(res, 401, { error: "Utilizador ou senha inválidos." });
    }
    clearLoginAttempts(username);
    const token = createSession(row.id);
    return sendJSON(res, 200, { token, user: sanitizeUser(row) });
  }

  // A partir daqui, todas as rotas precisam de autenticação
  const user = authenticate(req);

  if (req.method === "POST" && urlPath === "/api/auth/logout") {
    const header = req.headers["authorization"] || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (token) db.prepare("DELETE FROM sessions WHERE token = ?").run(token);
    return sendJSON(res, 200, { ok: true });
  }

  if (!user) return sendJSON(res, 401, { error: "Sessão inválida. Inicie sessão novamente." });

  if (req.method === "GET" && urlPath === "/api/auth/me") {
    return sendJSON(res, 200, { user: sanitizeUser(user) });
  }

  // Mudar a própria senha (exige a senha actual)
  if (req.method === "POST" && urlPath === "/api/auth/password") {
    const body = await readJSONBody(req);
    const currentPassword = String(body.currentPassword || "");
    const newPassword = String(body.newPassword || "");
    if (newPassword.length < 6) return sendJSON(res, 400, { error: "A nova senha deve ter pelo menos 6 caracteres." });
    if (!verifyPassword(currentPassword, user.salt, user.password_hash)) {
      return sendJSON(res, 401, { error: "A senha actual está incorrecta." });
    }
    const { hash, salt } = hashPassword(newPassword);
    db.prepare("UPDATE users SET password_hash = ?, salt = ? WHERE id = ?").run(hash, salt, user.id);
    return sendJSON(res, 200, { ok: true });
  }

  // Repor a senha de outra conta — só a direcção, sem precisar da senha antiga
  if (req.method === "POST" && parts[1] === "accounts" && parts[2] && parts[3] === "password") {
    if (user.role !== "secretary") return sendJSON(res, 403, { error: "Só a direcção pode repor senhas." });
    const targetId = parts[2];
    const body = await readJSONBody(req);
    const newPassword = String(body.newPassword || "");
    if (newPassword.length < 6) return sendJSON(res, 400, { error: "A nova senha deve ter pelo menos 6 caracteres." });
    const target = db.prepare("SELECT id FROM users WHERE id = ?").get(targetId);
    if (!target) return sendJSON(res, 404, { error: "Conta não encontrada." });
    const { hash, salt } = hashPassword(newPassword);
    db.prepare("UPDATE users SET password_hash = ?, salt = ? WHERE id = ?").run(hash, salt, targetId);
    return sendJSON(res, 200, { ok: true });
  }

  // Listar contas (id, username, nome, papel) — só a direcção, para poder repor senhas
  if (req.method === "GET" && urlPath === "/api/accounts") {
    if (user.role !== "secretary") return sendJSON(res, 403, { error: "Só a direcção pode ver as contas." });
    const rows = db.prepare("SELECT id, username, role, name, member_id FROM users ORDER BY name").all();
    return sendJSON(res, 200, { accounts: rows.map(sanitizeUser) });
  }

  if (req.method === "GET" && urlPath === "/api/state") {
    return sendJSON(res, 200, getAppData());
  }

  if (req.method === "POST" && urlPath === "/api/state") {
    if (user.role !== "secretary") return sendJSON(res, 403, { error: "Só a direcção pode alterar estes dados." });
    const body = await readJSONBody(req);
    const current = getAppData();
    const next = { ...current };
    for (const key of SHARED_KEYS) {
      if (body[key] !== undefined) next[key] = body[key];
    }
    setAppData(next);
    return sendJSON(res, 200, next);
  }

  // Mensagens: qualquer utilizador autenticado pode enviar; só a direcção
  // ou o autor (se for membro) pode remover.
  if (req.method === "POST" && urlPath === "/api/messages") {
    const body = await readJSONBody(req);
    const data = getAppData();
    const target = body.target || "all";
    const recipientMemberId = body.recipientMemberId || null;
    const recipientMember = recipientMemberId ? data.members.find((m) => m.id === recipientMemberId) || null : null;
    if (target === "member" && !recipientMember) {
      return sendJSON(res, 400, { error: "Escolha um membro específico para receber a mensagem." });
    }
    const message = {
      id: `msg_${crypto.randomBytes(6).toString("hex")}`,
      createdAt: new Date().toISOString(),
      from: user.name,
      fromRole: user.role,
      target,
      recipientMemberId: target === "member" ? recipientMemberId : null,
      recipientName: target === "member" ? recipientMember?.name || null : null,
      subject: String(body.subject || "").trim(),
      body: String(body.body || "").trim(),
      read: false,
    };
    data.messages.push(message);
    setAppData(data);
    return sendJSON(res, 200, { messages: data.messages });
  }

  if (req.method === "DELETE" && parts[1] === "messages" && parts[2]) {
    const id = parts[2];
    const data = getAppData();
    const message = data.messages.find((m) => m.id === id);
    if (!message) return sendJSON(res, 404, { error: "Mensagem não encontrada." });
    const canDelete = user.role === "secretary" || (message.fromRole === "member" && message.from === user.name);
    if (!canDelete) return sendJSON(res, 403, { error: "Só pode remover a sua própria mensagem." });
    data.messages = data.messages.filter((m) => m.id !== id);
    setAppData(data);
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
    const exists = db.prepare("SELECT 1 FROM users WHERE username = ?").get(username);
    if (exists) return sendJSON(res, 409, { error: "Esse nome de utilizador já existe." });
    const id = `u_${crypto.randomBytes(6).toString("hex")}`;
    const { hash, salt } = hashPassword(password);
    db.prepare(
      "INSERT INTO users (id, username, password_hash, salt, role, name, member_id) VALUES (?, ?, ?, ?, 'member', ?, ?)"
    ).run(id, username, hash, salt, name, memberId);
    return sendJSON(res, 200, { user: sanitizeUser({ id, username, role: "member", name, member_id: memberId }) });
  }

  if (req.method === "DELETE" && parts[1] === "accounts" && parts[2] === "member" && parts[3]) {
    if (user.role !== "secretary") return sendJSON(res, 403, { error: "Só a direcção pode remover contas." });
    const memberId = parts[3];
    const rows = db.prepare("SELECT id FROM users WHERE member_id = ?").all(memberId);
    for (const r of rows) {
      db.prepare("DELETE FROM sessions WHERE user_id = ?").run(r.id);
      db.prepare("DELETE FROM users WHERE id = ?").run(r.id);
    }
    return sendJSON(res, 200, { ok: true });
  }

  return sendJSON(res, 404, { error: "Rota não encontrada." });
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

server.listen(port, host, () => {
  console.log(`Servidor em http://${host}:${port}`);
});
