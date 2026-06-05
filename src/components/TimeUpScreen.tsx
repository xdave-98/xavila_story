import { motion } from "framer-motion";
import { Petals } from "./Petals";

interface Props {
  placedCount: number;
  total: number;
  onReplay: () => void;
}

export function TimeUpScreen({ placedCount, total, onReplay }: Props) {
  return (
    <div className="screen timeup-screen">
      <Petals count={12} />
      <motion.div
        className="start-card"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="eyebrow">Le temps file…</span>
        <h1 className="start-title">Presque !</h1>
        <div className="rule" aria-hidden />
        <p className="start-sub">
          Tu as replacé {placedCount} souvenir{placedCount > 1 ? "s" : ""} sur {total}.
          <br />
          Notre histoire mérite bien un deuxième essai.
        </p>
        <motion.button className="cta" onClick={onReplay} whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
          Réessayer
          <span className="cta-heart">❤</span>
        </motion.button>
      </motion.div>
    </div>
  );
}
