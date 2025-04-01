import React from 'react'

function BrowsingHistorySkeleton() {
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
            <div className="w-full">
                {/* Header */}
                <div className="topHeader pb-3">
                    <div className="h-6 w-40 bg-gray-300 rounded animate-pulse"></div>
                </div>

                {/* Search & Date Picker */}
                <div className="flex items-center border mt-3 border-gray-300 rounded-md overflow-hidden w-full max-w-xl animate-pulse">
                    <div className="flex items-center px-3 bg-gray-300 w-10 h-10"></div>
                    <div className="flex-1 h-10 bg-gray-300"></div>
                    <div className="flex items-center px-3 bg-gray-300 w-10 h-10"></div>
                    <div className="h-10 w-32 bg-gray-300"></div>
                </div>

                {/* Product List */}
                <div className="border rounded-lg mt-5">
                    {/* Date Placeholder */}
                    <div className="topHeaderInner border-b py-3 px-3">
                    <div className="h-4 w-32 bg-gray-300 rounded animate-pulse"></div>
                    </div>

                    {/* Product Grid */}
                    <div className="grid p-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg border relative animate-pulse">
                        {/* Badge */}
                        <div className="absolute top-2 left-2 h-4 w-12 bg-gray-300 rounded"></div>

                        {/* Image Placeholder */}
                        <div className="w-full h-40 bg-gray-300 rounded-md"></div>

                        {/* Ratings */}
                        <div className="flex items-center mt-2 space-x-1">
                            {[...Array(4)].map((_, i) => (
                            <div key={i} className="w-4 h-4 bg-gray-300 rounded-full"></div>
                            ))}
                            <div className="h-3 w-8 bg-gray-300 rounded"></div>
                        </div>

                        {/* Title Placeholder */}
                        <div className="mt-2 h-4 bg-gray-300 rounded w-3/4"></div>
                        <div className="mt-1 h-4 bg-gray-300 rounded w-2/3"></div>

                        {/* Price Placeholder */}
                        <div className="mt-3 h-5 bg-gray-300 rounded w-1/4"></div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    </div>

  )
}

export default BrowsingHistorySkeleton