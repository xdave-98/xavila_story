import { useMemo } from "react";

// Deterministic pseudo-random in [0,1) from a seed — pure (no Math.random),
// so positions stay stable across renders.
function rand(seed: number): number {
  const x = Math.sin(seed * 91.7 + 47.3) * 43758.5453;
  return x - Math.floor(x);
}

// A soft, dreamy background: drifting aurora blobs, rising bokeh lights, and
// twinkling sparkles. Pure CSS animation, pointer-events: none, sits behind
// the foreground content.
export function LoveBackground() {
  const bokeh = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => {
        const s = i + 1;
        return {
          id: i,
          left: rand(s) * 100,
          size: 14 + rand(s + 0.4) * 60,
          delay: rand(s + 0.7) * 14,
          duration: 13 + rand(s + 1.1) * 12,
          drift: (rand(s + 1.6) - 0.5) * 140,
        };
      }),
    [],
  );

  const twinkles = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => {
        const s = i + 100;
        return {
          id: i,
          left: rand(s) * 100,
          top: rand(s + 0.5) * 100,
          delay: rand(s + 0.9) * 6,
          duration: 2.4 + rand(s + 1.3) * 3,
          size: 4 + rand(s + 1.7) * 6,
        };
      }),
    [],
  );

  return (
    <div className="love-bg" aria-hidden>
      <span className="aurora aurora--1" />
      <span className="aurora aurora--2" />
      <span className="aurora aurora--3" />

      <div className="bokeh-layer">
        {bokeh.map((b) => (
          <span
            key={b.id}
            className="bokeh"
            style={{
              left: `${b.left}%`,
              width: `${b.size}px`,
              height: `${b.size}px`,
              animationDelay: `${b.delay}s`,
              animationDuration: `${b.duration}s`,
              ["--drift" as string]: `${b.drift}px`,
            }}
          />
        ))}
      </div>

      <div className="twinkle-layer">
        {twinkles.map((t) => (
          <span
            key={t.id}
            className="twinkle"
            style={{
              left: `${t.left}%`,
              top: `${t.top}%`,
              fontSize: `${t.size}px`,
              animationDelay: `${t.delay}s`,
              animationDuration: `${t.duration}s`,
            }}
          >
            ✦
          </span>
        ))}
      </div>
    </div>
  );
}
