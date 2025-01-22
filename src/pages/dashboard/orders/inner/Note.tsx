import React from 'react'
import { FaPen } from 'react-icons/fa'

const Note = () => {
  return (
    <div>
               <div className='bg-white rounded-[14px] pt-3 pb-4 pl-3 pr-5'>
              <div className='flex justify-between'>
               <h4 className="text-[#000000] text-[14px] font-[600] pb-2">
              Note
            </h4>
            <FaPen className='text-[#9D9D9D]'/>
            </div>
            <h5 className='text-[#9D9D9D] text-[10px] font-[400] '>The customer has not provided any additional Information at this moment.</h5>


</div>
    </div>
  )
}

export default Note