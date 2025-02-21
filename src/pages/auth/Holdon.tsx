import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Holdon = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard/home");
    }, 5000);

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, [navigate]);

  return (
    <div>
      <div className="my-10">
        <div className="flex justify-center">
          <a href="https://myappspace.net/" rel="noreferrer" target="_blank">
            <img
              src="/images/auth/MyAppspace (3).png"
              className="w-[170px] h-full text-center"
              alt="Logo"
            />
          </a>
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
        />
      </div>
    </div>
  );
};

export default Holdon;
