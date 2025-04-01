"use client";
import { useState } from "react";
import Link from "next/link";

export default function Hero() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Add your generation logic here
    setTimeout(() => setIsLoading(false), 2000); // Simulate loading
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-4xl mx-auto text-center px-4 py-16">
      {/* Hero Title */}
      <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
        Turn Your LinkedIn into a Stunning Portfolio!
      </h1>

      {/* Subtitle */}
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12">
        Transform your professional profile into an impressive showcase in
        seconds
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-xl">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="url"
            placeholder="Enter your LinkedIn URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[160px]"
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </div>
            ) : (
              "Generate Portfolio"
            )}
          </button>
        </div>
      </form>

      {/* Privacy Policy Link */}
      <p className="mt-6 text-gray-500 text-sm">
        By using this service, you agree to our{" "}
        <Link href="/privacy-policy">
          <span className="text-blue-600 hover:underline">Privacy Policy</span>
        </Link>
        .
      </p>
    </div>
  );
}
