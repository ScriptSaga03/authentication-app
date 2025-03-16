import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Mail, RefreshCw } from "lucide-react";
import { handleInfo } from "./utilis";
import { handleResendEmailVerification } from "../services/handleRequest";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  // Debugging: Log the email
  // console.log("Email from query params:", email);
  

  // Show toast notification if email is present
  useEffect(() => {
    if (email) {
      handleInfo(`We've sent a verification link to ${email}`);
    }
  }, [email]);

  const handleSubmit =()=>{
    handleResendEmailVerification(email)
  }

  // Fallback if email is missing
  if (!email) {
    return (
      <section className="bg-white dark:bg-[#181a1b] min-h-screen text-gray-900 dark:text-white">
        <div className="flex items-center justify-center min-h-screen p-6">
          <div className="max-w-md w-full text-center">
            <h1 className="text-3xl font-bold mb-4">Email Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The email address could not be found in the URL. Please check the link and try again.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white dark:bg-[#181a1b] min-h-screen text-gray-900 dark:text-white">
      <ToastContainer />

      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="max-w-md w-full text-center">
          {/* Icon */}
          <Mail className="w-16 h-16 text-blue-500 mx-auto mb-6" />

          {/* Heading */}
          <h1 className="text-3xl font-bold mb-4">
            Verify Your Email Address
          </h1>

          {/* Message */}
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We've sent a verification link to{" "}
            <span className="font-semibold">{email}</span>. Please check your
            inbox and click the link to verify your email.
          </p>

          {/* Buttons */}
          <div className="flex flex-col space-y-4">
            <a
              href={`mailto:${email}`} 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center space-x-2"
            >
              <Mail className="w-5 h-5" />
              <span>Open Email</span>
            </a>

            <button
              onClick={handleSubmit}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition duration-300 flex items-center justify-center space-x-2"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Resend Verification Email</span>
            </button>
          </div>

          {/* Support Link */}
          <p className="mt-6 text-gray-500 dark:text-gray-400">
            Didn't receive the email?{" "}
            <a
              href="/support"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}