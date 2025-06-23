Backend

1. Navigate to the backend folder:
   cd backend

2 Create a .env file based on .env.example:

 MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

3 Install dependencies:
 npm install

4 Start the development server:
npm run dev


Frontend

1 Navigate to the frontend folder:

cd frontend

2 Create a .env.local file based on .env.example:

VITE_API_URL=http://localhost:5000/api


3 Install dependencies:

npm install
4 Start the development server:

npm run dev


Technologies Used

Node.js & Express for the API server

MongoDB & Mongoose for data storage

bcryptjs & jsonwebtoken for authentication

React & MUI for the frontend UI

Axios for HTTP requests

Vite as the frontend build tool

Key Features Implemented

Secure user authentication (signup, login, protected routes)

User profiles with name, avatar, and bio editing

Post creation with text (and optional image URL)

Global feed displaying all posts in reverse chronological order

Medium-style clap (likes) counter per post

Logout functionality in Navbar and Profile page

Limitations / Known Issues

Image uploads are via URL only; no direct file upload support.

No password reset or email verification flow implemented.

No pagination or infinite scroll on the feed.

No rate-limiting on the API—may be vulnerable to brute-force attacks.

Profile edits do not validate URL formats for avatar.
