# MadaTV — Science TV for Kids 🔬

**Live site:** [madatv4kids.vercel.app](https://madatv4kids.vercel.app)

An interactive educational platform for watching science TV series, learning key biological concepts, and testing knowledge with quizzes. Fully bilingual — English and Hebrew (with RTL support).

---

## Features

- **Multi-series platform** — currently hosting *Life: How the Human Body Works* (26 episodes)
- **YouTube embed player** with automatic video-source fallback
- **Per-episode trivia quizzes** — locked until the episode is watched
- **15 bilingual terminology cards** per episode (EN + HE)
- **Progress tracking** via localStorage (watched status + quiz scores)
- **Full RTL support** for Hebrew
- **Responsive** — works on mobile, tablet, and desktop

## Tech Stack

- [Next.js 15](https://nextjs.org) (static export)
- [React 19](https://react.dev)
- [Tailwind CSS 3](https://tailwindcss.com)
- [react-youtube](https://github.com/tjallingt/react-youtube)
- TypeScript

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build   # produces static output in /out
```

The pre-push git hook runs the build automatically before every push to catch errors early.

## Content

Episode content lives in `content/episodes/` as JSON files. Each episode contains:
- Bilingual title, summary, and thumbnail
- 15 terminology cards (EN + HE definitions)
- 10 trivia questions with explanations
- One or more YouTube video IDs (with fallback order)

Series metadata lives in `content/series/`.

## Deployment

Deployed on [Vercel](https://vercel.com) as a static site.
URL: [https://madatv4kids.vercel.app](https://madatv4kids.vercel.app)
