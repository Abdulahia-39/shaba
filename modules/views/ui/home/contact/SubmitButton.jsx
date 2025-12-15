"use client";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      type="submit"
      className="bg-green-950 text-white text-lg font-light w-46 h-13 rounded-4xl"
    >
      {pending ? "Sending..." : "Send Message"}
    </button>
  );
}
