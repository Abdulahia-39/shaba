export default function ProjectVideos() {
  return (
    <div className="w-11/12 lg:w-5/6 min-h-screen flex flex-col gap-10 mx-auto my-10">
      <div className="w-full text-center mt-10 md:mt-20">
        <h2 className="text-3xl md:text-5xl font-semibold mb-4 text-gray-900">
          Shaba’s and SDF
        </h2>
        <p className="text-base md:text-lg text-green-600 max-w-2xl mx-auto">
          Shaba’s collaboration with SDF to improve Borama’s water
          infrastructure
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <VideoItem
          src="https://www.youtube.com/embed/AExvlV5mLnI"
          title="Borama City: Meeting the growing needs for Water"
        />
        <VideoItem
          src="https://www.youtube.com/embed/S4AaVPdW4Qs"
          title="Meeting the water needs of Borama city"
        />
      </div>
    </div>
  );
}

// Reusable Video Component to keep code clean
function VideoItem({ src, title }) {
  return (
    <div className="w-full">
      {/* aspect-video ensures the 16:9 ratio is maintained automatically */}
      <div className="aspect-video w-full shadow-lg rounded-xl overflow-hidden bg-black">
        <iframe
          className="w-full h-full"
          src={src}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
      <p className="mt-3 text-sm font-medium text-gray-700">{title}</p>
    </div>
  );
}
