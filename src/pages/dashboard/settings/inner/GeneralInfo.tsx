import React from "react";
import DashboardLayout from "../../../../components/DashboardLayout";
import StoreInfoGen from "../../products/inner/StoreInfoGen";
import DisplayInfoGen from "../../products/inner/DisplayInfoGen";
import BannerSettings from "./BannerSettings";
import LogoSettings from "./LogoSettings";
import SocialAndContact from "./SocialAndContact";

const GeneralInfo = () => {
  return (
    <DashboardLayout>
      <div className="grid lg:grid-cols-12 gap-3 pb-6">
        <div className="col-span-8 flex flex-col gap-3">
          <LogoSettings />
          <StoreInfoGen />
          <DisplayInfoGen />
          <BannerSettings />
          <SocialAndContact />
        </div>
        <div className="col-span-4"></div>
      </div>
    </DashboardLayout>
  );
};

export default GeneralInfo;
