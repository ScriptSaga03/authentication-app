import { useState } from "react";
import { Lock, Eye, EyeOff, CheckCircle } from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate } from "react-router-dom";
import { handleResetPassword } from "../services/handleRequest";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleResetPassword(token, newPassword, confirmPassword, setIsPasswordReset);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4">
      <ToastContainer />
      <div className="w-full max-w-md p-6 shadow-2xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-950 rounded-xl">
        
        {/* Success UI */}
        {isPasswordReset ? (
          <div className="text-center">
            <CheckCircle className="text-green-500 mx-auto mb-4" size={50} />
            <h2 className="text-2xl font-bold">Password Reset Successful</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Your password has been updated successfully.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
            >
              Go to Sign In
            </button>
          </div>
        ) : (
          // Reset Password Form
          <>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold">Reset Password</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-600 dark:text-gray-400 mb-1">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="pl-10 w-full bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-400 dark:border-gray-700 focus:ring-blue-500 py-2 px-4 rounded-lg outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-gray-600 dark:text-gray-400 mb-1">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 w-full bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-400 dark:border-gray-700 focus:ring-blue-500 py-2 px-4 rounded-lg outline-none focus:border-blue-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="flex items-center justify-end w-full mt-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 focus:outline-none"
                >
                  {showPassword ? (
                    <>
                      <EyeOff size={18} className="mr-2" />
                      Hide Password
                    </>
                  ) : (
                    <>
                      <Eye size={18} className="mr-2" />
                      Show Password
                    </>
                  )}
                </button>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
              >
                Reset Password
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
