/**
 * Validates the content type of a request
 * @param request - The request object
 * @param allowedTypes - The allowed content types
 * @returns True if the content type is allowed, false otherwise
 */
export function validateContentType(
  request: Request,
  allowedTypes: string[]
): boolean {
  const contentType = request.headers.get('Content-Type')?.split(';')[0] || '';
  return allowedTypes.includes(contentType);
}
