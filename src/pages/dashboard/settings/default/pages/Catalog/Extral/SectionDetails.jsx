
import React from "react";

function SectionDetails({ details }) {
  if (!details) return null;

  return (
    <div className="w-full relative bg-gray-100 rounded-lg overflow-hidden shadow-md mb-6">
      {/* Banner Image */}
      <div className="relative w-full h-64 lg:h-80">
        <img
          src={details.image || "https://placehold.co/1200x400"}
          alt={details.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-white text-3xl sm:text-4xl font-bold">
            {details.name}
          </h1>
          <p className="text-gray-200 text-sm sm:text-lg mt-2 max-w-2xl">
            {details.description || "Find the best deals on top products."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SectionDetails;
