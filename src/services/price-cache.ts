// src/services/price-cache.ts
interface CacheEntry {
  price: number;
  timestamp: number;
}

export class PriceCache {
  private cache: Map<string, CacheEntry>;
  private readonly CACHE_DURATION = 60 * 1000; // 60 seconds in milliseconds

  constructor() {
    this.cache = new Map();
  }

  set(symbol: string, price: number) {
    this.cache.set(symbol, {
      price,
      timestamp: Date.now(),
    });
  }

  get(symbol: string): number | null {
    const entry = this.cache.get(symbol);
    if (!entry) return null;

    // Check if cache is still valid
    if (Date.now() - entry.timestamp > this.CACHE_DURATION) {
      this.cache.delete(symbol);
      return null;
    }

    return entry.price;
  }

  clear() {
    this.cache.clear();
  }
}
