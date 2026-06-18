# CSMISR — SESSION CHECKPOINT

**Last updated:** 2026-06-18 · **Branch:** `main` · **Remote:** `github.com/nourabulnasr/Concrete-Surgeons-website`
**Phase status:** ✅ **PHASE 2 COMPLETE + PHASE 3 DEPLOYED.** All items #1–#12 done, committed, pushed.
**Live preview:** https://csmisr-site.vercel.app (Vercel project `nour-abulnasrs-projects/csmisr-site`; csmisr.com NOT attached).

> If the laptop crashes: code on disk + this file + `HANDOFF.md` + commits on GitHub = full recovery.

---

## RESUME HERE (next session)

**Phase 2 is finished — do NOT redo any of it.** What's left is client-dependent +
optional polish. See **`HANDOFF.md`** for the full client checklist, DNS records, and env vars.

Open items awaiting the CLIENT (not code work):
1. Founder photo → `public/team/founder.jpg` + set `FOUNDER_PHOTO` in `AboutContent.tsx`.
2. Demo video links → fill `provider`+`id` in `VideoDemos.tsx`.
3. Carbon-fibre (CFRP) section — Nour to decide if wanted (currently skipped).
4. When going live: add DNS (Vercel A/CNAME + Resend SPF/DKIM/MX), set env vars
   (`RESEND_API_KEY`, `CONTACT_EMAIL`, `SALES_EMAIL`), flip Resend `from:` to noreply@csmisr.com.

Performance note (mobile Lighthouse): CLS 0 ✅, TBT ~100ms ✅, **LCP ~2.7–3.2s (lab, noisy)** —
hero text is the LCP element; fully optimised in code, residual is cold TTFB + brand display
font. Hero font is `display:'optional'` (slow connections see a condensed fallback) — switch to
`'swap'` in `[lang]/layout.tsx` if Nour wants Big Shoulders always. Re-validate via PageSpeed
Insights once the domain is attached.

Decisions locked this session: recolour APPROVED · green LEADS/WhatsApp kept semantic ·
founder square → real photo slot (client supplies). Approved Phase-1 colours/assets unchanged.

Build: `npm run build` passes · `npm audit` = 0 vulnerabilities. Dev: `npm run dev`.
Stack now Next **16.2.9** (was 16.2.6). New homepage sections: CertGallery, QualityPrice,
PreQualification, VideoDemos (in `src/components/home/`). The old 3D `HM500*` components +
three/R3F/drei deps are now UNUSED (product reveal uses a real PNG) — safe to remove later.

--- (history below) ---

Prior colour/system notes (still accurate):
- Colours are **INLINE `oklch()` literals inside `style={{}}`** — NOT Tailwind tokens. Live hero = dark `CinematicHero.tsx`.
- **Lenis** owns smooth scroll → screenshot scroll positions via `window.scrollTo({behavior:'instant'})` works in Playwright.
- Recolour review screenshots (outside repo): `C:\Users\noura\OneDrive\Desktop\csmisr\csmisr-*.png`.

### Recolour — what shipped (item #1)
- Amber accent split by ROLE: **BLUE** `oklch(41% 0.144 264)` = brand/structure (logo, eyebrows, section indices, focus, rules, ::selection); **RED** `oklch(51% 0.207 29)` = product + CTAs (all `ProductReveal`, filled buttons with WHITE text, comparison winner column, primary contact links). RED hover `oklch(44% 0.20 29)`.
- Warm cream/ink neutrals (hue 75/80) + all `stone-*` utilities → cool **GREY** ramp hue 264. Steel hue 240 → 264. Body text grey-600+ (≥4.5:1).
- Green (hue 145) + pale-red error (hue 28) kept as **semantic states** (not brand).
- Done via a one-pass Python script (dry-run verified, then `--apply`, then deleted). Build passes; 0 amber/stone/warm literals remain.

