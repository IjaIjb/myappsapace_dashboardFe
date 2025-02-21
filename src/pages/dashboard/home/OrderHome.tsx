import React from 'react'

const OrderHome = (props:any) => {
  const {orders} = props
  console.log(orders)
  return (
    <div>
                <div className='bg-white rounded-[14px] pt-3 pb-4 pl-3 pr-5'>
<h4 className='text-[#382B67] text-[16px] font-[700] pb-2'>Recent Orders</h4>
<table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                            <thead className="text-xs text-gray-700 bg-gray-50 ">
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
                                   Fufilment Status
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
                    {order.order_items?.length ?? 0}
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
        </tr>
     ))}
                                 

                            </tbody>

                        </table>

</div>
    </div>
  )
}

export default OrderHome