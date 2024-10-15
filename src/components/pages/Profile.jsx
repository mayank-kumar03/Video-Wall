import React from 'react';

const Profile = ({ user }) => {
  return (
    <div>
      <h2>{user.username}</h2>
      <p>{user.email}</p>
      <h3>Your Uploaded Videos</h3>
      <div className="video-list">
        {/* Display user's uploaded videos */}
      </div>
    </div>
  );
};

export default Profile;
