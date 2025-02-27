/**
 * Parses a JSON string safely and converts it to an object
 * @template T - The type of the expected object after parsing
 * @param {string | null} jsonString - The JSON string to parse
 * @returns {T | null} The parsed object or null in case of error
 */
export function parseJsonSafe<T>(jsonString: string | null): T | null {
  if (!jsonString) return null;

  try {
    const parsedData = JSON.parse(jsonString);

    if (
      !parsedData ||
      (typeof parsedData !== 'object' && !Array.isArray(parsedData))
    ) {
      console.error('Invalid JSON format detected:', jsonString);
      return null;
    }

    return parsedData;
  } catch (error) {
    console.error('JSON Parsing Error:', error);
    return null;
  }
}
