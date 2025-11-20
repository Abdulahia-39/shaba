"use client";
import Header from "@/components/projects/header/Header";
import Footer from "@/components/home/footer/Footer";
import Sidebar from "@/components/blog/Sidebar";
import Article from "@/components/blog/Article";
import React,{ useEffect, useState } from "react";
import { fetchArticle } from "@/lib/blog-data";

const BlogPage = ({params}) => {
      const [article, setArticle] = useState();
      const [Loading, setLoading] = useState(false);
      const [error, setError] = useState();
      const { blogpage } = React.use(params);
    
      useEffect(() => {
        async function fetchData(){
          setLoading(true);
          const data = await fetchArticle(blogpage);
          if(!data){
            setError({
              message: "Couldn't fetch places, please try again later"
            });
            console.log("Error fetching blog data");
            return;
          }
          setArticle(data.data);
          setLoading(false);
          console.log(data.data);
        }
        fetchData();
      }, [])

    return (
        <>
        <Header 
            headerText={article ? article.attributes.title : ""}
        />
        <main className="bg-[#f8f9fa] flex w-full min-h-screen">
        <Article
            article={article}
            Loading={Loading}
            error={error}
            content={article ? article.attributes.content : ""}
            author={article ? article.attributes.author : "Admin"}
            date={article ? new Date(article.attributes.publishedAt).toLocaleDateString() : ""}
        />
        <Sidebar />
        </main>
        <Footer/>
        </>
    )
}

export default BlogPage;