"use client";
import { useContext } from "react";
import BlogPosts from "./BlogPosts";
import LoadingSpinner from "./LoadingSpinner";
import BlogContext from "@/store/BlogContext";
import amoudDam from "@/public/assets/amoudDam.png";
import biyogalin from "@/public/assets/biyogalin.jpg";
import galbeed from "@/public/assets/galbeed.png";

import contactbg from "@/public/assets/amoudDam.png";

const postsData = [
  {
    id: 1,
    image: amoudDam,
    title: "Borama Dam Project Overview",
    category: [{ attributes: { category: "projects" } }],
    overview:
      "Project Overview Project Title: Construction of a High-Capacity Gravity Dam for Borama Town Water Supply.",
    url: "/",
  },
  {
    id: 2,
    image: biyogalin,
    title: "Borama Dam Project Overview",
    category: [{ attributes: { category: "projects" } }],
    overview:
      "Project Overview Project Title: Construction of a High-Capacity Gravity Dam for Borama Town Water Supply.",
    url: "/",
  },
  {
    id: 3,
    image: galbeed,
    title: "Borama Dam Project Overview",
    category: [{ attributes: { category: "projects" } }],
    overview:
      "Project Overview Project Title: Construction of a High-Capacity Gravity Dam for Borama Town Water Supply.",
    url: "/",
  },
];

const BlogBody = () => {
  const blog = useContext(BlogContext);

  if (blog.loading) {
    return (
      <div className="flex-3 h-full w-full mx-auto my-auto">
        <section className="h-full w-full flex justify-center items-center">
          <LoadingSpinner />
        </section>
      </div>
    );
  }

  if (blog.error) {
    console.log("Error loading blog posts:", blog.error);
    return (
      <div className="flex-3 h-full w-full">
        <section className="flex-3 h-full w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
          {postsData.map((post) => (
            <BlogPosts
              key={post.id}
              img={post.image}
              category={post.category}
              header={post.title}
              description={post.overview}
              url={post.url}
            />
          ))}
        </section>
      </div>
    );
  }

  return (
    <div className="flex-3 h-full w-full">
      <section className="flex-3 h-full w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
        {blog.error && (
          <p className="text-red-500 text-center">{blog.error.message}</p>
        )}
        {blog.blogPosts &&
          blog.blogPosts.map((post) => (
            <BlogPosts
              key={post.id}
              img={post.attributes.postimg.data.attributes.url || contactbg}
              category={post.attributes.categories.data || "News"}
              header={post.attributes.title || "Blog Post Title"}
              description={
                post.attributes.description ||
                "Blog post description goes here."
              }
              url={`/Blog/${post.id}`}
            />
          ))}
      </section>
    </div>
  );
};

export default BlogBody;
