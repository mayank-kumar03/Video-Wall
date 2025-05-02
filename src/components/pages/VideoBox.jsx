const VideoBox = ({ name, link }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Video Player */}
      <video
        src={link}
        controls
        className="w-full h-40 object-cover"
      ></video>

      {/* Video Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{name}</h3>
        <p className="text-sm text-gray-600">Channel Name</p>
        <p className="text-sm text-gray-600">1M views • 1 day ago</p>
      </div>
    </div>
  );
};

export default VideoBox;