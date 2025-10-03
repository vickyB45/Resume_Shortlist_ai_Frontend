import React from "react";
import Button from "../components/ui/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getMe, logoutUser } from "../api/api";
import { LuLogOut } from "react-icons/lu";
import HowItWorks from "../components/HowItWorks";
import { Link } from "react-router-dom";


const Dashboard = () => {

  
  return (


    <div className="font-sans min-h-screen  bg-white text-gray-800">
      {/* Navbar */}
      

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-10">
  {/* Left Side Content */}
  <div className="w-full md:w-1/2  text-center md:text-left">
    <h2 className="text-4xl md:text-5xl  leading-tight text-gray-900">
      Get Your <span className="text-purple-700">Resume Shortlisted</span> Faster
    </h2>
    <p className="mt-6 text-gray-600 text-[17px]">
      AI-powered tool to analyze, optimize, and match your resume with job
      descriptions.
    </p>

    <Link to ="/upload-resume"  className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
      <Button
        classname="bg-purple-600 text-white hover:bg-purple-700 px-6 py-3 rounded-xl shadow-md transition"
        text="Upload Resume"
      />
    
    </Link>
  </div>

  {/* Right Side Image */}
  <div className="w-full md:w-1/2 flex justify-center">
    <img
      src="/img/hero.svg"
      alt="Resume Illustration"
      className="w-4/5 md:w-full max-w-md drop-shadow-lg"
    />
  </div>
</section>


      {/* How It Works */}

      <HowItWorks />
      

      {/* Features Section */}
  
    </div>
  );
};



export default Dashboard