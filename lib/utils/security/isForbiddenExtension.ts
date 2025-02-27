const FORBIDDEN_EXTENSIONS = [
  'exe',
  'js',
  'php',
  'bat',
  'sh',
  'cmd',
  'com',
  'scr',
];

/**
 * Check if a file has a forbidden extension
 * @param filename - File name
 * @returns true if the extension is forbidden, false otherwise
 */
export function isForbiddenExtension(filename: string): boolean {
  const extension = filename.split('.').pop()?.toLowerCase();
  return extension ? FORBIDDEN_EXTENSIONS.includes(extension) : false;
}
