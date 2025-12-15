import contactBg from "@/public/assets/contactbg.jpg";
import Image from "next/image";

import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Form from "./ContactForm";

const Contact = () => {
  return (
    <section className="min-h-screen w-full flex justify-center items-center relative">
      <Image
        fill
        src={contactBg}
        className="object-cover absolute"
        alt="contact image"
      />
      <div className="inset-0 bg-black opacity-60 absolute"></div>
      <div className="flex flex-col lg:flex-row w-5/6 bg-white my-10 z-10">
        <div className="bg-green-950 flex-1 px-4 sm:px-20 py-8">
          <div className="h-20 w-20 rounded-full border-2 border-white flex justify-center items-center">
            <MdEmail className="text-white text-4xl" />
          </div>
          <div className="my-10">
            <h3 className="uppercase font-semibold text-5xl text-white">
              contact info
            </h3>
            <div className="flex gap-2 h-25 mt-8">
              <div className="h-15 min-w-15 rounded-full border-2 border-white flex justify-center items-center my-auto">
                <FaPhoneAlt className="text-white text-xl" />
              </div>
              <div className="my-auto">
                <a href="">
                  <p className="text-white text-lg">+252 63 4456478</p>
                </a>
                <a href="">
                  <p className="text-white text-lg">+252 63 4456522</p>
                </a>
              </div>
            </div>

            <div className="flex gap-2 h-25 mt-2">
              <div className="h-15 min-w-15 rounded-full border-2 border-white flex justify-center items-center my-auto">
                <FaLocationDot className="text-white text-xl" />
              </div>
              <div className="my-auto">
                <a href="">
                  <p className="text-white text-lg">shabaco@gmail.com</p>
                </a>
              </div>
            </div>

            <div className="flex gap-2 h-25 mt-2">
              <div className="h-15 min-w-15 rounded-full border-2 border-white flex justify-center items-center my-auto ">
                <MdEmail className="text-white text-xl" />
              </div>
              <div className="my-auto">
                <a href="">
                  <p className="text-white text-lg text-wrap">
                    sheekh cismaan, near borama regional hospital Borama, Awdal
                    Somaliland
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-2">
          <Form />
        </div>
      </div>
    </section>
  );
};

export default Contact;
