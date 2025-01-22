import React from "react";
import { IoAddCircleOutline } from "react-icons/io5";

const StaffInner = () => {
  return (
    <div>
      <div className="bg-white rounded-[14px] pt-3 pb-4 pl-3 pr-5">
        <div className="flex justify-end">
          <div className="flex items-center bg-[#796BEB1A]/[10%] px-3 w-fit py-1 mt-3 rounded-[5px] gap-2">
            <IoAddCircleOutline className="" />

            <h5 className="text-[10px] font-[400]">Add New Staff</h5>
          </div>
        </div>

        <h4 className="text-[#000000] text-[14px] font-[600] pb-2">
          Staff (3)
        </h4>

        <div className="">
          {/* <h4 className="text-[12px] font-[400]">Name</h4> */}
          <input
            type="text"
            placeholder="KoloMuani za goat"
            className="w-full p-2 mt-2 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <h5 className="text-[#686868] text-[10px] font-[400] ">
          Last seen on 23-12-2025 12:45pm GMT
        </h5>

        <div className="mt-3">
          {/* <h4 className="text-[12px] font-[400]">Name</h4> */}
          <input
            type="text"
            placeholder="Abidoshaker Gorimpa"
            className="w-full p-2 mt-2 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <h5 className="text-[#686868] text-[10px] font-[400] ">
          Last seen on 23-12-2025 12:45pm GMT
        </h5>

        <div className="mt-3">
          {/* <h4 className="text-[12px] font-[400]">Name</h4> */}
          <input
            type="text"
            placeholder="KoloMuani za goat"
            className="w-full p-2 mt-2 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <h5 className="text-[#686868] text-[10px] font-[400] ">
          Last seen on 23-12-2025 12:45pm GMT
        </h5>
      </div>
    </div>
  );
};

export default StaffInner;
