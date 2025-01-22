import React from 'react'
import DashboardLayout from '../../../components/DashboardLayout'
import LatestOrder from './inner/LatestOrder'
import RecentOrders from '../orders/RecentOrders'
import CustomerInfo from './inner/CustomerInfo'

const CustomerDetails = () => {
  return (
    <div>
        <DashboardLayout>
            <div className='flex flex-col gap-3'>
        <div className="grid lg:grid-cols-5 w-full items gap-2">
              <div className="bg-white rounded-[10px] pt-2 pb-1 px-3">
                <div className="flex flex-col gap-1">
                  <h5 className="text-[#9D9D9D] text-[12px] font-[600]">
                  Total Amount  Ordered
                  </h5>
                  <div className="flex justify-between">
                    <h5 className="text-[#9D9D9D] text-[16px] font-[300]">$458.89</h5>
          <div className='w-7 h-7 bg-[#FF1B1B1A]/[10%] rounded-[4px]'></div>


                  </div>
                </div>
              </div>
  
              <div className="bg-white rounded-[10px] pt-2 pb-1 px-3">
                <div className="flex flex-col gap-1">
                  <h5 className="text-[#9D9D9D] text-[12px] font-[600]">
                Total Orders
                  </h5>
                  <div className="flex justify-between">
                    <h5 className="text-[#9D9D9D] text-[16px] font-[300]">
                    54
                    </h5>
                    <div className='w-7 h-7 bg-[#00AB441A]/[10%] rounded-[4px]'></div>


                  </div>
                </div>
              </div>
  
              <div className="bg-white rounded-[10px] pt-2 pb-1 px-3">
                <div className="flex flex-col gap-1">
                  <h5 className="text-[#9D9D9D] text-[12px] font-[600]">
                  Abandoned Checkouts
                  </h5>
                  <div className="flex justify-between">
                    <h5 className="text-[#9D9D9D] text-[16px] font-[300]">34</h5>
                    <div className='w-7 h-7 bg-[#3491DE1A]/[10%] rounded-[4px]'></div>

                  </div>
                </div>
              </div>
  
         
          
            </div>
<CustomerInfo />
<LatestOrder />
<RecentOrders />
            </div>
        </DashboardLayout>
    </div>
  )
}

export default CustomerDetails