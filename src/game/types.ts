import type { Moment } from "../data/moments";

export type Phase = "start" | "playing" | "won" | "timeup";

export interface Point {
  x: number;
  y: number;
}

/** One stop on a photo's gentle drift loop, as a small px offset + rotation. */
export interface Waypoint {
  /** Horizontal offset in px (kept small so the photo stays in its lane). */
  x: number;
  /** Vertical offset in px. */
  y: number;
  /** Rotation in degrees at this waypoint. */
  r: number;
}

/** A moment plus its randomized starting position + cross-screen drift path. */
export interface FloatingMoment extends Moment {
  /** Anchor horizontal position, in % of the play area width. */
  baseX: number;
  /** Anchor vertical position, in % of the play area height. */
  baseY: number;
  /** Slight resting rotation, in degrees. */
  tilt: number;
  /** Seconds for one full loop of the wander path. */
  duration: number;
  /** Negative start offset so photos aren't in sync. */
  delay: number;
  /** Four waypoints the photo wanders through (then back to the anchor). */
  path: [Waypoint, Waypoint, Waypoint, Waypoint];
}
