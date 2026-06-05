import { motion } from "framer-motion";
import { moments } from "../data/moments";
import { config, finale } from "../data/finale";
import { Petals } from "./Petals";
import { formatTime } from "../game/format";

interface Props {
  finalMs: number | null;
  bestMs: number | null;
  onReplay: () => void;
}

export function RevealScreen({ finalMs, bestMs, onReplay }: Props) {
  const ordered = [...moments].sort((a, b) => a.order - b.order);
  const isRecord = finalMs != null && bestMs != null && Math.abs(finalMs - bestMs) < 1;

  return (
    <div className="screen reveal-screen">
      <Petals count={26} variant="burst" />

      <motion.div
        className="reveal-card"
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="eyebrow">{config.title}</span>
        <h1 className="reveal-title">{finale.heading}</h1>

        <div className="mural">
          {ordered.map((m, i) => (
            <motion.figure
              className="mural-item"
              key={m.order}
              initial={{ opacity: 0, y: 24, rotate: -4 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: 0.4 + i * 0.16, type: "spring", stiffness: 200, damping: 18 }}
            >
              <div className="mural-photo">
                <img src={m.image} alt={m.title} draggable={false} />
              </div>
              <figcaption>
                <strong>{m.revealTitle ?? m.title}</strong>
                <span>{m.label}</span>
                <em>{m.caption}</em>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <div className="message">
          {finale.message.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + ordered.length * 0.16 + i * 0.5, duration: 0.9 }}
            >
              {line}
            </motion.p>
          ))}
          {finale.signature && (
            <motion.p
              className="signature"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 + ordered.length * 0.16 + finale.message.length * 0.5, duration: 1 }}
            >
              {finale.signature}
            </motion.p>
          )}
        </div>

        <motion.div
          className="reveal-foot"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 + ordered.length * 0.16 + finale.message.length * 0.5 }}
        >
          {finalMs != null && (
            <span className="final-time">
              Terminé en {formatTime(finalMs)}
              {isRecord && <span className="record">★ nouveau record</span>}
            </span>
          )}
          <button className="cta cta--ghost" onClick={onReplay}>
            Rejouer
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
