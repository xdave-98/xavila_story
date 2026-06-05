import { motion } from "framer-motion";
import { Petals } from "./Petals";

interface Props {
  onReplay: () => void;
}

export function TimeUpScreen({ onReplay }: Props) {
  return (
    <div className="screen timeup-screen">
      <Petals count={12} />
      <motion.div
        className="start-card"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="fail-emojis" aria-hidden>
          <motion.span
            className="fail-panda"
            animate={{ rotate: [-7, 5, -7] }}
            transition={{ duration: 3.4, ease: "easeInOut", repeat: Infinity }}
          >
            🐼
          </motion.span>
          <span className="fail-bunny">
            <motion.span
              className="fail-bunny-face"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity }}
            >
              🐰
            </motion.span>
            <motion.span
              className="tear"
              animate={{ y: [0, 16], opacity: [0, 1, 0] }}
              transition={{ duration: 1.6, ease: "easeIn", repeat: Infinity }}
            >
              💧
            </motion.span>
          </span>
        </div>

        <h1 className="start-title">Try again, little bunny</h1>
        <div className="rule" aria-hidden />

        <motion.button className="cta" onClick={onReplay} whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
          Try again
          <span className="cta-heart">❤</span>
        </motion.button>
      </motion.div>
    </div>
  );
}
