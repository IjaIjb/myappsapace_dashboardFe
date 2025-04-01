import React from 'react'
import DashboardLayout from '../../../../components/DashboardLayout'
import WhatWeDo from './WhatWeDo'

const About = () => {
  return (
    <DashboardLayout>
    <div className="grid lg:grid-cols-12 gap-3 pb-6">
      <div className="col-span-6 flex flex-col gap-3">
     <WhatWeDo />
      </div>
      <div className="col-span-6">
        {/* <CheckoutSettings /> */}
      </div>
    </div>
  </DashboardLayout>
  )
}

export default About