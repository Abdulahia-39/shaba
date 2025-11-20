// "use client";
// import { useEffect, useState } from "react";
// import { fetchArticle } from "@/lib/blog-data";
import LoadingSpinner from "./LoadingSpinner";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

const Article = ({article, Loading, error, content, author, date}) => {
    return (
        <div className={`flex-3 h-full w-full my-10 ${Loading ? "mx-auto my-auto" : ""}`}>
            {Loading &&<section className="h-full w-full flex justify-center items-center"><LoadingSpinner /></section>}
            {error && <p className="text-red-500">{error.message}</p>}
            {article &&
                <section className="w-full">
                    <Image
                        src={article.attributes.postimg.data.attributes.formats.small.url}
                        alt="Article Image"
                        width={article.attributes.postimg.data.attributes.formats.small.width}
                        height={article.attributes.postimg.data.attributes.formats.small.height}
                        className="w-[70%] h-[600px] mx-auto my-5 object-cover object-center aspect-square"
                    />
                    <div className="flex justify-end w-[70%] mx-auto my-5">
                        <p className="">by {author} - on {date}</p>
                    </div>

                    <div className="prose max-w-none w-[70%] mx-auto my-10">
                        <ReactMarkdown>{content}</ReactMarkdown>
                    </div>
                </section>
            }
        </div>
    );
}

export default Article;