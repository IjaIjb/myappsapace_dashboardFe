import React from 'react'

function CheckOutSkeleton() {
  return (
    <div className='w-full flex flex-col md:flex-row gap-6 p-4 animate-pulse'>
            {/* Billing Details Section */}
            <div className='w-full md:w-2/3 bg-white rounded-lg p-6'>
                <div className='h-6 bg-gray-200 rounded w-1/3 mb-6'></div>
                
                {/* Address Section */}
                <div className='mb-6'>
                    <div className='h-5 bg-gray-200 rounded w-1/4 mb-4'></div>
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className='h-10 bg-gray-200 rounded w-full mb-2'></div>
                    ))}
                </div>

                {/* Payment Method Section */}
                <div className='mb-6'>
                    <div className='h-5 bg-gray-200 rounded w-1/4 mb-4'></div>
                    {Array.from({ length: 2 }).map((_, index) => (
                        <div key={index} className='h-10 bg-gray-200 rounded w-full mb-2'></div>
                    ))}
                </div>

                {/* Delivery Method Section */}
                <div>
                    <div className='h-5 bg-gray-200 rounded w-1/4 mb-4'></div>
                    {Array.from({ length: 2 }).map((_, index) => (
                        <div key={index} className='h-10 bg-gray-200 rounded w-full mb-2'></div>
                    ))}
                </div>
            </div>

            {/* Order Summary Section */}
            <div className='w-full md:w-1/3 bg-white p-6 rounded-lg'>
                <div className='h-6 bg-gray-200 rounded w-1/3 mb-4'></div>
                <div className='space-y-3'>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className='h-4 bg-gray-200 rounded w-full'></div>
                    ))}
                </div>
                <hr className='my-4'/>
                <div className='h-6 bg-gray-200 rounded w-1/3 mb-4'></div>
                <div className='w-full mt-4 h-10 bg-gray-300 rounded'></div>
            </div>
        </div>
  )
}

export default CheckOutSkeleton