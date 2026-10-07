const CDN = "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/";
const RENDER_CDN = "https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/";
const ITEM_CDN = "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/";
const RUNES = "ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ";
const CORNER = '<svg viewBox="0 0 24 24"><path d="M2 22 V8 Q2 2 8 2 H22 M6 22 V10 Q6 6 10 6 H22" /><circle cx="2" cy="22" r="1.6" /><circle cx="22" cy="2" r="1.6" /></svg>';
const CARD_BACK = `
  <svg class="back-art" viewBox="0 0 100 165" aria-hidden="true">
    <rect x="5" y="5" width="90" height="155" rx="5" />
    <rect x="8.5" y="8.5" width="83" height="148" rx="3" />
    <g class="mandala">
      <circle cx="50" cy="82.5" r="33" /><circle cx="50" cy="82.5" r="27" stroke-dasharray="1.5 2.5" />
      <path d="M50 51 L77.3 98.3 H22.7 Z M50 114 L22.7 66.7 H77.3 Z" />
      <path d="M50 55.5 L77 82.5 L50 109.5 L23 82.5 Z M30.9 63.4 H69.1 V101.6 H30.9 Z" />
    </g>
    <path class="eye" d="M37 82.5 Q50 70 63 82.5 Q50 95 37 82.5 Z" />
    <circle class="pupil" cx="50" cy="82.5" r="4.5" />
    <path class="moon" d="M46 18 A11 11 0 1 0 60 32 A9 9 0 1 1 46 18 Z" />
    <path class="moon" transform="rotate(180 50 82.5)" d="M46 18 A11 11 0 1 0 60 32 A9 9 0 1 1 46 18 Z" />
    <circle class="star" cx="20" cy="26" r="1.1" /><circle class="star" cx="80" cy="24" r="1.3" />
    <circle class="star" cx="18" cy="138" r="1.3" /><circle class="star" cx="82" cy="140" r="1.1" />
    <circle class="star" cx="25" cy="48" r=".8" /><circle class="star" cx="75" cy="118" r=".8" />
    <circle class="star" cx="78" cy="50" r=".9" /><circle class="star" cx="22" cy="115" r=".9" />
  </svg>`;
const RADAR_R = 110;
const polar = (i, r) => {
  const a = -Math.PI / 2 + (i * Math.PI * 2) / Object.keys(TRAITS).length;
  return [Math.cos(a) * r, Math.sin(a) * r];
};
const MAX_HEROES = 3;
const FAN_SIZE = 7;
const LANG_KEY = "dotaTarot.lang";
const DAILY_KEY = "dotaTarot.daily";
const ATTR_COLOR = { str: "var(--str)", agi: "var(--agi)", int: "var(--int)", uni: "var(--uni)" };

const state = { role: null, heroes: [], attr: "all", query: "", lang: "en", reading: null, daily: null, dailyDate: null };
const $ = (sel) => document.querySelector(sel);

// localStorage can be missing or throw (private mode, blocked storage); the site works without it.
function load(key) { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } }
function save(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} }

/* ---------- Language ---------- */
const t = (key, vars = {}) => (UI[state.lang][key] ?? UI.en[key]).replace(/\{(\w+)\}/g, (_, k) => vars[k]);
const loc = (en, zh) => (state.lang === "zh" && zh ? { ...en, ...zh } : en);
const traitName = (k) => loc(TRAITS[k], ZH.traits[k]).name;
const roleT = (role) => loc(role, ZH.roles[role.id]);
const arcT = (k) => loc(ARCANA[k], ZH.arcana[k]);
const heroName = (h) => (state.lang === "zh" && ZH.heroes[h.slug]) || h.name;
const dailyT = () => (state.lang === "zh" ? ZH.daily : DAILY);
const listJoin = (items) =>
  items.length < 2 ? items.join("") : items.slice(0, -1).join(t("listSep")) + t("listAnd") + items[items.length - 1];

