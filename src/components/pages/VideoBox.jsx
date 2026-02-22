import React, { useState } from "react";
import { formatViewCount, formatPublishedDate } from "../../utils/youtubeService";

const VideoBox = ({
  name,
  link,
  title,
  thumbnailUrl,
  channelName,
  viewCount,
  publishedAt,
  videoId,
}) => {
  // Video ko yahi play karne ke liye state
  const [isPlaying, setIsPlaying] = useState(false);

  const displayTitle = title || name || "Untitled Video";
  const displayThumbnail = thumbnailUrl || link;
  const displayChannel = channelName || "Unknown Channel";
  const displayViews =
    viewCount !== undefined ? formatViewCount(viewCount) : "0 views";
  const displayDate = publishedAt ? formatPublishedDate(publishedAt) : "";

  const handleClick = () => {
    if (videoId) {
      // Agar videoId hai toh hum state true kar denge iframe dikhane ke liye
      setIsPlaying(true);
    } else if (link) {
      // Fallback: Agar sirf link hai aur videoId nahi hai
      window.open(link, "_blank");
    }
  };

  return (
    <div
      className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col h-full"
      onClick={!isPlaying ? handleClick : undefined} // Agar play nahi ho raha tabhi click kaam karega
    >
      {/* Video Area (Thumbnail or Iframe) */}
      <div className="relative w-full h-40 bg-gray-200 overflow-hidden flex-shrink-0">
        {isPlaying && videoId ? (
          // Jab click hoga toh ye Iframe video ko wahin play karega
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={displayTitle}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          // Normal Thumbnail View
          <>
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
          </>
        )}
      </div>

      {/* Video Details */}
      <div className="p-4 flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-1">
          {displayTitle}
        </h3>
        <p className="text-sm text-gray-600 truncate">{displayChannel}</p>
        <p className="text-sm text-gray-600 mt-1">
          {displayViews}
          {displayDate && ` • ${displayDate}`}
        </p>
      </div>
    </div>
  );
};

export default VideoBox;