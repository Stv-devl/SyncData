import { NextResponse } from 'next/server';

export const handleError = (status: number, message: string): NextResponse => {
  return new NextResponse(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
};
