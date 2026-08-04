const LOGO_MAIN = "./logo/logo-main.png";
const LOGO_SECONDARY = "./logo/logo-secondary.png";

// Helper functions - must be defined before seed()
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

function nextSaturdayISO() {
  const d = new Date();
  const day = d.getDay();
  const delta = day === 6 ? 7 : (6 - day + 7) % 7 || 7;
  d.setDate(d.getDate() + delta);
  return localISODate(d);
}

function currentQuarter() {
  const d = new Date();
  const quarter = Math.floor(d.getMonth() / 3) + 1;
  return `${d.getFullYear()}-T${quarter}`;
}

const icon = (name) => {
  const map = {
    home: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 11.5 12 4l9 7.5"/><path d="M5 10.5V20h14v-9.5"/><path d="M9 20v-6h6v6"/></svg>`,
    members: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M20 8v6"/><path d="M23 11h-6"/></svg>`,
    attendance: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8 2v4"/><path d="M16 2v4"/><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18"/><path d="m9 16 2 2 4-5"/></svg>`,
    lessons: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M20 3v18H6.5A2.5 2.5 0 0 0 4 22.5V4A1 1 0 0 1 5 3h15z"/></svg>`,
    requests: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 7h14"/><path d="M7 12h14"/><path d="M7 17h14"/><path d="M3 7h.01"/><path d="M3 12h.01"/><path d="M3 17h.01"/></svg>`,
    program: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8 2v4"/><path d="M16 2v4"/><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/></svg>`,
    ranking: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 3v18h18"/><path d="M7 16v-6"/><path d="M12 16V8"/><path d="M17 16v-3"/></svg>`,
    reports: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h8"/><path d="M8 9h1"/></svg>`,
    messages: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M7 8h10"/><path d="M7 12h7"/></svg>`,
    eye: `<svg class="mini-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
    eyeOff: `<svg class="mini-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><path d="M1 1l22 22"/></svg>`,
    logout: `<svg class="mini-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10 17l5-5-5-5"/><path d="M15 12H3"/><path d="M21 3v18"/></svg>`,
    add: `<svg class="mini-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 5v14"/><path d="M5 12h14"/></svg>`,
    save: `<svg class="mini-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8"/><path d="M7 3v5h8"/></svg>`,
    print: `<svg class="mini-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 9V3h12v6"/><path d="M6 18H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-1"/><path d="M6 14h12v7H6z"/></svg>`,
    edit: `<svg class="mini-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>`,
    account: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>`,
    lock: `<svg class="mini-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>`,
  };
  return map[name] || "";
};

const seed = () => ({
  session: null,
  settings: {
    attendanceWeight: 50,
    lessonWeight: 30,
    participationWeight: 20,
  },
  ui: {
    view: "dashboard",
    memberFilterClass: "all",
    attendanceClassId: "all",
    attendanceDate: todayISO(),
    lessonClassId: "all",
    lessonQuarter: currentQuarter(),
    requestQuarter: currentQuarter(),
    programDate: nextSaturdayISO(),
    messageMode: "inbox",
    messageConversationKey: null,
    rankingPeriod: "quarter",
    reportDate: "",
    reportYear: new Date().getFullYear(),
    reportQuarter: Math.floor(new Date().getMonth() / 3) + 1,
    reportWeek: 1,
    editMemberId: null,
    settingsTab: "weights",
    sidebarOpen: false,
  },
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
  users: [],
  attendance: [],
  lessons: [],
  quarterlyRequests: [],
  weeklyReports: [],
  programs: [],
  messages: [],
});


