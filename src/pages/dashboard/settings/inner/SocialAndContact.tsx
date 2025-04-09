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

  // Accordion state - all sections closed initially
  const [sections, setSections] = useState<AccordionSection[]>([
    { id: "contacts", title: "Contact Information", isOpen: false },
    { id: "social", title: "Social Media Links", isOpen: false }
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

  const sectionName = "contacts";

  // Fetch settings from the API
  useEffect(() => {
    if (!selectedStore) return;

    setLoading(true);
    UserApis.getStoreSettings(selectedStore, sectionName)
      .then((response) => {
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

  // Section header component
  const SectionHeader = ({ id, title }: { id: string; title: string }) => (
    <div 
      className="flex justify-between items-center py-3 px-4 bg-gray-100 rounded-lg cursor-pointer mb-3 hover:bg-gray-200 transition-colors"
      onClick={() => toggleSection(id)}
    >
      <h5 className="text-base font-semibold">{title}</h5>
      <div className="text-gray-600">
        {isSectionOpen(id) ? <FaChevronUp /> : <FaChevronDown />}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-[14px] p-6 shadow-lg">
      <h4 className="text-[#000000] text-[18px] font-bold pb-6">
        Update Contacts and Socials
      </h4>

      <div className="space-y-5">
        {/* Contacts Section */}
        <div className="border rounded-lg overflow-hidden">
          <SectionHeader id="contacts" title="Contact Information" />
          
          {isSectionOpen("contacts") && (
            <div className="p-4 transition-all duration-300 ease-in-out">
              <div className="space-y-4">
                <div>
                  <label className="block font-semibold mb-1">Phone Number:</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full h-10 border rounded-md p-2"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full h-10 border rounded-md p-2"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Address:</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full h-10 border rounded-md p-2"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Social Media Section */}
        <div className="border rounded-lg overflow-hidden">
          <SectionHeader id="social" title="Social Media Links" />
          
          {isSectionOpen("social") && (
            <div className="p-4 transition-all duration-300 ease-in-out">
              <div className="space-y-4">
                <div>
                  <label className="block font-semibold mb-1">Facebook:</label>
                  <input
                    type="text"
                    name="facebook"
                    value={formData.facebook}
                    onChange={handleChange}
                    className="w-full h-10 border rounded-md p-2"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Twitter:</label>
                  <input
                    type="text"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleChange}
                    className="w-full h-10 border rounded-md p-2"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Instagram:</label>
                  <input
                    type="text"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    className="w-full h-10 border rounded-md p-2"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">YouTube:</label>
                  <input
                    type="text"
                    name="youtube"
                    value={formData.youtube}
                    onChange={handleChange}
                    className="w-full h-10 border rounded-md p-2"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">TikTok:</label>
                  <input
                    type="text"
                    name="tiktok"
                    value={formData.tiktok}
                    onChange={handleChange}
                    className="w-full h-10 border rounded-md p-2"
                  />
                </div>
              </div>
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
};

export default SocialAndContact;