import Image from "next/image";

const AboutPic = ({ image }) => {
  return (
    <div className="flex-1 flex justify-center items-end pt-20 gap-6 bg-green-200 min-h-screen p-10">
      <div className="w-42 h-[500px] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 ease-in-out mb-15 relative">
        <Image
          fill
          src={image}
          alt="about us image"
          className="object-cover object-left transition-transform duration-500 ease-in-out hover:scale-105 cursor-pointer"
          sizes="(max-width: 400px) 100vw, (max-width: 600px) 50vw, 33vw"
        />
      </div>

      <div className="w-46 h-[600px] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 ease-in-out relative">
        <Image
          fill
          src={image}
          alt="about us image"
          className="object-cover object-center transition-transform duration-500 ease-in-out hover:scale-105 cursor-pointer"
          sizes="(max-width: 400px) 100vw, (max-width: 600px) 50vw, 33vw"
        />
      </div>

      <div className="w-42 h-[500px] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 ease-in-out mb-15 relative">
        <Image
          fill
          src={image}
          alt="about us image"
          className="object-cover object-right transition-transform duration-500 ease-in-out hover:scale-105 cursor-pointer"
          sizes="(max-width: 400px) 100vw, (max-width: 600px) 50vw, 33vw"
        />
      </div>
    </div>
  );
};

export default AboutPic;
