/* main.js — renders the page from DATA (see data.js) and handles theming. */
(function () {
  "use strict";
  const $ = (sel) => document.querySelector(sel);
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };

  /* ---- inline icons (no external requests) ---- */
  const ICONS = {
    Email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    GitHub: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.35 4.79-4.58 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z"/></svg>',
    "Google Scholar": '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 1 8l11 6 9-4.91V16h2V8L12 2zM4 13.18v3.5L12 21l8-4.32v-3.5L12 17.5 4 13.18z"/></svg>',
  };
  const linkIcon = (k) => ICONS[k] || '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>';

  function boldMe(authors) {
    return authors.replace(/Hao Zhong/g, '<span class="me">Hao Zhong</span>');
  }

  /* ---------------- render: profile rail ---------------- */
  function renderRail(p) {
    const links = Object.entries(p.links)
      .map(([k, url]) => `<li><a href="${url}">${linkIcon(k)}<span>${k}</span></a></li>`)
      .join("");
    $("#rail").innerHTML =
      `<h1>${p.name}</h1>` +
      `<div class="tagline">${p.tagline}</div>` +
      `<div class="affil">${p.affiliation}<br><span class="loc">${p.location}</span></div>` +
      `<ul class="links">${links}</ul>`;
    $("#foot-name").textContent = p.name;
  }

  /* ---------------- render: publications ---------------- */
  let pubFilter =
    new URLSearchParams(location.search).get("pubs") === "all" ? "all" : "selected";
  function renderPubs() {
    const list = $("#pub-list");
    list.innerHTML = "";
    const items = DATA.pubs.filter((p) => (pubFilter === "all" ? true : p.selected));
    items.forEach((p) => {
      const li = el("li", "pub");
      const links = Object.entries(p.links || {})
        .map(([k, url]) => `<a href="${url}">${k}</a>`)
        .join("");
      li.innerHTML =
        `<p class="ptitle">${p.title}${p.selected ? '<span class="selstar">★</span>' : ''}</p>` +
        `<p class="authors">${boldMe(p.authors)}</p>` +
        `<div class="meta"><span class="venue">${p.venue}</span>` +
        (p.tag ? `<span class="badge tag">${p.tag}</span>` : "") +
        (links ? `<span class="plinks">${links}</span>` : "") +
        `</div>` +
        (p.note ? `<p class="pnote${p.confirm ? ' confirm' : ''}">${p.note}</p>` : "");
      list.appendChild(li);
    });
    $("#pub-count").textContent = `Showing ${items.length} of ${DATA.pubs.length}.`;
  }

  /* ---------------- render: simple lists ---------------- */
  function renderAbout() {
    $("#about-body").innerHTML = DATA.about.map((p) => `<p>${p}</p>`).join("");
  }
  function renderNews() {
    $("#news-list").innerHTML = DATA.news
      .map((n) => `<li><span class="date">${n.date}</span><span class="body">${n.html}</span></li>`)
      .join("");
  }
  function renderTimeline(id, arr) {
    $(id).innerHTML = arr
      .map(
        (it) =>
          `<div class="tl-item"><div><div class="role">${it.role}</div>` +
          `<div class="org">${it.org}${it.place ? " · " + it.place : ""}</div></div>` +
          `<div class="period">${it.period}</div>` +
          `<div class="detail">${it.detail}</div></div>`
      )
      .join("");
  }

  /* ---------------- theme toggle ---------------- */
  function setThemeBtn() {
    $("#theme-btn").textContent =
      document.documentElement.dataset.theme === "dark" ? "☀" : "☾";
  }
  $("#theme-btn").addEventListener("click", () => {
    const cur = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = cur;
    localStorage.setItem("theme", cur);
    setThemeBtn();
  });

  /* ---------------- pub filter toggle ---------------- */
  $("#pub-toggle").addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    pubFilter = btn.dataset.filter;
    $("#pub-toggle").querySelectorAll("button").forEach((b) => b.classList.toggle("on", b === btn));
    renderPubs();
  });

  /* ---------------- boot ---------------- */
  renderRail(DATA.profile);
  renderAbout();
  renderNews();
  $("#pub-toggle").querySelectorAll("button").forEach((b) =>
    b.classList.toggle("on", b.dataset.filter === pubFilter));
  renderPubs();
  renderTimeline("#education-list", DATA.education);
  setThemeBtn();
})();
