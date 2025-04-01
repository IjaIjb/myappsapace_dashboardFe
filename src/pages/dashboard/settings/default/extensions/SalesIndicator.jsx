import { useState } from "react";

const SalesIndicator = ({ progress = 50 }) => {
  return (
    <div className="w-full max-w-sm h-1 bg-gray-200 rounded-lg overflow-hidden flex">
      <div
        className="bg-black h-full transition-all duration-500"
        style={{ width: `${progress}%` }}
      ></div>
      <div
        className="bg-gray-100 h-full flex-grow transition-all duration-500"
      ></div>
    </div>
  );
};

export default SalesIndicator;
