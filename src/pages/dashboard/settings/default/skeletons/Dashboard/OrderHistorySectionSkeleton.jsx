import React from 'react'

function OrderHistorySectionSkeleton() {
  return (
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
  )
}

export default OrderHistorySectionSkeleton