import React from 'react'
import { useNavigate } from "react-router-dom";

const CustomersTable = (props:any) => {
  const { customer } = props

    const navigate = useNavigate();
  
    const handleRowClick = (customerName:any, customer: any) => {
      navigate({
        pathname: `/dashboard/customer-details/${customerName}`,
        state: { 
          productId: customer.id, 
          storeCode: customer.store_code 
        }
      });
    };

console.log(customer)
  return (
    <div>
   
      <div className="bg-white rounded-[14px] pt-3 pb-4 pl-3 pr-5">
        {/* <h4 className="text-[#382B67] text-[16px] font-[700] pb-2">
          Recent Orders
        </h4> */}
        <div className='bg-[#EFF1F3] flex items-center mb-3 rounded-[8px] gap-3 py-1 w-fit px-5'>
<h5 className='text-[#686868] '>Filter by</h5>
<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.125 4.95834H3.38583C4.91017 4.95834 5.67233 4.95834 6.29 5.28134C6.5537 5.41968 6.79394 5.59873 7.00188 5.81189C7.48921 6.30984 7.70808 7.04014 8.14583 8.50001C8.58358 9.95989 8.80317 10.6902 9.28979 11.1881C9.49804 11.4013 9.73817 11.5806 10.0024 11.7187C10.6193 12.0417 11.3815 12.0417 12.9065 12.0417H14.875M14.875 12.0417L12.75 9.91668M14.875 12.0417L12.75 14.1667" stroke="#686868"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.1258 4.70758L13.0008 2.58258L12.4993 3.08408L14.02 4.60416H12.8888C12.1415 4.60416 11.5572 4.60416 11.0826 4.64596C10.5995 4.68846 10.2035 4.77629 9.83804 4.96754C9.52431 5.13185 9.24015 5.34731 8.99725 5.60504C9.0865 5.78259 9.16654 5.96062 9.23738 6.13912L9.316 6.34525C9.38189 6.24259 9.45782 6.14673 9.54267 6.05908C9.72477 5.87262 9.93513 5.71605 10.166 5.59512C10.4182 5.46337 10.7114 5.38971 11.1449 5.35146C11.5841 5.3125 12.138 5.3125 12.9058 5.3125H14.02L12.4993 6.83258L13.0008 7.33337L15.1258 5.20837L15.3758 4.95833L15.1258 4.70758ZM7.29442 11.3942C7.17269 11.1547 7.06623 10.9077 6.97567 10.6547C6.90977 10.7574 6.83385 10.8533 6.749 10.9409C6.5669 11.1274 6.35654 11.2839 6.12567 11.4049C5.8735 11.5366 5.58025 11.6103 5.14675 11.6485C4.70758 11.6875 4.15438 11.6875 3.38583 11.6875H2.125V12.3958H3.40283C4.15013 12.3958 4.7345 12.3958 5.20908 12.354C5.69217 12.3115 6.08813 12.2237 6.45363 12.0325C6.76736 11.8681 7.05152 11.652 7.29442 11.3942Z" fill="#686868"/>
</svg>

        </div>
 <table className="w-full text-sm text-left rtl:text-right text-gray-500">
      <thead className="text-xs text-gray-700 rounded-[6px] px-3 bg-[#EFF1F3]">
        <tr>
          <th scope="col" className="text-[10px] font-[500] py-3">
            <input
              type="checkbox"
              id="customCheckbox"
              name="customCheckbox"
              className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
          </th>
          <th scope="col" className="text-[10px] font-[500] py-3">
            Customer Name
          </th>
          <th scope="col" className="text-[10px] font-[500] py-3">
            Location
          </th>
          <th scope="col" className="text-[10px] font-[500] py-3">
            Orders Placed
          </th>
          <th scope="col" className="text-[10px] font-[500] py-3">
            Amount Spent
          </th>
          <th scope="col" className="text-[10px] font-[500] py-3">
            Status
          </th>
        </tr>
      </thead>
      <tbody className="px-3">
        {customer?.data?.customers?.map((cust:any) => (
          <tr
            key={cust.id}
            className="cursor-pointer hover:bg-gray-100"
            onClick={() => handleRowClick(cust.first_name, cust)}
          >
            <td className="text-[12px] font-[300] py-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id={`checkbox-${cust.id}`}
                  name="customCheckbox"
                  className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
              </div>
            </td>
            <td className="text-[12px] font-[300] py-4">{cust.first_name} {cust.last_name}</td>
            {/* <td className="text-[12px] font-[300] py-4">{cust.location}</td>
            <td className="text-[12px] font-[300] py-4">{cust.orders}</td> */}
            <td className="text-[12px] font-[300] py-4 ">{cust.address}</td>
            <td className="text-[12px] font-[300] py-4">{cust.email}</td>
            <td className="text-[12px] font-[300] py-4">{cust.username}</td>
            {/* <td className="text-[12px] font-[300] py-4">{cust.amount}</td> */}
            <td className="py-4">
              <b
                style={{
                  fontWeight: "500",
                  fontSize: "10px",
                  backgroundColor: cust.status === "active" ? "#C9F0D0" : "#F3CFCF",
                  color: cust.status === "active" ? "#51CF66" : "#F56C6C",
                  borderRadius: "10px",
                  padding: "2px 10px",
                }}
              >
                {cust.status}
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

export default CustomersTable