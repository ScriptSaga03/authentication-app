import React, { useEffect, useState, useContext } from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/themeContext";
import { handleError, handleSuccess } from "../helper/utilis";
import { ToastContainer } from "react-toastify";
import {
  Sun,
  Moon,
} from "lucide-react";

export default function Dashboard() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext); // toggleDarkMode जोड़ें
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLogOut = () => setShowPopup(true);

  const confirmLogOut = () => {
    if (localStorage.getItem("authToken")) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      handleSuccess("User Logged Out Successfully!");
      setTimeout(() => navigate("/signin"), 2000);
    } else {
      handleError("Logout Failed!");
    }
    setShowPopup(false);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 
      ${darkMode ? "bg-gray-900" : "bg-gray-100"} 
      transition-colors duration-300`}
    >
      <ToastContainer/>
      {message.text && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 
          rounded-lg text-lg font-semibold shadow-md 
          ${
            message.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {message.text}
        </div>
      )}
      <div
        className={`relative w-full max-w-2xl p-10 rounded-3xl shadow-2xl 
        border ${
          darkMode
            ? "border-gray-800 bg-gray-950/50"
            : "border-gray-300 bg-white/70"
        } 
        backdrop-blur-lg transition-all duration-300`}
      >
        <h1
          className={`text-4xl font-extrabold text-center mb-4 
          ${darkMode ? "text-white" : "text-gray-900"}`}
        >
          👋 Welcome, {user?.name || "Guest"}!
        </h1>

        <p
          className={`text-lg text-center mb-6 
          ${darkMode ? "text-gray-300" : "text-gray-600"}`}
        >
          Manage your account and explore new features.
        </p>

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${
              darkMode ? "bg-gray-800" : "bg-gray-200"
            }`}
          >
            {darkMode ? <Sun size={20} color="white"/> :<Moon size={20} color="blue"/>}
          </button>
        </div>

        <div className="flex justify-center">
          <button
            className={`flex items-center gap-2 px-6 py-3 rounded-full 
              text-lg font-semibold shadow-md transition-all duration-300 
              ${
                darkMode
                  ? "bg-red-700 hover:bg-red-600"
                  : "bg-red-600 hover:bg-red-500"
              }`}
            onClick={handleLogOut}
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md">
          <div
            className={`p-6 rounded-xl shadow-lg text-center w-96 
            ${darkMode ? "bg-gray-800" : "bg-white"}`}
          >
            <h2
              className={`text-xl font-bold mb-4 
              ${darkMode ? "text-white" : "text-gray-900"}`}
            >
              Are you sure?
            </h2>

            <p
              className={`mb-6 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
            >
              Do you really want to log out?
            </p>

            <div className="flex justify-center gap-4">
              <button
                className={`px-4 py-2 rounded-lg transition-all 
                  ${
                    darkMode
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>

              <button
                className={`px-4 py-2 rounded-lg transition-all 
                  ${
                    darkMode ? 
                    "bg-red-600 hover:bg-red-500" : 
                    "bg-red-500 hover:bg-red-400"
                  }`}
                onClick={confirmLogOut}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
