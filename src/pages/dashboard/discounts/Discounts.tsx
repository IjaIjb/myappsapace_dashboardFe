import React from "react";
import DashboardLayout from "../../../components/DashboardLayout";
import DiscountTable from "./DiscountTable";

const Discounts = () => {
  return (
    <DashboardLayout>
      <div>
        <DiscountTable />
      </div>
    </DashboardLayout>
  );
};

export default Discounts;
