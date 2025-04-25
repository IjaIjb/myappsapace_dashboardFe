import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserApis } from "../../../../apis/userApi/userApi";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

// Section type interface
interface AccordionSection {
  id: string;
  title: string;
  isOpen: boolean;
}

const CheckoutSettings = () => {
  const selectedStore = useSelector(
    (state: RootState) => state.globalState?.selectedStore || null
  );

  const [loading, setLoading] = useState(false);
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

  // Accordion state - all sections closed initially
  const [sections, setSections] = useState<AccordionSection[]>([
    { id: "general", title: "General Settings", isOpen: false },
    { id: "tax", title: "Tax Settings", isOpen: false }
  ]);

  // Toggle section visibility
  const toggleSection = (sectionId: string) => {
    setSections(prevSections => 
      prevSections.map(section => 
        section.id === sectionId 
          ? { ...section, isOpen: !section.isOpen } 
          : section
      )
    );
  };

  // Get section open state
  const isSectionOpen = (sectionId: string): boolean => {
    return sections.find(section => section.id === sectionId)?.isOpen || false;
  };

  const sectionName = "checkout";

  // Fetch settings from the API
  useEffect(() => {
    if (!selectedStore) return;

    setLoading(true);
    UserApis.getStoreSettings(selectedStore, sectionName)
      .then((response) => {
        console.log(response)
        if (response?.data?.checkout) {
          setFormData((prev) => ({
            ...prev,
            ...response.data.checkout.settings, // Populate state with API response
          }));
        }
      })
      .catch(() => {
        toast.error("Failed to load store settings.");
      })
      .finally(() => setLoading(false));
  }, [selectedStore]);

  // Handle form input changes for regular fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    // Handle checkbox values
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } 
    // Handle number inputs
    else if (type === 'number') {
      setFormData((prev) => ({
        ...prev,
        [name]: parseFloat(value),
      }));
    }
    // Handle regular text inputs
    else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle tax field changes (nested object)
  const handleTaxChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const fieldValue = type === 'number' ? parseFloat(value) : value;
    
    setFormData((prev) => ({
      ...prev,
      tax: {
        ...prev.tax,
        [name]: fieldValue,
      }
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await UserApis.updateSettings(selectedStore, sectionName, {
        settings: formData,
      });

      if (response?.status === 200 || response?.status === 201) {
        toast.success("Checkout settings updated successfully!");
      } else {
        toast.error("Failed to update checkout settings.");
      }
    } catch (error) {
      toast.error("Error updating settings. Please try again.");
    }
    setLoading(false);
  };

  // Section header component
  const SectionHeader = ({ id, title }: { id: string; title: string }) => (
    <div 
      className="flex justify-between items-center py-3 px-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
      onClick={() => toggleSection(id)}
    >
      <h5 className="font-semibold">{title}</h5>
      <div className="text-gray-600">
        {isSectionOpen(id) ? <FaChevronUp /> : <FaChevronDown />}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-[14px] p-6 shadow-lg">
      <h4 className="text-[#000000] text-[18px] font-bold pb-6">
        Checkout and Coupon Settings
      </h4>

      <div className="space-y-5">
        {/* General Checkout Settings */}
        <div className="border rounded-lg overflow-hidden">
          <SectionHeader id="general" title="General Settings" />
          
          {isSectionOpen("general") && (
            <div className="p-4 space-y-4 transition-all duration-300 ease-in-out">
              <div className="mb-3">
                <label className="flex items-center gap-2 font-semibold">
                  <input
                    type="checkbox"
                    name="guest_checkout"
                    checked={formData.guest_checkout}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  Allow Guest Checkout
                </label>
              </div>

              <div className="mb-3">
                <label className="flex items-center gap-2 font-semibold">
                  <input
                    type="checkbox"
                    name="allow_coupons"
                    checked={formData.allow_coupons}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  Allow Coupons
                </label>
              </div>

              <div className="mb-3">
                <label className="block font-semibold mb-1">Minimum Order Amount ($):</label>
                <input
                  type="number"
                  name="min_order_amount"
                  value={formData.min_order_amount}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="w-full h-10 border rounded-md p-2"
                />
              </div>

              <div className="mb-3">
                <label className="block font-semibold mb-1">Maximum Cart Items:</label>
                <input
                  type="number"
                  name="max_cart_items"
                  value={formData.max_cart_items}
                  onChange={handleChange}
                  min="1"
                  className="w-full h-10 border rounded-md p-2"
                />
              </div>
            </div>
          )}
        </div>

        {/* Tax Settings */}
        <div className="border rounded-lg overflow-hidden">
          <SectionHeader id="tax" title="Tax Settings" />
          
          {isSectionOpen("tax") && (
            <div className="p-4 space-y-4 transition-all duration-300 ease-in-out">
              <div className="mb-3">
                <label className="block font-semibold mb-1">Tax Type:</label>
                <select
                  name="tax_type"
                  value={formData.tax.tax_type}
                  onChange={handleTaxChange}
                  className="w-full h-10 border rounded-md p-2"
                >
                  <option value="none">None</option>
                  <option value="product">Product Based</option>
                  <option value="order">Order Based</option>
                </select>
              </div>

              {formData.tax.tax_type !== "none" && (
                <div className="mb-3">
                  <label className="block font-semibold mb-1">Tax Rate (%):</label>
                  <input
                    type="number"
                    name="tax_rate"
                    value={formData.tax.tax_rate}
                    onChange={handleTaxChange}
                    min="0"
                    step="0.01"
                    className="w-full h-10 border rounded-md p-2"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className={`text-white py-2 px-6 rounded-md mt-6 w-full ${
            loading ? "bg-green-400" : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {loading ? "Saving..." : "Save Settings"}
        </button>
      </div>

      {/* Toast Notifications */}
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
    </div>
  );
}

export default CheckoutSettings;