/* Xinrui Song — site script v4 (quant branch): router, detail renderer, typing, ghost nav. No dependencies. */
(function () {
  'use strict';

  /* ---------- project order shown on the home page (quant branch: public market research first, private internship work third) ---------- */
  const PROJECTS = [
    { id: 'spy-ief-research-atlas', year: '2024–26', type: 'Course study, extended', role: 'Co-author of the 2024 study; research questions and review for the extension',
      summary: 'IEF rose on 78% of the worst SPY days overall, versus 40–49% in the two periods since 2022; I examined this weaker historical protection using return data, inflation context and time-series evaluation.',
      tools: 'Python, JavaScript, Plotly' },
    { id: 'bankroll-risk', year: '2026', type: 'Independent study', role: 'Numerical validation, uncertainty propagation, Python/web comparison',
      summary: 'A simulated ruin probability can be wrong for three reasons: simulation noise, an uncertain win rate, and the wrong model of how results arrive. I measure each one separately against an exact first-passage benchmark; only the first shrinks with more computing.',
      tools: 'Python, NumPy, SciPy, Node' },
    { id: 'quant-platform', year: '2026', type: 'Internship research', role: 'Factor definitions, backtest contract, validation checks',
      summary: 'A factor research framework for commodity futures: momentum, volatility, valuation and quality factors, a fixed backtest contract, and validation against overfitting and leakage.',
      tools: 'Python, pandas, NumPy',
      note: 'Internship work. Code and data stay private; this page describes the method only.' },
    { id: 'health-dashboard', year: '2026', type: 'Course project, reanalysed', role: 'Introduction, narrative and map in the original; specifications and review in the reanalysis',
      summary: 'The same discipline on public-health data: adjusted regression, fixed-effects panels and held-out prediction across 63 countries and 159 DHS surveys, with intervals that include zero reported as such.',
      tools: 'Python, statsmodels, scikit-learn' },
  ];

  const CONTRIBUTION = {
    'bankroll-risk': 'I focused on how reliable the simulated risk estimates are. For the ruin events that 100-hand checkpoints miss, I added a Brownian-bridge correction and checked the results against the exact finite-horizon first-passage formula. When an engine update changed results for the same inputs and seed, I separated the effect of the new random numbers from that of the correction, and used 40 seeds of 2,000 paths to tell Monte Carlo variation apart from a systematic change in how ruin was detected. I also studied uncertain win rates and other ways results might arrive, compared the Python research engine with the web version, and recorded the settings, seeds, versions and limitations so each comparison can be rerun. AI tools helped me review code and tests and check calculations.',
    'quant-platform': 'Independent work during a quantitative research internship. I designed the factor definitions, the backtest contract and the validation checks; the implementation is not public.',
  };

  /* Each project's entry points. `dashboard` is a page served by this site; `second` is a
     companion page; `offline` is a downloadable file; `app` is an external live app and is
     rendered only once it holds a real URL. */
  const LINKS = {
    'bankroll-risk': { dashboard: 'projects/poker-risk-lab/', dashboardLabel: 'Research overview', second: 'projects/poker-risk-lab/case-study/', secondLabel: 'Case study',
      app: 'https://poker-analytics-suite.onrender.com/', appLabel: 'Interactive lab', hint: 'Runs on Render\'s free plan; after a quiet spell the first visit takes about a minute to start.' },
    'health-dashboard': { dashboard: 'malaria_dashboard_v3_8_4.html', dashboardLabel: 'Dashboard' },
    'spy-ief-research-atlas': { dashboard: 'projects/spy-ief/', dashboardLabel: 'Interactive atlas', offline: 'projects/spy-ief/offline.html', offlineLabel: 'Offline atlas' },
  };

  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pad2 = n => String(n).padStart(2, '0');

  /* ---------- theme ---------- */
  const toggle = $('#theme-toggle');
  function setTheme(t) {
    document.documentElement.dataset.theme = t;
    try { localStorage.setItem('xs-theme', t); } catch (e) {}
    if (toggle) toggle.textContent = t === 'dark' ? 'Light' : 'Dark';
  }
  if (toggle) toggle.addEventListener('click', e => { e.preventDefault(); setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'); });

  /* ---------- terminal tabs (reference 03) ----------
     Content lives in <template> elements. Clicking a tab types the plain text at 4 ms/char,
     then swaps in the HTML so links work. Switching tabs cancels the run in flight.
     Deep link: #t/about, #t/education, #t/contact. Static under reduced motion. */
  const term = $('#terminal');
  const tabs = $$('.tabs a[data-tab]');
  let token = 0, timer = null;

  function setTabsDisabled(on) {
    $$('.tabs a').forEach(a => { a.classList.toggle('disabled', on); if (on) a.setAttribute('aria-disabled', 'true'); else a.removeAttribute('aria-disabled'); });
  }
  function openTab(key, opts) {
    const tpl = document.getElementById('tab-' + key); if (!tpl || !term) return false;
    opts = opts || {};
    token++; const my = token;
    if (timer) { clearTimeout(timer); timer = null; }
    tabs.forEach(a => { if (a.dataset.tab === key) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
    const html = tpl.innerHTML.trim();
    term.hidden = false;
    if (reduced() || opts.instant) { term.innerHTML = html; setTabsDisabled(false); return true; }
    const tmp = document.createElement('div'); tmp.innerHTML = html;
    const text = tmp.textContent;
    term.textContent = '';
    const caret = document.createElement('span'); caret.className = 'caret'; caret.setAttribute('aria-hidden', 'true'); term.appendChild(caret);
    setTabsDisabled(true);
    let i = 0;
    const step = () => {
      if (my !== token) return;
      if (i < text.length) {
        caret.before(document.createTextNode(text[i++]));
        term.scrollTop = term.scrollHeight;
        timer = setTimeout(step, text[i - 1] === '\n' ? 24 : 4);
      } else {
        term.innerHTML = html;
        setTabsDisabled(false);
      }
    };
    timer = setTimeout(step, 0);
    return true;
  }
  tabs.forEach(a => a.addEventListener('click', e => { e.preventDefault(); history.replaceState(null, '', '#t/' + a.dataset.tab); openTab(a.dataset.tab); }));
  $$('a[href^="#t/"]:not([data-tab])').forEach(a => a.addEventListener('click', e => {
    e.preventDefault(); const key = a.getAttribute('href').slice(3);
    if (vHome.hidden) { location.hash = '#t/' + key; return; }
    history.replaceState(null, '', '#t/' + key); window.scrollTo({ top: 0 }); openTab(key);
  }));

  /* hero typed line is gone; the terminal is the typing locus. */

  /* ---------- home list ---------- */
  function renderHome() {
    const list = $('#project-list'); if (!list) return;
    list.innerHTML = PROJECTS.map((p, i) => {
      const d = DETAILS[p.id];
      return `<a class="project-row" href="#/${p.id}">
        <span class="idx">${pad2(i + 1)}<small>${esc(p.year)}</small></span>
        <span>
          <h3 class="t2">${esc(d.title)}</h3>
          <p class="summary">${esc(p.summary)}</p>
          <div class="spec-row compact">
            <div class="spec-item"><span class="spec-l">Project</span><span class="spec-v">${esc(p.type)}</span></div>
            <div class="spec-item"><span class="spec-l">Tools</span><span class="spec-v">${esc(p.tools)}</span></div>
            ${p.note ? `<div class="spec-item"><span class="spec-l">Access</span><span class="spec-v">Private code and data</span></div>` : ''}
          </div>
        </span>
      </a>`;
    }).join('');
  }

  /* ---------- detail ---------- */
  const stripNum = s => String(s).replace(/^\s*\d+\s*[·./-]\s*/, '');
  const sentence = s => stripNum(s).split(' ').map((w, i) => (i === 0 || /^[A-Z0-9&]+$/.test(w) || /\d/.test(w)) ? w : w.toLowerCase()).join(' ');

  /* spec sheet: facts + key numbers in one ruled strip; notes become footnotes */
  function specSheet(id, d, p) {
    const L = LINKS[id] || {};
    const items = [
      { l: 'Project', v: `${esc(p.type)}, ${esc(p.year)}` },
      { l: 'Tools', v: esc((d.chips || []).join(', ')) },
    ];
    const notes = [];
    if (L.dashboard) {
      const sep = ' <span class="sep">/</span> ';
      let v = `<a class="ext" href="${esc(L.dashboard)}" target="_blank" rel="noopener">${esc(L.dashboardLabel)}</a>`;
      if (L.second) v += sep + `<a class="ext" href="${esc(L.second)}" target="_blank" rel="noopener">${esc(L.secondLabel)}</a>`;
      if (L.offline) v += sep + `<a href="${esc(L.offline)}" download>${esc(L.offlineLabel)}</a>`;
      if (L.app && /^https?:\/\//.test(L.app)) {
        v += sep + `<a class="ext" href="${esc(L.app)}" target="_blank" rel="noopener">${esc(L.appLabel)}</a>`;
        if (L.hint) { notes.push(L.hint); v += `<sup>${notes.length}</sup>`; }
      }
      items.push({ l: 'Open', v });
    }
    const nums = (d.metrics && !d.actions) ? d.metrics.map(m => {
      let v = esc(m.value);
      if (m.note) { notes.push(m.note); v += `<sup>${notes.length}</sup>`; }
      return { l: esc(m.label), v, num: true };
    }) : [];
    const row = arr => `<div class="spec-row">${arr.map(i => `<div class="spec-item${i.num ? ' num' : ''}"><span class="spec-l">${i.l}</span><span class="spec-v">${i.v}</span></div>`).join('')}</div>`;
    return `<div class="spec">${row(items)}${nums.length ? row(nums) : ''}</div>
      ${notes.length ? `<ol class="spec-notes">${notes.map(n => `<li>${esc(n)}</li>`).join('')}</ol>` : ''}`;
  }

  function validation(d) {
    if (!d.validation) return '';
    return `<p class="meta" style="margin-top:20px">${esc(d.validation.caption)}</p>
      <table class="plain"><thead><tr><th>Method</th><th>Ruin probability</th></tr></thead><tbody>
      ${d.validation.rows.map(r => `<tr><td>${esc(r.m)}</td><td class="num">${esc(r.v)}${r.ci ? `<em>${esc(r.ci)}</em>` : ''}</td></tr>`).join('')}
      </tbody></table>`;
  }
  function strands(d) {
    if (!d.strands) return '';
    return `<div class="strands"><p class="meta">Four sources of error, isolated</p>
      ${d.strands.map(s => `<div class="strand"><span class="mono">${esc(stripNum(s.tag.replace(/^STRAND\s*/i, '')).toLowerCase())}</span><h3>${s.title}</h3><p>${s.body}</p></div>`).join('')}
    </div>`;
  }
  function figure(id, d) {
    if (id === 'spy-ief-research-atlas' && window.SPY_FIGURE) {
      return `<div class="spy-figure">
        <p class="t2">When stocks fell hardest, did bonds still help?</p>
        <p class="meta" style="margin-top:8px">SPY and IEF return indices, 2002-08-01 = 100, log scale. Data through 2026-10-02.</p>
        ${window.SPY_FIGURE}</div>`;
    }
    if (d.screenshot) return `<figure class="figure"><img src="${esc(d.screenshot)}" alt="${esc(d.screenshotAlt || '')}" loading="lazy"><figcaption>${esc(d.screenshotAlt || '')}</figcaption></figure>`;
    return '';
  }
  const chev = dir => dir === 'prev'
    ? '<svg viewBox="0 0 22 44" aria-hidden="true"><path d="M16 4 L5 22 L16 40"/></svg>'
    : '<svg viewBox="0 0 22 44" aria-hidden="true"><path d="M6 4 L17 22 L6 40"/></svg>';

  function renderDetail(id) {
    const d = DETAILS[id]; if (!d) return false;
    const idx = PROJECTS.findIndex(p => p.id === id);
    const p = PROJECTS[idx];
    const pi = (idx - 1 + PROJECTS.length) % PROJECTS.length, ni = (idx + 1) % PROJECTS.length;
    const prev = PROJECTS[pi], next = PROJECTS[ni];
    const contribution = d.contribution || CONTRIBUTION[id];
    const sections = (d.sections || []).filter(s => !/my contribution/i.test(s[0]));

    $('#detail-root').innerHTML = `
      <article class="detail">
        <a class="side-arrow prev" href="#/${prev.id}" aria-label="Previous: ${esc(DETAILS[prev.id].title)}">${chev('prev')}<span>${pad2(pi + 1)}</span></a>
        <a class="side-arrow next" href="#/${next.id}" aria-label="Next: ${esc(DETAILS[next.id].title)}">${chev('next')}<span>${pad2(ni + 1)}</span></a>
        <header class="col wide">
          <div class="crumbs"><span class="mono">${pad2(idx + 1)} / ${pad2(PROJECTS.length)}</span><a class="back" href="#projects">All projects</a></div>
          <h1 class="t1">${esc(d.title)}</h1>
          ${d.subtitle ? `<p class="subtitle">${esc(d.subtitle)}</p>` : ''}
        </header>
        <div class="col wide exhibit">${figure(id, d)}</div>
        <div class="col wide">${specSheet(id, d, p)}</div>
        <div class="col wide opening">
          <p class="t2 question">${esc(d.headline)}</p>
          ${contribution ? `<div class="mypart"><span class="meta">My part</span><p>${contribution}</p></div>` : ''}
          <p class="tagline">${d.tagline}</p>
          ${p.note ? `<p class="private">${esc(p.note)}</p>` : ''}
        </div>
        <div class="col">
          <div class="body">
            ${sections.map(s => {
              const h = sentence(s[0]); let extra = '';
              if (/method/i.test(h)) extra = strands(d);
              if (/^validation/i.test(h)) extra = validation(d);
              return `<h2 class="t2">${esc(h)}</h2><p>${s[1]}</p>${extra}`;
            }).join('')}
            ${(!sections.some(s => /^validation/i.test(sentence(s[0]))) ? validation(d) : '')}
            ${(!sections.some(s => /method/i.test(sentence(s[0]))) ? strands(d) : '')}
          </div>
          <nav class="pager" aria-label="Other projects">
            <a href="#/${prev.id}"><span class="mono">${pad2(pi + 1)}</span>${esc(DETAILS[prev.id].title)}</a>
            <a class="next" href="#/${next.id}"><span class="mono">${pad2(ni + 1)}</span>${esc(DETAILS[next.id].title)}</a>
          </nav>
        </div>
      </article>`;
    document.title = d.title + ' — Xinrui Song';
    return true;
  }

  /* ---------- scroll-spy for ghost nav + pill ---------- */
  const ghost = $('#ghost');
  const spyTargets = ['top', 'projects', 'about'];
  function spy() {
    if (vHome.hidden) return;
    const y = window.scrollY + window.innerHeight * 0.35;
    let cur = 'top';
    for (const id of spyTargets) { const el = document.getElementById(id); if (el && el.offsetTop <= y) cur = id; }
    if (window.scrollY < 80) cur = 'top';
    $$('a', ghost).forEach(a => { if (a.dataset.for === cur) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
    $$('.pill a').forEach(a => { const on = a.getAttribute('href') === '#' + cur; if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
  }
  let spyTick = false;
  window.addEventListener('scroll', () => { if (!spyTick) { spyTick = true; requestAnimationFrame(() => { spy(); spyTick = false; }); } }, { passive: true });

  /* ---------- router ---------- */
  const vHome = $('#view-home'), vDetail = $('#view-detail');
  let lastHomeScroll = 0;
  function route() {
    const m = location.hash.match(/^#\/([a-z0-9-]+)/);
    if (m && DETAILS[m[1]]) {
      if (!vHome.hidden) lastHomeScroll = window.scrollY;
      renderDetail(m[1]);
      vHome.hidden = true; vDetail.hidden = false; ghost.hidden = true;
      window.scrollTo({ top: 0, behavior: 'auto' });
      $$('.pill a').forEach(a => a.removeAttribute('aria-current'));
      $('#nav-projects').setAttribute('aria-current', 'true');
    } else {
      const wasDetail = !vDetail.hidden;
      vDetail.hidden = true; vHome.hidden = false; ghost.hidden = false;
      document.title = 'Xinrui Song';
      const tm = location.hash.match(/^#t\/([a-z]+)/);
      if (tm) { window.scrollTo({ top: 0, behavior: 'auto' }); openTab(tm[1]); }
      if (wasDetail && !tm) {
        const target = location.hash === '#projects' ? $('#projects') : null;
        if (target) target.scrollIntoView({ block: 'start' }); else window.scrollTo({ top: lastHomeScroll, behavior: 'auto' });
          }
      spy();
    }
  }
  window.addEventListener('hashchange', route);

  /* ---------- boot ---------- */
  setTheme(document.documentElement.dataset.theme || 'light');
  renderHome();
  route();

  const tm = location.hash.match(/^#t\/([a-z]+)/);
  if (tm) openTab(tm[1], { instant: true });
})();
