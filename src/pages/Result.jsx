import React from 'react'
import { useResumeContext } from '../components/context/resumeContext'
import ScoreMeter from '../components/ScoreMeter'

const Result = () => {
  const { resumeData } = useResumeContext()
  console.log(resumeData)

  if (!resumeData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">No results found. Please upload a resume.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start pt-10 p-4">
      <div className="max-w-3xl w-full bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Resume Analysis Result
        </h1>

        {/* Score & Status */}
        <ScoreMeter score={resumeData?.score} shortlisted={resumeData?.shortlisted}/>

        {/* Feedback */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Feedback</h2>
          <p className="text-gray-600 leading-relaxed whitespace-pre-line">
            {resumeData?.feedback}
          </p>
        </div>

        {/* Job Description */}
        <div className="bg-gray-100 p-4 rounded-xl">
          <h3 className="text-md font-semibold text-gray-700 mb-2">Job Desccription</h3>
          <p className="text-gray-600 text-sm whitespace-pre-line">{resumeData?.job_desc}</p>
        </div>
      </div>
    </div>
  )
}

export default Result