function formatDate(dateString) {
  const normalized = String(dateString || "").includes("T") ? String(dateString) : `${dateString}T00:00:00`;
  return new Intl.DateTimeFormat("pt-MZ", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(normalized));
}

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function uid(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

const TOKEN_KEY = "iasd_escola_sabatina_token";
const UI_KEY = "iasd_escola_sabatina_ui_v1";
const MESSAGE_SEEN_KEY = "iasd_escola_sabatina_message_seen_v1";

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

function loadMessageSeenState() {
  try {
    return JSON.parse(localStorage.getItem(MESSAGE_SEEN_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveMessageSeenState(data) {
  try {
    localStorage.setItem(MESSAGE_SEEN_KEY, JSON.stringify(data));
  } catch {
    // Ignore storage failures; notifications still work in-session.
  }
}

function currentMessageSeenIds() {
  const user = currentUser();
  if (!user) return [];
  const stateData = loadMessageSeenState();
  return Array.isArray(stateData[user.id]) ? stateData[user.id] : [];
}

function markMessagesAsSeen(messageIds = null) {
  const user = currentUser();
  if (!user) return;
  const ids = messageIds || visibleMessages().map((message) => message.id);
  const stateData = loadMessageSeenState();
  const current = new Set(Array.isArray(stateData[user.id]) ? stateData[user.id] : []);
  ids.forEach((id) => current.add(id));
  stateData[user.id] = Array.from(current);
  saveMessageSeenState(stateData);
}

function canSeeMessage(user, message) {
  if (!user || !message) return false;
  if (user.role === "secretary") return true;
  if (message.from === user.name && message.fromRole === user.role) return true;
  if (message.target === "all") return true;
  if (message.target === "secretary") return true;
  if (message.target === "member" && message.recipientMemberId && message.recipientMemberId === user.memberId) return true;
  return false;
}

function memberIdByName(name) {
  return state.members.find((member) => member.name === name)?.id || null;
}

function entityLabelFromKey(key) {
  if (!key) return "";
  if (key === "secretary") return "Direcção";
  if (key === "broadcast") return "Todos os membros";
  const member = state.members.find((item) => item.id === key);
  if (member) return member.name;
  return "Membro";
}

function conversationKeyForMessage(message) {
  if (!message) return null;
  if (message.target === "all") return "broadcast";
  const senderKey = message.fromRole === "secretary" ? "secretary" : memberIdByName(message.from);
  let recipientKey = null;
  if (message.target === "secretary") {
    recipientKey = "secretary";
  } else if (message.target === "member") {
    recipientKey = message.recipientMemberId || memberIdByName(message.recipientName);
  }
  if (!senderKey || !recipientKey) return `message:${message.id}`;
  const pair = [senderKey, recipientKey].sort().join("|");
  return `direct:${pair}`;
}

function conversationTitleFromKey(key, messages) {
  if (key === "broadcast") return "Todos os membros";
  if (key === "secretary") return "Direcção";
  if (key.startsWith("direct:")) {
    const pair = key.slice("direct:".length).split("|");
    const labels = pair
      .map((item) => entityLabelFromKey(item))
      .filter(Boolean)
      .filter((value, index, arr) => arr.indexOf(value) === index);
    if (labels.length === 1) return labels[0];
    if (labels.length >= 2) return labels.join(" · ");
  }
  const latest = messages[messages.length - 1];
  if (latest) return latest.subject || "Conversa";
  return "Conversa";
}

function buildConversationSummaries(messages, applyModeFilter = true) {
  const groups = new Map();
  const current = currentUser();
  messages.forEach((message) => {
    if (!canSeeMessage(current, message)) return;
    const key = conversationKeyForMessage(message);
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key).push(message);
  });

  const summaries = Array.from(groups.entries())
    .map(([key, rows]) => {
      const sorted = rows.slice().sort((a, b) => String(a.createdAt).localeCompare(String(b.createdAt)));
      const latest = sorted[sorted.length - 1] || null;
      const unreadCount = sorted.filter((message) => message.from !== current?.name && !currentMessageSeenIds().includes(message.id)).length;
      const hasInbox = sorted.some((message) => message.from !== current?.name);
      const hasOutbox = sorted.some((message) => message.from === current?.name);
      return {
        key,
        messages: sorted,
        latest,
        unreadCount,
        hasInbox,
        hasOutbox,
        title: conversationTitleFromKey(key, sorted),
      };
    })
    .filter((item) => {
      if (!applyModeFilter) return true;
      if (state.ui.messageMode === "inbox") return item.hasInbox;
      if (state.ui.messageMode === "outbox") return item.hasOutbox;
      return true;
    })
    .sort((a, b) => String(b.latest?.createdAt || "").localeCompare(String(a.latest?.createdAt || "")));

  return summaries;
}

function activeConversationKey(conversations) {
  if (!conversations.length) return null;
  const stored = state.ui.messageConversationKey;
  if (stored && conversations.some((item) => item.key === stored)) return stored;
  const nextKey = conversations[0].key;
  state.ui.messageConversationKey = nextKey;
  persistUiLocal();
  return nextKey;
}

function markConversationAsSeen(conversationKey) {
  if (!conversationKey) return;
  const user = currentUser();
  if (!user) return;
  const ids = visibleMessages()
    .filter((message) => conversationKeyForMessage(message) === conversationKey)
    .map((message) => message.id);
  if (!ids.length) return;
  markMessagesAsSeen(ids);
}

function unreadMessageCount() {
  const user = currentUser();
  if (!user) return 0;
  const seen = new Set(currentMessageSeenIds());
  const conversations = buildConversationSummaries(state.messages, false);
  return conversations.filter((conversation) =>
    conversation.messages.some((message) => canSeeMessage(user, message) && message.from !== user.name && !seen.has(message.id))
  ).length;
}

async function apiFetch(path, options = {}) {
  const token = getToken();
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const response = await fetch(path, { ...options, headers });
  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }
  if (response.status === 401) {
    setToken(null);
    state.session = null;
    state.currentUser = null;
    render();
    throw new Error((data && data.error) || "Sessão expirada.");
  }
  if (!response.ok) {
    throw new Error((data && data.error) || "Ocorreu um erro ao comunicar com o servidor.");
  }
  return data;
}

function loadLocalUI() {
  try {
    const raw = localStorage.getItem(UI_KEY);
    if (!raw) return seed().ui;
    return { ...seed().ui, ...JSON.parse(raw) };
  } catch {
    return seed().ui;
  }
}

function persistUiLocal() {
  try {
    localStorage.setItem(UI_KEY, JSON.stringify(state.ui));
  } catch {
    // Se o armazenamento local falhar (ex: modo privado), a app continua a funcionar.
  }
}

const SHARED_KEYS = ["settings", "classes", "members", "attendance", "lessons", "quarterlyRequests", "weeklyReports", "programs"];

function sharedDataSlice() {
  const out = {};
  SHARED_KEYS.forEach((key) => {
    out[key] = state[key];
  });
  return out;
}

// persist() é chamado por toda a aplicação depois de qualquer alteração ao
// estado. Continua síncrono na chamada (para não obrigar a mudar as dezenas
// de sítios que o invocam), mas por trás envia os dados partilhados ao
// servidor sempre que quem está a usar a app é a secretaria. Alterações só
// de interface (ui) ficam gravadas apenas neste dispositivo.
function persist() {
  persistUiLocal();
  if (isSecretary()) {
    apiFetch("/api/state", { method: "POST", body: JSON.stringify(sharedDataSlice()) }).catch((err) => {
      console.error("Falha ao gravar dados no servidor:", err);
    });
  }
}

async function loadSharedState() {
  const data = await apiFetch("/api/state");
  Object.assign(state, data);
}

let state = seed();
state.ui = loadLocalUI();
state.currentUser = null;


const app = document.getElementById("app");

function currentUser() {
  return state.currentUser || null;
}

function currentMember() {
  const user = currentUser();
  if (!user?.memberId) return null;
  return state.members.find((member) => member.id === user.memberId) || null;
}

function isSecretary() {
  return currentUser()?.role === "secretary";
}

function activeClasses() {
  return state.classes.filter((item) => true);
}

function memberClass(member) {
  return state.classes.find((item) => item.id === member.classId);
}

function visibleMembers() {
  if (isSecretary()) return state.members;
  return state.members.filter((item) => item.active);
}

function visibleMessages() {
  const user = currentUser();
  if (!user) return [];
  if (isSecretary()) return state.messages;
  return state.messages.filter((msg) => canSeeMessage(user, msg));
}

function canModifyMessage(message) {
  if (isSecretary()) return true;
  const user = currentUser();
  return user?.role === "member" && message.fromRole === "member" && message.from === user.name;
}

function sessionsForClass(classId) {
  return state.attendance.filter((session) => session.classId === classId);
}

function lessonsForClass(classId) {
  return state.lessons.filter((lesson) => lesson.classId === classId);
}

function requestsForClass(classId) {
  return state.quarterlyRequests.filter((request) => request.classId === classId);
}

function programsForDate(date) {
  return state.programs.filter((program) => program.date === date).sort((a, b) => a.order - b.order);
}

function getAttendanceSummary(classId, fromDate = null, toDate = null) {
  const members = state.members.filter((member) => member.classId === classId && member.active);
  const sessions = sessionsForClass(classId).filter(
    (session) => (!fromDate || session.date >= fromDate) && (!toDate || session.date <= toDate)
  );
  const possible = members.length * sessions.length || 1;
  const present = sessions.reduce(
    (total, session) =>
      total + session.entries.filter((entry) => entry.status === "presente").length,
    0
  );
  const visitors = sessions.reduce((total, session) => total + (session.visitorCount || 0), 0);
  return {
    members: members.length,
    sessions: sessions.length,
    present,
    visitors,
    rate: Math.round((present / possible) * 100) || 0,
  };
}

function scoreClass(classId, startDate = null, endDate = null) {
  const attendance = getAttendanceSummary(classId, startDate, endDate);
  const lessonCount = lessonsForClass(classId).filter(
    (lesson) => (!startDate || lesson.date >= startDate) && (!endDate || lesson.date <= endDate)
  ).length;
  const programCount = state.programs.filter(
    (item) =>
      item.classId === classId &&
      (!startDate || item.date >= startDate) &&
      (!endDate || item.date <= endDate)
  ).length;
  return {
    attendance: attendance.rate,
    lesson: Math.min(100, lessonCount * 20),
    participation: Math.min(100, programCount * 25),
  };
}

function rankingRows(period, year = state.ui.reportYear, quarter = state.ui.reportQuarter, week = state.ui.reportWeek) {
  let startDate = null;
  let endDate = null;

  if (period === "week") {
    startDate = getReportDateForQuarterWeek(year, quarter, week);
    endDate = startDate;
  } else if (period === "quarter") {
    startDate = localISODate(firstSaturdayOfQuarter(year, quarter));
    endDate = getReportDateForQuarterWeek(year, quarter, 13);
  } else if (period === "year") {
    startDate = `${year}-01-01`;
    endDate = `${year}-12-31`;
  }

  return state.classes
    .map((klass) => {
      const score = scoreClass(klass.id, startDate, endDate);
      const weighted =
        (score.attendance * state.settings.attendanceWeight +
          score.lesson * state.settings.lessonWeight +
          score.participation * state.settings.participationWeight) /
        100;
      return {
        ...klass,
        score,
        weighted: Math.round(weighted),
      };
    })
    .sort((a, b) => b.weighted - a.weighted);
}

function quarterStartISO() {
  const d = new Date();
  const quarter = Math.floor(d.getMonth() / 3);
  d.setMonth(quarter * 3, 1);
  d.setHours(0, 0, 0, 0);
  return localISODate(d);
}

function getQuarterKey(year, quarter) {
  return `${year}-T${quarter}`;
}

function firstSaturdayOfQuarter(year, quarter) {
  const d = new Date(year, (quarter - 1) * 3, 1);
  const day = d.getDay();
  const offset = (6 - day + 7) % 7;
  d.setDate(d.getDate() + offset);
  return d;
}

function getReportDateForQuarterWeek(year, quarter, week) {
  const date = new Date(firstSaturdayOfQuarter(year, quarter));
  date.setDate(date.getDate() + (week - 1) * 7);
  return localISODate(date);
}

function weeklyReportsForQuarter(year, quarter) {
  return state.weeklyReports
    .filter((item) => reportQuarterForDate(item.date) === getQuarterKey(year, quarter))
    .sort((a, b) => a.date.localeCompare(b.date));
}

function getWeeklyReportDateForQuarterWeek(year, quarter, week) {
  const reports = weeklyReportsForQuarter(year, quarter);
  if (reports[week - 1]) {
    return reports[week - 1].date;
  }
  return getReportDateForQuarterWeek(year, quarter, week);
}

function loginView() {
  return `
    <div class="login-wrap">
      <section class="login-card">
        <div class="login-hero">
          <div class="stack">
            <img class="hero-logo" src="${LOGO_MAIN}" alt="IASD - Canaã Pemba" />
            <h1>Sistema de Gestão da Escola Sabatina</h1>
          </div>
        </div>
        <form class="login-form" id="loginForm">
          <div class="stack">
            <h2>Entrar</h2>
          </div>
          <div class="form-grid">
            <div class="field">
              <label for="username">Usuário</label>
              <input id="username" name="username" autocomplete="username" placeholder="Ex: DIRECAO ou o seu primeiro nome" autofocus />
            </div>
            <div class="field">
              <label for="password">Senha</label>
              <div style="display:flex;gap:8px;align-items:center;">
                <input id="password" name="password" type="password" autocomplete="current-password" placeholder="Senha" style="flex:1;" />
                <button type="button" data-action="toggle-password" style="padding:8px;background:none;border:none;cursor:pointer;color:#58706b;">${icon("eye")}</button>
              </div>
            </div>
            <button class="btn primary" type="submit">${icon("home")} Entrar</button>
          </div>
        </form>
      </section>
    </div>
  `;
}

function shellView() {
  const user = currentUser();
  const secretary = isSecretary();
  if (state.ui.view === "messages") {
    const conversations = buildConversationSummaries(visibleMessages(), true);
    const conversationKey = activeConversationKey(conversations);
    markConversationAsSeen(conversationKey);
  }
  const unreadMessages = unreadMessageCount();
  const navItems = [
    ["dashboard", "Visão Geral", "home"],
    ["members", "Membros", "members"],
    ...(secretary ? [["attendance", "Presenças", "attendance"], ["lessons", "Lições", "lessons"], ["requests", "Trimensários", "requests"]] : []),
    ["program", "Programa", "program"],
    ["ranking", "Classe em Destaque", "ranking"],
    ["reports", "Relatórios", "reports"],
    ["messages", "Comunicação", "messages"],
    ["account", "Minha Conta", "account"],
  ];

  const summary = dashboardSummary();
  return `
    <div class="shell ${state.ui.sidebarOpen ? "sidebar-open" : ""}">
      <aside class="sidebar">
        <div class="brand">
          <img class="brand-logo" src="${LOGO_SECONDARY}" alt="Coração e Alma da Igreja" />
          <strong>Sistema de Gestão da Escola Sabatina</strong>
          <span>${user?.name || ""} · ${user?.role === "secretary" ? "Secretário/Diretor" : "Membro"}</span>
        </div>
        <nav class="nav">
          ${navItems
            .map(
              ([id, label, key]) => `
              <button type="button" class="${state.ui.view === id ? "active" : ""}" data-nav="${id}">
                ${icon(key)} <span class="nav-label">${escapeHTML(label)}</span>${id === "messages" && unreadMessages ? `<span class="nav-badge">${unreadMessages}</span>` : ""}
              </button>
            `
            )
            .join("")}
        </nav>
        <div class="sidebar-footer">
          <div class="statline">
            <strong>${summary.activeMembers}</strong> membros ativos
          </div>
          <div class="statline">
            <strong>${summary.nextProgramItems}</strong> itens no próximo sábado
          </div>
          <button type="button" class="btn ghost" data-action="logout">${icon("logout")} Sair</button>
        </div>
      </aside>
      <div class="sidebar-overlay" data-action="close-sidebar"></div>
      <main class="main">
        <header class="topbar">
          <button type="button" class="btn mobile-menu-btn" data-action="toggle-sidebar" aria-label="Abrir menu">☰</button>
          <div>
            <h1>${pageTitle(state.ui.view)}</h1>
            </div>
          <div class="topbar-actions">
            <span class="chip ${secretary ? "" : "gray"}">${secretary ? "Acesso administrativo" : "Acesso de membro"}</span>
            ${unreadMessages ? `<span class="chip alt">Novas conversas: ${unreadMessages}</span>` : ""}
          </div>
        </header>
        <div class="content">${renderView()}</div>
      </main>
    </div>
  `;
}

function pageTitle(view) {
  return {
    dashboard: "Visão Geral",
    members: "Membros",
    reports: "Relatórios e Estatísticas",
    program: "Programa do Próximo Sábado",
    ranking: "Classe em Destaque",
    attendance: "Presenças",
    lessons: "Lições e Estudos",
    requests: "Requisições de Trimensários",
    messages: "Comunicação e Notificações",
    account: "Minha Conta",
  }[view] || "Sistema";
}

function pageSubtitle(view) {
  return "";
}

function dashboardSummary() {
  const activeMembers = state.members.filter((item) => item.active).length;
  return {
    activeMembers,
    nextProgramItems: programsForDate(state.ui.programDate).length,
  };
}

function renderView() {
  const secretary = isSecretary();
  switch (state.ui.view) {
    case "members":
      return membersView();
    case "attendance":
      return secretary ? attendanceView() : readOnlyPanel("O registo de presenças é restrito à direcção.");
    case "lessons":
      return secretary ? lessonsView() : readOnlyPanel("A gestão de lições é restrita à direcção.");
    case "requests":
      return secretary ? requestsView() : readOnlyPanel("As requisições de trimensários são geridas pela direcção.");
    case "program":
      return programView();
    case "ranking":
      return rankingView();
    case "reports":
      return reportsView();
    case "messages":
      return messagesView();
    case "account":
      return accountView();
    default:
      return dashboardView();
  }
}

function readOnlyPanel(message) {
  return `
    <section class="panel">
      <div class="muted-box">${escapeHTML(message)}</div>
    </section>
  `;
}

function dashboardView() {
  const summary = buildDashboard();
  const quarter = state.ui.reportQuarter;
  const week = state.ui.reportWeek;
  const updateLabel = weeklyReportLabel(getWeeklyReportDate());
  const requestSummary = requestBreakdown();
  const quarterKey = getQuarterKey(state.ui.reportYear, state.ui.reportQuarter);
  const quarterReports = reportsForQuarter(state.ui.reportYear, state.ui.reportQuarter);
  const latestQuarterReport = quarterReports.slice().reverse().find((report) => reportTotals(report).enrolled > 0);
  const latestQuarterTotals = latestQuarterReport ? reportTotals(latestQuarterReport) : { enrolled: 0 };
  const totalVisits = summary.quarterData.reduce((sum, item) => sum + item.visits, 0);
  const totalBaptized = summary.quarterData.reduce((sum, item) => sum + item.baptized, 0);
  const requestedLessons = requestedLessonsForQuarter(state.ui.reportYear, state.ui.reportQuarter);
  const offerings = summary.averageOffering;
  const prevQuarter = state.ui.reportQuarter === 1 ? 4 : state.ui.reportQuarter - 1;
  const prevYear = state.ui.reportQuarter === 1 ? state.ui.reportYear - 1 : state.ui.reportYear;
  const prevQuarterData = getDashboardQuarterReportData(prevYear, prevQuarter);
  const prevAvgOffering = prevQuarterData.length ? Math.round(prevQuarterData.reduce((sum, item) => sum + item.offering, 0) / prevQuarterData.length) : 0;
  const offerDelta = offerings >= prevAvgOffering ? 'up' : 'down';
  const offerDiff = prevAvgOffering > 0 ? Math.round(((offerings - prevAvgOffering) / prevAvgOffering) * 100) : null;
  const memberActivity = summary.averageEnrolled;
  const prevMemberActivity = prevQuarterData.length ? Math.round(prevQuarterData.reduce((sum, item) => sum + item.enrolled, 0) / prevQuarterData.length) : 0;
  const memberDelta = prevMemberActivity > 0 ? Math.round(((memberActivity - prevMemberActivity) / prevMemberActivity) * 100) : null;
  const memberDeltaClass = memberDelta === null ? 'up' : memberDelta >= 0 ? 'up' : 'down';
  const memberDeltaLabel = memberDelta === null ? '—' : `${memberDelta >= 0 ? '+' : ''}${memberDelta}% vs T${prevQuarter} ${prevYear}`;
  const prevLabel = `T${prevQuarter} ${prevYear}`;
  const yearOptions = getDashboardYearOptions();
  const topClass = rankingRows("quarter", state.ui.reportYear, state.ui.reportQuarter)[0];
  const topClassName = topClass ? topClass.name : "—";

  return `
    <style>
      .dashboard-wrap{font-family:'Source Sans 3',sans-serif;color:#1B2A45;background:transparent;}
      .dashboard-wrap .wrap{max-width:1180px;margin:0 auto;}
      .dashboard-wrap header.top{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-end;gap:16px;margin-bottom:28px;padding-bottom:20px;border-bottom:2px solid #1B2A45;}
      .dashboard-wrap .eyebrow{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#C79A3E;font-weight:600;margin-bottom:6px;}
      .dashboard-wrap h1{font-family:'Fraunces',serif;font-weight:600;font-size:32px;margin:0;line-height:1.1;}
      .dashboard-wrap .top-meta{text-align:right;font-size:13px;color:#3C4E6E;line-height:1.5;margin-left:auto;}
      .dashboard-wrap .top-meta strong{color:#1B2A45;}
      .dashboard-wrap .filters{display:flex;flex-wrap:wrap;gap:16px;align-items:center;margin-bottom:20px;}
      .dashboard-wrap .filters .field{min-width:160px;}
      .dashboard-wrap .filters label{display:block;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:#3C4E6E;margin-bottom:6px;}
      .dashboard-wrap .filters select{width:100%;padding:10px 12px;border:1px solid #E4DCC9;border-radius:8px;background:#fff;color:#1B2A45;font-size:14px;}
      .dashboard-wrap .filters .btn{margin-left:auto;align-self:center;}
      .dashboard-wrap .kpi-strip{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin-bottom:24px;}
      .dashboard-wrap .kpi-chip{background:#fff;border:1px solid #E4DCC9;border-left:3px solid #C79A3E;border-radius:6px;padding:14px 16px;}
      .dashboard-wrap .kpi-chip-label{display:block;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#3C4E6E;font-weight:600;margin-bottom:6px;}
      .dashboard-wrap .kpi-chip-value{font-family:'Fraunces',serif;font-size:22px;font-weight:700;color:#1B2A45;display:block;line-height:1.15;}
      .dashboard-wrap .kpi-chip-value.small{font-size:16px;}
      .dashboard-wrap .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:20px;}
      .dashboard-wrap .card{background:#fff;border:1px solid #E4DCC9;border-radius:6px;padding:22px 22px 18px;position:relative;overflow:hidden;}
      .dashboard-wrap .card.wide{grid-column:span 2;}
      .dashboard-wrap .card-head{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:14px;}
      .dashboard-wrap .card-title{font-family:'Fraunces',serif;font-size:17px;font-weight:600;margin:0 0 3px;}
      .dashboard-wrap .card-sub{font-size:12.5px;color:#3C4E6E;}
      .dashboard-wrap .kpi{text-align:right;}
      .dashboard-wrap .kpi .num{font-family:'Fraunces',serif;font-size:26px;font-weight:700;display:block;line-height:1;}
      .dashboard-wrap .kpi .delta{font-size:12px;font-weight:600;display:inline-block;margin-top:5px;padding:2px 7px;border-radius:20px;}
      .dashboard-wrap .delta.up{background:#DCE8DC;color:#5C7F5E;}
      .dashboard-wrap .delta.down{background:#F0DCD1;color:#A15A3E;}
      .dashboard-wrap .chart-box{position:relative;height:190px;background:#F8F5EE;border-radius:14px;display:flex;align-items:center;justify-content:center;color:#7A7A7A;font-size:14px;text-transform:uppercase;letter-spacing:.08em;}
      .dashboard-wrap .chart-box.short{height:150px;}
      .dashboard-wrap .legend-row{display:flex;gap:16px;margin-top:10px;font-size:12px;color:#3C4E6E;flex-wrap:wrap;}
      .dashboard-wrap .legend-row span{display:flex;align-items:center;gap:6px;}
      .dashboard-wrap .dot{width:8px;height:8px;border-radius:50%;display:inline-block;}
      .dashboard-wrap .foot-note{margin-top:8px;font-size:12px;color:#3C4E6E;border-top:1px dashed #E4DCC9;padding-top:10px;}
      .dashboard-wrap .class-table{width:100%;border-collapse:collapse;font-size:13px;margin-top:4px;}
      .dashboard-wrap .class-table th{text-align:left;font-weight:600;color:#3C4E6E;font-size:11px;text-transform:uppercase;letter-spacing:.04em;padding-bottom:8px;border-bottom:1px solid #E4DCC9;}
      .dashboard-wrap .class-table td{padding:9px 0;border-bottom:1px solid #E4DCC9;}
      .dashboard-wrap .class-table tr:last-child td{border-bottom:none;}
      .dashboard-wrap .bar-track{background:#DCE8DC;border-radius:20px;height:7px;width:100%;overflow:hidden;}
      .dashboard-wrap .bar-fill{background:#5C7F5E;height:100%;border-radius:20px;}
      .dashboard-wrap .bar-fill.gold{background:#C79A3E;}
      .dashboard-wrap .bar-fill.clay{background:#A15A3E;}
      .dashboard-wrap .signature{font-family:'Fraunces',serif;font-style:italic;color:#3C4E6E;text-align:center;font-size:13px;margin-top:34px;}
      @media (max-width:760px){.dashboard-wrap .card.wide{grid-column:span 1;}}
    </style>
    <div class="dashboard-wrap">
      <div class="wrap">
        <header class="top">
          <div>
            <p class="eyebrow">IASD Canaã · Pemba</p>
            <h1>Visão Geral</h1>
          </div>
          <div class="top-meta">
            ${quarter}º Trimestre ${state.ui.reportYear} · <strong>Semana ${week} de 13</strong><br>
            Atualizado em ${escapeHTML(updateLabel)}
          </div>
        </header>
        <div class="filters">
          <div class="field">
            <label for="dashboardQuarter">Trimestre</label>
            <select id="dashboardQuarter" data-action="report-quarter">
              ${[1, 2, 3, 4]
                .map((value) => `<option value="${value}" ${state.ui.reportQuarter === value ? "selected" : ""}>${value}</option>`)
                .join("")}
            </select>
          </div>
          <div class="field">
            <label for="dashboardWeek">Sábado</label>
            <select id="dashboardWeek" data-action="report-week">
              ${Array.from({ length: 13 }, (_, index) => index + 1)
                .map((value) => `<option value="${value}" ${state.ui.reportWeek === value ? "selected" : ""}>${value}</option>`)
                .join("")}
            </select>
          </div>
          <div class="field">
            <label for="dashboardYear">Ano</label>
            <select id="dashboardYear" data-action="report-year">
              ${yearOptions
                .map((item) => `<option value="${item.value}" ${state.ui.reportYear === item.value ? "selected" : ""}>${item.label}</option>`)
                .join("")}
            </select>
          </div>
          <button class="btn warn" type="button" data-action="print-dashboard">${icon("print")} Exportar PDF</button>
        </div>
        <div class="kpi-strip">
          <div class="kpi-chip">
            <span class="kpi-chip-label">Membros ativos</span>
            <span class="kpi-chip-value">${summary.members}</span>
          </div>
          <div class="kpi-chip">
            <span class="kpi-chip-label">Visitas no trimestre</span>
            <span class="kpi-chip-value">${totalVisits}</span>
          </div>
          <div class="kpi-chip">
            <span class="kpi-chip-label">Batismos no trimestre</span>
            <span class="kpi-chip-value">${totalBaptized}</span>
          </div>
          <div class="kpi-chip">
            <span class="kpi-chip-label">Classe em destaque</span>
            <span class="kpi-chip-value small">${escapeHTML(topClassName)}</span>
          </div>
        </div>
        <div class="grid">
          <div class="card wide">
            <div class="card-head">
              <div>
                <p class="card-title">Crescimento de Membros</p>
                <p class="card-sub">Média de matriculados por sábado</p>
              </div>
              <div class="kpi">
                <span class="num">${memberActivity}</span>
                <span class="delta ${memberDeltaClass}">${memberDeltaLabel}</span>
              </div>
            </div>
            <div class="chart-box"><canvas id="chartMembros"></canvas></div>
            <div class="legend-row">
              <span><i class="dot" style="background:#5C7F5E"></i> Presentes</span>
              <span><i class="dot" style="background:#A15A3E"></i> Matriculados</span>
            </div>
          </div>

          <div class="card">
            <div class="card-head">
              <div>
                <p class="card-title">Frequência Geral</p>
                <p class="card-sub">Média de presença por sábado</p>
              </div>
              <div class="kpi">
                <span class="num">${summary.attendance}%</span>
                <span class="delta ${summary.attendance >= 75 ? 'up' : 'down'}">${summary.attendance >= 75 ? '+' : '-'}${Math.abs(75 - summary.attendance)}% vs trim. anterior</span>
              </div>
            </div>
            <div class="chart-box short"><canvas id="chartFrequencia"></canvas></div>
            <div class="legend-row">
              <span><i class="dot" style="background:#5C7F5E"></i> ≥75%</span>
              <span><i class="dot" style="background:#C79A3E"></i> 50–74%</span>
              <span><i class="dot" style="background:#A15A3E"></i> &lt;50%</span>
            </div>
          </div>

          <div class="card">
            <div class="card-head">
              <div>
                <p class="card-title">Estudo da Lição</p>
                <p class="card-sub">Média de lições estudadas por sábado</p>
              </div>
              <div class="kpi">
                <span class="num">${summary.averageStudiedLesson}</span>
                <span class="delta up">média dos 13 sábados</span>
              </div>
            </div>
            <div class="chart-box short"><canvas id="chartLicao"></canvas></div>
            <div class="legend-row">
              <span><i class="dot" style="background:#5C7F5E"></i> Lição estudada</span>
            </div>
          </div>

          <div class="card">
            <div class="card-head">
              <div>
                <p class="card-title">Trimensários</p>
                <p class="card-sub">Requisitados vs distribuídos por classe</p>
              </div>
              <div class="kpi">
                <span class="num">${requestSummary}</span>
                <span class="delta down">pendentes</span>
              </div>
            </div>
            <table class="class-table">
              <tr><th>Classe</th><th>Requisitados</th><th>Distribuídos</th></tr>
              ${getQuarterlyRequestTotalsByClass(state.ui.requestQuarter)
                .map(
                  (item) => `
                    <tr>
                      <td>${escapeHTML(item.className)}</td>
                      <td>${item.requested}</td>
                      <td>${item.distributed}</td>
                    </tr>
                  `
                )
                .join('')}
            </table>
            <p class="foot-note">${(() => {
              const totals = getQuarterlyRequestTotalsByClass(state.ui.requestQuarter);
              const topPending = totals.slice().sort((a, b) => b.pending - a.pending)[0];
              return topPending && topPending.pending > 0
                ? `${escapeHTML(topPending.className)} tem o maior número de pendências este trimestre.`
                : 'Nenhuma pendência registada por classe neste trimestre.';
            })()}</p>
          </div>

          <div class="card wide">
            <div class="card-head">
              <div>
                <p class="card-title">Ofertas</p>
                <p class="card-sub">Média por sábado no trimestre</p>
              </div>
              <div class="kpi">
                <span class="num">${offerings.toFixed(0)} MZN</span>
                <span class="delta ${offerDelta}">${offerDiff === null ? '—' : `${offerDelta === 'up' ? '+' : '-'}${Math.abs(offerDiff)}%`} vs ${prevLabel}</span>
              </div>
            </div>
            <div class="chart-box"><canvas id="chartOfertas"></canvas></div>
            <div class="legend-row">
              <span><i class="dot" style="background:#C79A3E"></i> Trimestre atual</span>
              <span><i class="dot" style="background:#E7CE95"></i> Trimestre anterior</span>
            </div>
          </div>
        </div>

        <p class="signature">"Coração e Alma da Igreja! Centro de ação eu irei…!"</p>
      </div>
    </div>
  `;
}

function initializeDashboardCharts() {
  if (state.ui.view !== 'dashboard' || typeof Chart !== 'function') return;

  const destroyChart = (id) => {
    const chart = Chart.getChart(id);
    if (chart) chart.destroy();
  };

  destroyChart('chartMembros');
  destroyChart('chartFrequencia');
  destroyChart('chartLicao');
  destroyChart('chartOfertas');

  Chart.defaults.font.family = "'Source Sans 3', sans-serif";
  Chart.defaults.color = '#3C4E6E';

  const tooltipStyle = {
    backgroundColor: '#1B2A45',
    titleColor: '#F8F5EE',
    titleFont: { family: "'Fraunces', serif", size: 13, weight: '600' },
    bodyColor: '#F8F5EE',
    bodyFont: { size: 12 },
    padding: 10,
    cornerRadius: 8,
    displayColors: false,
    caretSize: 6,
    borderColor: '#C79A3E',
    borderWidth: 1,
  };

  const noBorderGrid = (axis) => ({
    grid: { color: '#E4DCC9', display: axis === 'y' },
    ticks: { font: { size: 11 } },
    border: { display: false },
  });

  const makeGradient = (canvas, colorTop, colorBottom, height = 190) => {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, colorTop);
    gradient.addColorStop(1, colorBottom);
    return gradient;
  };

  const summary = buildDashboard();
  const labels = summary.quarterData.map((item) => `S${item.week}`);
  const attendanceData = summary.quarterData.map((item) => item.attendancePct);
  const presentData = summary.quarterData.map((item) => item.present + item.visits);
  const enrolledData = summary.quarterData.map((item) => item.enrolled);
  const offeringData = summary.quarterData.map((item) => item.offering);

  const prevQuarter = state.ui.reportQuarter === 1 ? 4 : state.ui.reportQuarter - 1;
  const prevYear = state.ui.reportQuarter === 1 ? state.ui.reportYear - 1 : state.ui.reportYear;
  const prevQuarterData = getDashboardQuarterReportData(prevYear, prevQuarter);
  const prevOfferingData = prevQuarterData.map((item) => item.offering);

  const ctxMembros = document.getElementById('chartMembros');
  if (ctxMembros) {
    new Chart(ctxMembros, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Presentes',
            data: presentData,
            borderColor: '#5C7F5E',
            backgroundColor: makeGradient(ctxMembros, 'rgba(92,127,94,0.32)', 'rgba(92,127,94,0.02)'),
            borderWidth: 2.5,
            fill: true,
            tension: 0.4,
            pointRadius: 3,
            pointHoverRadius: 6,
            pointBackgroundColor: '#fff',
            pointBorderColor: '#5C7F5E',
            pointBorderWidth: 2,
            pointHoverBackgroundColor: '#5C7F5E',
          },
          {
            label: 'Matriculados',
            data: enrolledData,
            borderColor: '#A15A3E',
            backgroundColor: 'transparent',
            borderWidth: 2,
            borderDash: [5, 4],
            tension: 0.4,
            pointRadius: 2.5,
            pointHoverRadius: 5,
            pointBackgroundColor: '#fff',
            pointBorderColor: '#A15A3E',
            pointBorderWidth: 2,
            pointHoverBackgroundColor: '#A15A3E',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        animation: { duration: 700, easing: 'easeOutQuart' },
        plugins: { legend: { display: false }, tooltip: tooltipStyle },
        scales: { x: noBorderGrid('x'), y: { ...noBorderGrid('y'), beginAtZero: true } },
      },
    });
  }

  const ctxFrequencia = document.getElementById('chartFrequencia');
  if (ctxFrequencia) {
    const barColors = attendanceData.map((value) => (value >= 75 ? '#5C7F5E' : value >= 50 ? '#C79A3E' : '#A15A3E'));
    new Chart(ctxFrequencia, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            data: attendanceData,
            backgroundColor: barColors,
            hoverBackgroundColor: barColors,
            borderRadius: 6,
            borderSkipped: false,
            maxBarThickness: 22,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 700, easing: 'easeOutQuart' },
        plugins: {
          legend: { display: false },
          tooltip: { ...tooltipStyle, callbacks: { label: (ctx) => `Frequência: ${ctx.parsed.y}%` } },
        },
        scales: {
          x: noBorderGrid('x'),
          y: { ...noBorderGrid('y'), min: 0, max: 100, ticks: { callback: (v) => `${v}%`, font: { size: 11 } } },
        },
      },
    });
  }

  const ctxLicao = document.getElementById('chartLicao');
  if (ctxLicao) {
    const lessonData = summary.quarterData.map((item) => item.studiedLesson);
    new Chart(ctxLicao, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Lições estudadas',
            data: lessonData,
            backgroundColor: makeGradient(ctxLicao, '#7A9C7C', '#5C7F5E', 150),
            hoverBackgroundColor: '#4A6B4C',
            borderRadius: 6,
            borderSkipped: false,
            maxBarThickness: 18,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 700, easing: 'easeOutQuart' },
        plugins: { legend: { display: false }, tooltip: tooltipStyle },
        scales: {
          x: noBorderGrid('x'),
          y: { ...noBorderGrid('y'), min: 0, ticks: { font: { size: 11 } } },
        },
      },
    });
  }

  const ctxOfertas = document.getElementById('chartOfertas');
  if (ctxOfertas) {
    new Chart(ctxOfertas, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: `${state.ui.reportQuarter}T ${state.ui.reportYear}`,
            data: offeringData,
            backgroundColor: makeGradient(ctxOfertas, '#D9AE55', '#C79A3E'),
            hoverBackgroundColor: '#B4872F',
            borderRadius: 6,
            borderSkipped: false,
            maxBarThickness: 16,
          },
          {
            label: `${prevQuarter}T ${prevYear}`,
            data: prevOfferingData,
            backgroundColor: '#EFDDB0',
            hoverBackgroundColor: '#E7CE95',
            borderRadius: 6,
            borderSkipped: false,
            maxBarThickness: 16,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 700, easing: 'easeOutQuart' },
        plugins: {
          legend: { display: false },
          tooltip: { ...tooltipStyle, callbacks: { label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y} MZN` } },
        },
        scales: { x: noBorderGrid('x'), y: noBorderGrid('y') },
      },
    });
  }
}

function buildDashboard() {
  const memberCount = state.members.filter((m) => m.active).length;
  const quarter = `${state.ui.reportYear}-T${state.ui.reportQuarter}`;
  const quarterData = getDashboardQuarterReportData(state.ui.reportYear, state.ui.reportQuarter);
  const attendance = Math.round(quarterData.reduce((sum, item) => sum + item.attendancePct, 0) / quarterData.length) || 0;
  const totalStudiedLesson = quarterData.reduce((sum, item) => sum + item.studiedLesson, 0);
  const averageStudiedLesson = quarterData.length ? Math.round(totalStudiedLesson / quarterData.length) : 0;
  const totalEnrolled = quarterData.reduce((sum, item) => sum + item.enrolled, 0);
  const averageEnrolled = quarterData.length ? Math.round(totalEnrolled / quarterData.length) : 0;
  const memberActivityTotal = quarterData.reduce((sum, item) => sum + item.attendedWithVisits + item.enrolled, 0);
  const averageMemberActivity = quarterData.length ? Math.round(memberActivityTotal / quarterData.length) : 0;
  const totalOffering = quarterData.reduce((sum, item) => sum + item.offering, 0);
  const averageOffering = quarterData.length ? Math.round(totalOffering / quarterData.length) : 0;

  return {
    members: memberCount,
    attendance,
    averageStudiedLesson,
    totalStudiedLesson,
    averageEnrolled,
    averageMemberActivity,
    messages: state.messages.length,
    totalOffering,
    averageOffering,
    quarterData,
  };
}

function statusBox(title, body) {
  return `
    <div class="muted-box">
      <strong>${escapeHTML(title)}</strong>
      <div class="note" style="margin-top:6px">${body}</div>
    </div>
  `;
}

function classBreakdown() {
  return state.classes
    .map((klass) => `${klass.name}: ${state.members.filter((m) => m.classId === klass.id && m.active).length}`)
    .join(" · ");
}

function requestBreakdown() {
  const pending = state.quarterlyRequests
    .filter((req) => req.status === "Pendente")
    .reduce((sum, req) => sum + (req.quantity || 0), 0);
  const sent = state.quarterlyRequests
    .filter((req) => req.status === "Enviado")
    .reduce((sum, req) => sum + (req.quantity || 0), 0);
  return `${pending} pendentes · ${sent} enviados`;
}

function getQuarterlyRequestTotalsByClass(quarter) {
  return state.classes.map((klass) => {
    const classRequests = state.quarterlyRequests.filter(
      (req) => req.quarter === quarter && req.classId === klass.id
    );
    return {
      classId: klass.id,
      className: klass.name,
      requested: classRequests.reduce((sum, req) => sum + (req.quantity || 0), 0),
      distributed: classRequests
        .filter((req) => req.status === "Enviado")
        .reduce((sum, req) => sum + (req.quantity || 0), 0),
      pending: classRequests
        .filter((req) => req.status === "Pendente")
        .reduce((sum, req) => sum + (req.quantity || 0), 0),
    };
  });
}

function getDashboardQuarterReportData(year, quarter) {
  return Array.from({ length: 13 }, (_, index) => {
    const week = index + 1;
    const date = getWeeklyReportDateForQuarterWeek(year, quarter, week);
    const report = state.weeklyReports.find((item) => item.date === date);
    const totals = report ? reportTotals(report) : { enrolled: 0, present: 0, visits: 0, studiedLesson: 0, offering: 0 };
    return {
      week,
      date,
      enrolled: totals.enrolled,
      present: totals.present,
      visits: totals.visits,
      studiedLesson: totals.studiedLesson,
      offering: totals.offering,
      attendedWithVisits: totals.present + totals.visits,
      attendancePct: totals.enrolled ? Math.round(((totals.present + totals.visits) / totals.enrolled) * 100) : 0,
    };
  });
}

function getDashboardYearOptions() {
  const current = state.ui.reportYear;
  return [current - 1, current, current + 1].map((year) => ({ value: year, label: `${year}` }));
}

function recentMessages() {
  return `${state.messages.slice(0, 3).length} itens visíveis no painel`;
}

function className(classId) {
  return state.classes.find((klass) => klass.id === classId)?.name || "Sem classe";
}


function attendanceView() {
  const classId = state.ui.attendanceClassId === "all" ? state.classes[0]?.id || "classe-01-adultos" : state.ui.attendanceClassId;
  const date = state.ui.attendanceDate;
  const current = state.attendance.find((item) => item.classId === classId && item.date === date) || null;
  const entries = visibleMembers()
    .filter((member) => member.classId === classId)
    .map((member) => ({
      memberId: member.id,
      name: member.name,
      status: current?.entries.find((entry) => entry.memberId === member.id)?.status || "ausente",
    }));

  return `
    <section class="grid two">
      <div class="panel">
        <div class="section-header">
          <div>
            <h2>Registar presenças</h2>
            </div>
        </div>
        <form id="attendanceForm" class="form-grid">
          <div class="form-grid three">
            <div class="field">
              <label for="attendanceDate">Data</label>
              <input id="attendanceDate" type="date" value="${escapeHTML(date)}" />
            </div>
            <div class="field">
              <label for="attendanceClassId">Classe</label>
              <select id="attendanceClassId">
                ${state.classes
                  .map(
                    (klass) =>
                      `<option value="${klass.id}" ${classId === klass.id ? "selected" : ""}>${escapeHTML(klass.name)}</option>`
                  )
                  .join("")}
              </select>
            </div>
            <div class="field">
              <label for="attendanceVisitors">Visitantes</label>
              <input id="attendanceVisitors" type="number" min="0" value="${escapeHTML(current?.visitorCount ?? 0)}" />
            </div>
          </div>
          <div class="list">
            ${entries
              .map(
                (entry) => `
                  <div class="row" style="grid-template-columns: minmax(0,1.4fr) repeat(3, minmax(0, 1fr));">
                    <strong>${escapeHTML(entry.name)}</strong>
                    ${attendanceOption(entry.memberId, "presente", entry.status)}
                    ${attendanceOption(entry.memberId, "ausente", entry.status)}
                    ${attendanceOption(entry.memberId, "visitante", entry.status)}
                  </div>
                `
              )
              .join("") || `<div class="muted-box">Sem membros activos nesta classe.</div>`}
          </div>
          <div class="field">
            <label for="attendanceNote">Observações</label>
            <textarea id="attendanceNote">${escapeHTML(current?.note || "")}</textarea>
          </div>
          <button class="btn primary" type="submit">${icon("save")} Guardar presença</button>
        </form>
      </div>
      <div class="panel">
        <div class="section-header">
          <div>
            <h2>Histórico da classe</h2>
            </div>
        </div>
        <div class="field">
          <label for="attendanceClassHistory">Classe</label>
          <select id="attendanceClassHistory" data-action="attendance-history-class">
            ${state.classes
              .map(
                (klass) =>
                  `<option value="${klass.id}" ${classId === klass.id ? "selected" : ""}>${escapeHTML(klass.name)}</option>`
              )
              .join("")}
          </select>
        </div>
        <div class="list">
          ${sessionsForClass(classId)
            .slice()
            .reverse()
            .map(
              (session) => `
              <div class="muted-box">
                <div class="toolbar wrap">
                  <strong>${formatDate(session.date)}</strong>
                  <span class="chip">${session.entries.filter((entry) => entry.status === "presente").length} presentes</span>
                </div>
                <div class="note">Visitantes: ${session.visitorCount || 0}${session.note ? ` · ${escapeHTML(session.note)}` : ""}</div>
              </div>
            `
            )
            .join("") || `<div class="muted-box">Sem histórico registado para esta classe.</div>`}
        </div>
      </div>
    </section>
  `;
}

function attendanceOption(memberId, status, selected) {
  return `
    <label class="chip ${selected === status ? "" : "gray"}" style="justify-content:space-between;min-width:0">
      <input type="radio" name="attendance_${memberId}" value="${status}" ${selected === status ? "checked" : ""} style="margin:0" />
      ${statusLabel(status)}
    </label>
  `;
}

function statusLabel(status) {
  return { presente: "Presente", ausente: "Ausente", visitante: "Visitante" }[status] || status;
}

function requestsView() {
  const quarter = state.ui.requestQuarter;
  const filtered = state.quarterlyRequests.filter((item) => item.quarter === quarter);
  return `
    <section class="grid two">
      <div class="panel">
        <div class="section-header">
          <div>
            <h2>Nova requisição</h2>
            </div>
        </div>
        <form id="requestForm" class="form-grid">
          <div class="form-grid three">
            <div class="field">
              <label for="requestQuarter">Trimestre</label>
              <input id="requestQuarter" name="quarter" value="${escapeHTML(quarter)}" required />
            </div>
            <div class="field">
              <label for="requestClassId">Classe</label>
              <select id="requestClassId" name="classId" required>
                ${state.classes.map((klass) => `<option value="${klass.id}">${escapeHTML(klass.name)}</option>`).join("")}
              </select>
            </div>
            <div class="field">
              <label for="requestQuantity">Lições requisitadas</label>
              <input id="requestQuantity" name="quantity" type="number" min="0" value="10" required />
            </div>
          </div>
          <div class="field">
            <label for="requestStatus">Estado</label>
            <select id="requestStatus" name="status">
              <option value="Pendente">Pendente</option>
              <option value="Enviado">Enviado</option>
            </select>
          </div>
          <button class="btn primary" type="submit">${icon("save")} Guardar requisição</button>
        </form>
      </div>
      <div class="panel">
        <div class="section-header">
          <div>
            <h2>Histórico do trimestre</h2>
            </div>
        </div>
        <div class="field">
          <label for="requestQuarterFilter">Trimestre</label>
          <input id="requestQuarterFilter" data-action="request-filter-quarter" value="${escapeHTML(quarter)}" />
        </div>
        <div class="list">
          ${filtered
            .slice()
            .reverse()
            .map(
              (request) => `
              <div class="muted-box">
                <div class="toolbar wrap">
                  <strong>${escapeHTML(className(request.classId))}</strong>
                  <span class="status ${request.status === "Enviado" ? "ok" : "warn"}">${escapeHTML(request.status)}</span>
                </div>
                <div class="note">${request.quantity} trimensários · ${formatDate(request.createdAt)}</div>
              </div>
            `
            )
            .join("") || `<div class="muted-box">Sem requisições para este trimestre.</div>`}
        </div>
      </div>
    </section>
  `;
}

function rankingView() {
  const rows = rankingRows(state.ui.rankingPeriod);
  const top = rows[0];
  if (!isSecretary()) {
    return readOnlyRankingView(rows, top);
  }
  return `
    <section class="grid two">
      <div class="panel">
        <div class="section-header">
          <div>
            <h2>Critérios de avaliação</h2>
            </div>
        </div>
        <form id="settingsForm" class="form-grid">
          <div class="form-grid three">
            <div class="field">
              <label for="attendanceWeight">Presença</label>
              <input id="attendanceWeight" type="number" min="0" max="100" value="${state.settings.attendanceWeight}" />
            </div>
            <div class="field">
              <label for="lessonWeight">Lição</label>
              <input id="lessonWeight" type="number" min="0" max="100" value="${state.settings.lessonWeight}" />
            </div>
            <div class="field">
              <label for="participationWeight">Participação</label>
              <input id="participationWeight" type="number" min="0" max="100" value="${state.settings.participationWeight}" />
            </div>
          </div>
          <button class="btn primary" type="submit">${icon("save")} Guardar critérios</button>
        </form>
        <div class="toolbar" style="margin-top:14px">
          <span class="chip alt">Soma actual: ${state.settings.attendanceWeight + state.settings.lessonWeight + state.settings.participationWeight}</span>
          <select id="rankingPeriod" data-action="ranking-period">
            <option value="week" ${state.ui.rankingPeriod === "week" ? "selected" : ""}>Semanal</option>
            <option value="quarter" ${state.ui.rankingPeriod === "quarter" ? "selected" : ""}>Trimestral</option>
          </select>
        </div>
      </div>
      <div class="panel">
        <div class="section-header">
          <div>
            <h2>Classe em destaque</h2>
            </div>
        </div>
        <div class="ranking">
          ${rows
            .map(
              (item, index) => `
              <div class="ranking-item">
                <strong>#${index + 1}</strong>
                <div>
                  <strong>${escapeHTML(item.name)}</strong>
                  <div class="note">Presença ${item.score.attendance}% · Lição ${item.score.lesson}% · Participação ${item.score.participation}%</div>
                  <div class="progress"><span style="width:${item.weighted}%"></span></div>
                </div>
                <strong>${item.weighted}</strong>
              </div>
            `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}

function reportsView() {
  const secretary = isSecretary();
  const reportType = "attendance";
  const reportPeriod = "quarter";
  const reportClassId = "all";
  const result = buildReport(reportType, reportPeriod, reportClassId);
  const year = state.ui.reportYear;
  const quarter = state.ui.reportQuarter;
  const week = state.ui.reportWeek;
  const period = reportPeriod;
  const weekDate = getReportDateForQuarterWeek(year, quarter, week);
  const weeklyExisting = state.weeklyReports.find((item) => item.date === weekDate) || null;
  const weeklyReport = buildWeeklyReportFromReport(weeklyExisting || { date: weekDate, classes: reportRowsFromReport(null) });
  const editableRows = reportRowsFromReport(weeklyReport);
  const quarterSummary = quarterSummaryForDate(weekDate);
  const automaticQuarterSummary = buildAutomaticReportSummary(reportsForQuarter(year, quarter), requestedLessonsForQuarter(year, quarter));
  // build competitive rows depending on selected period
  let competitiveRows = [];
  if (period === "week") {
    competitiveRows = reportRowsFromReport(weeklyReport);
  } else if (period === "quarter") {
    const reports = state.weeklyReports.filter((item) => reportQuarterForDate(item.date) === getQuarterKey(year, quarter));
    const count = reports.length || 1;
    competitiveRows = state.classes.map((klass) => {
      const totals = reports.reduce(
        (acc, r) => {
          const row = (r.classes || []).find((c) => c.classId === klass.id) || makeEmptyReportClassRow(klass.id);
          acc.enrolled += Number(row.enrolled || 0);
          acc.present += Number(row.present || 0);
          acc.visits += Number(row.visits || 0);
          acc.studiedLesson += Number(row.studiedLesson || 0);
          acc.offering += Number(row.offering || 0);
          return acc;
        },
        { enrolled: 0, present: 0, visits: 0, studiedLesson: 0, offering: 0 }
      );
      return {
        classId: klass.id,
        enrolled: totals.enrolled,
        present: totals.present,
        visits: totals.visits,
        studiedLesson: totals.studiedLesson,
        offering: totals.offering,
        avgEnrolled: Math.round(totals.enrolled / count),
        avgPresent: Math.round(totals.present / count),
        count,
      };
    });
  } else if (period === "year") {
    const reports = state.weeklyReports.filter((item) => new Date(`${item.date}T00:00:00`).getFullYear() === year);
    const count = reports.length || 1;
    competitiveRows = state.classes.map((klass) => {
      const totals = reports.reduce(
        (acc, r) => {
          const row = (r.classes || []).find((c) => c.classId === klass.id) || makeEmptyReportClassRow(klass.id);
          acc.enrolled += Number(row.enrolled || 0);
          acc.present += Number(row.present || 0);
          acc.visits += Number(row.visits || 0);
          acc.studiedLesson += Number(row.studiedLesson || 0);
          acc.offering += Number(row.offering || 0);
          return acc;
        },
        { enrolled: 0, present: 0, visits: 0, studiedLesson: 0, offering: 0 }
      );
      return {
        classId: klass.id,
        enrolled: totals.enrolled,
        present: totals.present,
        visits: totals.visits,
        studiedLesson: totals.studiedLesson,
        offering: totals.offering,
        avgEnrolled: Math.round(totals.enrolled / count),
        avgPresent: Math.round(totals.present / count),
        count,
      };
    });
  }

  return `
    <section class="grid two">
      <div class="panel">
        <div class="section-header">
          <div>
            <h2>Filtros de relatório</h2>
            </div>
        </div>
        <form id="reportFilterForm" class="form-grid">
          <div class="form-grid three">
            <div class="field">
              <label for="reportYear">Ano</label>
              <select id="reportYear" name="reportYear" data-action="report-year">
                ${getDashboardYearOptions()
                  .map((item) => `<option value="${item.value}" ${state.ui.reportYear === item.value ? "selected" : ""}>${item.label}</option>`)
                  .join("")}
              </select>
            </div>
            <div class="field">
              <label for="reportQuarter">Trimestre</label>
              <select id="reportQuarter" name="reportQuarter" data-action="report-quarter">
                ${[1, 2, 3, 4]
                  .map((value) => `<option value="${value}" ${state.ui.reportQuarter === value ? "selected" : ""}>${value}</option>`)
                  .join("")}
              </select>
            </div>
            <div class="field">
              <label for="reportWeek">Sábado</label>
              <select id="reportWeek" name="reportWeek" data-action="report-week">
                ${Array.from({ length: 13 }, (_, index) => index + 1)
                  .map((value) => `<option value="${value}" ${state.ui.reportWeek === value ? "selected" : ""}>${value}</option>`)
                  .join("")}
              </select>
            </div>
          </div>
          <div class="toolbar">
            <button class="btn primary" type="submit">${icon("reports")} Actualizar</button>
            <button class="btn warn" type="button" data-action="print-report">${icon("print")} Exportar PDF</button>
          </div>
        </form>
      </div>
    </section>

    ${secretary ? `
      <section class="panel">
        <div class="section-header">
          <div>
            <h2>Cadastrar relatorio semanal</h2>
            <p>Registo do sabado ${escapeHTML(formatDate(weekDate))}</p>
          </div>
          <span class="chip alt">${weeklyExisting ? "Relatorio existente" : "Novo relatorio"}</span>
        </div>
        <form id="weeklyReportForm" class="form-grid">
          <div class="field">
            <label for="weeklyReportDate">Data do sabado</label>
            <input id="weeklyReportDate" name="date" type="date" value="${escapeHTML(weekDate)}" data-action="weekly-report-date" required />
          </div>
          <div class="list">
            ${editableRows
              .map((row) => `
                <div class="muted-box">
                  <strong>${escapeHTML(className(row.classId))}</strong>
                  <div class="form-grid three" style="margin-top:10px">
                    <div class="field">
                      <label for="report_${row.classId}_enrolled">Matriculados</label>
                      <input id="report_${row.classId}_enrolled" name="${row.classId}_enrolled" type="number" min="0" value="${Number(row.enrolled || 0)}" />
                    </div>
                    <div class="field">
                      <label for="report_${row.classId}_present">Presentes</label>
                      <input id="report_${row.classId}_present" name="${row.classId}_present" type="number" min="0" value="${Number(row.present || 0)}" />
                    </div>
                    <div class="field">
                      <label for="report_${row.classId}_visits">Visitas</label>
                      <input id="report_${row.classId}_visits" name="${row.classId}_visits" type="number" min="0" value="${Number(row.visits || 0)}" />
                    </div>
                    <div class="field">
                      <label for="report_${row.classId}_studiedLesson">Estudaram licao</label>
                      <input id="report_${row.classId}_studiedLesson" name="${row.classId}_studiedLesson" type="number" min="0" value="${Number(row.studiedLesson || 0)}" />
                    </div>
                    <div class="field">
                      <label for="report_${row.classId}_offering">Oferta</label>
                      <input id="report_${row.classId}_offering" name="${row.classId}_offering" type="number" min="0" step="0.01" value="${Number(row.offering || 0)}" />
                    </div>
                    <div class="field">
                      <label for="report_${row.classId}_baptized">Almas batizadas</label>
                      <input id="report_${row.classId}_baptized" name="${row.classId}_baptized" type="number" min="0" value="${Number(row.baptized || 0)}" />
                    </div>
                  </div>
                </div>
              `)
              .join("")}
          </div>
          <button class="btn primary" type="submit">${icon("save")} Guardar relatorio</button>
        </form>
      </section>
    ` : ""}

    <section class="grid two" style="grid-template-columns:1fr">
      <div class="panel">
        <div class="section-header">
          <div>
            <h2>Quadro comparativo</h2>
            </div>
          <span class="chip alt">${period === "week" ? weeklyReport.quarter : result.periodLabel}</span>
        </div>
        <div class="grid four" style="grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px;">
          ${reportMetric("Matriculados", period === "week" ? weeklyReport.totals.enrolled : (quarterSummary.average.enrolled || result.total), period === "week" ? "Total da escola" : result.caption)}
          ${reportMetric("Presentes", period === "week" ? weeklyReport.totals.present : (quarterSummary.average.present || "-"), "Pessoas presentes")}
          ${reportMetric("Visitas", period === "week" ? weeklyReport.totals.visits : (quarterSummary.average.visits || "-"), "Visitantes")}
          ${reportMetric("Estudaram lição", period === "week" ? weeklyReport.totals.studiedLesson : (quarterSummary.average.studiedLesson || "-"), "Lição concluída")}
        </div>
        <div class="grid two" style="margin-top:14px">
          ${reportMetric("Oferta total", period === "week" ? weeklyReport.totals.offering : (quarterSummary.average.offering || "-"), period === "week" ? "Valor do sábado" : "Média por sábado")}
          ${reportMetric("Ofertas acumuladas", period === "week" ? weeklyReport.totals.accumulatedOffering || 0 : (quarterSummary.accumulatedOffering || 0), "Acumulado do trimestre")}
        </div>
      </div>
      <div class="panel">
        <div class="section-header">
          <div>
            <h2>Quadro competitivo</h2>
            </div>
          <span class="chip alt">${period === "week" ? weeklyReport.date : result.classLabel}</span>
        </div>
        <div class="list" style="margin-top:14px">
          ${competitiveRows && competitiveRows.length
            ? competitiveRows
                .map((row) => {
                  const score = Number(row.present || 0) + Number(row.visits || 0) + Number(row.studiedLesson || 0);
                  if (period === "week") {
                    return `
                      <div class="activity-item">
                        <div>
                          <strong>${escapeHTML(className(row.classId))}</strong>
                          <div class="meta">Matriculados ${row.enrolled} · Presentes ${row.present} · Visitas ${row.visits} · Lição ${row.studiedLesson}</div>
                        </div>
                        <div class="stack" style="text-align:right">
                          <span class="chip">${score} pontos</span>
                          <span class="note">Oferta ${Number(row.offering || 0).toFixed(2)}</span>
                        </div>
                      </div>
                    `;
                  }
                  // quarter or year aggregated
                  return `
                    <div class="activity-item">
                      <div>
                        <strong>${escapeHTML(className(row.classId))}</strong>
                        <div class="meta">Total: ${row.enrolled} matriculados · ${row.present} presentes · ${row.visits} visitas</div>
                        <div class="note">Média por sábado: ${row.avgEnrolled} matriculados · ${row.avgPresent} presentes · (${row.count} sábados)</div>
                      </div>
                      <div class="stack" style="text-align:right">
                        <span class="chip">${score} pontos</span>
                        <span class="note">Oferta ${Number(row.offering || 0).toFixed(2)}</span>
                      </div>
                    </div>
                  `;
                })
                .join("")
            : `<div class="muted-box">Sem dados para este período.</div>`}
        </div>
      </div>
    </section>

    <section class="grid two">
      ${renderQuarterlyAutomaticReport(year, quarter, automaticQuarterSummary)}
      ${renderAnnualAutomaticReport(year)}
    </section>
  `;
}

function reportMetric(title, value, caption) {
  return `
    <div class="muted-box">
      <div class="chip">${escapeHTML(title)}</div>
      <div style="font-size:1.4rem;font-weight:700;margin-top:8px">${escapeHTML(value)}</div>
      <div class="note" style="margin-top:4px">${escapeHTML(caption)}</div>
    </div>
  `;
}

function reportsForQuarter(year, quarter) {
  return state.weeklyReports
    .filter((item) => reportQuarterForDate(item.date) === getQuarterKey(year, quarter))
    .sort((a, b) => a.date.localeCompare(b.date));
}

function reportsForYear(year) {
  return state.weeklyReports
    .filter((item) => new Date(`${item.date}T00:00:00`).getFullYear() === year)
    .sort((a, b) => a.date.localeCompare(b.date));
}

function requestedLessonsForQuarter(year, quarter) {
  const quarterKey = getQuarterKey(year, quarter);
  return state.quarterlyRequests
    .filter((request) => request.quarter === quarterKey)
    .reduce((sum, request) => sum + Number(request.quantity || 0), 0);
}

function buildAutomaticReportSummary(reports, requestedLessons = 0) {
  const count = reports.length;
  const latestReport = reports
    .slice()
    .reverse()
    .find((report) => reportTotals(report).enrolled > 0);
  const totals = reports.reduce(
    (acc, report) => {
      const reportTotal = reportTotals(report);
      acc.enrolled += Number(reportTotal.enrolled || 0);
      acc.present += Number(reportTotal.present || 0);
      acc.visits += Number(reportTotal.visits || 0);
      acc.studiedLesson += Number(reportTotal.studiedLesson || 0);
      acc.offering += Number(reportTotal.offering || 0);
      acc.baptized += Number(reportTotal.baptized || 0);
      return acc;
    },
    { enrolled: 0, present: 0, visits: 0, studiedLesson: 0, offering: 0, baptized: 0 }
  );

  const classRows = state.classes.map((klass) => {
    const rowTotals = reports.reduce(
      (acc, report) => {
        const row = (report.classes || []).find((item) => item.classId === klass.id) || makeEmptyReportClassRow(klass.id);
        acc.enrolled += Number(row.enrolled || 0);
        acc.present += Number(row.present || 0);
        acc.visits += Number(row.visits || 0);
        acc.studiedLesson += Number(row.studiedLesson || 0);
        acc.offering += Number(row.offering || 0);
        acc.baptized += Number(row.baptized || 0);
        return acc;
      },
      { classId: klass.id, enrolled: 0, present: 0, visits: 0, studiedLesson: 0, offering: 0, baptized: 0 }
    );
    return {
      ...rowTotals,
      averageEnrolled: count ? Math.round(rowTotals.enrolled / count) : 0,
      averagePresent: count ? Math.round(rowTotals.present / count) : 0,
    };
  });

  return {
    count,
    totals,
    totalEnrolled: latestReport ? reportTotals(latestReport).enrolled : 0,
    requestedLessons,
    averageEnrolled: count ? Math.round(totals.enrolled / count) : 0,
    averagePresent: count ? Math.round(totals.present / count) : 0,
    averageAttendance: totals.enrolled ? Math.round((totals.present / totals.enrolled) * 100) : 0,
    averageStudiedLesson: count ? Math.round(totals.studiedLesson / count) : 0,
    classRows,
  };
}

function trendLabel(value, previousValue) {
  if (previousValue === null || previousValue === undefined) return "Base";
  if (value > previousValue) return `Subiu +${value - previousValue}`;
  if (value < previousValue) return `Caiu -${previousValue - value}`;
  return "Manteve";
}

function renderQuarterlyAutomaticReport(year, quarter, summary) {
  return `
    <div class="panel">
      <div class="section-header">
        <div>
          <h2>Relatorio trimestral</h2>
          <p>Calculado pelos relatorios semanais e requisicoes guardadas</p>
        </div>
        <span class="chip alt">T${quarter} ${year}</span>
      </div>
      <div class="grid three" style="margin-bottom:14px">
        ${reportMetric("Total matriculados", summary.totalEnrolled, "Ultimo sabado registado")}
        ${reportMetric("Media de presenca", `${summary.averageAttendance}%`, "Presentes sobre matriculados")}
        ${reportMetric("Licoes requisitadas", summary.requestedLessons, "Total do trimestre")}
      </div>
      <div class="grid three" style="margin-bottom:14px">
        ${reportMetric("Media estudo da licao", summary.averageStudiedLesson, "Por sabado")}
        ${reportMetric("Visitas", summary.totals.visits, "Total do periodo")}
        ${reportMetric("Almas batizadas", summary.totals.baptized, "Total do periodo")}
      </div>
      <div class="grid two" style="margin-bottom:14px">
        ${reportMetric("Oferta total", Number(summary.totals.offering || 0).toFixed(2), "Soma do periodo")}
        ${reportMetric("Sabados registados", summary.count, "Relatorios semanais")}
      </div>
      <div class="list" style="display:none">
        ${summary.count
          ? summary.classRows
              .map((row) => `
                <div class="activity-item">
                  <div>
                    <strong>${escapeHTML(className(row.classId))}</strong>
                    <div class="meta">Media: ${row.averageEnrolled} matriculados - ${row.averagePresent} presentes</div>
                    <div class="note">Total: ${row.present} presentes - ${row.visits} visitas - ${row.studiedLesson} licoes - ${row.baptized} batismos</div>
                  </div>
                  <div class="stack" style="text-align:right">
                    <span class="chip">${Number(row.offering || 0).toFixed(2)}</span>
                    <span class="note">Oferta</span>
                  </div>
                </div>
              `)
              .join("")
          : `<div class="muted-box">Ainda nao ha relatorios semanais para este periodo.</div>`}
      </div>
    </div>
  `;
}

function renderAnnualAutomaticReport(year) {
  const rows = [1, 2, 3, 4].map((quarter) => ({
    quarter,
    summary: buildAutomaticReportSummary(reportsForQuarter(year, quarter), requestedLessonsForQuarter(year, quarter)),
  }));

  return `
    <div class="panel">
      <div class="section-header">
        <div>
          <h2>Relatorio anual</h2>
          <p>Resumo por trimestre com subidas e quedas</p>
        </div>
        <span class="chip alt">${year}</span>
      </div>
      <div class="list">
        ${rows
          .map((item, index) => {
            const previous = rows[index - 1]?.summary || null;
            const attendanceTrend = trendLabel(item.summary.averageAttendance, previous?.averageAttendance);
            const offeringTrend = trendLabel(Math.round(item.summary.totals.offering || 0), previous ? Math.round(previous.totals.offering || 0) : null);
            return `
              <div class="activity-item">
                <div>
                  <strong>T${item.quarter}</strong>
                  <div class="meta">Matriculados ${item.summary.totalEnrolled} - Presenca media ${item.summary.averageAttendance}% - Licoes req. ${item.summary.requestedLessons}</div>
                  <div class="note">Estudo medio ${item.summary.averageStudiedLesson} - Visitas ${item.summary.totals.visits} - Batismos ${item.summary.totals.baptized} - Oferta ${Number(item.summary.totals.offering || 0).toFixed(2)}</div>
                </div>
                <div class="stack" style="text-align:right">
                  <span class="chip">${escapeHTML(attendanceTrend)}</span>
                  <span class="note">Oferta: ${escapeHTML(offeringTrend)}</span>
                </div>
              </div>
            `;
          })
          .join("")}
      </div>
    </div>
  `;
}

function buildReport(type, period, classId) {
  const classLabel = classId === "all" ? "Todas" : className(classId);
  const year = state.ui.reportYear;
  const quarter = state.ui.reportQuarter;
  const week = state.ui.reportWeek;
  const quarterKey = getQuarterKey(year, quarter);
  const weekDate = getReportDateForQuarterWeek(year, quarter, week);
  const periodLabel =
    period === "week"
      ? `Sábado ${week} · T${quarter} ${year}`
      : period === "quarter"
      ? `Trimestre ${quarter} ${year}`
      : `Ano ${year}`;

  const matchesPeriod = (date) => {
    if (period === "week") return date === weekDate;
    if (period === "quarter") return reportQuarterForDate(date) === quarterKey;
    if (period === "year") return new Date(`${date}T00:00:00`).getFullYear() === year;
    return true;
  };

  const matchesClass = (itemClassId) => classId === "all" || itemClassId === classId;

  if (type === "attendance") {
    const sessions = state.attendance.filter(
      (session) => matchesClass(session.classId) && matchesPeriod(session.date)
    );
    return {
      title: "Relatório de presenças",
      periodLabel,
      classLabel,
      total: sessions.length,
      caption: "Sessões registadas",
      note: "Presença por sábado",
      rows: sessions.map((session) => ({
        label: `${className(session.classId)} · ${formatDate(session.date)}`,
        value: `${session.entries.filter((entry) => entry.status === "presente").length} presentes`,
        note: `${session.visitorCount || 0} visitantes`,
      })),
    };
  }

  if (type === "lessons") {
    const lessons = state.lessons.filter(
      (lesson) => matchesClass(lesson.classId) && matchesPeriod(lesson.date)
    );
    return {
      title: "Relatório de lições",
      periodLabel,
      classLabel,
      total: lessons.length,
      caption: "Lições registadas",
      note: "Tema e liderança",
      rows: lessons.map((lesson) => ({
        label: `${className(lesson.classId)} · ${formatDate(lesson.date)}`,
        value: lesson.topic,
        note: lesson.leader,
      })),
    };
  }

  if (type === "visitors") {
    const sessions = state.attendance.filter(
      (session) => matchesClass(session.classId) && matchesPeriod(session.date)
    );
    const totalVisitors = sessions.reduce((total, session) => total + (session.visitorCount || 0), 0);
    return {
      title: "Relatório de visitantes",
      periodLabel,
      classLabel,
      total: totalVisitors,
      caption: "Visitantes recebidos",
      note: "Apoio à hospitalidade",
      rows: sessions.map((session) => ({
        label: `${className(session.classId)} · ${formatDate(session.date)}`,
        value: `${session.visitorCount || 0}`,
        note: session.note || "Sem observações",
      })),
    };
  }

  const rows = rankingRows(period, year, quarter, week).filter((row) => classId === "all" || row.id === classId);
  return {
    title: "Relatório de classe em destaque",
    periodLabel,
    classLabel,
    total: rows[0]?.weighted || 0,
    caption: "Pontuação máxima",
    note: "Ranking das classes",
    rows: rows.map((row, index) => ({
      label: `#${index + 1} ${row.name}`,
      value: `${row.weighted} pontos`,
      note: `Presença ${row.score.attendance}% · Lição ${row.score.lesson}% · Participação ${row.score.participation}%`,
    })),
  };
}

function targetLabel(messageOrTarget, fallback = null) {
  const message =
    messageOrTarget && typeof messageOrTarget === "object"
      ? messageOrTarget
      : { target: messageOrTarget, recipientName: fallback };
  if (message.target === "all") return "Todos os membros";
  if (message.target === "secretary") return "Direcção";
  if (message.target === "member") {
    if (message.recipientName) return `Membro · ${message.recipientName}`;
    if (message.recipientMemberId) {
      const member = state.members.find((item) => item.id === message.recipientMemberId);
      if (member) return `Membro · ${member.name}`;
    }
    return "Membro específico";
  }
  return "Mensagem";
}

function replyTargetForMessage(message) {
  const user = currentUser();
  if (!user || !message) return null;
  if (message.fromRole === "member") {
    const recipientMember = state.members.find((member) => member.name === message.from) || null;
    return {
      target: "member",
      recipientMemberId: recipientMember?.id || null,
      recipientName: message.from,
    };
  }
  if (message.fromRole === "secretary") {
    return {
      target: "secretary",
      recipientMemberId: null,
      recipientName: null,
    };
  }
  if (message.target === "all") {
    return {
      target: "secretary",
      recipientMemberId: null,
      recipientName: null,
    };
  }
  return null;
}

function fillMessageReply(message) {
  const form = document.getElementById("messageForm");
  if (!form || !message) return;
  const reply = replyTargetForMessage(message);
  if (!reply) return;

  const targetSelect = form.querySelector("#messageTarget");
  const recipientSelect = form.querySelector("#messageRecipientId");
  const subjectInput = form.querySelector("#messageSubject");
  const bodyInput = form.querySelector("#messageBody");

  if (targetSelect) {
    targetSelect.value = reply.target;
    targetSelect.dispatchEvent(new Event("change", { bubbles: true }));
  }
  if (recipientSelect) {
    recipientSelect.value = reply.recipientMemberId || "";
  }
  if (subjectInput) {
    const currentSubject = String(message.subject || "").trim();
    subjectInput.value = currentSubject.toLowerCase().startsWith("re:")
      ? currentSubject
      : `Re: ${currentSubject || "Mensagem"}`;
  }
  if (bodyInput) bodyInput.focus();
  form.scrollIntoView({ behavior: "smooth", block: "start" });
}

function render() {
  app.innerHTML = state.session ? shellView() : loginView();
  initializeDashboardCharts();
  wireEvents();
}

function wireEvents() {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }

  const togglePasswordButton = document.querySelector("[data-action='toggle-password']");
  if (togglePasswordButton) {
    togglePasswordButton.addEventListener("click", (e) => {
      e.preventDefault();
      const passwordInput = document.getElementById("password");
      const isPassword = passwordInput.type === "password";
      passwordInput.type = isPassword ? "text" : "password";
      togglePasswordButton.innerHTML = isPassword ? icon("eyeOff") : icon("eye");
    });
  }

  document.querySelectorAll("[data-nav]").forEach((button) => {
    button.addEventListener("click", () => {
      state.ui.view = button.dataset.nav;
      state.ui.sidebarOpen = false;
      persist();
      render();
      if (button.dataset.nav === "account" && isSecretary()) {
        apiFetch("/api/accounts")
          .then((data) => {
            state.accounts = data.accounts;
            render();
          })
          .catch((err) => console.error("Falha ao carregar contas:", err));
      }
    });
  });

  const toggleSidebar = document.querySelector("[data-action='toggle-sidebar']");
  if (toggleSidebar) {
    toggleSidebar.addEventListener("click", () => {
      state.ui.sidebarOpen = !state.ui.sidebarOpen;
      render();
    });
  }

  const closeSidebar = document.querySelector("[data-action='close-sidebar']");
  if (closeSidebar) {
    closeSidebar.addEventListener("click", () => {
      state.ui.sidebarOpen = false;
      render();
    });
  }

  document.querySelectorAll("[data-action='logout']").forEach((button) => {
    button.addEventListener("click", () => {
      apiFetch("/api/auth/logout", { method: "POST" }).catch(() => {});
      setToken(null);
      const ui = state.ui;
      state = seed();
      state.ui = ui;
      state.currentUser = null;
      render();
    });
  });

  const memberForm = document.getElementById("memberForm");
  if (memberForm) memberForm.addEventListener("submit", handleMemberSubmit);

  const passwordForm = document.getElementById("passwordForm");
  if (passwordForm) passwordForm.addEventListener("submit", handlePasswordChangeSubmit);

  document.querySelectorAll("[data-action='reset-password']").forEach((button) => {
    button.addEventListener("click", () => resetAccountPassword(button.dataset.id, button.dataset.name));
  });

  document.querySelectorAll("[data-action='edit-member']").forEach((button) => {
    button.addEventListener("click", () => {
      state.ui.editMemberId = button.dataset.id;
      render();
    });
  });

  document.querySelectorAll("[data-action='toggle-member']").forEach((button) => {
    button.addEventListener("click", () => toggleMember(button.dataset.id));
  });

  const attendanceForm = document.getElementById("attendanceForm");
  if (attendanceForm) attendanceForm.addEventListener("submit", handleAttendanceSubmit);

  document.querySelectorAll("[data-action='attendance-history-class']").forEach((select) => {
    select.addEventListener("change", () => {
      state.ui.attendanceClassId = select.value;
      persist();
      render();
    });
  });

  document.querySelectorAll("[data-action='member-filter']").forEach((select) => {
    select.addEventListener("change", () => {
      state.ui.memberFilterClass = select.value;
      persist();
      render();
    });
  });

  document.querySelectorAll("[data-action='lesson-filter-class']").forEach((select) => {
    select.addEventListener("change", () => {
      state.ui.lessonClassId = select.value;
      persist();
      render();
    });
  });

  document.querySelectorAll("[data-action='lesson-filter-quarter']").forEach((input) => {
    input.addEventListener("change", () => {
      state.ui.lessonQuarter = input.value;
      persist();
      render();
    });
  });

  const lessonForm = document.getElementById("lessonForm");
  if (lessonForm) lessonForm.addEventListener("submit", handleLessonSubmit);

  document.querySelectorAll("[data-action='request-filter-quarter']").forEach((input) => {
    input.addEventListener("change", () => {
      state.ui.requestQuarter = input.value;
      persist();
      render();
    });
  });

  const requestForm = document.getElementById("requestForm");
  if (requestForm) requestForm.addEventListener("submit", handleRequestSubmit);

  const programForm = document.getElementById("programForm");
  if (programForm) programForm.addEventListener("submit", handleProgramSubmit);

  document.querySelectorAll("[data-action='program-date']").forEach((input) => {
    input.addEventListener("change", () => {
      state.ui.programDate = input.value;
      persist();
      render();
    });
  });

  const settingsForm = document.getElementById("settingsForm");
  if (settingsForm) settingsForm.addEventListener("submit", handleSettingsSubmit);

  document.querySelectorAll("[data-action='ranking-period']").forEach((select) => {
    select.addEventListener("change", () => {
      state.ui.rankingPeriod = select.value;
      persist();
      render();
    });
  });

  const reportFilterForm = document.getElementById("reportFilterForm");
  if (reportFilterForm) reportFilterForm.addEventListener("submit", handleReportFilterSubmit);

  const weeklyReportForm = document.getElementById("weeklyReportForm");
  if (weeklyReportForm) weeklyReportForm.addEventListener("submit", handleWeeklyReportSubmit);

  document.querySelectorAll("[data-action='print-report']").forEach((button) => {
    button.addEventListener("click", printReport);
  });

  document.querySelectorAll("[data-action='print-dashboard']").forEach((button) => {
    button.addEventListener("click", printDashboard);
  });

  const reportQuarterSelect = document.querySelector("[data-action='report-quarter']");
  if (reportQuarterSelect) {
    reportQuarterSelect.addEventListener("change", (event) => {
      state.ui.reportQuarter = Number(event.target.value);
      state.ui.reportDate = getWeeklyReportDateForQuarterWeek(state.ui.reportYear, state.ui.reportQuarter, state.ui.reportWeek);
      persist();
      render();
    });
  }

  const reportYearSelect = document.querySelector("[data-action='report-year']");
  if (reportYearSelect) {
    reportYearSelect.addEventListener("change", (event) => {
      state.ui.reportYear = Number(event.target.value);
      state.ui.reportDate = getWeeklyReportDateForQuarterWeek(state.ui.reportYear, state.ui.reportQuarter, state.ui.reportWeek);
      persist();
      render();
    });
  }

  const reportWeekSelect = document.querySelector("[data-action='report-week']");
  if (reportWeekSelect) {
    reportWeekSelect.addEventListener("change", (event) => {
      state.ui.reportWeek = Number(event.target.value);
      state.ui.reportDate = getWeeklyReportDateForQuarterWeek(state.ui.reportYear, state.ui.reportQuarter, state.ui.reportWeek);
      persist();
      render();
    });
  }

  const weeklyReportDateInput = document.querySelector("[data-action='weekly-report-date']");
  if (weeklyReportDateInput) {
    weeklyReportDateInput.addEventListener("change", (event) => {
      const date = event.target.value;
      if (!date) return;
      const [yearString, quarterString] = reportQuarterForDate(date).split("-T");
      state.ui.reportYear = Number(yearString);
      state.ui.reportQuarter = Number(quarterString);
      state.ui.reportWeek = reportWeekForDate(date);
      state.ui.reportDate = date;
      persist();
      render();
    });
  }

  const messageForm = document.getElementById("messageForm");
  if (messageForm) messageForm.addEventListener("submit", handleMessageSubmit);

  const messageTargetSelect = document.querySelector("[data-action='message-target-toggle']");
  const messageRecipientWrap = document.getElementById("messageRecipientWrap");
  const syncMessageRecipientVisibility = () => {
    if (!messageTargetSelect || !messageRecipientWrap) return;
    const showRecipient = messageTargetSelect.value === "member";
    messageRecipientWrap.classList.toggle("hidden", !showRecipient);
    const recipientSelect = document.getElementById("messageRecipientId");
    if (recipientSelect) recipientSelect.disabled = !showRecipient;
  };
  if (messageTargetSelect) {
    messageTargetSelect.addEventListener("change", syncMessageRecipientVisibility);
    syncMessageRecipientVisibility();
  }

  document.querySelectorAll("[data-action='message-mode']").forEach((button) => {
    button.addEventListener("click", () => {
      state.ui.messageMode = button.dataset.mode;
      state.ui.messageConversationKey = null;
      persist();
      render();
    });
  });

  const cancelEdit = document.querySelector("[data-action='cancel-member-edit']");
  if (cancelEdit) {
    cancelEdit.addEventListener("click", () => {
      state.ui.editMemberId = null;
      render();
    });
  }
}

async function handleLogin(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const username = form.username.value.trim();
  const password = form.password.value.trim();
  const submitButton = form.querySelector("button[type='submit']");
  if (submitButton) submitButton.disabled = true;
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json().catch(() => null);
    if (!response.ok) {
      alert((data && data.error) || "Utilizador ou senha inválidos.");
      return;
    }
    setToken(data.token);
    state.currentUser = data.user;
    state.session = { userId: data.user.id };
    await loadSharedState();
    state.ui.view = "dashboard";
    render();
  } catch (err) {
    console.error(err);
    alert("Não foi possível ligar ao servidor. Verifique a sua ligação à internet.");
  } finally {
    if (submitButton) submitButton.disabled = false;
  }
}

async function handlePasswordChangeSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const currentPassword = form.currentPassword.value;
  const newPassword = form.newPassword.value;
  const confirmPassword = form.confirmPassword.value;
  if (newPassword !== confirmPassword) {
    alert("A nova senha e a confirmação não coincidem.");
    return;
  }
  if (newPassword.length < 6) {
    alert("A nova senha deve ter pelo menos 6 caracteres.");
    return;
  }
  try {
    await apiFetch("/api/auth/password", { method: "POST", body: JSON.stringify({ currentPassword, newPassword }) });
    alert("Senha alterada com sucesso.");
    form.reset();
  } catch (err) {
    alert(err.message || "Não foi possível mudar a senha.");
  }
}

async function resetAccountPassword(accountId, name) {
  const newPassword = window.prompt(`Nova senha para ${name || "esta conta"} (mínimo 6 caracteres):`);
  if (!newPassword) return;
  if (newPassword.length < 6) {
    alert("A nova senha deve ter pelo menos 6 caracteres.");
    return;
  }
  try {
    await apiFetch(`/api/accounts/${encodeURIComponent(accountId)}/password`, {
      method: "POST",
      body: JSON.stringify({ newPassword }),
    });
    alert("Senha reposta com sucesso.");
  } catch (err) {
    alert(err.message || "Não foi possível repor a senha.");
  }
}

// Remove acentos e caracteres não alfanuméricos, para que o nome de
// utilizador gerado automaticamente (a partir do primeiro nome) seja
// sempre fácil de digitar, mesmo em teclados sem acentos.
function normalizeUsername(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

async function handleMemberSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const payload = {
    name: form.name.value.trim(),
    contact: form.contact.value.trim(),
    classId: form.classId.value,
    joinedAt: form.joinedAt.value,
    active: form.active.value === "true",
  };
  if (state.ui.editMemberId) {
    const member = state.members.find((item) => item.id === state.ui.editMemberId);
    if (member) Object.assign(member, payload);
  } else {
    const newMemberId = uid("m");
    state.members.push({ id: newMemberId, ...payload });

    // Criar automaticamente uma conta de acesso para o novo membro, usando
    // o primeiro nome como utilizador. A senha é escolhida e encriptada no
    // servidor; nunca circula em claro no lado do cliente. Se já existir
    // alguém com o mesmo primeiro nome, acrescenta-se um número (ex:
    // "joao2") para que o utilizador seja sempre único.
    const baseUsername = normalizeUsername(payload.name.split(" ")[0]) || "membro";
    let attemptUsername = baseUsername;
    let attempt = 1;
    let created = false;
    let lastError = null;
    while (!created && attempt <= 20) {
      try {
        await apiFetch("/api/accounts", {
          method: "POST",
          body: JSON.stringify({
            username: attemptUsername,
            password: "Membro26",
            name: payload.name,
            memberId: newMemberId,
          }),
        });
        created = true;
      } catch (err) {
        lastError = err;
        if (/já existe/i.test(err.message || "")) {
          attempt += 1;
          attemptUsername = `${baseUsername}${attempt}`;
        } else {
          break;
        }
      }
    }
    if (!created) {
      console.error(lastError);
      alert(
        "O membro foi guardado, mas não foi possível criar a conta de acesso: " +
          (lastError?.message || "erro desconhecido")
      );
    } else if (attemptUsername !== baseUsername) {
      alert(`Conta de acesso criada com o utilizador "${attemptUsername}" (já existia outro membro chamado "${baseUsername}").`);
    }
  }
  state.ui.editMemberId = null;
  persist();
  render();
}

function toggleMember(id) {
  const member = state.members.find((item) => item.id === id);
  if (!member) return;
  member.active = !member.active;
  persist();
  render();
}

function handleAttendanceSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const date = form.querySelector("#attendanceDate").value;
  const classId = form.querySelector("#attendanceClassId").value;
  const visitorCount = Number(form.querySelector("#attendanceVisitors").value || 0);
  const note = form.querySelector("#attendanceNote").value.trim();
  const entries = visibleMembers()
    .filter((member) => member.classId === classId)
    .map((member) => {
      const checked = form.querySelector(`input[name="attendance_${member.id}"]:checked`);
      return {
        memberId: member.id,
        status: checked?.value || "ausente",
      };
    });
  const existing = state.attendance.find((item) => item.date === date && item.classId === classId);
  if (existing) {
    existing.entries = entries;
    existing.visitorCount = visitorCount;
    existing.note = note;
  } else {
    state.attendance.push({ id: uid("a"), date, classId, visitorCount, note, entries });
  }
  state.ui.attendanceDate = date;
  state.ui.attendanceClassId = classId;
  persist();
  render();
}

function handleLessonSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  state.lessons.push({
    id: uid("l"),
    date: form.querySelector("#lessonDate").value,
    quarter: form.querySelector("#lessonQuarterInput").value.trim(),
    classId: form.querySelector("#lessonClassId").value,
    topic: form.querySelector("#lessonTopic").value.trim(),
    leader: form.querySelector("#lessonLeader").value.trim(),
  });
  state.ui.lessonQuarter = form.querySelector("#lessonQuarterInput").value.trim();
  state.ui.lessonClassId = form.querySelector("#lessonClassId").value;
  persist();
  render();
}

function handleRequestSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  state.quarterlyRequests.push({
    id: uid("q"),
    quarter: form.querySelector("#requestQuarter").value.trim(),
    classId: form.querySelector("#requestClassId").value,
    quantity: Number(form.querySelector("#requestQuantity").value || 0),
    status: form.querySelector("#requestStatus").value,
    createdAt: todayISO(),
  });
  state.ui.requestQuarter = form.querySelector("#requestQuarter").value.trim();
  persist();
  render();
}

function handleProgramSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  state.programs.push({
    id: uid("p"),
    date: form.querySelector("#programDate").value,
    order: Number(form.querySelector("#programOrder").value || 1),
    time: form.querySelector("#programTime").value.trim(),
    activity: form.querySelector("#programActivity").value.trim(),
    responsible: form.querySelector("#programResponsible").value.trim(),
    note: form.querySelector("#programNote").value.trim(),
    classId: form.querySelector("#programClassId").value,
  });
  state.ui.programDate = form.querySelector("#programDate").value;
  persist();
  render();
}

function handleSettingsSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  state.settings.attendanceWeight = Number(form.querySelector("#attendanceWeight").value || 0);
  state.settings.lessonWeight = Number(form.querySelector("#lessonWeight").value || 0);
  state.settings.participationWeight = Number(form.querySelector("#participationWeight").value || 0);
  persist();
  render();
}

function handleReportFilterSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  state.ui.reportYear = Number(form.querySelector("#reportYear").value);
  state.ui.reportQuarter = Number(form.querySelector("#reportQuarter").value);
  state.ui.reportWeek = Number(form.querySelector("#reportWeek").value);
  state.ui.reportDate = getReportDateForQuarterWeek(state.ui.reportYear, state.ui.reportQuarter, state.ui.reportWeek);
  persist();
  render();
}

function handleWeeklyReportSubmit(event) {
  event.preventDefault();
  if (!isSecretary()) {
    alert("Apenas Secretario/Diretor pode cadastrar relatorios.");
    return;
  }

  const form = event.currentTarget;
  const date = form.querySelector("#weeklyReportDate").value;
  const classes = state.classes.map((klass) => ({
    classId: klass.id,
    enrolled: Number(form.elements[`${klass.id}_enrolled`]?.value || 0),
    present: Number(form.elements[`${klass.id}_present`]?.value || 0),
    visits: Number(form.elements[`${klass.id}_visits`]?.value || 0),
    studiedLesson: Number(form.elements[`${klass.id}_studiedLesson`]?.value || 0),
    offering: Number(form.elements[`${klass.id}_offering`]?.value || 0),
    baptized: Number(form.elements[`${klass.id}_baptized`]?.value || 0),
  }));
  const report = {
    id: state.weeklyReports.find((item) => item.date === date)?.id || uid("wr"),
    date,
    classes,
  };
  const existingIndex = state.weeklyReports.findIndex((item) => item.date === date);
  if (existingIndex >= 0) {
    state.weeklyReports[existingIndex] = report;
  } else {
    state.weeklyReports.push(report);
  }
  const [yearString, quarterString] = reportQuarterForDate(date).split("-T");
  state.ui.reportYear = Number(yearString);
  state.ui.reportQuarter = Number(quarterString);
  state.ui.reportWeek = reportWeekForDate(date);
  state.ui.reportDate = date;
  persist();
  render();
}

