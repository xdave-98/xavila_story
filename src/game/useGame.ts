import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { moments } from "../data/moments";
import { config } from "../data/finale";
import type { FloatingMoment, Phase, Waypoint } from "./types";
import { loadBestTime, saveBestTime } from "./api";

const DURATION_MS = config.durationSeconds * 1000;

const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

// Build a wandering path that sweeps the photo across most of the screen
// horizontally (big vw travel) with a gentler vertical bob. Offsets are in
// vw units (see App.css `.photo-frame` translate) so they scale with width.
function makePath(baseX: number): [Waypoint, Waypoint, Waypoint, Waypoint] {
  // Four well-spread horizontal targets across the viewport, shuffled so the
  // photo criss-crosses rather than drifting one direction.
  const targetsX = shuffle([10, 34, 60, 84]).map((t) => t + (Math.random() - 0.5) * 10);
  const bobY = shuffle([-16, -7, 8, 15]);
  return targetsX.map((tx, i) => ({
    x: Math.round(tx - baseX), // vw offset from the anchor → crosses the screen
    y: Math.round(bobY[i] + (Math.random() - 0.5) * 6),
    r: Math.round((Math.random() - 0.5) * 18),
  })) as [Waypoint, Waypoint, Waypoint, Waypoint];
}

// Spread photos across the upper "sky" as anchors; each then wanders widely.
function layoutMoments(): FloatingMoment[] {
  const shuffled = shuffle(moments);
  const cols = Math.ceil(Math.sqrt(shuffled.length));
  return shuffled.map((m, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const cellW = 100 / cols;
    const rows = Math.ceil(shuffled.length / cols);
    const cellH = 56 / rows;
    const baseX = Math.min(84, Math.max(10, col * cellW + cellW / 2 + (Math.random() - 0.5) * cellW * 0.4));
    const baseY = Math.min(58, Math.max(8, 8 + row * cellH + (Math.random() - 0.5) * cellH * 0.5));
    return {
      ...m,
      baseX,
      baseY,
      tilt: (Math.random() - 0.5) * 10,
      duration: 17 + Math.random() * 9,
      delay: Math.random() * 12,
      path: makePath(baseX),
    };
  });
}

export function useGame() {
  const [phase, setPhase] = useState<Phase>("start");
  const [floating, setFloating] = useState<FloatingMoment[]>([]);
  const [placed, setPlaced] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(DURATION_MS);
  const [finalMs, setFinalMs] = useState<number | null>(null);
  const [bestMs, setBestMs] = useState<number | null>(null);

  const startedAt = useRef(0);
  const rafId = useRef(0);
  const placedCountRef = useRef(0);

  const total = moments.length;

  useEffect(() => {
    void loadBestTime().then(setBestMs);
  }, []);

  const stopClock = useCallback(() => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = 0;
  }, []);

  const start = useCallback(() => {
    stopClock();
    placedCountRef.current = 0;
    setFloating(layoutMoments());
    setPlaced([]);
    setFinalMs(null);
    setTimeLeft(DURATION_MS);
    setPhase("playing");
    startedAt.current = performance.now();

    const tick = () => {
      const elapsed = performance.now() - startedAt.current;
      const left = DURATION_MS - elapsed;
      if (left <= 0) {
        setTimeLeft(0);
        setPhase("timeup");
        stopClock();
        return;
      }
      setTimeLeft(left);
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
  }, [stopClock]);

  // Place a moment in its (correct) slot. The caller (GameScreen) already
  // guards against duplicates and wrong slots, so this just commits the move:
  // remove the photo from the sky (no longer catchable) and fill the slot.
  const place = useCallback(
    (order: number) => {
      setFloating((prev) => prev.filter((m) => m.order !== order));
      setPlaced((prev) => (prev.includes(order) ? prev : [...prev, order]));

      placedCountRef.current += 1;
      if (placedCountRef.current === total) {
        const elapsed = performance.now() - startedAt.current;
        stopClock();
        setFinalMs(elapsed);
        setPhase("won");
        void saveBestTime(elapsed).then(setBestMs);
      }
    },
    [total, stopClock],
  );

  const reset = useCallback(() => {
    stopClock();
    placedCountRef.current = 0;
    setPhase("start");
    setPlaced([]);
    setFloating([]);
    setTimeLeft(DURATION_MS);
    setFinalMs(null);
  }, [stopClock]);

  useEffect(() => () => stopClock(), [stopClock]);

  const placedCount = placed.length;

  return useMemo(
    () => ({
      phase,
      floating,
      placed,
      placedCount,
      total,
      timeLeft,
      durationMs: DURATION_MS,
      finalMs,
      bestMs,
      start,
      place,
      reset,
    }),
    [phase, floating, placed, placedCount, total, timeLeft, finalMs, bestMs, start, place, reset],
  );
}
