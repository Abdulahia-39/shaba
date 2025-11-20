import shabaLogo from "@/public/assets/shabalogo.png";
import Link from 'next/link';
import Image from "next/image";

const Footer = () => {
    return (
        <footer className="border-t-1 border-gray-400">
            <div className="flex flex-col sm:flex-row items-center p-10 w-11/12 mx-auto gap-10">
                <div className="flex-1 flex flex-col gap-5 ">
                    <div className="flex-1 flex flex-col items-center sm:items-start gap-3">
                        {/* <img src={shabaLogo} alt="" className="h-15" /> */}
                        <Image 
                            height={60}
                            width={60}
                            src={shabaLogo}
                            alt="shaba logo"
                        />
                        <p className="font-bold">SHABA</p>
                    </div>
                    <div className="flex-1 flex flex-col md:flex-row gap-6">
                        <div className="flex flex-col items-center sm:items-start gap-3">
                            <p className="text-gray-700">Email</p>
                            <p className="text-sm text-gray-700">shabaco@gmail.com</p>
                        </div>
                        <div className="flex flex-col items-center sm:items-start gap-3 ">
                            <p className="text-gray-700">Phone number</p>
                            <p className="text-sm text-gray-700 text-center">+252 63 4456478 / +252 63 4456522</p>
                        </div>                      
                    </div>
                </div>
                <div className="flex-1 flex flex-col sm:flex-row justify-center gap-10 lg:gap-20 text-gray-800 p-4">
                    <div className='flex-1'>
                        <ul className="flex flex-col gap-2">
                            <li className='text-black font-medium text-lg'>Pages</li>
                            <Link href="/"><li className='text-sm cursor-pointer'>Home</li></Link>
                            <Link href="/Projects"><li className='text-sm cursor-pointer'>Projects</li></Link>
                            <Link href="/"><li className='text-sm cursor-pointer'>Blog</li></Link>
                            <Link href="/"><li className='text-sm cursor-pointer'>Report</li></Link>
                            <Link href="Contact"><li className='text-sm cursor-pointer'>Contact</li></Link>
                            <Link href="/About"><li className='text-sm cursor-pointer'>About</li></Link>
                        </ul>
                    </div>
                    <div className='flex-1'>
                        <ul className="flex flex-col gap-2">
                            <li className='text-black font-medium text-lg'>Resources</li>
                            <Link href="/Blog"><li className='text-sm'>Blog</li></Link>
                            <a><li className='text-nowrap text-sm'>2019 report</li></a>
                            <a><li className='text-nowrap text-sm'>2020 report</li></a>
                            <a><li className='text-sm'>Careers</li></a>
                        </ul>
                    </div>
                    <div className='flex-1'>
                        <ul className="flex flex-col gap-2">
                            <li className='text-black font-medium text-lg'>Company</li>
                            <a><li className='text-sm'>About us</li></a>
                            <a><li className='text-sm'>Our work</li></a>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-10 sm:flex-row items-center bg-green-300 px-20 py-5">
                <div className="flex-1">
                    &copy; 2025 Shaba. All rights reserved.
                </div>
                <div className="flex-1 flex justify-end gap-4 text-2xl">
                    <div className="flex justify-center items-center border-2 border-green-950 rounded-full w-10 h-10">
                        <i className="fa-brands fa-linkedin text-green-950"></i>
                    </div>
                    <div className="flex justify-center items-center border-2 border-green-950 rounded-full w-10 h-10">
                        <i className="fa-brands fa-facebook text-green-950"></i>
                    </div>
                    <div className="flex justify-center items-center border-2 border-green-950 rounded-full w-10 h-10">
                        <i className="fa-brands fa-youtube text-green-950"></i>
                    </div>
                    <div className="flex justify-center items-center border-2 border-green-950 rounded-full w-10 h-10">
                        <i className="fa-brands fa-twitter text-green-950"></i>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;