import { NextResponse } from 'next/server';

const originRegex = process.env.NEXT_PUBLIC_ORIGIN_REGEX;

if (!originRegex) {
  throw new Error(
    'NEXT_PUBLIC_ORIGIN_REGEX is not defined in environment variables'
  );
}
const allowedOrigins = new RegExp(originRegex, 'i');

export function handleCors(request: Request): NextResponse | null {
  const requestOrigin = request.headers.get('origin');

  if (!requestOrigin) {
    return null;
  }

  if (!allowedOrigins.test(requestOrigin)) {
    return new NextResponse(
      JSON.stringify({ error: 'Forbidden: Unauthorized request origin' }),
      {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  return null;
}
