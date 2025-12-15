"use client";
import Header from "@/modules/views/ui/projects/header/Header";
import Footer from "@/modules/views/ui/home/footer/Footer";
import Sidebar from "@/modules/views/ui/blog/Sidebar";
import Article from "@/modules/views/ui/blog/Article";
import React, { useEffect, useState, useContext } from "react";
import BlogContext from "@/store/BlogContext";

const BlogPage = ({ params }) => {
  const [article, setArticle] = useState(null);
  const { blogpage } = React.use(params);

  const blog = useContext(BlogContext);

  useEffect(() => {
    setArticle(() =>
      blog.blogPosts.find((post) => post.id.toString() === blogpage)
    );
  }, [blog]);

  return (
    <>
      <Header headerText={article ? article.attributes.title : "Loading...."} />
      <main className="bg-[#f8f9fa] flex w-full min-h-screen">
        <Article
          article={article}
          Loading={blog.loading}
          error={blog.error}
          content={article ? article.attributes.content : ""}
          author={article ? article.attributes.author : "Admin"}
          date={
            article
              ? new Date(article.attributes.publishedAt).toDateString()
              : ""
          }
          category={
            article
              ? article.attributes.categories.data[0].attributes.category
              : ""
          }
        />
        <Sidebar />
      </main>
      <Footer />
    </>
  );
};

export default BlogPage;
