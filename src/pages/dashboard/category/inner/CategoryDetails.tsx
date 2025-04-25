import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowRight } from "react-icons/fa";
import { UserApis } from "../../../../apis/userApi/userApi";
import DashboardLayout from "../../../../components/DashboardLayout";
import LoadingSpinner from "../../../../components/UI/LoadingSpinner";

const CategoryDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { categoryId, storeCode } = location.state || {}; // Extract values
  
  const [data, setData] = useState([])
    const [formValues, setFormValues] = useState({
    category_name: "",
    category_description: "",
    status: "active"
  });

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      if (!categoryId || !storeCode) {
        toast.error("Missing category ID or store code");
        navigate("/dashboard/category");
        return;
      }

      try {
        setIsLoading(true);
        const response = await UserApis.getSingleCategory(storeCode, categoryId);
        
        if (response?.data) {
          console.log("Category data:", response.data);
          // Adjust based on actual API response structure
          setFormValues({
            category_name: response.data.category.category_name || "",
            category_description: response.data.category.category_description || "",
            status: response.data.category.status || "active"
          });
          setData(response?.data?.category)
        } else {
          toast.error("Failed to fetch category details");
        }
      } catch (error) {
        console.error("Error fetching category:", error);
        toast.error("Error loading category details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoryDetails();
  }, [categoryId, storeCode, navigate]);
console.log(data)
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);

    // Create form data
    const formData = new FormData();
    formData.append("category_name", formValues.category_name);
    
    if (formValues.category_description) {
      formData.append("category_description", formValues.category_description);
    }
    
    if (formValues.status) {
      formData.append("status", formValues.status);
    }

    try {
      const response = await UserApis.updateCategory(storeCode, categoryId, formData);
console.log(response)
      if (response?.data) {
        toast.success(response?.data?.message || "Category updated successfully!");
        setTimeout(() => {
          navigate("/dashboard/category");
        }, 2000);
      } else {
        toast.error(response?.data?.message || "Failed to update category.");
      }
    } catch (error: any) {
      console.error("Error updating category:", error);
      toast.error(
        error?.response?.data?.message || "An error occurred while updating the category."
      );
    } finally {
      setLoader(false);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h5 className="text-gray-800 text-xl font-semibold">Update Category</h5>
            <button
              onClick={() => navigate("/dashboard/categories")}
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              Back to Categories
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Category Name */}
              <div className="space-y-2">
                <label htmlFor="category_name" className="block text-sm font-medium text-gray-700">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="category_name"
                  name="category_name"
                  value={formValues.category_name}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-3 border"
                  placeholder="Enter category name"
                  required
                />
              </div>

              {/* Category Description */}
              <div className="space-y-2">
                <label htmlFor="category_description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="category_description"
                  name="category_description"
                  rows={4}
                  value={formValues.category_description}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-3 border"
                  placeholder="Enter category description"
                />
              </div>

              {/* Status */}
              <div className="space-y-2">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formValues.status}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-3 border"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={loader}
                  className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
                >
                  {loader ? (
                    <>
                      <LoadingSpinner />
                      <span className="ml-2">Updating...</span>
                    </>
                  ) : (
                    <>
                      <span>Update Category</span>
                      <FaArrowRight className="ml-2" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </DashboardLayout>
  );
};

export default CategoryDetails;