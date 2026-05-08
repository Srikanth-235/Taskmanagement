/**
 * Lightweight in-memory cache with TTL.
 * Implements stale-while-revalidate: return cached data immediately,
 * then let the caller refresh in the background.
 */
const store = {};
const TTL = 5 * 60 * 1000; // 5 minutes

export const getCached = (key) => {
  const entry = store[key];
  if (!entry) return null;
  if (Date.now() - entry.ts > TTL) {
    delete store[key];
    return null;
  }
  return entry.data;
};

export const setCached = (key, data) => {
  store[key] = { data, ts: Date.now() };
};

export const invalidate = (key) => {
  delete store[key];
};

export const invalidateAll = () => {
  Object.keys(store).forEach(k => delete store[k]);
};
