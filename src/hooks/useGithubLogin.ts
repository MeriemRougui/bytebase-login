import { useState } from "react";

export function useGithubLogin() {
  const [loading, setLoading] = useState(false);

  const login = () => {
    setLoading(true);

    // Detect local vs production
    const backendUrl =
      window.location.hostname === "localhost"
        ? "http://localhost:5000"
        : "https://bytebase-backend.vercel.app";

    // Redirect to backend OAuth route
    window.location.href = `${backendUrl}/auth/github`;
  };

  return { login, loading };
}
