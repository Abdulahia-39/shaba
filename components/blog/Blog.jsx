'use client';
import { useEffect, useState } from "react";
import BlogPosts from "./BlogPosts";
import {fetchBlogData} from "@/lib/blog-data";
import LoadingSpinner from "./LoadingSpinner";

import contactbg from "@/public/assets/amoudDam.png";

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData(){
      setLoading(true);
      const data = await fetchBlogData();
      if(!data){
        setError({
          message: "Couldn't fetch places, please try again later"
        });
        console.log("Error fetching blog data");
        return;
      }
      setBlogPosts(data.data);
      setLoading(false);
      console.log(data.data);
    }
    fetchData();
  }, [])

  
  return (
    <div className={`flex-3 h-full w-full ${Loading ? "mx-auto my-auto" : ""}`}>
      {Loading &&<section className="h-full w-full flex justify-center items-center"><LoadingSpinner /></section>}
      <section className="flex-3 h-full w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
          {error && <p className="text-red-500">{error.message}</p>}
          {blogPosts && blogPosts.map((post) => (
            <BlogPosts
              key={post.id}
              postid={post.id}
              img={post.attributes.postimg.data.attributes.url || contactbg}
              category={post.attributes.categories.data || "News"}
              header={post.attributes.title || "Blog Post Title"}
              description={post.attributes.description || "Blog post description goes here."}
            />
          ))}
        </section>
      </div>
  )
}

export default Blog;