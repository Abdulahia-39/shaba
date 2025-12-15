import Image from "next/image";
import Link from "next/link";

const ProjectCard = ({ imageUrl, projectNo, title, description, url }) => {
  return (
    <div className="h-[90vh] md:h-[75vh] w-[80%] mx-auto relative mb-15">
      {/* Background Image Layer */}
      <Image
        src={imageUrl}
        alt={`${title} project image`}
        fill
        className="object-cover object-center"
      />
      {/* Content Layer */}
      <div className="h-[90%] max-w-70 md:h-[95%] md:max-w-110 absolute top-10 -left-10 bg-gray-100 rounded-md py-8 px-20 flex flex-col justify-center md:gap-5 gap-3 shadow-2xl z-10">
        <p className="font-[Mulish] text-green-800 uppercase">
          project {projectNo}
        </p>
        <h2 className="font-bold font[Mulish] text-4xl">{title}</h2>
        <p className="text-gray-500 hidden sm:inline line-clamp-4">
          {description}
        </p>
        <Link
          href={url}
          className="w-40 h-15 bg-gray-800 text-white rounded-3xl flex justify-center items-center hover:bg-gray-700 transition-all duration-300"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
