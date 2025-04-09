import React from 'react'

const TopSelling = () => {
  return (
    <div>
        <div className='bg-white rounded-[14px] pt-3 pb-4 px-3'>
        <h4 className='text-[#382B67] text-[16px] font-[700] pb-4'>Top Selling</h4>
        
        <div className='grid md:grid-cols-2 justify-center w-full lg:grid-cols-3 gap-3'>
        <div>
        <img
                      aria-hidden
                      src="/images/home/product1.svg"
                      alt="Window icon"
                      className='rounded-[8px] '
                      // width={140}
                      // height={140}
                    />
                    <h5 className='text-[#000000] text-[12px] font-[500]'>Product Name</h5>
                    <h5 className='text-[#000000] text-[10px] font-[300]'>345 Units</h5>
        </div>
        
        <div>
        <img
                      aria-hidden
                      src="/images/home/product2.svg"
                      alt="Window icon"
                      className='rounded-[8px] '
                      // width={140}
                      // height={140}
                    />
                    <h5 className='text-[#000000] text-[12px] font-[500]'>Product Name</h5>
                    <h5 className='text-[#000000] text-[10px] font-[300]'>345 Units</h5>
        </div>
        
        <div>
        <img
                      aria-hidden
                      src="/images/home/product3.svg"
                      alt="Window icon"
                      className='rounded-[8px] '
                      // width={140}
                      // height={140}
                    />
                    <h5 className='text-[#000000] text-[12px] font-[500]'>Product Name</h5>
                    <h5 className='text-[#000000] text-[10px] font-[300]'>345 Units</h5>
        </div>
        </div>
        </div>
    </div>
  )
}

export default TopSelling