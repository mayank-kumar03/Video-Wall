import { formatViewCount, formatPublishedDate } from "../../utils/youtubeService";

const VideoBox = ({ 
  name, 
  link, 
  title, 
  thumbnailUrl, 
  channelName, 
  viewCount, 
  publishedAt,
  videoId 
}) => {
  const displayTitle = title || name || "Untitled Video";
  const displayThumbnail = thumbnailUrl || link;
  const displayChannel = channelName || "Unknown Channel";
  const displayViews = viewCount !== undefined ? formatViewCount(viewCount) : "0 views";
  const displayDate = publishedAt ? formatPublishedDate(publishedAt) : "";

  const handleClick = () => {
    if (videoId || link) {
      const youtubeUrl = videoId 
        ? `https://www.youtube.com/watch?v=${videoId}`
        : link;
      window.open(youtubeUrl, "_blank");
    }
  };

  return (
    <div 
      className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={handleClick}
    >
      {/* Video Thumbnail */}
      <div className="relative w-full h-40 bg-gray-200 overflow-hidden">
        {displayThumbnail ? (
          <img
            src={displayThumbnail}
            alt={displayTitle}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/320x180?text=Video";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300">
            <span className="text-gray-500">No thumbnail</span>
          </div>
        )}
        {videoId && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-30 transition-all">
            <svg
              className="w-16 h-16 text-white opacity-0 hover:opacity-100 transition-opacity"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        )}
      </div>

      {/* Video Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate mb-1">
          {displayTitle}
        </h3>
        <p className="text-sm text-gray-600 truncate">{displayChannel}</p>
        <p className="text-sm text-gray-600">
          {displayViews}
          {displayDate && ` • ${displayDate}`}
        </p>
      </div>
    </div>
  );
};

export default VideoBox;