import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Deterministic pseudo-random in [0,1) — pure (no Math.random).
function rand(seed: number): number {
  const x = Math.sin(seed * 73.13 + 19.7) * 43758.5453;
  return x - Math.floor(x);
}

// Seconds before the festive scene melts into the cosy coffee one.
const SWITCH_AFTER_MS = 12_000;

const XMAS_COLORS = ["#e6b422", "#c87a86", "#8fae8b", "#fff3da", "#cf6b5e"];
const COFFEE_COLORS = ["#d7a55a", "#b07a45", "#e8cfa0", "#caa06a"];

function Lights({ colors, seedBase }: { colors: string[]; seedBase: number }) {
  const n = 24;
  const bulbs = Array.from({ length: n }, (_, i) => {
    const left = (i / (n - 1)) * 100;
    const sag = Math.sin((i / (n - 1)) * Math.PI * 4) * 10; // gentle scalloped droop
    return {
      id: i,
      left,
      top: 14 + sag,
      color: colors[i % colors.length],
      delay: rand(seedBase + i) * 2,
    };
  });
  return (
    <div className="lights">
      {bulbs.map((b) => (
        <span
          key={b.id}
          className="bulb"
          style={{
            left: `${b.left}%`,
            top: `${b.top}px`,
            color: b.color,
            animationDelay: `${b.delay}s`,
          }}
        >
          <i className="stem" style={{ height: `${b.top}px` }} />
        </span>
      ))}
    </div>
  );
}

function Snow() {
  const flakes = Array.from({ length: 36 }, (_, i) => {
    const s = i + 1;
    return {
      id: i,
      left: rand(s) * 100,
      size: 3 + rand(s + 0.4) * 6,
      delay: rand(s + 0.7) * 12,
      duration: 9 + rand(s + 1.1) * 9,
      drift: (rand(s + 1.5) - 0.5) * 120,
    };
  });
  return (
    <div className="snow">
      {flakes.map((f) => (
        <span
          key={f.id}
          className="flake"
          style={{
            left: `${f.left}%`,
            width: `${f.size}px`,
            height: `${f.size}px`,
            animationDelay: `${f.delay}s`,
            animationDuration: `${f.duration}s`,
            ["--drift" as string]: `${f.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

function Steam() {
  const wisps = Array.from({ length: 9 }, (_, i) => {
    const s = i + 50;
    return {
      id: i,
      left: 8 + (i / 8) * 84 + (rand(s) - 0.5) * 8,
      delay: rand(s + 0.3) * 6,
      duration: 6 + rand(s + 0.8) * 5,
      width: 26 + rand(s + 1.2) * 40,
    };
  });
  return (
    <div className="steam">
      {wisps.map((w) => (
        <span
          key={w.id}
          className="wisp"
          style={{
            left: `${w.left}%`,
            width: `${w.width}px`,
            animationDelay: `${w.delay}s`,
            animationDuration: `${w.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

// Ambient scene that opens on a festive Christmas mood (twinkling string
// lights + falling snow + cool glow) then cross-fades into a cosy coffee
// ambiance (warm amber glow, gold lights, rising steam).
export function AmbientScene() {
  const [coffee, setCoffee] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setCoffee(true), SWITCH_AFTER_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="ambient" aria-hidden>
      <motion.div
        className="ambient-layer ambient--xmas"
        animate={{ opacity: coffee ? 0 : 1 }}
        transition={{ duration: 3, ease: "easeInOut" }}
      >
        <span className="xmas-glow" />
        <Lights colors={XMAS_COLORS} seedBase={2} />
        <Snow />
      </motion.div>

      <motion.div
        className="ambient-layer ambient--coffee"
        initial={{ opacity: 0 }}
        animate={{ opacity: coffee ? 1 : 0 }}
        transition={{ duration: 3, ease: "easeInOut" }}
      >
        <span className="coffee-glow" />
        <Lights colors={COFFEE_COLORS} seedBase={9} />
        <Steam />
      </motion.div>
    </div>
  );
}
