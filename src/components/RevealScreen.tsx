import { motion } from "framer-motion";
import { moments } from "../data/moments";
import { config, finale } from "../data/finale";
import { Petals } from "./Petals";
import { LoveBackground } from "./LoveBackground";
import { Confetti } from "./Confetti";

interface Props {
  onReplay: () => void;
}

const BASE = 0.4;
const STEP = 0.14;

export function RevealScreen({ onReplay }: Props) {
  const ordered = [...moments].sort((a, b) => a.order - b.order);
  const n = ordered.length;
  const msgDelay = BASE + (n + 1) * STEP + 0.25;

  const itemIn = {
    initial: { opacity: 0, y: 24, rotate: -4 },
    animate: { opacity: 1, y: 0, rotate: 0 },
  };

  return (
    <div className="screen reveal-screen">
      <div className="reveal-bg">
        <LoveBackground />
      </div>
      <Petals count={22} variant="burst" />
      <Confetti count={90} />

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
              initial={itemIn.initial}
              animate={itemIn.animate}
              transition={{ delay: BASE + i * STEP, type: "spring", stiffness: 200, damping: 18 }}
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

          {/* The next page of the fresque — what's next for us */}
          <motion.figure
            className="mural-item mural-item--next"
            initial={itemIn.initial}
            animate={itemIn.animate}
            transition={{ delay: BASE + n * STEP, type: "spring", stiffness: 200, damping: 18 }}
          >
            <div className="mural-photo">
              <img src="/photos/next.jpg" alt="What's next" draggable={false} />
            </div>
          </motion.figure>
        </div>

        <motion.div
          className="message"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: msgDelay, duration: 1 }}
        >
          <span className="message-flourish" aria-hidden>
            ❦
          </span>
          {finale.message.map((line, i) => (
            <p key={i} className={i === 0 ? "message-lead" : undefined}>
              {line}
            </p>
          ))}
          <motion.div
            className="message-cheer-wrap"
            initial={{ scale: 0, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ delay: msgDelay + 0.5, type: "spring", stiffness: 260, damping: 9 }}
          >
            <strong className="message-cheer">{finale.cheer}</strong>
          </motion.div>
        </motion.div>

        <motion.div
          className="reveal-foot"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: msgDelay + 0.6 }}
        >
          <button className="cta cta--ghost" onClick={onReplay}>
            Rejouer
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
