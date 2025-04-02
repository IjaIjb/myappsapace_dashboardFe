import React from 'react'
import DashboardLayout from '../../../../components/DashboardLayout'
import WhatWeDo from './WhatWeDo'
import AboutHeroSettings from './AboutHeroSettings'
import AboutMission from './AboutMission'
import TeamSettings from './AboutTeamSettings'
import FAQSettings from '../faq/FaqSettings'
import PolicySettings from '../policy/PolicySettings'

const About = () => {
  return (
    <DashboardLayout>
    <div className="grid lg:grid-cols-12 gap-3 pb-6">
      <div className="col-span-6 flex flex-col gap-3">
  <AboutHeroSettings />
     <WhatWeDo />
     {/* <PolicySettings /> */}
      </div>
      <div className="col-span-6">
        {/* <CheckoutSettings /> */}
        <AboutMission />
        <TeamSettings />
        {/* <FAQSettings /> */}
      </div>
    </div>
  </DashboardLayout>
  )
}

export default About