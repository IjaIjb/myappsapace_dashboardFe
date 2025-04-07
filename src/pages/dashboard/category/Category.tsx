import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../components/DashboardLayout";
import { IoAddCircleOutline } from "react-icons/io5";
import { UserApis } from "../../../apis/userApi/userApi";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { FaArrowRight, FaStore } from "react-icons/fa";

const Category = () => {
  const selectedStore = useSelector(
    (state: RootState) => state.globalState?.selectedStore || null
  );
  // console.log("Selected Store Code:", selectedStore);

  const [categories, setCategories] = React.useState<any>([]);
  // const [stores, setStores] = useState<any>([]);

  const [open, setOpen] = useState(false);
  const onOpenModal = () => {
    // e.preventDefault();
    setOpen(true);
  };
  const onCloseModal = () => setOpen(false);

  useEffect(() => {
    if (!selectedStore) {
      onOpenModal();
    } else {
      onCloseModal();
    }
  }, [selectedStore]);
  // const [formValues, setFormValues] = useState({
  //   category_name: "",
  //   store_code: "", // Use store_code instead of store_name
  //   category_description: "",
  //   status: "active",
  // });
  // useEffect(() => {
  //   UserApis.getStore()
  //     .then((response) => {
  //       if (response?.data) {
  //         setStores(response?.data || []); // Adjusting to your API response structure
  //       }
  //     })
  //     .catch((error) => console.error("Error fetching stores:", error));
  // }, []);

  React.useEffect(() => {
    UserApis.getCategory(selectedStore)
      .then((response) => {
        if (response?.data) {
          console?.log(response?.data);
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

  // console.log(stores);
  // console.log(categories);
  return (
    <DashboardLayout>
      <Modal
        classNames={{
          modal: "rounded-[10px] overflow-visible relative",
        }}
        open={open}
        onClose={() => {}} // Prevents closing the modal
        closeOnEsc={false} // Prevent closing with the Escape key
        closeOnOverlayClick={false} // Prevent closing by clicking outside
        showCloseIcon={false} // Hides the close button
        center
      >
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
          {/* Using Font Awesome instead of SVG */}
          <FaStore className="text-blue-600 text-4xl" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Site Selected</h3>
        <p className="text-gray-600 mb-6">You need to create or select a site before adding products</p>
        <Link 
          to="/dashboard/create-site" 
          className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <span>Create a New Site</span>
          <FaArrowRight size={14} />
        </Link>
        <Link 
          to="/dashboard/sites" 
          className="mt-3 inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline"
        >
          Select Existing Site
        </Link>
      </div>
      </Modal>
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
              {categories?.categories?.data?.map((datas: any, index: any) => (
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
