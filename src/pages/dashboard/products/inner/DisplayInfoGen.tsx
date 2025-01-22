import React from 'react'

const DisplayInfoGen = () => {
  return (
    <div>
              <div className="bg-white rounded-[14px] pt-3 pb-4 pl-3 pr-5">
        <h4 className="text-[#000000] text-[14px] font-[600] pb-2">
          Display Informstion
        </h4>

        {/* <div className="flex flex-col gap-2">
                          <div className="bg-[#FBFBFF] py-3 px-2">
                            <h4 className="text-[12px] font-[400]">
                              Ezeh Rachael, John Mustapha, Chukwu Yemi
                            </h4>
                          </div>
                        </div> */}

        {/* <div className="flex items-center bg-[#796BEB1A]/[10%] px-3 w-fit py-1 mt-3 rounded-[5px] gap-2">
                          <IoAddCircleOutline className="" />
        
                          <h5 className="text-[10px] font-[400]">New Customer</h5>
                        </div> */}

        <div className="">
          <h4 className="text-[12px] font-[400]">Currency Display</h4>
          <input
            type="text"
            placeholder=""
            className="w-full p-2 mt-2 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
              <div className="flex items-center bg-[#796BEB1A]/[10%] px-3 w-fit py-1 mt-1 rounded-[5px] gap-2">
              <input
              type="checkbox"
              id="customCheckbox"
              name="customCheckbox"
              className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
                <h5 className="text-[10px] font-[400]">Allow Customers Choose Currency Display</h5>
              </div>

        <h4 className="text-[#000000] mt-4 text-[14px] font-[600] pb-2">
        Unit System
        </h4>
        <div className='grid md:grid-cols-2 gap-3'>
        <div className="mt-3">
          <h4 className="text-[12px] font-[400]">Unit System</h4>
          <input
            type="text"
            placeholder="Metric System"
            className="w-full p-2 mt-2 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="mt-3">
          <h4 className="text-[12px] font-[400]">Default Weight</h4>
          <input
            type="text"
            placeholder="Title"
            className="w-full p-2 mt-2 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        </div>

        <div className="mt-3">
          <h4 className="text-[12px] font-[400]">Time zone</h4>
          <input
            type="text"
            placeholder=""
            className="w-full p-2 mt-2 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex items-center bg-[#796BEB1A]/[10%] px-3 w-fit py-1 mt-3 rounded-[5px] gap-2">
          
                <h5 className="text-[10px] font-[400]">Sets time for recording of orders and analytics</h5>
              </div>

        <div className="mt-3">
          <h4 className="text-[12px] font-[400]">Language</h4>
          <input
            type="text"
            placeholder="English UK"
            className="w-full p-2 mt-2 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex items-center bg-[#796BEB1A]/[10%] px-3 w-fit py-1 mt-1 rounded-[5px] gap-2">
        <input
              type="checkbox"
              id="customCheckbox"
              name="customCheckbox"
              className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
                <h5 className="text-[10px] font-[400]">Allow Customers Choose Currency Display</h5>
              </div>

        <div className="mt-3">
                          <h4 className="text-[12px] font-[400]">
                            Add Notes (Optional)
                          </h4>
                          <textarea
                            placeholder="Add Note"
                            rows={5}
                            className="w-full p-2 mt-2 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>

      </div>
    </div>
  )
}

export default DisplayInfoGen