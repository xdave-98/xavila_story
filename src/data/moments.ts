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
// The images currently shipped in public/photos/ are representative pictures
// pulled from the web as stand-ins — replace them with your own photos.
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
    image: "/photos/edf.jpg",
  },
  {
    order: 2,
    title: "In-Seoul",
    date: "À compléter",
    caption: "Notre premier vrai rendez-vous, dans ce petit coréen de Paris.",
    image: "/photos/in-seoul.jpg",
  },
  {
    order: 3,
    title: "L'abri de bus",
    date: "À compléter",
    caption: "Cet abri de bus près des Pyramides… tu te souviens ?",
    image: "/photos/abribus.jpg",
  },
  {
    order: 4,
    title: "Tour Eiffel",
    date: "À compléter",
    caption: "Un baiser au pied de la Dame de fer.",
    image: "/photos/eiffel-kiss.jpg",
  },
  {
    order: 5,
    title: "Le golden",
    date: "À compléter",
    caption: "Le petit golden retriever qui nous a fait fondre.",
    image: "/photos/golden-retriever.jpg",
  },
  {
    order: 6,
    title: "Matcha & Americano",
    date: "À compléter",
    caption: "Toi le matcha, moi l'americano glacé — notre rituel.",
    image: "/photos/matcha-americano.jpg",
  },
  {
    order: 7,
    title: "Mini-golf Ocean",
    date: "À compléter",
    caption: "La revanche au mini-golf Ocean est toujours en attente.",
    image: "/photos/minigolf.jpg",
  },
  {
    order: 8,
    title: "Boonny",
    date: "À compléter",
    caption: "Notre Boonny — moitié panda, moitié lapin, tout à nous.",
    image: "/photos/boonny.jpg",
  },
  {
    order: 9,
    title: "PSG, Champions",
    date: "À compléter",
    caption: "Le PSG soulève enfin la Ligue des Champions, et nous aussi on a gagné.",
    image: "/photos/psg-ucl.jpg",
  },
];