async function handleMessageSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const member = currentMember();
  const target = form.querySelector("#messageTarget").value;
  const recipientMemberId = form.querySelector("#messageRecipientId").value || null;
  const recipientMember = recipientMemberId ? state.members.find((item) => item.id === recipientMemberId) || null : null;
  const subject = form.querySelector("#messageSubject").value.trim();
  const body = form.querySelector("#messageBody").value.trim();
  if (target === "member" && !recipientMemberId) {
    alert("Escolha um membro específico para enviar esta mensagem.");
    return;
  }
  try {
    const data = await apiFetch("/api/messages", {
      method: "POST",
      body: JSON.stringify({
        target,
        recipientMemberId,
        recipientName: recipientMember?.name || null,
        subject,
        body,
      }),
    });
    state.messages = data.messages;
    render();
  } catch (err) {
    alert(err.message || "Não foi possível enviar a mensagem.");
  }
}

function printReport() {
  const year = state.ui.reportYear;
  const quarter = state.ui.reportQuarter;
  const week = state.ui.reportWeek;
  const period = "quarter";
  const weekDate = getReportDateForQuarterWeek(year, quarter, week);
  const weeklyExisting = state.weeklyReports.find((item) => item.date === weekDate) || null;
  const weeklyReport = buildWeeklyReportFromReport(weeklyExisting || { date: weekDate, classes: reportRowsFromReport(null) });
  const quarterSummary = quarterSummaryForDate(weekDate);
  
  // build competitive rows
  let competitiveRows = [];
  const reports = state.weeklyReports.filter((item) => reportQuarterForDate(item.date) === getQuarterKey(year, quarter));
  const count = reports.length || 1;
  competitiveRows = state.classes.map((klass) => {
    const totals = reports.reduce(
      (acc, r) => {
        const row = (r.classes || []).find((c) => c.classId === klass.id) || makeEmptyReportClassRow(klass.id);
        acc.enrolled += Number(row.enrolled || 0);
        acc.present += Number(row.present || 0);
        acc.visits += Number(row.visits || 0);
        acc.studiedLesson += Number(row.studiedLesson || 0);
        acc.offering += Number(row.offering || 0);
        return acc;
      },
      { enrolled: 0, present: 0, visits: 0, studiedLesson: 0, offering: 0 }
    );
    return {
      classId: klass.id,
      enrolled: totals.enrolled,
      present: totals.present,
      visits: totals.visits,
      studiedLesson: totals.studiedLesson,
      offering: totals.offering,
      avgEnrolled: Math.round(totals.enrolled / count),
      avgPresent: Math.round(totals.present / count),
      count,
    };
  });

  const periodLabel = `Trimestre ${quarter} ${year}`;
  const html = `
    <html>
      <head>
        <title>Relatório - ${periodLabel}</title>
        <style>
          body{font-family:Segoe UI,Arial,sans-serif;padding:24px;color:#12201d}
          h1,h2{margin:24px 0 12px;font-size:1.4rem}
          h1{border-bottom:2px solid #58706b;padding-bottom:8px}
          .section{margin-bottom:32px}
          .metrics{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-top:12px}
          .metric{border:1px solid #c8d6d2;border-radius:8px;padding:12px}
          .metric-label{font-size:0.85rem;color:#58706b;font-weight:600}
          .metric-value{font-size:1.8rem;font-weight:700;color:#12201d;margin:8px 0}
          .metric-caption{font-size:0.8rem;color:#58706b}
          .class-item{border-bottom:1px solid #dbe5e1;padding:12px 0}
          .class-name{font-weight:600;font-size:1rem}
          .class-meta{font-size:0.9rem;color:#58706b;margin:4px 0}
          .class-score{text-align:right;font-weight:600}
          table{width:100%;border-collapse:collapse;margin-top:12px}
          td{padding:8px;border-bottom:1px solid #dbe5e1}
          td:first-child{font-weight:600}
        </style>
      </head>
      <body>
        <h1>Relatório - ${periodLabel}</h1>
        
        <div class="section">
          <h2>Quadro comparativo</h2>
          <div class="metrics">
            <div class="metric">
              <div class="metric-label">Matriculados</div>
              <div class="metric-value">${quarterSummary.average.enrolled || 0}</div>
              <div class="metric-caption">Total da escola</div>
            </div>
            <div class="metric">
              <div class="metric-label">Presentes</div>
              <div class="metric-value">${quarterSummary.average.present || "-"}</div>
              <div class="metric-caption">Pessoas presentes</div>
            </div>
            <div class="metric">
              <div class="metric-label">Visitas</div>
              <div class="metric-value">${quarterSummary.average.visits || "-"}</div>
              <div class="metric-caption">Visitantes</div>
            </div>
            <div class="metric">
              <div class="metric-label">Estudaram lição</div>
              <div class="metric-value">${quarterSummary.average.studiedLesson || "-"}</div>
              <div class="metric-caption">Lição concluída</div>
            </div>
            <div class="metric">
              <div class="metric-label">Oferta total</div>
              <div class="metric-value">${quarterSummary.average.offering || "-"}</div>
              <div class="metric-caption">Média por sábado</div>
            </div>
            <div class="metric">
              <div class="metric-label">Ofertas acumuladas</div>
              <div class="metric-value">${quarterSummary.accumulatedOffering || 0}</div>
              <div class="metric-caption">Acumulado do trimestre</div>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>Quadro competitivo</h2>
          ${competitiveRows && competitiveRows.length
            ? competitiveRows
                .map((row) => {
                  const score = Number(row.present || 0) + Number(row.visits || 0) + Number(row.studiedLesson || 0);
                  return `
                    <div class="class-item">
                      <div class="class-name">${escapeHTML(className(row.classId))}</div>
                      <div class="class-meta">Total: ${row.enrolled} matriculados · ${row.present} presentes · ${row.visits} visitas</div>
                      <div class="class-meta">Média por sábado: ${row.avgEnrolled} matriculados · ${row.avgPresent} presentes · (${row.count} sábados)</div>
                      <table>
                        <tr><td>Pontuação</td><td class="class-score">${score} pontos</td></tr>
                        <tr><td>Oferta</td><td class="class-score">${Number(row.offering || 0).toFixed(2)}</td></tr>
                      </table>
                    </div>
                  `;
                })
                .join("")
            : `<div style="color:#58706b">Sem dados para este período.</div>`}
        </div>

        <script>window.onload=()=>{window.print();}</script>
      </body>
    </html>
  `;
  const win = window.open("", "_blank", "width=900,height=700");
  if (!win) {
    alert("O navegador bloqueou a janela de impressão.");
    return;
  }
  win.document.open();
  win.document.write(html);
  win.document.close();
}

