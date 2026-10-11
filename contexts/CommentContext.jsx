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

  const postComment = async (formData) => {
    setError(null);
    setSuccess(false);

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
