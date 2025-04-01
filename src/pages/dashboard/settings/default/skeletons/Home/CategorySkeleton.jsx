import React from "react";

const CategorySkeleton = () => {
  return (
    <div className="w-full py-5">
      {/* Header Section Skeleton */}
      <div className="topCont pb-6 flex justify-between items-center">
        <div className="w-48 h-6 bg-gray-300 animate-pulse rounded-md"></div>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-300 animate-pulse rounded-full"></div>
          <div className="w-8 h-8 bg-gray-300 animate-pulse rounded-full"></div>
        </div>
      </div>

      {/* Scrollable Slider Skeleton */}
      <div className="flex items-center overflow-hidden space-x-4">
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="w-[150px] md:w-[160px] lg:w-[180px] flex-shrink-0 bg-gray-300 animate-pulse p-4 rounded-lg text-center"
          >
            <div className="w-full h-5 bg-gray-400 animate-pulse rounded-md"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySkeleton;
