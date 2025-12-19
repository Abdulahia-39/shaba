"use client";
import { createContext, useState, useEffect } from "react";
import { fetchBlogData } from "@/actions/blog-actions";

const BlogContext = createContext({
  loading: false,
  error: null,
  blogPosts: [],
});

export const BlogProvider = ({ children }) => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const data = await fetchBlogData();
      if (!data) {
        setError({
          message: "Couldn't fetch places, please try again later",
        });
        console.log("Error fetching blog data");
        return;
      }
      setBlogPosts(data.data);
      // console.log(data.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const blogValue = {
    blogPosts: blogPosts,
    loading: loading,
    error: error,
  };

  return (
    <BlogContext.Provider value={blogValue}>{children}</BlogContext.Provider>
  );
};

export default BlogContext;
