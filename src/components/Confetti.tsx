import { useMemo } from "react";

// Deterministic pseudo-random in [0,1) — pure (no Math.random).
function rand(seed: number): number {
  const x = Math.sin(seed * 57.31 + 13.9) * 43758.5453;
  return x - Math.floor(x);
}

const COLORS = ["#c2a14d", "#c87a86", "#e7b3b1", "#8fae8b", "#ddc488", "#a85563", "#fff3da"];

interface Props {
  count?: number;
}

// A joyful one-shot confetti rain — multicolour pieces that tumble down once.
export function Confetti({ count = 80 }: Props) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const s = i + 1;
        return {
          id: i,
          left: rand(s) * 100,
          delay: rand(s + 0.3) * 1.4,
          duration: 2.8 + rand(s + 0.6) * 2.6,
          size: 6 + rand(s + 0.9) * 9,
          drift: (rand(s + 1.2) - 0.5) * 240,
          rot: Math.round(rand(s + 1.5) * 4 + 2) * 360,
          color: COLORS[Math.floor(rand(s + 1.8) * COLORS.length)],
          round: rand(s + 2.1) > 0.62,
        };
      }),
    [count],
  );

  return (
    <div className="confetti" aria-hidden>
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.round ? p.size : p.size * 0.5}px`,
            background: p.color,
            borderRadius: p.round ? "50%" : "1px",
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            ["--drift" as string]: `${p.drift}px`,
            ["--rot" as string]: `${p.rot}deg`,
          }}
        />
      ))}
    </div>
  );
}