### OPEN FLAGS — awaiting Nour's decision
1. **Green "LEADS" tags + WhatsApp icon** kept green (semantic). Switch to red/blue for brand cohesion, or leave?
2. **"KA" founder square (About)** = the amber-initials-square anti-pattern (CLAUDE.md forbids). Recoloured blue for now; should become a real founder photo — add to scope?
3. Desktop 3D product reveal not screenshotted (Lenis). Trust code, or capture another way?

---

## THE THREE BRAND COLOURS (sampled from real artwork — APPROVED by Nour 2026-06-17, shipped in item #1)

| Role | Hex | OKLCH (token system) | Source |
|---|---|---|---|
| **BLUE** — brand / structure | `#204498` | `oklch(41% 0.144 264)` | Concrete Surgeons "CS" mark (`public/logo.jpg`), sampled 306 px |
| **RED** — product + CTAs | `#C20809` | `oklch(51% 0.207 29)` | HORSE / HM-500 logo + stat accents (rendered from `Horse company 2025.pdf`) |

**Replaces** the current single amber accent `oklch(60% 0.20 65)` — used site-wide in
`globals.css` (`.label-eyebrow`, `.accent-rule`, `:focus-visible`, `::selection`) and CTAs.

### Proposed neutral GREY scale (concrete/steel, hue 264, near-zero chroma)
| Token | OKLCH | ≈ Hex |
|---|---|---|
| grey-50 | `oklch(98.5% 0.002 264)` | `#FAFAFB` |
| grey-100 | `oklch(96% 0.003 264)` | `#F1F2F4` |
| grey-200 | `oklch(92% 0.004 264)` | `#E3E5E9` |
| grey-300 | `oklch(86% 0.005 264)` | `#CFD2D8` |
| grey-400 | `oklch(70% 0.006 264)` | `#9DA1AB` |
| grey-500 | `oklch(58% 0.006 264)` | `#797E89` |
| grey-600 | `oklch(48% 0.007 264)` | `#5C6069` |
| grey-700 | `oklch(38% 0.008 264)` | `#43464E` |
| grey-800 | `oklch(26% 0.009 264)` | `#2A2D34` |
| grey-900 | `oklch(16% 0.011 264)` | `#181A20` |
| grey-950 | `oklch(11% 0.012 264)` | `#0E0F14` |

**Contrast (re-verify in Phase 2):** Red on white ≈ 6.0:1 · Blue on white ≈ 8.9:1 ·
white on red CTA ≈ 5.6:1 — all pass AA.

---

## ASSET MAP — `../client-assets/` holds 5 PDFs ONLY (no loose images/logos)

All images/logos/certs/product shots are embedded inside these PDFs. Rendered with PyMuPDF to verify.

| PDF | Pages | Maps to edit | Contents |
|---|---|---|---|
| **CS profile and qualifications.pdf** | 28 | #3 pre-qual, #10 quality | CS company profile, demolition cover, project photos, qualifications |
| **Horse company 2025.pdf** | 12 | #8 brand, brand RED | HORSE (Shanghai Horse Construction) profile + red logo + stats |
| **Epoxy Anchor HM-500.pdf** | 42 | #8 real product | Real HM-500: two red epoxy cartridges on white + HORSE logo. **Page 1 = product shot for scroll-rotate section.** |
| **technical submittal 59.pdf** | 59 | #4 certs, #10 specs | Blue+red submittal. Specs (390ml, 3:1, visc 18–22, density 1.5). **Certs/accreditations on pages 27–30 + 52** (CTC, CNAS, ILAC-MRA, CMA). Footer contact below. |
| **Carbon Fiber System Presentation.pdf** | 37 | (extra, not in list) | Carbon-fibre strengthening system — optional section if Nour wants it |

**Real contact details found** (technical submittal footer): `contact@csmisr.com` · `+20 102 858 8003` · `www.csmisr.com`.

**Existing repo assets:** client logos already in `public/clients/` (cnbm-sinoma, dchc, gsk,
horizon-egypt, ministry-housing, petrojet, saffarini, sika). Project photos in `public/projects/`.

