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
    Email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    GitHub: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.35 4.79-4.58 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z"/></svg>',
    "Google Scholar": '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2 1 8l11 6 9-4.91V16h2V8L12 2zM4 13.18v3.5L12 21l8-4.32v-3.5L12 17.5 4 13.18z"/></svg>',
    link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>',
  };
  const linkIcon = (k) => ICONS[k] || ICONS.link;

  function boldMe(authors) {
    return authors.replace(/Hao Zhong/g, '<strong class="me">Hao Zhong</strong>');
  }

  function renderProfile(p) {
    $("#profile-name").innerHTML = `${p.name}<span class="name-zh" lang="zh">${p.zh}</span>`;
    const links = Object.entries(p.links)
      .map(([label, url]) => `<li><a class="chip" href="${url}">${linkIcon(label)}<span>${label}</span></a></li>`)
      .join("");
    $("#profile").innerHTML =
      `<p class="role">${p.role}</p>` +
      `<p class="affiliation">${p.affiliation}</p>` +
      `<p class="location">${p.location}</p>` +
      `<ul class="profile-links">${links}</ul>` +
      (p.interests?.length ? `<p class="label">Research interests</p><ul class="tags">` +
        p.interests.map((t) => `<li class="badge">${t}</li>`).join("") + `</ul>` : "");
    $("#about-body").innerHTML = DATA.about.map((paragraph) => `<p>${paragraph}</p>`).join("");
    $("#foot-name").textContent = p.name + " · " + p.zh;
  }

  function publication(p, featured) {
    const li = el("li", featured ? "pub card" : "pub");
    const titleLink = p.links?.arXiv || p.links?.Project || p.links?.Code;
    const imageLink = p.links?.Project || titleLink || p.img;
    const heading = titleLink ? `<a href="${titleLink}">${p.title}</a>` : p.title;
    // Venues with letters (CVPR 2026, NeurIPS 2025) are peer-reviewed; bare years mark preprints/reports.
    const peer = /[A-Za-z]/.test(p.venue || "");
    const chips = Object.entries(p.links || {})
      .map(([label, url]) => `<a class="chip" href="${url}">${label}${ICONS.arrow}</a>`).join("");
    const meta =
      `<span class="badge${peer ? " peer" : ""}">${p.venue}</span>` +
      (p.tag ? `<span>${p.tag}</span>` : "") +
      (!featured && chips ? `<span class="paper-links" style="margin:0" aria-label="Resources for ${p.title}">${chips}</span>` : "");
    let marker = "";
    if (p.img) {
      li.classList.add("has-thumbnail");
      const size = p.imgWidth && p.imgHeight ? ` width="${p.imgWidth}" height="${p.imgHeight}"` : "";
      const pos = p.imgPosition ? ` style="--pos:${p.imgPosition}"` : "";
      marker = `<a class="thumb" href="${imageLink}" aria-label="View ${p.shortTitle || p.title}">` +
        `<span class="thumb-frame"${pos}><img src="${p.img}" alt="${p.imgAlt || p.title}"${size} loading="lazy" decoding="async" /></span>` +
        (featured ? `<span class="thumb-cap">${p.shortTitle}<span>${p.topic}</span></span>` : "") + `</a>`;
    } else if (featured) {
      marker = `<div class="pub-identity"><p class="eyebrow">${p.topic || ""}</p>` +
        `<span class="short-title">${p.shortTitle || ""}</span><span class="identity-venue">${p.venue}</span></div>`;
    }
    li.innerHTML = marker + `<div class="pub-body">` +
      `<h3 class="ptitle">${heading}</h3>` +
      `<p class="authors">${boldMe(p.authors)}</p>` +
      `<p class="pub-meta">${meta}</p>` +
      (featured && p.summary ? `<p class="pub-summary">${p.summary}</p>` : "") +
      (featured && chips ? `<div class="paper-links" aria-label="Resources for ${p.shortTitle || p.title}">${chips}</div>` : "") +
      (p.note ? `<p class="pnote">${p.note}</p>` : "") + `</div>`;
    return li;
  }

  function renderPubs() {
    DATA.pubs.filter((p) => p.selected).forEach((p) => $("#selected-pubs").appendChild(publication(p, true)));
    const others = DATA.pubs.filter((p) => !p.selected);
    const years = [...new Set(others.map((p) => p.year))].sort((a, b) => b - a);
    years.forEach((year) => {
      const group = el("div", "year-row");
      group.appendChild(el("h3", "year-label", String(year)));
      const list = el("ol", "pubs");
      others.filter((p) => p.year === year).forEach((p) => list.appendChild(publication(p, false)));
      group.appendChild(list);
      $("#more-pubs").appendChild(group);
    });
  }

  function renderNews() {
    const render = (items) => items.map((n) =>
      `<li><span class="date">${n.date}</span><p>${n.html}</p></li>`).join("");
    $("#news-list").innerHTML = render(DATA.news.slice(0, 3));
    $("#older-news-list").innerHTML = render(DATA.news.slice(3));
    $(".older-news").hidden = DATA.news.length <= 3;
  }

  function renderEducation() {
    $("#education-list").innerHTML = DATA.education.map((it) =>
      `<div class="edu"><p class="period">${it.period}</p><div>` +
      `<h3>${it.role}</h3><p class="org">${it.org}</p>` +
      `<p class="detail">${it.detail}</p></div></div>`).join("");
  }

  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    const dark = theme === "dark";
    const label = `Switch to ${dark ? "light" : "dark"} theme`;
    $("#theme-btn").setAttribute("aria-label", label);
    $("#theme-btn").title = label;
    const meta = $("#theme-color");
    if (meta) meta.content = dark ? "#1f1e1b" : "#f0eee6";
  }
  $("#theme-btn").addEventListener("click", () => {
    const theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem("theme", theme); } catch (_) {}
    setTheme(theme);
  });

  renderProfile(DATA.profile);
  renderNews();
  renderPubs();
  renderEducation();
  setTheme(document.documentElement.dataset.theme);
})();
