/* ==========================================================================
   LARA NIKOLAU — interactions
   ========================================================================== */

const mq = window.matchMedia('(max-width: 900px)');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

function isMobile() {
  return mq.matches;
}

/* Year */
document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = String(new Date().getFullYear());
});

/* Horizontal chassis ------------------------------------------------------ */

const space = document.getElementById('hs-space');
const track = document.getElementById('hs-track');
const header = document.getElementById('site-header');
const progress = document.getElementById('scroll-progress');

function updateSnapMarkers() {
  space.querySelectorAll('.snap-marker').forEach((m) => m.remove());
  if (isMobile()) return;
  const frag = document.createDocumentFragment();
  const addMarker = (x) => {
    const m = document.createElement('span');
    m.className = 'snap-marker';
    m.style.top = `${x}px`;
    frag.appendChild(m);
  };
  track.querySelectorAll('.panel').forEach((p) => {
    addMarker(p.offsetLeft);
    // Panels wider than the viewport also snap where their right edge meets the screen edge.
    if (p.offsetWidth > window.innerWidth) addMarker(p.offsetLeft + p.offsetWidth - window.innerWidth);
  });
  space.appendChild(frag);
}

function measureTrack() {
  if (!space || !track) return;
  if (isMobile()) {
    space.style.height = 'auto';
    track.style.transform = '';
    updateSnapMarkers();
    return;
  }
  const trackWidth = track.scrollWidth;
  const vh = window.innerHeight;
  const vw = window.innerWidth;
  space.style.height = `${trackWidth - vw + vh}px`;
  updateSnapMarkers();
}

function currentScroll() {
  if (!space) return 0;
  const max = Math.max(space.offsetHeight - window.innerHeight, 1);
  const top = -space.getBoundingClientRect().top;
  return Math.min(Math.max(top, 0), max);
}

function applyTransform() {
  if (!track || isMobile()) return;
  const x = currentScroll();
  track.style.transform = `translate3d(${-x}px, 0, 0)`;
  if (progress) {
    const max = Math.max(space.offsetHeight - window.innerHeight, 1);
    progress.style.width = `${(x / max) * 100}%`;
  }
  updateHeaderTheme(x);
  updateActiveNav(x);
}

function panelThemeAt(x) {
  const panels = track.querySelectorAll('.panel[data-theme]');
  let theme = 'dark';
  panels.forEach((p) => {
    const left = p.offsetLeft;
    const right = left + p.offsetWidth;
    if (x + window.innerWidth * 0.4 >= left && x + window.innerWidth * 0.4 < right) {
      theme = p.getAttribute('data-theme') || 'light';
    }
  });
  return theme;
}

function updateHeaderTheme(x) {
  if (!header) return;
  if (isMobile()) {
    header.classList.add('is-light');
    return;
  }
  header.classList.toggle('is-light', panelThemeAt(x) === 'light');
}

function updateActiveNav(x) {
  if (isMobile()) return;
  const ids = ['portfolio', 'about', 'services', 'contact'];
  let current = '';
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (x + window.innerWidth * 0.35 >= el.offsetLeft) current = id;
  });
  document.querySelectorAll('.nav-desktop a').forEach((a) => {
    a.classList.toggle('is-active', a.dataset.panel === current);
  });
}

function scrollToPanel(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (isMobile()) {
    el.scrollIntoView({ behavior: reduce.matches ? 'auto' : 'smooth' });
    return;
  }
  const y = space.offsetTop + el.offsetLeft;
  window.scrollTo({ top: y, behavior: reduce.matches ? 'auto' : 'smooth' });
}

document.querySelectorAll('[data-panel]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('data-panel');
    if (!id) return;
    e.preventDefault();
    closeMenu();
    scrollToPanel(id);
  });
});

if (track) {
  track.addEventListener('wheel', (e) => {
    if (isMobile()) return;
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 2) {
      e.preventDefault();
      window.scrollBy(0, e.deltaX);
    }
  }, { passive: false });
}

window.addEventListener('scroll', applyTransform, { passive: true });
window.addEventListener('resize', () => {
  measureTrack();
  applyTransform();
});

/* Mobile menu ------------------------------------------------------------- */

const menu = document.getElementById('mobile-menu');
const toggle = document.querySelector('.menu-toggle');

function closeMenu() {
  if (!menu || !toggle) return;
  menu.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
}

