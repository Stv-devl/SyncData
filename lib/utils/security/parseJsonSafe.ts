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
