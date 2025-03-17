import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { UserApis } from "../../../apis/userApi/userApi";
import DashboardLayout from "../../../components/DashboardLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const CreateCoupon = () => {
  const selectedStore = useSelector(
    (state: RootState) => state.globalState?.selectedStore || null
  );
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    code: "",
    discount_value: "",
    discount_type: "percentage", // Default to percentage
    expiry_date: "",
    is_active: true, // Default to active
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Get tomorrow's date in YYYY-MM-DD format for min date in date picker
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowFormatted = tomorrow.toISOString().split("T")[0];

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    // Reset error message
    setError("");

    // Code validation (alphanumeric)
    if (!/^[A-Z0-9]+$/.test(formData.code)) {
      setError(
        "Coupon code must contain only uppercase letters and numbers (e.g., SURECODER14)"
      );
      return false;
    }

    // Discount value validation (must be greater than 0)
    const discountValue = parseFloat(formData.discount_value);
    if (isNaN(discountValue) || discountValue <= 0) {
      setError("Discount value must be greater than 0");
      return false;
    }

    // For percentage, ensure value is between 1 and 100
    if (
      formData.discount_type === "percentage" &&
      (discountValue < 1 || discountValue > 100)
    ) {
      setError("Percentage discount must be between 1 and 100");
      return false;
    }

    // Expiry date validation
    if (!formData.expiry_date) {
      setError("Expiry date is required");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!selectedStore) {
      setError("No store selected. Please select a store first.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Prepare payload
      const payload = {
        ...formData,
        discount_value: parseFloat(formData.discount_value),
        is_active: formData.is_active ? 1 : 0,
      };

      // Call API
      const response = await UserApis.createCoupon(selectedStore, payload);
      console.log(response);
      if (response.data) {
        // Reset form
        setFormData({
          code: "",
          discount_value: "",
          discount_type: "percentage",
          expiry_date: "",
          is_active: true,
        });
        toast.success(
          response?.data?.message || "Coupon created successfully!"
        );
        navigate("/dashboard/coupon");
      }
    } catch (err: any) {
      console.error("Error creating coupon:", err);
      toast.error(
        err.response?.data?.message ||
          "Failed to create coupon. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className=" mx-auto p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Create New Coupon
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="code"
              className="block text-gray-700 font-medium mb-2"
            >
              Coupon Code*
            </label>
            <input
              type="text"
              id="code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="e.g., SURECODER14, FLASH30"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Use uppercase letters and numbers only (e.g., SURECODER14)
            </p>
          </div>

          <div className="mb-4">
            <label
              htmlFor="discount_value"
              className="block text-gray-700 font-medium mb-2"
            >
              Discount Value*
            </label>
            <input
              type="number"
              id="discount_value"
              name="discount_value"
              value={formData.discount_value}
              onChange={handleChange}
              placeholder="Enter discount value"
              min="0.01"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              {formData.discount_type === "percentage"
                ? "Enter a percentage value between 1-100%"
                : "Enter a fixed amount"}
            </p>
          </div>

          <div className="mb-4">
            <label
              htmlFor="discount_type"
              className="block text-gray-700 font-medium mb-2"
            >
              Discount Type*
            </label>
            <select
              id="discount_type"
              name="discount_type"
              value={formData.discount_type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="percentage">Percentage (%)</option>
              <option value="fixed">Fixed Amount</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="expiry_date"
              className="block text-gray-700 font-medium mb-2"
            >
              Expiry Date*
            </label>
            <input
              type="date"
              id="expiry_date"
              name="expiry_date"
              value={formData.expiry_date}
              onChange={handleChange}
              min={tomorrowFormatted}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_active"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="is_active" className="ml-2 block text-gray-700">
                Active Coupon
              </label>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Inactive coupons cannot be used until activated
            </p>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Creating..." : "Create Coupon"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </DashboardLayout>
  );
};

export default CreateCoupon;
