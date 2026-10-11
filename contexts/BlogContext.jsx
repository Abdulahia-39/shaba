'use client';
import { createContext, useCallback, useEffect, useState } from 'react';
import { fetchBlogData } from '@/actions/blog-actions';
const BlogContext = createContext({ blogPosts: [], loading: true, error: null, refresh: () => {} });
export function BlogProvider({ children }) {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const refresh = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const response = await fetchBlogData();
      if (!Array.isArray(response?.data)) throw new Error('Content unavailable');
      setBlogPosts(response.data);
    } catch { setError({ message: 'Content is temporarily unavailable. Please try again.' }); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { refresh(); }, [refresh]);
  return <BlogContext.Provider value={{ blogPosts, loading, error, refresh }}>{children}</BlogContext.Provider>;
}
export default BlogContext;
