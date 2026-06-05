// ─────────────────────────────────────────────────────────────────────────────
// Notre histoire — the moments of your love story, in chronological order.
//
// HOW TO PERSONALIZE:
//   1. Drop your photos into  public/photos/  (jpg, png or webp).
//   2. Point each `image` below at your file, e.g. image: "/photos/first.jpg".
//   3. Edit `title`, `date` and `caption` to match the real memory.
//   4. `order` is the chronological position on the timeline (1 = first).
//      Keep them 1..N with no gaps. Add or remove entries freely.
//
// Photos are web-optimized JPEGs; the full-resolution originals are kept in
// data/originals/ (not committed).
// ─────────────────────────────────────────────────────────────────────────────

export interface Moment {
  /** Chronological position on the timeline (1 = the very first moment). */
  order: number;
  /** Short name of the memory, shown on the placed card + reveal. */
  title: string;
  /** Free-text date label (e.g. "Janvier 2022"). */
  date: string;
  /** One-line memory shown on the reveal screen. */
  caption: string;
  /** Path to the photo, served from /public. */
  image: string;
}

export const moments: Moment[] = [
  {
    order: 1,
    title: "EDF",
    date: "Le tout début",
    caption: "La première fois que nos regards se sont croisés.",
    image: "/photos/first.jpg",
  },
  {
    order: 2,
    title: "In Seoul",
    date: "À compléter",
    caption: "Notre premier date, au coréen In Seoul.",
    image: "/photos/second.jpg",
  },
  {
    order: 3,
    title: "Pyramides",
    date: "À compléter",
    caption: "Un baiser à l'abri de bus de Pyramides, sous les lumières.",
    image: "/photos/third.jpg",
  },
  {
    order: 4,
    title: "Tour Eiffel",
    date: "À compléter",
    caption: "« I love you », sur un banc au bord de la Seine.",
    image: "/photos/four.jpg",
  },
  {
    order: 5,
    title: "Sunshine",
    date: "À compléter",
    caption: "Notre petit golden retriever, notre rayon de soleil.",
    image: "/photos/five.jpg",
  },
  {
    order: 6,
    title: "Mini-golf",
    date: "À compléter",
    caption: "Notre partie de mini-golf — la revanche t'attend encore.",
    image: "/photos/six.jpg",
  },
  {
    order: 7,
    title: "PSG, Champions",
    date: "À compléter",
    caption: "Le PSG, enfin rois d'Europe — et nous deux, déjà gagnants.",
    image: "/photos/seven.jpg",
  },
  {
    order: 8,
    title: "Boonny",
    date: "À compléter",
    caption: "Notre Boonny — moitié panda, moitié lapin, tout à nous.",
    image: "/photos/eight.jpg",
  },
];
