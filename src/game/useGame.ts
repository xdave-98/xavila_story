import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { moments } from "../data/moments";
import { config } from "../data/finale";
import type { FloatingMoment, Phase } from "./types";
import { loadBestTime, saveBestTime } from "./api";

const DURATION_MS = config.durationSeconds * 1000;

// Spread photos across the upper "sky" without clumping or overlapping the
// timeline. Deterministic-ish jitter keeps them apart while still feeling loose.
function layoutMoments(): FloatingMoment[] {
  const shuffled = [...moments].sort(() => Math.random() - 0.5);
  const cols = Math.ceil(Math.sqrt(shuffled.length));
  return shuffled.map((m, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const cellW = 100 / cols;
    const jitterX = (Math.random() - 0.5) * cellW * 0.5;
    return {
      ...m,
      baseX: Math.min(86, Math.max(8, col * cellW + cellW / 2 + jitterX)),
      baseY: Math.min(64, Math.max(10, 14 + row * 26 + (Math.random() - 0.5) * 12)),
      delay: Math.random() * 3,
      tilt: (Math.random() - 0.5) * 10,
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

  // Place a moment in its slot. Returns true if accepted.
  const place = useCallback(
    (order: number): boolean => {
      let accepted = false;
      setPlaced((prev) => {
        if (prev.includes(order)) return prev;
        accepted = true;
        const next = [...prev, order];
        if (next.length === total) {
          const elapsed = performance.now() - startedAt.current;
          stopClock();
          setFinalMs(elapsed);
          setPhase("won");
          void saveBestTime(elapsed).then(setBestMs);
        }
        return next;
      });
      if (accepted) setFloating((prev) => prev.filter((m) => m.order !== order));
      return accepted;
    },
    [total, stopClock],
  );

  const reset = useCallback(() => {
    stopClock();
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
