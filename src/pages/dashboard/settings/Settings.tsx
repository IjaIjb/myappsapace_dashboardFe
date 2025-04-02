import React from "react";
import DashboardLayout from "../../../components/DashboardLayout";
// import { IoAddCircleOutline } from "react-icons/io5";
// import { FaChevronRight } from "react-icons/fa";
import { MdChevronRight } from "react-icons/md";
import { Link } from "react-router-dom";

const Settings = () => {
  return (
    <DashboardLayout>
      <div>
        <div className="grid lg:grid-cols-12 gap-3">
          <div className="col-span-8 flex flex-col gap-3">
            <div className="bg-white rounded-[14px] pt-3 pb-4 pl-3 pr-5">
             <div className="flex flex-col gap-3">
             <div>
              <h4 className="text-[#000000] text-[14px] font-[600] ">
                Site Settings
              </h4>

              <div className="flex flex-col gap-3 mt-3">
                <Link to="/dashboard/settings/general-information" className="border-[0.5px] rounded-[5px] bg-[#FBFBFF] pl-4 pr-10 py-3 border-[#D8D8E2]">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                      <h5 className="text-[#000000] text-[12px] font-[500]">
                        General Information
                      </h5>
                      <h6 className="text-[#000000] text-[12px] font-[300]">
                        Type of Notification Appears description appears here{" "}
                      </h6>
                    </div>

                    <MdChevronRight />
                  </div>
                </Link>

                {/* <Link to="/dashboard/settings/staff-and-permission" className="border-[0.5px] rounded-[5px] bg-[#FBFBFF] pl-4 pr-10 py-3 border-[#D8D8E2]">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                      <h5 className="text-[#000000] text-[12px] font-[500]">
                      Staff and Permissions
                      </h5>
                      <h6 className="text-[#000000] text-[12px] font-[300]">
                        Type of Notification Appears description appears here{" "}
                      </h6>
                    </div>

                    <MdChevronRight />
                  </div>
                </Link>

                <div className="border-[0.5px] rounded-[5px] bg-[#FBFBFF] pl-4 pr-10 py-3 border-[#D8D8E2]">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                      <h5 className="text-[#000000] text-[12px] font-[500]">
                       Domain
                      </h5>
                      <h6 className="text-[#000000] text-[12px] font-[300]">
                        Type of Notification Appears description appears here{" "}
                      </h6>
                    </div>

                    <MdChevronRight />
                  </div>
                </div>

                <div className="border-[0.5px] rounded-[5px] bg-[#FBFBFF] pl-4 pr-10 py-3 border-[#D8D8E2]">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                      <h5 className="text-[#000000] text-[12px] font-[500]">
                       Policies
                      </h5>
                      <h6 className="text-[#000000] text-[12px] font-[300]">
                        Type of Notification Appears description appears here{" "}
                      </h6>
                    </div>

                    <MdChevronRight />
                  </div>
                </div>

                <div className="border-[0.5px] rounded-[5px] bg-[#FBFBFF] pl-4 pr-10 py-3 border-[#D8D8E2]">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                      <h5 className="text-[#000000] text-[12px] font-[500]">
                       Failed
                      </h5>
                      <h6 className="text-[#000000] text-[12px] font-[300]">
                        Type of Notification Appears description appears here{" "}
                      </h6>
                    </div>

                    <MdChevronRight />
                  </div>
                </div> */}

              </div>
              </div>

              {/* <div>
              <h4 className="text-[#000000] text-[14px] font-[600] ">
                Security Settings
              </h4>
              <div className="flex flex-col gap-3 mt-3">
                <div className="border-[0.5px] rounded-[5px] bg-[#FBFBFF] pl-4 pr-10 py-3 border-[#D8D8E2]">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                      <h5 className="text-[#000000] text-[12px] font-[500]">
                       Choose 3rd Party Courier
                      </h5>
                      <h6 className="text-[#000000] text-[12px] font-[300]">
                        Type of Notification Appears description appears here{" "}
                      </h6>
                    </div>

                    <MdChevronRight />
                  </div>
                </div>

                <div className="border-[0.5px] rounded-[5px] bg-[#FBFBFF] pl-4 pr-10 py-3 border-[#D8D8E2]">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                      <h5 className="text-[#000000] text-[12px] font-[500]">
                  Choose 3rd Party 
                      </h5>
                      <h6 className="text-[#000000] text-[12px] font-[300]">
                        Type of Notification Appears description appears here{" "}
                      </h6>
                    </div>

                    <MdChevronRight />
                  </div>
                </div>
              </div>
              </div> */}

              {/* <div>
              <h4 className="text-[#000000] text-[14px] font-[600] ">
                Security Settings
              </h4>
              <div className="flex flex-col gap-3 mt-3">
                <div className="border-[0.5px] rounded-[5px] bg-[#FBFBFF] pl-4 pr-10 py-3 border-[#D8D8E2]">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                      <h5 className="text-[#000000] text-[12px] font-[500]">
                       Choose 3rd Party Courier
                      </h5>
                      <h6 className="text-[#000000] text-[12px] font-[300]">
                        Type of Notification Appears description appears here{" "}
                      </h6>
                    </div>

                    <MdChevronRight />
                  </div>
                </div>

                <div className="border-[0.5px] rounded-[5px] bg-[#FBFBFF] pl-4 pr-10 py-3 border-[#D8D8E2]">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                      <h5 className="text-[#000000] text-[12px] font-[500]">
                 Type of Notification
                      </h5>
                      <h6 className="text-[#000000] text-[12px] font-[300]">
                        Type of Notification Appears description appears here{" "}
                      </h6>
                    </div>

                    <MdChevronRight />
                  </div>
                </div>

                <div className="border-[0.5px] rounded-[5px] bg-[#FBFBFF] pl-4 pr-10 py-3 border-[#D8D8E2]">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                      <h5 className="text-[#000000] text-[12px] font-[500]">
                 Type of Notification
                      </h5>
                      <h6 className="text-[#000000] text-[12px] font-[300]">
                        Type of Notification Appears description appears here{" "}
                      </h6>
                    </div>

                    <MdChevronRight />
                  </div>
                </div>
              </div>
              </div> */}

              <div>
              <h4 className="text-[#000000] text-[14px] font-[600] ">
              Payment Preferences
              </h4>
              <div className="flex flex-col gap-3 mt-3">
              <Link to="/dashboard/settings/payment-preference" className="border-[0.5px] rounded-[5px] bg-[#FBFBFF] pl-4 pr-10 py-3 border-[#D8D8E2]">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                      <h5 className="text-[#000000] text-[12px] font-[500]">
                       Choose 3rd Party Courier
                      </h5>
                      <h6 className="text-[#000000] text-[12px] font-[300]">
                        Type of Notification Appears description appears here{" "}
                      </h6>
                    </div>

                    <MdChevronRight />
                  </div>
                </Link>

                {/* <div className="border-[0.5px] rounded-[5px] bg-[#FBFBFF] pl-4 pr-10 py-3 border-[#D8D8E2]">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                      <h5 className="text-[#000000] text-[12px] font-[500]">
                  Choose 3rd Party 
                      </h5>
                      <h6 className="text-[#000000] text-[12px] font-[300]">
                        Type of Notification Appears description appears here{" "}
                      </h6>
                    </div>

                    <MdChevronRight />
                  </div>
                </div> */}
              </div>
              </div>

              <div>
              <h4 className="text-[#000000] text-[14px] font-[600] ">
            About Settings
              </h4>
              <div className="flex flex-col gap-3 mt-3">
              <Link to="/dashboard/settings/about-preference" className="border-[0.5px] rounded-[5px] bg-[#FBFBFF] pl-4 pr-10 py-3 border-[#D8D8E2]">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                      <h5 className="text-[#000000] text-[12px] font-[500]">
                       Choose 3rd Party Courier
                      </h5>
                      <h6 className="text-[#000000] text-[12px] font-[300]">
                        Type of Notification Appears description appears here{" "}
                      </h6>
                    </div>

                    <MdChevronRight />
                  </div>
                </Link>
              </div>
              </div>

              <div>
              <h4 className="text-[#000000] text-[14px] font-[600] ">
            Faq Settings
              </h4>
              <div className="flex flex-col gap-3 mt-3">
              <Link to="/dashboard/settings/faq-preference" className="border-[0.5px] rounded-[5px] bg-[#FBFBFF] pl-4 pr-10 py-3 border-[#D8D8E2]">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                      <h5 className="text-[#000000] text-[12px] font-[500]">
                       Choose 3rd Party Courier
                      </h5>
                      <h6 className="text-[#000000] text-[12px] font-[300]">
                        Type of Notification Appears description appears here{" "}
                      </h6>
                    </div>

                    <MdChevronRight />
                  </div>
                </Link>
              </div>
              </div>

              
              <div>
              <h4 className="text-[#000000] text-[14px] font-[600] ">
          Policy Settings
              </h4>
              <div className="flex flex-col gap-3 mt-3">
              <Link to="/dashboard/settings/policy-preference" className="border-[0.5px] rounded-[5px] bg-[#FBFBFF] pl-4 pr-10 py-3 border-[#D8D8E2]">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                      <h5 className="text-[#000000] text-[12px] font-[500]">
                       Choose 3rd Party Courier
                      </h5>
                      <h6 className="text-[#000000] text-[12px] font-[300]">
                        Type of Notification Appears description appears here{" "}
                      </h6>
                    </div>

                    <MdChevronRight />
                  </div>
                </Link>
              </div>
              </div>
              </div>
            </div>
          </div>
          <div className="col-span-4"></div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
