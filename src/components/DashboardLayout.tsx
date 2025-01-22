import React, { ReactNode, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
// import BreadscrumbDisplay from "./shared/BreadscrumbDisplay";
import Sidebar from "./Sidebar";
import Header from "./shared/Header";
// import Sidebar from './Sidebar';
// import Header from './shared/Header';

interface DashboardLayoutProps {
  children: ReactNode;
}
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);

  // Toggle Side Drawer
  const toggleDrawer = () => {
    setOpenDrawer((prev) => !prev);
    setShowSideBar((prev) => !prev);
  };

  // open side Drawer
  const open = () => {
    setOpenDrawer(true);
    // setShowNotification(false);
  };
  return (
    <div className="h-full">
      <div className="flex w-full h-full bg-[#796BEB]">
        {/* Sidebar */}
        <div
          className={`${
            openDrawer ? "w-0 xl:w-[310px]" : " hidden lg:block"
          } relative left-0 h-screen top-0`}
        >
          <Sidebar toggle={toggleDrawer} DrawerOpen={openDrawer} open={open} />
        </div>

        {/* Background shadow for sidebar */}
        {(showSideBar || openDrawer) && (
          <div
            className={`w-full h-full block lg:hidden bg-[#747380D1] opacity-[82%] z-[90] fixed top-0 left-0`}
            onClick={() => {
              setOpenDrawer(false);
              setShowSideBar(false);
            }}
          ></div>
        )}

        <div className="w-[100%]  lg:px-0 px-3 ">
          <div className="   sticky top-0 w-full backdrop-filter backdrop-blur-md">
            <div className="flex lg:block gap-5 left-0 justify-between ">
              <button
                onClick={() => {
                  // setShowNotification(false);
                  setOpenDrawer(!openDrawer);
                  setShowSideBar(!showSideBar);
                }}
                className="flex lg:hidden mt-3  gap-3"
              >
                {openDrawer ? (
                  <AiOutlineClose className="w-4 h-4 md:w-6 md:h-6 font-bold text-white" />
                ) : (
                  <AiOutlineMenu className="w-4 h-4 md:w-6 md:h-6 font-bold text-white" />
                )}
              </button>
              {/* <div></div> */}
              {/* <div  className="lg:hidden w-full  lg:mx-[3%]  mx-[1%]">
            <Header />

            </div>
            <div  className="hidden lg:block  lg:mx-[3%]  mx-[1%]">
            <Header />

            </div> */}
              <div className="lg:px-[2%] w-full pt-[1%] bg-[#EFEFEF] rounded-[10px] overflow-y-scroll h-screen my-3 ">
                <Header />

                {/* Render children */}
                {children}
              </div>
            </div>
          </div>

          {/* <div className="lg:px-[3%] pt-[1%] bg-[#EFEFEF] rounded-[10px] overflow-y-scroll mx-[1%] h-[calc(100vh-75px)] ">
          <BreadscrumbDisplay />

     
          {children}
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
