import { useMemo } from "react";

interface Props {
  count?: number;
  /** "ambient" drifts slowly forever; "burst" rains down once, denser. */
  variant?: "ambient" | "burst";
}

// Deterministic pseudo-random in [0,1) from a seed — pure (no Math.random),
// so petal positions stay stable across renders and keep React happy.
function rand(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

// Decorative falling hearts/petals. Pure CSS animation, pointer-events: none.
export function Petals({ count = 14, variant = "ambient" }: Props) {
  const burst = variant === "burst";
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const s = i + 1 + (burst ? 1000 : 0);
        return {
          id: i,
          left: rand(s) * 100,
          delay: rand(s + 0.3) * (burst ? 1.5 : 8),
          duration: (burst ? 4 : 9) + rand(s + 0.6) * 5,
          size: 10 + rand(s + 0.9) * 16,
          drift: (rand(s + 1.2) - 0.5) * 120,
          rotate: rand(s + 1.5) * 360,
          glyph: rand(s + 1.8) > 0.5 ? "❀" : "❤",
        };
      }),
    [count, burst],
  );

  return (
    <div className={`petals petals--${variant}`} aria-hidden>
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            fontSize: `${p.size}px`,
            ["--drift" as string]: `${p.drift}px`,
            ["--spin" as string]: `${p.rotate}deg`,
          }}
        >
          {p.glyph}
        </span>
      ))}
    </div>
  );
}
