# Video Wall 🎥

**Video Wall** is a modern video hosting platform inspired by YouTube. It provides a seamless and responsive user interface for browsing, watching, and interacting with video content. The platform includes a robust backend for managing user authentication, video uploads, and interactions.

---

## 🌟 Features

### Frontend Features
- **🔒 User Authentication**: Register, log in, and manage user profiles.
- **📹 Video Browsing**: Explore a wide range of videos categorized by genres.
- **🔍 Search Functionality**: Search for specific videos using keywords.
- **🎬 Video Playback**: Watch videos with a responsive and modern video player.
- **💬 Comments Section**: Leave comments and interact with other viewers.
- **📱 Responsive Design**: Fully optimized for both desktop and mobile devices.

### Backend Features
- **User Registration**: Create an account with full name, email, username, and password. Avatar and cover images can also be uploaded.
- **User Login**: Log in using username or email and password. Access and refresh tokens are generated upon successful login.
- **User Logout**: Log out to clear refresh and access token cookies.
- **Token Refresh**: Refresh access tokens using a valid refresh token.
- **Change Password**: Update the current password after verifying the old password.
- **Update Account Details**: Modify full name and email address.
- **Update Avatar and Cover Image**: Upload or update avatar and cover images.
- **Get User Channel Profile**: View channel profile, including subscriber counts and subscription status.
- **Watch History**: Retrieve watch history, including details about watched videos.

-**Explore Backend repo**: https://github.com/mayank-kumar03/My-Youtube

---

## 🚀 Technologies Used

### Frontend
| **Technology**       | **Description**                                                                 |
|-----------------------|---------------------------------------------------------------------------------|
| ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black) | A JavaScript library for building user interfaces.                  |
| ![Vite](https://img.shields.io/badge/Vite-64B64D?style=flat&logo=vite&logoColor=white)   | A fast build tool and development server for modern web projects.   |
| ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white) | For making API requests.                                            |
| ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat&logo=react-router&logoColor=white) | For handling navigation within the application.                     |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) | For styling the application with utility-first CSS.                 |

### Backend
| **Technology**       | **Description**                                                                 |
|-----------------------|---------------------------------------------------------------------------------|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white) | JavaScript runtime for building the backend.                       |
| ![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white) | Web framework for building RESTful APIs.                           |
| ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white) | NoSQL database for storing user and video data.                    |
| ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat&logoColor=white) | ODM for MongoDB to manage data models.                             |
| ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat&logo=cloudinary&logoColor=white) | Cloud service for image and video uploads.                         |
| ![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=json-web-tokens&logoColor=white) | For secure user authentication.                                    |
| ![Multer](https://img.shields.io/badge/Multer-FF5733?style=flat&logoColor=white) | Middleware for handling file uploads.                              |

---

## 📂 Project Structure

### Frontend
youtube-frontend/
├── public/ # Static files
├── src/ # Source files
│ ├── components/ # Reusable components
│ ├── pages/ # Page components
│ ├── styles/ # CSS files
│ ├── App.jsx # Main application component
│ └── index.jsx # Entry point
├── package.json # Project metadata and dependencies
└── vite.config.js # Vite configuration

