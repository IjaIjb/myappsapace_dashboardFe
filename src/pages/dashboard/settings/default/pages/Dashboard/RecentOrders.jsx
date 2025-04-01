import React from "react";
import { NavLink } from "react-router-dom";
import { formatTotalAmountWithDesc, getStatusColor } from "../../../../../helpers/helpers";
import Pagination from "../../../../extensions/Pagination";
import { FaClipboardList } from "react-icons/fa";

const RecentOrders = ({ 
  ordersLoading, 
  orders, 
  showPagination = false, 
  showAllButton = false, 
  handlePageChange = () => {}
}) => {


  if (ordersLoading) {
    return <RecentOrdersSkeleton />;
  }

  return (
    <div className="border rounded-lg my-5 overflow-hidden">
      
      {/* Header */}
      <div className="flex justify-between p-3 items-center">
        <h2 className="text-md font-quicksand font-semibold">Recent Orders</h2>
        {showAllButton && orders.data.length > 0 && (
          <NavLink to="/order-history" className="text-orange-500 hover:underline font-lato text-sm">View All →</NavLink>
        )}
      </div>

      {/* No Orders Found */}
      {orders.data.length === 0 ? (
        <div className="p-5 flex flex-col items-center text-gray-500">
          <FaClipboardList size={50} className="text-gray-400 mb-2" />
          <p className="text-sm font-semibold mt-3">No orders found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-xs leading-normal">
                <th className="py-3 px-4 text-left">Order ID</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Total</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead> 
            <tbody className="text-gray-700 text-xs">
              {orders.data.map((order, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4 font-semibold whitespace-nowrap">{order.order_code}</td>
                  <td className={`py-3 px-4 uppercase font-semibold whitespace-nowrap ${getStatusColor(order.status)}`}>
                    {order.status}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">{order.created_at}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    {formatTotalAmountWithDesc(order.total, order.currency, order.order_items)}
                  </td>
                  <td className="py-3 px-4">
                    <NavLink to={`/order-history/${order.order_code}`} className="text-blue-500 hover:underline">
                      View Details →
                    </NavLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            {showPagination && (
              <div className="px-3 py-1">
              <Pagination handlePageChange={handlePageChange} pagination={orders.pagination}   />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentOrders;

const RecentOrdersSkeleton = () => {
  return (
    <div className="border rounded-lg my-5 overflow-hidden animate-pulse">
      {/* Header Skeleton */}
      <div className="flex justify-between p-3 items-center bg-gray-100">
        <div className="h-4 w-32 bg-gray-300 rounded"></div>
        <div className="h-4 w-20 bg-gray-300 rounded"></div>
      </div>
      
      {/* Table Skeleton */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              {[...Array(5)].map((_, i) => (
                <th key={i} className="py-3 px-4">
                  <div className="h-3 w-16 bg-gray-300 rounded"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index} className="border-b border-gray-200">
                {[...Array(5)].map((_, i) => (
                  <td key={i} className="py-3 px-4">
                    <div className="h-3 w-full bg-gray-300 rounded"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
