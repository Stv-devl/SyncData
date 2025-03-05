import { profileSchema } from 'lib/shema/profileShema';
import { handleError } from 'lib/utils/errors/handleError';
import { extractUpdatedFields } from 'lib/utils/fileOperations/extractUpdatedFields';
import { processImage } from 'lib/utils/fileOperations/processImage';
import { nextAuthValidateCsrf } from 'lib/utils/security/nextAuthValidateCsrf';
import { securityHeaders } from 'lib/utils/security/securityHeaders';
import { validateContentType } from 'lib/utils/security/validateContentType';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import { HandlerContext, UserProfile } from '@/types/type';

/**
 * Handles user profile updates
 * @param request - The HTTP request object
 * @param context - The authentication and database context
 * @returns A Promise that resolves to the NextResponse object
 */
export async function patchProfileHandler(
  request: Request,
  context: HandlerContext
): Promise<NextResponse> {
  try {
    const { requestUserId, usersCollection } = context;

    if (!nextAuthValidateCsrf(request)) {
      console.log('Invalid CSRF token');
      return handleError(403, 'Invalid CSRF token');
    }

    if (
      !validateContentType(request, ['application/json', 'multipart/form-data'])
    ) {
      return handleError(400, 'Unsupported Content-Type');
    }

    const user = await usersCollection.findOne<UserProfile>({
      _id: new ObjectId(requestUserId),
    });
    if (!user) return handleError(404, 'User not found');

    const formData = await request.formData();
    const updatedFields: Partial<UserProfile> = extractUpdatedFields(formData);

    if (formData.has('image')) {
      const image = formData.get('image') as File;
      const imageUrl = await processImage(image, user.image);
      if (imageUrl) updatedFields.image = imageUrl;
    }

    const parsedData = profileSchema.partial().safeParse(updatedFields);
    if (!parsedData.success) {
      return handleError(400, 'Invalid input data');
    }

    if (Object.keys(updatedFields).length === 0) {
      return handleError(400, 'No changes detected');
    }

    const updateFields = Object.keys(updatedFields).reduce((acc, key) => {
      if (key === 'email') {
        acc[`credentials.email`] = updatedFields[key as keyof UserProfile];
      }
      acc[`profile.${key}`] = updatedFields[key as keyof UserProfile];
      return acc;
    }, {} as Record<string, string | ObjectId | File | null | undefined>);

    const updateResult = await usersCollection.updateOne(
      { _id: new ObjectId(requestUserId) },
      { $set: updateFields }
    );

    if (updateResult.matchedCount === 0) {
      return handleError(404, 'User not found');
    }

    return NextResponse.json(
      { message: 'Profile updated successfully', updatedData: updatedFields },
      {
        status: 200,
        headers: securityHeaders,
      }
    );
  } catch (error) {
    console.error('Internal server error:', error);
    return handleError(500, 'Server error');
  }
}
