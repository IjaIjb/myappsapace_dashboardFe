import React from "react";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { RootState } from "../../../store/store";
// import { UserApis } from "../../../apis/userApi/userApi";
const RecentOrders = (props: any) => {
  const { orders } = props;

  // console.log(orders);
  const navigate = useNavigate();

  const handleRowClick = (order: any) => {

    navigate(`/dashboard/order-details/${order?.order_code}`, {
      state: { orderCode: order.order_code, storeCode: order.store_code }
    });
  };
  return (
    <div>
      <div className="flex gap-2 mb-2">
        <div className="bg-primary rounded-full px-6 py-1">
          <h6 className="text-white text-[12px] font-[400]">All</h6>
        </div>

        <div className="border border-[#9D9D9D] rounded-full px-3 py-1">
          <h6 className="text-[#9D9D9D] text-[12px] font-[400]">Fulfilled</h6>
        </div>
        <div className="border border-[#9D9D9D] rounded-full px-3 py-1">
          <h6 className="text-[#9D9D9D] text-[12px] font-[400]">Unfulfilled</h6>
        </div>
        <div className="border border-[#9D9D9D] rounded-full px-3 py-1">
          <h6 className="text-[#9D9D9D] text-[12px] font-[400]">Archived</h6>
        </div>
        <div className="border border-[#9D9D9D] rounded-full px-3 py-1">
          <h6 className="text-[#9D9D9D] text-[12px] font-[400]">Open</h6>
        </div>
      </div>
      <div className="bg-white rounded-[14px] pt-3 pb-4 pl-3 pr-5">
        <h4 className="text-[#382B67] text-[16px] font-[700] pb-2">
          Recent Orders
        </h4>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 bg-gray-50">
            <tr>
              <th scope="col" className="text-[10px] font-[500] py-3">
                Order
              </th>
              <th scope="col" className="text-[10px] font-[500] py-3">
                Date
              </th>
              <th scope="col" className="text-[10px] font-[500] py-3">
                Customer
              </th>
              <th scope="col" className="text-[10px] font-[500] py-3">
                Total
              </th>
              <th scope="col" className="text-[10px] font-[500] py-3">
                Products
              </th>
              <th scope="col" className="text-[10px] font-[500] py-3">
                Payment Status
              </th>
              <th scope="col" className="text-[10px] font-[500] py-3">
                Fulfillment Status
              </th>
              <th scope="col" className="text-[10px] font-[500] py-3">
                Delivery Method
              </th>
              <th scope="col" className="text-[10px] font-[500] py-3">
                Channel
              </th>
            </tr>
          </thead>

          <tbody>
            {
              // [
              //   { id: 3458, date: "12-14-2024", customer: "Rachael Ezeh", total: "$45.90", products: 4, payment: "Paid", fulfillment: "Fulfilled", delivery: "Standard", channel: "Online store" },
              //   { id: 3458, date: "12-14-2024", customer: "Rachael Ezeh", total: "$45.90", products: 4, payment: "Paid", fulfillment: "Fulfilled", delivery: "Standard", channel: "Online store" },
              //   { id: 3458, date: "12-14-2024", customer: "Rachael Ezeh", total: "$45.90", products: 4, payment: "Paid", fulfillment: "Fulfilled", delivery: "Standard", channel: "Online store" },
              //   { id: 3458, date: "12-14-2024", customer: "Rachael Ezeh", total: "$45.90", products: 4, payment: "Paid", fulfillment: "Fulfilled", delivery: "Standard", channel: "Online store" },
              //   // Add more orders here
              // ]
              orders?.orders?.data?.map((order: any) => (
                <tr
                  key={order.id}
                  className="bg-white cursor-pointer hover:bg-gray-100"
                  onClick={() => handleRowClick(order)}
                >
                  <td className="text-[12px] font-[300] py-4">
                    {order.order_code}
                  </td>
                  <td className="text-[12px] font-[300] py-4">
                    {new Date(order?.created_at).toLocaleDateString()}{" "}
                    {new Date(order?.created_at).toLocaleTimeString()}
                  </td>
                  <td className="text-[12px] font-[300] py-4">
                    {order.customer?.first_name} {order.customer?.last_name}
                  </td>
                  <td className="text-[12px] font-[300] py-4">
                    {order?.currency}
                    {order.total}
                  </td>
                  <td className="text-[12px] font-[300] py-4">
                    {order.products} Products
                  </td>
                  <td className="py-4">
                    <b
                      style={{
                        fontWeight: "500",
                        fontSize: "10px",
                        borderRadius: "10px",
                        padding: "2px 10px",
                        backgroundColor:
                          order.transaction?.payment_status === "completed"
                            ? "#C9F0D0"
                            : order.transaction?.payment_status === "pending"
                            ? "#FFF3CD"
                            : order.transaction?.payment_status === "failed"
                            ? "#F8D7DA"
                            : "#E9ECEF", // Default color
                        color:
                          order.transaction?.payment_status === "completed"
                            ? "#51CF66"
                            : order.transaction?.payment_status === "pending"
                            ? "#FFC107"
                            : order.transaction?.payment_status === "failed"
                            ? "#DC3545"
                            : "#6C757D", // Default color
                      }}
                    >
                      {order.transaction?.payment_status}
                    </b>
                  </td>

                  <td className="py-4">
                    <b
                      style={{
                        fontWeight: "500",
                        fontSize: "10px",
                        borderRadius: "10px",
                        padding: "2px 10px",
                        backgroundColor:
                          order?.status === "paid"
                            ? "#C9F0D0"
                            : order?.status === "pending"
                            ? "#FFF3CD"
                            : order?.status === "failed"
                            ? "#F8D7DA"
                            : "#E9ECEF", // Default color
                        color:
                          order?.status === "paid"
                            ? "#51CF66"
                            : order?.status === "pending"
                            ? "#FFC107"
                            : order?.status === "failed"
                            ? "#DC3545"
                            : "#6C757D", // Default color
                      }}
                    >
                      {order.status}
                    </b>
                  </td>
                  <td className="text-[12px] font-[300] py-4">
                    {order.delivery_method}
                  </td>
                  <td className="text-[12px] font-[300] py-4">
                    {order.payment_method || "Nil"}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
