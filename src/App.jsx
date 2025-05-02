import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppContext } from "./context/contextApi"; // Import AppContext
import Homepage from "./components/pages/Homepage";
import Login from "./components/pages/Signup/Login";
import Signup from "./components/pages/Signup/Signup";
import User from "./components/pages/User"; // Import the User component

function App() {
  return (
    <AppContext>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user" element={<User />} /> {/* Add the /user route */}
        </Routes>
      </Router>
    </AppContext>
  );
}

export default App;
