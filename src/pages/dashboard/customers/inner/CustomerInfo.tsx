import React from 'react'

const CustomerInfo = () => {
  return (
    <div>
        <div className="bg-white rounded-[14px] pt-3 pb-4 pl-3 pr-5">
        <h2 className="text-[16px] font-[700] text-[#000000] mb-4">
        Customer Information
      </h2>
      <div className="grid grid-cols-5 gap-4 text-sm text-gray-600">
        {/* Email Address */}
        <div>
          <p className="font-[400] text-[#9D9D9D] text-[12px]">Email Address</p>
          <p className="font-[500] text-[#9D9D9D] underline">abstaash98@gmail.com</p>
        </div>

        {/* Shipping Address */}
        <div>
          <p className="text-[12px] font-[500] text-[#9D9D9D] ">Shipping Address</p>
          <p className='text-[12px] font-[500] text-[#9D9D9D]'>25b Lewisham Park</p>
          <p className='text-[12px] font-[500] text-[#9D9D9D]'>London</p>
          <p className='text-[12px] font-[500] text-[#9D9D9D]'>SE13 6QZ</p>
          <p className='text-[12px] font-[500] text-[#9D9D9D]'>United Kingdom</p>
        </div>

        {/* Billing Address */}
        <div>
          <p className="font-[400] text-[12px] text-[#9D9D9D]">Billing Address</p>
          <p className='text-[12px] font-[500] text-[#9D9D9D]'>25b Lewisham Park</p>
          <p className='text-[12px] font-[500] text-[#9D9D9D]'>London</p>
          <p className='text-[12px] font-[500] text-[#9D9D9D]'>SE13 6QZ</p>
          <p className='text-[12px] font-[500] text-[#9D9D9D]'>United Kingdom</p>
        </div>

        {/* Discount Codes Used */}
        <div>
          <p className="font-[400] text-[#9D9D9D]">Discount Codes Used</p>
          <p className='text-[12px] font-[500] text-[#9D9D9D]'>5</p>
        </div>
      </div>

        </div>
    </div>
  )
}

export default CustomerInfo