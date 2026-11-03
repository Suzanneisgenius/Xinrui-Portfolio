---
name: minimal-portfolio-design
description: Design or review a personal, portfolio or application website in the quiet editorial style distilled from three references (TAO architecture portfolio, pepper hero, Liyi Zhou terminal homepage). Use for any personal-site build, restyle or critique, and to strip AI-template tells from a page.
---

# Minimal portfolio design

A compact system for personal and application sites, distilled on 2026-10-30 from four references and applied to Xinrui Song's site. Use it to build, restyle or critique. When the user's brief contradicts a rule here, the brief wins; say which rule you dropped.

## The four references, in one line each

- 01 TAO (architecture portfolio, xiaohongshu @米理混子). One typeface, three sizes, weight ≤ Regular, hierarchy by size and grey. Ghost labels of the previous and next section at the viewport edges. Identical project template: number, title, one-line subtitle, metadata column, two or three sentences, image grid. Thumbnails grayscale, colour on hover. Lesson against it: 10px body text, a hero with zero information, full-viewport sections with too little content.
- 02 pepper (NOVA/FORM hero, GitHub wangziyun20001018-ops/pepper). Three-part header: brand left, centred pill nav with backdrop blur, dark pill CTA right. Motion done with requestAnimationFrame plus interpolation, stops when settled, off under prefers-reduced-motion and on touch, keyboard reachable. Lesson against it: nav made of spans that go nowhere, 8px text on phones, two stacked dot-grid textures, a whole-viewport click target.
- 03 Liyi Zhou (lzhou1110.github.io, Sep 2025 commit fe40ae9). 9 KB single file. Portrait, name, two lines, one row of text links; internal tabs open a dark terminal that types `> open hiring` at 4 ms per character, links disabled while typing, switching cancels; external links carry ↗; `#hash` deep links; system fonts. Lesson against it: content that exists only in JavaScript strings. The author replaced the terminal in 2026 with cards and SEO pages, so keep terminal content in HTML too.
- 04 website-zero-to-live (agent skill, no visuals). Project page as six parts: background, my role, method and trade-offs, artefacts, verifiable result, limits. Decide public / masked / off-site before designing. Hidden links and noindex are not access control. Never invent numbers, awards or testimonials.

## The system

Type. One sans family with a 300 weight plus its mono (IBM Plex Sans + Plex Mono worked). Four steps only: display 56/300, heading 28/300, body 17/400 at line-height 1.6 and max 34em, meta 13 mono muted. Mobile: 38 / 24 / 16 / 13. No bold for hierarchy, no all-caps labels, no middle-dot strings, no arrow suffixes, ↗ on external links only.

Colour. Five tokens: paper (off-white with a slight cool cast, e.g. #F6F7F5), ink, muted, faint, line, plus one accent used only on link hover and a caret. Dark theme by swapping tokens. One dark block on the whole site (the terminal: #0F1117 / #E6E7EB / #8AB4F8). Avoid the three AI default palettes: cream + terracotta, near-black + acid green, pure grayscale everywhere.

Layout. Hero centred. Content in a 680px column offset from the left edge (clamp(20px, 12vw, 200px)); figures may widen to 920px. Section gap 112px desktop, 72px mobile. No cards, no content shadows, no rounded boxes except pills, the portrait and the terminal.

Header. Brand pill / centred pill nav with real anchors and current-section state / dark CTA pill with the theme toggle inside. Pill nav hidden under 760px.

Ghost nav. Fixed right edge, section names in faint grey, current in ink, desktop ≥1100px only.

Hero. Portrait (square, colour) → name → two lines (identity; direction) → one row of links. Two or three of the links open a terminal below that types its content; the content lives in `<template>` blocks and is swapped back in as HTML when typing ends. Deep links `#t/<tab>`. Static under reduced motion.

Spec sheet. One ruled fact component for the whole site: rows of label-over-value items, mono, 1px lines above and below. Use it for project metadata and key numbers (notes as numbered footnotes), for compact rows in a project list, and for degree facts in About. Never stat tiles, never "big number + tiny label" rows.

Project page. Crumbs `03 / 04` → title → subtitle → exhibit (a real figure, or nothing) → spec sheet → research question as a 28/300 line → "My part" at body size → summary → the six sections → pager with fixed side arrows on desktop.

Motion inventory. Terminal typing; hover colour on titles and links at 200 ms; pill hover background. Nothing else. No scroll-reveal, particles, parallax, count-ups, or decorative simulations.

## AI-template checklist

Reject a page if it has: dark background with one neon accent and floating particles; identical rounded cards with the same soft shadow; mono all-caps eyebrow labels (`// PROJECTS`); `A · B · C` meta strings; → after every link; 01/02/03 numbering on content that is not a sequence; three big-number tiles counting things that are not achievements; scroll fade-in on every section; three typefaces; hero copy like "I build X that Y" or "Let's connect."; a decorative hero graphic with no data behind it.

## Content rules

Short sentences, plain verbs, the writer's own voice. Numbers keep their intervals and caveats. Unknown stays unknown. Private material stays off the site; describe method and results. Public contact is one email and one professional profile. Run new prose through the humanizer check before shipping.

## Workflow

1. List what is public, masked, off-site. 2. Gather real content and figures first. 3. Build one full path: hero, one complete project page, contact. 4. Screenshot at 1440 and 390, check keyboard focus and reduced motion. 5. Walk the checklist above; remove one thing. 6. Only then style the rest.
