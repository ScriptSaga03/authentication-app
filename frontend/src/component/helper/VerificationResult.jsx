import React from "react";
import {  useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";


export default function VerificationResult() {
  const [searchParams] = useSearchParams();

  const isVerified = searchParams.get("verified") === "true";

  const navigate = useNavigate

  return (
    <section className="min-h-screen flex items-center justify-center p-6 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
      <div className="w-full max-w-lg p-6 shadow-2xl border border-gray-300 bg-white text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:text-white rounded-xl text-center">
        {isVerified ? (
          <>
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">✅ Email Verified Successfully!</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your email has been successfully verified. You can now log in.
            </p>
            <a
              href="/signin"
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-400 transition duration-300 flex items-center justify-center space-x-2"
            >
              <span>Go to Login</span>
            </a>
          </>
        ) : (
          <>
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">❌ Email Verification Failed</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The verification link is invalid or has expired. Please try again.
            </p>
            <br />
            <button
              onClick={()=>navigate("/verify-email")}
              className="mt-4 w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-400 transition duration-300 flex items-center justify-center space-x-2"
            >
              <span>Go Back</span>
            </button>
          </>
        )}
      </div>
    </section>
  );
}