function setLang(lang) {
  state.lang = lang;
  save(LANG_KEY, lang);
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  document.title = t("docTitle");
  document.querySelectorAll("[data-i18n]").forEach((el) => (el.innerHTML = t(el.dataset.i18n)));
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => (el.placeholder = t(el.dataset.i18nPh)));
  document.querySelectorAll(".lang button").forEach((b) => b.classList.toggle("active", b.dataset.lang === lang));
  renderRoles();
  relabelHeroes();
  renderPicked();
  filterHeroes();
  if (state.reading) relabelReading();
  renderDailyHeader();
  if (state.daily && !$("#daily-result").hidden) relabelDaily();
}

/* ---------- Ember particles ---------- */
const embers = (() => {
  const canvas = $("#embers");
  const ctx = canvas.getContext("2d");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let w, h, parts = [];

  function resize() {
    w = canvas.width = innerWidth * devicePixelRatio;
    h = canvas.height = innerHeight * devicePixelRatio;
  }
  function spawn(x, y, burst, color) {
    const a = burst ? Math.random() * Math.PI * 2 : -Math.PI / 2 + (Math.random() - 0.5) * 0.6;
    const s = (burst ? 2 + Math.random() * 5 : 0.3 + Math.random() * 0.9) * devicePixelRatio;
    parts.push({
      x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s,
      r: (0.6 + Math.random() * 2.2) * devicePixelRatio,
      life: 1, decay: burst ? 0.012 + Math.random() * 0.015 : 0.002 + Math.random() * 0.004,
      color: color || (Math.random() < 0.7 ? "255,150,60" : "217,178,95"),
      wob: Math.random() * 10,
    });
  }
  function tick() {
    ctx.clearRect(0, 0, w, h);
    if (parts.length < 90) spawn(Math.random() * w, h + 10);
    ctx.globalCompositeOperation = "lighter";
    for (const p of parts) {
      p.wob += 0.03;
      p.x += p.vx + Math.sin(p.wob) * 0.3;
      p.y += p.vy;
      p.vx *= 0.99; p.vy *= 0.99;
      p.life -= p.decay;
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
      g.addColorStop(0, `rgba(${p.color},${p.life})`);
      g.addColorStop(1, `rgba(${p.color},0)`);
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2); ctx.fill();
    }
    parts = parts.filter((p) => p.life > 0 && p.y > -20);
    requestAnimationFrame(tick);
  }
  addEventListener("resize", resize);
  resize();
  if (!reduce) tick();

  return {
    burst(el, hex) {
      if (reduce) return;
      const r = el.getBoundingClientRect();
      const rgb = hex.match(/\w\w/g).map((c) => parseInt(c, 16)).join(",");
      const x = (r.left + r.width / 2) * devicePixelRatio, y = (r.top + r.height / 2) * devicePixelRatio;
      for (let i = 0; i < 70; i++) spawn(x, y, true, rgb);
    },
  };
})();

/* ---------- Navigation ---------- */
function go(name) {
  const cur = $(".screen.active");
  const next = $(`#screen-${name}`);
  if (cur === next) return;
  cur.classList.remove("active");
  cur.classList.add("leaving");
  setTimeout(() => {
    cur.classList.remove("leaving");
    next.classList.add("active");
    scrollTo({ top: 0 });
  }, 350);
}
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-go]");
  if (btn && !btn.disabled) go(btn.dataset.go);
});

/* ---------- Helpers ---------- */
function portrait(hero) {
  const img = new Image();
  img.src = CDN + hero.slug + ".png";
  img.alt = heroName(hero);
  img.loading = "lazy";
  img.onerror = () => img.replaceWith(fallback(hero));
  return img;
}
function fallback(hero) {
  const d = document.createElement("div");
  d.className = `fallback ${hero.attr}`;
  d.textContent = hero.name.split(/[\s-]/).map((w) => w[0]).join("").slice(0, 2);
  return d;
}
const roleSvg = (role) => `<svg viewBox="0 0 48 48" aria-hidden="true">${role.icon}</svg>`;

// The Clipboard API only exists on HTTPS/localhost and can be denied, so fall back to execCommand.
function copyText(text, btn) {
  const done = () => (btn.textContent = t("copied"));
  const legacy = () => {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.cssText = "position:fixed; opacity:0";
    document.body.append(ta);
    ta.select();
    let copied = false;
    try { copied = document.execCommand("copy"); } catch {}
    ta.remove();
    if (copied) done();
  };
  if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(done, legacy);
  else legacy();
}

