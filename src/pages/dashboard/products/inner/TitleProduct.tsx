import React, { useState } from 'react'
import { IoAddCircleOutline } from "react-icons/io5";
import { MdInfo } from "react-icons/md";

interface MediaProps {
    id: number;
    file: File | null;
  }
  
const TitleProduct = () => {
    const [media, setMedia] = useState<MediaProps[]>(
        Array(8)
          .fill(null)
          .map((_, idx) => ({ id: idx, file: null }))
      );
    
      const handleFileChange = (file: File, id: number) => {
        setMedia((prev) =>
          prev.map((item) => (item.id === id ? { ...item, file } : item))
        );
      };

  return (
    <div>
                      <div className="bg-white rounded-[14px] pt-3 pb-4 pl-3 pr-5">
                {/* <h4 className="text-[#000000] text-[14px] font-[600] pb-2">
                  Select Customer
                </h4> */}

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
                  <h4 className="text-[12px] font-[400]">Title</h4>
                  <input
                    type="text"
                    placeholder="Title"
                    className="w-full p-2 mt-2 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="mt-3">
                  <h4 className="text-[12px] font-[400]">Short Description (Optional)</h4>
                  <input
                    type="text"
                    placeholder="Title"
                    className="w-full p-2 mt-2 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="mt-3">
                  <h4 className="text-[12px] font-[400]">
                    Description (Optional)
                  </h4>
                  <textarea
                    placeholder="Add Note"
                    rows={5}
                    className="w-full p-2 mt-2 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="mt-3">
                    <h3 className="text-[12px] font-[400] pb-1">Media</h3>
      <div className="mb-2 flex gap-1 items-center ">
      <MdInfo className="text-[#6B65E9]"/>
        <h4 className="text-[10px] font-[400] text-[#9D9D9D]"> Recommended dimension: 930px x 1163px, Max file size: 5mb</h4>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {media.map(({ id, file }) => (
          <div
            key={id}
            className="relative flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-blue-400"
          >
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileChange(e.target.files[0], id);
                }
              }}
            />
            {file ? (
              <img
                src={URL.createObjectURL(file)}
                alt="Uploaded"
                className="object-cover w-full h-full rounded-md"
              />
            ) : (
              <div className="flex flex-col items-center text-gray-400">
                 <img
                  aria-hidden
                  src="/images/products/imageProduct.svg"
                  alt="Window icon"
                  //   className='w-[120px] h-[120px] '
                  // width={140}
                  // height={140}
                />
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 16.5V19a2 2 0 002 2h14a2 2 0 002-2v-2.5m-5-4.5l-3 3m0 0l-3-3m3 3V5"
                  />
                </svg>
                <p className="text-xs mt-1">Upload</p> */}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>

    <div className="mt-3">
                <h4 className="text-[12px] font-[400]">
                 Category
                </h4>
                <select
                  //   placeholder="CHRISTMAS BABY"
                  className="w-full p-2 mt-2 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="" disabled>
                    Paid
                  </option>
                  <option value="">Paid</option>
                  <option value="">Fulfilled</option>
                  <option value="">Unfulfilled</option>
                </select>
              </div>
                            <div className="flex items-center bg-[#796BEB1A]/[10%] px-3 w-fit py-1 mt-2 rounded-[5px] gap-2">
                              <IoAddCircleOutline className="" />
              
                              <h5 className="text-[10px] font-[400]">New Product</h5>
                            </div>

                            <div className="mt-3">
                  <h4 className="text-[12px] font-[400]">Size Chart (Optional)</h4>
                  <input
                    type="text"
                    placeholder="Chart"
                    className="w-full p-2 mt-2 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
    </div>
  )
}

export default TitleProduct