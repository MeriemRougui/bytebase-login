import { useState } from 'react';

export function useGithubLogin() {
  const [loading, setLoading] = useState(false);
  
  const login = () => {
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
    
    if (!clientId) {
      console.error("GitHub Client ID is missing");
      alert("GitHub OAuth is not configured. Please check environment variables.");
      return;
    }
    
    setLoading(true);
    const redirectUri = encodeURIComponent("http://localhost:5173/oauth/callback");
    const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=read:user`;
    
    window.location.href = url;
  };

  return { login, loading };
}