function printDashboard() {
  const summary = buildDashboard();
  const year = state.ui.reportYear;
  const quarter = state.ui.reportQuarter;
  const periodLabel = `${quarter}º Trimestre ${year}`;
  const quarterData = summary.quarterData;
  const totalVisits = quarterData.reduce((sum, item) => sum + item.visits, 0);
  const totalBaptized = quarterData.reduce((sum, item) => sum + item.baptized, 0);
  const requestTotals = getQuarterlyRequestTotalsByClass(state.ui.requestQuarter);
  const ranking = rankingRows("quarter", year, quarter);

  const html = `
    <html>
      <head>
        <title>Visão Geral - ${periodLabel}</title>
        <style>
          body{font-family:Segoe UI,Arial,sans-serif;padding:24px;color:#1B2A45}
          h1,h2{margin:24px 0 12px;font-size:1.4rem;font-family:Georgia,serif}
          h1{border-bottom:2px solid #1B2A45;padding-bottom:8px}
          .meta{color:#3C4E6E;font-size:0.9rem;margin-top:-8px}
          .section{margin-bottom:32px}
          .metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:12px}
          .metric{border:1px solid #E4DCC9;border-left:3px solid #C79A3E;border-radius:6px;padding:12px}
          .metric-label{font-size:0.78rem;text-transform:uppercase;letter-spacing:.06em;color:#3C4E6E;font-weight:600}
          .metric-value{font-size:1.6rem;font-weight:700;color:#1B2A45;margin:8px 0 0}
          table{width:100%;border-collapse:collapse;margin-top:12px}
          th{text-align:left;font-size:0.8rem;text-transform:uppercase;color:#3C4E6E;padding:8px 8px;border-bottom:2px solid #E4DCC9}
          td{padding:8px;border-bottom:1px solid #E4DCC9}
          td:first-child{font-weight:600}
        </style>
      </head>
      <body>
        <h1>Visão Geral - ${periodLabel}</h1>
        <div class="meta">Semana ${state.ui.reportWeek} de 13 · Gerado em ${escapeHTML(weeklyReportLabel(getWeeklyReportDate()))}</div>

        <div class="section">
          <h2>Resumo do trimestre</h2>
          <div class="metrics">
            <div class="metric">
              <div class="metric-label">Membros ativos</div>
              <div class="metric-value">${summary.members}</div>
            </div>
            <div class="metric">
              <div class="metric-label">Frequência média</div>
              <div class="metric-value">${summary.attendance}%</div>
            </div>
            <div class="metric">
              <div class="metric-label">Visitas no trimestre</div>
              <div class="metric-value">${totalVisits}</div>
            </div>
            <div class="metric">
              <div class="metric-label">Batismos no trimestre</div>
              <div class="metric-value">${totalBaptized}</div>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>Classe em destaque</h2>
          <table>
            <tr><th>Classe</th><th>Pontuação</th></tr>
            ${ranking
              .map((row) => `<tr><td>${escapeHTML(row.name)}</td><td>${row.weighted}</td></tr>`)
              .join("")}
          </table>
        </div>

        <div class="section">
          <h2>Trimensários por classe</h2>
          <table>
            <tr><th>Classe</th><th>Requisitados</th><th>Distribuídos</th></tr>
            ${requestTotals
              .map((item) => `<tr><td>${escapeHTML(item.className)}</td><td>${item.requested}</td><td>${item.distributed}</td></tr>`)
              .join("")}
          </table>
        </div>

        <script>window.onload=()=>{window.print();}</script>
      </body>
    </html>
  `;
  const win = window.open("", "_blank", "width=900,height=700");
  if (!win) {
    alert("O navegador bloqueou a janela de impressão.");
    return;
  }
  win.document.open();
  win.document.write(html);
  win.document.close();
}

