import sdf from '../../../assets/shabapics/sdf.png';
import mowr from '../../../assets/shabapics/mowr.png';
import unicef from '../../../assets/shabapics/unicef.png';

const Partners = () => {
    return (
        <section className="w-5/6 min-h-96 flex flex-col gap-10 h-full mx-auto my-10">
            <div className="w-full text-center my-12 h-1/3">
                <h2 className="text-5xl font-semibold my-5">Our Partners</h2>
                <p className="text-lg text-green-500">With our Trusted Partnerships, We Keep Driving Progress Together</p>
            </div>
            <div className=" flex justify-around items-center gap-10 min-h-70 mb-10 flex-wrap">
                <div className="">
                    <img src={unicef} alt="" className="h-35" />
                    <p className="text-center mt-8 text-gray-600">UNICEF</p>
                </div>
                <div className="">
                    <img src={mowr} alt="" className="h-35" />
                    <p className="text-center mt-8 text-gray-600">MoWR</p>
                </div>
                <div className="">
                    <img src={sdf} alt="" className="h-30" />
                    <p className="text-center mt-8 text-gray-600">SDF</p>
                </div>
            </div>
        </section>
    )
}

export default Partners;