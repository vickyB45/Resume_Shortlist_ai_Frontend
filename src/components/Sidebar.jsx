

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import { HiMenuAlt1 } from "react-icons/hi";
import { MdDashboardCustomize, MdHistory } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMe, logoutUser } from "../api/api";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  
  
  const queryClient = useQueryClient();
  
  const { data: user } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
  });

 const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      localStorage.removeItem("token");
      queryClient.setQueryData(["me"], null);
      toast.success("Logout successful");
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Logout failed!");
    },
});

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: "/", icon: MdDashboardCustomize, label: "Dashboard" },
    { path: `/history/${user?.id}`, icon: MdHistory, label: "History" },
    { path: "/profile", icon: FaUserEdit, label: "Profile" },
  ];

  return (
    <aside
      className={`fixed z-30 top-0 left-0 h-screen bg-white border-r-3 border-gray-100 flex flex-col transition-width duration-300 ${
        isExpanded ? "w-64" : "w-20"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b-2 border-gray-200">
        <button onClick={() => setIsExpanded(!isExpanded)} className="p-2 rounded hover:bg-zinc-100 cursor-pointer">
          <HiMenuAlt1 className="w-5 h-5" />
        </button>
        {isExpanded && <h1 className="text-xl uppercase font-bold">Job Portal</h1>}
      </div>

      {/* User Info */}
      

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center  gap-3 px-3 py-2 rounded hover:bg-gray-100 transition ${
                active ? "bg-zinc-200" : ""
              }`}
            >
              <Icon className="w-5 h-5" />
              {isExpanded && <span className="font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-gray-700 ">
        {user && (
        <div className="px-4 py-4 border-b border-gray-200">
          {isExpanded ? (
            <div>
              <p className="text-xs text-gray-400 mb-1">Welcome 👋</p>
              <p className="font-medium truncate">{user.name}</p>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="h-8 w-8 rounded-full select-none bg-black text-white flex items-center justify-center text-[15px]">
                {user.name?.charAt(0).toUpperCase()}
              </div>
            </div>
          )}
        </div>
      )}
        <button
          onClick={logout}
          disabled={isPending}
          className="flex w-full items-center cursor-pointer gap-3 px-3 py-2 rounded hover:bg-red-600 transition hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <LuLogOut className="w-5 h-5" />
          {isExpanded && <span>{isPending ? "Logging out..." : "Logout"}</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
