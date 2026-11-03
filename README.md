# Xinrui Song — application site, shell v8 (2026-10-30)

Static. No build step. Serve the folder root (GitHub Pages / Vercel / `python3 -m http.server`).

## Files
- `index.html` — shell: header, hero, project list, about, contact, detail root.
- `assets/site.css` — tokens and layout. Colors at the top of the file.
- `assets/site.js` — home list (`PROJECTS`), external links (`LINKS`), contribution text, detail renderer, hash router, typing.
- `assets/details.js` — project copy, carried over from r7 unchanged except: Multi-Factor sample metrics removed.
- `assets/spy-figure.js` — the real SPY/IEF chart (472 KB, loads deferred).
- `malaria_dashboard_v3_8_4.html`, `projects/spy-ief/` — unchanged from r7.

## Before publishing — fill or confirm
1. `[RENDER_URL]` in `assets/site.js` → done 2026-11-01: `LINKS['bankroll-risk'].app` holds `https://poker-analytics-suite.onrender.com/`.
2. GitHub profile URL (`github.com/Suzanneisgenius`) — confirm.
3. Project years in `PROJECTS` (2026 / 2024–26 / 2026 / 2025) — confirm.
4. Hero third line (the typed one) — edit wording in `index.html`, id `hero-typed`.
5. About: Guangzhou Futures sentence — confirm wording.
6. CV: add `cv/Xinrui_Song_CV.pdf` (public version, no phone/address) and a link in `.hero-links` and the terminal.
7. Poker screenshot: once available, add to `DETAILS['bankroll-risk'].screenshot`.

## Removed from r7 on purpose
Particles, scroll-reveal, stat tiles, evidence matrix, certificate wall, stack cards, decorative motifs (cards / candlesticks / map), BI and Weather projects (now one sentence in About), preview banner, placeholders.

## v8: the spec-sheet system (site-wide)
One ruled component, `.spec` / `.spec-row` / `.spec-item`, carries every block of facts:
- Project page: title → exhibit (real figure if any) → spec sheet (Project / Tools / Open, then key numbers; notes as footnotes) → research question (t2) → My part (body size) → summary → six sections.
- Home rows: title → one-line summary → compact spec row (Project / Tools / Access).
- About: spec sheet (Degree / Graduation / Minors / Certificate / Applying to) → two paragraphs → email line.
Accent colour now appears only on link hover and the terminal caret. No coloured borders, no tiles, no cards.

## v5 changes
- Hero now follows reference 03: portrait → name → two lines → one row of links. About / Education / Contact open a terminal under the links and type their content (4 ms/char, cancel on switch, links disabled while typing, deep links `#t/about`, `#t/education`, `#t/contact`). Projects scrolls down; GitHub / LinkedIn carry ↗.
- Random-walk canvas removed. Contact section removed (contact lives in the terminal; About keeps one email line).
- Portrait: drop `images/portrait.jpg` (square, ≥ 512 px) and it appears automatically, in colour. Without the file the hero simply has no image.
- Terminal content is in three `<template>` blocks in `index.html`; edit text there.

## v4 changes
- Type: IBM Plex Sans 300/400/500. Three sizes (`.t1` 56, `.t2` 28, body 17) plus mono meta 13. Hierarchy by size and grey, not weight (from reference 01).
- Header: brand pill / centred pill nav / dark "Email me" pill with theme toggle (from reference 02). Pill hidden under 760px.
- Ghost nav: fixed right-edge section list, light grey, current section in ink; desktop ≥1100px only (from reference 01).
- Project list: numbered rows 01–04 with year under the number.
- Project page: two-column header (metadata column: Type / Year / My role / Tools / Open; text column: question, summary, My part), fixed side arrows with neighbour numbers on desktop, bottom pager everywhere (from reference 01).
- Hero: live random-walk simulation on canvas (360 walks, absorbing barrier), labelled as a simulation. rAF, ~2.2 s ease-out, static under reduced motion, paused when the tab is hidden, repainted on resize and theme change (motion discipline from reference 02).
- Motion inventory, complete: hero canvas draw, two typing spots, hover colour on titles/links, pill hover background. Nothing else moves.

## Typing effect
Two places: hero third line (on load) and the contact terminal (when it scrolls into view). Content lives in HTML; the script types the plain text then restores the HTML. Plays once per session (`sessionStorage`), skipped under `prefers-reduced-motion`.

## v8.1 (2026-10-31) — pre-publish fixes
- `details.js`: removed the r7 `eyebrow`, `prev`, `next` fields (the renderer never read them; `prev`/`next` pointed at removed projects) and the SPY `actions` flag, so the SPY spec sheet now shows its three key numbers. Poker footnotes and the Malaria coverage label no longer use middle-dot strings. Numbers and caveats unchanged.
- Favicon (`images/favicon-32.png`, `images/apple-touch-icon.png`) and a text-only OG image (`images/og.png`, 1200×630), both drawn with the site tokens. `og:image` is a relative path until the site has a domain; set it to the absolute URL before publishing.
- Still missing from this package: `malaria_dashboard_v3_8_4.html` and `projects/spy-ief/` (copy from the r7 handoff), the Render URL, the CV, the Poker screenshot.
- `site.css`: `.col.wide` is now capped at the viewport minus `--left`; the 920px figure column overflowed horizontally on project pages between about 960px and 1120px.

## v8.2 (2026-11-01) — every project page opens its dashboard
- Copied in from the r7 material: `malaria_dashboard_v3_8_4.html` (1.8 MB) and `projects/spy-ief/` (9.9 MB, with `offline.html`).
- Poker: the full Node app is not deployed yet (no Render service answers at `poker-analytics-suite.onrender.com` or `poker-risk-lab.onrender.com`). Until it is, the page links to the repo's own static publication artifact, copied unchanged from `poker-risk-lab/outputs/github-pages/` (built 2026-11-01 from commit 3fcb028) into `projects/poker-risk-lab/`: a redirect entry, `dashboard/index.html` (saved results, Chart.js inlined) and `case-study/index.html` + `validation.html`. The artifact is the repo's allowlist for public hosting; nothing else from that repo is on this site.
- `site.js` `LINKS`: `second` adds a companion page; `app` is an external live app that renders only once it holds a real `http(s)` URL, with the Render wake-up footnote attached to it. Fill `LINKS['bankroll-risk'].app` after deploying.
- Multi-Factor stays text-only by design (private internship work).
- Portrait replaced (new 800×800 crop).

- 2026-11-01, later: the Node app is live at `https://poker-analytics-suite.onrender.com/` (health check answers with commit 3fcb028). `LINKS['bankroll-risk'].app` now holds that URL, so the Poker page shows "Research overview / Case study / Interactive lab ↗" with the Render wake-up footnote. `projects/poker-risk-lab/case-study/index.html` resynced from the repo build whose footer lists the live URL; the rest of the artifact is unchanged. HANDOFF.md rewritten for v8.2.

## quant branch (2026-11-01) — a quantitative-finance reading of v8.2
This folder (`~/Xinrui-Portfolio`) is a full copy of shell v8.2 (`~/xinrui-site/xinrui-site-v8/site-v3`, also packed as `~/xinrui-site/xinrui-site-v8.2-handoff.zip`). The baseline is untouched; this copy is the version for quantitative-finance programs and quant research readers. Design system, renderer, routes, dashboards and all numbers are unchanged. What differs:
- Home order in `PROJECTS`: Multi-Factor → SPY/IEF → Bankroll Risk → Malaria (was Malaria → SPY/IEF → Poker → Multi-Factor). Same numbered list, same compact spec rows; no grouping.
- Home summaries rewritten in market and risk terms (factors and the backtest contract, stress-day comparisons and the walk-forward volatility check, first-passage cross-check, Malaria presented as the same statistical discipline on public-health data). Every number in a summary already appears in `details.js`.
- `index.html`: meta description and OG description, hero line 2 (financial mathematics; applying to master’s programs in quantitative finance, kept to one line at 1440px), the About and Education terminal tabs, the Projects intro sentence, the "Applying to" spec value and the About paragraphs. Positioning agreed with the owner on 2026-11-01: financial mathematics and stochastic modelling (first-passage and absorbing-boundary risk, Monte Carlo error, Bayesian parameter uncertainty, time-varying dependence), written for admissions readers and research teams alike.
- `details.js`: one wording change only, the em dash in the Multi-Factor "Project Mission" sentence. Numbers, caveats, metrics, strands and the validation table are byte-identical to v8.2.
- Not changed: `site.css`, `spy-figure.js`, `images/`, `malaria_dashboard_v3_8_4.html`, `projects/`, `LINKS`, `CONTRIBUTION`.
- 2026-11-02: GitHub removed from this copy at the owner's request (the hero link row and the Contact terminal line). Public contact here is email and LinkedIn only; HANDOFF §5 item 1 does not apply to this copy.
- 2026-11-02, copy draft v2 (owner-approved): hero line 2 is now "Quantitative research on futures signals and portfolio risk" (owner trimmed "; applying for fall 2027" later the same day so the line stays on two lines at 1440px; fall 2027 lives in the About spec sheet). The About tab is one paragraph built on the Guangzhou Futures internship (summer 2026: 54 commodity futures, five sectors, eight fundamental factors, IC/ICIR and quintile backtests); the Education tab lists mathematics and computing courses, methods and tools, with the stochastic-processes grade note kept. The About section gains an Experience spec item (Guangzhou Futures 2026; China Everbright Securities 2025; Guangdong Bozhong 2024–25), an "Applying to" value with fall 2027, and four new paragraphs (internship, the two data-quality internships with the 3,000,000 / 1,000,000 / 95.6% → 98.4% figures, the three public projects, coursework builds). Resume figures were checked by the owner's parent session; site figures (6,082) match `details.js`. Home order is now SPY/IEF → Bankroll Risk → Multi-Factor → Malaria, and the Multi-Factor year in `PROJECTS` is 2026 (internship May–Aug 2026; the old 2025 was an r7 guess). `details.js` untouched.
- 2026-11-02, SPY/IEF atlas update (quant copy only): `projects/spy-ief/` replaced by the accepted delivery `portfolio_delivery/public/projects/spy-ief/` (presentation revision labels-2026-10-08; `index.html` 0.88 MB, `offline.html` 8.2 MB, `assets/` unchanged; the delivery's `verify_delivery.py` passed 285 hashes before copying). Plotly loads from `cdn.plot.ly/plotly-4.1.1.min.js` on the online page; the offline file embeds it. `details.js` SPY entry rewritten from the delivery's `project-card.json` and `PROJECT_COPY_EN.md`: tagline is the delivery's one-sentence conclusion (77.6% / 40.0% / 48.6%), sections are Methods, My part, Results, Scope and limitations, in that order; the opening "My part" block is replaced by the section for this project only (`contribution` removed, no `CONTRIBUTION` entry). Home summary for SPY/IEF is the card's `summary`. Links stay relative (`projects/spy-ief/`, `projects/spy-ief/offline.html`), so a subpath deployment needs no change. Baseline `xinrui-site-v8/site-v3` still carries the r7 atlas. Verified at `127.0.0.1:8011` in the app browser: home row, detail page, seven atlas tabs, Plotly and SVG assets, offline file, 390px and 1440px. Not deployed anywhere yet.
- 2026-11-02, published: this folder is now a git repository (branch `main`; `.gitignore` excludes `.claude/` and `.DS_Store`; `.nojekyll` added so Pages serves the dashboards as-is). Remote `github.com/Suzanneisgenius/Xinrui-Portfolio` (public; created as `quant-finance-portfolio`, renamed the same day). GitHub Pages builds from `main` / root, so every push to `main` redeploys within about a minute at the same address: `https://suzanneisgenius.github.io/Xinrui-Portfolio/`. `og:image` is now that absolute URL (HANDOFF §5 item 7 done for this copy). Verified live on 2026-11-02: home, `/#/bankroll-risk`, both poker pages, the SPY/IEF atlas and offline file, the Malaria dashboard and `images/og.png` all return 200; no console errors. Commit messages carry no Co-Authored-By line, as the owner asked.
- 2026-11-03, Poker page synced to the Cyber Data Lab r8 release (`portfolio_releases/Cyber_Data_Lab_r8_2026-11-02/CHANGES.md`): `details.js` `bankroll-risk` rewritten (title "Poker Risk Lab", subtitle, question, tagline, chips with Node.js, four metrics, four strands, five-row validation table, six sections) and `site.js` home summary and `CONTRIBUTION` updated to the same source. Every number comes from poker-risk-lab commit 7b35a0a (case-study saved results, README, `checks/engine-agreement/results.json`) and was checked against the case-study data already hosted in `projects/poker-risk-lab/`; the r7 figures (7.2%, 37.4%, 27.3%, 1.44×, Markov 0.068) are gone because the current repo keeps no saved result for them. New exhibit `images/poker-risk-lab-app.jpg` (1280×800, Risk Lab "Positive edge" scenario). Not carried over from r8: the "Source code" link to GitHub, since GitHub is kept off this copy; the case-study link stays on the hosted copy rather than Render's. `LINKS`, `projects/poker-risk-lab/` and the design system unchanged.
- 2026-11-03, clickable exhibits: a project screenshot now links to the live thing it shows (the external app when `LINKS[id].app` holds a URL, else the hosted dashboard) and carries an always-visible "Open the …" label in the header CTA pill style (`.figure-link`, `.open-label` in `site.css`; `figure()` in `site.js`). SPY/IEF gets its first screenshot, `images/spy-ief-atlas.jpg` (1280×800, the atlas overview captured from the live site with headless Chrome on 2026-11-03), shown above the existing data figure; Poker links to the Render app, Malaria to its dashboard. `screenshotSize` on each entry reserves the image box before it loads. The spec sheet's "Open" row is unchanged.
- 2026-11-03, moved: the quant copy now lives in its own top-level folder, `~/Xinrui-Portfolio` (same name as the GitHub repository), no longer under `~/xinrui-site` beside the data-science baseline. The baseline stays at `~/xinrui-site/xinrui-site-v8/site-v3` and is a different site; nothing from it is synced here. A note at `~/xinrui-site/XINRUI-PORTFOLIO-QUANT-MOVED.md` points to the new location.
- 2026-11-03, new project 04 "Promised Delivery Dates on Olist" (`olist-delivery-promises`), placed before Malaria: entries in `PROJECTS`, `CONTRIBUTION`, `LINKS` (site.js) and `DETAILS` (details.js), exhibit `images/olist-delivery-diagnostics.jpg` (1280×800, the project site overview captured with headless Chrome on 2026-11-03), home intro reworded for five projects. Every number was recomputed from the Olist repository's saved results (`outputs/e1/posthoc/posthoc_v.json`, `outputs/e1/score_verification.csv`, `docs/STAGE7_DATE_POLICY.md`, `docs/manager_handoff.md`, `docs/E1_DECISIONS.md`); improvements under 6% are left out on the owner's instruction. The "Open" link goes to the hosted project site, not the repository.
- 2026-11-03, spec-sheet legibility: `.spec-l` labels go from 11px `--faint` (about 1.9:1 on paper) to 13px `--muted` (about 4.9:1), matching `.meta`; headline numbers (`.spec-item.num .spec-v`) from 20px weight 300 to 24px weight 400 (20px under 560px). Site-wide, so every project page and the home list change together.
