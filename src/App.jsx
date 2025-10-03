import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/PageNotFound";
import toast from "react-hot-toast";
import Sidebar from "./components/Sidebar";
import UploadResume from "./pages/UploadResume";
import Result from "./pages/Result";
import History from "./pages/History";
import Profile from "./pages/Profile";

// Protected Route
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("You are not authenticated!");
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  const token = localStorage.getItem("token"); // check if user is logged in
  const location = useLocation();

  // hide sidebar on login/register pages
  const hideSidebar =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="flex">
      {/* Sidebar only if user is logged in */}
      {token && !hideSidebar && <Sidebar />}

      {/* Main Content */}
      <main className={`flex-1 bg-gray-50 overflow-y-auto ${token && !hideSidebar ? "ml-20" : ""}`}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload-resume"
            element={
              <ProtectedRoute>
                <UploadResume />
              </ProtectedRoute>
            }
          />
          <Route
            path="/result"
            element={
              <ProtectedRoute>
                <Result />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history/:userId"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
