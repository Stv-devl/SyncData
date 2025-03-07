import { sanitizeInput } from './sanitizeInput';
import { UserProfile } from '@/types/type';

/**
 * Extracts the updated fields from the form data
 * @param formData - The form data
 * @returns The updated fields
 */
export function extractUpdatedFields(formData: FormData): Partial<UserProfile> {
  const updatedFields: Partial<UserProfile> = {};

  const firstname = formData.get('firstname');
  if (firstname !== null)
    updatedFields.firstname = sanitizeInput(firstname as string);

  const lastname = formData.get('lastname');
  if (lastname !== null)
    updatedFields.lastname = sanitizeInput(lastname as string);

  const email = formData.get('email');
  if (email !== null) updatedFields.email = email as string;

  const subscription = formData.get('subscription');
  if (subscription !== null)
    updatedFields.subscription = subscription as string;

  const subscriptionId = formData.get('subscriptionId');
  if (subscriptionId !== null)
    updatedFields.subscriptionId = subscriptionId as string;

  return updatedFields;
}
