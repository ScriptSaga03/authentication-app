import { useState } from "react";
import { Mail } from "lucide-react";
import { handleForgetPassword } from "../services/handleRequest";
import { ToastContainer } from "react-toastify";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted((prev) => !prev);
    setSubmittedEmail(email);
    handleForgetPassword(email);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4">
      <ToastContainer />
      <div className="w-full max-w-md p-6 shadow-2xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-950 rounded-xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Forgot Password</h2>
        </div>
        {submitted ? (
          <div className="text-center">
            <Mail className="w-12 h-12 mx-auto text-blue-500" />
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              A reset link has been sent to
            </p>
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              {submittedEmail}
            </p>
            <div className="flex flex-col space-y-4 py-1">
              <a
                href={`mailto:${email}`}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-400 transition duration-300 flex items-center justify-center space-x-2"
              >
                <Mail className="w-5 h-5" />
                <span>Open Email</span>
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-600 dark:text-gray-400 mb-1">
                Enter your registered email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 w-full bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-blue-500 py-2 px-4 rounded-lg outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-400 text-white py-2 px-4 rounded-lg transition"
            >
              Send Reset Link
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
