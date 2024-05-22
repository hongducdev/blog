"use client"

import Link from "next/link";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-6xl font-extrabold text-red-600">Error</h1>
        <h2 className="mt-4 text-3xl md:text-4xl font-bold">
          Something went wrong
        </h2>
        <p className="mt-2 text-lg md:text-xl text-gray-600">
          Sorry, an error occurred while processing your request.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-block px-6 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            Go back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;