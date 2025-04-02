import React from 'react'
import DashboardLayout from '../../../../components/DashboardLayout'
import PolicySettings from './PolicySettings'

const Policy = () => {
  return (
    <DashboardLayout>
    <div className="grid lg:grid-cols-12 gap-3 pb-6">
      <div className="col-span-6 flex flex-col gap-3">
  <PolicySettings />
      </div>
      <div className="col-span-6">
        {/* <CheckoutSettings /> */}
      
      </div>
    </div>
  </DashboardLayout>
  )
}

export default Policy