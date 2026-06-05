// Best-time persistence. Tries the tiny backend first (so the record follows
// her across devices); falls back to localStorage so the game works fully
// standalone with `npm run dev` and no server running.

const LS_KEY = "xavila-story-best-ms";

export async function loadBestTime(): Promise<number | null> {
  try {
    const res = await fetch("/api/best-time", { signal: AbortSignal.timeout(1500) });
    if (res.ok) {
      const data = (await res.json()) as { bestMs: number | null };
      // Mirror into localStorage so reloads are instant even if the server drops.
      if (data.bestMs != null) localStorage.setItem(LS_KEY, String(data.bestMs));
      return data.bestMs;
    }
  } catch {
    // Server not running — fall through to localStorage.
  }
  const local = localStorage.getItem(LS_KEY);
  return local ? Number(local) : null;
}

export async function saveBestTime(ms: number): Promise<number> {
  const local = localStorage.getItem(LS_KEY);
  const best = local ? Math.min(Number(local), ms) : ms;
  localStorage.setItem(LS_KEY, String(best));

  try {
    const res = await fetch("/api/best-time", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ms }),
      signal: AbortSignal.timeout(1500),
    });
    if (res.ok) {
      const data = (await res.json()) as { bestMs: number };
      localStorage.setItem(LS_KEY, String(data.bestMs));
      return data.bestMs;
    }
  } catch {
    // Ignore — localStorage already holds the best value.
  }
  return best;
}
