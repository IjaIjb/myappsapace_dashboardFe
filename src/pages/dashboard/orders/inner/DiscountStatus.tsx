import React from "react";

const DiscountStatus = () => {
  return (
    <div>
      <div className="bg-white rounded-[14px] pt-3 pb-4 pl-3 pr-5">
        <div className="pb-2 border-b">
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
            Paid (2)
          </b>
        </div>

        <div className="flex flex-col gap-2 border-b py-2">
          {/* Discount Row */}
          <div className="grid grid-cols-3 items-center">
            <h5 className="text-[#9D9D9D] text-[12px] font-[500]">Discount</h5>
            <h5 className="text-[#9D9D9D] text-[12px] font-[500]">
              DISCOUNT CODE HERE
            </h5>
            <h5 className="text-[#000000] text-[12px] font-[500] text-right">
              -$23.00
            </h5>
          </div>

          {/* Shipping Row */}
          <div className="grid grid-cols-3 items-center">
            <h5 className="text-[#9D9D9D] text-[12px] font-[500]">Shipping</h5>
            <h5 className="text-[#9D9D9D] text-[12px] font-[500]">
              Standard Delivery
            </h5>
            <h5 className="text-[#000000] text-[12px] font-[500] text-right">
              $12.00
            </h5>
          </div>

          {/* Subtotal Row */}
          <div className="grid grid-cols-3 items-center">
            <h5 className="text-[#9D9D9D] text-[12px] font-[500]">Subtotal</h5>
            <h5 className="text-[#9D9D9D] text-[12px] font-[500]">3 Items</h5>
            <h5 className="text-[#000000] text-[12px] font-[500] text-right">
              $560.00
            </h5>
          </div>

          {/* Total Row */}
          <div className="grid grid-cols-3 items-center">
            <h5 className="text-[#9D9D9D] text-[12px] font-[700]">Total</h5>
            <div className="col-span-1"></div> {/* Empty space for alignment */}
            <h5 className="text-[#000000] text-[12px] font-[500] text-right">
              $580.00
            </h5>
          </div>
        </div>

        <div className="flex justify-between">
          <h5 className="text-[#9D9D9D] text-[12px] font-[700]">Paid</h5>
          <h5 className="text-[#000000] text-[12px] font-[500]">$580.00</h5>
        </div>
      </div>
    </div>
  );
};

export default DiscountStatus;
