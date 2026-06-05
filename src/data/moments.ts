// ─────────────────────────────────────────────────────────────────────────────
// Notre histoire — the moments of your love story, in chronological order.
//
// HOW TO PERSONALIZE:
//   1. Drop your real photos into  public/photos/  (jpg, png or webp).
//   2. Point each `image` below at your file, e.g. image: "/photos/edf.jpg".
//   3. Edit `title`, `date` and `caption` to match the real memory.
//   4. `order` is the chronological position on the timeline (1 = first).
//      Keep them 1..N with no gaps. Add or remove entries freely.
//
// The placeholder images shipped in public/photos/ are labelled so you can see
// which slot each one fills — replace them with your own pictures.
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
    image: "/photos/moment-1.svg",
  },
  {
    order: 2,
    title: "Moment n°2",
    date: "À compléter",
    caption: "Raconte-moi ce souvenir…",
    image: "/photos/moment-2.svg",
  },
  {
    order: 3,
    title: "Moment n°3",
    date: "À compléter",
    caption: "Raconte-moi ce souvenir…",
    image: "/photos/moment-3.svg",
  },
  {
    order: 4,
    title: "Moment n°4",
    date: "À compléter",
    caption: "Raconte-moi ce souvenir…",
    image: "/photos/moment-4.svg",
  },
  {
    order: 5,
    title: "Moment n°5",
    date: "À compléter",
    caption: "Raconte-moi ce souvenir…",
    image: "/photos/moment-5.svg",
  },
];
