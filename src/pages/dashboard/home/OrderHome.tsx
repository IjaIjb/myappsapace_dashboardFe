import React from "react";

const OrderHome = (props:any) => {
  const { orders } = props;

  return (
    <div>
      <div className="bg-white rounded-[14px] pt-3 pb-4 pl-3 pr-3 md:pr-5">
        <h4 className="text-[#382B67] text-[16px] font-[700] pb-2">
          Recent Orders
        </h4>
        
        {/* Table container with horizontal scroll for small screens */}
        <div className="overflow-x-auto lg:block hidden ">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 min-w-[700px]">
            <thead className="text-xs text-gray-700 bg-gray-50">
              <tr>
                <th scope="col" className="text-[10px] pl-3 font-[500] py-3 whitespace-nowrap">
                  Order
                </th>
                <th scope="col" className="text-[10px] font-[500] py-3 whitespace-nowrap">
                  Date
                </th>
                <th scope="col" className="text-[10px] font-[500] py-3 whitespace-nowrap">
                  Customer
                </th>
                <th scope="col" className="text-[10px] font-[500] py-3 whitespace-nowrap">
                  Total
                </th>
                <th scope="col" className="text-[10px] font-[500] py-3 whitespace-nowrap">
                  Products
                </th>
                <th scope="col" className="text-[10px] font-[500] py-3 whitespace-nowrap">
                  Payment Status
                </th>
                <th scope="col" className="text-[10px] font-[500] py-3 whitespace-nowrap">
                  Fulfillment Status
                </th>
              </tr>
            </thead>

            <tbody>
              {orders?.slice(0, 5).map((order:any) => (
                <tr
                  key={order.id}
                  className="bg-white cursor-pointer hover:bg-gray-100"
                  // onClick={() => handleRowClick(order.id)}
                >
                  <td className="text-[12px] pl-3 font-[300] py-4 whitespace-nowrap">
                    {order.order_code}
                  </td>
                  <td className="text-[12px] font-[300] py-4 whitespace-nowrap">
                    {new Date(order?.created_at).toLocaleDateString()}{" "}
                    <span className="hidden sm:inline">
                      {new Date(order?.created_at).toLocaleTimeString()}
                    </span>
                  </td>
                  <td className="text-[12px] font-[300] py-4 whitespace-nowrap">
                    {order.customer?.first_name} {order.customer?.last_name}
                  </td>
                  <td className="text-[12px] font-[300] py-4 whitespace-nowrap">
                    {order?.currency}
                    {order.total}
                  </td>
                  <td className="text-[12px] font-[300] py-4 whitespace-nowrap">
                    {order.order_items?.length ?? 0}
                  </td>

                  <td className="py-4 whitespace-nowrap">
                    <span
                      className="text-[10px] font-[500] rounded-[10px] py-[2px] px-[10px] inline-block"
                      style={{
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
                    </span>
                  </td>
                  <td className="py-4 whitespace-nowrap">
                    <span
                      className="text-[10px] font-[500] rounded-[10px] py-[2px] px-[10px] inline-block"
                      style={{
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
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Alternative Card View for Extra Small Screens */}
        <div className="block lg:hidden mt-4">
          <div className="space-y-4">
            {orders?.slice(0, 5).map((order:any) => (
              <div 
                key={order.id}
                className="bg-white p-3 border rounded-lg shadow-sm"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium">{order.order_code}</div>
                  <span
                    className="text-[10px] font-[500] rounded-[10px] py-[2px] px-[10px]"
                    style={{
                      backgroundColor:
                        order?.status === "paid"
                          ? "#C9F0D0"
                          : order?.status === "pending"
                          ? "#FFF3CD"
                          : order?.status === "failed"
                          ? "#F8D7DA"
                          : "#E9ECEF",
                      color:
                        order?.status === "paid"
                          ? "#51CF66"
                          : order?.status === "pending"
                          ? "#FFC107"
                          : order?.status === "failed"
                          ? "#DC3545"
                          : "#6C757D",
                    }}
                  >
                    {order.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-[12px] text-gray-500">
                  <div>Customer:</div>
                  <div className="font-medium text-gray-700">{order.customer?.first_name} {order.customer?.last_name}</div>
                  
                  <div>Date:</div>
                  <div className="font-medium text-gray-700">{new Date(order?.created_at).toLocaleDateString()}</div>
                  
                  <div>Total:</div>
                  <div className="font-medium text-gray-700">{order?.currency}{order.total}</div>
                  
                  <div>Products:</div>
                  <div className="font-medium text-gray-700">{order.order_items?.length ?? 0}</div>
                  
                  <div>Fulfillment:</div>
                  <div>
                    <span
                      className="text-[10px] font-[500] rounded-[10px] py-[2px] px-[10px]"
                      style={{
                        backgroundColor:
                          order.transaction?.payment_status === "completed"
                            ? "#C9F0D0"
                            : order.transaction?.payment_status === "pending"
                            ? "#FFF3CD"
                            : order.transaction?.payment_status === "failed"
                            ? "#F8D7DA"
                            : "#E9ECEF",
                        color:
                          order.transaction?.payment_status === "completed"
                            ? "#51CF66"
                            : order.transaction?.payment_status === "pending"
                            ? "#FFC107"
                            : order.transaction?.payment_status === "failed"
                            ? "#DC3545"
                            : "#6C757D",
                      }}
                    >
                      {order.transaction?.payment_status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHome;