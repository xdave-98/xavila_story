import { AnimatePresence, motion } from "framer-motion";
import type { Moment } from "../data/moments";

interface Props {
  slots: Moment[]; // ordered 1..N
  placed: number[];
  hoverSlot: number | null;
  rejectedSlot: number | null;
  registerSlot: (order: number, el: HTMLDivElement | null) => void;
}

// The golden "fresque" along the bottom: a drawn-on timeline with numbered
// slots. Each slot fills with its photo the moment it's correctly placed.
export function Timeline({ slots, placed, hoverSlot, rejectedSlot, registerSlot }: Props) {
  return (
    <div className="timeline" aria-label="Frise chronologique">
      <svg className="timeline-rail" viewBox="0 0 1000 60" preserveAspectRatio="none" aria-hidden>
        <motion.path
          d="M 20 38 C 200 14, 320 58, 500 34 S 820 14, 980 36"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="6 10"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
      </svg>

      <div className="timeline-slots">
        {slots.map((slot, i) => {
          const isPlaced = placed.includes(slot.order);
          const isHover = hoverSlot === slot.order && !isPlaced;
          const isRejected = rejectedSlot === slot.order;
          return (
            <div
              key={slot.order}
              ref={(el) => registerSlot(slot.order, el)}
              className={[
                "slot",
                isPlaced ? "slot--placed" : "",
                isHover ? "slot--hover" : "",
                isRejected ? "slot--rejected" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div className="slot-frame">
                <AnimatePresence>
                  {isPlaced ? (
                    <motion.div
                      className="slot-photo"
                      initial={{ scale: 0.4, opacity: 0, rotate: -8 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    >
                      <img src={slot.image} alt={slot.title} draggable={false} />
                      <span className="slot-caption">{slot.title}</span>
                      <RewardBurst />
                    </motion.div>
                  ) : (
                    <motion.span
                      key="num"
                      className="slot-number"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ delay: 0.2 + i * 0.08 }}
                    >
                      {slot.order}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <span className="slot-dot" aria-hidden />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Celebratory burst when a photo lands in its correct slot: an expanding gold
// ring, a sparkle star, and a spray of little hearts flying outward.
function RewardBurst() {
  const hearts = Array.from({ length: 10 }, (_, i) => {
    const angle = (i / 10) * Math.PI * 2;
    const dist = 46 + (i % 3) * 12;
    return { id: i, dx: Math.cos(angle) * dist, dy: Math.sin(angle) * dist };
  });

  return (
    <div className="reward" aria-hidden>
      <motion.span
        className="reward-ring"
        initial={{ scale: 0.2, opacity: 0.85 }}
        animate={{ scale: 2.6, opacity: 0 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
      />
      <motion.span
        className="reward-ring reward-ring--two"
        initial={{ scale: 0.2, opacity: 0.6 }}
        animate={{ scale: 2, opacity: 0 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.08 }}
      />
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          className="reward-heart"
          initial={{ x: 0, y: 0, scale: 0.5, opacity: 1 }}
          animate={{ x: h.dx, y: h.dy, scale: 1.15, opacity: 0 }}
          transition={{ duration: 0.85, ease: "easeOut", delay: h.id * 0.012 }}
        >
          {h.id % 2 === 0 ? "❤" : "✦"}
        </motion.span>
      ))}
    </div>
  );
}
