import { authOptions } from 'lib/api/auth/authOptions';
import { LRUCache } from 'lru-cache';
import { headers } from 'next/headers';
import { getServerSession } from 'next-auth';
import { handleError } from '../errors/handleError';

export interface RateLimitOptions {
  limit: number;
  ttl: number;
}

const ipCache = new LRUCache<string, number>({
  max: 100,
  ttl: 10 * 1000,
});

const userCache = new LRUCache<string, number>({
  max: 100,
  ttl: 10 * 1000,
});

/**
 * Retrieves the client's IP address securely.
 * @returns - The client's IP address.
 */
function getClientIp(): string {
  return (
    headers().get('x-real-ip') ||
    headers().get('x-forwarded-for')?.split(',')[0] ||
    'unknown'
  );
}

/**
 * Checks the rate limit.
 * - If the user is logged in, limit by userId.
 * - Otherwise, limit by IP.
 * @param {RateLimitOptions} options - Limit and TTL in ms.
 * @returns Returns null if OK, otherwise a 429 error.
 */
export async function checkRateLimit(options: Partial<RateLimitOptions> = {}) {
  if (
    !options ||
    typeof options.limit !== 'number' ||
    typeof options.ttl !== 'number'
  ) {
    throw new Error(
      'Rate limit options (limit and ttl) are required and must be numbers'
    );
  }
  const { limit, ttl } = options;

  const session = await getServerSession(authOptions);
  const ip = getClientIp();

  let key: string;
  let cacheToUse: LRUCache<string, number>;

  if (session?.user?.id) {
    key = session.user.id;
    cacheToUse = userCache;
  } else {
    key = ip;
    cacheToUse = ipCache;
  }

  const currentCount = cacheToUse.get(key) ?? 0;

  if (currentCount >= limit) {
    return handleError(429, 'Too many requests. Please try again later.');
  }

  cacheToUse.set(key, currentCount + 1, { ttl });

  return null;
}
