import image from "../../../assets/shabapics/shabapics1.jpg";

const Description = () => {
  return (
    <section className="mt-35">
        <div className="w-5/6 mx-auto flex gap-10 mb-20">
            <div className="flex-1">
                <p className="text-5xl font-semibold text-gray-300">01</p>
            </div>
            <div className="flex-3">
                <h2 className="text-5xl font-semibold mb-8">Projects</h2>
                <p className="mt-5 text-gray-500">The projects Shaba has taken focus on addressing Borama’s critical water supply challenges by leveraging sustainable solutions and modern infrastructure. These projects aim to explore alternative water sources which aim to enhance the groundwater recharge and tap renewable surface water resources.</p>
            </div>
            <div className="flex-5 flex justify-center">
                <div className="h-110 w-120 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}></div>
            </div>           
        </div>
        <div className="w-5/6 mx-auto flex gap-10 mb-20">
            <div className="flex-1">
                <p className="text-5xl font-semibold text-gray-300">02</p>
            </div>
            <div className="flex-3">
                <h2 className="text-5xl font-semibold mb-8">Work Showcase</h2>
                <p className="text-green-600">Successfull Case Studies</p>
                <p className="mt-5 text-gray-500">The projects Shaba has taken focus on addressing Borama’s critical water supply challenges by leveraging sustainable solutions and modern infrastructure. These projects aim to explore alternative water sources which aim to enhance the groundwater recharge and tap renewable surface water resources.</p>
            </div>
            <div className="flex-5 flex justify-center">
                <div className="h-110 w-120 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}></div>
            </div>           
        </div>
    </section>
  );
}

export default Description;