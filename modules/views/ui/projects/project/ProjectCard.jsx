import Image from "next/image";
import Link from "next/link";

const ProjectCard = ({ imageUrl, projectNo, title, description, url }) => {
  return (
    // Reduced height slightly for better mobile UX; used relative positioning
    <div className="min-h-[60vh] md:h-[75vh] w-[90%] lg:w-[80%] mx-auto relative mb-20 group">
      {/* Background Image Layer */}
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <Image
          src={imageUrl}
          alt={`${title} project image`}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content Layer */}
      <div
        className="
        relative md:absolute 
        top-10 md:-left-10 
        w-full max-w-[95%] md:max-w-md lg:max-w-lg
        bg-white/95 backdrop-blur-sm md:bg-gray-100 
        rounded-lg p-6 md:p-12 lg:p-16
        flex flex-col justify-center gap-4 
        shadow-2xl z-10
      "
      >
        <p className="font-[Mulish] text-green-800 uppercase tracking-widest text-sm font-bold">
          Project {projectNo}
        </p>

        {/* Title: Uses break-words and responsive text size */}
        <h2 className="font-bold font-[Mulish] text-3xl md:text-4xl leading-tight text-gray-900 break-words line-clamp-3">
          {title}
        </h2>

        {/* Description: Added line-clamp to prevent infinite vertical growth */}
        <p className="text-gray-600 text-sm md:text-base line-clamp-3 md:line-clamp-4 leading-relaxed">
          {description}
        </p>

        <Link
          href={url}
          className="mt-2 w-fit px-8 py-3 bg-gray-800 text-white rounded-full flex justify-center items-center hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
