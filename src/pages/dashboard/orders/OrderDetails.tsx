import React, { useState } from "react";
// import { IoAddCircleOutline } from "react-icons/io5";
// import { useParams } from "react-router-dom";
import DashboardLayout from "../../../components/DashboardLayout";
// import DeliveryMethod from "./inner/DeliveryMethodStatus";
import DiscountStatus from "./inner/DiscountStatus";
import Note from "./inner/Note";
import CustomerInfo from "./inner/CustomerInfo";
import CustomerHistory from "./inner/CustomerHistory";
import { useLocation } from "react-router-dom";
import { UserApis } from "../../../apis/userApi/userApi";

const OrderDetails = () => {
  // const { orderId } = useParams();
      const location = useLocation();
      const [order, setOrder] = useState<any>(null);
  
  const { orderCode, storeCode } = location.state || {}; // Extract values correctly

    React.useEffect(() => {
      if (storeCode && orderCode) {
        UserApis.getSingleOrder(storeCode, orderCode)
          .then((response) => {
            if (response?.data) {
              console.log(response.data);
              setOrder(response?.data);
            }
          })
          .catch((error) => {
            console.error("Error fetching Order:", error);
          });
      }
    }, [storeCode, orderCode]);

    console.log(order)
  return (
    <DashboardLayout>
      <div className="grid lg:grid-cols-12 gap-3 my-6">
        <div className="col-span-8 flex flex-col gap-3">
        {/* <DeliveryMethod /> */}
        <div className="max-w-4xl mx-auto p-5">
      {/* Order Summary */}
      <div className="bg-white shadow-lg rounded-2xl p-5 mb-5">
        <h2 className="text-2xl font-semibold mb-3">Order Details</h2>
        <p><strong>Order Code:</strong> {order.order.order_code}</p>
        <p><strong>Status:</strong> <span className={`px-2 py-1 rounded ${order.order.status === "paid" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
          {order.order.status}
        </span></p>
        <p><strong>Currency:</strong> {order.order.currency}</p>
        <p><strong>Payment Method:</strong> {order.order.payment_method || "N/A"}</p>
        <p><strong>Order Date:</strong> {new Date(order.order.created_at).toLocaleDateString()}</p>
      </div>

      {/* Customer Info */}
      <div className="bg-white shadow-lg rounded-2xl p-5 mb-5">
        <h3 className="text-xl font-semibold mb-3">Customer Information</h3>
        <p><strong>Name:</strong> {order.order.customer.first_name} {order.order.customer.last_name}</p>
        <p><strong>Phone:</strong> {order.order.customer.phone_number}</p>
        <p><strong>Address:</strong> {order.order.customer_address.address_line_1}, {order.order.customer_address.address_line_2}</p>
      </div>

      {/* Order Items */}
      <div className="bg-white shadow-lg rounded-2xl p-5">
        <h3 className="text-xl font-semibold mb-3">Order Items</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {order.order_items.map((item: any) => (
            <div key={item.id} className="flex items-center bg-gray-100 p-3 rounded-lg">
              <img
                src={item.product.product_images[0]}
                alt={item.product.product_name}
                className="w-20 h-20 object-cover rounded-lg mr-3"
              />
              <div>
                <h4 className="text-lg font-semibold">{item.product.product_name}</h4>
                <p className="text-gray-600">{item.product.product_description}</p>
                <p><strong>Price:</strong> ₦{parseFloat(item.price).toLocaleString()}</p>
                <p><strong>Quantity:</strong> {item.quantity}</p>
                <p><strong>Total:</strong> ₦{parseFloat(item.total).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
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
