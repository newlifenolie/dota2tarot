// Valve serves the same files from several CDNs; if one is blocked on a visitor's network, try the next.
// Our own /img relay (worker.js) comes last, for networks that block steamstatic.com entirely.
const RELAY = location.origin + "/img";
const STEAM_HOSTS = ["https://cdn.cloudflare.steamstatic.com", "https://cdn.akamai.steamstatic.com", "https://cdn.fastly.steamstatic.com", RELAY];
const HERO_PATH = "/apps/dota2/images/dota_react/heroes/";
const RENDER_PATH = "/apps/dota2/videos/dota_react/heroes/renders/";
const ITEM_PATH = "/apps/dota2/images/dota_react/items/";
const VERT_PATH = "/apps/dota2/images/heroes/"; // tall portraits ({slug}_vert.jpg)
const NO_VERT = new Set(["dawnbreaker", "primal_beast", "muerta", "marci"]); // newer heroes Valve never made one for
const HILLS = `
  <svg class="hills" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
    <path class="far" d="M-2 20 Q15 6 32 15 T64 12 T102 16 V42 H-2Z" />
    <path class="near" d="M-2 28 Q22 18 48 26 T102 24 V42 H-2Z" />
  </svg>`;
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
const SOUND_KEY = "dotaTarot.sound";
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
  renderSoundBtn();
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

/* ---------- Sound effects (synthesised, no audio files) ---------- */
const sfx = (() => {
  const AC = window.AudioContext || window.webkitAudioContext;
  let ctx = null;
  let on = load(SOUND_KEY) !== false;
  const audio = () => {
    if (!on || !AC) return null;
    ctx ||= new AC();
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  };
  // Browsers only allow audio after a user gesture, so unlock it on the first tap/click.
  document.addEventListener("pointerdown", audio);

  // A soft card whoosh: band-passed noise sweeping upward.
  function whoosh(dur = 0.45) {
    const a = audio();
    if (!a) return;
    const buf = a.createBuffer(1, a.sampleRate * dur, a.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const src = a.createBufferSource();
    src.buffer = buf;
    const bp = a.createBiquadFilter();
    bp.type = "bandpass";
    bp.Q.value = 1.2;
    bp.frequency.setValueAtTime(300, a.currentTime);
    bp.frequency.exponentialRampToValueAtTime(2800, a.currentTime + dur);
    const g = a.createGain();
    g.gain.setValueAtTime(0.0001, a.currentTime);
    g.gain.exponentialRampToValueAtTime(0.25, a.currentTime + dur * 0.3);
    g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + dur);
    src.connect(bp).connect(g).connect(a.destination);
    src.start();
  }
  // Bell-like notes: a sine plus an inharmonic overtone, with a long decay.
  function bell(freqs, gap = 0.09, vol = 0.18) {
    const a = audio();
    if (!a) return;
    freqs.forEach((f, i) => {
      const t = a.currentTime + i * gap;
      [1, 2.76].forEach((m, j) => {
        const o = a.createOscillator();
        o.frequency.value = f * m;
        const g = a.createGain();
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(vol / (j * 3 + 1), t + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 1.4);
        o.connect(g).connect(a.destination);
        o.start(t);
        o.stop(t + 1.5);
      });
    });
  }
  return {
    get on() { return on; },
    toggle() { on = !on; save(SOUND_KEY, on); if (on) bell([880], 0, 0.1); },
    pick: () => bell([1318.5], 0, 0.06),
    flip: () => { whoosh(); setTimeout(() => bell([659.3, 987.8], 0.05, 0.1), 380); },
    reveal: () => bell([523.3, 659.3, 784, 1046.5], 0.11, 0.14),
  };
})();

function renderSoundBtn() {
  const b = $("#sound-btn");
  b.classList.toggle("off", !sfx.on);
  b.setAttribute("aria-pressed", sfx.on);
  b.title = b.ariaLabel = t(sfx.on ? "soundOn" : "soundOff");
}

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
// An <img> that walks through STEAM_HOSTS on error and calls onFail once every host has failed.
function steamImg(path, alt, onFail, lazy = false) {
  const img = new Image();
  let host = 0;
  img.alt = alt;
  if (lazy) img.loading = "lazy";
  img.onerror = () => (++host < STEAM_HOSTS.length ? (img.src = STEAM_HOSTS[host] + path) : onFail(img));
  img.src = STEAM_HOSTS[0] + path;
  return img;
}
// Original AI hero art (public/art/, listed in art/manifest.js). Heroes without it keep Valve's art.
const hasArt = (hero) => HERO_ART.has(hero.slug);
const artUrl = (hero, thumb = false) => `art/${thumb ? "thumb/" : ""}${hero.slug}.webp`;
// Picks 2 and 3 flank the first pick in the triptych.
const triptych = (heroes) => (heroes.length === 3 ? [heroes[1], heroes[0], heroes[2]] : heroes);
// One arched panel per hero. With AI art for every hero the panels hold it; otherwise they stay
// empty here and fillPanels() adds the gold line-art renders.
const heroPanels = (heroes) => {
  const art = heroes.every(hasArt);
  return `<div class="art-panels n${heroes.length}">${triptych(heroes).map((h) =>
    `<div class="panel" data-slug="${h.slug}">${art ? `<img src="${artUrl(h)}" alt="${heroName(h)}" />` : ""}</div>`).join("")}</div>`;
};
function fillPanels(root) {
  root.querySelectorAll(".art-panels .panel:empty").forEach((p) => {
    const h = HEROES.find((x) => x.slug === p.dataset.slug);
    // Loaded through our relay so the pixels can be read to find the figure.
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.className = "figure";
    img.alt = heroName(h);
    img.onload = () => fitFigure(img, figureBox(img));
    img.onerror = () => img.replaceWith(portrait(h));
    img.src = RELAY + RENDER_PATH + h.slug + ".png";
    p.append(img);
  });
}

