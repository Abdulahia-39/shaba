import sdf from "../../../public/assets/sdf.png";
import mowr from "../../../public/assets/mowr.png";
import unicef from "../../../public/assets/unicef.png";
import dawladahoose from "../../../public/assets/dawladahoose.png";

import Partner from "./Partner";

const Partners = () => {
    return (
        <section className="w-5/6 min-h-96 flex flex-col gap-10 h-full mx-auto my-10">
            <div className="w-full text-center my-12 h-1/3">
                <h2 className="text-5xl font-semibold my-5">Our Partners</h2>
                <p className="text-lg text-green-500">With our Trusted Partnerships, We Keep Driving Progress Together</p>
            </div>
            <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 min-h-70 mb-10 flex-wrap">
                <Partner
                    image={unicef}
                    title="UNICEF"
                />
                <Partner
                    image={mowr}
                    title="MoWR"
                />
                <Partner
                    image={sdf}
                    title="SDF"
                />
                <Partner
                    image={dawladahoose}
                    title="Borama Mucipality"
                />
            </div>
        </section>
    )
}

export default Partners;