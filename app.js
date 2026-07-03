const STORAGE_KEY = "iasd_escola_sabatina_v2";
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
    { id: "classe-01-adultos", name: "Classe 01-Adultos", leader: "Irm. Responsável" },
    { id: "classe-02-adultos", name: "Classe 02-Adultos", leader: "Irm. Responsável" },
    { id: "classe-03-adultos", name: "Classe 03-Adultos", leader: "Irm. Responsável" },
    { id: "classe-04-adultos", name: "Classe 04-Adultos", leader: "Irm. Responsável" },
    { id: "classe-05-adultos", name: "Classe 05-Adultos", leader: "Irm. Responsável" },
    { id: "pos-batismal", name: "Pos-Batismal", leader: "Irm. Responsável" },
    { id: "batismal", name: "Batismal", leader: "Irm. Responsável" },
    { id: "adolescentes", name: "Adolescentes", leader: "Irm. Nelson" },
    { id: "primarios", name: "Primarios", leader: "Irm. Responsável" },
    { id: "jardim-de-infancia", name: "Jardim de infancia", leader: "Irm. Responsável" },
    { id: "rol-de-berco", name: "Rol de Berco", leader: "Irm. Responsável" },
  ],
  members: [
    {
      id: "m1",
      name: "Joaquim Paulo",
      classId: "classe-01-adultos",
      contact: "+258 82 000 0001",
      joinedAt: "2025-01-12",
      active: true,
    },
    {
      id: "m2",
      name: "Maria Lúcia",
      classId: "classe-02-adultos",
      contact: "+258 82 000 0002",
      joinedAt: "2025-03-18",
      active: true,
    },
    {
      id: "m3",
      name: "Anselmo Cossa",
      classId: "primarios",
      contact: "+258 82 000 0003",
      joinedAt: "2025-06-02",
      active: true,
    },
    {
      id: "m4",
      name: "Lurdes Nhampossa",
      classId: "adolescentes",
      contact: "+258 82 000 0004",
      joinedAt: "2025-07-06",
      active: true,
    },
    {
      id: "m5",
      name: "António Mucavele",
      classId: "pos-batismal",
      contact: "+258 82 000 0005",
      joinedAt: "2025-08-10",
      active: true,
    },
  ],
  users: [
    {
      id: "u0",
      username: "secretario",
      password: "Direcao26",
      role: "secretary",
      name: "Secretário Geral",
    },
    {
      id: "u1",
      username: "joaquim",
      password: "Membro26",
      role: "member",
      name: "Joaquim Paulo",
      memberId: "m1",
    },
    {
      id: "u2",
      username: "maria",
      password: "Membro26",
      role: "member",
      name: "Maria Lúcia",
      memberId: "m2",
    },
    {
      id: "u3",
      username: "anselmo",
      password: "Membro26",
      role: "member",
      name: "Anselmo Cossa",
      memberId: "m3",
    },
    {
      id: "u4",
      username: "lurdes",
      password: "Membro26",
      role: "member",
      name: "Lurdes Nhampossa",
      memberId: "m4",
    },
    {
      id: "u5",
      username: "antônio",
      password: "Membro26",
      role: "member",
      name: "António Mucavele",
      memberId: "m5",
    },
  ],
  attendance: [
    {
      id: "a1",
      date: todayISO(),
      classId: "classe-01-adultos",
      visitorCount: 2,
      note: "Visita de classe 02-Adultos.",
      entries: [
        { memberId: "m1", status: "presente" },
        { memberId: "m5", status: "presente" },
      ],
    },
    {
      id: "a2",
      date: todayISO(-7),
      classId: "adolescentes",
      visitorCount: 1,
      note: "",
      entries: [{ memberId: "m4", status: "presente" }],
    },
  ],
  lessons: [
    {
      id: "l1",
      date: todayISO(),
      quarter: currentQuarter(),
      classId: "classe-01-adultos",
      topic: "A graça que sustenta a igreja",
      leader: "Irm. Responsável",
    },
    {
      id: "l2",
      date: todayISO(-7),
      quarter: currentQuarter(),
      classId: "adolescentes",
      topic: "Fé prática para a semana",
      leader: "Irm. Nelson",
    },
  ],
  quarterlyRequests: [
    {
      id: "q1",
      quarter: currentQuarter(),
      classId: "classe-01-adultos",
      quantity: 12,
      createdAt: todayISO(),
      status: "Enviado",
    },
    {
      id: "q2",
      quarter: currentQuarter(),
      classId: "classe-02-adultos",
      quantity: 8,
      createdAt: todayISO(),
      status: "Pendente",
    },
  ],
  weeklyReports: [],
  programs: [
    {
      id: "p1",
      date: nextSaturdayISO(),
      order: 1,
      time: "08:00",
      activity: "Abertura e cânticos",
      responsible: "Classe 02-Adultos",
      classId: "classe-02-adultos",
    },
    {
      id: "p2",
      date: nextSaturdayISO(),
      order: 2,
      time: "08:15",
      activity: "Lição da Escola Sabatina",
      responsible: "Classe 01-Adultos",
      classId: "classe-01-adultos",
    },
    {
      id: "p3",
      date: nextSaturdayISO(),
      order: 3,
      time: "09:00",
      activity: "Momento de testemunhos",
      responsible: "Adolescentes",
      classId: "adolescentes",
    },
  ],
  messages: [
    {
      id: "msg1",
      createdAt: todayISO(),
      from: "Maria Lúcia",
      fromRole: "member",
      target: "secretary",
      classId: "classe-02-adultos",
      subject: "Pedido de oração",
      body: "Gostaria de pedir oração pela família da irmã Celina.",
      read: false,
    },
    {
      id: "msg2",
      createdAt: todayISO(),
      from: "Secretário Geral",
      fromRole: "secretary",
      target: "all",
      classId: null,
      subject: "Programa de sábado confirmado",
      body: "O programa do próximo sábado está publicado no sistema.",
      read: false,
    },
  ],
});


