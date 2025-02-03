import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../components/DashboardLayout";
import { IoAddCircleOutline } from "react-icons/io5";
import { UserApis } from "../../../apis/userApi/userApi";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const Category = () => {
  const selectedStore = useSelector((state: RootState) => state.globalState?.selectedStore || null);
  console.log("Selected Store Code:", selectedStore);
      
  const [categories, setCategories] = React.useState<any>([]);
  const [stores, setStores] = useState<any>([]);

  // const [formValues, setFormValues] = useState({
  //   category_name: "",
  //   store_code: "", // Use store_code instead of store_name
  //   category_description: "",
  //   status: "active",
  // });
  useEffect(() => {
    UserApis.getStore()
      .then((response) => {
        if (response?.data) {
          setStores(response?.data || []); // Adjusting to your API response structure
        }
      })
      .catch((error) => console.error("Error fetching stores:", error));
  }, []);

  React.useEffect(() => {
    UserApis.getCategory(selectedStore)
      .then((response) => {
        if (response?.data) {
          // console?.log(response?.data);
          setCategories(response?.data);
        } else {
          // dispatch(login([]))
        }
      })
      .catch(function (error) {});
  }, [selectedStore]);

  // const handleInputChange = (
  //   e: React.ChangeEvent<
  //     HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  //   >
  // ) => {
  //   const { name, value } = e.target;
  //   setFormValues((prev) => ({ ...prev, [name]: value }));
  // };

  console.log(stores);
  console.log(categories);
  return (
    <DashboardLayout>
      <div>
        <div className="flex gap-3 items-center mb-7">
          <Link
            to={"/dashboard/create-category"}
            className="rounded-full h-fit flex items-center gap-3 px-4 py-2"
            style={{
              background: "linear-gradient(to bottom, #382B67, #7056CD)",
            }}
          >
            <IoAddCircleOutline className="text-white" />
            <h5 className="text-[#FFFFFF] text-[16px] font-[400] whitespace-nowrap">
              Create Category
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
                  Category Name
                </th>
                <th scope="" className=" py-3">
                  Category Description
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
              {categories?.categories?.map((datas: any, index: any) => (
                <tr className="bg-white  ">
                  <td className="text-center py-4">{index + 1}</td>

                  <td className="text-center py-4">{datas?.category_name}</td>
                  <td className="text-center py-4">
                    {datas?.category_description}
                  </td>
                  <td className="text-center py-4">{datas?.created_at}</td>

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
                    <NavLink to={`/edit-category/${datas?.id}`}>Edit</NavLink>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* </div> */}
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Category;
