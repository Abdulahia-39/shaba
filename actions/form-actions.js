"use server";
import { callData } from '@/lib/data-client';

export async function submitContact(formData) {
  return callData('createContact', Object.fromEntries(
    ['name', 'email', 'phone', 'message'].map(key => [key, formData.get(key)])
  ));
}
