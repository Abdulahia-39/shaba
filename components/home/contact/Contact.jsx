import contactBg from "@/public/assets/contactbg.jpg";
import Image from "next/image";

const Contact = () => {
    //bg-cover bg-center bg-fixed // style={{ backgroundImage: `linear-gradient(${overlayColor}, ${overlayColor}),url(${contactbg})` }} 
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
                        <i className="fa-solid fa-message text-white text-2xl"></i>
                    </div>
                    <div className="my-10">
                        <h3 className="uppercase font-semibold text-5xl text-white">contact info</h3>
                        <div className="flex gap-2 h-25 mt-8">
                            <div className="h-15 min-w-15 rounded-full border-2 border-white flex justify-center items-center my-auto">
                                <i className="fa-solid fa-phone text-white text-xl"></i>
                            </div>
                            <div className="my-auto">
                                <a href=""><p className="text-white text-lg">+252 63 4456478</p></a>
                                <a href=""><p className="text-white text-lg">+252 63 4456522</p></a>
                            </div>
                        </div>

                        <div className="flex gap-2 h-25 mt-2">
                            <div className="h-15 min-w-15 rounded-full border-2 border-white flex justify-center items-center my-auto">
                                <i className="fa-solid fa-message text-white text-xl"></i>
                            </div>
                            <div className="my-auto">
                                <a href=""><p className="text-white text-lg">shabaco@gmail.com</p></a>
                            </div>
                        </div>

                        <div className="flex gap-2 h-25 mt-2">
                            <div className="h-15 min-w-15 rounded-full border-2 border-white flex justify-center items-center my-auto ">
                                <i className="fa-solid fa-location-pin text-white text-xl"></i>
                            </div>
                            <div className="my-auto">
                                <a href=""><p className="text-white text-lg text-wrap">sheekh cismaan, near borama regional hospital Borama, Awdal Somaliland</p></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-2">
                    <form action="" className="h-full w-full p-15 flex flex-col gap-2">
                        <div className="">
                            <label htmlFor="firstname" className="w-full text-gray-500 font-medium text-sm">Firstname <span className="text-red-800">*</span></label>
                            <input type="text" name="firstname" id="firstname" className="w-full my-3 border-2 border-gray-300 outline-gray-300 p-2" placeholder='E.g abdulahi' autoComplete='off' required/>
                        </div>

                        <div className="">
                            <label htmlFor="email" className="w-full text-gray-500 font-medium text-sm">Email <span className="text-red-800">*</span></label>
                            <input type="email" name="email" id="email" className="w-full my-3 border-2 border-gray-300 outline-gray-300 p-2" placeholder='E.g example@email.com' autoComplete='off' required/>
                        </div>

                        <div className="">
                            <label htmlFor="phone" className="w-full text-gray-500 font-medium text-sm">Phone number</label>
                            <input type='tel' name="phone" id="phone" className="w-full my-3 border-2 border-gray-300 outline-gray-300 p-2" placeholder='E.g 252 63-4344323' autoComplete='off' required/>
                        </div>

                        <div className="">
                            <label htmlFor="message" className="w-full text-gray-500 font-medium text-sm">Message</label>
                            <textarea name="message" id="message" className="w-full my-3 border-2 border-gray-300 outline-gray-300 p-2 h-40" placeholder='Type your message here...' autoComplete='off' required></textarea>
                        </div>

                        <div className="flex justify-end">
                            <button type="submit" className="bg-green-950 text-white text-lg font-light w-46 h-13 rounded-4xl">Send Message</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Contact;