// Where the hero actually is in a render (renders aren't centred: weapons, wings and pets
// push the figure aside). x is the alpha centre of mass, so a long sword doesn't skew it;
// top/bottom are the figure's vertical extent. All values are fractions of the image.
function figureBox(img) {
  const n = 120;
  const c = document.createElement("canvas");
  c.width = c.height = n;
  const g = c.getContext("2d", { willReadFrequently: true });
  g.drawImage(img, 0, 0, n, n);
  let data;
  try { data = g.getImageData(0, 0, n, n).data; } catch { return { cx: 0.5, top: 0, bottom: 1 }; }
  let top = n, bottom = 0, sum = 0, sumX = 0;
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const a = data[(y * n + x) * 4 + 3];
      if (a < 40) continue;
      sum += a; sumX += a * x;
      if (y < top) top = y;
      bottom = y;
    }
  }
  if (!sum) return { cx: 0.5, top: 0, bottom: 1 };
  return { cx: (sumX / sum + 0.5) / n, top: top / n, bottom: (bottom + 1) / n };
}
// Scales a render so the figure fills 92% of the panel height, centred, feet at the bottom.
function fitFigure(img, b) {
  img.style.height = `${(92 / (b.bottom - b.top)).toFixed(1)}%`;
  img.style.transform = `translate(${(-b.cx * 100).toFixed(1)}%, ${((1 - b.bottom) * 100).toFixed(1)}%)`;
  img.classList.add("fitted");
}

