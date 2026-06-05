import { motion } from "framer-motion";

interface Props {
  timeLeft: number;
  durationMs: number;
  placedCount: number;
  total: number;
}

const R = 26;
const CIRC = 2 * Math.PI * R;

// Countdown ring + numeric seconds, with a gentle danger pulse under 10s.
export function Timer({ timeLeft, durationMs, placedCount, total }: Props) {
  const seconds = Math.ceil(timeLeft / 1000);
  const frac = Math.max(0, Math.min(1, timeLeft / durationMs));
  const danger = timeLeft <= 10_000;

  return (
    <div className="hud">
      <div className={`timer ${danger ? "timer--danger" : ""}`}>
        <svg viewBox="0 0 64 64" width="64" height="64">
          <circle cx="32" cy="32" r={R} className="timer-track" />
          <motion.circle
            cx="32"
            cy="32"
            r={R}
            className="timer-progress"
            strokeDasharray={CIRC}
            strokeDashoffset={CIRC * (1 - frac)}
            transform="rotate(-90 32 32)"
            animate={danger ? { scale: [1, 1.06, 1] } : { scale: 1 }}
            transition={danger ? { duration: 0.9, repeat: Infinity } : { duration: 0.2 }}
            style={{ transformOrigin: "center" }}
          />
        </svg>
        <span className="timer-num">{seconds}</span>
      </div>

      <div className="progress">
        <span className="progress-count">
          {placedCount}
          <span className="progress-sep">/</span>
          {total}
        </span>
        <span className="progress-label">souvenirs replacés</span>
      </div>
    </div>
  );
}
