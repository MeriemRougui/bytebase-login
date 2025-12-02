import React from "react";
import GithubLoginButton from "./GithubLoginButton";
import bytebaseLogo from "../assets/bytebase-logo.svg";

interface LoginCardProps {
  onGithubLogin: () => void;
  loading: boolean;
}

const LoginCard: React.FC<LoginCardProps> = ({ onGithubLogin, loading }) => {
  return (
    <div className="bg-white shadow-xl rounded-xl p-6 sm:p-8 md:p-10 max-w-md w-full mx-4">
      <div className="flex justify-center mb-6">
        <div className="bg-gray-900 text-white rounded-lg p-3 inline-block">
          <span className="font-bold text-xl">BB</span>
        </div>
      </div>
      
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-3 text-gray-800">
        Welcome to Bytebase
      </h1>
      <p className="text-center text-gray-500 mb-8 text-sm sm:text-base">
        Sign in with GitHub to continue
      </p>
      
      <GithubLoginButton onClick={onGithubLogin} loading={loading} />
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-center text-gray-500 text-sm">
          By signing in, you agree to our Terms and Privacy Policy
        </p>
      </div>
    </div>
  );
};
export default LoginCard;
