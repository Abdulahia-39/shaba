import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Get API URL and Token from environment variables
const STRAPI_API_URL = import.meta.env.VITE_STRAPI_API_URL;
const STRAPI_API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await axios.get(`${STRAPI_API_URL}/blog-posts`);

        // 3. Strapi usually returns data in a 'data' array for collections
        setPosts(response.data.data);
      } catch (err) {
        // Handle errors (e.g., network issues, invalid token, permissions)
        console.error("Error fetching blog posts:", err);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []); // Empty dependency array means this runs once on component mount

  if (loading) {
    return <div>Loading blog posts...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

  return (
    <div>
      <h1>My Blog</h1>
      {posts.length === 0 ? (
        <p>No blog posts found.</p>
      ) : (
        <ul>
          {posts.map(post => (
            // Ensure 'attributes' and 'title' exist based on your Strapi content type
            <li key={post.id}>
              <h2>{post.attributes.title}</h2>
              {/* You might display other attributes like post.attributes.excerpt */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Blog;