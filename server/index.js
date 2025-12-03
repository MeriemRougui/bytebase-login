import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://meriemrougui.github.io",
    ],
  })
);

app.use(express.json());

// Use different IDs/secrets for dev and production
const CLIENT_ID =
  process.env.NODE_ENV === "production"
    ? process.env.GITHUB_CLIENT_ID
    : process.env.GITHUB_CLIENT_ID_LOCAL;

const CLIENT_SECRET =
  process.env.NODE_ENV === "production"
    ? process.env.GITHUB_CLIENT_SECRET
    : process.env.GITHUB_CLIENT_SECRET_LOCAL;

const FRONTEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://meriemrougui.github.io/bytebase-login"
    : "http://localhost:5173";

app.get("/", (req, res) => {
  res.json({
    message: "Backend is running",
    clientIdSet: !!CLIENT_ID,
    clientSecretSet: !!CLIENT_SECRET,
  });
});

// Step 1: Redirect user to GitHub to get code
app.get("/auth/github", (req, res) => {
  const redirectUri = `${FRONTEND_URL}/#/oauth/callback`; // frontend handles callback
  const githubUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=read:user`;
  res.redirect(githubUrl);
});

// Step 2: Frontend POSTs the code here to exchange for access token
app.post("/auth/github", async (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: "No code provided" });

  try {
    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
      }),
    });

    const tokenData = await tokenRes.json();
    if (tokenData.error) {
      console.error("GitHub OAuth error:", tokenData);
      return res.status(400).json(tokenData);
    }

    res.json(tokenData);
  } catch (err) {
    console.error("Token exchange error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
