"use client";
import { useState } from "react";
import { scrapeLinkedInProfile } from "../services/linkedinScraper";
import LoadingSpinner from "./LoadingSpinner";
import Portfolio from "./Portfolio";
import { FaLinkedin } from "react-icons/fa";

export default function Hero() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [portfolioData, setPortfolioData] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!url.includes("linkedin.com/in/")) {
      setError("Please enter a valid LinkedIn profile URL");
      return;
    }

    setIsLoading(true);
    try {
      const data = await scrapeLinkedInProfile(url);
      setPortfolioData(data);
    } catch (error) {
      setError(error.message);
      console.error("Failed to generate portfolio:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (portfolioData) {
    return <Portfolio data={portfolioData} />;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-16 px-4">
        <div className="max-w-4xl w-full text-center space-y-8">
          <FaLinkedin className="w-20 h-20 text-primary-600 mx-auto" />

          <h1 className="text-4xl md:text-6xl font-bold">
            <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              Turn Your LinkedIn into a Stunning Portfolio!
            </span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300">
            Transform your professional profile into an impressive showcase in
            seconds
          </p>

          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="url"
                placeholder="Paste your LinkedIn profile URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 
                         focus:border-transparent outline-none dark:text-white"
                required
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg 
                         font-medium transition-colors duration-200 disabled:opacity-70 
                         disabled:cursor-not-allowed flex items-center justify-center 
                         min-w-[160px]"
              >
                {isLoading ? "Processing..." : "Generate Portfolio"}
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </form>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-2 dark:text-white">
                Professional Design
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Clean and modern portfolio layout that highlights your
                achievements
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-2 dark:text-white">
                Instant Generation
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get your portfolio website ready in seconds with just one click
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-2 dark:text-white">
                Mobile Responsive
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your portfolio looks great on all devices and screen sizes
              </p>
            </div>
          </div>
        </div>
      </div>
      {isLoading && <LoadingSpinner />}
    </>
  );
}
