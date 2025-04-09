import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Pending = (props:any) => {
  const { orders } = props;
  const navigate = useNavigate();
  const [showFullDetails, setShowFullDetails] = useState(false);
  
  const pendingOrders = orders?.orders?.data?.filter((order:any) => order.status === "pending") || [];

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

  return (
    <div>
      <div className="bg-white rounded-[14px] pt-3 pb-4 pl-3 pr-5">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-[#382B67] text-[16px] font-[700]">
            Pending Orders
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
              </tr>
            </thead>

            <tbody>
              {pendingOrders.map((order:any) => (
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
                        backgroundColor: "#FFF3CD",
                        color: "#FFC107"
                      }}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="text-[12px] font-[300] py-4">
                    {order.delivery_method}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile view (smaller than md screens) */}
        <div className="md:hidden">
          {pendingOrders.length > 0 ? (
            pendingOrders.map((order:any) => (
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
                      backgroundColor: "#FFF3CD",
                      color: "#FFC107"
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
                      <span className="text-[10px] text-gray-500">Fulfillment:</span>
                      <span className="text-[12px] font-[300]">{order.delivery_method}</span>
                    </div>
                    
                    <div className="flex justify-between mb-1">
                      <span className="text-[10px] text-gray-500">Time:</span>
                      <span className="text-[12px] font-[300]">
                        {new Date(order?.created_at).toLocaleTimeString()}
                      </span>
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <div className="py-6 text-center text-gray-500">
              <p>No pending orders found</p>
            </div>
          )}
        </div>
        
        {/* Empty state for larger screens */}
        {pendingOrders.length === 0 && (
          <div className="hidden md:block text-center py-6">
            <p className="text-gray-500">No pending orders found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pending;