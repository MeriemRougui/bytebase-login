import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function OauthCallback() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const code = params.get("code");

  useEffect(() => {
    if (!code) {
      navigate("/");
      return;
    }

    const exchangeToken = async () => {
      try {
        const res = await fetch("http://localhost:5000/auth/github", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        
        if (data.error) {
          throw new Error(data.error_description || "OAuth failed");
        }

        const accessToken = data.access_token;
        
        // Fetch user info
        const userRes = await fetch("https://api.github.com/user", {
          headers: { 
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/vnd.github.v3+json"
          },
        });
        
        if (!userRes.ok) {
          throw new Error("Failed to fetch user data");
        }
        
        const userData = await userRes.json();
        
        // Store token in localStorage (optional)
        localStorage.setItem("github_token", accessToken);
        
        // Navigate to profile
        navigate("/profile", { 
          state: { user: userData },
          replace: true // Prevent back navigation to callback
        });
        
      } catch (err) {
        console.error("OAuth error:", err);
        setError(err instanceof Error ? err.message : "Authentication failed");
        setTimeout(() => navigate("/"), 3000);
      }
    };

    exchangeToken();
  }, [code, navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">Error: {error}</div>
          <p>Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p>Completing sign in...</p>
      </div>
    </div>
  );
}