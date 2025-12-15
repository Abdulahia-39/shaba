export default function Loading() {
  return (
    <div className="flex flex-col gap-1 justify-between min-w-50 sm:min-w-85 sm:max-w-120 mx-auto min-h-100 animate-pulse">
      <div className="w-full bg-gray-400 h-[50%]"></div>
      <div className="flex flex-col gap-5 mx-2">
        <div className="w-full bg-gray-400 rounded-lg h-5"></div>
        <div className="w-full bg-gray-400 rounded-lg h-5"></div>
        <div className="w-full bg-gray-400 rounded-lg h-5"></div>
      </div>
    </div>
  );
}
