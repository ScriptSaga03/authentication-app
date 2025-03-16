import React, { useState, useContext } from "react";
import {
  ChevronLeft,
  User,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  Sun,
  Moon,
} from "lucide-react";
import { ThemeContext } from "../context/themeContext";
import leftSection from "../assets/left-section.png";
import OAuthMethod from "../common/OAuthMethod";
import { ToastContainer } from "react-toastify";
import { handleSubmit } from "../services/handleRequest";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { UserContext } from "../context/UserContext";

export default function SignUp() {
  const { handleAuthType } = useAuth();
  const { setIsSignedUp } = useContext(UserContext);
  const navigate = useNavigate();
  // context
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  // input User
  const [user, setUser] = useState({
    userName: "",
    userEmail: "",
    password: "",
  });

  // show password
  const [showPassword, setShowPassword] = useState(false);

  // handle OnChange
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  // navigate Function
  const handleNavigate = () => {
    handleAuthType();
    setIsSignedUp(true);
    navigate(`/verify-email?email=${encodeURIComponent(user.userEmail)}`);
    // navigate("/verify-email")
  };

  const handleJumpPage = () => {
    navigate("/signin");
  };

  return (
    <section
      style={{ overflow: "hidden" }}
      className="bg-white dark:bg-[#181a1b] min-h-screen text-gray-900 dark:text-white"
    >
      <ToastContainer />
      <div className="grid md:grid-cols-[1fr,2fr] grid-cols-1 h-screen w-full">
        {/* Left Side */}
        <div className="md:block hidden bg-gray-400 dark:bg-gray-700">
          <img
            src={leftSection}
            alt="Aesthetic background"
            className="w-full h-screen object-cover object-center"
          />
        </div>

        {/* Right Side */}
        <div className="p-6 md:p-10 flex flex-col justify-between h-full">
          {/* Header */}
          <div className="flex justify-between items-center text-gray-500 text-sm">
            <div className="flex items-center">
              <ChevronLeft size={20} />
              <p className="cursor-pointer hover:underline">Return Home</p>
            </div>
            <div className="flex items-center gap-4">
              <p className="flex items-center">
                <span className="hidden sm:inline">
                  Already have an account?
                </span>
                <span
                  onClick={handleJumpPage}
                  className="ml-1 uppercase font-semibold text-gray-800 dark:text-gray-300 underline cursor-pointer hover:text-gray-500 transition-all duration-200"
                >
                  Sign In
                </span>
              </p>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gray-200 dark:bg-[#2c2f33]"
              >
                {darkMode ? (
                  <Sun size={20} className="text-yellow-400" />
                ) : (
                  <Moon size={20} className="text-gray-600" />
                )}
              </button>
            </div>
          </div>
          {/* Form Section */}
          <div className="text-center md:mt-12 mt-6">
            <p className="lg:text-4xl sm:text-3xl text-2xl font-bold uppercase mb-2">
              Create Your Account
            </p>
            <p className="text-gray-400 text-sm sm:text-lg mb-6">
              Join now and start exploring
            </p>

            <form
              className="md:space-y-4 space-y-2 max-w-md w-full mx-auto"
              onSubmit={(e) =>
                handleSubmit(
                  e,
                  user,
                  setUser,
                  handleNavigate,
                  setIsSignedUp(true)
                )
              }
            >
              {/* Input Fields */}
              {[
                {
                  icon: <User size={20} />,
                  placeholder: "John Doe",
                  type: "text",
                  name: "userName",
                },
                {
                  icon: <Mail size={20} />,
                  placeholder: "example@email.com",
                  type: "email",
                  name: "userEmail",
                },
              ].map((input, index) => (
                <div key={index} className="mb-4">
                  <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md p-3 focus-within:border-gray-700 transition-all duration-200">
                    {input.icon}
                    <input
                      type={input.type}
                      name={input.name}
                      placeholder={input.placeholder}
                      value={user[input.name]}
                      onChange={handleOnChange}
                      className="w-full bg-transparent outline-none text-gray-700 dark:text-white pl-3"
                      autoComplete="off"
                    />
                  </div>
                </div>
              ))}

              {/* Password Field */}
              <div className="mb-4">
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md p-3 focus-within:border-gray-700 transition-all duration-200">
                  <Lock size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="*********"
                    name="password"
                    value={user.password}
                    onChange={handleOnChange}
                    className="w-full bg-transparent outline-none text-gray-700 dark:text-white pl-3"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-500 dark:text-gray-300 text-sm font-medium focus:outline-none hover:text-gray-700 transition"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                className="bg-gray-900 dark:bg-[#7289da] text-white w-full py-3 flex justify-between items-center px-5 text-lg font-medium rounded-md hover:bg-gray-800 dark:hover:bg-[#5a6fb2] transition-all duration-200"
                type="submit"
              >
                Create Your Account
                <ArrowRight size={20} />
              </button>
            </form>

            {/* OAuth Section */}
            <OAuthMethod />
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row justify-between items-center text-gray-500 dark:text-gray-400 text-sm text-center sm:text-left md:gap-2 md:mt-0 mt-4">
            <p>© 2025 - 2026 Mehtab Inc. All Rights Reserved</p>
            <p className="cursor-pointer hover:underline">Need Help?</p>
          </div>
        </div>
      </div>
    </section>
  );
}
