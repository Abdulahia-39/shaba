import LoadingSpinner from "./LoadingSpinner";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

const Article = ({
  article,
  Loading,
  error,
  content,
  author,
  date,
  category,
}) => {
  return (
    <div
      className={`flex-3 h-full w-full my-10 ${
        Loading ? "mx-auto my-auto" : ""
      }`}
    >
      {Loading && (
        <section className="h-full w-full flex justify-center items-center">
          <LoadingSpinner />
        </section>
      )}
      {error && <p className="text-red-500">{error.message}</p>}
      {article && (
        <section className="w-full">
          <Image
            src={article.attributes.postimg.data.attributes.formats.small.url}
            alt="Article Image"
            width={
              article.attributes.postimg.data.attributes.formats.small.width
            }
            height={
              article.attributes.postimg.data.attributes.formats.small.height
            }
            className="sm:w-[70%] sm:h-[600px] mx-auto my-5 object-cover object-center aspect-square"
          />
          <div className="flex justify-end w-[70%] mx-auto my-5">
            <p className="">
              by {author} - on {date}
            </p>
          </div>

          <div className="prose max-w-none w-[70%] mx-auto my-10">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
          <div className="w-[80%] bg-green-200 h-40 flex flex-col items-start justify-center gap-5 mx-auto p-5">
            <p className="text-green-900 text-lg">Categories:</p>
            <p className="text-green-900">{category}</p>
          </div>
        </section>
      )}
    </div>
  );
};

export default Article;
