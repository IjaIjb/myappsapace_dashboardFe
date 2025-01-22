import React from 'react'
import { useLocation } from 'react-router-dom'
import { capitalizeFirstLetter } from '../utils/stringHelpers';

const BreadscrumbDisplay = () => {
    const url = useLocation();
    const { pathname } = url;
    const pathnames = pathname.split("/").filter((x:any) => x);

  const lastPathname = pathnames[pathnames.length - 1]; // Get the last path segment

  return (
    <div>
    <div className="pb-2 text-[#121212] flex items-center gap-4">
      {/* {!pathname.includes("/dashboard/home") && (
        <div className="cursor-pointer" onClick={handleNavigateBack}>
          <FaArrowLeft />
        </div>
      )} */}

      <div>
      <h1 className="font-[700] md:text-[24px] text-[18px] leading-4 text-[#121212]">
          {lastPathname
            ? capitalizeFirstLetter(
                lastPathname.split("%20").join(" ").toLowerCase() === "home"
                  ? "dashboard"
                  : lastPathname.split("%20").join(" ")
              )
            : "Dashboard"}{" "}
          {/* Replace "Home" with "Dashboard" */}
        </h1>
      </div>
    </div>
    </div>
  )
}

export default BreadscrumbDisplay