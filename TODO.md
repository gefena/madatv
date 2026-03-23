# Project TODO

---

## 🔴 High Priority

*(nothing — all high priority items done!)*

---

## 🟡 Medium Priority

- [ ] **Mobile & tablet optimization**
  Full responsive pass across all screen sizes (320px phones → iPad → desktop). Check: header overflow, series/episode grid column counts, video player sizing, quiz layout on small screens, RTL touch targets, font sizes on mobile.

- [ ] **Episode search & filter**
  Search bar + topic-filter chips on the series page.

- [ ] **Cross-device progress sync**
  Progress (watched/quiz scores) lives only in localStorage. Add optional sync via Supabase or similar.

- [ ] **Share quiz results**
  After completing a quiz, allow sharing the score as a link or image card.

- [ ] **Accessibility audit**
  Keyboard navigation, ARIA labels, screen reader testing for LTR (EN) and RTL (HE).

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
