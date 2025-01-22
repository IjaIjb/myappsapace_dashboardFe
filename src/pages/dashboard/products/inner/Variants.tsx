import React from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import VariantTable from "./VariantTable";

const Variants = () => {
  return (
    <div>
      <div className="bg-white rounded-[14px] pt-3 pb-4 pl-3 pr-5">
        <h4 className="text-[#000000] text-[14px] font-[600] pb-2">Variants</h4>

        <h5 className="text-[12px] font-[400] pt-5">Colour</h5>
        <div className="flex gap-2 border-b pb-4">
          <div className="flex items-center bg-[#796BEB1A]/[10%] px-2 w-fit py-1 mt-2 rounded-[5px] gap-2">
            <div className="w-4 h-4 bg-[#3491DE] rounded-[2px]"></div>
            <h5 className="text-[10px] font-[400]">Blue</h5>
          </div>
          <div className="flex items-center bg-[#796BEB1A]/[10%] px-2 w-fit py-1 mt-2 rounded-[5px] gap-2">
            <div className="w-4 h-4 bg-purple-500 rounded-[2px]"></div>
            <h5 className="text-[10px] font-[400]">Purple</h5>
          </div>

          <div className="flex items-center bg-[#796BEB1A]/[10%] px-3 w-fit py-1 mt-2 rounded-[5px] gap-2">
            <IoAddCircleOutline className="" />

            <h5 className="text-[10px] font-[400]">Add Color</h5>
          </div>
        </div>
        <div className="flex items-center bg-[#796BEB1A]/[10%] px-3 w-fit py-1 mt-4 rounded-[5px] gap-2">
          <IoAddCircleOutline className="" />

          <h5 className="text-[10px] font-[400]">Add Another Option</h5>
        </div>

        <VariantTable />
      </div>
    </div>
  );
};

export default Variants;
