const WINDOW = 60_000;
const LIMIT = 20;
const store = new Map<string, { count: number; firstRequest: number }>();

export function checkRateLimit(identifier: string, limit = LIMIT, windowMs = WINDOW) {
  const now = Date.now();
  const entry = store.get(identifier);
  if (!entry) {
    store.set(identifier, { count: 1, firstRequest: now });
    return true;
  }
  if (now - entry.firstRequest > windowMs) {
    store.set(identifier, { count: 1, firstRequest: now });
    return true;
  }
  if (entry.count >= limit) {
    return false;
  }
  entry.count += 1;
  return true;
}
