import React, { useState, useEffect } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import useUploadResume from "../hooks/useUploadResume";

export default function UploadResume() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [job_desc, setjob_desc] = useState("");
  const [progress, setProgress] = useState(0); // For simulated progress

  const { mutate: uploadResume, isPending, isSuccess } = useUploadResume();

  // Clear file and job description on successful upload
  useEffect(() => {
    if (isSuccess) {
      setFile(null);
      setFileName("");
      setjob_desc("");
      setProgress(0); // Reset progress
    }
  }, [isSuccess]);

  // Simulate progress during upload (replace with real progress if hook supports it)
  useEffect(() => {
    if (isPending) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            return prev; // Stop near 100% to allow completion
          }
          return prev + Math.random() * 10; // Random increment for realism
        });
      }, 200);

      return () => clearInterval(interval);
    } else {
      setProgress(0);
    }
  }, [isPending]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setFileName(droppedFile.name);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleUpload = () => {
    if (!file) return;
    uploadResume({ file, job_desc });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl border border-gray-200">
        <h2 className="text-4xl text-gray-800 mb-6 text-center">
          Upload Your Resume
        </h2>

        {/* Drag & Drop File Upload */}
        <div className="flex md:flex-row flex-col justify-between">
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-purple-400 rounded-xl p-6 flex flex-col items-center justify-center mb-6 hover:border-purple-600 transition-all"
          >
            <MdOutlineFileUpload className="text-purple-600 text-8xl mb-4" />
            <p className="text-gray-600 text-lg text-center">
              Drag & drop your resume here
            </p>
            <p className="text-gray-500 text-sm mt-1 mb-3">or</p>

            {!fileName && (
              <label className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white text-center cursor-pointer transition-all duration-200 rounded-lg active:scale-[.97] w-full">
                Choose File
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            )}

            {fileName && (
              <p className="mt-2 text-green-600 text-sm font-medium">
                Selected: {fileName}
              </p>
            )}
          </div>

          {/* Job Description Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Job Description
            </label>
            <textarea
              value={job_desc}
              onChange={(e) => setjob_desc(e.target.value)}
              placeholder="Paste or write job description here..."
              className="w-full p-4 border border-gray-300 rounded-xl resize-none focus:outline-none focus:shadow-2xl focus:border-transparent transition"
              rows={8}
              cols={24}
            />
          </div>
        </div>

        {/* Upload Button or Progress Bar */}
        {fileName && !isPending && (
          <button
            onClick={handleUpload}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white cursor-pointer py-3 rounded-xl transition-all duration-200 active:scale-[.97] mb-4"
          >
            Upload Resume & Job Description
          </button>
        )}

        {/* Progress Bar Section */}
        {isPending && (
          <div className="w-full mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Uploading...</span>
              <span className="text-sm font-medium text-gray-700">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-purple-600 h-3 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress-1}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1 text-center">
              Please wait while we process your resume and job description.
            </p>
          </div>
        )}

        <p className="text-sm text-gray-400 text-center">
          Supported file: PDF
        </p>
      </div>
    </div>
  );
}
