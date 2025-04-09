import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../components/DashboardLayout";
import { IoAddCircleOutline } from "react-icons/io5";
import { UserApis } from "../../../apis/userApi/userApi";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { FaArrowRight, FaStore, FaEdit } from "react-icons/fa";

const Category = () => {
  const selectedStore = useSelector(
    (state: RootState) => state.globalState?.selectedStore || null
  );

  const [categories, setCategories] = useState<any>([]);
  const [open, setOpen] = useState(false);
  
  const onOpenModal = () => {
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

  useEffect(() => {
    if (selectedStore) {
      UserApis.getCategory(selectedStore)
        .then((response) => {
          if (response?.data) {
            setCategories(response?.data);
          }
        })
        .catch(function (error) {
          console.error("Error fetching categories:", error);
        });
    }
  }, [selectedStore]);

  // Function to format date string to more readable format
  const formatDate = (dateString:any) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (e) {
      return dateString;
    }
  };

  // Status badge style helper
  const getStatusStyle = (status:any) => {
    switch(status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "deleted":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

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
          </Link>
        </div>

        {/* Desktop Table (hidden on small screens) */}
        <div className="hidden md:block shadow-lg rounded-lg overflow-hidden mt-6">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    S/N
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category Name
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category Description
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Created
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories?.categories?.data?.length > 0 ? (
                  categories.categories.data.map((category:any, index:any) => (
                    <tr key={category.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap">{index + 1}</td>
                      <td className="px-4 py-4 whitespace-nowrap">{category.category_name}</td>
                      <td className="px-4 py-4">
                        <div className="line-clamp-2 max-w-xs">{category.category_description || "No description"}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">{formatDate(category.created_at)}</td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyle(category.status)}`}>
                          {category.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        <NavLink 
                          to={`/edit-category/${category.id}`}
                          className="text-indigo-600 hover:text-indigo-900 font-medium"
                        >
                          Edit
                        </NavLink>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                      No categories found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile View (shown only on small screens) */}
        <div className="md:hidden mt-6">
          {categories?.categories?.data?.length > 0 ? (
            categories.categories.data.map((category:any, index:any) => (
              <div key={category.id} className="bg-white rounded-lg shadow mb-4 overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{category.category_name}</h3>
                    <span className={`px-2 py-1 mt-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyle(category.status)}`}>
                      {category.status}
                    </span>
                  </div>
                  <NavLink 
                    to={`/edit-category/${category.id}`}
                    className="text-indigo-600 p-2 rounded-full hover:bg-indigo-50"
                  >
                    <FaEdit className="w-5 h-5" />
                  </NavLink>
                </div>
                
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="text-sm text-gray-500 font-medium">Description</p>
                  <p className="mt-1 text-sm text-gray-900">{category.category_description || "No description"}</p>
                </div>
                
                <div className="px-4 py-3 bg-gray-50">
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="text-gray-500">Created on</p>
                      <p className="text-gray-900">{formatDate(category.created_at)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-500">Serial Number</p>
                      <p className="text-gray-900">#{index + 1}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
              No categories found
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Category;