import React from "react";
import { FaPen } from "react-icons/fa";

const CustomerInfo = () => {
  return (
    <div>
      <div className="bg-white rounded-[14px] pt-3 pb-4 pl-3 pr-5">
        <div className="flex justify-between">
          <h4 className="text-[#000000] text-[14px] font-[600] pb-2">
            Customer Information
          </h4>
          <FaPen className="text-[#9D9D9D]" />
        </div>

        <div className="pt-3">
          <h5 className="text-[10px] font-[400] text-[#000000]">Full Name</h5>
          <h5 className="text-[12px] font-[500] text-[#382B67]">
            Justin Jay Kanu
          </h5>
        </div>

        <div className="flex justify-between pt-3">
          <div className="">
            <h5 className="text-[10px] font-[400] text-[#000000]">
              Email Address
            </h5>
            <h5 className="text-[12px] font-[500] text-[#382B67]">
              Justin@gmail.com
            </h5>
          </div>
          <FaPen className="text-[#9D9D9D]" />
        </div>

        <div className="flex justify-between pt-3">
          <div className="">
            <h5 className="text-[10px] font-[400] text-[#000000]">
              Shipping Address
            </h5>
            <h5 className="text-[12px] font-[500] text-[#382B67] max-w-[100px]">
              No 15 Carly Street Gbadamosi LGA Lagos State Nigeria{" "}
            </h5>
          </div>
          <FaPen className="text-[#9D9D9D]" />
        </div>

        <div className="flex justify-between pt-3">
          <div className="">
            <h5 className="text-[10px] font-[400] text-[#000000]">
              Billing Address
            </h5>
            <h5 className="text-[12px] font-[500] text-[#382B67] max-w-[100px]">
              Same as Shipping
            </h5>
          </div>
          <FaPen className="text-[#9D9D9D]" />
        </div>

        <div className="flex justify-between pt-3">
          <div className="">
            <h5 className="text-[10px] font-[400] text-[#000000]">
              Total No of Items Ordered
            </h5>
            <h5 className="text-[12px] font-[500] text-[#000000] max-w-[100px]">
              4
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfo;
