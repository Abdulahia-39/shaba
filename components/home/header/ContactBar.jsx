import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import Link from "next/link";

const ContactBar = () => {
  return (
    <div className="hidden md:flex justify-around items-center bg-none text-white p-4 h-15">
      <div className="flex-wrap gap-4 lg:flex lg:items-center lg:justify-center">
        <Link href="" className="flex items-center gap-2">
          <FaLocationDot className="text-2xl" />
          <span>Borama, Awdal Somaliland</span>
        </Link>
        <Link href="" className="flex items-center gap-2">
          <FaPhoneAlt className="text-2xl" />
          <span>+252 63 4456478</span>
        </Link>
        <Link href="" className="flex items-center gap-2">
          <MdEmail className="text-2xl" />
          <span>shabaco@gmail.com</span>
        </Link>
      </div>
      <div className="flex gap-6">
        <Link href="">
          <FaFacebook className="text-2xl" />
        </Link>
        <Link href="">
          <FaLinkedin className="text-2xl" />
        </Link>
        <Link href="">
          <FaYoutube className="text-2xl" />
        </Link>
        <Link href="">
          <FaXTwitter className="text-2xl" />
        </Link>
      </div>
    </div>
  );
};

export default ContactBar;
