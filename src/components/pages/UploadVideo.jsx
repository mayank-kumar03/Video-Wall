import React, { useState } from 'react';

const UploadVideo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);

  const handleUpload = (e) => {
    e.preventDefault();
    // Handle video upload logic
  };

  return (
    <div>
      <h2>Upload Video</h2>
      <form onSubmit={handleUpload}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadVideo;
