import React from 'react'

function CartSkeleton() {
  return (
    <div className='w-full flex flex-col md:flex-row gap-6 p-4 animate-pulse'>
            {/* Cart Items Section */}
            <div className='w-full md:w-2/3 bg-white rounded-lg p-4'>
                <div className='h-6 bg-gray-200 rounded w-1/3 mb-4'></div>
                <div className='space-y-4'>
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className='flex items-center gap-4'>
                            <div className='w-12 h-12 bg-gray-300 rounded-md'></div>
                            <div className='flex flex-col w-full'>
                                <div className='h-4 bg-gray-200 rounded w-2/3'></div>
                                <div className='h-3 bg-gray-100 rounded w-1/4 mt-2'></div>
                            </div>
                            <div className='h-4 bg-gray-200 rounded w-12'></div>
                            <div className='h-4 bg-gray-200 rounded w-16'></div>
                            <div className='h-4 bg-gray-200 rounded w-6'></div>
                        </div>
                    ))}
                </div>
                <div className='mt-4 h-4 bg-gray-200 rounded w-20'></div>
            </div>

            {/* Cart Summary Section */}
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

export default CartSkeleton