import React from 'react'
import DashboardLayout from '../../../../components/DashboardLayout'
import TermsConditionsSettings from './TermsAndConditionSettings'

const TermsAndCondition = () => {
  return (
    <DashboardLayout>
    <div className="grid lg:grid-cols-12 gap-3 pb-6">
      <div className="col-span-6 flex flex-col gap-3">
  {/* <PolicySettings /> */}
  <TermsConditionsSettings />
      </div>
      <div className="col-span-6">
     
      </div>
    </div>
  </DashboardLayout>
  )
}

export default TermsAndCondition