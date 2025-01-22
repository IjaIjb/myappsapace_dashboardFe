import React from "react";
import DashboardLayout from "../../../../components/DashboardLayout";
import StoreOwnerStaff from "./StoreOwnerStaff";
import StaffInner from "./StaffInner";

const StaffAndPermission = () => {
  return (
    <DashboardLayout>
      <div className="grid lg:grid-cols-12 gap-3 pb-6">
        <div className="col-span-8 flex flex-col gap-3">
          <StoreOwnerStaff />
          <StaffInner />
        </div>
        <div className="col-span-4"></div>
      </div>
    </DashboardLayout>
  );
};

export default StaffAndPermission;
