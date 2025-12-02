import React from "react";
import { FaGithub } from "react-icons/fa";

interface Props {
  onClick: () => void;
  loading: boolean;
}

const GithubLoginButton: React.FC<Props> = ({ onClick, loading }) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="w-full flex items-center justify-center bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <FaGithub className="w-5 h-5 mr-2" />
      {loading ? "Signing in..." : "Sign in with GitHub"}
    </button>
  );
};

export default GithubLoginButton;
