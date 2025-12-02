import React from "react";
import LoginCard from "../components/LoginCard";
import { useGithubLogin } from "../hooks/useGithubLogin";

export default function LoginPage() {
  const { login, loading } = useGithubLogin();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      {/* Centered card with responsive padding */}
      <div className="w-full max-w-md">
        <LoginCard onGithubLogin={login} loading={loading} />
      </div>
    </div>
  );
}
