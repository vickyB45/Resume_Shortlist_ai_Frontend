import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[90vh]  max-w-6xl mx-auto my-4">
      <h1 className="text-6xl font-bold mb-5">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-600 mb-6">
        Oops! The page you are looking for does not exist.
      </p>
      <button
        onClick={() => navigate("/")}
        className="cursor-pointer px-6 py-2 bg-black text-white rounded-lg shadow-md hover:bg-gray-800 transition"
      >
        Go to Home
      </button>
    </div>
  );
};

export default NotFound;
