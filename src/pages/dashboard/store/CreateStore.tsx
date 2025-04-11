import DashboardLayout from "../../../components/DashboardLayout";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { FaArrowRight } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import { UserApis } from "../../../apis/userApi/userApi";

const CreateStore = () => {
  const [formValues, setFormValues] = useState({
    store_name: "",
    store_abbreviation: "",
    industry_type: "",
    product_type: "",
    store_description: "", // optional
    store_location: "", // optional
  });

  const [storeLogo, setStoreLogo] = useState<File | null>(null);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setStoreLogo(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);

    const formData = new FormData();
    if (storeLogo) {
      formData.append("store_logo", storeLogo);
    }
    
    // Required fields
    formData.append("store_name", formValues.store_name);
    formData.append("store_abbreviation", formValues.store_abbreviation);
    formData.append("industry_type", formValues.industry_type);
    formData.append("product_type", formValues.product_type);
    
    // Optional fields - only add if they have values
    if (formValues.store_description) {
      formData.append("store_description", formValues.store_description);
    }
    
    if (formValues.store_location) {
      formData.append("store_location", formValues.store_location);
    }

    try {
      const response: any = await UserApis.createStore(formData);
      
      if (response?.status === 200 || response?.status === 201) {
        toast.success(response?.data?.message || "Store created successfully!");
        navigate("/dashboard/site");
      } else {
        toast.error(response?.data?.message || "Failed to create Site.");
      }
    } catch (error) {
      console.error("Error creating Site:", error);
      toast.error("An error occurred while creating the Site.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h5 className="text-gray-900 text-xl font-semibold mb-6 border-b pb-3">
          Business Information
        </h5>
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto"
        >
          {/* Add Logo */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Add Logo <span className="text-red-500">*</span>
            </label>
            <div className="flex justify-center text-center">
              <label className="flex w-full bg-gray-50 border border-gray-200 flex-col items-center justify-center rounded-lg cursor-pointer hover:bg-gray-100 transition duration-300">
                <div className="flex flex-col items-center justify-center h-40 w-full">
                  {storeLogo ? (
                    <div className="flex flex-col items-center">
                      <img
                        src={URL.createObjectURL(storeLogo)}
                        alt="Uploaded logo"
                        className="w-24 h-24 object-contain mb-2"
                      />
                      <p className="text-sm text-gray-500">Click to change</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-sm font-medium text-gray-600">Upload Logo Image</p>
                      <p className="text-xs text-gray-500 mt-1">Recommended size 32px by 32px</p>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/x-png,image/gif,image/jpeg"
                  className="hidden"
                  onChange={handleImageChange}
                  required
                />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Store Name */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Site Name <span className="text-red-500">*</span>
                {/* <span className="text-gray-400 text-xs ml-1">(e.g. Hewlett-Packard)</span> */}
              </label>
              <input
                type="text"
                name="store_name"
                value={formValues.store_name}
                onChange={handleInputChange}
                placeholder=""
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                required
              />
            </div>

            {/* Store Abbreviation */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Site Abbreviation <span className="text-red-500">*</span>
                {/* <span className="text-gray-400 text-xs ml-1">(e.g. HP)</span> */}
              </label>
              <input
                type="text"
                name="store_abbreviation"
                value={formValues.store_abbreviation}
                onChange={handleInputChange}
                placeholder=""
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                required
              />
            </div>

            {/* Industry Type */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Industry Type <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="industry_type"
                value={formValues.industry_type}
                onChange={handleInputChange}
                placeholder=""
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                required
              />
            </div>

            {/* Product Type */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Product Type <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="product_type"
                value={formValues.product_type}
                onChange={handleInputChange}
                placeholder=""
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                required
              />
            </div>
          </div>

          <div className="mt-6">
            {/* Store Description (Optional) */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Store Description
                <span className="text-gray-400 text-xs ml-1">(optional)</span>
              </label>
              <textarea
                name="store_description"
                value={formValues.store_description}
                onChange={handleInputChange}
                placeholder=""
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                rows={3}
              />
            </div>

            {/* Store Location (Optional) */}
            <div className="mb-8">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Business Location
                <span className="text-gray-400 text-xs ml-1">(optional)</span>
              </label>
              <input
                type="text"
                name="store_location"
                value={formValues.store_location}
                onChange={handleInputChange}
                placeholder=""
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              />
            </div>
          </div>

          {/* No domain fields as per payload requirements */}

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loader}
              className="bg-primary text-white py-2.5 px-6 rounded-lg hover:bg-primary/80 transition duration-300 flex items-center justify-center disabled:bg-gray-400 min-w-24"
            >
              {loader ? <LoadingSpinner /> : "Proceed"}
            </button>
          </div>
        </form>
        <ToastContainer 
          position="bottom-left"
          autoClose={2000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover 
        />
      </div>
    </DashboardLayout>
  );
};

export default CreateStore;