import { useCallback, useMemo, useRef, useState } from "react";
import { moments } from "../data/moments";
import type { FloatingMoment, Point } from "../game/types";
import { FloatingPhoto } from "./FloatingPhoto";
import { Timeline } from "./Timeline";
import { Timer } from "./Timer";
import { config } from "../data/finale";

interface Props {
  floating: FloatingMoment[];
  placed: number[];
  placedCount: number;
  total: number;
  timeLeft: number;
  durationMs: number;
  onPlace: (order: number) => void;
}

export function GameScreen({ floating, placed, placedCount, total, timeLeft, durationMs, onPlace }: Props) {
  const slotRefs = useRef(new Map<number, HTMLDivElement>());
  const [hoverSlot, setHoverSlot] = useState<number | null>(null);
  const [rejectedSlot, setRejectedSlot] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const rejectTimer = useRef<number | undefined>(undefined);

  // Timeline slots are always the canonical, chronological order.
  const slots = useMemo(() => [...moments].sort((a, b) => a.order - b.order), []);

  const registerSlot = useCallback((order: number, el: HTMLDivElement | null) => {
    if (el) slotRefs.current.set(order, el);
    else slotRefs.current.delete(order);
  }, []);

  const slotAtPoint = useCallback((point: Point): number | null => {
    for (const [order, el] of slotRefs.current) {
      const r = el.getBoundingClientRect();
      // Generous vertical hit area so dropping "near" the slot still counts.
      const pad = 28;
      if (
        point.x >= r.left - pad &&
        point.x <= r.right + pad &&
        point.y >= r.top - pad &&
        point.y <= r.bottom + pad
      ) {
        return order;
      }
    }
    return null;
  }, []);

  const handleDragMove = useCallback(
    (point: Point) => {
      const over = slotAtPoint(point);
      setHoverSlot((prev) => (prev === over ? prev : over));
    },
    [slotAtPoint],
  );

  const handleDrop = useCallback(
    (order: number, point: Point) => {
      setHoverSlot(null);
      const target = slotAtPoint(point);
      if (target === null) return; // dropped in empty sky → snaps back

      if (target === order && !placed.includes(order)) {
        onPlace(order); // correct slot → photo unmounts, slot fills
        return;
      }

      // Wrong slot (or already filled): gentle shake, photo snaps back.
      window.clearTimeout(rejectTimer.current);
      setRejectedSlot(target);
      rejectTimer.current = window.setTimeout(() => setRejectedSlot(null), 520);
    },
    [onPlace, placed, slotAtPoint],
  );

  return (
    <div className={`screen game-screen ${dragging ? "is-dragging" : ""}`}>
      <header className="game-header">
        <span className="game-title">{config.title}</span>
        <Timer timeLeft={timeLeft} durationMs={durationMs} placedCount={placedCount} total={total} />
      </header>

      <div className="sky">
        {floating.map((m) => (
          <FloatingPhoto
            key={m.order}
            moment={m}
            onDragMove={handleDragMove}
            onDrop={handleDrop}
            onDragStateChange={setDragging}
          />
        ))}
        {floating.length > 0 && (
          <p className="sky-hint">Do you remember our story in the correct order&nbsp;?</p>
        )}
      </div>

      <Timeline
        slots={slots}
        placed={placed}
        hoverSlot={hoverSlot}
        rejectedSlot={rejectedSlot}
        registerSlot={registerSlot}
      />
    </div>
  );
}
