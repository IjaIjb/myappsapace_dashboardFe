import React from 'react'

function AddressesDataSkeleton() {
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

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
                <div
                key={index}
                className="p-4 border rounded-lg shadow-sm bg-gray-100 animate-pulse"
                >
                <div className="w-16 h-4 bg-gray-300 rounded mb-2"></div>
                <div className="w-full h-3 bg-gray-300 rounded mb-2"></div>
                <div className="w-3/4 h-3 bg-gray-300 rounded mb-2"></div>
                <div className="w-1/2 h-3 bg-gray-300 rounded"></div>
                <div className="flex justify-between items-center mt-4">
                    <div className="w-10 h-3 bg-gray-300 rounded"></div>
                    <div className="flex space-x-2">
                    <div className="w-6 h-6 bg-gray-300 rounded"></div>
                    <div className="w-6 h-6 bg-gray-300 rounded"></div>
                    </div>
                </div>
                </div>
            ))}
            </div>

        </div>

    </div>
  )
}

export default AddressesDataSkeleton