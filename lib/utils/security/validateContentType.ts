export function validateContentType(
  request: Request,
  allowedTypes: string[]
): boolean {
  const contentType = request.headers.get('Content-Type')?.split(';')[0] || '';
  return allowedTypes.includes(contentType);
}
