// ─────────────────────────────────────────────────────────────────────────────
// Notre histoire — the moments of your love story, in chronological order.
//
// HOW TO PERSONALIZE:
//   1. Drop your photos into  public/photos/  (jpg, png or webp).
//   2. Point each `image` below at your file, e.g. image: "/photos/first.jpg".
//   3. `title`   → short name shown in the game (on the placed slot).
//      `label`   → the little caps category shown on the final reveal.
//      `caption` → the one-line memory shown on the final reveal.
//      `revealTitle` (optional) → overrides `title` on the reveal screen.
//   4. `order` is the chronological position on the timeline (1 = first).
//
// Photos are web-optimized JPEGs; the full-resolution originals are kept in
// data/originals/ (not committed).
// ─────────────────────────────────────────────────────────────────────────────

export interface Moment {
  /** Chronological position on the timeline (1 = the very first moment). */
  order: number;
  /** Short name shown in the game (placed slot + alt text). */
  title: string;
  /** Caps category line shown on the reveal (e.g. "NOTRE RENCONTRE"). */
  label: string;
  /** One-line memory shown on the reveal screen. */
  caption: string;
  /** Path to the photo, served from /public. */
  image: string;
  /** Optional name shown on the reveal instead of `title`. */
  revealTitle?: string;
}

export const moments: Moment[] = [
  {
    order: 1,
    title: "EDF",
    label: "NOTRE RENCONTRE",
    caption: "Une petite dame arrive avec son gel hydroalcoolique.",
    image: "/photos/first.jpg",
  },
  {
    order: 2,
    title: "In-Seoul",
    label: "UN DÉLIRE COMMUN",
    caption: "Quand on a commencé à délirer ensemble autour de la Corée.",
    image: "/photos/second.jpg",
  },
  {
    order: 3,
    title: "Pyramides",
    revealTitle: "Le premier « date »",
    label: "LA ROMANCE",
    caption: "Quoi de mieux que l'abri de bus Pyramides pour notre premier bisou ?",
    image: "/photos/third.jpg",
  },
  {
    order: 4,
    title: "Tour Eiffel",
    revealTitle: "Je t'aime",
    label: "…",
    caption: "Le premier d'une longue série.",
    image: "/photos/four.jpg",
  },
  {
    order: 5,
    title: "Sunshine",
    label: "LA STAR",
    caption: "Notre première Saint-Valentin.",
    image: "/photos/five.jpg",
  },
  {
    order: 6,
    title: "Mini-golf",
    label: "UNE SOIRÉE COMPLIQUÉE",
    caption: "Mais qui fait partie de notre histoire.",
    image: "/photos/six.jpg",
  },
  {
    order: 7,
    title: "PSG",
    label: "UNE DEUXIÈME ÉTOILE",
    caption: "Tes yeux brillaient — merci de m'avoir fait vivre ça avec toi.",
    image: "/photos/seven.jpg",
  },
  {
    order: 8,
    title: "Boonny",
    label: "NOTRE MOT",
    caption: "Parce que ça nous va bien… À jamais ensemble.",
    image: "/photos/eight.jpg",
  },
];
