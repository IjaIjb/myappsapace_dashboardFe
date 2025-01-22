import React from 'react'

const OrderHome = () => {
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
                                 <tr className="bg-white  ">

                                                <td className="text-[12px] font-[300] py-4">
                                                3458
                                                </td>

                                                <td className="text-[12px] font-[300] py-4">
                                                  12-14-2024
                                                </td>
                                                <td className="text-[12px] font-[300] py-4">
                                                Rachael Ezeh
                                                </td>
                                                <td className="text-[12px] font-[300] py-4">
                                                 $45.90
                                                </td>
                                                <td className="text-[12px] font-[300] py-4">
                                                  4 Products
                                                </td>

                                                <td className=" py-4">
                                                <p>
                                                    <b style={{ fontWeight: "500", fontSize: '10px', backgroundColor: '#C9F0D0', color: '#51CF66', borderRadius: '10px', padding: '2px 10px' }}>Paid</b>
                                                    </p> 
                                                </td>

                                                <td className=" py-4">
                                                <p>
                                                    <b style={{ fontWeight: "500", fontSize: '10px', backgroundColor: '#C9F0D0', color: '#51CF66', borderRadius: '10px', padding: '2px 10px' }}>Fufilled</b>
                                                    </p> 
                                                </td>





                                            </tr>

                                            <tr className="bg-white  ">

<td className="text-[12px] font-[300] py-4">
3458
</td>

<td className="text-[12px] font-[300] py-4">
  12-14-2024
</td>
<td className="text-[12px] font-[300] py-4">
Rachael Ezeh
</td>
<td className="text-[12px] font-[300] py-4">
 $45.90
</td>
<td className="text-[12px] font-[300] py-4">
  4 Products
</td>

<td className=" py-4">
<p>
    <b style={{ fontWeight: "500", fontSize: '10px', backgroundColor: '#C9F0D0', color: '#51CF66', borderRadius: '10px', padding: '2px 10px' }}>Paid</b>
    </p> 
</td>

<td className=" py-4">
<p>
    <b style={{ fontWeight: "500", fontSize: '10px', backgroundColor: '#C9F0D0', color: '#51CF66', borderRadius: '10px', padding: '2px 10px' }}>Fufilled</b>
    </p> 
</td>





</tr>
<tr className="bg-white  ">

<td className="text-[12px] font-[300] py-4">
3458
</td>

<td className="text-[12px] font-[300] py-4">
  12-14-2024
</td>
<td className="text-[12px] font-[300] py-4">
Rachael Ezeh
</td>
<td className="text-[12px] font-[300] py-4">
 $45.90
</td>
<td className="text-[12px] font-[300] py-4">
  4 Products
</td>

<td className=" py-4">
<p>
    <b style={{ fontWeight: "500", fontSize: '10px', backgroundColor: '#C9F0D0', color: '#51CF66', borderRadius: '10px', padding: '2px 10px' }}>Paid</b>
    </p> 
</td>

<td className=" py-4">
<p>
    <b style={{ fontWeight: "500", fontSize: '10px', backgroundColor: '#C9F0D0', color: '#51CF66', borderRadius: '10px', padding: '2px 10px' }}>Fufilled</b>
    </p> 
</td>





</tr>
<tr className="bg-white  ">

<td className="text-[12px] font-[300] py-4">
3458
</td>

<td className="text-[12px] font-[300] py-4">
  12-14-2024
</td>
<td className="text-[12px] font-[300] py-4">
Rachael Ezeh
</td>
<td className="text-[12px] font-[300] py-4">
 $45.90
</td>
<td className="text-[12px] font-[300] py-4">
  4 Products
</td>

<td className=" py-4">
<p>
    <b style={{ fontWeight: "500", fontSize: '10px', backgroundColor: '#C9F0D0', color: '#51CF66', borderRadius: '10px', padding: '2px 10px' }}>Paid</b>
    </p> 
</td>

<td className=" py-4">
<p>
    <b style={{ fontWeight: "500", fontSize: '10px', backgroundColor: '#C9F0D0', color: '#51CF66', borderRadius: '10px', padding: '2px 10px' }}>Fufilled</b>
    </p> 
</td>





</tr>
                                 

                            </tbody>

                        </table>

</div>
    </div>
  )
}

export default OrderHome