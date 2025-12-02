import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors({
  origin: [
    "http://localhost:5173", 
    "http://localhost:3000",  
    "https://MeriemRougui.github.io" 
  ],
  credentials: true  
}));
app.use(express.json());

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

app.post("/auth/github", async (req, res) => {
  const { code } = req.body;
  
  if (!code) {
    return res.status(400).json({ error: "No code provided" });
  }

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
      return res.status(400).json(tokenData);
    }
    
    res.json(tokenData);
  } catch (error) {
    console.error("Token exchange error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});