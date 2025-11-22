import homeAboutImage from "@/public/assets/homeaboutpic.jpg";
import Link from "next/link";
import Image from "next/image";

import { FaBuildingColumns } from "react-icons/fa6";

const About = () => {
  return (
    <section className="flex w-full flex-col lg:flex-row mb-15">
      <div className="flex-1 flex justify-center items-start pt-20 gap-6 min-h-screen p-10">
        <div className="relative w-35 sm:w-42 h-[400px] sm:h-[500px] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 ease-in-out">
          <Image
            src={homeAboutImage}
            alt="About image"
            fill // This makes the image fill its parent
            className="w-full h-full object-cover object-left transition-transform duration-500 ease-in-out hover:scale-105"
          />
        </div>

        <div className="relative w-37 sm:w-46 h-[500px] sm:h-[600px] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 ease-in-out mt-20">
          <Image
            fill
            src={homeAboutImage}
            alt="About Image"
            className="w-full h-full object-cover object-center transition-transform duration-500 ease-in-out hover:scale-105"
          />
        </div>

        <div className="relative w-35 sm:w-42 h-[400px] sm:h-[500px] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 ease-in-out">
          <Image
            fill
            src={homeAboutImage}
            alt="About Image"
            className="w-full h-full object-cover object-right transition-transform duration-500 ease-in-out hover:scale-105"
          />
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center items-start gap-6 p-10">
        <div className="w-full px-1">
          <p className="text-gray-800 text-center lg:text-left">About us</p>
          <h2 className="text-4xl font-semibold my-5 text-center lg:text-left">
            Providing Reliable Water Services
          </h2>
          <p className="text-center lg:text-left max-w-[450px] mx-auto lg:mx-0">
            Established in 2003, SHABA is a Public-Private Partnership (PPP)
            water supply company in Borama, a rapidly expanding city in
            Somaliland’s Awdal region. Partnering with the local government,
            SHABA manages the district’s water supply, addressing the needs of a
            city that has tripled in size over the past decade and is poised to
            become one of the region’s most populous urban centers.
          </p>
        </div>
        <div className="bg-[#fffcf2] shadow-lg rounded-lg p-6 flex gap-4 lg:w-full sm:w-[400px] md:w-[550px] w-[350] mx-auto mt-5">
          <div className="flex-1 flex justify-center items-center">
            <FaBuildingColumns className="text-green-300 text-2xl" />
          </div>
          <div className="flex-6 ">
            <h3 className="font-semibold text-xl my-3">
              Shaba pioneered PPP in the region
            </h3>
            <p className="">
              The PPP model transformed water service delivery in Borama,
              addressing the city’s longstanding challenges.
            </p>
          </div>
        </div>
        <div className="mt-4 p-4 flex flex-col justify-center items-end lg:w-full sm:w-[400px] md:w-[550px] w-[350] mx-auto">
          <Link href="/about">
            <p className="bg-green-800 text-white w-35 h-12 rounded-lg text-medium font-medium flex justify-center items-center">
              Learn More
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
