/**
 * Validate the signature of a file
 * @param file - The file to validate
 * @param validSignatures - The valid signatures
 * @returns The mime type of the file if it is valid, null otherwise
 */
export async function isValidFileSignature(
  file: File,
  validSignatures: Record<string, number[]>
) {
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer.slice(0, 4));

  for (const [mime, signature] of Object.entries(validSignatures)) {
    if (signature.every((byte, i) => bytes[i] === byte)) {
      return mime;
    }
  }
  return null;
}
