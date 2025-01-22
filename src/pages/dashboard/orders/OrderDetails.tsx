import React from "react";
// import { IoAddCircleOutline } from "react-icons/io5";
// import { useParams } from "react-router-dom";
import DashboardLayout from "../../../components/DashboardLayout";
import DeliveryMethod from "./inner/DeliveryMethodStatus";
import DiscountStatus from "./inner/DiscountStatus";
import Note from "./inner/Note";
import CustomerInfo from "./inner/CustomerInfo";
import CustomerHistory from "./inner/CustomerHistory";

const OrderDetails = () => {
  // const { orderId } = useParams();

  return (
    <DashboardLayout>
      <div className="grid lg:grid-cols-12 gap-3 my-6">
        <div className="col-span-8 flex flex-col gap-3">
        <DeliveryMethod />
        <DiscountStatus />
        </div>

        <div className="col-span-4 flex flex-col gap-3">
            <Note />
            <CustomerInfo />
            <CustomerHistory />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OrderDetails;
