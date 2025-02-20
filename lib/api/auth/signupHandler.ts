import bcrypt from 'bcryptjs';
import { corsMiddleware } from 'lib/middleware/corsMiddleware';
import { rateLimitMiddleware } from 'lib/middleware/rateLimitMiddleware';
import { signupSchema } from 'lib/shema/signupShema';
import { getDb } from 'lib/utils/dataBase/getDb';
import { handleError } from 'lib/utils/errors/handleError';
import { securityHeaders } from 'lib/utils/security/securityHeaders';
import { NextResponse } from 'next/server';

const saltRounds = 10;

export async function signupHandler(request: Request): Promise<NextResponse> {
  try {
    const corsResponse = corsMiddleware(request);
    if (corsResponse) return corsResponse;

    const rateLimitResponse = await rateLimitMiddleware({
      limit: 10,
      ttl: 10000,
    });
    if (rateLimitResponse) return rateLimitResponse;

    const body = await request.json();

    const parsed = signupSchema.safeParse(body);
    if (!parsed.success) {
      return handleError(
        400,
        parsed.error.issues[0]?.message || 'Invalid input data'
      );
    }

    const { email, password } = parsed.data;
    const normalizedEmail = email.trim().toLowerCase();
    const { usersCollection } = await getDb();
    if (!usersCollection) return handleError(500, 'Database connection error');

    const emailExists = await usersCollection.findOne(
      { 'credentials.email': normalizedEmail },
      { projection: { _id: 1 } }
    );

    if (emailExists) {
      return handleError(400, 'Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const userData = {
      credentials: {
        email: normalizedEmail,
        password: hashedPassword,
      },
      profile: {
        firstname: '',
        lastname: '',
        picture: '',
      },
      files: [],
      createdAt: new Date(),
    };

    const result = await usersCollection.insertOne(userData);
    if (!result.insertedId) {
      return handleError(500, 'Failed to create user');
    }

    return NextResponse.json(
      {
        message: 'User created successfully',
        userId: result.insertedId.toString(),
      },
      { status: 201, headers: securityHeaders }
    );
  } catch (error) {
    console.error('[signupHandler] Internal server error:', error);
    return handleError(500, 'Server error');
  }
}
