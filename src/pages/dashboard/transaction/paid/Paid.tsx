import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Paid = (props:any) => {
  const { transaction } = props;
  const navigate = useNavigate();
  const [showFullDetails, setShowFullDetails] = useState(false);
  
  const paidOrders = transaction?.transactions?.data?.filter((order:any) => order.payment_status === "completed") || [];

  const handleRowClick = (trx_ref:any, store_code:any) => {
    navigate(`/dashboard/transaction-details/${trx_ref}`, {
      state: { transactionReference: trx_ref, storeCode: store_code }
    });
  };

  // Function to toggle between mobile view and full details
  const toggleView = (e:any) => {
    e.stopPropagation(); // Prevent triggering row click
    setShowFullDetails(!showFullDetails);
  };

  // Helper function to get status badge styling
  const getStatusStyle = (status:any) => {
    switch(status) {
      case "completed":
        return { bg: "#C9F0D0", color: "#51CF66" };
      case "pending":
        return { bg: "#FFF3CD", color: "#FFC107" };
      case "failed":
        return { bg: "#F8D7DA", color: "#DC3545" };
      case "paid":
        return { bg: "#C9F0D0", color: "#51CF66" };
      default:
        return { bg: "#E9ECEF", color: "#6C757D" };
    }
  };

  return (
    <div>
      <div className="bg-white rounded-[14px] pt-3 pb-4 pl-3 pr-5">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-[#382B67] text-[16px] font-[700]">
            Paid Transactions
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
              {paidOrders.map((order:any) => (
                <tr
                  key={order.id}
                  className="bg-white cursor-pointer hover:bg-gray-100"
                  onClick={() => handleRowClick(order?.transaction_reference, order?.store_code)}
                >
                  <td className="text-[12px] pl-3 font-[300] py-4">
                    {order.transaction_reference}
                  </td>
                  <td className="text-[12px] font-[300] py-4">
                    {new Date(order?.created_at).toLocaleDateString()}{" "}
                    {new Date(order?.created_at).toLocaleTimeString()}
                  </td>
                  <td className="text-[12px] font-[300] py-4">
                    {order?.currency}
                    {order.amount}
                  </td>
                  <td className="py-4">
                    <span
                      className="text-[10px] font-[500] rounded-[10px] px-2 py-1"
                      style={{
                        backgroundColor: getStatusStyle(order?.payment_status).bg,
                        color: getStatusStyle(order?.payment_status).color
                      }}
                    >
                      {order?.payment_status}
                    </span>
                  </td>
                  <td className="py-4">
                    <span
                      className="text-[10px] font-[500] rounded-[10px] px-2 py-1"
                      style={{
                        backgroundColor: getStatusStyle(order?.order?.status).bg,
                        color: getStatusStyle(order?.order?.status).color
                      }}
                    >
                      {order.order?.status || "N/A"}
                    </span>
                  </td>
                  <td className="text-[12px] font-[300] py-4">
                    {order.order?.delivery_method || "N/A"}
                  </td>
                  <td className="text-[12px] font-[300] py-4">
                    {order.order?.payment_method || "Nil"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile view (smaller than md screens) */}
        <div className="md:hidden">
          {paidOrders.length > 0 ? (
            paidOrders.map((order:any) => (
              <div 
                key={order.id}
                className="border-b border-gray-200 py-3 cursor-pointer hover:bg-gray-50"
                onClick={() => handleRowClick(order?.transaction_reference, order?.store_code)}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="max-w-[60%] truncate">
                    <span className="text-[12px] font-[500] text-gray-900">{order.transaction_reference}</span>
                    <span className="ml-2 text-[10px] text-gray-500 hidden sm:inline">
                      {new Date(order?.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <span
                    className="text-[10px] font-[500] rounded-[10px] px-2 py-1 whitespace-nowrap"
                    style={{
                      backgroundColor: "#C9F0D0",
                      color: "#51CF66"
                    }}
                  >
                    {order?.payment_status}
                  </span>
                </div>
                
                <div className="sm:hidden text-[10px] text-gray-500 mb-2">
                  {new Date(order?.created_at).toLocaleDateString()} {new Date(order?.created_at).toLocaleTimeString()}
                </div>
                
                <div className="flex justify-between mb-1">
                  <span className="text-[10px] text-gray-500">Amount:</span>
                  <span className="text-[12px] font-[500]">
                    {order?.currency}{order.amount}
                  </span>
                </div>
                
                {showFullDetails && (
                  <>
                    <div className="flex justify-between mb-1">
                      <span className="text-[10px] text-gray-500">Order Status:</span>
                      <span
                        className="text-[10px] font-[500] rounded-[10px] px-2 py-1"
                        style={{
                          backgroundColor: getStatusStyle(order?.order?.status).bg,
                          color: getStatusStyle(order?.order?.status).color
                        }}
                      >
                        {order.order?.status || "N/A"}
                      </span>
                    </div>
                    
                    <div className="flex justify-between mb-1">
                      <span className="text-[10px] text-gray-500">Delivery:</span>
                      <span className="text-[12px] font-[300]">{order.order?.delivery_method || "N/A"}</span>
                    </div>
                    
                    <div className="flex justify-between mb-1">
                      <span className="text-[10px] text-gray-500">Payment Method:</span>
                      <span className="text-[12px] font-[300]">{order.order?.payment_method || "Nil"}</span>
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <div className="py-6 text-center text-gray-500">
              <p>No paid transactions found</p>
            </div>
          )}
        </div>
        
        {/* Empty state for larger screens */}
        {paidOrders.length === 0 && (
          <div className="hidden md:block text-center py-6">
            <p className="text-gray-500">No paid transactions found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Paid;