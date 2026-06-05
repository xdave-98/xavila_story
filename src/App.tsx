import { AnimatePresence, motion } from "framer-motion";
import { useGame } from "./game/useGame";
import { StartScreen } from "./components/StartScreen";
import { GameScreen } from "./components/GameScreen";
import { RevealScreen } from "./components/RevealScreen";
import { TimeUpScreen } from "./components/TimeUpScreen";
import "./App.css";

export default function App() {
  const game = useGame();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={game.phase}
        className="stage"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {game.phase === "start" && <StartScreen onStart={game.start} />}

        {game.phase === "playing" && (
          <GameScreen
            floating={game.floating}
            placed={game.placed}
            placedCount={game.placedCount}
            total={game.total}
            timeLeft={game.timeLeft}
            durationMs={game.durationMs}
            onPlace={game.place}
          />
        )}

        {game.phase === "won" && (
          <RevealScreen finalMs={game.finalMs} bestMs={game.bestMs} onReplay={game.reset} />
        )}

        {game.phase === "timeup" && <TimeUpScreen onReplay={game.start} />}
      </motion.div>
    </AnimatePresence>
  );
}
