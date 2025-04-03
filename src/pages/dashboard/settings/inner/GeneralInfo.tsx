import React from "react";
import DashboardLayout from "../../../../components/DashboardLayout";
import BannerSettings from "./BannerSettings";
import SocialAndContact from "./SocialAndContact";
import SeoSettings from "./SeoSettings";
const GeneralInfo = () => {
  return (
    <DashboardLayout>
      <div className="grid lg:grid-cols-12 gap-3 pb-6">
        <div className="col-span-6 flex flex-col gap-3">
          {/* <LogoSettings /> */}
          {/* <StoreInfoGen /> */}
          {/* <DisplayInfoGen /> */}
          <BannerSettings />
          <SocialAndContact />
        </div>
        <div className="col-span-6">
          {/* <CheckoutSettings /> */}
          <SeoSettings />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GeneralInfo;
