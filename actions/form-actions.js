"use server";

import { connectDB } from "@/lib/mongo-connection";
import Contact from "@/models/contact-modal";

export async function submitContact(formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const message = formData.get("message");

  if (!name || !email || !message) {
    throw new Error("All fields are required");
  }

  await connectDB();

  await Contact.create({ name, email, phone, message });

  return { success: true };
}
