import Image from "next/image";
import Link from "next/link";

const Post = ({ image, title, email, overview, url }) => {
  return (
    <div className="bg-white shadow-2xl flex flex-col gap-1 hover:shadow-md transition-all duration-300 hover:-translate-z-1 max-w-70 sm:min-w-85 sm:max-w-120 mx-auto">
      <div className="h-65 relative">
        <Image fill src={image} alt="latest posts" />
      </div>

      <div className="flex-2 p-5 sm:p-10 flex flex-col gap-6">
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p className="text-gray-600 overflow-hidden line-clamp-2">{email}</p>
        <p className=" text-gray-600 overflow-hidden line-clamp-3">
          {overview}
        </p>
        <Link href={url} className="text-left text-green-600">
          Read more
          <i className="fa-solid fa-arrow-right ml-2"></i>
        </Link>
      </div>
    </div>
  );
};

export default Post;
