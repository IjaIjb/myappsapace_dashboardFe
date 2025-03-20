import React from 'react'
import DashboardLayout from '../../../components/DashboardLayout'
import { IoAddCircleOutline } from 'react-icons/io5'
import { NavLink, Link } from "react-router-dom";
import { UserApis } from '../../../apis/userApi/userApi';

const Store = () => {
  const [stores, setStores] = React.useState<any>([]);

  React.useEffect(() => {
    UserApis.getStore()
      .then((response) => {
        if (response?.data) {
          // console?.log(response?.data);
          setStores(response?.data);
        } else {
          // dispatch(login([]))
        }
      })
      .catch(function (error) {});
  }, []);

  // console.log(stores)
  return (
   <DashboardLayout>
      <div>
        <div className="flex gap-3 items-center mb-7">
       
          <Link
          to={"/dashboard/create-site"}
            className="rounded-full h-fit flex items-center gap-3 px-4 py-2"
            style={{
              background: "linear-gradient(to bottom, #382B67, #7056CD)",
            }}
          >
            <IoAddCircleOutline className="text-white" />
            <h5 className="text-[#FFFFFF] text-[16px] font-[400] whitespace-nowrap">
              Create Site
            </h5>
            {/* <LiaUploadSolid className="text-white" /> */}
          </Link>
        </div>
        {/* <RecentOrders /> */}

        <div className="shadow-lg sm:rounded-lg w-full mt-6">
            <table className=" text-sm w-full text-gray-500 ">
              {/* <div className='w-full '> */}
              <thead className="text-xs text-gray-700 w-full px-5 bg-gray-50 ">
                <tr className="w-full">
                  <th scope="" className=" py-3">
                    S/N
                  </th>
                  <th scope="" className=" py-3">
                    Site Name
                  </th>
                  <th scope="" className=" py-3">
                Industry Type
                  </th>
                  <th scope="" className=" py-3">
                Product Type
                  </th>  
                  <th scope="" className=" py-3">
              Site Abbrevation
                  </th>
                  <th scope="" className=" py-3">
                    Date Created
                  </th>
                  <th scope="" className=" py-3">
                    Status
                  </th>
                  <th scope="" className=" py-3">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="">
                {stores?.data?.data?.map((datas:any, index:any) => (
                  <tr className="bg-white  ">
                    <td className="text-center py-4">{index + 1}</td>

                    <td className="text-center py-4">{datas?.store_name}</td>
                    <td className="text-center py-4">{datas?.industry_type}</td>
                    <td className="text-center py-4">{datas?.product_type}</td>
                    <td className="text-center py-4">{datas?.store_abbreviation}</td>
                    <td className="text-center py-4">
                      {(datas?.created_at)}
                    </td>
                    <td
                      className={`text-center py-4 
    ${
      datas?.status === "deleted"
        ? "text-red-500"
        : datas?.status === "active"
        ? "text-green-500"
        : "text-yellow-300"
    } font-bold`}
                    >
                      {datas?.status}
                    </td>
                    <td className="text-center py-4 text-blue-500 underline">
                      <NavLink to={`/edit-store/${datas?.id}`}>Edit</NavLink>
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* </div> */}
            </table>
          </div>
      </div>
   </DashboardLayout>
  )
}

export default Store