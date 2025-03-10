import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const FinanceTable = (props: any) => {
  const { transaction } = props;
console.log(transaction)
  const navigate = useNavigate();
      const [isFocused, setIsFocused] = useState(false);
  
  const handleRowClick = (orderId:any) => {
    navigate(`/dashboard/order-details/${orderId}`); // Navigate to the order details page with the order ID
  };
  return (
    <div>
        <div className='flex justify-between mb-3'>
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
    <div className='flex justify-end'>
        <div className="relative">
      {/* Input field */}
      <input
        type={isFocused ? "date" : "text"}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-fit p-1 border border-[#D9D9D9] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    {/* Icon */}
    {!isFocused && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
          📅
        </div>
      )}
      {/* Placeholder text */}
      {!isFocused && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
          Last 30 Days
        </div>
      )}

  
    </div>
        </div>
        </div>
    <div className="bg-white rounded-[14px] pt-3 pb-4 pl-3 pr-5">
      {/* <h4 className="text-[#382B67] text-[16px] font-[700] pb-2">
        Recent Orders
      </h4> */}
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
    <thead className="text-xs text-gray-700 bg-gray-50">
      <tr>
        <th scope="col" className="text-[10px] pl-3 font-[500] py-3">
        Transaction ref
        </th>
        <th scope="col" className="text-[10px] font-[500] py-3">
          Date
        </th>
        <th scope="col" className="text-[10px] font-[500] py-3">
                Total
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
      transaction?.transactions?.data?.map((order:any) => (
        <tr
          key={order.id}
          className="bg-white cursor-pointer pl-3 hover:bg-gray-100"
          onClick={() => handleRowClick(order.id)}
        >
          <td className="text-[12px] pl-3 font-[300] py-4">{order.transaction_reference}</td>
          <td className="text-[12px] font-[300] py-4">                    {new Date(order?.created_at).toLocaleDateString()}{" "}
          {new Date(order?.created_at).toLocaleTimeString()}</td>
          <td className="text-[12px] font-[300] py-4">
                    {order?.currency}
                    {order.amount}
                  </td>

                  <td className="py-4">
                    <b
                      style={{
                        fontWeight: "500",
                        fontSize: "10px",
                        borderRadius: "10px",
                        padding: "2px 10px",
                        backgroundColor:
                          order.payment_status === "completed"
                            ? "#C9F0D0"
                            : order?.payment_status === "pending"
                            ? "#FFF3CD"
                            : order?.payment_status === "failed"
                            ? "#F8D7DA"
                            : "#E9ECEF", // Default color
                        color:
                          order?.payment_status === "completed"
                            ? "#51CF66"
                            : order?.payment_status === "pending"
                            ? "#FFC107"
                            : order?.payment_status === "failed"
                            ? "#DC3545"
                            : "#6C757D", // Default color
                      }}
                    >
                      {order?.payment_status}
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
                          order?.order?.status === "paid"
                            ? "#C9F0D0"
                            : order?.order?.status === "pending"
                            ? "#FFF3CD"
                            : order?.order?.status === "failed"
                            ? "#F8D7DA"
                            : "#E9ECEF", // Default color
                        color:
                          order?.order?.status === "paid"
                            ? "#51CF66"
                            : order?.order?.status === "pending"
                            ? "#FFC107"
                            : order?.order?.status === "failed"
                            ? "#DC3545"
                            : "#6C757D", // Default color
                      }}
                    >
                      {order.order?.status}
                    </b>
                  </td>
                  <td className="text-[12px] font-[300] py-4">
                    {order.order?.delivery_method}
                  </td>
                  <td className="text-[12px] font-[300] py-4">
                    {order.order?.payment_method || "Nil"}
                  </td>
        </tr>
      ))}
    </tbody>
  </table>
    </div>
  </div>
  )
}

export default FinanceTable