"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { submitContact } from "@/actions/form-actions";

const ContactContext = createContext();

export function ContactProvider({ children }) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setError(null);
    setSuccess(false);

    try {
      await submitContact(formData);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ Auto-hide success message after 1 minute
  useEffect(() => {
    if (!success) return;

    const timer = setTimeout(() => {
      setSuccess(false);
    }, 8000); // 8 seconds

    return () => clearTimeout(timer);
  }, [success]);

  return (
    <ContactContext.Provider value={{ handleSubmit, success, error }}>
      {children}
    </ContactContext.Provider>
  );
}

export const useContact = () => useContext(ContactContext);
