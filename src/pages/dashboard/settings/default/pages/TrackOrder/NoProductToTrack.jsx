export default function NoProductToTrack() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
        <div className="max-w-md rounded-2xl overflow-hidden shadow-xl bg-white p-6 text-center transform transition-all duration-300 hover:scale-105">
          <div className="flex flex-col items-center">
            <svg
              className="w-20 h-20 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h18M3 9h18M3 15h18M3 21h18"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900">No Products to Track</h2>
            <p className="text-gray-600 text-sm mt-2 max-w-xs">
              It looks like there are no products available for tracking right now. Please check back later or refresh the page.
            </p>
            <button className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-xl shadow-md hover:bg-blue-700 transition-all">
              Refresh
            </button>
          </div>
        </div>
      </div>
    );
  }
  