if (!globalThis.__iasdGotoBound) {
  document.addEventListener("click", (event) => {
    const button = event.target.closest?.("[data-action='goto']");
    if (!button) return;
    navigateTo(button.dataset.view);
  });
  globalThis.__iasdGotoBound = true;
}

function reportQuarterForDate(dateString) {
  const date = new Date(`${dateString}T00:00:00`);
  const quarter = Math.floor(date.getMonth() / 3) + 1;
  return `${date.getFullYear()}-T${quarter}`;
}

function reportWeekForDate(dateString) {
  const date = new Date(`${dateString}T00:00:00`);
  const quarterKey = reportQuarterForDate(dateString);
  const [yearString, quarterString] = quarterKey.split("-T");
  const year = Number(yearString);
  const quarter = Number(quarterString);
  const firstSaturday = new Date(firstSaturdayOfQuarter(year, quarter));
  const diffDays = Math.round((date - firstSaturday) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return 1;
  return Math.min(13, Math.max(1, Math.floor(diffDays / 7) + 1));
}

function makeEmptyReportClassRow(classId) {
  return {
    classId,
    enrolled: 0,
    present: 0,
    visits: 0,
    studiedLesson: 0,
    offering: 0,
    baptized: 0,
  };
}

function reportRowsFromReport(report) {
  return state.classes.map((klass) => {
    const existing = report?.classes?.find((row) => row.classId === klass.id);
    return existing || makeEmptyReportClassRow(klass.id);
  });
}

function reportTotals(report) {
  const rows = reportRowsFromReport(report);
  const enrolled = rows.reduce((sum, row) => sum + Number(row.enrolled || 0), 0);
  const present = rows.reduce((sum, row) => sum + Number(row.present || 0), 0);
  const visits = rows.reduce((sum, row) => sum + Number(row.visits || 0), 0);
  const studiedLesson = rows.reduce((sum, row) => sum + Number(row.studiedLesson || 0), 0);
  const offering = rows.reduce((sum, row) => sum + Number(row.offering || 0), 0);
  const baptized = rows.reduce((sum, row) => sum + Number(row.baptized || 0), 0);
  return {
    enrolled,
    present,
    visits,
    attendedWithVisits: present + visits,
    studiedLesson,
    offering,
    baptized,
  };
}

function getWeeklyReportDate() {
  const selectedDate = state.ui.reportDate;
  if (selectedDate) return selectedDate;
  return getWeeklyReportDateForQuarterWeek(state.ui.reportYear, state.ui.reportQuarter, state.ui.reportWeek);
}

function buildWeeklyReportFromReport(report) {
  const quarter = reportQuarterForDate(report.date);
  const totals = reportTotals(report);
  const previous = state.weeklyReports
    .filter((item) => reportQuarterForDate(item.date) === quarter && item.date < report.date)
    .sort((a, b) => a.date.localeCompare(b.date));
  const accumulatedOffering = previous.reduce((sum, item) => sum + reportTotals(item).offering, 0) + totals.offering;
  return {
    ...report,
    quarter,
    totals: {
      ...totals,
      accumulatedOffering,
    },
  };
}

function quarterSummaryForDate(dateString) {
  const quarter = reportQuarterForDate(dateString);
  const reports = state.weeklyReports
    .filter((item) => reportQuarterForDate(item.date) === quarter)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-13);

  const zero = { enrolled: 0, present: 0, visits: 0, attendedWithVisits: 0, studiedLesson: 0, offering: 0, accumulatedOffering: 0 };
  const combined = reports.reduce((acc, report) => {
    const totals = report.totals || reportTotals(report);
    acc.enrolled += totals.enrolled || 0;
    acc.present += totals.present || 0;
    acc.visits += totals.visits || 0;
    acc.attendedWithVisits += totals.attendedWithVisits || 0;
    acc.studiedLesson += totals.studiedLesson || 0;
    acc.offering += totals.offering || 0;
    acc.accumulatedOffering = totals.accumulatedOffering || acc.accumulatedOffering;
    return acc;
  }, zero);
  const count = reports.length || 1;
  return {
    quarter,
    count: reports.length,
    average: {
      enrolled: Math.round(combined.enrolled / count),
      present: Math.round(combined.present / count),
      visits: Math.round(combined.visits / count),
      attendedWithVisits: Math.round(combined.attendedWithVisits / count),
      studiedLesson: Math.round(combined.studiedLesson / count),
      offering: Math.round(combined.offering / count),
    },
    accumulatedOffering: combined.accumulatedOffering,
  };
}