/* ---------- Step 1: roles ---------- */
function renderRoles() {
  $("#roles").innerHTML = ROLES.map((r, i) => {
    const on = state.role?.id === r.id;
    const rt = roleT(r);
    return `
    <button class="role${on ? " selected" : ""}" style="--i:${i}" data-role="${r.id}" aria-pressed="${on}">
      <span class="role-numeral">${r.numeral}</span>
      ${roleSvg(r)}
      <h3>${rt.name}</h3>
      <div class="pos">${rt.pos}</div>
      <p>${rt.blurb}</p>
    </button>`;
  }).join("");
}

function initRoles() {
  $("#roles").addEventListener("click", (e) => {
    const card = e.target.closest(".role");
    if (!card) return;
    state.role = ROLES.find((r) => r.id === +card.dataset.role);
    document.querySelectorAll(".role").forEach((el) => {
      const on = el === card;
      el.classList.toggle("selected", on);
      el.setAttribute("aria-pressed", on);
    });
    $("#to-heroes").disabled = false;
  });

  // Subtle 3D tilt that follows the cursor.
  $("#roles").addEventListener("pointermove", (e) => {
    const card = e.target.closest(".role");
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateY(-6px)`;
  });
  $("#roles").addEventListener("pointerout", (e) => {
    const card = e.target.closest(".role");
    if (card && !card.contains(e.relatedTarget)) card.style.transform = "";
  });
}

/* ---------- Step 2: heroes ---------- */
function renderHeroes() {
  const grid = $("#hero-grid");
  HEROES.forEach((h, i) => {
    const b = document.createElement("button");
    b.className = "hero";
    b.dataset.slug = h.slug;
    b.style.setProperty("--i", i);
    b.style.setProperty("--attr", ATTR_COLOR[h.attr]);
    b.append(portrait(h));
    b.insertAdjacentHTML("beforeend", '<span class="name"></span>');
    grid.append(b);
  });

  grid.addEventListener("click", (e) => {
    const b = e.target.closest(".hero");
    if (b) toggleHero(b.dataset.slug);
  });
  $("#picked").addEventListener("click", (e) => {
    const x = e.target.closest(".x");
    if (x) toggleHero(x.dataset.slug);
  });
  $("#search").addEventListener("input", (e) => { state.query = e.target.value.trim().toLowerCase(); filterHeroes(); });
  $("#filters").addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    state.attr = chip.dataset.attr;
    document.querySelectorAll(".chip").forEach((c) => c.classList.toggle("active", c === chip));
    filterHeroes();
  });
  $("#to-reading").addEventListener("click", startReading);
}

function relabelHeroes() {
  document.querySelectorAll(".hero").forEach((b) => {
    const h = HEROES.find((x) => x.slug === b.dataset.slug);
    b.title = heroName(h);
    b.querySelector(".name").textContent = heroName(h);
  });
}

function filterHeroes() {
  document.querySelectorAll(".hero").forEach((b) => {
    const h = HEROES.find((x) => x.slug === b.dataset.slug);
    const match = h.name.toLowerCase().includes(state.query) || (ZH.heroes[h.slug] || "").includes(state.query);
    b.classList.toggle("hidden", !((state.attr === "all" || h.attr === state.attr) && match));
  });
}

function toggleHero(slug) {
  const i = state.heroes.indexOf(slug);
  if (i >= 0) state.heroes.splice(i, 1);
  else if (state.heroes.length < MAX_HEROES) state.heroes.push(slug);
  else return;
  document.querySelectorAll(".hero").forEach((b) => b.classList.toggle("selected", state.heroes.includes(b.dataset.slug)));
  $("#hero-grid").classList.toggle("full", state.heroes.length === MAX_HEROES);
  $("#to-reading").disabled = state.heroes.length === 0;
  renderPicked();
}

function renderPicked() {
  const wrap = $("#picked");
  wrap.innerHTML = "";
  for (let i = 0; i < MAX_HEROES; i++) {
    const slot = document.createElement("div");
    const h = HEROES.find((x) => x.slug === state.heroes[i]);
    slot.className = "slot" + (h ? " filled" : "");
    if (h) {
      slot.append(portrait(h));
      slot.insertAdjacentHTML("beforeend", `<button class="x" data-slug="${h.slug}" aria-label="${t("remove", { name: heroName(h) })}">×</button>`);
    } else {
      slot.textContent = t("slot", { n: i + 1 });
    }
    wrap.append(slot);
  }
}

/* ---------- Scoring ---------- */
function tally(roleWeights, heroes) {
  const s = Object.fromEntries(Object.keys(TRAITS).map((k) => [k, 0.5]));
  for (const [k, v] of Object.entries(roleWeights)) s[k] += v;
  // Picks always count as a full set of 3, so the lane can't drown out one or two heroes.
  const f = heroes.length ? MAX_HEROES / heroes.length : 0;
  for (const h of heroes) { s[h.traits[0]] += 2 * f; s[h.traits[1]] += f; }
  return s;
}
// Ties go to whichever trait the heroes lean towards more.
const ranked = (scores, tie = {}) =>
  Object.keys(scores).sort((a, b) => scores[b] - scores[a] || (tie[b] || 0) - (tie[a] || 0));

/* ---------- Step 3: reading ---------- */
function readingCards({ role, heroTrait, main }) {
  const rt = roleT(role), arc = arcT(main);
  return [
    {
      cap: t("capLane"), color: "#d9b25f", numeral: role.numeral,
      art: `<div class="emblem">${roleSvg(role)}</div>`,
      name: rt.name, label: rt.pos,
    },
    {
      cap: t("capChamps"), color: TRAITS[heroTrait].color, numeral: ARCANA[heroTrait].numeral,
      art: '<div class="portal"></div>', outside: '<div class="champs"></div>',
      name: traitName(heroTrait), label: t("theirGift"),
    },
    {
      cap: t("capSoul"), color: TRAITS[main].color, numeral: ARCANA[main].numeral,
      art: `<div class="emblem"><svg viewBox="0 0 48 48" aria-hidden="true">${ARCANA[main].icon}</svg></div>`,
      name: arc.card, label: arc.title,
    },
  ];
}

function startReading() {
  const role = state.role;
  const heroes = state.heroes.map((s) => HEROES.find((h) => h.slug === s));
  const lean = tally({}, heroes);
  const scores = tally(role.weights, heroes);
  const [main, second] = ranked(scores, lean);
  state.reading = { role, heroes, scores, main, second, heroTrait: ranked(lean)[0] };
  const cards = readingCards(state.reading);

  $("#reading-prompt").textContent = t("drawn");
  $("#result").hidden = true;
  $("#spread").innerHTML = cards.map(tarotCard).join("");
  $("#spread .champs").append(...heroes.map((h, i) => champion(h, ["c", "l", "r"][i])));
  prepEmblems($("#spread"));

  go("reading");

  const els = document.querySelectorAll("#spread .tarot");
  els.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add("flipped");
      setTimeout(() => embers.burst(el, cards[i].color), 550);
    }, 1700 + i * 1300);
  });
  setTimeout(() => showResult(true), 1700 + els.length * 1300 + 700);
}

function relabelReading() {
  const cards = readingCards(state.reading);
  document.querySelectorAll("#spread .tarot").forEach((el, i) => {
    el.querySelector(".t-name").textContent = cards[i].name;
    el.querySelector(".t-label").textContent = cards[i].label;
    el.querySelector(".tarot-cap").textContent = cards[i].cap;
  });
  const done = !$("#result").hidden;
  $("#reading-prompt").textContent = t(done ? "revealed" : "drawn");
  if (done) showResult(false);
}

// pathLength lets the CSS draw every emblem stroke in, whatever its real length.
function prepEmblems(root) {
  root.querySelectorAll(".emblem svg *").forEach((el) => el.setAttribute("pathLength", 1));
}

function tarotCard(c, i) {
  const motes = Array.from({ length: 8 }, () =>
    `<i class="mote" style="left:${8 + Math.random() * 84}%; animation-duration:${3 + Math.random() * 3}s; animation-delay:${-Math.random() * 6}s"></i>`).join("");
  const corners = ["tl", "tr", "bl", "br"].map((p) => CORNER.replace("<svg", `<svg class="corner ${p}"`)).join("");
  return `
    <div class="tarot${c.extra ? " " + c.extra : ""}" style="--i:${i}; --c:${c.color}">
      <div class="tarot-float"><div class="tarot-tilt"><div class="tarot-inner">
        <div class="face back">${CARD_BACK}<span class="sweep"></span></div>
        <div class="face front">
          <div class="frame">${corners}</div>
          <div class="t-banner">${c.numeral}</div>
          <div class="t-art">
            <div class="t-window">
              <div class="rays"></div>
              <svg class="runes" viewBox="0 0 100 100" aria-hidden="true">
                <defs><path id="rune-path-${i}" d="M50,50 m-41,0 a41,41 0 1,1 82,0 a41,41 0 1,1 -82,0" /></defs>
                <circle cx="50" cy="50" r="47" /><circle cx="50" cy="50" r="35" />
                <text><textPath href="#rune-path-${i}" textLength="256">${RUNES}</textPath></text>
              </svg>
              ${motes}
              ${c.art}
            </div>
            ${c.outside || ""}
          </div>
          <div class="t-plate"><div class="t-name">${c.name}</div><div class="t-label">${c.label}</div></div>
          <span class="foil"></span><span class="sweep"></span>
        </div>
      </div></div></div>
      <span class="flash"></span><span class="shock"></span>
      <div class="tarot-cap">${c.cap || ""}</div>
    </div>`;
}

// Full-body hero render; falls back to the landscape portrait if it can't load.
function champion(hero, pos) {
  const wrap = document.createElement("div");
  wrap.className = `champ ${pos}`;
  const img = new Image();
  img.alt = heroName(hero);
  img.src = RENDER_CDN + hero.slug + ".png";
  img.onerror = () => { wrap.classList.add("flat"); img.replaceWith(portrait(hero)); };
  wrap.append(img);
  return wrap;
}

function radarSvg(scores, total, main) {
  const keys = Object.keys(TRAITS);
  const ring = (r) => keys.map((_, i) => polar(i, r).join(",")).join(" ");
  const grid = [0.25, 0.5, 0.75, 1].map((f, j) =>
    `<polygon class="grid${f === 1 ? " outer" : ""}" pathLength="1" style="animation-delay:${j * 0.12}s" points="${ring(RADAR_R * f)}" />`).join("");
  const axes = keys.map((_, i) => {
    const [x, y] = polar(i, RADAR_R);
    return `<line class="axis" x1="0" y1="0" x2="${x}" y2="${y}" />`;
  }).join("");
  const dots = keys.map((k) => {
    const r = k === main ? 6.5 : 4.5;
    return `<circle class="vertex-ring" r="${r}" stroke="${TRAITS[k].color}" /><circle class="vertex" r="${r}" fill="${TRAITS[k].color}" />`;
  }).join("");
  const labels = keys.map((k, i) => {
    const [x, y] = polar(i, RADAR_R + 28);
    const anchor = Math.abs(x) < 1 ? "middle" : x > 0 ? "start" : "end";
    const dy = Math.abs(x) < 1 ? (y < 0 ? -10 : 6) : -2;
    return `<g class="lbl${k === main ? " main" : ""}" style="animation-delay:${0.9 + i * 0.12}s">
      <text class="lbl-name" x="${x}" y="${y + dy}" text-anchor="${anchor}">${traitName(k)}</text>
      <text class="lbl-pct" x="${x}" y="${y + dy + 17}" text-anchor="${anchor}" fill="${TRAITS[k].color}">${Math.round((scores[k] / total) * 100)}%</text>
    </g>`;
  }).join("");
  return `
    <svg class="radar" viewBox="-240 -175 480 360" role="img" aria-label="${t("radar")}">
      <defs><radialGradient id="radar-fill">
        <stop offset="0" style="stop-color: var(--c); stop-opacity: .15" />
        <stop offset="1" style="stop-color: var(--c); stop-opacity: .55" />
      </radialGradient></defs>
      <circle class="halo" r="${RADAR_R + 14}" />
      ${grid}${axes}
      <polygon class="shape" points="${ring(0)}" />
      ${dots}${labels}
    </svg>`;
}

// Grow the trait polygon out from the centre with a slight overshoot.
function animateRadar(svg, values) {
  const shape = svg.querySelector(".shape");
  const verts = svg.querySelectorAll(".vertex, .vertex-ring");
  const ease = (t) => 1 + 2.70158 * (t - 1) ** 3 + 1.70158 * (t - 1) ** 2;
  const start = performance.now();
  (function frame(now) {
    const t = Math.min(1, (now - start) / 1600);
    const pts = values.map((v, i) => polar(i, v * RADAR_R * ease(t)));
    shape.setAttribute("points", pts.map((p) => p.join(",")).join(" "));
    verts.forEach((el, j) => { const [x, y] = pts[j >> 1]; el.setAttribute("cx", x); el.setAttribute("cy", y); });
    if (t < 1) requestAnimationFrame(frame);
  })(start);
}

function showResult(scroll) {
  const { role, heroes, scores, main, second } = state.reading;
  const arc = arcT(main), rt = roleT(role);
  const total = Object.values(scores).reduce((a, b) => a + b, 0);
  const heroNames = listJoin(heroes.map(heroName));

  $("#reading-prompt").textContent = t("revealed");
  const res = $("#result");
  res.style.setProperty("--c", TRAITS[main].color);
  res.innerHTML = `
    <p class="r-kicker">${ARCANA[main].numeral} · ${arc.card}</p>
    <h3 class="r-title">${arc.title}</h3>
    <p class="r-quote">“${arc.quote}”</p>
    <div class="r-body">
      <p>${arc.desc}</p>
      <p>${rt.line}</p>
      <p class="undertone">${loc(UNDERTONES, ZH.undertones)[second]} ${t("bond", { heroes: heroNames })}</p>
    </div>
    ${radarSvg(scores, total, main)}
    <div class="cols">
      <div class="box"><h4>${t("strengths")}</h4><ul>${arc.strengths.map((s) => `<li>${s}</li>`).join("")}</ul></div>
      <div class="box"><h4>${t("shadow")}</h4><p>${arc.shadow}</p></div>
    </div>
    <p class="r-life"><b>${t("outside")}</b> ${arc.life}</p>
    <div class="r-actions">
      <button class="btn btn-ghost" id="copy">${t("copy")}</button>
      <button class="btn btn-primary" id="again">${t("again")}</button>
    </div>`;
  res.hidden = false;

  const max = Math.max(...Object.values(scores));
  // sqrt + floor keeps a full polygon shape even when one trait dominates.
  const values = Object.keys(TRAITS).map((k) => 0.18 + 0.82 * Math.sqrt(scores[k] / max));
  setTimeout(() => animateRadar(res.querySelector(".radar"), values), 700);
  if (scroll) setTimeout(() => res.scrollIntoView({ behavior: "smooth", block: "start" }), 300);

  $("#copy").addEventListener("click", (e) => {
    copyText(t("share", { card: arc.card, title: arc.title, role: rt.name, heroes: heroNames, quote: arc.quote }), e.target);
  });
  $("#again").addEventListener("click", reset);
}

function reset() {
  state.role = null;
  state.heroes = [];
  state.reading = null;
  document.querySelectorAll(".role").forEach((el) => { el.classList.remove("selected"); el.setAttribute("aria-pressed", false); });
  document.querySelectorAll(".hero").forEach((b) => b.classList.remove("selected"));
  $("#hero-grid").classList.remove("full");
  $("#to-heroes").disabled = true;
  $("#to-reading").disabled = true;
  renderPicked();
  go("role");
}

/* ---------- Daily fortune ---------- */
const todayKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
function hash(str) {
  let h = 2166136261;
  for (const ch of str) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
// mulberry32: small seeded RNG, so a given day + card always gives the same fortune.
function rng(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let x = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

function fortune(date, pick) {
  const r = rng(hash(`${date}#${pick}`));
  const idx = (n) => Math.floor(r() * n);
  const trait = Object.keys(ARCANA)[idx(6)];
  const reversed = r() < 0.3;
  const heroes = HEROES.filter((h) => h.traits.includes(trait));
  const roles = ROLES.filter((ro) => ro.weights[trait]);
  return {
    trait, reversed,
    luck: reversed ? 1 + idx(3) : 3 + idx(3), // 1–5 stars
    hero: heroes[idx(heroes.length)],
    role: roles[idx(roles.length)],
    item: idx(DAILY.items.length),
    doI: idx(DAILY.dos.length),
    dontI: idx(DAILY.donts.length),
  };
}

function openDaily() {
  const saved = load(DAILY_KEY);
  const today = todayKey();
  state.daily = saved && saved.date === today ? fortune(today, saved.pick) : null;
  state.dailyDate = today;
  renderDaily(false);
  go("daily");
}

function renderDaily(animate) {
  $("#daily-result").hidden = true;
  $("#daily-stage").innerHTML = "";
  if (state.daily) { $("#fan").hidden = true; showDailyCard(animate); }
  else renderFan();
  renderDailyHeader();
}

function renderDailyHeader() {
  $("#daily-title").textContent = t(state.daily ? "dailyDone" : "dailyPick");
  $("#daily-hint").textContent = state.daily
    ? new Intl.DateTimeFormat(state.lang === "zh" ? "zh-CN" : "en", { dateStyle: "full" }).format(new Date())
    : t("dailyHint");
}

function renderFan() {
  const fan = $("#fan");
  fan.hidden = false;
  fan.classList.remove("picking");
  fan.innerHTML = Array.from({ length: FAN_SIZE }, (_, i) => `
    <button class="fan-card" style="--i:${i}; --r:${(i - (FAN_SIZE - 1) / 2) * 9}deg" data-pick="${i}" aria-label="${i + 1}">
      <div class="face back">${CARD_BACK}<span class="sweep"></span></div>
    </button>`).join("");
}

function initDaily() {
  $("#open-daily").addEventListener("click", openDaily);
  $("#fan").addEventListener("click", (e) => {
    const card = e.target.closest(".fan-card");
    if (!card || $("#fan").classList.contains("picking")) return;
    const today = todayKey();
    const pick = +card.dataset.pick;
    save(DAILY_KEY, { date: today, pick });
    state.daily = fortune(today, pick);
    state.dailyDate = today;
    $("#fan").classList.add("picking");
    card.classList.add("chosen");
    setTimeout(() => embers.burst(card, "#d9b25f"), 300);
    setTimeout(() => { $("#fan").hidden = true; showDailyCard(true); renderDailyHeader(); }, 1000);
  });
  // Midnight rollover: clear the old card and offer a fresh draw.
  setInterval(() => {
    if (state.dailyDate && state.dailyDate !== todayKey()) {
      state.daily = null;
      state.dailyDate = todayKey();
      if ($("#screen-daily").classList.contains("active")) renderDaily(false);
    }
    tickCountdown();
  }, 1000);
}

function dailyCard(f) {
  return {
    color: TRAITS[f.trait].color, numeral: ARCANA[f.trait].numeral,
    extra: "daily-card" + (f.reversed ? " reversed" : ""),
    art: `<div class="emblem ghost"><svg viewBox="0 0 48 48" aria-hidden="true">${ARCANA[f.trait].icon}</svg></div><div class="portal"></div>`,
    outside: '<div class="champs"></div>',
    name: arcT(f.trait).card,
    label: `${heroName(f.hero)} · ${t(f.reversed ? "reversed" : "upright")}`,
  };
}

function showDailyCard(animate) {
  const f = state.daily;
  const stage = $("#daily-stage");
  stage.innerHTML = tarotCard(dailyCard(f), 0);
  stage.querySelector(".champs").append(champion(f.hero, "c"));
  prepEmblems(stage);
  const card = stage.querySelector(".tarot");
  if (animate) {
    setTimeout(() => {
      card.classList.add("flipped");
      setTimeout(() => embers.burst(card, TRAITS[f.trait].color), 550);
    }, 800);
    setTimeout(() => renderDailyResult(true), 2400);
  } else {
    card.classList.add("flipped", "instant");
    renderDailyResult(false);
  }
}

function relabelDaily() {
  const c = dailyCard(state.daily);
  $("#daily-stage .t-name").textContent = c.name;
  $("#daily-stage .t-label").textContent = c.label;
  renderDailyResult(false);
}

function renderDailyResult(scroll) {
  const f = state.daily, d = dailyT(), arc = arcT(f.trait);
  const pose = t(f.reversed ? "reversed" : "upright");
  const stars = Array.from({ length: 5 }, (_, i) => `<span class="lstar${i < f.luck ? " on" : ""}" style="--i:${i}">★</span>`).join("");
  const res = $("#daily-result");
  res.style.setProperty("--c", TRAITS[f.trait].color);
  res.innerHTML = `
    <p class="r-kicker">${ARCANA[f.trait].numeral} · ${pose}</p>
    <h3 class="r-title">${arc.card}</h3>
    <div class="luck">
      <span class="luck-label">${t("luck")}</span>
      <span class="stars" aria-label="${f.luck}/5">${stars}</span>
      <b class="luck-word">${d.luck[f.luck - 1]}</b>
    </div>
    <p class="daily-msg">${d.messages[f.trait][f.reversed ? "rev" : "up"]}</p>
    <div class="lucky">
      <div class="lucky-tile" style="--i:0"><div class="lucky-img hero-img"></div><span>${t("luckyHero")}</span><b>${heroName(f.hero)}</b></div>
      <div class="lucky-tile" style="--i:1"><div class="lucky-img role-img">${roleSvg(f.role)}</div><span>${t("luckyRole")}</span><b>${roleT(f.role).name}</b></div>
      <div class="lucky-tile" style="--i:2"><div class="lucky-img item-img"><img src="${ITEM_CDN}${DAILY.itemSlugs[f.item]}.png" alt="" onerror="this.remove()" /></div><span>${t("luckyItem")}</span><b>${d.items[f.item]}</b></div>
    </div>
    <div class="cols almanac">
      <div class="box do"><h4>${t("do")}</h4><p>${d.dos[f.doI]}</p></div>
      <div class="box dont"><h4>${t("dont")}</h4><p>${d.donts[f.dontI]}</p></div>
    </div>
    <p class="r-life countdown" id="countdown"></p>
    <div class="r-actions">
      <button class="btn btn-ghost" id="daily-copy">${t("copy")}</button>
      <button class="btn btn-primary" data-go="role">${t("takeTest")}</button>
    </div>`;
  res.querySelector(".hero-img").append(portrait(f.hero));
  res.hidden = false;
  tickCountdown();
  if (scroll) setTimeout(() => res.scrollIntoView({ behavior: "smooth", block: "start" }), 300);

  $("#daily-copy").addEventListener("click", (e) => {
    const text = t("dailyShare", {
      card: arc.card, pose, hero: heroName(f.hero),
      stars: "★".repeat(f.luck) + "☆".repeat(5 - f.luck),
    });
    copyText(text, e.target);
  });
}

function tickCountdown() {
  const el = $("#countdown");
  if (!el) return;
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const s = Math.max(0, Math.floor((midnight - now) / 1000));
  const hms = [s / 3600, (s % 3600) / 60, s % 60].map((v) => String(Math.floor(v)).padStart(2, "0")).join(":");
  el.textContent = t("next", { t: hms });
}

/* ---------- Card tilt ---------- */
// 3D tilt + holographic foil that follow the cursor over a tarot card.
for (const stage of [$("#spread"), $("#daily-stage")]) {
  stage.addEventListener("pointermove", (e) => {
    const card = e.target.closest(".tarot");
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    card.querySelector(".tarot-tilt").style.transform =
      `perspective(1000px) rotateY(${(x - 0.5) * 24}deg) rotateX(${(0.5 - y) * 24}deg) scale(1.05)`;
    card.style.setProperty("--mx", `${x * 100}%`);
    card.style.setProperty("--my", `${y * 100}%`);
  });
  stage.addEventListener("pointerout", (e) => {
    const card = e.target.closest(".tarot");
    if (card && !card.contains(e.relatedTarget)) card.querySelector(".tarot-tilt").style.transform = "";
  });
}

/* ---------- Init ---------- */
initRoles();
renderHeroes();
initDaily();
document.querySelectorAll(".lang button").forEach((b) => b.addEventListener("click", () => setLang(b.dataset.lang)));
setLang(load(LANG_KEY) || (navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en"));
