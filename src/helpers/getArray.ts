/**
 * Generates an array starting from a specific page number up to a defined length.
 * @param {number} length - The number of elements in the array.
 * @param {number} startPage - The starting page number.
 * @returns {Array<number>} An array of page numbers.
 */
export const getArray = (length: number, startPage: number) => {
  return Array.from({ length }, (_, i) => startPage + i);
};
