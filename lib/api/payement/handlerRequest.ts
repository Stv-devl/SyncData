import { NextResponse } from 'next/server';
import { getHandler } from './getHandler';
import { postHandler } from './postHandler';

export const runtime = 'nodejs';

export async function handlerRequest(req: Request) {
  if (req.method === 'POST') {
    return await postHandler(req);
  } else if (req.method === 'GET') {
    return await getHandler(req);
  } else {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }
}