function weeklyReportLabel(dateString) {
  return new Intl.DateTimeFormat("pt-MZ", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${dateString}T00:00:00`));
}


function navigateTo(view) {
  state.ui.view = view;
  persist();
  render();
}

async function removeRecord(kind, id) {
  const labels = {
    member: "membro",
    lesson: "lição",
    request: "requisição",
    program: "item do programa",
    attendance: "registo de presença",
  };

  if (!window.confirm(`Remover este ${labels[kind] || "registo"}?`)) {
    return;
  }

  const map = {
    member: "members",
    lesson: "lessons",
    request: "quarterlyRequests",
    program: "programs",
    attendance: "attendance",
  };

  const key = map[kind];
  if (!key || !Array.isArray(state[key])) return;
  state[key] = state[key].filter((item) => item.id !== id);

  if (kind === "member") {
    // Remove a conta de acesso ligada a este membro (no servidor) e limpar
    // as presenças registadas em seu nome, para não deixar dados órfãos.
    try {
      await apiFetch(`/api/accounts/member/${encodeURIComponent(id)}`, { method: "DELETE" });
    } catch (err) {
      console.error("Falha ao remover a conta associada ao membro:", err);
    }
    state.attendance.forEach((session) => {
      session.entries = (session.entries || []).filter((entry) => entry.memberId !== id);
    });
  }

  persist();
  render();
}

async function removeMessage(id) {
  try {
    const data = await apiFetch(`/api/messages/${encodeURIComponent(id)}`, { method: "DELETE" });
    state.messages = data.messages;
    render();
  } catch (err) {
    alert(err.message || "Não foi possível remover a mensagem.");
  }
}

function recentActivityItems() {
  const items = [
    ...state.attendance.map((session) => ({
      kind: "Presenca",
      date: session.date,
      title: `${className(session.classId)} - ${formatDate(session.date)}`,
      meta: `${session.entries.filter((entry) => entry.status === "presente").length} presentes · ${session.visitorCount || 0} visitantes`,
    })),
    ...state.lessons.map((lesson) => ({
      kind: "Licao",
      date: lesson.date,
      title: lesson.topic,
      meta: `${className(lesson.classId)} · ${lesson.leader}`,
    })),
    ...state.quarterlyRequests.map((request) => ({
      kind: "Trimestral",
      date: request.createdAt,
      title: `${className(request.classId)} - ${request.quantity} unidades`,
      meta: `${request.quarter} · ${request.status}`,
    })),
    ...state.messages.map((message) => ({
      kind: "Mensagem",
      date: message.createdAt,
      title: message.subject,
      meta: `${message.from} · ${targetLabel(message)}`,
    })),
  ];

  return items
    .slice()
    .sort((a, b) => `${b.date}`.localeCompare(`${a.date}`))
    .slice(0, 6);
}

function metricCard(title, value, caption, view = null) {
  const body = `
    <span class="chip">${escapeHTML(title)}</span>
    <strong>${escapeHTML(value)}</strong>
    <span>${escapeHTML(caption)}</span>
  `;
  if (!view) {
    return `<article class="panel metric soft">${body}</article>`;
  }
  return `<button type="button" class="panel metric soft clickable" data-action="goto" data-view="${view}">${body}</button>`;
}


function membersView() {
  const secretary = isSecretary();
  const members = visibleMembers();
  const classFilter = state.ui.memberFilterClass;
  const filtered = classFilter === "all" ? members : members.filter((item) => item.classId === classFilter);

  return `
    <section class="grid two">
      ${secretary ? `
      <div class="panel">
        <div class="section-header">
          <div>
            <h2>${state.ui.editMemberId ? "Editar membro" : "Novo membro"}</h2>
            </div>
        </div>
        <form id="memberForm" class="form-grid">
          <div class="form-grid two">
            <div class="field">
              <label for="memberName">Nome</label>
              <input id="memberName" name="name" value="${escapeHTML((state.members.find((item) => item.id === state.ui.editMemberId)?.name) || "")}" required />
            </div>
            <div class="field">
              <label for="memberContact">Contacto</label>
              <input id="memberContact" name="contact" value="${escapeHTML((state.members.find((item) => item.id === state.ui.editMemberId)?.contact) || "")}" />
            </div>
          </div>
          <div class="form-grid three">
            <div class="field">
              <label for="memberClass">Classe</label>
              <select id="memberClass" name="classId" required>
                ${state.classes
                  .map(
                    (klass) =>
                      `<option value="${klass.id}" ${state.members.find((item) => item.id === state.ui.editMemberId)?.classId === klass.id ? "selected" : ""}>${escapeHTML(klass.name)}</option>`
                  )
                  .join("")}
              </select>
            </div>
            <div class="field">
              <label for="memberJoined">Data de ingresso</label>
              <input id="memberJoined" name="joinedAt" type="date" value="${escapeHTML((state.members.find((item) => item.id === state.ui.editMemberId)?.joinedAt) || todayISO())}" required />
            </div>
            <div class="field">
              <label for="memberActive">Estado</label>
              <select id="memberActive" name="active">
                <option value="true" ${state.members.find((item) => item.id === state.ui.editMemberId)?.active !== false ? "selected" : ""}>Activo</option>
                <option value="false" ${state.members.find((item) => item.id === state.ui.editMemberId)?.active === false ? "selected" : ""}>Inactivo</option>
              </select>
            </div>
          </div>
          <div class="toolbar">
            <button class="btn primary" type="submit">${icon("save")} ${state.ui.editMemberId ? "Actualizar" : "Cadastrar"}</button>
            ${state.ui.editMemberId ? `<button class="btn" type="button" data-action="cancel-member-edit">Cancelar</button>` : ""}
          </div>
        </form>
      </div>
      ` : ""}
      <div class="panel">
        <div class="section-header">
          <div>
            <h2>Membros matriculados</h2>
            </div>
        </div>
        <div class="form-grid">
          <div class="field">
            <label for="memberFilterClass">Filtrar classe</label>
            <select id="memberFilterClass" data-action="member-filter">
              <option value="all">Todas</option>
              ${state.classes
                .map((klass) => `<option value="${klass.id}" ${classFilter === klass.id ? "selected" : ""}>${escapeHTML(klass.name)}</option>`)
                .join("")}
            </select>
          </div>
        </div>
        <div class="list">
          ${filtered
            .map(
              (member) => `
              <div class="row" style="grid-template-columns: minmax(0,1.6fr) repeat(3, minmax(0, 1fr));">
                <div>
                  <strong>${escapeHTML(member.name)}</strong>
                  <div class="note">${escapeHTML(member.contact || "Sem contacto")}</div>
                </div>
                <span class="chip gray">${escapeHTML(className(member.classId))}</span>
                <span>${formatDate(member.joinedAt)}</span>
                <span class="status ${member.active ? "ok" : "bad"}">${member.active ? "Activo" : "Inactivo"}</span>
                ${secretary ? `<div class="toolbar">
                  <button type="button" class="btn" data-action="edit-member" data-id="${member.id}">${icon("edit")} Editar</button>
                  <button type="button" class="btn danger" data-action="remove-member" data-id="${member.id}">Remover</button>
                </div>` : ""}
              </div>
            `
            )
            .join("") || `<div class="muted-box">Sem membros nesta classe.</div>`}
        </div>
      </div>
    </section>
  `;
}

function lessonsView() {
  const classId = state.ui.lessonClassId;
  const quarter = state.ui.lessonQuarter;
  const filtered = state.lessons.filter((item) => (classId === "all" || item.classId === classId) && item.quarter === quarter);
  return `
    <section class="grid two">
      <div class="panel">
        <div class="section-header">
          <div>
            <h2>Novo registo</h2>
            </div>
        </div>
        <form id="lessonForm" class="form-grid">
          <div class="form-grid three">
            <div class="field">
              <label for="lessonDate">Data</label>
              <input id="lessonDate" type="date" value="${escapeHTML(todayISO())}" required />
            </div>
            <div class="field">
              <label for="lessonQuarterInput">Trimestre</label>
              <input id="lessonQuarterInput" name="quarter" value="${escapeHTML(quarter)}" required />
            </div>
            <div class="field">
              <label for="lessonClassId">Classe</label>
              <select id="lessonClassId" name="classId" required>
                ${state.classes.map((klass) => `<option value="${klass.id}">${escapeHTML(klass.name)}</option>`).join("")}
              </select>
            </div>
          </div>
          <div class="field">
            <label for="lessonTopic">Tema da lição</label>
            <input id="lessonTopic" name="topic" placeholder="Tema do sabado" required />
          </div>
          <div class="field">
            <label for="lessonLeader">Quem ministrou / liderou</label>
            <input id="lessonLeader" name="leader" placeholder="Nome do lider" required />
          </div>
          <button class="btn primary" type="submit">${icon("save")} Guardar lição</button>
        </form>
      </div>
      <div class="panel">
        <div class="section-header">
          <div>
            <h2>Consulta</h2>
            </div>
        </div>
        <div class="form-grid two">
          <div class="field">
            <label for="lessonClassFilter">Classe</label>
            <select id="lessonClassFilter" data-action="lesson-filter-class">
              <option value="all">Todas</option>
              ${state.classes
                .map(
                  (klass) =>
                    `<option value="${klass.id}" ${classId === klass.id ? "selected" : ""}>${escapeHTML(klass.name)}</option>`
                )
                .join("")}
            </select>
          </div>
          <div class="field">
            <label for="lessonQuarterFilter">Trimestre</label>
            <input id="lessonQuarterFilter" data-action="lesson-filter-quarter" value="${escapeHTML(quarter)}" />
          </div>
        </div>
        <div class="list">
          ${filtered
            .slice()
            .reverse()
            .map(
              (lesson) => `
              <div class="muted-box">
                <div class="toolbar wrap">
                  <strong>${escapeHTML(lesson.topic)}</strong>
                  <div class="toolbar">
                    <span class="chip gray">${escapeHTML(className(lesson.classId))}</span>
                    <button type="button" class="btn danger" data-action="remove-lesson" data-id="${lesson.id}">Remover</button>
                  </div>
                </div>
                <div class="note">${formatDate(lesson.date)} · ${escapeHTML(lesson.leader)}</div>
              </div>
            `
            )
            .join("") || `<div class="muted-box">Nenhuma lição encontrada com estes filtros.</div>`}
        </div>
      </div>
    </section>
  `;
}

function programView() {
  const items = programsForDate(state.ui.programDate);
  if (!isSecretary()) {
    return readOnlyProgramView(items);
  }
  return `
    <section class="grid two">
      <div class="panel">
        <div class="section-header">
          <div>
            <h2>Publicar programa</h2>
            </div>
        </div>
        <form id="programForm" class="form-grid">
          <div class="form-grid two">
            <div class="field">
              <label for="programDate">Data</label>
              <input id="programDate" name="date" type="date" value="${escapeHTML(state.ui.programDate)}" required />
            </div>
            <div class="field">
              <label for="programClassId">Classe responsavel</label>
              <select id="programClassId" name="classId" required>
                ${state.classes
                  .map((klass) => `<option value="${klass.id}">${escapeHTML(klass.name)}</option>`)
                  .join("")}
              </select>
            </div>
          </div>
          <div class="form-grid three">
            <div class="field">
              <label for="programTime">Hora</label>
              <input id="programTime" name="time" value="08:00" required />
            </div>
            <div class="field">
              <label for="programOrder">Ordem</label>
              <input id="programOrder" name="order" type="number" min="1" value="${items.length + 1}" required />
            </div>
            <div class="field">
              <label for="programResponsible">Responsavel</label>
              <input id="programResponsible" name="responsible" required />
            </div>
          </div>
          <div class="field">
            <label for="programActivity">Actividade</label>
            <input id="programActivity" name="activity" required />
          </div>
          <div class="field">
            <label for="programNote">Observação</label>
            <textarea id="programNote" name="note"></textarea>
          </div>
          <button class="btn primary" type="submit">${icon("save")} Publicar item</button>
        </form>
      </div>
      <div class="panel">
        <div class="section-header">
          <div>
            <h2>Programa agendado</h2>
            </div>
        </div>
        <div class="field">
          <label for="programDateFilter">Data</label>
          <input id="programDateFilter" type="date" data-action="program-date" value="${escapeHTML(state.ui.programDate)}" />
        </div>
        <div class="list">
          ${items
            .map(
              (item) => `
              <div class="row" style="grid-template-columns: 72px minmax(0,1.55fr) 1fr 1fr;">
                <strong>${escapeHTML(item.time)}</strong>
                <div>
                  <strong>${escapeHTML(item.activity)}</strong>
                  <div class="note">${escapeHTML(item.note || "Sem observacoes")}</div>
                </div>
                <span>${escapeHTML(item.responsible)}</span>
                <span class="chip gray">${escapeHTML(className(item.classId))}</span>
                <div class="toolbar">
                  <button type="button" class="btn danger" data-action="remove-program" data-id="${item.id}">Remover</button>
                </div>
              </div>
            `
            )
            .join("") || `<div class="muted-box">Nenhum item registado para essa data.</div>`}
        </div>
      </div>
    </section>
  `;
}

function accountView() {
  const user = currentUser();
  const secretary = isSecretary();
  const accounts = state.accounts || [];
  return `
    <section class="grid two">
      <div class="panel">
        <div class="section-header">
          <div>
            <h2>Mudar a minha senha</h2>
            <p class="muted">A sessão em ${escapeHTML(user?.username || "")} (${secretary ? "direcção" : "membro"})</p>
          </div>
        </div>
        <form id="passwordForm" class="form-grid">
          <div class="field">
            <label for="currentPassword">Senha actual</label>
            <input id="currentPassword" name="currentPassword" type="password" required autocomplete="current-password" />
          </div>
          <div class="field">
            <label for="newPassword">Nova senha</label>
            <input id="newPassword" name="newPassword" type="password" required minlength="6" autocomplete="new-password" />
          </div>
          <div class="field">
            <label for="confirmPassword">Confirmar nova senha</label>
            <input id="confirmPassword" name="confirmPassword" type="password" required minlength="6" autocomplete="new-password" />
          </div>
          <button class="btn primary" type="submit">${icon("lock")} Mudar senha</button>
        </form>
      </div>
      ${
        secretary
          ? `
      <div class="panel">
        <div class="section-header">
          <div>
            <h2>Contas de acesso</h2>
            <p class="muted">Repor a senha de qualquer conta, se alguém esquecer a sua.</p>
          </div>
        </div>
        <div class="list">
          ${
            accounts.length
              ? accounts
                  .map(
                    (account) => `
              <div class="row" style="grid-template-columns: 1fr 1fr 120px;">
                <strong>${escapeHTML(account.name)}</strong>
                <span class="chip gray">${escapeHTML(account.username)} · ${account.role === "secretary" ? "Direcção" : "Membro"}</span>
                <button type="button" class="btn ghost" data-action="reset-password" data-id="${account.id}" data-name="${escapeHTML(account.name)}">Repor senha</button>
              </div>
            `
                  )
                  .join("")
              : `<div class="muted-box">A carregar contas...</div>`
          }
        </div>
      </div>
      `
          : ""
      }
    </section>
  `;
}

function messagesView() {
  const secretary = isSecretary();
  const messages = visibleMessages();
  const conversations = buildConversationSummaries(messages, true);
  const selectedKey = activeConversationKey(conversations);
  const selectedConversation = conversations.find((item) => item.key === selectedKey) || conversations[0] || null;
  const unreadConversations = buildConversationSummaries(messages, false).filter((item) => item.unreadCount > 0).length;
  return `
    <section class="grid two">
      <div class="panel">
        <div class="section-header">
          <div>
            <h2>${secretary ? "Chat da direcção" : "Chat de mensagens"}</h2>
            <p class="muted">Envie para todos, para a direcção ou para um membro específico.</p>
            </div>
        </div>
        <form id="messageForm" class="form-grid">
          <div class="form-grid two">
            <div class="field">
              <label for="messageTarget">Destino</label>
              <select id="messageTarget" name="target" data-action="message-target-toggle">
                <option value="all">Todos</option>
                <option value="secretary">Direcção</option>
                <option value="member">Membro específico</option>
              </select>
            </div>
            <div class="field hidden" id="messageRecipientWrap">
              <label for="messageRecipientId">Destinatário específico</label>
              <select id="messageRecipientId" name="recipientMemberId">
                <option value="">Escolher membro</option>
                ${state.members
                  .filter((member) => member.active)
                  .filter((member) => member.id !== (currentUser()?.memberId || null))
                  .map((member) => `<option value="${member.id}">${escapeHTML(member.name)} · ${escapeHTML(className(member.classId))}</option>`)
                  .join("")}
              </select>
            </div>
          </div>
          <div class="field">
            <label for="messageSubject">Assunto</label>
            <input id="messageSubject" name="subject" required placeholder="Ex: aviso, reunião, pedido..." />
          </div>
          <div class="field">
            <label for="messageBody">Mensagem</label>
            <textarea id="messageBody" name="body" required placeholder="Escreva a sua mensagem..."></textarea>
          </div>
          <button class="btn primary" type="submit">${icon("messages")} Enviar</button>
        </form>
      </div>
      <div class="panel">
        <div class="section-header">
          <div>
            <h2>Conversas</h2>
            <p class="muted">${unreadConversations} conversas com novidades</p>
            </div>
        </div>
        <div class="toolbar">
          <button class="btn ${state.ui.messageMode === "inbox" ? "primary" : ""}" type="button" data-action="message-mode" data-mode="inbox">Entrada</button>
          <button class="btn ${state.ui.messageMode === "outbox" ? "primary" : ""}" type="button" data-action="message-mode" data-mode="outbox">Saída</button>
          <button class="btn ${state.ui.messageMode === "all" ? "primary" : ""}" type="button" data-action="message-mode" data-mode="all">Todos</button>
        </div>
        <div class="conversation-grid">
          <div class="conversation-list">
            ${messageConversationList(conversations, selectedConversation?.key || null)}
          </div>
          <div class="conversation-thread">
            ${
              selectedConversation
                ? `
              <div class="conversation-thread-head">
                <div>
                  <h3>${escapeHTML(selectedConversation.title)}</h3>
                  <p class="muted">${selectedConversation.messages.length} mensagens nesta conversa</p>
                </div>
              </div>
              ${messageListChat(selectedConversation.messages)}
            `
                : `<div class="muted-box">Nenhuma conversa disponível.</div>`
            }
          </div>
        </div>
      </div>
    </section>
  `;
}

function messageList(messages) {
  const user = currentUser();
  let rows = messages.slice().sort((a, b) => String(a.createdAt).localeCompare(String(b.createdAt)));
  if (state.ui.messageMode === "inbox") {
    rows = rows.filter((msg) => msg.from !== user?.name);
  }
  if (state.ui.messageMode === "outbox") {
    rows = rows.filter((msg) => msg.from === user?.name);
  }
  return rows
    .slice()
    .reverse()
    .map(
      (message) => `
      <div class="muted-box">
        <div class="toolbar wrap">
          <strong>${escapeHTML(message.subject)}</strong>
          <div class="toolbar">
            <span class="chip ${message.fromRole === "secretary" ? "alt" : ""}">${escapeHTML(message.from)}</span>
            ${canModifyMessage(message) ? `<button type="button" class="btn danger" data-action="remove-message" data-id="${message.id}">Remover</button>` : ""}
          </div>
        </div>
        <div class="note">${formatDate(message.createdAt)} · ${escapeHTML(targetLabel(message))}</div>
        <div style="margin-top:8px">${escapeHTML(message.body)}</div>
      </div>
    `
    )
    .join("") || `<div class="muted-box">Sem mensagens para esta vista.</div>`;
}

function messageListChat(messages) {
  const user = currentUser();
  let rows = messages.slice().sort((a, b) => String(a.createdAt).localeCompare(String(b.createdAt)));
  return rows
    .map((message) => {
      const outgoing = message.from === user?.name;
      const recipient = targetLabel(message);
      return `
      <div class="chat-item ${outgoing ? "outgoing" : "incoming"}">
        <div class="chat-meta">
          <strong>${escapeHTML(message.from)}</strong>
          <span>${escapeHTML(recipient)}</span>
        </div>
        <div class="chat-bubble">
          <div class="chat-subject">${escapeHTML(message.subject)}</div>
          <div class="chat-body">${escapeHTML(message.body)}</div>
          <div class="chat-footer">
            <span>${formatDate(message.createdAt)}</span>
            ${!outgoing ? `<button type="button" class="btn" data-action="reply-message" data-id="${message.id}">Responder</button>` : ""}
            ${canModifyMessage(message) ? `<button type="button" class="btn danger" data-action="remove-message" data-id="${message.id}">Remover</button>` : ""}
          </div>
        </div>
      </div>
    `;
    })
    .join("") || `<div class="muted-box">Sem mensagens para esta vista.</div>`;
}

function messageConversationList(conversations, selectedKey) {
  const user = currentUser();
  return conversations
    .map((conversation) => {
      const latest = conversation.latest;
      const preview = latest ? `${latest.from}: ${latest.body}`.slice(0, 90) : "";
      return `
        <button type="button" class="conversation-item ${conversation.key === selectedKey ? "active" : ""}" data-action="message-conversation" data-id="${conversation.key}">
          <div class="conversation-item-top">
            <strong>${escapeHTML(conversation.title)}</strong>
            ${conversation.unreadCount ? `<span class="conversation-badge">${conversation.unreadCount}</span>` : ""}
          </div>
          <div class="conversation-preview">${escapeHTML(preview || "Sem pré-visualização")}</div>
          <div class="conversation-meta">
            <span>${latest ? formatDate(latest.createdAt) : ""}</span>
            <span>${conversation.messages.length} mensagens</span>
          </div>
        </button>
      `;
    })
    .join("") || `<div class="muted-box">Sem conversas para esta vista.</div>`;
}

function messageRecipientOptions() {
  const user = currentUser();
  const currentMemberId = user?.memberId || null;
  return state.members
    .filter((member) => member.active)
    .filter((member) => member.id !== currentMemberId)
    .sort((a, b) => a.name.localeCompare(b.name));
}

function memberReportsView() {
  const date = getWeeklyReportDate();
  const existing = state.weeklyReports.find((item) => item.date === date) || null;
  const report = buildWeeklyReportFromReport(existing || { date, classes: reportRowsFromReport(null) });
  const quarter = reportQuarterForDate(date);
  const recentReports = state.weeklyReports
    .filter((item) => reportQuarterForDate(item.date) === quarter)
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 13);

  return `
    <section class="panel">
      <div class="section-header">
        <div>
          <h2>Relatórios</h2>
          </div>
      </div>
      <div class="form-grid three">
        <div class="field">
          <label for="reportQuarter">Trimestre</label>
          <select id="reportQuarter" data-action="report-quarter">
            ${[1, 2, 3, 4]
              .map((value) => `<option value="${value}" ${state.ui.reportQuarter === value ? "selected" : ""}>${value}</option>`)
              .join("")}
          </select>
        </div>
        <div class="field">
          <label for="reportWeek">Sábado</label>
          <select id="reportWeek" data-action="report-week">
            ${Array.from({ length: 13 }, (_, index) => index + 1)
              .map((value) => `<option value="${value}" ${state.ui.reportWeek === value ? "selected" : ""}>${value}</option>`)
              .join("")}
          </select>
        </div>
        <div class="field">
          <label for="reportDate">Data do sábado</label>
          <input id="reportDate" type="date" value="${escapeHTML(date)}" data-action="weekly-report-date" />
        </div>
      </div>
    </section>

    <section class="grid two">
      <div class="panel">
        <div class="section-header">
          <div>
            <h2>Quadro comparativo</h2>
            </div>
        </div>
        <div class="grid four" style="grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px;">
          ${reportMetric("Matriculados", report.totals.enrolled, "Total da escola")}
          ${reportMetric("Presentes", report.totals.present, "Pessoas presentes")}
          ${reportMetric("Visitas", report.totals.visits, "Visitantes do sábado")}
          ${reportMetric("Estudaram lição", report.totals.studiedLesson, "Lição concluída")}
        </div>
        <div class="grid two" style="margin-top:14px">
          ${reportMetric("Oferta total", report.totals.offering, "Valor do sábado")}
          ${reportMetric("Ofertas acumuladas", report.totals.accumulatedOffering, "Acumulado do trimestre")}
        </div>
            <div class="section-header">
          <div>
            <h2>Quadro competitivo</h2>
            </div>
        </div>
        <div class="list" style="margin-top:14px">
          ${reportRowsFromReport(report)
            .map((row) => `
              <div class="activity-item">
                <div>
                  <strong>${escapeHTML(className(row.classId))}</strong>
                  <div class="meta">Matriculados ${row.enrolled} · Presentes ${row.present} · Visitas ${row.visits} · Lição ${row.studiedLesson}</div>
                </div>
                <div class="stack" style="text-align:right">
                  <span class="chip">${Number(row.present || 0) + Number(row.visits || 0) + Number(row.studiedLesson || 0)} pontos</span>
                  <span class="note">Oferta ${Number(row.offering || 0).toFixed(2)}</span>
                </div>
              </div>
            `)
            .join("")}
        </div>
      </div>

    <section class="panel">
      <div class="section-header">
        <div>
          <h2>Sábados registados no trimestre</h2>
          </div>
      </div>
      <div class="list">
        ${recentReports
          .map(
            (item) => `
              <div class="muted-box">
                <div class="toolbar wrap">
                  <strong>${weeklyReportLabel(item.date)}</strong>
                  <span class="chip gray">${reportTotals(item).present} presentes · ${reportTotals(item).visits} visitas</span>
                </div>
                <div class="note">Oferta ${reportTotals(item).offering} · Acumulado ${reportTotals(item).accumulatedOffering || 0}</div>
              </div>
            `)
          .join("") || `<div class="muted-box">Ainda não há relatórios guardados neste trimestre.</div>`}
      </div>
    </section>
  `;
}

function readOnlyProgramView(items) {
  return `
    <section class="panel">
      <div class="section-header">
        <div>
          <h2>Programa do Próximo Sábado</h2>
          </div>
        <span class="chip alt">${formatDate(state.ui.programDate)}</span>
      </div>
      <div class="list">
        ${items
          .map(
            (item) => `
            <div class="row" style="grid-template-columns: 72px minmax(0,1.55fr) 1fr 1fr;">
              <strong>${escapeHTML(item.time)}</strong>
              <div>
                <strong>${escapeHTML(item.activity)}</strong>
                <div class="note">${escapeHTML(item.note || "Sem observações")}</div>
              </div>
              <span>${escapeHTML(item.responsible)}</span>
              <span class="chip gray">${escapeHTML(className(item.classId))}</span>
            </div>
          `
          )
          .join("") || `<div class="muted-box">Nenhum programa foi publicado para esta data.</div>`}
      </div>
      <div class="muted-box" style="margin-top:14px">
        <strong>Somente consulta</strong>
        <div class="note" style="margin-top:6px">A publicação e alterações deste módulo são feitas apenas pela direcção.</div>
      </div>
    </section>
  `;
}

function readOnlyRankingView(rows, top) {
  return `
    <section class="panel">
      <div class="section-header">
        <div>
          <h2>Classe em Destaque</h2>
          </div>
        <span class="chip alt">${top ? `Líder: ${escapeHTML(top.name)}` : "Sem dados"}</span>
      </div>
      <div class="ranking">
        ${rows
          .map(
            (item, index) => `
            <div class="ranking-item">
              <strong>#${index + 1}</strong>
              <div>
                <strong>${escapeHTML(item.name)}</strong>
                <div class="note">Presença ${item.score.attendance}% · Lição ${item.score.lesson}% · Participação ${item.score.participation}%</div>
                <div class="progress"><span style="width:${item.weighted}%"></span></div>
              </div>
              <strong>${item.weighted}</strong>
            </div>
          `
          )
          .join("")}
      </div>
      <div class="muted-box" style="margin-top:14px">
        <strong>Somente consulta</strong>
        <div class="note" style="margin-top:6px">Os critérios e a definição da classe em destaque são controlados apenas pela direcção.</div>
      </div>
    </section>
  `;
}

if (!globalThis.__iasdCleanupBound) {
  document.addEventListener("click", (event) => {
    const button = event.target.closest?.("[data-action]");
    if (!button) return;
    const id = button.dataset.id;
    if (button.dataset.action === "reply-message") {
      const message = state.messages.find((item) => item.id === id);
      if (!message) return;
      state.ui.view = "messages";
      state.ui.messageConversationKey = conversationKeyForMessage(message);
      persist();
      render();
      requestAnimationFrame(() => fillMessageReply(message));
      return;
    }
    if (button.dataset.action === "message-conversation") {
      state.ui.messageConversationKey = id;
      persist();
      markConversationAsSeen(id);
      render();
      return;
    }
    if (!button.dataset.action.startsWith("remove-")) return;
    if (button.dataset.action === "remove-member") removeRecord("member", id);
    if (button.dataset.action === "remove-lesson") removeRecord("lesson", id);
    if (button.dataset.action === "remove-request") removeRecord("request", id);
    if (button.dataset.action === "remove-program") removeRecord("program", id);
    if (button.dataset.action === "remove-message") {
      const message = state.messages.find((item) => item.id === id);
      if (!message) return;
      if (!canModifyMessage(message)) {
        alert("Só pode remover a sua própria mensagem.");
        return;
      }
      if (!window.confirm("Remover esta mensagem?")) return;
      removeMessage(id);
    }
  });
  globalThis.__iasdCleanupBound = true;
}



async function boot() {
  render(); // mostra o ecrã de login imediatamente, sem esperar pela rede
  const token = getToken();
  if (!token) return;
  try {
    const me = await apiFetch("/api/auth/me");
    state.currentUser = me.user;
    state.session = { userId: me.user.id };
    await loadSharedState();
    render();
  } catch (err) {
    // Token inválido ou expirado: fica no ecrã de login.
    setToken(null);
    state.currentUser = null;
    state.session = null;
    render();
  }
}

boot();

