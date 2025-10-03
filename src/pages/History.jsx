import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllHistory } from "../api/api";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";

const History = () => {
  const [view, setView] = useState("card"); // "card" or "table"
  const { userId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["history", userId],
    queryFn: () => getAllHistory(userId),
    retry: false,
  });

  const resumes = data || [];

  return (
    <div className="p-6">
      {/* Toggle View */}
      <div className="flex justify-end mb-4 space-x-2 fixed top-4 w-[90vw]">
        <button
          onClick={() => setView("card")}
          className={`px-4 py-2 rounded-lg  ${
            view === "card"
              ? "bg-purple-600 text-white"
              : "bg-white text-gray-700 cursor-pointer"
          }`}
        >
          Card View
        </button>
        <button
          onClick={() => setView("table")}
          className={`px-4 py-2 rounded-lg  ${
            view === "table"
              ? "bg-purple-600 text-white"
              : "bg-white text-gray-700 cursor-pointer"
          }`}
        >
          Table View
        </button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid mt-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="p-4 rounded-xl shadow bg-gray-100 animate-pulse flex flex-col justify-between h-64"
              >
                <div className="h-6 bg-gray-300 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
                <div className="h-32 bg-gray-300 rounded"></div>
              </div>
            ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && resumes.length === 0 && (
        <div className="h-screen flex flex-col justify-center items-center text-gray-500">
          <h2 className="text-2xl font-semibold mb-2">No History Found 😕</h2>
          <p className="text-center max-w-xs">
            It looks like you haven’t uploaded any resumes yet. Start by adding
            some resumes to see your history here!
          </p>
        </div>
      )}

      {/* Data State */}
      {!isLoading && resumes.length > 0 && (
        <>
          {view === "card" ? (
            <div className="grid mt-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resumes.map((resume) => (
                <div
                  key={resume._id}
                  className="p-4 rounded-xl shadow hover:shadow-lg transition flex flex-col justify-between h-64"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold">{resume.resume_name}</h3>
                    <div
                      className={`flex items-center text-xs space-x-2 px-2 py-1 rounded-full  ${
                        resume.shortlisted ? "bg-green-200" : "bg-red-200"
                      }`}
                    >
                      {resume.shortlisted ? <FaCheckCircle /> : <FaTimesCircle />}
                      <span>{resume.shortlisted ? "Shortlisted" : "Not Shortlisted"}</span>
                    </div>
                  </div>

                  <div className="mb-2">
                    Score: <span className="font-bold text-purple-600">{resume.score}%</span>
                  </div>

                  <p className="text-gray-600 text-lg line-clamp-4">Feedback</p>
                  <p className="text-gray-600 text-sm line-clamp-4">{resume.feedback}</p>

                  <p className="text-gray-400 text-xs mt-2">
                    Updated: {new Date(resume.updatedAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto mt-10">
              <table className="min-w-full bg-white border rounded-xl">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4 text-left">Resume Name</th>
                    <th className="py-2 px-4 text-left">Score</th>
                    <th className="py-2 px-4 text-left">Shortlisted</th>
                    <th className="py-2 px-4 text-left">Updated At</th>
                  </tr>
                </thead>
                <tbody>
                  {resumes.map((resume) => (
                    <tr key={resume._id} className="border-b hover:bg-gray-50 transition">
                      <td className="py-2 px-4">{resume.resume_name}</td>
                      <td className="py-2 px-4">{resume.score}%</td>
                      <td className="py-2 px-4 flex items-center space-x-2">
                        {resume.shortlisted ? (
                          <FaCheckCircle className="text-green-500" />
                        ) : (
                          <FaTimesCircle className="text-red-500" />
                        )}
                        <span>{resume.shortlisted ? "Shortlisted" : "Not Shortlisted"}</span>
                      </td>
                      <td className="py-2 px-4">{new Date(resume.updatedAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default History;
