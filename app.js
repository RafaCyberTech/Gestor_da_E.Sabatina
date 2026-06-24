const STORAGE_KEY = "iasd_escola_sabatina_v2";
const LOGO_MAIN = "./logo/logo-main.png";
const LOGO_SECONDARY = "./logo/logo-secondary.png";

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
    reportType: "attendance",
    reportPeriod: "quarter",
    reportClassId: "all",
    reportDate: todayISO(),
    editMemberId: null,
    settingsTab: "weights",
  },
  settings: {
    attendanceWeight: 50,
    lessonWeight: 30,
    participationWeight: 20,
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
      id: "u1",
      username: "secretario",
      password: "1234",
      role: "secretary",
      name: "Secretário Geral",
    },
    {
      id: "u2",
      username: "maria",
      password: "1234",
      role: "member",
      name: "Maria Lúcia",
      memberId: "m2",
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

let state = loadState();

const app = document.getElementById("app");

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
  const member = currentMember();
  if (isSecretary()) return state.members;
  if (member) return state.members.filter((item) => item.id === member.id);
  return [];
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

function getAttendanceSummary(classId, fromDate = null) {
  const members = state.members.filter((member) => member.classId === classId && member.active);
  const sessions = sessionsForClass(classId).filter((session) => !fromDate || session.date >= fromDate);
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

function scoreClass(classId, startDate = null) {
  const attendance = getAttendanceSummary(classId, startDate);
  const lessonCount = lessonsForClass(classId).filter((lesson) => !startDate || lesson.date >= startDate).length;
  const programCount = state.programs.filter((item) => item.classId === classId && (!startDate || item.date >= startDate)).length;
  return {
    attendance: attendance.rate,
    lesson: Math.min(100, lessonCount * 20),
    participation: Math.min(100, programCount * 25),
  };
}

function rankingRows(period) {
  const startDate =
    period === "week" ? todayISO(-7) : period === "quarter" ? quarterStartISO() : null;
  return state.classes
    .map((klass) => {
      const score = scoreClass(klass.id, startDate);
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

function localISODate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
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
              <input id="password" name="password" type="password" autocomplete="current-password" value="1234" />
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
    ...(secretary ? [["members", "Membros", "members"], ["attendance", "Presenças", "attendance"], ["lessons", "Lições", "lessons"], ["requests", "Trimestrais", "requests"]] : []),
    ["program", "Programa", "program"],
    ["ranking", "Classe em Destaque", "ranking"],
    ["reports", "Relatórios", "reports"],
    ["messages", "Comunicação", "messages"],
  ];

  const summary = dashboardSummary();
  return `
    <div class="shell">
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
      <main class="main">
        <header class="topbar">
          <div>
            <h1>${pageTitle(state.ui.view)}</h1>
            </div>
          <div class="topbar-actions">
            <span class="chip ${secretary ? "" : "gray"}">${secretary ? "Acesso administrativo" : "Acesso de membro"}</span>
            <button type="button" class="btn" data-action="reset-demo">Recarregar demo</button>
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
    requests: "Requisições de Trimestrais",
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
      return secretary ? membersView() : readOnlyPanel("Este módulo está disponível para o secretário.");
    case "attendance":
      return secretary ? attendanceView() : readOnlyPanel("O registo de presenças é restrito à direcção.");
    case "lessons":
      return secretary ? lessonsView() : readOnlyPanel("A gestão de lições é restrita à direcção.");
    case "requests":
      return secretary ? requestsView() : readOnlyPanel("As requisições de trimestrais são geridas pela direcção.");
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
  return `
    <section class="grid cards">
      ${metricCard("Membros ativos", summary.members, "Cadastro principal e classes")}
      ${metricCard("Presença média", `${summary.attendance}%`, "Últimos registos da classe")}
      ${metricCard("Lições registadas", summary.lessons, "Período corrente")}
      ${metricCard("Notificações", summary.messages, "Mensagens e avisos")}
    </section>
    <section class="grid two">
      <div class="panel">
        <div class="section-header">
          <div>
            <h2>Próximo Sábado</h2>
            </div>
          <span class="chip alt">${formatDate(state.ui.programDate)}</span>
        </div>
        <div class="list">
          ${programsForDate(state.ui.programDate)
            .map(
              (item) => `
              <div class="row" style="grid-template-columns: 82px minmax(0,1.8fr) 1fr 1fr;">
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
            .join("") || `<div class="muted-box">Nenhum item publicado para esta data.</div>`}
        </div>
      </div>
      <div class="panel">
        <div class="section-header">
          <div>
            <h2>Classe em Destaque</h2>
            </div>
        </div>
        <div class="ranking">
          ${rankingRows("quarter")
            .slice(0, 4)
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
    <section class="panel">
      <div class="section-header">
        <div>
          <h2>Status rápido</h2>
          </div>
      </div>
      <div class="grid three">
        ${statusBox("Membros por classe", classBreakdown())}
        ${statusBox("Requisições do trimestre", requestBreakdown())}
        ${statusBox("Mensagens recentes", recentMessages())}
      </div>
    </section>
  `;
}

function buildDashboard() {
  const memberCount = state.members.filter((m) => m.active).length;
  const allAttendance = state.attendance.reduce((acc, session) => acc + session.entries.filter((e) => e.status === "presente").length, 0);
  const allSlots = state.attendance.reduce((acc, session) => {
    const classMembers = state.members.filter((m) => m.classId === session.classId && m.active).length || 1;
    return acc + classMembers;
  }, 0) || 1;
  return {
    members: memberCount,
    attendance: Math.round((allAttendance / allSlots) * 100) || 0,
    lessons: state.lessons.length,
    messages: state.messages.length,
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
  const pending = state.quarterlyRequests.filter((req) => req.status === "Pendente").length;
  const sent = state.quarterlyRequests.filter((req) => req.status === "Enviado").length;
  return `${pending} pendentes · ${sent} enviados`;
}

function recentMessages() {
  return `${state.messages.slice(0, 3).length} itens visíveis no painel`;
}

function className(classId) {
  return state.classes.find((klass) => klass.id === classId)?.name || "Sem classe";
}

function membersView() {
  const members = visibleMembers();
  const classFilter = state.ui.memberFilterClass;
  const filtered = classFilter === "all" ? members : members.filter((item) => item.classId === classFilter);
  const editing = state.members.find((item) => item.id === state.ui.editMemberId) || null;

  return `
    <section class="grid two">
      <div class="panel">
        <div class="section-header">
          <div>
            <h2>${editing ? "Editar membro" : "Novo membro"}</h2>
            </div>
        </div>
        <form id="memberForm" class="form-grid">
          <div class="form-grid two">
            <div class="field">
              <label for="memberName">Nome</label>
              <input id="memberName" name="name" value="${escapeHTML(editing?.name || "")}" required />
            </div>
            <div class="field">
              <label for="memberContact">Contacto</label>
              <input id="memberContact" name="contact" value="${escapeHTML(editing?.contact || "")}" />
            </div>
          </div>
          <div class="form-grid three">
            <div class="field">
              <label for="memberClass">Classe</label>
              <select id="memberClass" name="classId" required>
                ${state.classes
                  .map(
                    (klass) =>
                      `<option value="${klass.id}" ${editing?.classId === klass.id ? "selected" : ""}>${escapeHTML(klass.name)}</option>`
                  )
                  .join("")}
              </select>
            </div>
            <div class="field">
              <label for="memberJoined">Data de ingresso</label>
              <input id="memberJoined" name="joinedAt" type="date" value="${escapeHTML(editing?.joinedAt || todayISO())}" required />
            </div>
            <div class="field">
              <label for="memberActive">Estado</label>
              <select id="memberActive" name="active">
                <option value="true" ${editing?.active !== false ? "selected" : ""}>Activo</option>
                <option value="false" ${editing?.active === false ? "selected" : ""}>Inactivo</option>
              </select>
            </div>
          </div>
          <div class="toolbar">
            <button class="btn primary" type="submit">${icon("save")} ${editing ? "Actualizar" : "Cadastrar"}</button>
            ${editing ? `<button class="btn" type="button" data-action="cancel-member-edit">Cancelar</button>` : ""}
          </div>
        </form>
      </div>
      <div class="panel">
        <div class="section-header">
          <div>
            <h2>Filtros e resumo</h2>
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
                <div class="toolbar">
                  <button type="button" class="btn" data-action="edit-member" data-id="${member.id}">${icon("edit")} Editar</button>
                  <button type="button" class="btn ${member.active ? "danger" : "primary"}" data-action="toggle-member" data-id="${member.id}">
                    ${member.active ? "Desactivar" : "Activar"}
                  </button>
                </div>
              </div>
            `
            )
            .join("") || `<div class="muted-box">Sem membros nesta classe.</div>`}
        </div>
      </div>
    </section>
  `;
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
              <label for="requestQuantity">Quantidade</label>
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
                <div class="note">${request.quantity} trimestrais · ${formatDate(request.createdAt)}</div>
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
  const result = buildReport(state.ui.reportType, state.ui.reportPeriod, state.ui.reportClassId);
  return `
    <section class="grid two">
      <div class="panel">
        <div class="section-header">
          <div>
            <h2>Filtros de relatório</h2>
            </div>
        </div>
        <form id="reportForm" class="form-grid">
          <div class="form-grid three">
            <div class="field">
              <label for="reportType">Tipo</label>
              <select id="reportType" name="reportType">
                <option value="attendance" ${state.ui.reportType === "attendance" ? "selected" : ""}>Presenças</option>
                <option value="lessons" ${state.ui.reportType === "lessons" ? "selected" : ""}>Lições</option>
                <option value="visitors" ${state.ui.reportType === "visitors" ? "selected" : ""}>Visitantes</option>
                <option value="ranking" ${state.ui.reportType === "ranking" ? "selected" : ""}>Classe em destaque</option>
              </select>
            </div>
            <div class="field">
              <label for="reportPeriod">Período</label>
              <select id="reportPeriod" name="reportPeriod">
                <option value="week" ${state.ui.reportPeriod === "week" ? "selected" : ""}>Sábado específico</option>
                <option value="quarter" ${state.ui.reportPeriod === "quarter" ? "selected" : ""}>Trimestre</option>
                <option value="year" ${state.ui.reportPeriod === "year" ? "selected" : ""}>Ano</option>
              </select>
            </div>
            <div class="field">
              <label for="reportClassId">Classe</label>
              <select id="reportClassId" name="reportClassId">
                <option value="all" ${state.ui.reportClassId === "all" ? "selected" : ""}>Todas</option>
                ${state.classes
                  .map(
                    (klass) =>
                      `<option value="${klass.id}" ${state.ui.reportClassId === klass.id ? "selected" : ""}>${escapeHTML(klass.name)}</option>`
                  )
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
      <div class="panel" id="reportOutput">
        <div class="section-header">
          <div>
            <h2>Resultado</h2>
            </div>
          <span class="chip alt">${escapeHTML(result.periodLabel)}</span>
        </div>
        <div class="grid three">
          ${reportMetric("Total", result.total, result.caption)}
          ${reportMetric("Classe", result.classLabel, "Filtro aplicado")}
          ${reportMetric("Observação", result.note, "Resumo gerado pelo sistema")}
        </div>
        <div class="list" style="margin-top:14px">
          ${result.rows
            .map(
              (row) => `
              <div class="muted-box">
                <div class="toolbar wrap">
                  <strong>${escapeHTML(row.label)}</strong>
                  <span class="chip gray">${escapeHTML(row.value)}</span>
                </div>
                ${row.note ? `<div class="note">${escapeHTML(row.note)}</div>` : ""}
              </div>
            `
            )
            .join("") || `<div class="muted-box">Sem registos para estes filtros.</div>`}
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
  const startDate = period === "week" ? todayISO(-7) : period === "quarter" ? quarterStartISO() : null;
  const periodLabel = { week: "Sábado específico", quarter: "Trimestral", year: "Anual" }[period];

  if (type === "attendance") {
    const sessions = state.attendance.filter((session) => (!classId || classId === "all" || session.classId === classId) && (!startDate || session.date >= startDate));
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
    const lessons = state.lessons.filter((lesson) => (!classId || classId === "all" || lesson.classId === classId) && (!startDate || lesson.date >= startDate));
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
    const sessions = state.attendance.filter((session) => (!classId || classId === "all" || session.classId === classId) && (!startDate || session.date >= startDate));
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

  const rows = rankingRows(period).filter((row) => classId === "all" || row.id === classId);
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
  wireEvents();
}

function wireEvents() {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }

  document.querySelectorAll("[data-nav]").forEach((button) => {
    button.addEventListener("click", () => {
      state.ui.view = button.dataset.nav;
      persist();
      render();
    });
  });

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

  const reportForm = document.getElementById("reportForm");
  if (reportForm) reportForm.addEventListener("submit", handleReportSubmit);

  document.querySelectorAll("[data-action='print-report']").forEach((button) => {
    button.addEventListener("click", printReport);
  });

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
    state.members.push({ id: uid("m"), ...payload });
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

function handleReportSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  state.ui.reportType = form.querySelector("#reportType").value;
  state.ui.reportPeriod = form.querySelector("#reportPeriod").value;
  state.ui.reportClassId = form.querySelector("#reportClassId").value;
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
  const report = buildReport(state.ui.reportType, state.ui.reportPeriod, state.ui.reportClassId);
  const html = `
    <html>
      <head>
        <title>${escapeHTML(report.title)}</title>
        <style>
          body{font-family:Segoe UI,Arial,sans-serif;padding:24px;color:#12201d}
          h1,h2,p{margin:0 0 12px}
          .box{border:1px solid #c8d6d2;border-radius:12px;padding:12px;margin:12px 0}
          .muted{color:#58706b}
          table{width:100%;border-collapse:collapse}
          td{border-bottom:1px solid #dbe5e1;padding:8px 0;vertical-align:top}
        </style>
      </head>
      <body>
        <h1>${escapeHTML(report.title)}</h1>
        <p class="muted">${escapeHTML(report.periodLabel)} · ${escapeHTML(report.classLabel)}</p>
        <div class="box">
          <strong>${escapeHTML(report.caption)}</strong>
          <div>${escapeHTML(report.total)}</div>
          <div class="muted">${escapeHTML(report.note)}</div>
        </div>
        <table>
          ${report.rows
            .map(
              (row) => `
              <tr><td><strong>${escapeHTML(row.label)}</strong><div class="muted">${escapeHTML(row.note || "")}</div></td><td>${escapeHTML(row.value)}</td></tr>
            `
            )
            .join("")}
        </table>
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

function dashboardView() {
  const summary = buildDashboard();
  const secretary = isSecretary();
  const shortcuts = secretary
    ? [
        ["members", "Membros"],
        ["attendance", "Presencas"],
        ["lessons", "Licoes"],
        ["requests", "Trimestrais"],
        ["program", "Programa"],
        ["reports", "Relatorios"],
        ["messages", "Mensagens"],
        ["ranking", "Ranking"],
      ]
    : [
        ["program", "Programa"],
        ["ranking", "Ranking"],
        ["reports", "Relatorios"],
        ["messages", "Mensagens"],
      ];

  return `
    <section class="panel dashboard-hero">
      <div class="section-header">
        <div>
          <h2>${secretary ? "Painel da Direcao" : "Painel do Membro"}</h2>
          </div>
        <div class="toolbar">
          <span class="chip alt">${secretary ? "Acesso administrativo" : "Acesso de membro"}</span>
          <button type="button" class="btn" data-action="goto" data-view="program">${icon("program")} Programa</button>
          <button type="button" class="btn" data-action="goto" data-view="messages">${icon("messages")} Mensagens</button>
        </div>
      </div>
      <div class="hero-grid">
        <div class="grid cards">
          ${metricCard("Membros ativos", summary.members, "Cadastro principal e classes", "members")}
          ${metricCard("Presenca media", `${summary.attendance}%`, "Ultimos registos da classe", "attendance")}
          ${metricCard("Licoes registadas", summary.lessons, "Periodo corrente", "lessons")}
          ${metricCard("Notificacoes", summary.messages, "Mensagens e avisos", "messages")}
        </div>
        <div class="muted-box">
          <strong>Atalhos rapidos</strong>
          <div class="note" style="margin-top:6px">Abra uma secao sem procurar no menu lateral.</div>
          <div class="quick-links" style="margin-top:12px">
            ${shortcuts
              .map(
                ([view, label]) => `
                  <button type="button" class="btn" data-action="goto" data-view="${view}">
                    ${escapeHTML(label)}
                  </button>
                `
              )
              .join("")}
          </div>
        </div>
      </div>
    </section>
        <section class="grid two">
      <div class="panel">
        <div class="section-header">
          <div>
            <h2>Proximo Sabado</h2>
            </div>
          <div class="toolbar">
            <span class="chip alt">${formatDate(state.ui.programDate)}</span>
            <button type="button" class="btn" data-action="goto" data-view="program">${icon("program")} Gerir</button>
          </div>
        </div>
        <div class="list">
          ${programsForDate(state.ui.programDate)
            .map(
              (item) => `
              <div class="row" style="grid-template-columns: 82px minmax(0,1.8fr) 1fr 1fr;">
                <strong>${escapeHTML(item.time)}</strong>
                <div>
                  <strong>${escapeHTML(item.activity)}</strong>
                  <div class="note">${escapeHTML(item.note || "Sem observacoes")}</div>
                </div>
                <span>${escapeHTML(item.responsible)}</span>
                <span class="chip gray">${escapeHTML(className(item.classId))}</span>
              </div>
            `
            )
            .join("") || `<div class="muted-box">Nenhum item publicado para esta data.</div>`}
        </div>
      </div>
      <div class="panel">
        <div class="section-header">
          <div>
            <h2>Classe em Destaque</h2>
            </div>
          <button type="button" class="btn" data-action="goto" data-view="ranking">${icon("ranking")} Abrir ranking</button>
        </div>
        <div class="ranking">
          ${rankingRows("quarter")
            .slice(0, 4)
            .map(
              (item, index) => `
                <div class="ranking-item">
                  <strong>#${index + 1}</strong>
                  <div>
                    <strong>${escapeHTML(item.name)}</strong>
                    <div class="note">Presenca ${item.score.attendance}% · Licao ${item.score.lesson}% · Participacao ${item.score.participation}%</div>
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
    <section class="grid two">
      <div class="panel">
        <div class="section-header">
          <div>
            <h2>Resumo por classe</h2>
            </div>
          ${secretary ? `<button type="button" class="btn" data-action="goto" data-view="members">${icon("members")} Gerir membros</button>` : ""}
        </div>
        <div class="list">
          ${state.classes
            .map((klass) => {
              const sum = getAttendanceSummary(klass.id);
              return `
                <div class="activity-item">
                  <div>
                    <strong>${escapeHTML(klass.name)}</strong>
                    <div class="meta">${sum.members} membros activos · ${sum.sessions} presencas registadas · ${sum.visitors} visitantes</div>
                  </div>
                  <span class="chip">${sum.rate}%</span>
                </div>
              `;
            })
            .join("")}
        </div>
      </div>
      <div class="panel">
        <div class="section-header">
          <div>
            <h2>Actividade recente</h2>
            </div>
          <button type="button" class="btn" data-action="goto" data-view="reports">${icon("reports")} Relatorios</button>
        </div>
        <div class="activity-list">
          ${recentActivityItems()
            .map(
              (item) => `
                <div class="activity-item">
                  <div>
                    <strong>${escapeHTML(item.title)}</strong>
                    <div class="meta">${escapeHTML(item.meta)}</div>
                  </div>
                  <span class="chip gray">${escapeHTML(item.kind)}</span>
                </div>
              `
            )
            .join("")}
        </div>
      </div>
    </section>
    <section class="panel">
      <div class="section-header">
        <div>
          <h2>Status rapido</h2>
          </div>
      </div>
      <div class="grid three">
        ${statusBox("Membros por classe", classBreakdown())}
        ${statusBox("Requisicoes do trimestre", requestBreakdown())}
        ${statusBox("Mensagens recentes", recentMessages())}
      </div>
    </section>
  `;
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

function reportsView() {
  if (!isSecretary()) {
    return memberReportsView();
  }
  const date = state.ui.reportDate || todayISO();
  const existing = state.weeklyReports.find((item) => item.date === date) || null;
  const report = buildWeeklyReportFromReport(existing || {
    date,
    classes: reportRowsFromReport(null),
  });
  const quarter = reportQuarterForDate(date);
  const quarterSummary = quarterSummaryForDate(date);
  const recentReports = state.weeklyReports
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 13);

  return `
    <section class="grid two">
      <div class="panel">
        <div class="section-header">
          <div>
            <h2>Registo do Sábado</h2>
            </div>
        </div>
        <form id="reportForm" class="form-grid">
          <div class="form-grid two">
            <div class="field">
              <label for="reportDate">Data do sábado</label>
              <input id="reportDate" type="date" value="${escapeHTML(date)}" data-action="weekly-report-date" />
            </div>
            <div class="field">
              <label>Trimestre</label>
              <input type="text" value="${escapeHTML(quarter)}" disabled />
            </div>
          </div>
          <div class="muted-box">
            <strong>Quadro competitivo</strong>
            <div class="note" style="margin-top:6px">Preencha os dados por classe: matriculados, presentes, visitas, quem estudou a lição e oferta.</div>
          </div>
          <div class="list">
            ${state.classes
              .map((klass) => {
                const row = reportRowsFromReport(report).find((item) => item.classId === klass.id) || makeEmptyReportClassRow(klass.id);
                return `
                  <div class="panel" style="padding:12px">
                    <div class="toolbar wrap">
                      <strong>${escapeHTML(klass.name)}</strong>
                      <span class="chip gray">${escapeHTML(klass.leader)}</span>
                    </div>
                    <div class="form-grid three" style="margin-top:10px">
                      <div class="field">
                        <label for="enrolled_${klass.id}">Matriculados</label>
                        <input id="enrolled_${klass.id}" name="enrolled_${klass.id}" type="number" min="0" value="${row.enrolled}" />
                      </div>
                      <div class="field">
                        <label for="present_${klass.id}">Presentes</label>
                        <input id="present_${klass.id}" name="present_${klass.id}" type="number" min="0" value="${row.present}" />
                      </div>
                      <div class="field">
                        <label for="visits_${klass.id}">Visitas</label>
                        <input id="visits_${klass.id}" name="visits_${klass.id}" type="number" min="0" value="${row.visits}" />
                      </div>
                      <div class="field">
                        <label for="studied_${klass.id}">Estudaram lição</label>
                        <input id="studied_${klass.id}" name="studied_${klass.id}" type="number" min="0" value="${row.studiedLesson}" />
                      </div>
                      <div class="field">
                        <label for="offering_${klass.id}">Oferta</label>
                        <input id="offering_${klass.id}" name="offering_${klass.id}" type="number" min="0" step="0.01" value="${row.offering}" />
                      </div>
                    </div>
                  </div>
                `;
              })
              .join("")}
          </div>
          <div class="form-grid two">
            <div class="field">
              <label for="reportNote">Observação geral</label>
              <textarea id="reportNote" name="reportNote">${escapeHTML(existing?.note || "")}</textarea>
            </div>
            <div class="stack">
              <div class="muted-box">
                <strong>Quais dados entram no relatório</strong>
                <div class="note" style="margin-top:6px">Quadro competitivo: cada classe por sábado. Quadro comparativo: total da escola sabatina naquele sábado.</div>
              </div>
              <div class="toolbar">
                <button class="btn primary" type="submit">${icon("save")} Guardar relatório</button>
                <button class="btn warn" type="button" data-action="print-report">${icon("print")} Imprimir PDF</button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="panel">
        <div class="section-header">
          <div>
            <h2>Quadro comparativo</h2>
            </div>
          <span class="chip alt">${weeklyReportLabel(date)}</span>
        </div>
        <div class="grid three">
          ${reportMetric("Matriculados", report.totals.enrolled, "Total da escola")}
          ${reportMetric("Presentes + visitas", report.totals.attendedWithVisits, "Participação do sábado")}
          ${reportMetric("Estudaram lição", report.totals.studiedLesson, "Lição concluída")}
        </div>
        <div class="grid two" style="margin-top:14px">
          ${reportMetric("Oferta total", report.totals.offering, "Valor do sábado")}
          ${reportMetric("Ofertas acumuladas", report.totals.accumulatedOffering, "Acumulado do trimestre")}
        </div>
        <div class="list" style="margin-top:14px">
          <div class="muted-box">
            <strong>Resumo do quadro competitivo</strong>
            <div class="note" style="margin-top:6px">Cada classe aparece com os seus números do sábado seleccionado.</div>
          </div>
          ${reportRowsFromReport(report)
            .map((row) => {
              const score = Number(row.present || 0) + Number(row.visits || 0) + Number(row.studiedLesson || 0);
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
            })
            .join("")}
        </div>
      </div>
    </section>

    <section class="grid two">
      <div class="panel">
        <div class="section-header">
          <div>
            <h2>Relatório trimestral</h2>
            </div>
          <span class="chip alt">${quarterSummary.count}/13 sábados</span>
        </div>
        <div class="grid three">
          ${reportMetric("Matriculados", quarterSummary.average.enrolled, "Média por sábado")}
          ${reportMetric("Presentes", quarterSummary.average.present, "Média por sábado")}
          ${reportMetric("Visitas", quarterSummary.average.visits, "Média por sábado")}
          ${reportMetric("Presentes + visitas", quarterSummary.average.attendedWithVisits, "Média por sábado")}
          ${reportMetric("Estudaram lição", quarterSummary.average.studiedLesson, "Média por sábado")}
          ${reportMetric("Oferta média", quarterSummary.average.offering, "Média por sábado")}
        </div>
        <div class="muted-box" style="margin-top:14px">
          <strong>Ofertas acumuladas no trimestre</strong>
          <div style="font-size:1.4rem;font-weight:700;margin-top:8px">${escapeHTML(quarterSummary.accumulatedOffering)}</div>
          <div class="note" style="margin-top:4px">Calculado a partir dos sábados já registados no trimestre.</div>
        </div>
      </div>
      <div class="panel">
        <div class="section-header">
          <div>
            <h2>Sábados registados</h2>
            </div>
        </div>
        <div class="list">
          ${recentReports
            .map(
              (item) => `
                <div class="muted-box">
                  <div class="toolbar wrap">
                    <strong>${weeklyReportLabel(item.date)}</strong>
                    <div class="toolbar">
                      <button type="button" class="btn" data-action="load-weekly-report" data-date="${item.date}">Abrir</button>
                      <button type="button" class="btn danger" data-action="remove-weekly-report" data-id="${item.id}">Remover</button>
                    </div>
                  </div>
                  <div class="note">${reportTotals(item).enrolled} matriculados · ${reportTotals(item).attendedWithVisits} presentes+visitas · oferta ${reportTotals(item).offering}</div>
                </div>
              `
            )
            .join("") || `<div class="muted-box">Ainda não existem relatórios guardados neste trimestre.</div>`}
        </div>
      </div>
    </section>
  `;
}

function handleReportSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const date = form.querySelector("#reportDate").value;
  const note = form.querySelector("#reportNote").value.trim();
  const classes = state.classes.map((klass) => ({
    classId: klass.id,
    enrolled: Number(form.querySelector(`#enrolled_${klass.id}`).value || 0),
    present: Number(form.querySelector(`#present_${klass.id}`).value || 0),
    visits: Number(form.querySelector(`#visits_${klass.id}`).value || 0),
    studiedLesson: Number(form.querySelector(`#studied_${klass.id}`).value || 0),
    offering: Number(form.querySelector(`#offering_${klass.id}`).value || 0),
  }));
  const nextReport = buildWeeklyReportFromReport({
    id: state.weeklyReports.find((item) => item.date === date)?.id || uid("wr"),
    date,
    note,
    classes,
  });
  const index = state.weeklyReports.findIndex((item) => item.date === date);
  if (index >= 0) {
    state.weeklyReports[index] = nextReport;
  } else {
    state.weeklyReports.push(nextReport);
  }
  state.ui.reportDate = date;
  persist();
  render();
}

function buildReport() {
  const date = state.ui.reportDate || todayISO();
  const report = state.weeklyReports.find((item) => item.date === date) || buildWeeklyReportFromReport({ date, classes: reportRowsFromReport(null) });
  return {
    title: `Relatório de ${weeklyReportLabel(date)}`,
    periodLabel: report.quarter,
    classLabel: "Todas",
    total: report.totals.attendedWithVisits,
    caption: "Presentes + visitas",
    note: "Quadro semanal e trimestral",
    rows: [
      {
        label: "Matriculados",
        value: report.totals.enrolled,
        note: "Total da escola sabatina",
      },
      {
        label: "Presentes + visitas",
        value: report.totals.attendedWithVisits,
        note: "Comparativo do sábado",
      },
      {
        label: "Estudaram lição",
        value: report.totals.studiedLesson,
        note: "Lição concluída",
      },
      {
        label: "Oferta total",
        value: report.totals.offering,
        note: "Oferta do sábado",
      },
      {
        label: "Ofertas acumuladas",
        value: report.totals.accumulatedOffering,
        note: "Acumulado do trimestre",
      },
    ],
  };
}

function printReport() {
  const report = buildReport();
  const html = `
    <html>
      <head>
        <title>${escapeHTML(report.title)}</title>
        <style>
          body{font-family:Segoe UI,Arial,sans-serif;padding:24px;color:#12201d}
          h1,h2,p{margin:0 0 12px}
          .box{border:1px solid #c8d6d2;border-radius:12px;padding:12px;margin:12px 0}
          .muted{color:#58706b}
          table{width:100%;border-collapse:collapse}
          td{border-bottom:1px solid #dbe5e1;padding:8px 0;vertical-align:top}
        </style>
      </head>
      <body>
        <h1>${escapeHTML(report.title)}</h1>
        <p class="muted">${escapeHTML(report.periodLabel)} · ${escapeHTML(report.classLabel)}</p>
        <div class="box">
          <strong>${escapeHTML(report.caption)}</strong>
          <div>${escapeHTML(report.total)}</div>
          <div class="muted">${escapeHTML(report.note)}</div>
        </div>
        <table>
          ${report.rows
            .map(
              (row) => `
              <tr><td><strong>${escapeHTML(row.label)}</strong><div class="muted">${escapeHTML(row.note || "")}</div></td><td>${escapeHTML(row.value)}</td></tr>
            `
            )
            .join("")}
        </table>
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

if (!globalThis.__iasdReportBind) {
  document.addEventListener("change", (event) => {
    const input = event.target.closest?.("[data-action='weekly-report-date']");
    if (!input) return;
    state.ui.reportDate = input.value;
    persist();
    render();
  });

  document.addEventListener("click", (event) => {
    const load = event.target.closest?.("[data-action='load-weekly-report']");
    if (load) {
      state.ui.reportDate = load.dataset.date;
      persist();
      render();
      return;
    }
    const remove = event.target.closest?.("[data-action='remove-weekly-report']");
    if (remove) {
      if (!window.confirm("Remover este relatório semanal?")) return;
      state.weeklyReports = state.weeklyReports.filter((item) => item.id !== remove.dataset.id);
      persist();
      render();
    }
  });
  globalThis.__iasdReportBind = true;
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

function statusBox(title, body) {
  return `
    <div class="muted-box">
      <strong>${escapeHTML(title)}</strong>
      <div class="note" style="margin-top:6px">${escapeHTML(body)}</div>
    </div>
  `;
}

function dashboardView() {
  const summary = buildDashboard();
  const secretary = isSecretary();
  const shortcuts = secretary
    ? [
        ["members", "Membros"],
        ["attendance", "Presencas"],
        ["lessons", "Licoes"],
        ["requests", "Trimestrais"],
        ["program", "Programa"],
        ["reports", "Relatorios"],
        ["messages", "Mensagens"],
        ["ranking", "Ranking"],
      ]
    : [
        ["program", "Programa"],
        ["ranking", "Ranking"],
        ["messages", "Mensagens"],
      ];

  return `
    <section class="panel dashboard-hero">
      <div class="section-header">
        <div>
          <h2>${secretary ? "Painel da Direcao" : "Painel do Membro"}</h2>
          </div>
        <div class="toolbar">
          <span class="chip alt">${secretary ? "Acesso administrativo" : "Acesso de membro"}</span>
          <button type="button" class="btn" data-action="goto" data-view="program">${icon("program")} Programa</button>
          <button type="button" class="btn" data-action="goto" data-view="messages">${icon("messages")} Mensagens</button>
        </div>
      </div>
      <div class="hero-grid">
        <div class="grid cards">
          ${metricCard("Membros ativos", summary.members, "Cadastro principal e classes", "members")}
          ${metricCard("Presenca media", `${summary.attendance}%`, "Ultimos registos da classe", "attendance")}
          ${metricCard("Licoes registadas", summary.lessons, "Periodo corrente", "lessons")}
          ${metricCard("Notificacoes", summary.messages, "Mensagens e avisos", "messages")}
        </div>
        <div class="muted-box">
          <strong>Atalhos rapidos</strong>
          <div class="note" style="margin-top:6px">Abra uma secao sem procurar no menu lateral.</div>
          <div class="quick-links" style="margin-top:12px">
            ${shortcuts
              .map(
                ([view, label]) => `
                  <button type="button" class="btn" data-action="goto" data-view="${view}">
                    ${escapeHTML(label)}
                  </button>
                `
              )
              .join("")}
          </div>
        </div>
      </div>
    </section>
    <section class="grid two">
      <div class="panel">
        <div class="section-header">
          <div>
            <h2>Proximo Sabado</h2>
            </div>
          <div class="toolbar">
            <span class="chip alt">${formatDate(state.ui.programDate)}</span>
            <button type="button" class="btn" data-action="goto" data-view="program">${icon("program")} Gerir</button>
          </div>
        </div>
        <div class="list">
          ${programsForDate(state.ui.programDate)
            .map(
              (item) => `
              <div class="row" style="grid-template-columns: 82px minmax(0,1.8fr) 1fr 1fr;">
                <strong>${escapeHTML(item.time)}</strong>
                <div>
                  <strong>${escapeHTML(item.activity)}</strong>
                  <div class="note">${escapeHTML(item.note || "Sem observacoes")}</div>
                </div>
                <span>${escapeHTML(item.responsible)}</span>
                <span class="chip gray">${escapeHTML(className(item.classId))}</span>
              </div>
            `
            )
            .join("") || `<div class="muted-box">Nenhum item publicado para esta data.</div>`}
        </div>
      </div>
      <div class="panel">
        <div class="section-header">
          <div>
            <h2>Classe em Destaque</h2>
            </div>
          <button type="button" class="btn" data-action="goto" data-view="ranking">${icon("ranking")} Abrir ranking</button>
        </div>
        <div class="ranking">
          ${rankingRows("quarter")
            .slice(0, 4)
            .map(
              (item, index) => `
                <div class="ranking-item">
                  <strong>#${index + 1}</strong>
                  <div>
                    <strong>${escapeHTML(item.name)}</strong>
                    <div class="note">Presenca ${item.score.attendance}% · Licao ${item.score.lesson}% · Participacao ${item.score.participation}%</div>
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
    <section class="grid two">
      <div class="panel">
        <div class="section-header">
          <div>
            <h2>Resumo por classe</h2>
            </div>
          ${secretary ? `<button type="button" class="btn" data-action="goto" data-view="members">${icon("members")} Gerir membros</button>` : ""}
        </div>
        <div class="list">
          ${state.classes
            .map((klass) => {
              const sum = getAttendanceSummary(klass.id);
              return `
                <div class="activity-item">
                  <div>
                    <strong>${escapeHTML(klass.name)}</strong>
                    <div class="meta">${sum.members} membros activos · ${sum.sessions} presencas registadas · ${sum.visitors} visitantes</div>
                  </div>
                  <span class="chip">${sum.rate}%</span>
                </div>
              `;
            })
            .join("")}
        </div>
      </div>
      <div class="panel">
        <div class="section-header">
          <div>
            <h2>Actividade recente</h2>
            </div>
          <button type="button" class="btn" data-action="goto" data-view="reports">${icon("reports")} Relatorios</button>
        </div>
        <div class="activity-list">
          ${recentActivityItems()
            .map(
              (item) => `
                <div class="activity-item">
                  <div>
                    <strong>${escapeHTML(item.title)}</strong>
                    <div class="meta">${escapeHTML(item.meta)}</div>
                  </div>
                  <span class="chip gray">${escapeHTML(item.kind)}</span>
                </div>
              `
            )
            .join("")}
        </div>
      </div>
    </section>
    <section class="panel">
      <div class="section-header">
        <div>
          <h2>Status rapido</h2>
          </div>
      </div>
      <div class="grid three">
        ${statusBox("Membros por classe", classBreakdown())}
        ${statusBox("Requisicoes do trimestre", requestBreakdown())}
        ${statusBox("Mensagens recentes", recentMessages())}
      </div>
    </section>
  `;
}

function membersView() {
  const members = visibleMembers();
  const classFilter = state.ui.memberFilterClass;
  const filtered = classFilter === "all" ? members : members.filter((item) => item.classId === classFilter);
  const editing = state.members.find((item) => item.id === state.ui.editMemberId) || null;

  return `
    <section class="grid two">
      <div class="panel">
        <div class="section-header">
          <div>
            <h2>${editing ? "Editar membro" : "Novo membro"}</h2>
            </div>
        </div>
        <form id="memberForm" class="form-grid">
          <div class="form-grid two">
            <div class="field">
              <label for="memberName">Nome</label>
              <input id="memberName" name="name" value="${escapeHTML(editing?.name || "")}" required />
            </div>
            <div class="field">
              <label for="memberContact">Contacto</label>
              <input id="memberContact" name="contact" value="${escapeHTML(editing?.contact || "")}" />
            </div>
          </div>
          <div class="form-grid three">
            <div class="field">
              <label for="memberClass">Classe</label>
              <select id="memberClass" name="classId" required>
                ${state.classes
                  .map(
                    (klass) =>
                      `<option value="${klass.id}" ${editing?.classId === klass.id ? "selected" : ""}>${escapeHTML(klass.name)}</option>`
                  )
                  .join("")}
              </select>
            </div>
            <div class="field">
              <label for="memberJoined">Data de ingresso</label>
              <input id="memberJoined" name="joinedAt" type="date" value="${escapeHTML(editing?.joinedAt || todayISO())}" required />
            </div>
            <div class="field">
              <label for="memberActive">Estado</label>
              <select id="memberActive" name="active">
                <option value="true" ${editing?.active !== false ? "selected" : ""}>Activo</option>
                <option value="false" ${editing?.active === false ? "selected" : ""}>Inactivo</option>
              </select>
            </div>
          </div>
          <div class="toolbar">
            <button class="btn primary" type="submit">${icon("save")} ${editing ? "Actualizar" : "Cadastrar"}</button>
            ${editing ? `<button class="btn" type="button" data-action="cancel-member-edit">Cancelar</button>` : ""}
          </div>
        </form>
      </div>
      <div class="panel">
        <div class="section-header">
          <div>
            <h2>Filtros e resumo</h2>
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
                <div class="toolbar">
                  <button type="button" class="btn" data-action="edit-member" data-id="${member.id}">${icon("edit")} Editar</button>
                  <button type="button" class="btn danger" data-action="remove-member" data-id="${member.id}">Remover</button>
                </div>
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
              <label for="requestQuantity">Quantidade</label>
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
                  <div class="toolbar">
                    <span class="status ${request.status === "Enviado" ? "ok" : "warn"}">${escapeHTML(request.status)}</span>
                    <button type="button" class="btn danger" data-action="remove-request" data-id="${request.id}">Remover</button>
                  </div>
                </div>
                <div class="note">${request.quantity} trimestrais · ${formatDate(request.createdAt)}</div>
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
  const date = state.ui.reportDate || todayISO();
  const existing = state.weeklyReports.find((item) => item.date === date) || null;
  const report = existing || buildWeeklyReportFromReport({
    date,
    classes: reportRowsFromReport(null),
  });
  const quarterSummary = quarterSummaryForDate(date);
  const recentReports = state.weeklyReports
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 13);

  return `
    <section class="grid two">
      <div class="panel">
        <div class="section-header">
          <div>
            <h2>Relatórios</h2>
            </div>
          <div class="toolbar">
            <span class="chip alt">${weeklyReportLabel(date)}</span>
            <button type="button" class="btn warn" data-action="print-report">${icon("print")} Imprimir PDF</button>
          </div>
        </div>
        <div class="grid three">
          ${reportMetric("Matriculados", report.totals.enrolled, "Total da escola")}
          ${reportMetric("Presentes + visitas", report.totals.attendedWithVisits, "Participação do sábado")}
          ${reportMetric("Estudaram lição", report.totals.studiedLesson, "Lição concluída")}
        </div>
        <div class="grid two" style="margin-top:14px">
          ${reportMetric("Oferta total", report.totals.offering, "Valor do sábado")}
          ${reportMetric("Ofertas acumuladas", report.totals.accumulatedOffering, "Acumulado do trimestre")}
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
      <div class="panel">
        <div class="section-header">
          <div>
            <h2>Resumo trimestral</h2>
            </div>
          <span class="chip alt">${quarterSummary.count}/13 sábados</span>
        </div>
        <div class="grid three">
          ${reportMetric("Matriculados", quarterSummary.average.enrolled, "Média por sábado")}
          ${reportMetric("Presentes", quarterSummary.average.present, "Média por sábado")}
          ${reportMetric("Visitas", quarterSummary.average.visits, "Média por sábado")}
          ${reportMetric("Lição", quarterSummary.average.studiedLesson, "Média por sábado")}
          ${reportMetric("Oferta média", quarterSummary.average.offering, "Média por sábado")}
          ${reportMetric("Presentes + visitas", quarterSummary.average.attendedWithVisits, "Média por sábado")}
        </div>
        <div class="muted-box" style="margin-top:14px">
          <strong>Ofertas acumuladas no trimestre</strong>
          <div style="font-size:1.4rem;font-weight:700;margin-top:8px">${escapeHTML(quarterSummary.accumulatedOffering)}</div>
        </div>
        <div class="list" style="margin-top:14px">
          <div class="muted-box">
            <strong>Últimos relatórios guardados</strong>
            <div class="note" style="margin-top:6px">Leitura sem edição.</div>
          </div>
          ${recentReports
            .map(
              (item) => `
                <div class="muted-box">
                  <div class="toolbar wrap">
                    <strong>${weeklyReportLabel(item.date)}</strong>
                    <span class="chip gray">${reportTotals(item).attendedWithVisits} presentes+visitas</span>
                  </div>
                  <div class="note">Oferta ${reportTotals(item).offering} · Acumulado ${reportTotals(item).accumulatedOffering || 0}</div>
                </div>
              `
            )
            .join("") || `<div class="muted-box">Ainda não há relatórios guardados.</div>`}
        </div>
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




