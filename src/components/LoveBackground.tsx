import { useMemo } from "react";

// Deterministic pseudo-random in [0,1) from a seed — pure (no Math.random),
// so positions stay stable across renders.
function rand(seed: number): number {
  const x = Math.sin(seed * 91.7 + 47.3) * 43758.5453;
  return x - Math.floor(x);
}

interface Props {
  /** Dimmed, lower-density version for behind active gameplay. */
  subtle?: boolean;
}

// A soft, dreamy background: drifting aurora blobs, rising bokeh lights, and
// twinkling sparkles. Pure CSS animation, pointer-events: none, sits behind
// the foreground content.
export function LoveBackground({ subtle = false }: Props) {
  const counts = subtle
    ? { bokeh: 12, twinkle: 18, heart: 6 }
    : { bokeh: 22, twinkle: 34, heart: 12 };

  const bokeh = useMemo(
    () =>
      Array.from({ length: counts.bokeh }, (_, i) => {
        const s = i + 1;
        return {
          id: i,
          left: rand(s) * 100,
          size: 12 + rand(s + 0.4) * 70,
          delay: rand(s + 0.7) * 16,
          duration: 12 + rand(s + 1.1) * 14,
          drift: (rand(s + 1.6) - 0.5) * 160,
        };
      }),
    [counts.bokeh],
  );

  const twinkles = useMemo(
    () =>
      Array.from({ length: counts.twinkle }, (_, i) => {
        const s = i + 100;
        return {
          id: i,
          left: rand(s) * 100,
          top: rand(s + 0.5) * 100,
          delay: rand(s + 0.9) * 6,
          duration: 2.2 + rand(s + 1.3) * 3.2,
          size: 4 + rand(s + 1.7) * 7,
        };
      }),
    [counts.twinkle],
  );

  const hearts = useMemo(
    () =>
      Array.from({ length: counts.heart }, (_, i) => {
        const s = i + 300;
        return {
          id: i,
          left: rand(s) * 100,
          size: 12 + rand(s + 0.5) * 18,
          delay: rand(s + 0.9) * 16,
          duration: 14 + rand(s + 1.4) * 12,
          drift: (rand(s + 1.9) - 0.5) * 120,
          glyph: rand(s + 2.3) > 0.5 ? "❤" : "❀",
        };
      }),
    [counts.heart],
  );

  return (
    <div className={`love-bg${subtle ? " love-bg--subtle" : ""}`} aria-hidden>
      <span className="aurora aurora--1" />
      <span className="aurora aurora--2" />
      <span className="aurora aurora--3" />
      <span className="aurora aurora--4" />

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

      {!subtle && (
        <div className="hearts-layer">
          {hearts.map((h) => (
            <span
              key={h.id}
              className="love-heart"
              style={{
                left: `${h.left}%`,
                fontSize: `${h.size}px`,
                animationDelay: `${h.delay}s`,
                animationDuration: `${h.duration}s`,
                ["--drift" as string]: `${h.drift}px`,
              }}
            >
              {h.glyph}
            </span>
          ))}
        </div>
      )}

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
