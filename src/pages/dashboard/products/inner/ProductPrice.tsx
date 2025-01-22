import React from "react";

const ProductPrice = () => {
  return (
    <div>
      <div className="bg-white rounded-[14px] pt-3 pb-4 pl-3 pr-5">
        <h4 className="text-[#000000] text-[14px] font-[600] pb-2">
          Product Price
        </h4>

        <div className="grid md:grid-cols-2 gap-3">
          <div className="">
            <h4 className="text-[12px] font-[400]">Selling Price</h4>
            <input
              type="number"
              placeholder="Title"
              className="w-full p-2 mt-2 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="">
            <h4 className="text-[12px] font-[400]">Cost Price</h4>
            <input
              type="number"
              placeholder="Title"
              className="w-full p-2 mt-2 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPrice;
