import { useMutation } from '@tanstack/react-query';
import { axiosBaseUrl } from '../api/api';
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useResumeContext } from "../components/context/resumeContext"

const useUploadResume = () => {

  const {setResumeData,resumeData} = useResumeContext()

  const navigate = useNavigate()

  return useMutation({
    mutationFn: async ({ file, job_desc }) => {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("job_desc", job_desc); // append job description

      const res = await axiosBaseUrl.post("/resume/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message)
      setResumeData(data?.data)
      navigate("/result")
    },
    onError: (error) => {
      toast.error(error.response?.data?.message)
      console.error("Upload Error:", error.response?.data || error.message);
    },
  });
};

export default useUploadResume;
