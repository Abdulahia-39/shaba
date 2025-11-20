import Image from 'next/image';

const ProjectCard = ({ imageUrl, projectNo, title, description }) => {
  return (
    <div className="h-[80vh] md:h-[75vh] w-[80%] mx-auto relative mb-15">
      {/* Background Image Layer */}
      <Image
        src={imageUrl}
        alt={`${title} project image`}
        fill
        className="object-cover object-center"
      />
      {/* Content Layer */}
      <div className="h-[80%] max-w-70 md:h-[80%] md:max-w-110 absolute top-10 -left-10 bg-gray-100 rounded-md py-8 px-20 flex flex-col justify-center md:gap-5 gap-3 shadow-2xl z-10">
        <p className="font-[Mulish] text-green-800 uppercase">project {projectNo}</p>
        <h2 className="font-bold font[Mulish] text-4xl">{title}</h2>
        <p className="text-gray-500 line-clamp-3">{description}</p>
        <button className="w-40 h-15 bg-gray-800 text-white rounded-3xl">Read More</button>
      </div>
    </div>
  );
};

export default ProjectCard;