import React from "react";


const Holdon = () => {
  return (
    <div>
      <div className="my-10">
        <div className="flex justify-center">
          <img
            src="/images/logo2.svg"
            className="text-center"
            alt="myappspace Logo"
          />
        </div>
        <div className="mt-[60px]">
          <div className="flex justify-center">
            <h4 className="text-[20px] font-[600] text-center max-w-[300px]">
              Please hold on while we set up your Online store
            </h4>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <img
          aria-hidden
          src="/images/auth/holdon.svg"
          alt="Window icon"
          //   className='w-[120px] h-[120px] '
          // width={140}
          // height={140}
        />
      </div>
    </div>
  );
};

export default Holdon;
