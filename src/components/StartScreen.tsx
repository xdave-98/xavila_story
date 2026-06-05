import { motion } from "framer-motion";
import { config } from "../data/finale";
import { Petals } from "./Petals";
import { LoveBackground } from "./LoveBackground";
import { formatTime } from "../game/format";

interface Props {
  bestMs: number | null;
  onStart: () => void;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};
const rise = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

export function StartScreen({ bestMs, onStart }: Props) {
  return (
    <div className="screen start-screen">
      <LoveBackground />
      <Petals count={16} />
      <motion.div className="start-card" variants={container} initial="hidden" animate="show">
        <motion.span className="eyebrow" variants={rise}>
          {config.names}
        </motion.span>
        <motion.h1 className="start-title" variants={rise}>
          {config.title}
        </motion.h1>
        <motion.div className="rule" variants={rise} aria-hidden />
        <motion.p className="start-sub" variants={rise}>
          {config.subtitle}
        </motion.p>

        <motion.ul className="how-to" variants={rise}>
          <li>
            <span className="how-num">1</span> Attrape les photos qui flottent.
          </li>
          <li>
            <span className="how-num">2</span> Pose-les sur la frise, dans l'ordre de notre histoire.
          </li>
          <li>
            <span className="how-num">3</span> Termine la fresque avant la fin du temps.
          </li>
        </motion.ul>

        <motion.button className="cta" variants={rise} onClick={onStart} whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
          {config.ctaLabel}
          <span className="cta-heart">❤</span>
        </motion.button>

        {bestMs != null && (
          <motion.span className="best" variants={rise}>
            Meilleur temps · {formatTime(bestMs)}
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}
