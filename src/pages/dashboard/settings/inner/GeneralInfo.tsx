import React from "react";
import DashboardLayout from "../../../../components/DashboardLayout";
import StoreInfoGen from "../../products/inner/StoreInfoGen";
import DisplayInfoGen from "../../products/inner/DisplayInfoGen";

const GeneralInfo = () => {
  return (
    <DashboardLayout>
      <div className="grid lg:grid-cols-12 gap-3 pb-6">
        <div className="col-span-8 flex flex-col gap-3">
          <StoreInfoGen />
          <DisplayInfoGen />
        </div>
        <div className="col-span-4"></div>
      </div>
    </DashboardLayout>
  );
};

export default GeneralInfo;
