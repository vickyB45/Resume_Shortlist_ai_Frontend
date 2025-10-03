import { createContext, useContext, useState } from "react";

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(null);
  const [resumes,setResumes] = useState(null)

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData,resumes,setResumes }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResumeContext = () => useContext(ResumeContext);
