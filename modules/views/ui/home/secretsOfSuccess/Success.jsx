export default function Success({ Icon, title, description }) {
  return (
    <div className="max-w-120 mx-auto lg:mx-0">
      <Icon className="text-green-400 text-3xl text-center lg:text-left w-full lg:my-4" />
      <h3 className="text-xl mt-3 text-center lg:text-left">{title}</h3>
      <p className="text-gray-700 text-center lg:text-left">{description}</p>
    </div>
  );
}