if (toggle) {
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

/* Render: projects -------------------------------------------------------- */

function renderProjects() {
  const root = document.getElementById('projects-root');
  if (!root || typeof PROJECTS === 'undefined') return;
  const frag = document.createDocumentFragment();
  PROJECTS.forEach((p) => {
    const a = document.createElement('a');
    a.className = 'panel project-card';
    a.href = `project.html?slug=${encodeURIComponent(p.slug)}`;
    a.setAttribute('data-theme', 'dark');
    a.innerHTML = `
      <img src="${p.cover}" alt="${p.title} — placeholder photograph" loading="lazy">
      <div class="veil"></div>
      <div class="project-meta">
        <div class="cat">${p.category}</div>
        <h3>${p.title}</h3>
        <div class="loc">${p.location} · ${p.date}</div>
        <p>${p.description}</p>
        <span class="btn btn-light" style="margin-top:0.9rem;">View Project <span class="btn-arrow">→</span></span>
      </div>`;
    frag.appendChild(a);
  });
  root.replaceWith(frag);
}

/* Render: portfolio ------------------------------------------------------- */

let folioFilter = 'all';
let lightboxItems = [];

function renderFilters() {
  const el = document.getElementById('cat-filters');
  if (!el || typeof CATEGORIES === 'undefined') return;
  const all = [{ slug: 'all', label: 'All' }, ...CATEGORIES];
  el.innerHTML = all.map((c) =>
    `<button type="button" data-cat="${c.slug}" class="${c.slug === folioFilter ? 'is-active' : ''}">${c.label}</button>`
  ).join('');
  el.querySelectorAll('button').forEach((btn) => {
    btn.addEventListener('click', () => {
      folioFilter = btn.dataset.cat;
      renderPortfolio();
      measureTrack();
      applyTransform();
    });
  });
}

function renderPortfolio() {
  const root = document.getElementById('folio-root');
  if (!root || typeof PORTFOLIO === 'undefined') return;
  renderFilters();
  const items = folioFilter === 'all'
    ? PORTFOLIO
    : PORTFOLIO.filter((p) => p.category === folioFilter);
  lightboxItems = items;
  const wrap = document.createElement('div');
  wrap.id = 'folio-root';
  wrap.className = 'hs-fragment';
  items.forEach((item, i) => {
    const fig = document.createElement('figure');
    fig.className = `panel film-item size-${item.size || 'tall'}`;
    fig.setAttribute('data-theme', item.size === 'full' ? 'dark' : 'light');
    fig.innerHTML = `
      <img src="${item.img}" alt="${item.title} — placeholder photograph" loading="lazy">
      <figcaption>${item.title} · ${item.category}</figcaption>`;
    fig.addEventListener('click', () => openLightbox(i));
    wrap.appendChild(fig);
  });
  root.replaceWith(wrap);
}

/* Lightbox ---------------------------------------------------------------- */

const lightbox = document.getElementById('lightbox');
let lbIndex = 0;

function openLightbox(i) {
  if (!lightbox || !lightboxItems.length) return;
  lbIndex = i;
  lightbox.hidden = false;
  requestAnimationFrame(() => lightbox.classList.add('is-open'));
  paintLightbox();
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('is-open');
  setTimeout(() => { lightbox.hidden = true; }, 400);
}

function paintLightbox() {
  const item = lightboxItems[lbIndex];
  if (!item) return;
  const image = lightbox.querySelector('img');
  const cap = lightbox.querySelector('.lightbox-cap');
  image.src = item.img.replace('w=1600', 'w=2200');
  image.alt = item.title;
  cap.textContent = `${item.title} · ${item.category}`;
}

function lbStep(dir) {
  if (!lightboxItems.length) return;
  lbIndex = (lbIndex + dir + lightboxItems.length) % lightboxItems.length;
  paintLightbox();
}

if (lightbox) {
  lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightbox.querySelector('.prev').addEventListener('click', () => lbStep(-1));
  lightbox.querySelector('.next').addEventListener('click', () => lbStep(1));
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}

document.addEventListener('keydown', (e) => {
  if (!lightbox || !lightbox.classList.contains('is-open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lbStep(-1);
  if (e.key === 'ArrowRight') lbStep(1);
});

/* Services ---------------------------------------------------------------- */

function renderServices() {
  const root = document.getElementById('services-root');
  if (!root || typeof SERVICES === 'undefined') return;
  const frag = document.createDocumentFragment();
  SERVICES.forEach((s, i) => {
    const col = document.createElement('article');
    col.className = 'panel service-col';
    col.setAttribute('data-theme', 'light');
    col.innerHTML = `
      <div class="sv-media"><img src="${s.image}" alt="${s.title} — placeholder" loading="lazy"></div>
      <div class="sv-text">
        <span class="sv-index">0${i + 1}</span>
        <h3>${s.title}</h3>
        <p>${s.description}</p>
        <ul class="sv-includes">${s.includes.map((inc) => `<li>${inc}</li>`).join('')}</ul>
        <div class="sv-footer">
          <div class="sv-price"><span>Starting at</span>${s.price}</div>
          <a class="btn btn-dark" href="#contact" data-inquire="${s.slug}">Inquire <span class="btn-arrow">→</span></a>
        </div>
      </div>`;
    frag.appendChild(col);
  });
  root.replaceWith(frag);
  document.querySelectorAll('[data-inquire]').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const type = a.getAttribute('data-inquire');
      const select = document.getElementById('photography-type');
      if (select) select.value = type;
      scrollToPanel('contact');
    });
  });
}

