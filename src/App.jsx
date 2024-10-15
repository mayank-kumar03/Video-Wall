import Homepage from './components/pages/Homepage';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup'; // Note: 'Signup' was lowercase, renamed for consistency.
import UploadVideo from './components/pages/UploadVideo';
import VideoDetail from './components/pages/VideoDetail';
import Subscriptions from './components/pages/Subscriptions';
import Profile from './components/pages/Profile';
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <Router>
      <div>
        {/* Define the routes here */}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/upload" element={<UploadVideo />} />
          <Route path="/video/:id" element={<VideoDetail />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
