# Bytebase Login Project

This is a React + TypeScript project that implements a GitHub OAuth login page, inspired by Bytebase. The project includes:

- GitHub OAuth login
- Profile page displaying GitHub user info (avatar, username, followers, following)
- Mobile responsive UI
- Clean file structure and clear code comments

## Technologies

- React
- TypeScript
- Tailwind CSS
- Express.js (backend for OAuth token exchange)
- Vite

## How to Run Locally

1. Clone the repo: `git clone https://github.com/MeriemRougui/bytebase-login.git`
2. Install dependencies: `npm install`
3. Setup `.env.local` with your GitHub OAuth credentials
4. Run the frontend: `npm run dev`
5. Run the backend: `npm run dev` inside `/server` folder
6. Open `http://localhost:5173` in your browser

## Notes

- This project is for demo purposes and uses GitHub OAuth.
- Environment variables (`.env` files) are not included for security reasons.
