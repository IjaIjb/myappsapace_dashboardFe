import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DashboardLayout from "../../../components/DashboardLayout";
import { UserApis } from "../../../apis/userApi/userApi";
import { RootState } from "../../../store/store";
import { FiTrash2, FiSave } from "react-icons/fi";
import { IoArrowBack } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const EditCoupon = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const selectedStore = useSelector(
    (state: RootState) => state.globalState?.selectedStore || null
  );

  const [formData, setFormData] = useState({
    code: "",
    discount_value: "",
    discount_type: "percentage",
    expiry_date: "",
    is_active: true,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  // Modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Format date from "2025-04-05 00:00:00" to "2025-04-05" for date input
  const formatDateForInput = (dateString: any) => {
    try {
      const date = new Date(dateString);
      return date.toISOString().split("T")[0];
    } catch (e) {
      return "";
    }
  };

  // Get tomorrow's date in YYYY-MM-DD format for min date in date picker
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowFormatted = tomorrow.toISOString().split("T")[0];

  // Fetch coupon data
  useEffect(() => {
    if (selectedStore && id) {
      setLoading(true);
      setError("");

      UserApis.getSingleCoupon(selectedStore, id)
        .then((response) => {
          if (response?.data?.coupon) {
            const coupon = response.data.coupon;
            setFormData({
              code: coupon.code || "",
              discount_value: coupon.discount_value || "",
              discount_type: coupon.discount_type || "percentage",
              expiry_date: formatDateForInput(coupon.expiry_date) || "",
              is_active: coupon.is_active === 1,
            });
          } else {
            setError("Could not find coupon details.");
          }
        })
        .catch((err) => {
          console.error("Error fetching coupon:", err);
          setError("Failed to load coupon details. Please try again.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [selectedStore, id]);

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

    setSaving(true);
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
      const response = await UserApis.updateCoupon(selectedStore, id, payload);

      if (response.data) {
        setSuccess("Coupon updated successfully!");
        toast.success(
          response?.data?.message || "Coupon updated successfully!"
        );
        // Redirect after a short delay
        setTimeout(() => {
          navigate("/dashboard/coupon");
        }, 1500);
      }
    } catch (err: any) {
      console.error("Error updating coupon:", err);
      setError(
        err.response?.data?.message ||
          "Failed to update coupon. Please try again."
      );
      toast.error(
        err.response?.data?.message ||
          "Failed to update coupon. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  // Open delete confirmation modal
  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  // Close delete confirmation modal
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleDelete = async () => {
    if (!selectedStore) {
      setError("No store selected. Please select a store first.");
      closeDeleteModal();
      return;
    }

    setDeleting(true);
    setError("");

    try {
      const response = await UserApis.deleteCoupon(selectedStore, id);
      if (response.data) {
        toast.success(
          response?.data?.message || "Coupon deleted successfully!"
        );
        setSuccess("Coupon deleted successfully!");
        closeDeleteModal();
        // Redirect after a short delay
        setTimeout(() => {
          navigate("/dashboard/coupon");
        }, 1500);
      }
    } catch (err: any) {
      console.error("Error deleting coupon:", err);
      toast.error(
        err.response?.data?.message ||
          "Failed to delete coupon. Please try again."
      );
      closeDeleteModal();
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Delete Confirmation Modal */}
      <Modal
        open={deleteModalOpen}
        onClose={closeDeleteModal}
        center
        classNames={{
          modal: "rounded-lg p-6 max-w-md w-full",
        }}
      >
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
            <FiTrash2 className="h-8 w-8 text-red-600" />
          </div>
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">
            Delete Coupon
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Are you sure you want to delete this coupon? This action cannot be
            undone.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              type="button"
              onClick={closeDeleteModal}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </Modal>

      <div className=" mx-auto p-4 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <button
              onClick={() => navigate("/dashboard/coupons")}
              className="mr-3 text-gray-600 hover:text-gray-900"
            >
              <IoArrowBack size={20} />
            </button>
            <h2 className="text-2xl font-semibold text-gray-800">
              Edit Coupon
            </h2>
          </div>
          <button
            onClick={openDeleteModal}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
          >
            <FiTrash2 className="mr-2" />
            Delete Coupon
          </button>
        </div>

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
              disabled={saving}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              <FiSave className="mr-2" />
              {saving ? "Saving..." : "Save Changes"}
            </button>
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
        </form>
      </div>
    </DashboardLayout>
  );
};

export default EditCoupon;
