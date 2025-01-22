import React from 'react'
import { FaPen } from 'react-icons/fa'

const CustomerHistory = () => {
  return (
    <div>
         <div className="bg-white rounded-[14px] pt-3 pb-4 pl-3 pr-5">
                <div className="flex justify-between">
                  <h4 className="text-[#000000] text-[14px] font-[600] pb-2">
                    Customer History
                  </h4>
                  <FaPen className="text-[#9D9D9D]" />
                </div>
        
                <div className="pt-3">
                  <h5 className="text-[10px] font-[400] text-[#000000]">Order History</h5>
                  <h5 className="text-[12px] font-[500] text-[#382B67]">
                    54 Items
                  </h5>
                </div>
        
                <div className="pt-3">
                  <h5 className="text-[10px] font-[400] text-[#000000]">Conversion Score</h5>
                  <h5 className="text-[12px] font-[500] text-[#382B67]">
                   23%
                  </h5>
                </div>

                <div className="pt-3">
                  <h5 className="text-[10px] font-[400] text-[#000000]">Conversion Summary</h5>
                  <h5 className="text-[12px] font-[500] text-[#382B67]">
                  8 Sessions over 9 days
                  </h5>
                </div>
             
        
              </div>
    </div>
  )
}

export default CustomerHistory