const $ = (id) => document.getElementById(id);

function safeText(value, fallback = "-") {
  return value === undefined || value === null || value === "" ? fallback : String(value);
}

function statusClass(value) {
  const text = safeText(value, "").toLowerCase();
  if (text.includes("ready") || text.includes("active")) return "active";
  if (text.includes("waiting") || text.includes("review")) return "waiting";
  return "";
}

function progressBar(value) {
  const pct = Math.max(0, Math.min(100, Number(value || 0)));
  return `<div class="progress"><span style="width:${pct}%"></span></div>`;
}

async function loadData() {
  const response = await fetch("./data.json", { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`data.jsonを読み込めませんでした: ${response.status}`);
  }
  return response.json();
}

function renderProjects(projects = []) {
  if (!projects.length) return "<p>公開用プロジェクトはまだありません。</p>";
  return projects.map((project) => `
    <article class="project-card">
      <div class="project-meta">
        <span class="badge">${safeText(project.id)}</span>
        <span class="badge ${statusClass(project.status)}">${safeText(project.status)}</span>
      </div>
      <h3>${safeText(project.name)}</h3>
      ${progressBar(project.progress)}
      <p>${safeText(project.progress, 0)}% / 次: ${safeText(project.next)}</p>
    </article>
  `).join("");
}

function renderGoals(goals = []) {
  if (!goals.length) return "<p>ロードマップはまだありません。</p>";
  return goals.map((goal, index) => `
    <article class="goal-card">
      <span class="badge">STEP ${index + 1}</span>
      <h3>${safeText(goal.label)}</h3>
      <p>${safeText(goal.note)}</p>
      ${progressBar(goal.progress)}
    </article>
  `).join("");
}

function renderTimeline(items = []) {
  if (!items.length) return "<p>タイムラインはまだありません。</p>";
  return items.map((item) => `
    <article class="timeline-card">
      <div class="project-meta">
        <span class="badge">${safeText(item.project)}</span>
        <span class="badge ${statusClass(item.state)}">${safeText(item.state)}</span>
      </div>
      <h3>${safeText(item.label)}</h3>
      <p>${safeText(item.from)} → ${safeText(item.to)}</p>
      <div class="timebar"><span style="width:${Math.max(0, Math.min(100, Number(item.progress || 0)))}%"></span></div>
    </article>
  `).join("");
}

function render(data) {
  const overall = data.overall || {};
  const today = data.today || {};

  $("subtitle").textContent = safeText(data.subtitle, "今日の重点タスクを見るミニダッシュボード");
  $("updated").textContent = safeText(data.updated_at);

  $("today-title").textContent = safeText(today.title, "今日の重点タスク");
  $("today-desc").textContent = safeText(today.description, "公開用に抽象化されたタスクです。");
  $("today-project").textContent = safeText(today.project_id, "PJ");
  $("today-status").textContent = safeText(today.status, "READY");
  $("today-status").className = `pill ${statusClass(today.status)}`;

  const progress = Math.max(0, Math.min(100, Number(overall.progress || 0)));
  $("overall-ring").style.setProperty("--value", progress);
  $("overall-progress").textContent = `${progress}%`;
  $("overall-meta").textContent = `${safeText(overall.project_count, 0)} projects / ${safeText(overall.current_focus, "focus未設定")}`;

  $("project-list").innerHTML = renderProjects(data.projects || []);
  $("roadmap").innerHTML = renderGoals(data.goals || []);
  $("timeline").innerHTML = renderTimeline(data.timeline || []);
}

function renderError(error) {
  const target = $("project-list");
  if (target) {
    target.innerHTML = `<div class="error-card">${safeText(error.message, "読み込みに失敗しました")}</div>`;
  }
}

loadData().then(render).catch(renderError);
