import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { moments } from "../data/moments";
import { config } from "../data/finale";
import type { FloatingMoment, Phase, Waypoint } from "./types";
import { loadBestTime, saveBestTime } from "./api";

const DURATION_MS = config.durationSeconds * 1000;

const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

// A gentle looping drift kept SMALL (in px) so a photo stays inside its own
// lane — never wandering off-screen or into a neighbour's space. The offsets
// orbit a little ellipse around the anchor (see App.css `.photo-frame`).
function makePath(): [Waypoint, Waypoint, Waypoint, Waypoint] {
  const a = 15 + Math.random() * 8; // amplitude in px (~15–23)
  const j = () => (Math.random() - 0.5) * 6;
  const r = () => Math.round((Math.random() - 0.5) * 6);
  return [
    { x: Math.round(a + j()), y: Math.round(-a * 0.55 + j()), r: r() },
    { x: Math.round(a * 0.3 + j()), y: Math.round(a * 0.7 + j()), r: r() },
    { x: Math.round(-a * 0.7 + j()), y: Math.round(a * 0.3 + j()), r: r() },
    { x: Math.round(-a * 0.4 + j()), y: Math.round(-a * 0.6 + j()), r: r() },
  ];
}

// Lay the photos out on a tidy grid of non-overlapping lanes within the sky.
// Each photo only drifts gently inside its own cell, so they never cross each
// other, stay fully on-screen, and are easy to catch.
function layoutMoments(): FloatingMoment[] {
  const shuffled = shuffle(moments);
  const n = shuffled.length;
  const cols = Math.min(4, n);
  const rows = Math.ceil(n / cols);
  // Keep a 10% margin on the sides and spread rows in the 16%–64% band.
  const colStep = 80 / cols;
  return shuffled.map((m, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const baseX = 10 + (col + 0.5) * colStep + (Math.random() - 0.5) * colStep * 0.16;
    const baseY = (rows === 1 ? 40 : 16 + (row / (rows - 1)) * 48) + (Math.random() - 0.5) * 5;
    return {
      ...m,
      baseX,
      baseY,
      tilt: (Math.random() - 0.5) * 8,
      duration: 14 + Math.random() * 6,
      delay: Math.random() * 8,
      path: makePath(),
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
