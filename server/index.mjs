// Tiny best-time server for "Notre histoire".
// Stores a single best completion time in server/scores.json.
// The frontend works fine without this (it falls back to localStorage);
// run it only if you want the record to persist server-side / across devices.

import express from "express";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const STORE = join(__dirname, "scores.json");
const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

async function readBest() {
  try {
    const raw = await readFile(STORE, "utf8");
    const data = JSON.parse(raw);
    return typeof data.bestMs === "number" ? data.bestMs : null;
  } catch {
    return null;
  }
}

async function writeBest(bestMs) {
  await writeFile(STORE, JSON.stringify({ bestMs, updatedAt: new Date().toISOString() }, null, 2));
}

app.get("/api/best-time", async (_req, res) => {
  res.json({ bestMs: await readBest() });
});

app.post("/api/best-time", async (req, res) => {
  const ms = Number(req.body?.ms);
  if (!Number.isFinite(ms) || ms <= 0) {
    return res.status(400).json({ error: "invalid ms" });
  }
  const current = await readBest();
  const bestMs = current == null ? ms : Math.min(current, ms);
  await writeBest(bestMs);
  res.json({ bestMs });
});

app.listen(PORT, () => {
  console.log(`💌  best-time server on http://localhost:${PORT}`);
});
