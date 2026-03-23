# Project TODO

---

## 🔴 High Priority

- [x] **SEO basics**
  Add `robots.txt`, `sitemap.xml`, and per-page Open Graph meta tags (title, description, og:image). Without these the site is essentially invisible to search engines and won't preview correctly when shared on WhatsApp/social.

- [x] **Custom 404 page**
  `app/not-found.tsx` with a friendly message and link back to home. Currently Next.js shows a plain default 404.

- [x] **Error boundaries**
  Wrap the quiz and video player in React error boundaries so a crash in one component doesn't blank the entire page.

- [x] **Loading states / skeletons**
  Series and episode pages fetch content client-side with no loading indicator. Add skeletons so the UI doesn't flash empty on slow connections.

- [x] **Security & safety audit**
  Review for: XSS vectors, unsafe external links (add `rel="noopener noreferrer"`), iframe sandbox attributes on YouTube embeds, no sensitive data in client bundles, dependency vulnerabilities (`npm audit`), and child-safety considerations (no user-generated content exposure).

---

## 🟡 Medium Priority

- [x] **Mobile & tablet optimization**
  Full responsive pass across all screen sizes (320px phones → iPad → desktop). Check: header overflow, series/episode grid column counts, video player sizing, quiz layout on small screens, RTL touch targets, font sizes on mobile.

- [ ] **Episode search & filter**
  Search bar + topic-filter chips on the series page.

- [ ] **Cross-device progress sync**
  Progress (watched/quiz scores) lives only in localStorage. Add optional sync via Supabase or similar.

- [ ] **Share quiz results**
  After completing a quiz, allow sharing the score as a link or image card.

- [ ] **Accessibility audit**
  Keyboard navigation, ARIA labels, screen reader testing for LTR (EN) and RTL (HE).

- [x] **Analytics**
  Vercel Analytics added (`@vercel/analytics/next`). Enable in the Vercel dashboard under the project's Analytics tab.

- [ ] **Content Security Policy headers**
  Add CSP, X-Frame-Options, and other security headers via `next.config.ts` headers. The YouTube iframe requires a specific `frame-src` allowlist.

- [ ] **Web App Manifest**
  `public/manifest.json` + icons so the site is installable on mobile home screens and shows a proper icon when bookmarked.

---

## 🟢 Nice to Have

- [ ] **Add more series**
  Add another science TV series to MadaTV (e.g. Once Upon a Time... Space, or similar).

- [ ] **Offline support (PWA)**
  Service worker so intros, terminology, and quizzes work without internet.

- [ ] **Teacher/parent dashboard**
  Shows watched episodes and quiz scores per child, exportable as PDF.

- [ ] **Scroll-in card animations**
  Entrance animations on episode/series cards as they scroll into view.

- [ ] **Audio pronunciation**
  🔊 button on terminology cards using Web Speech API.

- [ ] **Structured data (JSON-LD)**
  Add `VideoObject` + `Course` schema markup so Google can surface episodes as rich results in search.

- [ ] **Privacy policy page**
  Required if analytics are added; also good practice for a site aimed at children.

- [ ] **`lang` / `dir` attribute sync**
  Currently `<html lang="en" dir="ltr">` is hardcoded in `layout.tsx`. It should update dynamically when the user switches to Hebrew so assistive technologies and browsers behave correctly.

---

## ✅ Completed

- [x] Scaffold Next.js 15 + Tailwind CSS 3 site
- [x] Crawl YouTube playlist with yt-dlp (26 real episode IDs across 3 playlists)
- [x] Full bilingual content (EN + HE) for all 26 episodes (15 terms + 10 trivia each)
- [x] YouTube embed player (plays inside site, no redirect)
- [x] Language toggle with 🇺🇸 / 🇮🇱 flags + full RTL for Hebrew
- [x] Progress tracking via localStorage (watched status + quiz scores)
- [x] Wikipedia Commons topic images on episode cards
- [x] Kid-friendly redesign (Nunito/Varela Round fonts, bright colors, emojis, per-episode color themes)
- [x] Trivia quiz per episode (locked until watched, score saved)
- [x] YouTube content disclaimer in footer
- [x] Added 4 missing episodes (The Ear, The Skin, The Kidneys, Repairs & Healing) — renumbered all 26
- [x] Multiple video sources per episode (`videoSources[]`) with automatic fallback in VideoPlayer
- [x] Rebranded as MadaTV — science TV for kids, multi-series platform
- [x] Multi-series support: `/series/[id]` routing, series index homepage, series metadata JSON
- [x] Build: 58 static pages, no errors
