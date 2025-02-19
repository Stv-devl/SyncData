/**
 * Recursively sanitizes an object by removing forbidden MongoDB operators.
 * Also checks if the object is valid (does not contain MongoDB injection).
 * @param obj - The object to sanitize
 * @param path - Path in the object for logging purposes
 * @returns A sanitized object without MongoDB operators
 */
export function sanitizeMongoObject<T>(obj: T, path = ''): T {
  if (!obj || typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    return obj.map((item, index) =>
      sanitizeMongoObject(item, `${path}[${index}]`)
    ) as unknown as T;
  }

  const sanitizedObj: Record<string, unknown> = {};

  for (const key in obj) {
    if (key.startsWith('$') || key.includes('.$')) {
      console.warn(` MongoDB Operator "${key}" removed from ${path || 'root'}`);
      continue;
    }

    sanitizedObj[key] =
      typeof obj[key] === 'object'
        ? sanitizeMongoObject(obj[key] as T, `${path}.${key}`)
        : obj[key];
  }

  return sanitizedObj as T;
}
