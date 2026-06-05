# Notre histoire 💛

A warm, fast little game for someone you love. Photos of your key moments drift
around the screen — catch them and drop each one onto the right spot of a golden
**timeline**, in the chronological order of your story, before the clock runs out.
Finish the fresque and a personal message is revealed.

Built with **React + Vite + TypeScript** and **framer-motion**.

## Run it

```bash
npm install
npm run dev          # game only (best time saved in the browser)
# — or —
npm run start        # game + tiny best-time backend (persists across devices)
```

Open the URL Vite prints (default http://localhost:5173).

- `npm run dev` — frontend only. The best time is stored in `localStorage`.
- `npm run start` — frontend **and** the small Express server, so the best time
  is saved server-side in `server/scores.json` too. The game works fine either
  way; without the server it just falls back to the browser.

## Make it yours (3 edits)

### 1. The photos & the order — `src/data/moments.ts`
Drop your real pictures into **`public/photos/`** (jpg, png, webp), then point each
entry at your file and edit the text:

```ts
{
  order: 1,                       // 1 = first moment on the timeline
  title: "EDF",
  date: "Janvier 2022",
  caption: "La première fois que nos regards se sont croisés.",
  image: "/photos/edf.jpg",       // your file in public/photos/
},
```

Keep `order` running `1..N` with no gaps. Add or remove moments freely — the
timeline and the floating photos adapt automatically. The shipped placeholder
images are labelled so you can see which slot each one fills; just replace them.

### 2. The love note & title — `src/data/finale.ts`
Edit the names, title, subtitle, the countdown length (`durationSeconds`), and
the reveal message shown when the fresque is complete.

### 3. (optional) The feel — `src/index.css`
All colours and fonts live as CSS variables at the top (`:root`). Tweak the
palette there if you want.

## How it plays
- **Numbered slots** (1, 2, 3…) — she places each photo from memory of your story.
- **Wrong slot** → the photo gently bounces back, the clock keeps ticking (no penalty).
- **Beat the timer** to win → reveal + your message. Run out → a gentle retry screen.

## Project layout
```
public/photos/        your images (placeholders shipped)
src/data/             moments.ts (the story) + finale.ts (the message)
src/game/             game state, timer, best-time persistence
src/components/       Start / Game / Reveal screens, timeline, floating photo
server/index.mjs      tiny Express best-time API (optional)
```
