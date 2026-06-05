/** Format milliseconds as m:ss.t (or s.t under a minute). */
export function formatTime(ms: number): string {
  const totalSec = ms / 1000;
  const minutes = Math.floor(totalSec / 60);
  const seconds = Math.floor(totalSec % 60);
  const tenths = Math.floor((ms % 1000) / 100);
  if (minutes > 0) {
    return `${minutes}:${String(seconds).padStart(2, "0")}.${tenths}`;
  }
  return `${seconds}.${tenths}s`;
}