---

## OPEN FLAGS / QUESTIONS (asked Nour — awaiting answers)
1. **Certs (#4)** are PDF pages, not image files → plan: extract pages 27–30 + 52 of `technical submittal 59.pdf` as images for the gallery, link full PDF "open in tab". Confirm, or provide hi-res cert scans.
2. **HM product shot (#8):** extract the two-cartridge image from HM-500 PDF page 1 (cutout). Confirm that's the shot.
3. **Pre-qual images (#3):** extract strongest project photos from CS profile PDF; client/contractor logos already in `public/clients/`.
4. **Carbon Fiber PDF** — ignore or add a section?
5. **Demo videos (#7) & prices (#10):** none found → scaffold video slots + "request a quote". Confirm no prices exist.

---

## PHASE 2 PLAN (build top-down, COMMIT + PUSH after EACH item)
1. ~~**RECOLOUR**~~ ✅ **DONE 2026-06-17 (commit `3dad380`)** — amber → Blue/Red/Grey, neutrals + stone-* → grey 264, contrast verified, build passes. Awaiting Nour's sign-off + flag answers before #2.
2. Hero: remove the numbers (#2).
3. Re-file diamond saw cutter under Controlled Demolition (#11).
4. HM certificates (#4): clickable gallery — lightbox for images, open-in-tab for PDFs.
5. Product section (#8): real HM product in scroll-rotate section; media SWAPPABLE for a future turntable video. Show for approval.
6. Pre-qualification section (#3): extra site/project images + contractor/client logos as a credibility band.
7. Contact + Sales emails (#6): display contact@ / sales@csmisr.com + Contact/Sales toggle on form.
8. Quality / Price (#10): section from client content — "request a quote" (no real prices).
9. Demo videos (#7): embed slots for unlisted YouTube/Vimeo; placeholder if no links yet.
10. OG image: switch to dynamic `opengraph-image` route; remove hardcoded 512 logo.jpg override.
11. Safe dep bump: Next 16.2.6 → 16.2.9 + safe minors; rebuild; confirm postcss audit clears.

## PHASE 3 (deploy + handoff)
- Deploy to **Vercel PREVIEW URL** (no custom domain — client owns csmisr.com DNS).
- Write `HANDOFF.md`: exact DNS records — Vercel domain (CNAME/A) for csmisr.com + Resend SPF/DKIM/MX. After they add records: point csmisr.com, flip contact from-address → `noreply@csmisr.com`, route leads to client inbox. Until then form stays as-is.
- Mobile Lighthouse on preview; fix only LCP<2.5 / CLS<0.1 / INP<200 (suspects: 3D section + Lenis).
- Final: write csmisr memory entry.

---

## ENVIRONMENT / TOOLING NOTES
- Stack: Next 16.2.6, React 19.2.4, Tailwind v4 (`@theme` in `globals.css`, no config file), Motion v12, GSAP, Lenis, R3F/three, Resend, lucide-react.
- Repo root: `C:\Users\noura\OneDrive\Desktop\csmisr\csmisr\csmisr-site`. client-assets one level up: `..\client-assets\`.
- Fonts: Barlow Condensed (display), Chivo (body), Cairo (arabic), Big Shoulders (incident "26").
- `impeccable` skill + named agents NOT installed — apply quality bars manually. `frontend-design` + `WEBDEV_BRAIN` available.
- No ImageMagick/Ghostscript on machine. **PyMuPDF installed** (`python -m pip install pymupdf`) for PDF→image extraction — use it in Phase 2 to pull product/cert/project images.
- Deps are NEAR-CURRENT (measured last session) — do NOT re-run stale-deps analysis. AGENTS.md "NOT the Next.js you know" line is Next-16 boilerplate.
- Repo was CLEAN at checkpoint (Phase 1 was read-only). Last code commit: `905d432 feat(media): wire client logos and project images`.
