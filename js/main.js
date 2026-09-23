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
    return authors.replace(/Hao Zhong/g, '<strong class="me">Hao Zhong</strong>');
  }

  function renderProfile(p) {
    const links = Object.entries(p.links)
      .map(([label, url]) => `<li><a href="${url}">${linkIcon(label)}<span>${label}</span></a></li>`)
      .join("");
    $("#profile").innerHTML =
      `<p class="eyebrow">${p.role}</p>` +
      `<h1 id="profile-name">${p.name}<span class="name-zh" lang="zh">${p.zh}</span></h1>` +
      `<p class="affiliation">${p.affiliation}</p>` +
      `<p class="location">${p.location}</p>` +
      `<ul class="profile-links">${links}</ul>`;
    $("#foot-name").textContent = p.name + " · " + p.zh;
    $("#about-body").innerHTML = DATA.about
      .map((paragraph) => `<p>${paragraph}</p>`).join("");
  }

  function publication(p, featured) {
    const li = el("li", featured ? "pub featured-pub" : "pub");
    const links = Object.entries(p.links || {})
      .map(([label, url]) => `<a href="${url}">${label}<span aria-hidden="true"> ↗</span></a>`).join("");
    const titleLink = p.links?.arXiv || p.links?.Project || p.links?.Code;
    const heading = titleLink ? `<a href="${titleLink}">${p.title}</a>` : p.title;
    const imageLink = p.links?.Project || titleLink || p.img;
    const marker = p.img ?
      `<a class="pub-thumbnail" href="${imageLink}" aria-label="View ${p.shortTitle || p.title}">` +
      `<span class="thumbnail-frame"><img src="${p.img}" alt="${p.imgAlt || p.title}"${p.imgWidth && p.imgHeight ? ` width="${p.imgWidth}" height="${p.imgHeight}"` : ""} loading="lazy" decoding="async" /></span>` +
      (featured ? `<span class="thumbnail-caption">${p.shortTitle}<span>${p.topic}</span></span>` : "") + `</a>` :
      (featured ? `<div class="pub-identity"><span class="eyebrow">${p.topic}</span><span class="short-title">${p.shortTitle}</span><span class="identity-venue">${p.venue}</span></div>` : "");
    if (p.img) li.classList.add("has-thumbnail");
    li.innerHTML = marker + `<div class="pub-body">` +
      `<h3 class="ptitle">${heading}</h3>` +
      `<p class="authors">${boldMe(p.authors)}</p>` +
      `<p class="pub-meta"><span class="venue">${p.venue}</span>${p.tag ? `<span>${p.tag}</span>` : ""}</p>` +
      (p.summary ? `<p class="pub-summary">${p.summary}</p>` : "") +
      (links ? `<div class="paper-links" aria-label="Resources for ${p.shortTitle || p.title}">${links}</div>` : "") +
      (p.note ? `<p class="pnote">${p.note}</p>` : "") + `</div>`;
    return li;
  }

  function renderPubs() {
    DATA.pubs.filter((p) => p.selected).forEach((p) => $("#selected-pubs").appendChild(publication(p, true)));
    const others = DATA.pubs.filter((p) => !p.selected);
    const years = [...new Set(others.map((p) => p.year))].sort((a, b) => b - a);
    years.forEach((year) => {
      const group = el("div", "year-group");
      group.appendChild(el("h3", "year-label", String(year)));
      const list = el("ol", "pubs");
      others.filter((p) => p.year === year).forEach((p) => list.appendChild(publication(p, false)));
      group.appendChild(list);
      $("#more-pubs").appendChild(group);
    });
  }

  function renderNews() {
    const render = (items) => items.map((n) =>
      `<li><span class="date">${n.date}</span><span>${n.html}</span></li>`).join("");
    $("#news-list").innerHTML = render(DATA.news.slice(0, 3));
    $("#older-news-list").innerHTML = render(DATA.news.slice(3));
    $(".older-news").hidden = DATA.news.length <= 3;
  }

  function renderEducation() {
    $("#education-list").innerHTML = DATA.education.map((it) =>
      `<div class="education-item"><p class="period">${it.period}</p><div>` +
      `<h3>${it.role}</h3><p class="org">${it.org}</p>` +
      `<p class="detail">${it.detail}</p></div></div>`).join("");
  }

  function setThemeBtn() {
    const dark = document.documentElement.dataset.theme === "dark";
    $("#theme-btn").textContent = dark ? "☀" : "☾";
    $("#theme-btn").setAttribute("aria-label", `Switch to ${dark ? "light" : "dark"} theme`);
    $("#theme-btn").title = `Switch to ${dark ? "light" : "dark"} theme`;
  }
  $("#theme-btn").addEventListener("click", () => {
    const theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("theme", theme); } catch (_) {}
    setThemeBtn();
  });

  renderProfile(DATA.profile);
  renderNews();
  renderPubs();
  renderEducation();
  setThemeBtn();
})();
