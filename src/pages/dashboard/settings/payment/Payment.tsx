import React from 'react'
import DashboardLayout from '../../../../components/DashboardLayout'
import DisplayInfoGen from '../../products/inner/DisplayInfoGen'
import CheckoutSettings from '../inner/CheckoutSettings'

const Payment = () => {
  return (
    <DashboardLayout>
    <div className="grid lg:grid-cols-12 gap-3 pb-6">
      <div className="col-span-6 flex flex-col gap-3">
   
        <DisplayInfoGen />
      </div>
      <div className="col-span-6">
        <CheckoutSettings />
      </div>
    </div>
  </DashboardLayout>
  )
}

export default Payment