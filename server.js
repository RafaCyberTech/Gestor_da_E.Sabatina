// Servidor da aplicação "Sistema de Gestão da Escola Sabatina".
// Serve os ficheiros estáticos (HTML/CSS/JS) e uma API JSON com dados
// partilhados numa base de dados SQLite, para que várias pessoas em
// vários dispositivos vejam sempre a mesma informação.
//
// Não usa nenhuma dependência externa (sem npm install necessário):
// usa apenas módulos nativos do Node.js 22+ (http, crypto, node:sqlite).

const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { DatabaseSync } = require("node:sqlite");

const root = __dirname;
const port = process.env.PORT || 4173;
const host = process.env.HOST || "0.0.0.0";
const DB_PATH = process.env.DB_PATH || path.join(root, "data", "escola-sabatina.db");
const SESSION_DAYS = 30;

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
function currentQuarter() {
  const d = new Date();
  const quarter = Math.floor(d.getMonth() / 3) + 1;
  return `${d.getFullYear()}-T${quarter}`;
}

function defaultAppData() {
  return {
    settings: { attendanceWeight: 50, lessonWeight: 30, participationWeight: 20 },
    classes: [
      { id: "classe-01-adultos", name: "Classe 01-Adultos", leader: "Irm. Responsável" },
      { id: "classe-02-adultos", name: "Classe 02-Adultos", leader: "Irm. Responsável" },
      { id: "classe-03-adultos", name: "Classe 03-Adultos", leader: "Irm. Responsável" },
      { id: "classe-04-adultos", name: "Classe 04-Adultos", leader: "Irm. Responsável" },
      { id: "classe-05-adultos", name: "Classe 05-Adultos", leader: "Irm. Responsável" },
      { id: "pos-batismal", name: "Pos-Batismal", leader: "Irm. Responsável" },
      { id: "batismal", name: "Batismal", leader: "Irm. Responsável" },
      { id: "juvenis", name: "Juvenis", leader: "Irm. Responsavel" },
      { id: "primarios", name: "Primarios", leader: "Irm. Responsável" },
      { id: "jardim-de-infancia", name: "Jardim de infancia", leader: "Irm. Responsável" },
      { id: "rol-de-berco", name: "Rol de Berco", leader: "Irm. Responsável" },
      { id: "adolescentes", name: "Adolescentes", leader: "Irm. Responsável" },
    ],
    members: [
      { id: "m1", name: "Joaquim Paulo", classId: "classe-01-adultos", contact: "+258 82 000 0001", joinedAt: "2025-01-12", active: true },
      { id: "m2", name: "Maria Lúcia", classId: "classe-02-adultos", contact: "+258 82 000 0002", joinedAt: "2025-03-18", active: true },
      { id: "m3", name: "Anselmo Cossa", classId: "primarios", contact: "+258 82 000 0003", joinedAt: "2025-06-02", active: true },
      { id: "m4", name: "Dalma Nhampossa", classId: "adolescentes", contact: "+258 82 000 0004", joinedAt: "2025-07-06", active: true },
      { id: "m5", name: "Hebenezer Paculeque", classId: "pos-batismal", contact: "+258 82 000 0005", joinedAt: "2025-08-10", active: true },
    ],
    attendance: [
      {
        id: "a1",
        date: todayISO(),
        classId: "classe-01-adultos",
        visitorCount: 2,
        note: "Visita de classe 02-Adultos.",
        entries: [{ memberId: "m1", status: "presente" }],
      },
      {
        id: "a2",
        date: todayISO(-7),
        classId: "adolescentes",
        visitorCount: 0,
        note: "",
        entries: [{ memberId: "m4", status: "presente" }],
      },
    ],
    lessons: [
      { id: "l1", date: todayISO(), quarter: currentQuarter(), classId: "classe-01-adultos", topic: "A graça que sustenta a igreja", leader: "Irm. Responsável" },
      { id: "l2", date: todayISO(-7), quarter: currentQuarter(), classId: "adolescentes", topic: "Fé prática para a semana", leader: "Irm. Nelson" },
    ],
    quarterlyRequests: [
      { id: "q1", quarter: currentQuarter(), classId: "classe-01-adultos", quantity: 12, createdAt: todayISO() },
    ],
    weeklyReports: [],
    programs: [],
    messages: [],
  };
}

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

function seedIfEmpty() {
  const row = db.prepare("SELECT COUNT(*) as count FROM app_data").get();
  if (row.count === 0) {
    db.prepare("INSERT INTO app_data (id, json) VALUES (1, ?)").run(JSON.stringify(defaultAppData()));
  }
  const userCount = db.prepare("SELECT COUNT(*) as count FROM users").get().count;
  if (userCount === 0) {
    const demoUsers = [
      { id: "u0", username: "secretario", password: "Direcao26", role: "secretary", name: "Secretário Geral", memberId: null },
      { id: "u1", username: "joaquim", password: "Membro26", role: "member", name: "Joaquim Paulo", memberId: "m1" },
      { id: "u2", username: "maria", password: "Membro26", role: "member", name: "Maria Lúcia", memberId: "m2" },
      { id: "u3", username: "anselmo", password: "Membro26", role: "member", name: "Anselmo Cossa", memberId: "m3" },
      { id: "u4", username: "lurdes", password: "Membro26", role: "member", name: "Lurdes Nhampossa", memberId: "m4" },
      { id: "u5", username: "antonio", password: "Membro26", role: "member", name: "António Mucavele", memberId: "m5" },
    ];
    const insert = db.prepare(
      "INSERT INTO users (id, username, password_hash, salt, role, name, member_id) VALUES (?, ?, ?, ?, ?, ?, ?)"
    );
    for (const u of demoUsers) {
      const { hash, salt } = hashPassword(u.password);
      insert.run(u.id, u.username, hash, salt, u.role, u.name, u.memberId);
    }
    console.log("Contas de demonstração criadas: secretario/Direcao26, joaquim/Membro26, maria/Membro26, anselmo/Membro26, lurdes/Membro26, antonio/Membro26");
    console.log("IMPORTANTE: mude estas senhas antes de usar em produção (ver README.md).");
  }
}
seedIfEmpty();

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
    const row = db.prepare("SELECT * FROM users WHERE username = ?").get(username);
    if (!row || !verifyPassword(password, row.salt, row.password_hash)) {
      return sendJSON(res, 401, { error: "Utilizador ou senha inválidos." });
    }
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
    const message = {
      id: `msg_${crypto.randomBytes(6).toString("hex")}`,
      createdAt: todayISO(),
      from: user.name,
      fromRole: user.role,
      target: body.target || "all",
      classId:
        user.role === "secretary"
          ? body.target === "all"
            ? null
            : body.target
          : user.member_id
          ? data.members.find((m) => m.id === user.member_id)?.classId ?? null
          : null,
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

  // Reset dos dados de demonstração — só a direcção
  if (req.method === "POST" && urlPath === "/api/admin/reset") {
    if (user.role !== "secretary") return sendJSON(res, 403, { error: "Só a direcção pode repor os dados." });
    setAppData(defaultAppData());
    return sendJSON(res, 200, getAppData());
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
