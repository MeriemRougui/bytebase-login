import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function OauthCallback() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const code = params.get("code");

  useEffect(() => {
    if (!code) {
      setError("No authorization code found.");
      setLoading(false);
      setTimeout(() => navigate("/"), 3000);
      return;
    }

    const exchangeToken = async () => {
      try {
        const backendUrl =
          import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

        // POST the code to backend to get access token
        const tokenRes = await fetch(`${backendUrl}/auth/github`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        });

        if (!tokenRes.ok) {
          throw new Error(`HTTP error! status: ${tokenRes.status}`);
        }

        const tokenData = await tokenRes.json();
        if (tokenData.error) {
          throw new Error(tokenData.error_description || "OAuth failed");
        }

        const accessToken = tokenData.access_token;

        // Fetch user info from GitHub API
        const userRes = await fetch("https://api.github.com/user", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/vnd.github.v3+json",
          },
        });

        if (!userRes.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await userRes.json();

        // Optional: store token
        localStorage.setItem("github_token", accessToken);

        // Navigate to profile page with user info
        navigate("/profile", { state: { user: userData }, replace: true });
      } catch (err) {
        console.error("OAuth error:", err);
        setError(err instanceof Error ? err.message : "Authentication failed");
        setLoading(false);
        setTimeout(() => navigate("/"), 3000);
      }
    };

    exchangeToken();
  }, [code, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        {loading && (
          <div>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Completing sign in...</p>
          </div>
        )}
        {error && (
          <div>
            <div className="text-red-500 mb-4">Error: {error}</div>
            <p>Redirecting to login...</p>
          </div>
        )}
      </div>
    </div>
  );
}
