import axios from "axios"


export const axiosBaseUrl = axios.create({
    baseURL:"http://localhost:9090/api"
})


export const LoginUser = async (value)=>{
try {    
    const res = await axiosBaseUrl.post("/auth/login", value,{withCredentials:true});
    return res.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}
export const registerUser = async (value)=>{
try {    
    const res = await axiosBaseUrl.post("/auth/register", value,{withCredentials:true});
    return res.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}

export const logoutUser = async () => {
  try {    
    const res = await axiosBaseUrl.post("/auth/logout", {}, {
      withCredentials: true, // ✅ ye add karna mandatory hai
    });
    return res.data;
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
}


export const getMe = async ()=>{
try {    
  const res = await axiosBaseUrl.get("/auth/me",{withCredentials:true});
    return res.data;
  } catch (error) {
    console.error("User not found:", error);
    throw error;
  }
}

export const getAllHistory = async (userId)=>{
try {    
  const res = await axiosBaseUrl.get(`/resume/history/${userId}`,{withCredentials:true});
    return res.data?.resumes;
  } catch (error) {
    console.error("History Error:", error);
    throw error;
  }
}