import { motion } from "framer-motion";
import { config } from "../data/finale";
import { Petals } from "./Petals";
import { LoveBackground } from "./LoveBackground";

interface Props {
  onStart: () => void;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2, delayChildren: 0.15 } },
};
const rise = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
};

export function StartScreen({ onStart }: Props) {
  return (
    <div className="screen start-screen">
      <LoveBackground />
      <Petals count={18} />
      <motion.div className="start-hero" variants={container} initial="hidden" animate="show">
        <motion.h1 className="start-title" variants={rise}>
          {config.title}
        </motion.h1>
        <motion.button
          className="cta"
          variants={rise}
          onClick={onStart}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.97 }}
        >
          {config.ctaLabel}
          <span className="cta-heart">❤</span>
        </motion.button>
      </motion.div>
    </div>
  );
}
