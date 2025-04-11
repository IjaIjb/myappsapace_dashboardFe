import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import DashboardLayout from "../../../components/DashboardLayout";
import { IoAddCircleOutline } from "react-icons/io5";
import { FaEdit, FaToggleOn, FaToggleOff, FaArrowRight, FaStore } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { UserApis } from "../../../apis/userApi/userApi";
import { IoWarning } from "react-icons/io5";

const Coupon = () => {
  const selectedStore = useSelector(
    (state: RootState) => state.globalState?.selectedStore || null
  );
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  
  const onOpenModal = () => {
    setOpen(true);
  };
  
  const onCloseModal = () => setOpen(false);
  
  const [formData, setFormData] = useState({
    guest_checkout: false,
    min_order_amount: "",
    max_cart_items: "",
    allow_coupons: false,
    tax: {
      tax_type: "none", // product or order or none
      tax_rate: "" // 0 or greater than 0
    }
  });
  
  const sectionName = "checkout";

  // Fetch settings from the API
  useEffect(() => {
    if (!selectedStore) return;

    setLoading(true);
    UserApis.getStoreSettings(selectedStore, sectionName)
      .then((response) => {
        if (response?.data?.settings) {
          setFormData((prev) => ({
            ...prev,
            ...response.data.settings.settings, // Populate state with API response
          }));
        }
      })
      .finally(() => setLoading(false));
  }, [selectedStore]);

  useEffect(() => {
    if (!selectedStore) {
      onOpenModal();
    } else {
      onCloseModal();
    }
  }, [selectedStore]);

  useEffect(() => {
    if (selectedStore) {
      setLoading(true);
      UserApis.getCoupon(selectedStore)
        .then((response) => {
          if (response?.data) {
            // Make sure we're accessing the coupons array from the response
            setCoupons(response?.data?.coupons || []);
          }
        })
        .catch(function (error) {
          console.error("Error fetching coupons:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [selectedStore]);

  // Format date from "2025-04-05 00:00:00" to "Apr 5, 2025"
  const formatDate = (dateStr:any) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (e) {
      return dateStr;
    }
  };

  // Handle coupon activation/deactivation
  const toggleCouponStatus = (id:any, currentStatus:any) => {
    // Implement your API call to toggle status here
    console.log(
      `Toggling coupon ${id} from ${currentStatus ? "active" : "inactive"} to ${
        !currentStatus ? "active" : "inactive"
      }`
    );
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
          to="/dashboard/site" 
          className="mt-3 inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline"
        >
          Select Existing Site
        </Link>
      </div>
      </Modal>
      
      <div>
        {/* Coupon Disabled Warning */}
        {!formData.allow_coupons && !loading && (
          <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <IoWarning className="h-5 w-5 text-yellow-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Coupons are currently disabled for your site
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    Your coupons won't work until you enable them in your site settings. 
                    <Link
                      to="/dashboard/settings/payment-preference"
                      className="ml-1 font-medium text-yellow-800 underline hover:text-yellow-900"
                    >
                      Click here to enable coupons
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3 items-center mb-7">
          <Link
            to={"/dashboard/create-coupon"}
            className="rounded-full h-fit flex items-center gap-3 px-4 py-2"
            style={{
              background: "linear-gradient(to bottom, #382B67, #7056CD)",
            }}
          >
            <IoAddCircleOutline className="text-white" />
            <h5 className="text-[#FFFFFF] text-[16px] font-[400] whitespace-nowrap">
              Create Coupon
            </h5>
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-700"></div>
          </div>
        )}
        
        {/* Empty State */}
        {!loading && coupons.length === 0 && (
          <div className="text-center py-10 text-gray-500 bg-white rounded-lg shadow">
            {formData.allow_coupons ? 
              "No coupons found. Create your first coupon to get started." :
              "No coupons found. Enable coupons in your site settings, then create your first coupon."
            }
          </div>
        )}

        {/* Desktop Table (hidden on small screens) */}
        {!loading && coupons.length > 0 && (
          <div className="hidden md:block shadow-lg rounded-lg overflow-hidden mt-6">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-gray-500 divide-y divide-gray-200">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left">
                      S/N
                    </th>
                    <th scope="col" className="px-6 py-3 text-left">
                      Coupon Code
                    </th>
                    <th scope="col" className="px-6 py-3 text-left">
                      Discount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left">
                      Expiry Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left">
                      Created At
                    </th>
                    <th scope="col" className="px-6 py-3 text-left">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {coupons.map((coupon:any, index:any) => (
                    <tr key={coupon.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">
                        {coupon.code}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {coupon.discount_value}
                        {coupon.discount_type === "percentage" ? "%" : " (Fixed)"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formatDate(coupon.expiry_date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formatDate(coupon.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            coupon.is_active
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {coupon.is_active ? (formData.allow_coupons ? "Active" : "Inactive (Site)") : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() =>
                              toggleCouponStatus(coupon.id, coupon.is_active)
                            }
                            className={`text-purple-600 hover:text-purple-900 ${!formData.allow_coupons ? 'opacity-50 cursor-not-allowed' : ''}`}
                            title={!formData.allow_coupons ? "Enable coupons in settings first" : (coupon.is_active ? "Deactivate" : "Activate")}
                            disabled={!formData.allow_coupons}
                          >
                            {coupon.is_active ? (
                              <FaToggleOn className="text-xl" />
                            ) : (
                              <FaToggleOff className="text-xl" />
                            )}
                          </button>
                          <Link
                            to={`/dashboard/edit-coupon/${coupon.id}`}
                            className="text-indigo-600 hover:text-indigo-900"
                            title="Edit"
                          >
                            <FaEdit />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Mobile View (shown only on small screens) */}
        {!loading && coupons.length > 0 && (
          <div className="md:hidden space-y-4">
            {coupons.map((coupon:any, index:any) => (
              <div key={coupon.id} className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-500">Coupon Code</div>
                    <div className="font-bold text-lg">{coupon.code}</div>
                  </div>
                  <div>
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        coupon.is_active
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {coupon.is_active ? (formData.allow_coupons ? "Active" : "Inactive (Site)") : "Inactive"}
                    </span>
                  </div>
                </div>
                
                <div className="p-4 space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-gray-500">Discount</div>
                      <div className="font-medium">
                        {coupon.discount_value}
                        {coupon.discount_type === "percentage" ? "%" : " (Fixed)"}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-xs text-gray-500">Expiry Date</div>
                      <div className="font-medium">{formatDate(coupon.expiry_date)}</div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500">Created At</div>
                  <div className="text-sm">{formatDate(coupon.created_at)}</div>
                </div>
                
                <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                  <span className="text-xs text-gray-500">#{index + 1}</span>
                  <div className="flex items-center space-x-6">
                    <button
                      onClick={() => toggleCouponStatus(coupon.id, coupon.is_active)}
                      className={`text-purple-600 hover:text-purple-900 ${!formData.allow_coupons ? 'opacity-50 cursor-not-allowed' : ''}`}
                      title={!formData.allow_coupons ? "Enable coupons in settings first" : (coupon.is_active ? "Deactivate" : "Activate")}
                      disabled={!formData.allow_coupons}
                    >
                      {coupon.is_active ? (
                        <FaToggleOn className="text-2xl" />
                      ) : (
                        <FaToggleOff className="text-2xl" />
                      )}
                    </button>
                    <Link
                      to={`/dashboard/edit-coupon/${coupon.id}`}
                      className="text-indigo-600 hover:text-indigo-900"
                      title="Edit"
                    >
                      <FaEdit className="text-xl" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Coupon;