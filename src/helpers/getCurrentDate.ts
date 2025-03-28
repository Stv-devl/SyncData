/**
 * Gets the current date in the format MM/DD/YYYY
 * @returns {string} The current date in the format MM/DD/YYYY
 */
export const getCurrentDate = (): string => {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const year = today.getFullYear();
  return `${month}/${day}/${year}`;
};
