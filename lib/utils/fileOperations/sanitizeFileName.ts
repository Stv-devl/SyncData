/**
 * Sanitizes a file name by removing special characters.
 * @param fileName - The input file name.
 * @returns Sanitized file name.
 * @throws Error if the file name is invalid.
 */
export function sanitizeFileName(fileName: string): string {
  const sanitized = fileName.replace(/[^a-zA-Z0-9-_. ]/g, '');
  if (sanitized.length === 0) {
    throw new Error('Invalid file name');
  }
  return sanitized;
}
