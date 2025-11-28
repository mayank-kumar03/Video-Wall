const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || "";

const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3";

export const fetchTrendingVideos = async (maxResults = 20) => {
  if (!YOUTUBE_API_KEY) {
    console.warn("YouTube API key not found. Please set VITE_YOUTUBE_API_KEY in .env");
    return [];
  }

  try {
    const response = await fetch(
      `${YOUTUBE_BASE_URL}/videos?part=snippet,statistics,contentDetails&chart=mostPopular&maxResults=${maxResults}&regionCode=US&key=${YOUTUBE_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data = await response.json();
    return data.items?.map((item) => ({
      id: item.id,
      videoId: item.id,
      title: item.snippet?.title || "Untitled",
      description: item.snippet?.description || "",
      thumbnailUrl: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.default?.url,
      channelName: item.snippet?.channelTitle || "Unknown Channel",
      channelId: item.snippet?.channelId,
      viewCount: parseInt(item.statistics?.viewCount || 0),
      likeCount: parseInt(item.statistics?.likeCount || 0),
      publishedAt: item.snippet?.publishedAt,
      duration: item.contentDetails?.duration,
      link: `https://www.youtube.com/watch?v=${item.id}`,
    })) || [];
  } catch (error) {
    console.error("Error fetching trending videos:", error);
    return [];
  }
};

export const searchVideos = async (query, maxResults = 20) => {
  if (!YOUTUBE_API_KEY) {
    console.warn("YouTube API key not found. Please set VITE_YOUTUBE_API_KEY in .env");
    return [];
  }

  try {
    const response = await fetch(
      `${YOUTUBE_BASE_URL}/search?part=snippet&type=video&q=${encodeURIComponent(query)}&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data = await response.json();
    const videoIds = data.items?.map((item) => item.id.videoId).join(",") || "";

    if (!videoIds) return [];

    const detailsResponse = await fetch(
      `${YOUTUBE_BASE_URL}/videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=${YOUTUBE_API_KEY}`
    );

    if (!detailsResponse.ok) {
      throw new Error(`YouTube API error: ${detailsResponse.status}`);
    }

    const detailsData = await detailsResponse.json();
    return detailsData.items?.map((item) => ({
      id: item.id,
      videoId: item.id,
      title: item.snippet?.title || "Untitled",
      description: item.snippet?.description || "",
      thumbnailUrl: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.default?.url,
      channelName: item.snippet?.channelTitle || "Unknown Channel",
      channelId: item.snippet?.channelId,
      viewCount: parseInt(item.statistics?.viewCount || 0),
      likeCount: parseInt(item.statistics?.likeCount || 0),
      publishedAt: item.snippet?.publishedAt,
      duration: item.contentDetails?.duration,
      link: `https://www.youtube.com/watch?v=${item.id}`,
    })) || [];
  } catch (error) {
    console.error("Error searching videos:", error);
    return [];
  }
};

export const formatViewCount = (count) => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M views`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K views`;
  }
  return `${count} views`;
};

export const formatPublishedDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 1) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
};

