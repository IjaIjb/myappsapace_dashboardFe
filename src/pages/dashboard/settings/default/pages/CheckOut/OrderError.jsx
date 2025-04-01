import React from "react";
import { NavLink } from "react-router-dom";

export default function OrderError() {
  return (
    <div className="py-10 bg-white px-4 text-gray-800">
      <div className="max-w-3xl mx-auto w-full">
        {/* Header */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 w-full">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-16 h-16 text-red-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path d="M12 9v4m0 4h.01m-6.938 2a9 9 0 1 1 13.856 0" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="text-xl font-medium mb-1 text-red-600">Payment Failed!</h2>
            <p className="text-gray-600 text-sm">
              There was an issue processing your payment. Please try again or contact support.
            </p>
          </div>

          <hr className="my-6 border-gray-300" />

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col items-center space-y-4">
            <NavLink
              to="/checkout"
              className="px-6 py-3 text-white bg-red-600 hover:bg-red-700 rounded-lg text-sm font-semibold"
            >
              Retry Payment
            </NavLink>
            <NavLink
              to="/"
              className="px-6 py-3 text-gray-700 border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-100"
            >
              Go to Homepage
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
