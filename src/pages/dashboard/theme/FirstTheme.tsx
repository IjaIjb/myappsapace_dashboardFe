import React from "react";

const FirstTheme = () => {
  return (
    <div>
      <div className="bg-white rounded-[14px] pt-3 pb-[30px] pl-3 pr-5">
        <div className="flex justify-center mt-7">
          <div className="max-w-[800px] relative text-center">
            <div className="flex justify-center gap-3">
              <div>
                <img
                  aria-hidden
                  src="/images/theme/image 13.svg"
                  alt="Window icon"
                  //   className='w-[120px] h-[120px] '
                  // width={140}
                  // height={140}
                />
              </div>
              <div>
                <img
                  aria-hidden
                  src="/images/theme/image 14.svg"
                  alt="Window icon"
                  //   className='w-[120px] h-[120px] '
                  // width={140}
                  // height={140}
                />
              </div>
            </div>
            <div className="-mt-[80px] absolute w-full z-20">
              <div className="bg-white py-3 z-20">
                <div className="flex items-center bg-[#796BEB1A]/[10%] px-3 w-fit py-1  rounded-[5px] gap-2">
                  <h5 className="text-[10px] font-[400]">Current theme</h5>
                </div>
                <div>
                  {/* <h4 className="text-[#000000] text-[13px] font-[500] ">Name of Theme</h4> */}
                </div>
                <div className="flex justify-between ">
                  <div className="text-start flex flex-col gap-1 mt-2">
                    <h4 className="text-[#000000] text-[13px] font-[500] ">
                      Name of Theme
                    </h4>

                    <h4 className="text-[#000000] text-[13px] font-[300]">
                      Last saved: 2 Dec at 1:59 pm
                    </h4>
                  </div>
                  <div
                    className="rounded-full h-fit flex items-center gap-3 px-4 py-2"
                    style={{
                      background:
                        "linear-gradient(to bottom, #382B67, #7056CD)",
                    }}
                  >
                    <h5 className="text-[#FFFFFF] text-[16px] font-[400] whitespace-nowrap">
                      Change Theme
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstTheme;
