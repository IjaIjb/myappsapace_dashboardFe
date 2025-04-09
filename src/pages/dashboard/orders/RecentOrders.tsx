import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RecentOrders = (props:any) => {
  const { orders } = props;
  const navigate = useNavigate();
  const [showFullDetails, setShowFullDetails] = useState(false);

  const handleRowClick = (order:any) => {
    navigate(`/dashboard/order-details/${order?.order_code}`, {
      state: { orderCode: order.order_code, storeCode: order.store_code }
    });
  };

  // Function to toggle between mobile view and full details
  const toggleView = (e:any) => {
    e.stopPropagation(); // Prevent triggering row click
    setShowFullDetails(!showFullDetails);
  };

  // Define status badge styles
  const getStatusStyle = (status:any) => {
    switch(status) {
      case "paid":
        return { bg: "#C9F0D0", color: "#51CF66" };
      case "pending":
        return { bg: "#FFF3CD", color: "#FFC107" };
      case "failed":
        return { bg: "#F8D7DA", color: "#DC3545" };
      default:
        return { bg: "#E9ECEF", color: "#6C757D" };
    }
  };
  
  return (
    <div>
      <div className="bg-white rounded-[14px] pt-3 pb-4 pl-3 pr-5">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-[#382B67] text-[16px] font-[700]">
            Recent Orders
          </h4>
          <button 
            onClick={toggleView}
            className="text-blue-600 text-xs md:hidden"
          >
            {showFullDetails ? "Simple View" : "Show All Columns"}
          </button>
        </div>

        {/* Desktop view (md and larger screens) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 bg-gray-50">
              <tr>
                <th scope="col" className="text-[10px] pl-3 font-[500] py-3">
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
              {orders?.orders?.data?.map((order:any) => (
                <tr
                  key={order.id}
                  className="bg-white cursor-pointer pl-3 hover:bg-gray-100"
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
                    <span
                      className="text-[10px] font-[500] rounded-[10px] px-2 py-1"
                      style={{
                        backgroundColor: getStatusStyle(order?.status).bg,
                        color: getStatusStyle(order?.status).color
                      }}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="text-[12px] font-[300] py-4">
                    {order.delivery_method}
                  </td>
                  <td className="text-[12px] font-[300] py-4">
                    {order.payment_method || "Nil"}
                  </td>
                  <td className="text-[12px] font-[300] py-4">
                    Online store
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile view (smaller than md screens) */}
        <div className="md:hidden">
          {orders?.orders?.data?.map((order:any) => (
            <div 
              key={order.id}
              className="border-b border-gray-200 py-3 cursor-pointer hover:bg-gray-50"
              onClick={() => handleRowClick(order)}
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <span className="text-[12px] font-[500] text-gray-900">#{order.order_code}</span>
                  <span className="ml-2 text-[10px] text-gray-500">
                    {new Date(order?.created_at).toLocaleDateString()}
                  </span>
                </div>
                <span
                  className="text-[10px] font-[500] rounded-[10px] px-2 py-1"
                  style={{
                    backgroundColor: getStatusStyle(order?.status).bg,
                    color: getStatusStyle(order?.status).color
                  }}
                >
                  {order.status}
                </span>
              </div>
              
              <div className="flex justify-between mb-1">
                <span className="text-[10px] text-gray-500">Customer:</span>
                <span className="text-[12px] font-[300]">
                  {order.customer?.first_name} {order.customer?.last_name}
                </span>
              </div>
              
              <div className="flex justify-between mb-1">
                <span className="text-[10px] text-gray-500">Total:</span>
                <span className="text-[12px] font-[500]">
                  {order?.currency}{order.total}
                </span>
              </div>
              
              {showFullDetails && (
                <>
                  <div className="flex justify-between mb-1">
                    <span className="text-[10px] text-gray-500">Products:</span>
                    <span className="text-[12px] font-[300]">{order.products} Products</span>
                  </div>
                  
                  <div className="flex justify-between mb-1">
                    <span className="text-[10px] text-gray-500">Delivery:</span>
                    <span className="text-[12px] font-[300]">{order.delivery_method}</span>
                  </div>
                  
                  <div className="flex justify-between mb-1">
                    <span className="text-[10px] text-gray-500">Payment Method:</span>
                    <span className="text-[12px] font-[300]">{order.payment_method || "Nil"}</span>
                  </div>
                  
                  <div className="flex justify-between mb-1">
                    <span className="text-[10px] text-gray-500">Channel:</span>
                    <span className="text-[12px] font-[300]">Online store</span>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Empty state */}
        {(!orders?.orders?.data || orders?.orders?.data.length === 0) && (
          <div className="text-center py-6">
            <p className="text-gray-500">No orders found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentOrders;