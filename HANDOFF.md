# HANDOFF — Xinrui Song application site (shell v8.2, 2026-11-01)

> **This folder is the quant branch.** `~/xinrui-site/xinrui-site-quant` is a full copy of shell v8.2, made on 2026-11-01 for a quantitative-finance reading of the same site. The baseline is `~/xinrui-site/xinrui-site-v8/site-v3` (also packed as `~/xinrui-site/xinrui-site-v8.2-handoff.zip`); do not edit the baseline from here. Everything below describes the shared shell and still applies. What this copy changes is listed in `README.md` under "quant branch": home order (SPY/IEF → Bankroll Risk → Multi-Factor → Malaria, Multi-Factor year 2026), home summaries, hero line 2 ("Quantitative research on futures signals and portfolio risk"; fall 2027 is in the About spec sheet only), the About and Education tabs, the Projects intro and the About section (Experience row, internship and data-quality paragraphs with resume figures, copy draft v2 of 2026-11-02). Numbers, caveats, dashboards, links and the design system are unchanged, except that GitHub is removed from this copy (hero row and Contact tab; §5 item 1 does not apply here). Local preview for this copy: `python3 -I -m http.server 8011 --directory ~/xinrui-site/xinrui-site-quant --bind 127.0.0.1`. **Published:** this copy is a git repository pushed to `github.com/Suzanneisgenius/Xinrui-Portfolio`, served by GitHub Pages from `main` / root at `https://suzanneisgenius.github.io/Xinrui-Portfolio/`; a push to `main` redeploys it at the same URL. §5 item 7 (absolute `og:image`) is done here; §9's "not a git repository" note applies to the baseline only.

Read this before changing anything. Static site, no build step, no dependencies. Then read `docs/SKILL-minimal-portfolio-design.md` for the design system behind it.

## 0. State of this package

Everything a reader can click now works from this folder alone:

- Malaria, SPY/IEF and Poker project pages each open their dashboard from the spec sheet's "Open" row. Poker opens three things: the static research overview, the case study, and the live interactive lab on Render. Multi-Factor is text only, on purpose.
- Favicon, Apple touch icon and an OG image are in place. The r7 renderer bugs (dead fields, middle-dot strings, SPY key numbers hidden, figure column overflowing at 960–1120px) are fixed.
- Verified locally on 2026-11-01 at `http://127.0.0.1:8010`: every "Open" target returns 200, the Poker page shows "Research overview / Case study / Interactive lab ↗" with one footnote about Render wake-up, no console errors. The Render service answered `/api/health` with `{"ok":true, "commit":"3fcb028…"}`; a cold start took about 21 s.

Not done, and only the owner can do it: §5 below. Nothing in this folder is a git repository.

Run locally: `python3 -m http.server 8000` from this folder, open `http://127.0.0.1:8000/`.

## 1. What this is

A personal site for graduate applications. Readers are admissions committees and potential advisors. Its job: show four projects with the question, data, my part, method, result with uncertainty, and limits. Some project code and data are private; the site presents method and results only.

## 2. File map

| File | Role | Touch? |
|---|---|---|
| `index.html` | Shell: head (title, description, OG tags, icons), header, hero + terminal templates, project list root, About, footer | Yes |
| `assets/site.css` | All tokens and layout. Colors at the top of the file | Yes |
| `assets/site.js` | `PROJECTS` (home order, year, type, role, summary, tools), `LINKS` (each project's entry points, see below), `CONTRIBUTION`, detail renderer, hash router, terminal typing, ghost nav | Yes |
| `assets/details.js` | Project copy carried over from r7: title, headline, tagline, chips, metrics, sections, strands, validation | Edit text only; keep numbers and caveats exactly |
| `assets/spy-figure.js` | Real SPY/IEF chart as an HTML string (472 KB, deferred) | No |
| `images/portrait.jpg` | 800×800 portrait (replaced 2026-10-31) | Replace only with a square photo |
| `images/malaria-overview-v3_8_4.jpg` | Malaria dashboard screenshot, the exhibit on that page | No |
| `images/favicon-32.png`, `images/apple-touch-icon.png`, `images/og.png` | Icons and the 1200×630 share image, drawn with the site tokens, text only | Redraw only if the name or tokens change |
| `malaria_dashboard_v3_8_4.html` | Malaria dashboard from r7 (1.8 MB, self-contained) | No |
| `projects/spy-ief/` | SPY/IEF atlas, delivery revision labels-2026-10-08 (quant copy, 2026-11-02; r7 version remains in the baseline): `index.html`, `offline.html` (download), `assets/` (9.9 MB). Online page loads Plotly from CDN | No. Replace the whole folder from a new delivery, then re-sync the SPY entry in `details.js` |
| `projects/poker-risk-lab/` | The poker-risk-lab repo's own static publication artifact, copied unchanged from its `outputs/github-pages/`: redirect `index.html` → `dashboard/`, `dashboard/index.html` (saved results, Chart.js inlined), `case-study/index.html`, `case-study/validation.html`, two licence files | No. Rebuild in that repo (`npm run build:pages`) and recopy; never copy anything else from it |
| `docs/SKILL-minimal-portfolio-design.md` | The design system as a reusable skill | Read first |
| `README.md` | Version history v3 → v8.2 | Append |

`LINKS` in `site.js`, one object per project id: `dashboard` (page served by this site) + `dashboardLabel`; optional `second` (companion page), `offline` (downloadable file, rendered with `download`), `app` (external live app, rendered with ↗ only when it holds an `http(s)` URL) and `hint` (becomes the footnote attached to `app`). Projects without `dashboard` get no "Open" row. Key numbers from `details.js` render only when `d.metrics` exists and `d.actions` is unset.

Routes: `/` home; `/#/<id>` project page (`health-dashboard`, `spy-ief-research-atlas`, `bankroll-risk`, `quant-platform`); `/#t/about`, `/#t/education`, `/#t/contact` open a hero terminal tab; `/#projects`, `/#about` scroll.

## 3. Design system (do not drift)

Sources: reference 01 (TAO, architecture portfolio) for typography, project template and ghost nav; reference 02 (pepper) for the header and motion discipline; reference 03 (Liyi Zhou) for the hero formula and the terminal; reference 04 (website-zero-to-live) for the project-page sections and the privacy boundary. Full notes live in the Claude Project "个人网页制作" under `参考分析/` and `设计方案-v1.md`; the distilled version is `docs/SKILL-minimal-portfolio-design.md`.

Type. IBM Plex Sans 300/400/500 and Plex Mono 400 from Google Fonts. Three sizes plus one meta size:
- `.t1` 56px/300 (name, project title); 38px on mobile
- `.t2` 28px/300 (section titles, project-row titles, research question, body h2)
- body 17px/400, line-height 1.6, max 34em
- `.meta` / `.mono` 13px mono, muted
Hierarchy comes from size and grey, never from bold. No all-caps labels, no middle-dot strings, no → on links, external links carry ↗ via `.ext`.

Color. `--paper #F6F7F5`, `--ink #1C1F1D`, `--muted #6A716C`, `--faint #B4BAB6`, `--line #DDE2DE`, `--accent #1F3A5F`. Accent appears only on link hover and the terminal caret. Dark theme exists (`html[data-theme="dark"]`), toggled from the header pill, stored in `localStorage`. Terminal: `#0F1117` / `#E6E7EB` / links `#8AB4F8` / prompt `#6CFF6C`. It is the only dark block on the site.

Layout. Hero is centred. Everything below sits in a 680px column offset from the left by `--left` (`clamp(20px, 12vw, 200px)`), 920px for figures (`.col.wide`, capped at the viewport minus `--left`). Section spacing 112px desktop, 72px mobile. No cards, no shadows on content, no rounded boxes except the header pills, the portrait and the terminal.

Header (from 02). Fixed, three parts: brand pill left, centred pill nav (Projects / About / Contact, real anchors, current section highlighted), dark "Email me" pill right with the theme toggle inside. Pill nav hides under 760px.

Ghost nav (from 01). Fixed right-edge list of section names in `--faint`, current in `--ink`, desktop ≥1100px only, home view only.

Hero (from 03). Portrait → name → two lines → one row of links. About / Education / Contact open the terminal under the row and type their content (4 ms per character, newline pause 24 ms, other links disabled while typing, switching cancels the run). Content lives in three `<template>` blocks in `index.html`; the script types the plain text then swaps in the HTML so links work. Static under `prefers-reduced-motion`.

Spec sheet (the one fact component, site-wide). `.spec` > `.spec-row` > `.spec-item` (`.spec-l` label 11px mono faint, `.spec-v` value 14px mono ink; `.num` values 20px sans light). Ruled by 1px lines above and below. Used in: project page (Project / Tools / Open, then key numbers; notes become numbered footnotes in `.spec-notes`), home rows (`.spec-row.compact`: Project / Tools / Access), About (Degree / Graduation / Minors / Certificate / Applying to).

Project page order (01 template + 04 sections). Crumbs `03 / 04` + All projects → title → subtitle → exhibit (real figure if the project has one) → spec sheet → research question in `.t2` → "My part" at body size → summary in muted → the six sections from `details.js` (SPY/IEF, since 2026-11-02: no opening "My part" block; the order asked for in its delivery is question → one conclusion → Methods → My part → Results → Scope, so "My part" is section 02 there) (Poker: four error strands after Methodology, cross-validation table after Validation) → pager. Fixed side arrows with neighbour numbers on desktop.

Motion inventory, complete. Terminal typing; title and link colour on hover (200 ms); pill hover background. Nothing else moves. No scroll-reveal, no particles, no parallax, no count-ups.

## 4. Content rules (from 04 and the r7 handoff)

- Never invent numbers, awards, screenshots or results. Where a figure is unknown, say so or leave it out.
- Keep caveats attached to numbers: the Malaria −0.43% carries its 95% CI; the Poker 7.17% is the exact model risk for one reference case, and its three error sources (±1.13 pts simulation noise, 0.1%–83.3% from an uncertain win rate, 6.4%–20.3% across return models) are reported side by side, never summed; SPY/IEF lines are return indices, not prices; recent correlations have intervals that include zero.
- Hidden links, `noindex` and robots are not access control. Private project material does not go on the site; the Multi-Factor page describes method only. From the poker repo, only `outputs/github-pages/` may be hosted here (its `GITHUB_PAGES.md` is the allowlist).
- Public contact is the Gmail address and LinkedIn. No phone, no home address.
- Copy voice: short sentences, plain verbs, student-authentic. Run new prose through the humanizer check: no "not X but Y", no one-line closers, no triads for rhythm, no em dashes, no "showcase / leverage / passionate / journey".

## 5. Before publishing — fill or confirm (owner only)

1. GitHub profile URL `github.com/Suzanneisgenius` (appears in `index.html` twice and the contact template). Confirm.
2. Project years in `PROJECTS`: 2026 / 2024–26 / 2026 / 2025 were inferred from the r7 handoff. Confirm.
3. CV: add a public version (no phone or address) at `cv/Xinrui_Song_CV.pdf`, then add a `CV ↗` link to `.tabs` in the hero and to the contact template.
4. Poker screenshot: done in the quant copy on 2026-11-03 (`images/poker-risk-lab-app.jpg`, the Risk Lab "Positive edge" scenario from the local app at 7b35a0a; `DETAILS['bankroll-risk'].screenshot` and `screenshotAlt` set). Still open in the baseline.
5. Multi-Factor: either add one de-identified equity/drawdown figure the same way, or accept that the page stays text-only.
6. Hero line 2 wording and the About paragraphs are drafts; edit in `index.html`.
7. `og:image` in `index.html` is a relative path; make it the absolute URL once the site has a domain.
8. Poker repo housekeeping (outside this folder): `~/poker-analytics-private` `main` is pushed (7b35a0a at `origin/main`, checked 2026-11-03). Whether Render has redeployed to it has not been checked from here; the static artifact in `projects/poker-risk-lab/` was built from 3fcb028, and the saved case-study results it carries match the 7b35a0a numbers used on the Poker page.
9. Optional trims: Poker "My part" is nine sentences; three or four would read better. Poker spec sheet has four footnotes; two would do.
10. Optional, quant copy only: a fifth project on commodity futures built from public data. Not added in the 2026-11-02 round. It needs its own six sections in `details.js`, a `PROJECTS` entry, and at least one real figure before it goes on the list.

Done since v8: the Render URL (was `[RENDER_URL]`, now `LINKS['bankroll-risk'].app`), favicon and OG image, the two r7 dashboards copied in, the portrait.

## 6. Pre-publish checklist (from 04)

Mobile 390px and desktop 1440px; keyboard focus visible on every link and the theme toggle; no horizontal overflow; deep links `/#/bankroll-risk` and `/#t/contact` work after refresh; images and fonts load; `<title>` and `<meta name="description">` present; favicon and OG image present; the Render link wakes and the dashboards open.

Status 2026-11-01: overflow fixed and rechecked; deep links, icons, meta, dashboards and the Render link verified in a desktop browser at 127.0.0.1. Re-run the 390px pass and the keyboard-focus pass on the final host before announcing the URL. The r7 atlas had two `<img>` elements with an empty `src`; in the labels-2026-10-08 atlas (quant copy, 2026-11-02) those two images carry `data-src` and load on demand, no empty `src`.

## 7. Removed on purpose from r7 — do not bring back

Particle background, scroll-reveal on sections, stat tiles (06 / 3.95 / 04), evidence-ledger matrix, certificate wall, stack cards, "XS" hero card with quote, decorative motifs (playing cards, candlesticks, map), preview banner, `[FILL]` placeholders, BI dashboard and Weather app as projects (now one sentence in About), Fraunces / Inter / JetBrains Mono (replaced by Plex), the random-walk hero canvas tried in v4.

## 8. What changed between v8 and v8.2

Details per version are in `README.md` (v8.1, v8.2). In short: renderer and copy fixes that needed no new material; icons and OG image; the `.col.wide` overflow; the two r7 dashboards and the poker static artifact copied in; `LINKS` generalised so each project declares its own entry points; the live Render URL filled and the poker case-study page synced to the repo build that lists it; new portrait.

## 9. Working notes for the next session

- Where things live. Site: `~/xinrui-site/xinrui-site-v8/site-v3` (this folder). r7 source material, including the two dashboards: `~/Desktop/portfolio准备材料/`. Poker repo: `~/poker-analytics-private` (remote `github.com/Suzanneisgenius/poker-risk-lab`; `render.yaml` service `poker-analytics-suite`, free plan; `npm run build:pages` rebuilds `outputs/github-pages/`).
- Commits. This folder is not a git repository. If one is created, commit messages carry no `Co-Authored-By` line and no "Generated with" footer. The owner asked for this explicitly.
- Skills. For UI edits here use the project's own rules above (the owner's global instructions map "edit UI in an existing project" to `ui-ux-pro-max`, with the project's design rules taking priority). Do not run a redesign skill on this site unless asked by name.
- Preview. `~/xinrui-site/.claude/launch.json` defines a `python3 -I -m http.server 8010` config. If the app's preview tool ignores it and starts something else, serve by hand in the background: `python3 -I -m http.server 8010 --directory <this folder> --bind 127.0.0.1` and open `http://127.0.0.1:8010`.
- Browser cache bites after editing `assets/*`: run `await fetch('/assets/site.js', {cache: 'reload'})` (and the other changed files) before `location.reload()`.
- Syntax check after editing scripts: `node --check assets/site.js assets/details.js`.
- The Poker "Interactive lab" link and its footnote appear only because `LINKS['bankroll-risk'].app` holds an `http(s)` URL. Empty the field and both vanish; no other edit needed.
