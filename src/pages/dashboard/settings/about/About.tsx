import React from 'react'
import DashboardLayout from '../../../../components/DashboardLayout'
import WhatWeDo from './WhatWeDo'
import AboutHeroSettings from './AboutHeroSettings'
import AboutMission from './AboutMission'
import TeamSettings from './AboutTeamSettings'
import ServicesSettings from './Services'
import CoreValuesSettings from './CoreValuesSettings'
import TestimonialsSettings from './Testimonials'

const About = () => {
  return (
    <DashboardLayout>
    <div className="grid lg:grid-cols-12 gap-3 pb-6">
      <div className="col-span-6 flex flex-col gap-3">
  <AboutHeroSettings />
     <WhatWeDo />
     <ServicesSettings />
     <TestimonialsSettings />
     {/* <PolicySettings /> */}
      </div>
      <div className="col-span-6">
        {/* <CheckoutSettings /> */}
        <AboutMission />
        <CoreValuesSettings />
        <TeamSettings />
        {/* <FAQSettings /> */}
      </div>
    </div>
  </DashboardLayout>
  )
}

export default About