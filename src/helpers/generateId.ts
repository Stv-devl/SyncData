/**
 * Generates a unique identifier string.
 * The ID is a random string consisting of letters and numbers.
 * @returns {string} A unique identifier.
 */

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};