function portrait(hero) {
  return steamImg(HERO_PATH + hero.slug + ".png", heroName(hero), (img) => img.replaceWith(fallback(hero)), true);
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
    sfx.pick();
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
    b.innerHTML = '<span class="h-window"></span><span class="h-frame"></span><span class="h-gem"></span><span class="name"></span><span class="h-sheen"></span>';
    const vert = () => NO_VERT.has(h.slug)
      ? portrait(h)
      : steamImg(VERT_PATH + h.slug + "_vert.jpg", h.name, (img) => img.replaceWith(portrait(h)), true);
    if (hasArt(h)) {
      const art = new Image();
      art.loading = "lazy";
      art.alt = h.name;
      art.onerror = () => art.replaceWith(vert());
      art.src = artUrl(h, true);
      b.querySelector(".h-window").append(art);
    } else {
      b.querySelector(".h-window").append(vert());
    }
    grid.append(b);
  });

  // Tarot-card tilt that follows the cursor.
  grid.addEventListener("pointermove", (e) => {
    const card = e.target.closest(".hero");
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `translateY(-8px) rotateY(${x * 18}deg) rotateX(${-y * 18}deg)`;
  });
  grid.addEventListener("pointerout", (e) => {
    const card = e.target.closest(".hero");
    if (card && !card.contains(e.relatedTarget)) card.style.transform = "";
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
  else if (state.heroes.length < MAX_HEROES) { state.heroes.push(slug); sfx.pick(); }
  else return;
  document.querySelectorAll(".hero").forEach((b) => {
    const order = state.heroes.indexOf(b.dataset.slug) + 1;
    b.classList.toggle("selected", order > 0);
    if (order) b.dataset.order = order;
  });
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
function readingCards({ role, heroes, heroTrait, main }) {
  const rt = roleT(role), arc = arcT(main);
  return [
    {
      cap: t("capLane"), color: "#d9b25f", numeral: role.numeral,
      art: `<div class="emblem">${roleSvg(role)}</div>`,
      name: rt.name, label: rt.pos,
    },
    {
      cap: t("capChamps"), color: TRAITS[heroTrait].color, numeral: ARCANA[heroTrait].numeral,
      art: heroPanels(heroes),
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
  fillPanels($("#spread"));
  prepEmblems($("#spread"));

  go("reading");

  const els = document.querySelectorAll("#spread .tarot");
  els.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add("flipped");
      sfx.flip();
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
              <div class="sun"></div>
              ${HILLS}
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
  wrap.append(steamImg(RENDER_PATH + hero.slug + ".png", heroName(hero), (img) => {
    wrap.classList.add("flat");
    img.replaceWith(portrait(hero));
  }));
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
      <button class="btn btn-primary" id="poster-btn">${t("savePoster")}</button>
      <button class="btn btn-ghost" id="copy">${t("copy")}</button>
      <button class="btn btn-ghost" id="again">${t("again")}</button>
    </div>`;
  res.hidden = false;

  const max = Math.max(...Object.values(scores));
  // sqrt + floor keeps a full polygon shape even when one trait dominates.
  const values = Object.keys(TRAITS).map((k) => 0.18 + 0.82 * Math.sqrt(scores[k] / max));
  setTimeout(() => animateRadar(res.querySelector(".radar"), values), 700);
  if (scroll) {
    sfx.reveal();
    setTimeout(() => res.scrollIntoView({ behavior: "smooth", block: "start" }), 300);
  }

  $("#copy").addEventListener("click", (e) => {
    copyText(t("share", { card: arc.card, title: arc.title, role: rt.name, heroes: heroNames, quote: arc.quote }), e.target);
  });
  $("#again").addEventListener("click", reset);
  $("#poster-btn").addEventListener("click", (e) => openPoster("reading", e.currentTarget));
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
    sfx.pick();
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
  const art = hasArt(f.hero);
  return {
    color: TRAITS[f.trait].color, numeral: ARCANA[f.trait].numeral,
    extra: "daily-card" + (f.reversed ? " reversed" : ""),
    art: art
      ? `<img class="art-full" src="${artUrl(f.hero)}" alt="${heroName(f.hero)}" />`
      : `<div class="emblem ghost"><svg viewBox="0 0 48 48" aria-hidden="true">${ARCANA[f.trait].icon}</svg></div><div class="portal"></div>`,
    outside: art ? "" : '<div class="champs"></div>',
    name: arcT(f.trait).card,
    label: `${heroName(f.hero)} · ${t(f.reversed ? "reversed" : "upright")}`,
  };
}

function showDailyCard(animate) {
  const f = state.daily;
  const stage = $("#daily-stage");
  stage.innerHTML = tarotCard(dailyCard(f), 0);
  stage.querySelector(".champs")?.append(champion(f.hero, "c"));
  prepEmblems(stage);
  const card = stage.querySelector(".tarot");
  if (animate) {
    setTimeout(() => {
      card.classList.add("flipped");
      sfx.flip();
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
      <div class="lucky-tile" style="--i:2"><div class="lucky-img item-img"></div><span>${t("luckyItem")}</span><b>${d.items[f.item]}</b></div>
    </div>
    <div class="cols almanac">
      <div class="box do"><h4>${t("do")}</h4><p>${d.dos[f.doI]}</p></div>
      <div class="box dont"><h4>${t("dont")}</h4><p>${d.donts[f.dontI]}</p></div>
    </div>
    <p class="r-life countdown" id="countdown"></p>
    <div class="r-actions">
      <button class="btn btn-primary" id="daily-poster">${t("savePoster")}</button>
      <button class="btn btn-ghost" id="daily-copy">${t("copy")}</button>
      <button class="btn btn-ghost" data-go="role">${t("takeTest")}</button>
    </div>`;
  res.querySelector(".hero-img").append(portrait(f.hero));
  res.querySelector(".item-img").append(steamImg(ITEM_PATH + DAILY.itemSlugs[f.item] + ".png", "", (img) => img.remove()));
  res.hidden = false;
  tickCountdown();
  if (scroll) {
    sfx.reveal();
    setTimeout(() => res.scrollIntoView({ behavior: "smooth", block: "start" }), 300);
  }

  $("#daily-poster").addEventListener("click", (e) => openPoster("daily", e.currentTarget));
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

/* ---------- Share poster (1080×1920, drawn on a canvas) ---------- */
const GOLD = "#b8934a", GOLD_HI = "#e2c98f", NIGHT = "#140e0a";
const goldA = (a) => `rgba(226,201,143,${a})`;

function loadImg(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}
// Emblem line art as an image, so it can be drawn onto the canvas.
const iconImg = (icon) =>
  loadImg("data:image/svg+xml;charset=utf-8," + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 52 52" width="400" height="400" fill="none" stroke="${GOLD_HI}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${icon}</svg>`));

// Wraps text to maxW; CJK text breaks between characters, other text between words.
function wrap(g, text, maxW) {
  const cjk = /[　-鿿＀-￯]/.test(text);
  const parts = cjk ? [...text] : text.split(" ");
  const lines = [];
  let line = "";
  for (const p of parts) {
    const next = line ? line + (cjk ? "" : " ") + p : p;
    // Chinese punctuation never starts a line, so it may overhang slightly instead.
    const noBreak = cjk && /[，。！？、；：”’）》」…]/.test(p);
    if (g.measureText(next).width > maxW && line && !noBreak) { lines.push(line); line = p; } else line = next;
  }
  if (line) lines.push(line);
  return lines;
}
function textBlock(g, text, x, y, maxW, lh) {
  const lines = wrap(g, text, maxW);
  lines.forEach((l, i) => g.fillText(l, x, y + i * lh));
  return y + lines.length * lh;
}
function roundRect(g, x, y, w, h, r) {
  g.beginPath();
  g.roundRect(x, y, w, h, r);
}
// A rectangle with an elliptical arched top (matches the CSS border-radius arches).
function archPath(g, x, y, w, h, archH) {
  g.beginPath();
  g.moveTo(x, y + h);
  g.lineTo(x, y + archH);
  g.ellipse(x + w / 2, y + archH, w / 2, archH, 0, Math.PI, 0);
  g.lineTo(x + w, y + h);
  g.closePath();
}
// Draws img to cover the box, like CSS object-fit: cover.
function cover(g, img, x, y, w, h, posY = 0.4, zoom = 1) {
  const s = Math.max(w / img.width, h / img.height) * zoom;
  g.drawImage(img, x + (w - img.width * s) / 2, y + (h - img.height * s) * posY, img.width * s, img.height * s);
}

// The same black-and-gold card as the page, at width w.
async function drawPosterCard(g, card, x, y, w) {
  const u = w / 100, h = 165 * u;
  const rnd = rng(hash(card.name));

  // Card body, foil edge and stars
  g.save();
  g.shadowColor = "rgba(0,0,0,.7)"; g.shadowBlur = 60; g.shadowOffsetY = 24;
  roundRect(g, x, y, w, h, 6 * u);
  const body = g.createRadialGradient(x + w / 2, y + h * 0.38, 0, x + w / 2, y + h * 0.38, h * 0.7);
  body.addColorStop(0, "#2a1f16"); body.addColorStop(1, "#120d09");
  g.fillStyle = body; g.fill();
  g.restore();
  g.strokeStyle = GOLD; g.lineWidth = 2; g.stroke();
  g.strokeStyle = "rgba(184,147,74,.55)"; g.lineWidth = 1.5; roundRect(g, x + 1.6 * u, y + 1.6 * u, w - 3.2 * u, h - 3.2 * u, 5 * u); g.stroke();
  for (let i = 0; i < 14; i++) {
    g.fillStyle = goldA(0.4 + rnd() * 0.5);
    g.beginPath(); g.arc(x + (5 + rnd() * 90) * u, y + (5 + rnd() * 155) * u, 1 + rnd() * 1.5, 0, Math.PI * 2); g.fill();
  }

  // Frames and corner studs
  g.strokeStyle = GOLD; g.lineWidth = 2; roundRect(g, x + 4 * u, y + 4 * u, w - 8 * u, h - 8 * u, 2 * u); g.stroke();
  g.setLineDash([2, 5]); g.strokeStyle = "rgba(184,147,74,.6)"; g.lineWidth = 1.5;
  roundRect(g, x + 5.3 * u, y + 5.3 * u, w - 10.6 * u, h - 10.6 * u, 1.2 * u); g.stroke();
  g.setLineDash([]);
  for (const [cx, cy] of [[x + 4 * u, y + 4 * u], [x + w - 4 * u, y + 4 * u], [x + 4 * u, y + h - 4 * u], [x + w - 4 * u, y + h - 4 * u]]) {
    g.beginPath(); g.arc(cx, cy, 1.3 * u, 0, Math.PI * 2); g.fillStyle = GOLD_HI; g.fill();
  }

  // The arched scene with its sunburst halo
  const wx = x + 9 * u, wy = y + 14 * u, ww = w - 18 * u, wh = h - 48 * u, archH = wh * 0.24;
  const hx = wx + ww / 2, hy = wy + wh * 0.42, R = ww * 0.44;
  g.save();
  archPath(g, wx, wy, ww, wh, archH); g.clip();
  g.fillStyle = NIGHT; g.fillRect(wx, wy, ww, wh);
  const glow = g.createRadialGradient(hx, hy, 0, hx, hy, ww * 0.62);
  glow.addColorStop(0, "rgba(184,147,74,.16)"); glow.addColorStop(1, "rgba(184,147,74,0)");
  g.fillStyle = glow; g.fillRect(wx, wy, ww, wh);
  g.strokeStyle = goldA(0.22); g.lineWidth = 1;
  for (let a = 0; a < 360; a += 6) {
    const r = (a * Math.PI) / 180;
    g.beginPath(); g.moveTo(hx + Math.cos(r) * R * 1.05, hy + Math.sin(r) * R * 1.05); g.lineTo(hx + Math.cos(r) * ww, hy + Math.sin(r) * ww); g.stroke();
  }
  // Halo: dark ring, alternating gold wedges, a fine ring line and a dark centre disc
  g.beginPath(); g.arc(hx, hy, R + 1.2 * u, 0, Math.PI * 2); g.fillStyle = "rgba(13,10,19,.9)"; g.fill();
  g.strokeStyle = "rgba(184,147,74,.45)"; g.lineWidth = 1.5; g.stroke();
  g.beginPath(); g.arc(hx, hy, R, 0, Math.PI * 2); g.fillStyle = "rgba(184,147,74,.07)"; g.fill();
  g.fillStyle = "rgba(184,147,74,.4)";
  for (let a = 0; a < 360; a += 8) {
    const r0 = (a * Math.PI) / 180, r1 = ((a + 4) * Math.PI) / 180;
    g.beginPath(); g.moveTo(hx, hy); g.arc(hx, hy, R, r0, r1); g.closePath(); g.fill();
  }
  g.strokeStyle = goldA(0.8); g.lineWidth = 1.5;
  g.beginPath(); g.arc(hx, hy, R, 0, Math.PI * 2); g.stroke();
  g.beginPath(); g.arc(hx, hy, R * 0.92, 0, Math.PI * 2); g.stroke();
  g.beginPath(); g.arc(hx, hy, R * 0.76, 0, Math.PI * 2); g.fillStyle = NIGHT; g.fill();
  // Hills (same shapes as the HILLS svg: viewBox 100×40 over the bottom 38%)
  const px = (v) => wx + (v / 100) * ww, py = (v) => wy + wh * 0.62 + (v / 40) * wh * 0.38;
  const hill = (pts, fill) => {
    g.beginPath(); g.moveTo(px(pts[0][0]), py(pts[0][1]));
    for (let i = 1; i < pts.length; i += 2) g.quadraticCurveTo(px(pts[i][0]), py(pts[i][1]), px(pts[i + 1][0]), py(pts[i + 1][1]));
    g.lineTo(px(102), py(42)); g.lineTo(px(-2), py(42)); g.closePath();
    g.fillStyle = fill; g.fill(); g.strokeStyle = goldA(0.75); g.lineWidth = 1.5; g.stroke();
  };
  hill([[-2, 20], [15, 6], [32, 15], [49, 24], [64, 12], [79, 0], [102, 16]], "rgba(184,147,74,.08)");
  hill([[-2, 28], [22, 18], [48, 26], [74, 34], [102, 24]], NIGHT);

  // Arcana emblem: the centrepiece on its own, a faint ghost behind a hero
  const emblem = await iconImg(card.icon);
  if (emblem && !card.full && !card.panels) {
    const es = ww * (card.heroes.length ? 0.6 : 0.46);
    g.save();
    g.globalAlpha = card.heroes.length ? 0.35 : 1;
    g.shadowColor = goldA(0.7); g.shadowBlur = 24;
    g.translate(hx, hy);
    if (card.reversed) g.rotate(Math.PI);
    g.drawImage(emblem, -es / 2, -es / 2, es, es);
    g.restore();
  }

  // A single hero in gold line art (daily card without original art)
  if (card.heroes.length) {
    const img = await loadImg(RELAY + RENDER_PATH + card.heroes[0].slug + ".png");
    if (img) {
      const size = ww * 0.94;
      g.save();
      g.filter = "url(#tarot-ink)"; g.shadowColor = goldA(0.5); g.shadowBlur = 16;
      g.drawImage(img, hx - size / 2, wy + wh * 1.02 - size, size, size);
      g.restore();
    }
  }
  // Original art filling the scene (daily card), upside down when reversed
  if (card.full) {
    const img = await loadImg(card.full);
    if (img) {
      g.save();
      if (card.reversed) { g.translate(hx, wy + wh / 2); g.rotate(Math.PI); g.translate(-hx, -(wy + wh / 2)); }
      cover(g, img, wx, wy, ww, wh);
      g.restore();
    }
  }
  // Altarpiece panels (Champions card): art, or gold line-art renders
  if (card.panels) {
    const imgs = await Promise.all(card.panels.map((p) => loadImg(p.src)));
    const n = imgs.length, pad = 3 * u, gap = 2 * u;
    const weights = n === 3 ? [1, 1.35, 1] : Array(n).fill(1);
    const unit = (ww - pad * 2 - gap * (n - 1)) / weights.reduce((a, b) => a + b, 0);
    let cx = wx + pad;
    imgs.forEach((img, i) => {
      const pw = unit * weights[i], full = wh - pad * 2;
      const ph = n === 3 && i !== 1 ? full * 0.84 : full;
      const top = wy + pad + full - ph, ah = ph * 0.16;
      g.save();
      archPath(g, cx, top, pw, ph, ah);
      const pg = g.createRadialGradient(cx + pw / 2, top + ph * 0.38, 0, cx + pw / 2, top + ph * 0.38, pw);
      pg.addColorStop(0, "rgba(226,201,143,.18)"); pg.addColorStop(1, NIGHT);
      g.fillStyle = pg; g.fill();
      g.save(); g.clip();
      if (img) {
        if (card.panels[i].inked) {
          // Same placement as fitFigure(): figure 92% of the panel height, centred, feet at the bottom
          const b = figureBox(img);
          const s = (ph * 0.92) / ((b.bottom - b.top) * img.height), dw = img.width * s, dh = img.height * s;
          g.filter = "url(#tarot-ink)";
          g.drawImage(img, cx + pw / 2 - b.cx * dw, top + ph * 0.98 - b.bottom * dh, dw, dh);
          g.filter = "none";
        } else cover(g, img, cx, top, pw, ph);
      }
      g.restore();
      g.shadowColor = goldA(0.4); g.shadowBlur = 12;
      g.strokeStyle = GOLD_HI; g.lineWidth = 2; g.stroke();
      g.restore();
      cx += pw + gap;
    });
  }
  g.restore();
  g.strokeStyle = goldA(0.8); g.lineWidth = 2; archPath(g, wx, wy, ww, wh, archH); g.stroke();

  // Medallion numeral on the crown of the arch
  const mx = x + w / 2, my = y + 5 * u + 7.5 * u, mr = 7.5 * u;
  g.beginPath(); g.arc(mx, my, mr + 1 * u, 0, Math.PI * 2); g.fillStyle = "#120d09"; g.fill();
  g.strokeStyle = "rgba(184,147,74,.6)"; g.lineWidth = 1.5; g.beginPath(); g.arc(mx, my, mr + 1 * u, 0, Math.PI * 2); g.stroke();
  const med = g.createRadialGradient(mx, my, 0, mx, my, mr);
  med.addColorStop(0, "#33261a"); med.addColorStop(1, "#120d09");
  g.beginPath(); g.arc(mx, my, mr, 0, Math.PI * 2); g.fillStyle = med; g.fill();
  g.strokeStyle = GOLD_HI; g.lineWidth = 2; g.stroke();
  g.fillStyle = GOLD_HI; g.textAlign = "center"; g.textBaseline = "middle";
  g.font = `700 ${4 * u}px Cinzel, "Noto Serif SC", serif`;
  g.shadowColor = goldA(0.6); g.shadowBlur = 10;
  g.fillText(card.numeral, mx, my + 0.3 * u);
  g.shadowBlur = 0;

  // Crimson ribbon banner with gold edges
  const rx = x + 5 * u, rw = w - 10 * u, rh = 21 * u, ry = y + h - 8.5 * u - rh, notch = rw * 0.08;
  g.save();
  g.shadowColor = "rgba(0,0,0,.6)"; g.shadowBlur = 16; g.shadowOffsetY = 6;
  g.beginPath();
  g.moveTo(rx, ry); g.lineTo(rx + rw, ry); g.lineTo(rx + rw - notch, ry + rh / 2); g.lineTo(rx + rw, ry + rh);
  g.lineTo(rx, ry + rh); g.lineTo(rx + notch, ry + rh / 2); g.closePath();
  const rib = g.createLinearGradient(0, ry, 0, ry + rh);
  rib.addColorStop(0, "#6b2a1f"); rib.addColorStop(1, "#3d1710");
  g.fillStyle = rib; g.fill();
  g.restore();
  g.strokeStyle = goldA(0.8); g.lineWidth = 1.5;
  for (const ly of [ry + 0.9 * u, ry + rh - 0.9 * u]) {
    const inset = notch * (0.9 * u) / (rh / 2);
    g.beginPath(); g.moveTo(rx + inset, ly); g.lineTo(rx + rw - inset, ly); g.stroke();
  }
  g.fillStyle = GOLD_HI; g.font = `900 ${5.9 * u}px Cinzel, "Noto Serif SC", serif`;
  g.shadowColor = goldA(0.4); g.shadowBlur = 10;
  g.fillText(card.name, x + w / 2, ry + 8.6 * u);
  g.shadowBlur = 0;
  g.fillStyle = card.reversed ? "#ff9b84" : goldA(0.75);
  g.font = `600 ${3.6 * u}px Inter, "Noto Serif SC", sans-serif`;
  g.fillText(card.label.toUpperCase(), x + w / 2, ry + 15.4 * u);
  g.textBaseline = "alphabetic";

  // Aged print over the finished card: grain, a few age spots and a dark worn edge
  g.save();
  roundRect(g, x, y, w, h, 6 * u); g.clip();
  const grain = document.createElement("canvas");
  grain.width = grain.height = 160;
  const gg = grain.getContext("2d"), pix = gg.createImageData(160, 160);
  for (let i = 0; i < pix.data.length; i += 4) { const v = rnd() * 255; pix.data[i] = pix.data[i + 1] = pix.data[i + 2] = v; pix.data[i + 3] = 255; }
  gg.putImageData(pix, 0, 0);
  g.globalCompositeOperation = "overlay"; g.globalAlpha = 0.09;
  g.fillStyle = g.createPattern(grain, "repeat"); g.fillRect(x, y, w, h);
  g.globalCompositeOperation = "source-over"; g.globalAlpha = 1;
  for (const [sx, sy, sr] of [[0.78, 0.09, 0.07], [0.18, 0.42, 0.05], [0.62, 0.53, 0.04]]) {
    const spot = g.createRadialGradient(x + w * sx, y + h * sy, 0, x + w * sx, y + h * sy, w * sr);
    spot.addColorStop(0, "rgba(120,80,30,.14)"); spot.addColorStop(1, "rgba(120,80,30,0)");
    g.fillStyle = spot; g.fillRect(x, y, w, h);
  }
  const edge = g.createRadialGradient(x + w / 2, y + h / 2, h * 0.35, x + w / 2, y + h / 2, h * 0.62);
  edge.addColorStop(0, "rgba(0,0,0,0)"); edge.addColorStop(1, "rgba(0,0,0,.3)");
  g.fillStyle = edge; g.fillRect(x, y, w, h);
  g.restore();
}

async function makePoster(kind) {
  await Promise.all(["900 60px Cinzel", "700 40px Cinzel", "900 60px 'Noto Serif SC'", "600 32px Inter"]
    .map((f) => document.fonts.load(f, "DOTA 刀塔塔罗").catch(() => {})));
  const W = 1080, H = 1920;
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const g = c.getContext("2d");

  // Background: night sky with Radiant/Dire glows and stars
  g.fillStyle = "#08070c"; g.fillRect(0, 0, W, H);
  for (const [cx, cy, col] of [[0, 0, "rgba(63,191,143,.22)"], [W, H, "rgba(208,64,47,.26)"]]) {
    const glow = g.createRadialGradient(cx, cy, 0, cx, cy, 1100);
    glow.addColorStop(0, col); glow.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = glow; g.fillRect(0, 0, W, H);
  }
  const rnd = rng(hash(kind + todayKey()));
  for (let i = 0; i < 90; i++) {
    g.fillStyle = `rgba(246,220,154,${0.15 + rnd() * 0.5})`;
    g.beginPath(); g.arc(rnd() * W, rnd() * H, 0.6 + rnd() * 1.8, 0, Math.PI * 2); g.fill();
  }

  // Header
  g.textAlign = "center";
  g.fillStyle = "#d9b25f";
  g.font = `600 30px Inter, "Noto Serif SC", sans-serif`;
  g.fillText(t(kind === "daily" ? "posterDaily" : "posterReading").toUpperCase(), W / 2, 96);
  const title = g.createLinearGradient(0, 110, 0, 180);
  title.addColorStop(0, "#fff3d0"); title.addColorStop(0.5, "#d9b25f"); title.addColorStop(1, "#8d6a2d");
  g.fillStyle = title;
  g.font = `900 72px Cinzel, "Noto Serif SC", serif`;
  g.fillText(t("titleA") + (state.lang === "zh" ? "" : " ") + t("titleB"), W / 2, 176);

  // The card
  let card, color, lines;
  if (kind === "daily") {
    const f = state.daily, d = dailyT(), arc = arcT(f.trait);
    color = TRAITS[f.trait].color;
    const art = hasArt(f.hero);
    card = { color, numeral: ARCANA[f.trait].numeral, icon: ARCANA[f.trait].icon, reversed: f.reversed,
      heroes: art ? [] : [f.hero], full: art ? artUrl(f.hero) : null,
      name: arc.card, label: `${heroName(f.hero)} · ${t(f.reversed ? "reversed" : "upright")}` };
    lines = { kicker: new Intl.DateTimeFormat(state.lang === "zh" ? "zh-CN" : "en", { dateStyle: "long" }).format(new Date()),
      title: `${arc.card} · ${t(f.reversed ? "reversed" : "upright")}`,
      stars: f.luck, luckWord: d.luck[f.luck - 1], body: d.messages[f.trait][f.reversed ? "rev" : "up"],
      facts: [`${t("luckyHero")}: ${heroName(f.hero)}`, `${t("luckyRole")}: ${roleT(f.role).name}`, `${t("luckyItem")}: ${d.items[f.item]}`],
      doDont: [`${t("do")} · ${d.dos[f.doI]}`, `${t("dont")} · ${d.donts[f.dontI]}`] };
  } else {
    const { role, heroes, scores, main } = state.reading, arc = arcT(main);
    color = TRAITS[main].color;
    const total = Object.values(scores).reduce((a, b) => a + b, 0);
    const art = heroes.every(hasArt);
    card = { color, numeral: ARCANA[main].numeral, icon: ARCANA[main].icon, reversed: false, heroes: [],
      panels: triptych(heroes).map((h) => (art ? { src: artUrl(h) } : { src: RELAY + RENDER_PATH + h.slug + ".png", inked: true })),
      name: arc.card, label: arc.title };
    lines = { kicker: `${roleT(role).name} · ${listJoin(heroes.map(heroName))}`, title: arc.title, body: `“${arc.quote}”`,
      traits: ranked(scores).slice(0, 3).map((k) => [traitName(k), Math.round((scores[k] / total) * 100), TRAITS[k].color]) };
  }
  await drawPosterCard(g, card, 250, 230, 580);

  // Reading text under the card
  let y = 230 + 580 * 1.65 + 80;
  g.textAlign = "center";
  g.fillStyle = "#9a917f"; g.font = `500 28px Inter, "Noto Serif SC", sans-serif`;
  y = textBlock(g, lines.kicker, W / 2, y, 900, 38) + 22;
  g.fillStyle = color;
  let size = 64; // shrink long titles to one line so the text below never runs into the footer
  do g.font = `900 ${size}px Cinzel, "Noto Serif SC", serif`; while (g.measureText(lines.title).width > 940 && (size -= 4) > 36);
  g.shadowColor = color; g.shadowBlur = 24;
  y = textBlock(g, lines.title, W / 2, y + 30, 940, size + 8) + 6;
  g.shadowBlur = 0;
  if (lines.stars) {
    g.font = `48px serif`;
    const stars = "★★★★★";
    [...stars].forEach((s, i) => { g.fillStyle = i < lines.stars ? "#f6dc9a" : "rgba(255,255,255,.15)"; g.fillText(s, W / 2 - 150 + i * 56, y + 40); });
    g.fillStyle = color; g.font = `900 40px Cinzel, "Noto Serif SC", serif`; g.textAlign = "left";
    g.fillText(lines.luckWord, W / 2 + 150, y + 38); g.textAlign = "center";
    y += 72;
  }
  g.fillStyle = "#ece6da"; g.font = `500 32px Inter, "Noto Serif SC", sans-serif`;
  y = textBlock(g, lines.body, W / 2, y + 26, 880, 46) + 14;
  if (lines.traits) {
    lines.traits.forEach(([name, pct, col], i) => {
      const by = y + 20 + i * 50;
      g.textAlign = "right"; g.fillStyle = "#ece6da"; g.font = `700 28px Cinzel, "Noto Serif SC", serif`;
      g.fillText(name, 400, by + 10);
      g.fillStyle = "rgba(255,255,255,.08)"; roundRect(g, 424, by - 8, 420, 18, 9); g.fill();
      g.fillStyle = col; roundRect(g, 424, by - 8, Math.max(18, 420 * Math.min(1, pct / 50)), 18, 9); g.fill();
      g.textAlign = "left"; g.fillStyle = col; g.font = `600 26px Inter, sans-serif`;
      g.fillText(`${pct}%`, 860, by + 10);
    });
    g.textAlign = "center";
  }
  if (lines.facts) {
    g.fillStyle = "#d9b25f"; g.font = `600 28px Inter, "Noto Serif SC", sans-serif`;
    y = textBlock(g, lines.facts.join("   ·   "), W / 2, y + 10, 960, 40) + 8;
    g.fillStyle = "#ece6da"; g.font = `500 28px Inter, "Noto Serif SC", sans-serif`;
    lines.doDont.forEach((l) => { y = textBlock(g, l, W / 2, y + 4, 940, 38); });
  }

  // Footer: where to draw your own
  g.fillStyle = "rgba(217,178,95,.35)"; g.fillRect(W / 2 - 160, H - 118, 320, 2);
  g.fillStyle = "#9a917f"; g.font = `500 26px Inter, "Noto Serif SC", sans-serif`;
  g.fillText(t("posterCta"), W / 2, H - 74);
  g.fillStyle = "#f6dc9a"; g.font = `700 30px Inter, sans-serif`;
  g.fillText(location.host, W / 2, H - 34);
  return c;
}

async function openPoster(kind, btn) {
  const label = btn.textContent;
  btn.disabled = true;
  btn.textContent = t("posterMaking");
  const canvas = await makePoster(kind);
  btn.disabled = false;
  btn.textContent = label;
  const blob = await new Promise((r) => canvas.toBlob(r, "image/png"));
  const url = URL.createObjectURL(blob);
  const file = new File([blob], `dota-tarot-${todayKey()}.png`, { type: "image/png" });
  const canShare = navigator.canShare?.({ files: [file] });

  const modal = document.createElement("div");
  modal.className = "poster-modal";
  modal.innerHTML = `
    <div class="poster-box" role="dialog" aria-modal="true" aria-label="${t("savePoster")}">
      <img class="poster-img" src="${url}" alt="${t("savePoster")}" />
      <p class="poster-hint">${t("posterHint")}</p>
      <div class="r-actions">
        <a class="btn btn-primary" href="${url}" download="${file.name}">${t("download")}</a>
        ${canShare ? `<button class="btn btn-ghost" data-share>${t("share")}</button>` : ""}
        <button class="btn btn-ghost" data-close>${t("close")}</button>
      </div>
    </div>`;
  const close = () => { modal.remove(); URL.revokeObjectURL(url); };
  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.closest("[data-close]")) close();
    if (e.target.closest("[data-share]")) navigator.share({ files: [file], title: t("docTitle") }).catch(() => {});
  });
  document.addEventListener("keydown", function esc(e) {
    if (e.key === "Escape") { close(); document.removeEventListener("keydown", esc); }
  });
  document.body.append(modal);
  sfx.reveal();
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
document.querySelectorAll(".lang [data-lang]").forEach((b) => b.addEventListener("click", () => setLang(b.dataset.lang)));
$("#sound-btn").addEventListener("click", () => { sfx.toggle(); renderSoundBtn(); });
setLang(load(LANG_KEY) || (navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en"));
