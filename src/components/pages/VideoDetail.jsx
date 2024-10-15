import React from 'react';

const VideoDetail = ({ video }) => {
  return (
    <div>
      <video controls src={video.url} />
      <h2>{video.title}</h2>
      <p>{video.description}</p>
      <div>
        <button>Like</button>
        <button>Dislike</button>
      </div>
      <section>
        <h3>Comments</h3>
        {/* Comment section with replies */}
      </section>
    </div>
  );
};

export default VideoDetail;
