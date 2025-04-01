import React from "react";

const BannerSkeleton = () => {
  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
      <div className="max-w-screen-xl mx-auto relative h-full">
        {/* Background Skeleton */}
        <div className="absolute inset-0 w-full h-full bg-gray-300 animate-pulse rounded-lg"></div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>

        {/* Content Skeleton */}
        <div className="relative z-10 text-center text-white px-4 sm:px-8 md:px-12 flex flex-col items-center justify-center h-full">
          <div className="w-3/4 sm:w-1/2 h-6 sm:h-8 md:h-12 bg-gray-400 animate-pulse rounded-md"></div>
          <div className="mt-2 w-1/2 sm:w-1/3 h-4 sm:h-6 bg-gray-400 animate-pulse rounded-md"></div>
          <div className="mt-4 w-24 sm:w-32 h-8 bg-gray-400 animate-pulse rounded-md"></div>
        </div>

        {/* Previous Button Skeleton */}
        <div className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-gray-400 animate-pulse rounded-full"></div>

        {/* Next Button Skeleton */}
        <div className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-gray-400 animate-pulse rounded-full"></div>

        {/* Dots (Indicators) Skeleton */}
        <div className="absolute bottom-3 sm:bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-400 animate-pulse rounded-full"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerSkeleton;
