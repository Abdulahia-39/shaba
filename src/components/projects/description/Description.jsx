import image from "../../../assets/shabapics/shabapics1.jpg";
import image2 from "../../../assets/shabapics/Picture1.jpg";

const Description = () => {
  return (
    <section className="w-5/6 mx-auto mt-35">
        <div className="flex gap-10 mb-20">
            <div className="flex-1">
                <p className="text-5xl font-semibold text-gray-300">01</p>
            </div>
            <div className="flex-3">
                <h2 className="text-5xl font-semibold mb-8">Projects</h2>
                <p className="mt-5 text-gray-500 w-80">The projects Shaba has taken focus on addressing Borama’s critical water supply challenges by leveraging sustainable solutions and modern infrastructure. These projects aim to explore alternative water sources which aim to enhance the groundwater recharge and tap renewable surface water resources.</p>
            </div>
            <div className="flex-5 flex justify-center">
                <div className="h-110 w-120 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}></div>
            </div>           
        </div>
        <div className="flex gap-10 mb-20">
            <div className="flex-1">
                <p className="text-5xl font-semibold text-gray-300">02</p>
            </div>
            <div className="flex-3">
                <h2 className="text-5xl font-semibold mb-8">Work Showcase</h2>
                <p className="text-green-600">Successfull Case Studies</p>
                <p className="mt-5 text-gray-500 w-80">The projects Shaba has taken focus on addressing Borama’s critical water supply challenges by leveraging sustainable solutions and modern infrastructure. These projects aim to explore alternative water sources which aim to enhance the groundwater recharge and tap renewable surface water resources.</p>
                <button className="text-left text-green-700 mt-5 font-semibold">See our publications
                    <i className="fa-solid fa-arrow-right ml-2"></i>
                </button>
            </div>
            <div className="flex-5 flex justify-center">
                <div className="h-110 w-120 bg-cover bg-center" style={{ backgroundImage: `url(${image2})` }}></div>
            </div>           
        </div>
    </section>
  );
}

export default Description;