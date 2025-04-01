import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserApis } from "../../../../apis/userApi/userApi";

const SocialAndContact = () => {
  const selectedStore = useSelector(
    (state: RootState) => state.globalState?.selectedStore || null
  );

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    email: "",
    address: "",
    facebook: "",
    twitter: "",
    instagram: "",
    youtube: "",
    tiktok: "",
  });

  const sectionName = "contacts";

  // Fetch settings from the API
  useEffect(() => {
    if (!selectedStore) return;

    setLoading(true);
    UserApis.getStoreSettings(selectedStore, sectionName)
      .then((response) => {
        console.log(response)
        if (response?.data) {
          setFormData((prev) => ({
            ...prev,
            ...response.data.contacts.settings, // Populate state with API response
          }));
        }
      })
      .catch(() => {
        toast.error("Failed to load Site settings.");
      })
      .finally(() => setLoading(false));
  }, [selectedStore]);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
        toast.success("Settings updated successfully!");
      } else {
        toast.error("Failed to update settings.");
      }
    } catch (error) {
      toast.error("Error updating settings. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-[14px] p-6 shadow-lg">
      <h4 className="text-[#000000] text-[18px] font-bold pb-4">
        Update Contacts and Socials
      </h4>

      <div>
        {/* Contacts Section */}
        <div className="border p-4 rounded-lg mb-4">
          <h5 className="font-semibold mb-2">Contacts</h5>

          <label className="block font-semibold">Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full h-10 border rounded-md p-2 mb-2"
          />

          <label className="block font-semibold">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full h-10 border rounded-md p-2 mb-2"
          />

          <label className="block font-semibold">Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full h-10 border rounded-md p-2 mb-2"
          />
        </div>

        {/* Social Media Section */}
        <div className="border p-4 rounded-lg mb-4">
          <h5 className="font-semibold mb-2">Social Media Links</h5>

          <label className="block font-semibold">Facebook:</label>
          <input
            type="text"
            name="facebook"
            value={formData.facebook}
            onChange={handleChange}
            className="w-full h-10 border rounded-md p-2 mb-2"
          />

          <label className="block font-semibold">Twitter:</label>
          <input
            type="text"
            name="twitter"
            value={formData.twitter}
            onChange={handleChange}
            className="w-full h-10 border rounded-md p-2 mb-2"
          />

          <label className="block font-semibold">Instagram:</label>
          <input
            type="text"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
            className="w-full h-10 border rounded-md p-2 mb-2"
          />

          <label className="block font-semibold">YouTube:</label>
          <input
            type="text"
            name="youtube"
            value={formData.youtube}
            onChange={handleChange}
            className="w-full h-10 border rounded-md p-2 mb-2"
          />

          <label className="block font-semibold">TikTok:</label>
          <input
            type="text"
            name="tiktok"
            value={formData.tiktok}
            onChange={handleChange}
            className="w-full h-10 border rounded-md p-2 mb-2"
          />
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="bg-green-500 text-white py-2 px-6 rounded-md mt-4 w-full"
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
};

export default SocialAndContact;
