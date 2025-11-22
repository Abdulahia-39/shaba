import { TiTick } from "react-icons/ti";
import { RiSpeakFill } from "react-icons/ri";
import { ImTarget } from "react-icons/im";
import { FaTree } from "react-icons/fa6";

const visionData = [
  {
    id: 1,
    Icon: TiTick,
    title: "Delivering Excellence in Water Services",
    description:
      "To provide reliable, affordable, and high-quality water supply services that meet the evolving needs of our growing community.",
  },
  {
    id: 2,
    Icon: RiSpeakFill,
    title: "Empowering the Community",
    description:
      "To actively engage with stakeholders, including residents, businesses, and local government, to ensure inclusive decision-making and mutual benefit",
  },
  {
    id: 3,
    Icon: ImTarget,
    title: "Setting a Benchmark for Public-Private Partnerships (PPPs)",
    description:
      "To continue being a model for PPP success, inspiring other regions to adopt similar frameworks for effective service delivery.",
  },
  {
    id: 4,
    Icon: FaTree,
    title: "Championing Innovation and Sustainability",
    description:
      "To adopt innovative technologies and renewable energy solutions for sustainable water production and distribution.",
  },
];

const Vision = () => {
  return (
    <section className="min-h-screen flex flex-col gap-6 h-full w-5/6 m-auto my-10 2xl:w-4/5">
      <div className="w-full text-center my-12">
        <h2 className="text-5xl font-semibold my-5">Shaba’s core visions</h2>
        <p className="text-lg text-green-500">The company’s visions</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10 mx-auto w-full items-center justify-items-center mt-15">
        {visionData.map((vision) => (
          <div
            className="h-100 px-2 shadow-2xl max-w-70 overflow-auto"
            key={vision.id}
          >
            <div className="flex justify-center my-8">
              <vision.Icon className="text-green-300 text-5xl" />
            </div>
            <div className="px-5">
              <h3 className="text-xl font-semibold text-center mb-5">
                {vision.title}
              </h3>
              <p className="text-gray-700 text-center">{vision.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Vision;
