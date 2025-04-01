import React from "react";

function NoProductsFound({ onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-700">
      {/* Icon */}
      <div className="bg-white p-6 rounded-full shadow-md">
        <svg
          className="w-20 h-20 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h18M9 3v18m6-18v18M3 9h18m-9 9h9"
          />
        </svg>
      </div>

      {/* Text */}
      <h2 className="text-2xl font-quicksand font-bold mt-6">No Products Found</h2>
      <p className="text-gray-500 mt-2 text-center font-lato max-w-md">
        We couldn’t find any products matching your search. Try searching again
        or explore our categories.
      </p>

      {/* Actions */}
      <div className="mt-6 space-x-4">
        <button
          onClick={onRetry}
          className="px-6 py-2 font-lato bg-blue-600 text-white rounded-md text-sm font-medium shadow-md hover:bg-blue-700 transition"
        >
          Retry Search
        </button>
        <a
          href="/"
          className="px-6 py-2 font-lato text-sm bg-gray-200 text-gray-700 rounded-md font-medium shadow-md hover:bg-gray-300 transition"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}

export default NoProductsFound;
