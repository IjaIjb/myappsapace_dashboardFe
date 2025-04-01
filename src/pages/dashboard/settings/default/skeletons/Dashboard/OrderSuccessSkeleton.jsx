import React from 'react'

function OrderSuccessSkeleton() {
  return (
    <div className="py-10 bg-white px-4 text-gray-800">
      <div className="max-w-3xl mx-auto w-full bg-gray-50 border border-gray-200 rounded-xl p-6">
        {/* Success Icon Placeholder */}
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 bg-gray-300 rounded-full animate-pulse mb-4"></div>
          <div className="w-48 h-6 bg-gray-300 rounded-md animate-pulse mb-2"></div>
          <div className="w-32 h-8 bg-gray-300 rounded-md animate-pulse"></div>
        </div>

        {/* Transaction Info */}
        <div className="mt-6 space-y-3 text-sm">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex justify-between">
              <span className="w-1/3 h-4 bg-gray-300 rounded-md animate-pulse"></span>
              <span className="w-1/3 h-4 bg-gray-300 rounded-md animate-pulse"></span>
            </div>
          ))}
        </div>

        <hr className="my-6 border-gray-300" />

        {/* Order Items */}
        <div className="text-sm space-y-3">
          <div className="w-32 h-5 bg-gray-300 rounded-md animate-pulse mb-2"></div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex justify-between">
              <span className="w-2/5 h-4 bg-gray-300 rounded-md animate-pulse"></span>
              <span className="w-1/4 h-4 bg-gray-300 rounded-md animate-pulse"></span>
            </div>
          ))}
        </div>

        <hr className="my-6 border-gray-300" />

        {/* Payment Breakdown */}
        <div className="text-sm space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex justify-between">
              <span className="w-1/3 h-4 bg-gray-300 rounded-md animate-pulse"></span>
              <span className="w-1/4 h-4 bg-gray-300 rounded-md animate-pulse"></span>
            </div>
          ))}
        </div>

        {/* View Order Button Placeholder */}
        <div className="mt-6 flex justify-center">
          <div className="w-40 h-10 bg-gray-300 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export default OrderSuccessSkeleton