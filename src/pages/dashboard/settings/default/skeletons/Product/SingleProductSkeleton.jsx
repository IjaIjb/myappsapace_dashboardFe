import React from 'react'

function SingleProductSkeleton() {
  return (
    <div className="max-w-screen-xl mx-auto px-4">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-10">
        
        {/* Left Section - Image & Other Details */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex flex-col">
          
          {/* Image Section */}
          <div id="image-section" className="flex w-full gap-2 lg:flex-row flex-col-reverse py-5">
            
            {/* Thumbnails Skeleton Loader */}
            <div className="flex lg:flex-col gap-2 mr-4">
              {Array(5).fill(0).map((_, i) => (
                <div key={i} className="w-24 h-20 rounded-lg bg-gray-200 animate-pulse"></div>
              ))}
            </div>
            
            {/* Main Image with Navigation */}
            <div className="relative w-full animate-pulse bg-gray-300 rounded-lg">
              <div className="w-full rounded-lg border"></div>
            </div>

          </div>

          {/* Other Details */}
          <div id="other-details" className="order-2">

            {/* Skeleton Loader - At a Glance */}
            <div className="py-5 order-2">
              <div className="bg-gray-100 p-5 rounded-lg shadow-sm w-full">
                <div className="flex justify-between grid-cols-2 gap-5 items-center w-full">
                  
                  {/* Left Section Skeleton */}
                  <div className="flex gap-2 flex-col w-full">
                    {Array(3).fill(0).map((_, i) => (
                      <div key={i} className="flex justify-between">
                        <div className="w-24 h-4 bg-gray-300 animate-pulse rounded"></div>
                        <div className="w-16 h-4 bg-gray-300 animate-pulse rounded"></div>
                      </div>
                    ))}
                  </div>

                  {/* Vertical Divider */}
                  <div className="border-l w-2 border-gray-300 h-20"></div>

                  {/* Right Section Skeleton */}
                  <div className="flex gap-2 flex-col w-full">
                    {Array(3).fill(0).map((_, i) => (
                      <div key={i} className="flex justify-between">
                        <div className="w-24 h-4 bg-gray-300 animate-pulse rounded"></div>
                        <div className="w-16 h-4 bg-gray-300 animate-pulse rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="w-full mt-6">
              <div className="ReviewSection">
                {/* Title Skeleton */}
                <div className="w-60 h-6 bg-gray-300 animate-pulse rounded"></div>

                <div className="mainReview flex flex-col gap-5">

                  {/* Header Section */}
                  <div className="headerSection w-full flex flex-col sm:flex-row justify-between items-center gap-6">
                    
                    {/* Left Section Skeleton */}
                    <div className="leftHeaderSection w-full sm:w-1/3 py-4 text-center sm:text-left">
                      <div className="w-32 h-8 bg-gray-300 animate-pulse rounded mx-auto sm:mx-0"></div>

                      <div className="flex flex-col gap-4 mb-4">
                        <div className="w-20 h-4 bg-gray-300 animate-pulse rounded mx-auto sm:mx-0"></div>
                        <div className="w-32 h-8 bg-gray-300 animate-pulse rounded mx-auto sm:mx-0"></div>
                      </div>
                    </div>

                    {/* Right Section Skeleton */}
                    <div className="rightHeaderSection w-full sm:w-2/3 p-6 bg-white rounded-lg">
                      <div className="space-y-2">
                        {Array(5).fill(0).map((_, i) => (
                          <div key={i} className="flex items-center space-x-2 text-sm mb-2">
                            <div className="w-12 h-4 bg-gray-300 animate-pulse rounded"></div>
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div className="bg-gray-300 h-2 rounded-full animate-pulse"></div>
                            </div>
                            <div className="w-8 h-4 bg-gray-300 animate-pulse rounded"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Reviews Skeleton */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Array(2).fill(0).map((_, i) => (
                      <div key={i} className="border p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="w-20 h-4 bg-gray-300 animate-pulse rounded"></div>
                          <div className="w-16 h-4 bg-gray-300 animate-pulse rounded"></div>
                        </div>
                        <div className="w-40 h-6 bg-gray-300 animate-pulse rounded mt-2"></div>
                        <div className="w-full h-12 bg-gray-300 animate-pulse rounded mt-2"></div>

                        <div className="flex items-center gap-4 mt-3">
                          <div className="w-12 h-6 bg-gray-300 animate-pulse rounded"></div>
                          <div className="w-12 h-6 bg-gray-300 animate-pulse rounded"></div>
                        </div>

                        <div className="border-t mt-3 pt-2">
                          <div className="w-3/4 h-4 bg-gray-300 animate-pulse rounded"></div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </div>

          </div>    
        </div>

        {/* Right Section */}
        <div id="right-section" className="col-span-1 sm:col-span-2 lg:col-span-2 flex flex-col">
            
            {/* Title Section (Single Title, Dynamically Moved) */}
            <div id="title-section">
                
                {/* top right section */}
                <div className="topSection w-full border p-5 order-1 sm:order-first rounded-lg shadow-sm bg-white">
      
                  {/* Labels Skeleton */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-16 h-5 bg-gray-300 animate-pulse rounded"></div>
                    <div className="w-20 h-5 bg-gray-300 animate-pulse rounded"></div>
                  </div>

                  {/* Product Title Skeleton */}
                  <div className="w-3/4 h-6 bg-gray-300 animate-pulse rounded"></div>
                  <div className="w-1/2 h-4 bg-gray-300 animate-pulse rounded mt-2"></div>

                  {/* Ratings Skeleton */}
                  <div className="flex items-center gap-1 mt-2">
                    <div className="w-24 h-5 bg-gray-300 animate-pulse rounded"></div>
                    <div className="w-12 h-4 bg-gray-300 animate-pulse rounded"></div>
                  </div>

                  {/* Pricing Skeleton */}
                  <div className="w-24 h-8 bg-gray-300 animate-pulse rounded mt-3"></div>

                  {/* Variants - Size Skeleton */}
                  <div className="mt-5">
                    <div className="w-16 h-5 bg-gray-300 animate-pulse rounded mb-2"></div>
                    <div className="flex gap-3">
                      {Array(4).fill(0).map((_, i) => (
                        <div key={i} className="w-10 h-6 bg-gray-300 animate-pulse rounded"></div>
                      ))}
                    </div>
                  </div>

                  {/* Variants - Color Skeleton */}
                  <div className="mt-5">
                    <div className="w-16 h-5 bg-gray-300 animate-pulse rounded mb-2"></div>
                    <div className="flex gap-3">
                      {Array(5).fill(0).map((_, i) => (
                        <div key={i} className="w-7 h-7 bg-gray-300 animate-pulse rounded-full"></div>
                      ))}
                    </div>
                  </div>

                  {/* Add to Cart Skeleton */}
                  <div className="w-full h-12 bg-gray-300 animate-pulse rounded mt-4"></div>
                </div>

                {/* Protection & Services */}
                <div className="mt-5 border w-full rounded-lg shadow-sm p-4">
      
                  {/* Delivery Section Skeleton */}
                  <div className="mb-5">
                    <div className="w-32 h-6 bg-gray-300 animate-pulse rounded mb-2"></div>
                    <div className="w-3/4 h-4 bg-gray-300 animate-pulse rounded"></div>
                    <div className="w-1/2 h-5 bg-gray-300 animate-pulse rounded mt-2"></div>
                    <div className="w-full h-4 bg-gray-300 animate-pulse rounded mt-1"></div>
                    <div className="w-full h-4 bg-gray-300 animate-pulse rounded mt-1"></div>
                    <div className="w-3/4 h-4 bg-gray-300 animate-pulse rounded mt-1"></div>
                  </div>

                  {/* Return Policy Section Skeleton */}
                  <div className="mb-5">
                    <div className="w-32 h-6 bg-gray-300 animate-pulse rounded mb-2"></div>
                    <div className="w-2/3 h-5 bg-gray-300 animate-pulse rounded mt-2"></div>
                    <div className="w-5/6 h-4 bg-gray-300 animate-pulse rounded mt-1"></div>
                  </div>

                  {/* Warranty Section Skeleton */}
                  <div>
                    <div className="w-32 h-6 bg-gray-300 animate-pulse rounded mb-2"></div>
                    <div className="w-3/4 h-4 bg-gray-300 animate-pulse rounded"></div>
                  </div>
                </div>
                
            </div>
        </div>

      </div>
    </div>
  )
}

export default SingleProductSkeleton