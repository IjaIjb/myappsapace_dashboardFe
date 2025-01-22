import React from 'react'
import DashboardLayout from '../../../components/DashboardLayout'
import FirstTheme from './FirstTheme'
import SecondTheme from './SecondTheme'

const Theme = () => {
  return (
    <DashboardLayout>
      <div className='flex flex-col gap-3'>
        <FirstTheme />
        <SecondTheme />
      </div>
    </DashboardLayout>
  )
}

export default Theme