function formatDate(dateString) {
  return new Intl.DateTimeFormat("pt-MZ", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${dateString}T00:00:00`));
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

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return seed();
  try {
    const parsed = JSON.parse(raw);
    return {
      ...seed(),
      ...parsed,
      ui: { ...seed().ui, ...(parsed.ui || {}) },
      settings: { ...seed().settings, ...(parsed.settings || {}) },
    };
  } catch {
    return seed();
  }
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

let state = loadState();

const app = document.getElementById("app");

function currentUser() {
  if (!state.session) return null;
  return state.users.find((user) => user.id === state.session.userId) || null;
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
  const member = currentMember();
  return state.messages.filter((msg) => msg.target === "all" || msg.classId === member?.classId || msg.fromRole === "member" && msg.from === user.name);
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

function getWeeklyReportDate() {
  const selectedDate = state.ui.reportDate;
  if (selectedDate) return selectedDate;
  return getWeeklyReportDateForQuarterWeek(state.ui.reportYear, state.ui.reportQuarter, state.ui.reportWeek);
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
              <input id="username" name="username" autocomplete="username" value="secretario" />
            </div>
            <div class="field">
              <label for="password">Senha</label>
              <div style="display:flex;gap:8px;align-items:center;">
                <input id="password" name="password" type="password" autocomplete="current-password" value="Direcao26" style="flex:1;" />
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
  const navItems = [
    ["dashboard", "Visão Geral", "home"],
    ["members", "Membros", "members"],
    ...(secretary ? [["attendance", "Presenças", "attendance"], ["lessons", "Lições", "lessons"], ["requests", "Trimensários", "requests"]] : []),
    ["program", "Programa", "program"],
    ["ranking", "Classe em Destaque", "ranking"],
    ["reports", "Relatórios", "reports"],
    ["messages", "Comunicação", "messages"],
  ];

  const summary = dashboardSummary();
  return `
    <div class="shell ${state.ui.sidebarOpen ? "sidebar-open" : ""}">
      <aside class="sidebar">
        <div class="brand">
          <img class="brand-logo" src="${LOGO_SECONDARY}" alt="Cora��o e Alma da Igreja" />
          <strong>Sistema de Gestão da Escola Sabatina</strong>
          <span>${user?.name || ""} · ${user?.role === "secretary" ? "Secretário/Diretor" : "Membro"}</span>
        </div>
        <nav class="nav">
          ${navItems
            .map(
              ([id, label, key]) => `
              <button type="button" class="${state.ui.view === id ? "active" : ""}" data-nav="${id}">
                ${icon(key)} ${label}
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
    attendance: "Presenças",
    lessons: "Lições e Estudos",
    requests: "Requisições de Trimensários",
    program: "Programa do Próximo Sábado",
    ranking: "Classe em Destaque",
    reports: "Relatórios e Estatísticas",
    messages: "Comunicação e Notificações",
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

  return `
    <style>
      .dashboard-wrap{font-family:'Source Sans 3',sans-serif;color:#1B2A45;background:transparent;}
      .dashboard-wrap .wrap{max-width:1180px;margin:0 auto;}
      .dashboard-wrap header.top{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-end;gap:16px;margin-bottom:28px;padding-bottom:20px;border-bottom:2px solid #1B2A45;}
      .dashboard-wrap .eyebrow{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#C79A3E;font-weight:600;margin-bottom:6px;}
      .dashboard-wrap h1{font-family:'Fraunces',serif;font-weight:600;font-size:32px;margin:0;line-height:1.1;}
      .dashboard-wrap .top-meta{text-align:right;font-size:13px;color:#3C4E6E;line-height:1.5;}
      .dashboard-wrap .top-meta strong{color:#1B2A45;}
      .dashboard-wrap .filters{display:flex;flex-wrap:wrap;gap:16px;align-items:center;margin-bottom:20px;}
      .dashboard-wrap .filters .field{min-width:160px;}
      .dashboard-wrap .filters label{display:block;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:#3C4E6E;margin-bottom:6px;}
      .dashboard-wrap .filters select{width:100%;padding:10px 12px;border:1px solid #E4DCC9;border-radius:8px;background:#fff;color:#1B2A45;font-size:14px;}
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
                <p class="card-sub">Média por sábado no trimestre atual</p>
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

        <p class="signature">"Onde estiverem dois ou três reunidos em meu nome, aí estou eu no meio deles."</p>
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

  const noBorderGrid = (axis) => ({
    grid: { color: '#E4DCC9', display: axis === 'y' },
    ticks: { font: { size: 11 } },
    border: { display: false },
  });

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
            backgroundColor: 'rgba(92,127,94,0.16)',
            fill: true,
            tension: 0.35,
            pointRadius: 3,
            pointBackgroundColor: '#5C7F5E',
          },
          {
            label: 'Matriculados',
            data: enrolledData,
            borderColor: '#A15A3E',
            backgroundColor: 'transparent',
            borderDash: [4, 3],
            tension: 0.35,
            pointRadius: 3,
            pointBackgroundColor: '#A15A3E',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { x: noBorderGrid('x'), y: noBorderGrid('y') },
      },
    });
  }

  const ctxFrequencia = document.getElementById('chartFrequencia');
  if (ctxFrequencia) {
    new Chart(ctxFrequencia, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            data: attendanceData,
            backgroundColor: '#C79A3E',
            borderRadius: 4,
            maxBarThickness: 22,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
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
            backgroundColor: '#5C7F5E',
            borderRadius: 4,
            maxBarThickness: 18,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
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
            backgroundColor: '#C79A3E',
            borderRadius: 4,
            maxBarThickness: 16,
          },
          {
            label: `${prevQuarter}T ${prevYear}`,
            data: prevOfferingData,
            backgroundColor: '#E7CE95',
            borderRadius: 4,
            maxBarThickness: 16,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
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

function metricCard(title, value, caption) {
  return `
    <article class="panel metric soft">
      <span class="chip">${escapeHTML(title)}</span>
      <strong>${escapeHTML(value)}</strong>
      <span>${escapeHTML(caption)}</span>
    </article>
  `;
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
              <label for="lessonQuarter">Trimestre</label>
              <input id="lessonQuarterInput" name="quarter" value="${escapeHTML(quarter)}" required />
            </div>
            <div class="field">
              <label for="lessonClassId">Classe</label>
              <select id="lessonClassId" name="classId" required>
                ${state.classes
                  .map((klass) => `<option value="${klass.id}">${escapeHTML(klass.name)}</option>`)
                  .join("")}
              </select>
            </div>
          </div>
          <div class="field">
            <label for="lessonTopic">Tema da lição</label>
            <input id="lessonTopic" name="topic" placeholder="Tema do sábado" required />
          </div>
          <div class="field">
            <label for="lessonLeader">Quem ministrou / liderou</label>
            <input id="lessonLeader" name="leader" placeholder="Nome do líder" required />
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
                  <span class="chip gray">${escapeHTML(className(lesson.classId))}</span>
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
              <label for="programClassId">Classe responsável</label>
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
              <label for="programResponsible">Responsável</label>
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
                  <div class="note">${escapeHTML(item.note || "Sem observações")}</div>
                </div>
                <span>${escapeHTML(item.responsible)}</span>
                <span class="chip gray">${escapeHTML(className(item.classId))}</span>
              </div>
            `
            )
            .join("") || `<div class="muted-box">Nenhum item registado para essa data.</div>`}
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
  const quarterSummary = quarterSummaryForDate(weekDate);
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
              <select id="reportYear" name="reportYear">
                ${getDashboardYearOptions()
                  .map((item) => `<option value="${item.value}" ${state.ui.reportYear === item.value ? "selected" : ""}>${item.label}</option>`)
                  .join("")}
              </select>
            </div>
            <div class="field">
              <label for="reportQuarter">Trimestre</label>
              <select id="reportQuarter" name="reportQuarter">
                ${[1, 2, 3, 4]
                  .map((value) => `<option value="${value}" ${state.ui.reportQuarter === value ? "selected" : ""}>${value}</option>`)
                  .join("")}
              </select>
            </div>
            <div class="field">
              <label for="reportWeek">Sábado</label>
              <select id="reportWeek" name="reportWeek">
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

    <section class="grid two">
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

function messagesView() {
  const secretary = isSecretary();
  const messages = visibleMessages();
  const inbox = messages.filter((msg) => msg.fromRole !== "secretary" || !secretary);
  const outbox = messages.filter((msg) => msg.fromRole === "secretary");
  return `
    <section class="grid two">
      <div class="panel">
        <div class="section-header">
          <div>
            <h2>${secretary ? "Enviar comunicado" : "Enviar mensagem"}</h2>
            </div>
        </div>
        <form id="messageForm" class="form-grid">
          <div class="form-grid three">
            <div class="field">
              <label for="messageTarget">Destino</label>
              <select id="messageTarget" name="target">
                ${secretary ? `
                  <option value="all">Todos os membros</option>
                  ${state.classes.map((klass) => `<option value="${klass.id}">${escapeHTML(klass.name)}</option>`).join("")}
                ` : `<option value="secretary">Secretário / Director</option>`}
              </select>
            </div>
            <div class="field">
              <label for="messageSubject">Assunto</label>
              <input id="messageSubject" name="subject" required />
            </div>
            <div class="field">
              <label for="messageClassId">Classe</label>
              <select id="messageClassId" name="classId">
                <option value="">Sem classe</option>
                ${state.classes.map((klass) => `<option value="${klass.id}">${escapeHTML(klass.name)}</option>`).join("")}
              </select>
            </div>
          </div>
          <div class="field">
            <label for="messageBody">Mensagem</label>
            <textarea id="messageBody" name="body" required></textarea>
          </div>
          <button class="btn primary" type="submit">${icon("messages")} Enviar</button>
        </form>
      </div>
      <div class="panel">
        <div class="section-header">
          <div>
            <h2>Caixa de mensagens</h2>
            </div>
        </div>
        <div class="toolbar">
          <button class="btn ${state.ui.messageMode === "inbox" ? "primary" : ""}" type="button" data-action="message-mode" data-mode="inbox">Entrada</button>
          <button class="btn ${state.ui.messageMode === "outbox" ? "primary" : ""}" type="button" data-action="message-mode" data-mode="outbox">Saída</button>
          <button class="btn ${state.ui.messageMode === "all" ? "primary" : ""}" type="button" data-action="message-mode" data-mode="all">Todos</button>
        </div>
        <div class="list">
          ${messageList(messages, secretary)}
        </div>
      </div>
    </section>
  `;
}

function messageList(messages, secretary) {
  let rows = messages;
  if (state.ui.messageMode === "inbox") {
    rows = messages.filter((msg) => msg.fromRole !== "secretary" || !secretary);
  }
  if (state.ui.messageMode === "outbox") {
    rows = messages.filter((msg) => msg.fromRole === "secretary");
  }
  return rows
    .slice()
    .reverse()
    .map(
      (message) => `
      <div class="muted-box">
        <div class="toolbar wrap">
          <strong>${escapeHTML(message.subject)}</strong>
          <span class="chip ${message.fromRole === "secretary" ? "alt" : ""}">${escapeHTML(message.from)}</span>
        </div>
        <div class="note">${formatDate(message.createdAt)} · ${escapeHTML(targetLabel(message.target, message.classId))}</div>
        <div style="margin-top:8px">${escapeHTML(message.body)}</div>
      </div>
    `
    )
    .join("") || `<div class="muted-box">Sem mensagens para esta vista.</div>`;
}

function targetLabel(target, classId) {
  if (target === "all") return "Todos os membros";
  if (target === "secretary") return "Secretário / Director";
  if (target === "direct") return "Mensagem directa";
  return className(classId);
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
      state.session = null;
      persist();
      render();
    });
  });

  document.querySelectorAll("[data-action='reset-demo']").forEach((button) => {
    button.addEventListener("click", () => {
      state = seed();
      persist();
      render();
    });
  });

  const memberForm = document.getElementById("memberForm");
  if (memberForm) memberForm.addEventListener("submit", handleMemberSubmit);

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

  document.querySelectorAll("[data-action='print-report']").forEach((button) => {
    button.addEventListener("click", printReport);
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

  const messageForm = document.getElementById("messageForm");
  if (messageForm) messageForm.addEventListener("submit", handleMessageSubmit);

  document.querySelectorAll("[data-action='message-mode']").forEach((button) => {
    button.addEventListener("click", () => {
      state.ui.messageMode = button.dataset.mode;
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

function handleLogin(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const username = form.username.value.trim();
  const password = form.password.value.trim();
  const user = state.users.find((item) => item.username === username && item.password === password);
  if (!user) {
    alert("Utilizador ou senha inválidos.");
    return;
  }
  state.session = { userId: user.id };
  state.ui.view = "dashboard";
  persist();
  render();
}

function handleMemberSubmit(event) {
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
    
    // Criar automaticamente um usuário para o novo membro
    const firstName = payload.name.split(" ")[0].toLowerCase();
    const newUserId = uid("u");
    state.users.push({
      id: newUserId,
      username: firstName,
      password: "Membro26",
      role: "member",
      name: payload.name,
      memberId: newMemberId,
    });
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
  persist();
  render();
}

function handleMessageSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const user = currentUser();
  const member = currentMember();
  const target = form.querySelector("#messageTarget").value;
  const classId = form.querySelector("#messageClassId").value || null;
  state.messages.push({
    id: uid("msg"),
    createdAt: todayISO(),
    from: user?.name || "Utilizador",
    fromRole: user?.role || "member",
    target,
    classId: isSecretary() ? (target === "all" ? null : target) : member?.classId || classId,
    subject: form.querySelector("#messageSubject").value.trim(),
    body: form.querySelector("#messageBody").value.trim(),
    read: false,
  });
  persist();
  render();
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

function navigateTo(view) {
  state.ui.view = view;
  persist();
  render();
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
      meta: `${message.from} · ${targetLabel(message.target, message.classId)}`,
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

if (!globalThis.__iasdGotoBound) {
  document.addEventListener("click", (event) => {
    const button = event.target.closest?.("[data-action='goto']");
    if (!button) return;
    navigateTo(button.dataset.view);
  });
  globalThis.__iasdGotoBound = true;
}

render();

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
  return {
    enrolled,
    present,
    visits,
    attendedWithVisits: present + visits,
    studiedLesson,
    offering,
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

function removeRecord(kind, id) {
  const labels = {
    member: "membro",
    lesson: "lição",
    request: "requisição",
    program: "item do programa",
    message: "mensagem",
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
    message: "messages",
    attendance: "attendance",
  };

  const key = map[kind];
  if (!key || !Array.isArray(state[key])) return;
  state[key] = state[key].filter((item) => item.id !== id);
  persist();
  render();
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
      meta: `${message.from} · ${targetLabel(message.target, message.classId)}`,
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

function messagesView() {
  const secretary = isSecretary();
  const messages = visibleMessages();
  return `
    <section class="grid two">
      <div class="panel">
        <div class="section-header">
          <div>
            <h2>${secretary ? "Enviar comunicado" : "Enviar mensagem"}</h2>
            </div>
        </div>
        <form id="messageForm" class="form-grid">
          <div class="form-grid three">
            <div class="field">
              <label for="messageTarget">Destino</label>
              <select id="messageTarget" name="target">
                ${secretary ? `
                  <option value="all">Todos os membros</option>
                  ${state.classes.map((klass) => `<option value="${klass.id}">${escapeHTML(klass.name)}</option>`).join("")}
                ` : `<option value="secretary">Secretario / Director</option>`}
              </select>
            </div>
            <div class="field">
              <label for="messageSubject">Assunto</label>
              <input id="messageSubject" name="subject" required />
            </div>
            <div class="field">
              <label for="messageClassId">Classe</label>
              <select id="messageClassId" name="classId">
                <option value="">Sem classe</option>
                ${state.classes.map((klass) => `<option value="${klass.id}">${escapeHTML(klass.name)}</option>`).join("")}
              </select>
            </div>
          </div>
          <div class="field">
            <label for="messageBody">Mensagem</label>
            <textarea id="messageBody" name="body" required></textarea>
          </div>
          <button class="btn primary" type="submit">${icon("messages")} Enviar</button>
        </form>
      </div>
      <div class="panel">
        <div class="section-header">
          <div>
            <h2>Caixa de mensagens</h2>
            </div>
        </div>
        <div class="toolbar">
          <button class="btn ${state.ui.messageMode === "inbox" ? "primary" : ""}" type="button" data-action="message-mode" data-mode="inbox">Entrada</button>
          <button class="btn ${state.ui.messageMode === "outbox" ? "primary" : ""}" type="button" data-action="message-mode" data-mode="outbox">Saida</button>
          <button class="btn ${state.ui.messageMode === "all" ? "primary" : ""}" type="button" data-action="message-mode" data-mode="all">Todos</button>
        </div>
        <div class="list">
          ${messageList(messages, secretary)}
        </div>
      </div>
    </section>
  `;
}

function messageList(messages, secretary) {
  let rows = messages;
  if (state.ui.messageMode === "inbox") {
    rows = messages.filter((msg) => msg.fromRole !== "secretary" || !secretary);
  }
  if (state.ui.messageMode === "outbox") {
    rows = messages.filter((msg) => msg.fromRole === "secretary");
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
        <div class="note">${formatDate(message.createdAt)} · ${escapeHTML(targetLabel(message.target, message.classId))}</div>
        <div style="margin-top:8px">${escapeHTML(message.body)}</div>
      </div>
    `
    )
    .join("") || `<div class="muted-box">Sem mensagens para esta vista.</div>`;
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
    const button = event.target.closest?.("[data-action^='remove-']");
    if (!button) return;
    const id = button.dataset.id;
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
      removeRecord("message", id);
    }
  });
  globalThis.__iasdCleanupBound = true;
}



render();

