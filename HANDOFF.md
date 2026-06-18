# Concrete Surgeons (csmisr.com) — Handoff

**Last updated:** 2026-06-18
**Repo:** github.com/nourabulnasr/Concrete-Surgeons-website (branch `main`)
**Live preview:** https://csmisr-site.vercel.app
**Vercel project:** nour-abulnasrs-projects/csmisr-site
**Stack:** Next 16.2.9 · React 19 · Tailwind v4 · Motion · GSAP · Lenis · Resend · lucide-react

> This is a Vercel **review URL**. The client's custom domain **csmisr.com is NOT
> attached** — the client owns that DNS, so nothing here touches it until the
> records below are added.

---

## 1. What needs the CLIENT (Amr / Concrete Surgeons)

| # | Item | What we need | Where it plugs in |
|---|------|--------------|-------------------|
| 1 | **Founder photo** | A headshot of Eng. Khaled Allam (square, ≥256px). | Save as `public/team/founder.jpg`, then set `FOUNDER_PHOTO = '/team/founder.jpg'` in `src/components/pages/AboutContent.tsx`. Until then a neutral placeholder shows. |
| 2 | **Demo videos** | Up to 3 unlisted YouTube or Vimeo links (high-reach demolition / HM-500 install / diamond cutting). | In `src/components/home/VideoDemos.tsx`, fill `provider` (`'youtube'`/`'vimeo'`) + `id` per slot. Empty slots show "Coming soon". |
| 3 | **Hero background video** *(optional)* | A short, muted site-work clip. | Save as `public/videos/hero-drilling.mp4` (currently 404s harmlessly). |
| 4 | **Carbon-fibre (CFRP) section?** | Decision: the client's "Carbon Fiber System Presentation.pdf" was **not** built into the site. Confirm whether you want a dedicated CFRP/strengthening section. (CFRP is already covered under the *Structural Retrofitting* service.) |
| 5 | **Real prices?** | None were found in the client material, so the site uses **"Request a quote"** everywhere. Confirm there are no public prices. |

---

## 2. DNS records — to point csmisr.com at this site

Add these at the client's domain registrar / DNS host **only when ready to go live**.
After they're added, attach the domain in Vercel → Project → Settings → Domains.

### a) Vercel domain (serve the site at csmisr.com)
| Type | Name | Value |
|------|------|-------|
| `A` | `@` (apex `csmisr.com`) | `76.76.21.21` |
| `CNAME` | `www` | `cname.vercel-dns.com` |

> Vercel shows the exact, current values under **Settings → Domains** after you add
> `csmisr.com`. Use whatever it displays there if it differs from the above.

### b) Resend email (so the contact form can send from @csmisr.com)
Add the domain in the Resend dashboard (Domains → Add `csmisr.com`); it will give
you the exact records to paste. They look like:

| Type | Name | Value (example — use Resend's actual values) |
|------|------|----------------------------------------------|
| `TXT` (SPF) | `send` | `v=spf1 include:amazonses.com ~all` |
| `TXT` (DKIM) | `resend._domainkey` | (long key Resend provides) |
| `MX` | `send` | `feedback-smtp.<region>.amazonses.com` (priority 10) |
| `TXT` (DMARC, optional) | `_dmarc` | `v=DMARC1; p=none;` |

---

## 3. Environment variables (set in Vercel → Settings → Environment Variables)

The contact form works without these (it logs submissions and still returns success),
but to actually deliver email:

| Var | Value | Notes |
|-----|-------|-------|
| `RESEND_API_KEY` | (from Resend dashboard) | Enables sending. |
| `CONTACT_EMAIL` | `contact@csmisr.com` | Destination for **General Enquiry** form submissions. |
| `SALES_EMAIL` | `sales@csmisr.com` | Destination for **Sales & Quotes** form submissions. |

After `csmisr.com` is verified in Resend, also change the `from:` address in
`src/app/api/contact/route.ts` from `onboarding@resend.dev` to
`Concrete Surgeons <noreply@csmisr.com>`.

---

## 4. Performance (mobile, Lighthouse)

Measured against the live preview on a slow-4G profile:

- **CLS: 0** ✅ (target < 0.1)
- **TBT: ~100–150 ms** ✅ (INP proxy; target INP < 200)
- **Performance score: ~88–89**
- **LCP: ~2.7–3.2 s (lab, noisy)** — borderline vs the 2.5 s target.

The hero **headline text is the LCP element**. It has been optimised as far as the
code allows: no LCP image, font preloads trimmed, the display font is fallback-first
(`display: 'optional'`), the decorative hero canvas is deferred past the LCP window,
and the headline paints at full opacity on the first frame (CLS stays 0).

The residual LCP is dominated by **(a) simulated cold TTFB (~0.7–1 s on the Vercel
free tier under throttling)** and **(b) the brand display font being the largest
element**. On real devices / warm edge, field LCP should fall under 2.5 s. Validate
with **PageSpeed Insights on the live URL** once the domain is attached.

> Trade-off to confirm with Nour: the hero font is `display: 'optional'`, so on very
> slow connections some users see a condensed *fallback* instead of Big Shoulders.
> Switch to `display: 'swap'` in `src/app/[lang]/layout.tsx` if you'd rather always
> show Big Shoulders (at a slightly higher LCP).

---

## 5. What changed this round (Phase 2)

Recolour → Blue (brand) / Red (product + CTAs) / Grey, then: removed the hero
"14.98" number for an editorial headline; re-filed the diamond-wire job under
Controlled Demolition; added a real **certificate-document gallery** (opens
`/docs/hm500-verification.pdf`); put the **real HM-500 cartridges** in the
scroll-reveal (swap to a turntable video later via `PRODUCT_VIDEO`); added a
**pre-qualification** section (project photos + client logos); **Sales/General
contact toggle** + dual emails; a **quality & pricing** section; **demo-video**
slots; a **dynamic OG image** (brand-coloured); founder photo slot; and a safe
**dependency bump** (Next 16.2.9, 0 npm-audit vulnerabilities).

Client assets live one level up in `../client-assets/` (5 PDFs) — not committed.
