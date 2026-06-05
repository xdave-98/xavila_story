import type { Moment } from "../data/moments";

export type Phase = "start" | "playing" | "won" | "timeup";

export interface Point {
  x: number;
  y: number;
}

/** A moment plus its randomized starting position in the "sky". */
export interface FloatingMoment extends Moment {
  /** Initial horizontal position, in % of the play area width. */
  baseX: number;
  /** Initial vertical position, in % of the play area height. */
  baseY: number;
  /** Per-photo drift animation offset so they don't bob in sync. */
  delay: number;
  /** Slight resting rotation, in degrees. */
  tilt: number;
}
