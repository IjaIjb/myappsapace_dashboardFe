import React, { useState } from 'react'
import { IoAddCircleOutline } from 'react-icons/io5'

const DiscountTable = () => {
    const [isFocused, setIsFocused] = useState(false);
  return (
    <div>
        <div className='flex justify-between items-center mb-2'>
           <div className="flex gap-2 ">
        <div className="bg-primary rounded-full px-6 py-1">
          <h6 className="text-white text-[12px] font-[400]">All</h6>
        </div>

        <div className=" bg-white rounded-full px-3 py-1">
          <h6 className="text-[#9D9D9D] text-[12px] font-[400]">Archived</h6>
        </div>

        <div className=" bg-white rounded-full px-3 py-1">
          <h6 className="text-[#9D9D9D] text-[12px] font-[400]">Unfulfilled</h6>
        </div>

        <div className=" bg-white rounded-full px-3 py-1">
          <h6 className="text-[#9D9D9D] text-[12px] font-[400]">Unpaid</h6>
        </div>
      </div>
      <div
            className="rounded-full h-fit flex items-center gap-3 px-4 py-2"
            style={{
              background: "linear-gradient(to bottom, #382B67, #7056CD)",
            }}
          >
            <IoAddCircleOutline className="text-white" />
            <h5 className="text-[#FFFFFF] text-[16px] font-[400] whitespace-nowrap">
              Create Discount
            </h5>
            {/* <LiaUploadSolid className="text-white" /> */}
          </div>
      </div>
      <div className="bg-white rounded-[12px] pt-3 pb-4 pl-3 pr-5">
        {/* <h4 className="text-[#382B67] text-[16px] font-[700] pb-2">
          Recent Orders
        </h4> */}
        <div className='flex justify-end'>
        <div className="relative">
      {/* Input field */}
      <input
        type={isFocused ? "date" : "text"}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-fit p-1 border border-[#D9D9D9] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    {/* Icon */}
    {!isFocused && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
          📅
        </div>
      )}
      {/* Placeholder text */}
      {!isFocused && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
          Last 30 Days
        </div>
      )}

  
    </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className=" text-gray-700 rounded-[6px] px-3  ">
            <tr>
           
              <th scope="col" className="pl-3  text-[10px] font-[500] py-3">
               Title
              </th>
              <th scope="col" className="text-[10px] font-[500] py-3">
               Date Created
              </th>
              <th scope="col" className="text-[10px] font-[500] py-3">
               Method
              </th>
              <th scope="col" className="text-[10px] font-[500] py-3">
               Type
              </th>
              <th scope="col" className="text-[10px] font-[500] py-3">
               Usage
              </th>

              <th scope="col" className="text-[10px] font-[500] py-3">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="px-3">
            <tr className="  py-4 bg-[#FBFBFF] rounded-[7px] ">
             
              <td className="text-[12px] font-[300] pl-2 ">
                <h4 className='text-[#000000] pl-3 text-[12px] font-[600]'>Discount Name</h4>
                <h4 className='text-[#000000] text-[12px] font-[300]'>45% of all Products</h4>
              </td>
              <td className="text-[12px] font-[300] ">12-03-2025</td>
              <td className="text-[12px] font-[300] ">Code</td>
              <td className="text-[12px] font-[300] ">Percentage</td>
              <td className="text-[12px] font-[300] ">34</td>
              <td className=" py-4">
                <p>
                  <b
                    style={{
                      fontWeight: "500",
                      fontSize: "10px",
                      backgroundColor: "#C9F0D0",
                      color: "#51CF66",
                      borderRadius: "10px",
                      padding: "2px 10px",
                    }}
                  >
                    Active
                  </b>
                </p>
              </td>

              
            </tr>
            
            <tr className="  py-4 bg-[#FBFBFF] rounded-[7px] ">
             
             <td className="text-[12px] font-[300] pl-2 ">
               <h4 className='text-[#000000] text-[12px] font-[600]'>Discount Name</h4>
               <h4 className='text-[#000000] text-[12px] font-[300]'>45% of all Products</h4>
             </td>
             <td className="text-[12px] font-[300] ">12-03-2025</td>
             <td className="text-[12px] font-[300] ">Code</td>
             <td className="text-[12px] font-[300] ">Percentage</td>
             <td className="text-[12px] font-[300] ">34</td>
             <td className=" py-4">
               <p>
                 <b
                   style={{
                     fontWeight: "500",
                     fontSize: "10px",
                     backgroundColor: "#C9F0D0",
                     color: "#51CF66",
                     borderRadius: "10px",
                     padding: "2px 10px",
                   }}
                 >
                   Active
                 </b>
               </p>
             </td>

             
           </tr>

           <tr className="  py-4 bg-[#FBFBFF] rounded-[7px] ">
             
             <td className="text-[12px] font-[300] pl-2 ">
               <h4 className='text-[#000000] text-[12px] font-[600]'>Discount Name</h4>
               <h4 className='text-[#000000] text-[12px] font-[300]'>45% of all Products</h4>
             </td>
             <td className="text-[12px] font-[300] ">12-03-2025</td>
             <td className="text-[12px] font-[300] ">Code</td>
             <td className="text-[12px] font-[300] ">Percentage</td>
             <td className="text-[12px] font-[300] ">34</td>
             <td className=" py-4">
               <p>
                 <b
                   style={{
                     fontWeight: "500",
                     fontSize: "10px",
                     backgroundColor: "#C9F0D0",
                     color: "#51CF66",
                     borderRadius: "10px",
                     padding: "2px 10px",
                   }}
                 >
                   Active
                 </b>
               </p>
             </td>

             
           </tr>

           <tr className="  py-4 bg-[#FBFBFF] rounded-[7px] ">
             
             <td className="text-[12px] font-[300] pl-2 ">
               <h4 className='text-[#000000] text-[12px] font-[600]'>Discount Name</h4>
               <h4 className='text-[#000000] text-[12px] font-[300]'>45% of all Products</h4>
             </td>
             <td className="text-[12px] font-[300] ">12-03-2025</td>
             <td className="text-[12px] font-[300] ">Code</td>
             <td className="text-[12px] font-[300] ">Percentage</td>
             <td className="text-[12px] font-[300] ">34</td>
             <td className=" py-4">
               <p>
                 <b
                   style={{
                     fontWeight: "500",
                     fontSize: "10px",
                     backgroundColor: "#C9F0D0",
                     color: "#51CF66",
                     borderRadius: "10px",
                     padding: "2px 10px",
                   }}
                 >
                   Active
                 </b>
               </p>
             </td>

             
           </tr>
    
          </tbody>
        </table>
      </div>   
    </div>
  )
}

export default DiscountTable