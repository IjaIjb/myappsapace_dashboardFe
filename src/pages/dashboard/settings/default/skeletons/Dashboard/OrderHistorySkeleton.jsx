import React from 'react'

function OrderHistorySkeleton() {
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
                        {[...Array(15)].map((_, index) => (
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
        </div>

    </div>
  )
}

export default OrderHistorySkeleton