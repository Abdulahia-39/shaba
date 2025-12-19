"use client";

import {
  submitComment,
  deleteComment,
  getComments,
} from "@/actions/blog-actions";
import { createContext, useState, useEffect, useContext } from "react";

const CommentContext = createContext({
  comments: [],
  postComment: () => {},
  removeComment: () => {},
  error: false,
  success: false,
});

export function CommentProvider({ children }) {
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function getAllComments() {
      setError(null);
      try {
        const data = await getComments();

        // Always log with a comma to see the object tree!
        // console.log("Fetched data:", data);

        if (Array.isArray(data)) {
          setComments(data);
          setSuccess(true);
        }
      } catch (err) {
        // err.message is a string, err is an object.
        // React can't render objects, so store the string!
        setError(err.message || "An error occurred");
      }
    }

    getAllComments();
  }, []);

  const postComment = async (formData) => {
    setError(null);

    try {
      const newComment = await submitComment(formData);
      setComments((prevComments) => [newComment, ...prevComments]);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const removeComment = async (id) => {
    setError(null);

    try {
      await deleteComment(id);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (!success) return;

    const timer = setTimeout(() => {
      setSuccess(false);
    }, 8000); // 8 seconds

    return () => clearTimeout(timer);
  }, [success]);

  const values = {
    postComment,
    removeComment,
    comments,
    error,
    success,
  };

  return (
    <CommentContext.Provider value={values}>{children}</CommentContext.Provider>
  );
}

export const useComment = () => useContext(CommentContext);
