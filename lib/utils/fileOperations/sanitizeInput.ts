/**
 * Sanitizes an input value by removing special characters.
 * @param value - The input value to sanitize.
 * @returns Sanitized input value.
 * @throws Error if the input value is invalid.
 */
export function sanitizeInput(value: string): string {
  const sanitized = value.replace(/[^a-zA-Z0-9-_. ]/g, '');
  if (sanitized.length === 0) {
    throw new Error('Invalid input value');
  }
  return sanitized;
}
