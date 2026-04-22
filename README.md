# SkillTok v2.0 — Enhanced App 🚀

## What's Fixed & Added

### 🐛 Bug Fixes
- **Login now works with real API** — connects to your backend (`/api/auth/login`)
- **Sign Up screen fully working** — password validation, strength meter, API integration
- **No more hardcoded bypass** — real JWT authentication

### ✨ New Features
- **Sign Up / Register Screen** — with password strength indicator
- **Search Screen** — full-text search by title, author, category
- **Browse by Category** — grid of all topics
- **Bottom Tab Navigation** — Discover | Search | Profile tabs
- **Sign Out button** — properly clears session
- **XP tracking** — earn XP by watching videos
- **Password show/hide** — eye icon on login & register

### 💎 UI/UX Improvements
- Cleaner dark theme throughout
- Better input fields with icons
- XP badge in feed header
- Video "Watched" badge
- Weekly activity tracker in profile
- Tabbed profile (Skills / Achievements)
- Level progress bar
- Empty state screens

---

## Setup Instructions

### 1. Backend (Server)
\`\`\`bash
cd server
npm install
# Make sure MongoDB is running locally, OR update .env with your MongoDB Atlas URI
# Edit .env: MONGODB_URI=your-connection-string
node index.js
# Server runs at http://localhost:3001
\`\`\`

### 2. Frontend (Client)
\`\`\`bash
cd client
npm install
npx expo start --web   # For web browser
npx expo start         # For Expo Go app on phone
\`\`\`

### 3. Environment (.env)
\`\`\`
PORT=3001
MONGODB_URI=mongodb://localhost:27017/skilltok
JWT_SECRET=skilltok-super-secret-key-2024
\`\`\`

> **Note:** If testing without a backend, you can temporarily revert LoginScreen.js login function to the bypass version for UI testing.

---

## Project Structure
\`\`\`
skilltok/
├── client/
│   ├── App.js               # Navigation setup (Stack + Bottom Tabs)
│   ├── screens/
│   │   ├── LoginScreen.js   ✅ Fixed - real API auth
│   │   ├── RegisterScreen.js ✨ NEW - full registration
│   │   ├── FeedScreen.js    ✅ Enhanced - search, XP, watched
│   │   ├── SearchScreen.js  ✨ NEW - search + browse
│   │   └── ProfileScreen.js ✅ Enhanced - tabs, logout, weekly activity
│   └── package.json
└── server/
    ├── index.js
    ├── routes/
    │   ├── auth.js          # POST /register, POST /login
    │   └── videos.js        # GET /feed, GET /search, POST /:id/like
    ├── middleware/auth.js
    ├── models/
    │   ├── user.js
    │   ├── video.js
    │   └── playlist.js
    └── .env
\`\`\`
