import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const user = state?.user;

  if (!user) {
    navigate("/");
    return null;
  }

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-lg rounded-xl p-6 sm:p-8 max-w-sm w-full text-center">
        <img
          src={user.avatar_url}
          alt={user.login}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mb-4 border-2 border-gray-200"
        />
        <h1 className="text-xl sm:text-2xl font-bold mb-2">{user.login}</h1>
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full mb-4 transition-colors text-sm sm:text-base"
        >
          View GitHub Profile
        </a>
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-4 text-gray-700">
          <div>
            <span className="font-bold">{user.followers}</span>
            <p className="text-sm">Followers</p>
          </div>
          <div>
            <span className="font-bold">{user.following}</span>
            <p className="text-sm">Following</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-full transition-colors w-full sm:w-auto"
        >
          Log out
        </button>
      </div>
    </div>
  );
}
