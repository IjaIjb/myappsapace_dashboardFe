import React from 'react'

function DashboardSkeleton() {
  return (
    <div className="flex gap-x-10">

      <div className="w-[20%] self-start py-3 rounded-lg bg-white border shadow-md animate-pulse">
        <ul className="space-y-2">
          {Array.from({ length: 9 }).map((_, index) => (
            <li key={index} className="flex items-center gap-3 py-3 px-6">
              <div className="w-5 h-5 bg-gray-300 rounded"></div>
              <div className="flex-1 h-4 bg-gray-300 rounded"></div>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-[80%] p-2">

        {/* First section */}
        <div className="w-full grid grid-cols-3 my-5 gap-5">
            {/* Profile Skeleton */}
            <div className="flex flex-col border rounded-lg min-h-[290px] flex-1 animate-pulse bg-gray-200">
                <div className="h-10 w-full bg-gray-300 rounded-t-lg"></div>
                <div className="flex-1 flex flex-col p-4 gap-4">
                    <div className="w-14 h-14 bg-gray-300 rounded-full"></div>
                    <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
                    <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
                    <div className="mt-auto h-10 w-full bg-gray-300 rounded"></div>
                </div>
            </div>

            {/* Address Skeleton */}
            <div className="flex flex-col border rounded-lg min-h-[290px] flex-1 animate-pulse bg-gray-200">
                <div className="h-10 w-full bg-gray-300 rounded-t-lg"></div>
                <div className="flex-1 flex flex-col p-4 gap-4">
                    <div className="h-4 w-full bg-gray-300 rounded"></div>
                    <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
                    <div className="mt-auto h-10 w-full bg-gray-300 rounded"></div>
                </div>
            </div>

            {/* Order Skeleton */}
            <div className="flex flex-col border rounded-lg min-h-[290px] flex-1 animate-pulse bg-gray-200">
                <div className="h-10 w-full bg-gray-300 rounded-t-lg"></div>
                <div className="flex-1 flex flex-col p-4 gap-4">
                    <div className="h-16 w-full bg-gray-300 rounded"></div>
                    <div className="h-16 w-full bg-gray-300 rounded"></div>
                    <div className="h-16 w-full bg-gray-300 rounded"></div>
                </div>
            </div>
        </div>

        {/* Section Section */}
        <div className="border rounded-lg my-5 overflow-hidden animate-pulse">
          {/* Header Skeleton */}
          <div className="flex justify-between p-3 items-center bg-gray-100">
            <div className="h-4 w-32 bg-gray-300 rounded"></div>
            <div className="h-4 w-20 bg-gray-300 rounded"></div>
          </div>
          
          {/* Table Skeleton */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-100">
                  {[...Array(5)].map((_, i) => (
                    <th key={i} className="py-3 px-4">
                      <div className="h-3 w-16 bg-gray-300 rounded"></div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...Array(6)].map((_, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    {[...Array(5)].map((_, i) => (
                      <td key={i} className="py-3 px-4">
                        <div className="h-3 w-full bg-gray-300 rounded"></div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Third Section */}
        <div className="my-5 w-full border rounded-lg">
          {/* Header Skeleton */}
          <div className="flex justify-between items-center p-3 border-b">
            <div className="h-4 w-32 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-3 w-20 bg-gray-300 rounded animate-pulse"></div>
          </div>

          {/* Product List Skeleton */}
          <div className="relative p-4">
            <div className="overflow-x-auto flex gap-4 px-4 py-4 scrollbar-hide">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="min-w-[200px] md:min-w-[250px] lg:min-w-[300px] snap-center transition-transform transform scale-100"
                >
                  <div className="relative bg-white border rounded-lg p-3 shadow-sm">
                    {/* Image Skeleton */}
                    <div className="w-full h-40 bg-gray-300 rounded-md animate-pulse"></div>

                    <div className="mt-2 space-y-2">
                      {/* Rating Skeleton */}
                      <div className="h-3 w-20 bg-gray-300 rounded animate-pulse"></div>

                      {/* Title Skeleton */}
                      <div className="h-4 w-3/4 bg-gray-300 rounded animate-pulse"></div>

                      {/* Price Skeleton */}
                      <div className="h-4 w-1/4 bg-gray-300 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default DashboardSkeleton