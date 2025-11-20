import image from "../../../public/assets/shabapics1.jpg";
// const image = "/assets/shabapics1.jpg"
// import image2 from "../../../assets/shabapics/Picture1.jpg";
import image2 from "../../../public/assets/Picture1.jpg"
import Image from "next/image";

const Description = () => {
  return (
    <section className="w-5/6 mx-auto mt-35">
        <div className="flex flex-col md:flex-row items-center gap-10 mb-20">
            <div className="flex-1 md:h-80">
                <p className="text-5xl font-semibold text-gray-300 md:pt-4">01</p>
            </div>
            <div className="flex-3">
                <h2 className="text-5xl font-semibold mb-8 text-center md:text-left">Projects</h2>
                <p className="mt-5 text-gray-500 sm:w-80 w-60 mx-auto xl:mx-0">The projects Shaba has taken focus on addressing Borama’s critical water supply challenges by leveraging sustainable solutions and modern infrastructure. These projects aim to explore alternative water sources which aim to enhance the groundwater recharge and tap renewable surface water resources.</p>
            </div>
            <div className="flex-5 flex justify-center">
                <div className="relative h-50 w-60 sm:h-90 sm:w-100 md:h-70 md:w-60 lg:h-100 lg:w-110">
                    <Image 
                    src={image} 
                    alt="A project image" 
                    fill 
                    className="object-cover object-center" 
                    />
                </div>
            </div>        
        </div>
        <div className="flex flex-col md:flex-row items-center gap-10 mb-20">
            <div className="flex-1 md:h-80">
                <p className="text-5xl font-semibold text-gray-300">02</p>
            </div>
            <div className="flex-3">
                <h2 className="text-5xl font-semibold mb-8 text-center md:text-left">Work Showcase</h2>
                <p className="text-green-600 text-center md:text-left">Successfull Case Studies</p>
                <p className="mt-5 text-gray-500 sm:w-80 w-60 mx-auto xl:mx-0">The projects Shaba has taken focus on addressing Borama’s critical water supply challenges by leveraging sustainable solutions and modern infrastructure. These projects aim to explore alternative water sources which aim to enhance the groundwater recharge and tap renewable surface water resources.</p>
                <button className="text-left text-green-700 mt-5 font-semibold pl-12 sm:pl-0">See our publications
                    <i className="fa-solid fa-arrow-right ml-2"></i>
                </button>
            </div>
            <div className="flex-5 flex justify-center">
                <div className="relative h-50 w-60 sm:h-90 sm:w-100 md:h-70 md:w-60 lg:h-100 lg:w-110">
                    <Image 
                    src={image2} 
                    alt="A project image" 
                    fill 
                    className="object-cover object-center" 
                    />
                </div>
            </div>           
        </div>
    </section>
  );
}

export default Description;