/* Testimonials ------------------------------------------------------------ */

function renderQuotes() {
  const root = document.getElementById('quotes-root');
  const nav = document.getElementById('quote-nav');
  if (!root || typeof TESTIMONIALS === 'undefined') return;
  root.innerHTML = TESTIMONIALS.map((t, i) => `
    <blockquote class="quote-block${i === 0 ? ' is-active' : ''}" data-q="${i}">
      <q>${t.quote}</q>
      <footer>${t.name}${t.role ? ` — ${t.role}` : ''}</footer>
    </blockquote>`).join('');
  nav.innerHTML = TESTIMONIALS.map((_, i) =>
    `<button type="button" aria-label="Testimonial ${i + 1}" class="${i === 0 ? 'is-active' : ''}"></button>`
  ).join('');
  let idx = 0;
  const buttons = [...nav.querySelectorAll('button')];
  function show(n) {
    idx = n;
    root.querySelectorAll('.quote-block').forEach((b, i) => b.classList.toggle('is-active', i === n));
    buttons.forEach((b, i) => b.classList.toggle('is-active', i === n));
  }
  buttons.forEach((b, i) => b.addEventListener('click', () => show(i)));
  setInterval(() => {
    if (reduce.matches) return;
    show((idx + 1) % TESTIMONIALS.length);
  }, 7000);
}

/* Contact form ------------------------------------------------------------ */

const form = document.getElementById('contact-form');
if (form) {
  const params = new URLSearchParams(window.location.search);
  const preset = params.get('type');
  if (preset) {
    const select = document.getElementById('photography-type');
    if (select) select.value = preset;
  }
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;
    form.querySelectorAll('[required]').forEach((field) => {
      const wrap = field.closest('.form-field');
      const valid = field.checkValidity();
      wrap.classList.toggle('is-error', !valid);
      if (!valid) ok = false;
    });
    if (!ok) return;
    form.classList.add('is-hidden');
    const success = document.getElementById('form-success');
    if (success) success.classList.add('is-visible');
  });
}

/* Project page ------------------------------------------------------------ */

function renderProjectPage() {
  const root = document.getElementById('project-track');
  if (!root || typeof PROJECTS === 'undefined') return;
  const slug = new URLSearchParams(window.location.search).get('slug') || PROJECTS[0].slug;
  const project = PROJECTS.find((p) => p.slug === slug) || PROJECTS[0];
  document.title = `${project.title} — Lara Nikolau`;
  const hero = document.createElement('section');
  hero.className = 'panel project-hero-panel';
  hero.setAttribute('data-theme', 'dark');
  hero.innerHTML = `
    <img src="${project.cover}" alt="${project.title} — placeholder cover">
    <div class="hero-veil"></div>
    <div class="project-hero-copy">
      <span class="eyebrow">${project.category}</span>
      <h1>${project.title}</h1>
      <p>${project.location} · ${project.date}</p>
    </div>`;
  const note = document.createElement('section');
  note.className = 'panel project-note';
  note.setAttribute('data-theme', 'light');
  note.innerHTML = `<div><span class="eyebrow">The Story</span><p style="margin-top:1rem;">${project.body}</p></div>`;
  root.appendChild(hero);
  root.appendChild(note);
  project.gallery.forEach((src, i) => {
    const frame = document.createElement('figure');
    frame.className = 'panel project-frame';
    frame.setAttribute('data-theme', 'dark');
    frame.innerHTML = `<img src="${src}" alt="${project.title} ${i + 1} — placeholder photograph" loading="lazy">`;
    frame.addEventListener('click', () => {
      lightboxItems = project.gallery.map((g, gi) => ({
        img: g,
        title: project.title,
        category: `${gi + 1} / ${project.gallery.length}`,
      }));
      openLightbox(i);
    });
    root.appendChild(frame);
  });
  const end = document.createElement('section');
  end.className = 'panel panel-end';
  end.setAttribute('data-theme', 'dark');
  end.innerHTML = `<div><a class="logo" href="index.html">Lara Nikolau</a><p><a href="index.html#portfolio">Back to portfolio</a></p></div>`;
  root.appendChild(end);
}

/* Boot -------------------------------------------------------------------- */

function boot() {
  renderProjects();
  renderPortfolio();
  renderServices();
  renderQuotes();
  renderProjectPage();
  measureTrack();
  applyTransform();
  if (typeof watchImages === 'function') watchImages();
  if (window.location.hash) {
    const id = window.location.hash.replace('#', '');
    requestAnimationFrame(() => scrollToPanel(id));
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}

function watchImages() {
  if (!track) return;
  track.querySelectorAll('img').forEach((image) => {
    if (!image.complete) {
      image.addEventListener('load', () => {
        measureTrack();
        applyTransform();
      }, { once: true });
    }
  });
}

window.addEventListener('load', () => {
  measureTrack();
  applyTransform();
  watchImages();
});
