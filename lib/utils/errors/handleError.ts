import { NextResponse } from 'next/server';

/**
 * Handles error responses
 * @param status - The HTTP status code
 * @param message - The error message
 * @returns A NextResponse object with the error message
 */

export const handleError = (status: number, message: string): NextResponse => {
  return new NextResponse(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
};
