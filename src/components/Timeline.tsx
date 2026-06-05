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
                      <Sparkle />
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

function Sparkle() {
  return (
    <motion.svg
      className="sparkle"
      viewBox="0 0 100 100"
      initial={{ opacity: 1, scale: 0.2 }}
      animate={{ opacity: 0, scale: 2.2 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      aria-hidden
    >
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <rect
          key={deg}
          x="48"
          y="6"
          width="4"
          height="20"
          rx="2"
          fill="var(--gold-soft)"
          transform={`rotate(${deg} 50 50)`}
        />
      ))}
    </motion.svg>
  );
}
