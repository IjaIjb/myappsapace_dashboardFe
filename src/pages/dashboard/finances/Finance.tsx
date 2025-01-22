import React from 'react'
import DashboardLayout from '../../../components/DashboardLayout'
// import { IoAddCircleOutline } from 'react-icons/io5'
import { FiDownload } from 'react-icons/fi'
import FinanceTable from './FinanceTable'

const Finance = () => {
  return (
    <DashboardLayout>
      <div className='flex flex-col gap-5'>
        <div className='flex gap-3 items-end'>
      <div className="grid lg:grid-cols-5 w-full items gap-2">
              <div className="bg-white rounded-[10px] pt-2 pb-1 px-3">
                <div className="flex flex-col gap-1">
                  <h5 className="text-[#9D9D9D] text-[12px] font-[600]">
                  Total Sales
                  </h5>
                  <div className="flex justify-between">
                    <h5 className="text-[#9D9D9D] text-[16px] font-[300]">$458.89</h5>
          <div className='w-7 h-7 bg-[#00AB441A]/[10%] rounded-[4px]'></div>


                  </div>
                </div>
              </div>
  
              <div className="bg-white rounded-[10px] pt-2 pb-1 px-3">
                <div className="flex flex-col gap-1">
                  <h5 className="text-[#9D9D9D] text-[12px] font-[600]">
                Payout
                  </h5>
                  <div className="flex justify-between">
                    <h5 className="text-[#9D9D9D] text-[16px] font-[300]">
                    $458.89
                    </h5>
                    <div className='w-7 h-7 bg-[#FF1B1B1A]/[10%] rounded-[4px]'></div>


                  </div>
                </div>
              </div>
  
              <div className="bg-white rounded-[10px] pt-2 pb-1 px-3">
                <div className="flex flex-col gap-1">
                  <h5 className="text-[#9D9D9D] text-[12px] font-[600]">
                 Wallet Balance
                  </h5>
                  <div className="flex justify-between">
                    <h5 className="text-[#9D9D9D] text-[16px] font-[300]">$458.89</h5>
                    <div className='w-7 h-7 bg-[#3491DE1A]/[10%] rounded-[4px]'></div>

                  </div>
                </div>
              </div>
  
              <div className="bg-white rounded-[10px] pt-2 pb-1 px-3">
                <div className="flex flex-col gap-1">
                  <h5 className="text-[#9D9D9D] text-[12px] font-[600]">
               Pending Payments
                  </h5>
                  <div className="flex justify-between">
                    <h5 className="text-[#9D9D9D] text-[16px] font-[300]">$458.89</h5>
                    <div className='w-7 h-7 bg-[#A01BFF1A]/[10%] rounded-[4px]'></div>

                  </div>
                </div>
              </div>
          
            </div>
            <div
                        className="rounded-full h-fit bg-[#8F75EF] flex items-center gap-3 px-5 py-3"
                        // style={{
                        //   background: "linear-gradient(to bottom, #382B67, #7056CD)",
                        // }}
                      >
                        <FiDownload className="text-white"/>
                        {/* <IoAddCircleOutline className="text-white" /> */}
                        <h5 className="text-[#FFFFFF] text-[16px] font-[400] whitespace-nowrap">
                          Withdraw
                        </h5>
                        {/* <LiaUploadSolid className="text-white" /> */}
                      </div>
            </div>
            <FinanceTable />
      </div>
    </DashboardLayout>
  )
}

export default Finance