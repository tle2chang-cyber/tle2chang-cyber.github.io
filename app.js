(() => {
  const S = window.SITE, CATS = window.CATEGORIES, WORKS = window.WORKS, PHOTOS = window.PHOTOS;
  const $ = (s, r = document) => r.querySelector(s);
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const catOf = id => CATS.find(c => c.id === id);
  const poster = id => `media/poster/${id}.jpg`;
  const preview = id => `media/preview/${id}.mp4`;
  const full = id => `media/video/${id}.mp4`;

  // ---- Nội dung chung
  document.querySelectorAll("[data-site]").forEach(n => n.textContent = S[n.dataset.site] || "");
  document.title = `${S.name} — ${S.role}`;
  $("#year").textContent = new Date().getFullYear();
  $("#mailBtn").href = `mailto:${S.email}`;
  const ph = $("#phoneLink");
  if (S.phone) { ph.href = `tel:${S.phone.replace(/\s/g, "")}`; ph.innerHTML = `${S.phone} <span>›</span>`; } else ph.remove();
  S.socials.forEach(s => { const li = el("li"); li.innerHTML = `<a href="${s.url}" target="_blank" rel="noopener">${s.label}</a>`; $("#socials").append(li); });

  // ---- Giới thiệu
  const A = S.about;
  if (A) {
    $("#aboutPhoto").src = A.photo; $("#aboutPhoto").alt = S.name;
    $("#aboutTitle").textContent = `Xin chào, mình là ${S.name}.`;
    $("#aboutText").textContent = A.text;
    $("#statYears").textContent = `${A.years}+`;
    $("#statWorks").textContent = WORKS.length;
    A.skills.forEach(k => $("#aboutSkills").append(el("li", null, k)));
  } else $("#about").remove();
  if (!S.socials.length) $("#socials").remove();

  // ---- Nav
  const navLinks = $("#navLinks");
  [...CATS.map(c => [c.name, `#works`, c.id]), ["Ảnh", "#photos"], ["Giới thiệu", "#about"]].forEach(([name, href, cat]) => {
    const li = el("li"); const a = el("a", null, name); a.href = href;
    if (cat) a.addEventListener("click", () => setFilter(cat));
    li.append(a); navLinks.append(li);
  });
  const nav = $("#nav");
  $("#navToggle").addEventListener("click", () => nav.classList.toggle("open"));
  navLinks.addEventListener("click", () => nav.classList.remove("open"));

  // ---- Video nền chỉ chạy khi đang nhìn thấy (tiết kiệm băng thông)
  const vio = new IntersectionObserver(es => es.forEach(e => {
    const v = e.target;
    if (e.isIntersecting) { if (!v.src && v.dataset.src) v.src = v.dataset.src; v.play().catch(() => {}); }
    else v.pause();
  }), { rootMargin: "200px" });
  const bgVideo = (id, cls = "media") => {
    const v = el("video", cls); v.muted = true; v.loop = true; v.playsInline = true; v.preload = "none";
    v.poster = poster(id); v.dataset.src = preview(id); v.setAttribute("muted", ""); vio.observe(v); return v;
  };

  // ---- Tiles kiểu apple.com
  const bigCats = ["tvc", "film", "anim"];
  const featureOf = cid => WORKS.find(w => w.cat === cid && w.feature) || WORKS.find(w => w.cat === cid);
  const countOf = cid => WORKS.filter(w => w.cat === cid).length;

  const makeTile = c => {
    const f = featureOf(c.id);
    const t = el("article", "tile on-dark reveal" + (f.v ? " vertical" : ""));
    t.innerHTML = `<div class="tile-copy">
        <h2>${c.headline}</h2><p class="sub">${c.sub}</p>
        <div class="links"><a class="btn" href="#">Xem phim</a><a class="link more" href="#works">Xem tất cả <span>›</span></a></div>
        <p class="count">${countOf(c.id)} tác phẩm</p></div>`;
    if (f.v) {
      const phones = el("div", "phones");
      WORKS.filter(w => w.cat === c.id).slice(0, 2).forEach(w => { const p = el("div", "phone"); p.append(bgVideo(w.id, "")); phones.append(p); });
      t.append(phones);
    } else t.prepend(bgVideo(f.id));
    t.addEventListener("click", e => {
      if (e.target.closest(".more")) { setFilter(c.id); return; }
      e.preventDefault(); openWork(WORKS.indexOf(f), WORKS.filter(w => w.cat === c.id));
    });
    return t;
  };
  CATS.filter(c => bigCats.includes(c.id)).forEach(c => $("#tiles").append(makeTile(c)));
  CATS.filter(c => !bigCats.includes(c.id)).forEach(c => $("#gridTiles").append(makeTile(c)));

  // Ô ảnh
  if (PHOTOS.length) {
    const p0 = PHOTOS[0];
    const total = PHOTOS.reduce((a, p) => a + p.count, 0);
    const t = el("article", "tile photo-tile reveal");
    t.innerHTML = `<img class="media" src="media/photo/${p0.id}/01.jpg" alt="" loading="lazy">
      <div class="tile-copy"><h2>Ảnh.</h2><p class="sub">Không gian, kiến trúc, nội thất.</p>
      <div class="links"><a class="link" href="#photos">Xem bộ ảnh <span>›</span></a></div>
      <p class="count">${total} ảnh · ${PHOTOS.length} bộ</p></div>`;
    t.addEventListener("click", () => location.hash = "photos");
    $("#gridTiles").append(t);
  }

  // ---- Lưới tác phẩm + bộ lọc
  const DURS = {"tvc-vsr":96,"tvc-lo-trinh":58,"tvc-hanh-trinh":65,"tvc-prepcando-series":85,"film-kb1":183,"film-kb2":213,"anim-pte-1":92,"anim-pte-2":102,"ai-skoda":30,"ai-xanhsm":30,"ai-coloa":74,"ai-wuxia-1":20,"ai-wuxia-2":15,"ai-wuxia-3":16,"ai-dog-robot":6,"ai-balloon-1":4,"ai-balloon-2":4,"mg-lig-1":38,"mg-lig-2":33,"th-zen-4":125,"th-zen-8":78};
  const fmt = s => s ? `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, "0")}` : "";

  const grid = $("#worksGrid"), filters = $("#filters");
  let currentList = WORKS;
  [["all", "Tất cả"], ...CATS.map(c => [c.id, c.name])].forEach(([id, name]) => {
    const b = el("button", null, name); b.dataset.f = id; b.setAttribute("role", "tab");
    b.addEventListener("click", () => setFilter(id)); filters.append(b);
  });
  WORKS.forEach((w, i) => {
    const c = el("article", "card reveal" + (w.v ? " v" : "")); c.dataset.cat = w.cat;
    c.innerHTML = `<div class="card-media"><img src="${poster(w.id)}" alt="${w.title}" loading="lazy"><span class="play"></span></div>
      <div class="card-meta"><p class="cat">${catOf(w.cat).name}</p><h3>${w.title}</h3><p class="dur">${fmt(DURS[w.id])}</p></div>`;
    const media = $(".card-media", c);
    c.addEventListener("mouseenter", () => {
      let v = $("video", media);
      if (!v) { v = el("video"); v.muted = true; v.loop = true; v.playsInline = true; v.src = preview(w.id);
        v.addEventListener("playing", () => v.classList.add("ready")); media.insertBefore(v, $(".play", media)); }
      v.play().catch(() => {});
    });
    c.addEventListener("mouseleave", () => { const v = $("video", media); if (v) v.pause(); });
    c.addEventListener("click", () => openWork(i, currentList));
    grid.append(c);
  });
  function setFilter(id) {
    filters.querySelectorAll("button").forEach(b => b.setAttribute("aria-selected", b.dataset.f === id));
    grid.querySelectorAll(".card").forEach(c => c.classList.toggle("hide", id !== "all" && c.dataset.cat !== id));
    currentList = id === "all" ? WORKS : WORKS.filter(w => w.cat === id);
  }
  setFilter("all");

  // ---- Ảnh
  const pGrid = $("#photoGrid"), pFilters = $("#photoFilters");
  let photoList = [];
  const showPhotos = id => {
    pFilters.querySelectorAll("button").forEach(b => b.setAttribute("aria-selected", b.dataset.f === id));
    const set = PHOTOS.find(p => p.id === id);
    photoList = Array.from({ length: set.count }, (_, i) => ({ src: `media/photo/${id}/${String(i + 1).padStart(2, "0")}.jpg`, title: set.name, n: i + 1, total: set.count }));
    pGrid.innerHTML = "";
    photoList.forEach((p, i) => {
      const f = el("figure"); f.innerHTML = `<img src="${p.src}" alt="${p.title} ${p.n}" loading="lazy">`;
      f.addEventListener("click", () => openPhoto(i)); pGrid.append(f);
    });
  };
  PHOTOS.forEach(p => { const b = el("button", null, p.name); b.dataset.f = p.id; b.addEventListener("click", () => showPhotos(p.id)); pFilters.append(b); });
  if (PHOTOS.length) showPhotos(PHOTOS[0].id);

  // ---- Lightbox
  const lb = $("#lightbox"), stage = $("#lbStage"), cap = $("#lbCap");
  let mode = null, list = [], idx = 0;
  const render = () => {
    stage.innerHTML = "";
    if (mode === "video") {
      const w = list[idx];
      const v = el("video"); v.src = full(w.id); v.poster = poster(w.id); v.controls = true; v.autoplay = true; v.playsInline = true;
      stage.append(v);
      cap.innerHTML = `${w.title}<small>${catOf(w.cat).name} · ${idx + 1} / ${list.length}</small>`;
    } else {
      const p = list[idx]; const img = el("img"); img.src = p.src; img.alt = p.title; stage.append(img);
      cap.innerHTML = `${p.title}<small>${p.n} / ${p.total}</small>`;
    }
    $("#lbPrev").hidden = $("#lbNext").hidden = list.length < 2;
  };
  const open = () => { lb.hidden = false; document.body.style.overflow = "hidden"; render(); };
  const close = () => { lb.hidden = true; stage.innerHTML = ""; document.body.style.overflow = ""; };
  const step = d => { idx = (idx + d + list.length) % list.length; render(); };
  function openWork(globalIndex, inList) { mode = "video"; list = inList; idx = Math.max(0, inList.indexOf(WORKS[globalIndex])); open(); }
  function openPhoto(i) { mode = "photo"; list = photoList; idx = i; open(); }
  $("#lbClose").onclick = close; $("#lbPrev").onclick = () => step(-1); $("#lbNext").onclick = () => step(1);
  lb.addEventListener("click", e => { if (e.target === lb || e.target === stage) close(); });
  addEventListener("keydown", e => {
    if (lb.hidden) return;
    if (e.key === "Escape") close(); if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1);
  });

  // ---- Hiệu ứng xuất hiện khi cuộn
  const rio = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); rio.unobserve(e.target); } }), { threshold: .12 });
  document.querySelectorAll(".reveal").forEach(n => rio.observe(n));
})();
