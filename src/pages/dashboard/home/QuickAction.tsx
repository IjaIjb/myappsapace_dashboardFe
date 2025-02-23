import React from "react";
import { Link } from "react-router-dom";

const QuickAction = () => {
  return (
    <div>
      <div className="bg-white rounded-[14px] pt-3 pb-4 pl-3 pr-5">
        <h4 className="text-[#382B67] text-[16px] font-[700] pb-2">
          Quick Action
        </h4>
        <h5 className="text-[#686868] text-[12px] font-[300] ">
          Hipster ipsum tattooed brunch I'm baby. Vinyl meditation adaptogen out
          tile park cronut 90's. Deep xoxo waistcoat actually shaman.
        </h5>

        <div className="flex justify-between pt-6">
          <Link
            to="/dashboard/create-product"
            className="flex gap-2 items-center"
          >
            <img
              aria-hidden
              src="/images/home/quickproduct.svg"
              alt="Window icon"
              // className='rounded-[8px] '
              // width={140}
              // height={140}
            />
            <h5 className="text-[#9D9D9D] text-[12px] font-[400]">
              Create a Product
            </h5>
          </Link>

          <Link
            to="/dashboard/create-customer"
            className="flex gap-2 items-center"
          >
            <img
              aria-hidden
              src="/images/home/quickcustomer.svg"
              alt="Window icon"
              // className='rounded-[8px] '
              // width={140}
              // height={140}
            />
            <h5 className="text-[#9D9D9D] text-[12px] font-[400]">
              Create Customer
            </h5>
          </Link>
        </div>

        <Link
          to="dashboard/create-an-order"
          className="flex gap-2 items-center pt-4"
        >
          <img
            aria-hidden
            src="/images/home/quickorder.svg"
            alt="Window icon"
            // className='rounded-[8px] '
            // width={140}
            // height={140}
          />
          <h5 className="text-[#9D9D9D] text-[12px] font-[400]">
            Create an Order
          </h5>
        </Link>
      </div>
    </div>
  );
};

export default QuickAction;
