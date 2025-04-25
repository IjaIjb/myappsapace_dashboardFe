import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { FaChevronDown, FaChevronUp, FaWhatsapp } from "react-icons/fa";
import { BsChatDotsFill } from "react-icons/bs";
import { RootState } from "../../../store/store";
import { UserApis } from "../../../apis/userApi/userApi";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import DashboardLayout from "../../../components/DashboardLayout";

// Section type interface
interface AccordionSection {
  id: string;
  title: string;
  isOpen: boolean;
}

// Chat provider type
type ChatProvider = "whatsapp" | "chatbot" | "none";

// Chat settings interface
interface ChatSettings {
  enabled: boolean;
  provider: ChatProvider;
  whatsappNumber: string;
  whatsappMessage: string;
  chatbotId: string;
  displayName: string;
  responseTime: string;
  avatarUrl: string;
}

const ChatIntegrationSettings = () => {
  const selectedStore = useSelector(
    (state: RootState) => state.globalState?.selectedStore || null
  );

  const sectionName = "chatIntegration";
  const [loading, setLoading] = useState(false);

  // Chat settings state
  const [chatSettings, setChatSettings] = useState<ChatSettings>({
    enabled: false,
    provider: "none",
    whatsappNumber: "",
    whatsappMessage: "Hi, welcome to our store! How can we help you today?",
    chatbotId: "",
    displayName: "Customer Support",
    responseTime: "Typically replies within 10 minutes",
    avatarUrl: "",
  });

  // Avatar image state
  const [avatarImage, setAvatarImage] = useState<string | null>(null);

  // Accordion state - all sections closed initially
  const [sections, setSections] = useState<AccordionSection[]>([
    { id: "general", title: "General Settings", isOpen: true },
    { id: "whatsapp", title: "WhatsApp Settings", isOpen: false },
    { id: "chatbot", title: "Chatbot Settings", isOpen: false },
    { id: "appearance", title: "Appearance", isOpen: false }
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

  // Fetch settings from the API
  useEffect(() => {
    if (!selectedStore) return;

    setLoading(true);
    UserApis.getStoreSettings(selectedStore, sectionName)
      .then((response) => {
        console.log(response)
        if (response?.data && response.data.chatIntegration.chatSettings) {
          const settings = response.data.chatIntegration.chatSettings;
          setChatSettings(settings);
          setAvatarImage(settings.avatarUrl || null);
        }
      })
      .catch(() => {
        // Silent error handling
      })
      .finally(() => setLoading(false));
  }, [selectedStore]);

  // Handle chat provider change
  const handleProviderChange = (provider: ChatProvider) => {
    setChatSettings({
      ...chatSettings,
      provider
    });
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setChatSettings({
      ...chatSettings,
      [name]: value
    });
  };

  // Handle toggle change
  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatSettings({
      ...chatSettings,
      enabled: e.target.checked
    });
  };

  // Avatar Upload Component
  const AvatarUpload = () => {
    const [uploadLoading, setUploadLoading] = useState(false);

    const handleImageChange = async (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const file = e.target.files?.[0];
      if (file) {
        setUploadLoading(true);

        try {
          // Create a FormData object
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "urban_image");

          // Upload to Cloudinary
          const response = await fetch(
            "https://api.cloudinary.com/v1_1/dngyazspl/image/upload",
            {
              method: "POST",
              body: formData,
            }
          );

          const result = await response.json();
          if (result.secure_url) {
            setAvatarImage(result.secure_url);
            setChatSettings({
              ...chatSettings,
              avatarUrl: result.secure_url
            });
          }
        } catch (error) {
          console.error("Error uploading image", error);
          toast.error("Error uploading image. Please try again.");
        } finally {
          setUploadLoading(false);
        }
      }
    };

    return (
      <div className="flex justify-center text-center mb-3">
        <label className="flex flex-col items-center justify-center cursor-pointer relative">
          <div className="w-20 h-20 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50">
            {avatarImage ? (
              <img
                src={avatarImage}
                alt="Avatar"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="text-gray-400 text-sm font-medium text-center">
                Upload Avatar
              </div>
            )}
          </div>
          <input
            type="file"
            accept="image/x-png,image/gif,image/jpeg"
            className="hidden"
            onChange={handleImageChange}
          />
          <span className="mt-2 text-sm text-gray-600">Click to upload</span>
        </label>
        {uploadLoading && <div className="absolute"><LoadingSpinner /></div>}
      </div>
    );
  };

  // Submit handler
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await UserApis.updateSettings(
        selectedStore,
        sectionName,
        {
          chatSettings: chatSettings
        }
      );
      if (response?.status === 200 || response?.status === 201) {
        toast.success("Chat settings updated successfully!");
      }
    } catch (error) {
      toast.error("Error updating chat settings. Please try again.");
    }
    setLoading(false);
  };

  // Section header component
  const SectionHeader = ({ id, title }: { id: string; title: string }) => (
    <div 
      className="flex justify-between items-center py-3 px-4 bg-gray-100 rounded-lg cursor-pointer mb-3 hover:bg-gray-200 transition-colors"
      onClick={() => toggleSection(id)}
    >
      <h5 className="font-semibold">{title}</h5>
      <div className="text-gray-600">
        {isSectionOpen(id) ? <FaChevronUp /> : <FaChevronDown />}
      </div>
    </div>
  );

  return (
    <DashboardLayout>
    <div className="bg-white rounded-[14px] p-6 shadow-lg">
      <h4 className="text-[#000000] text-[18px] font-bold pb-6">
        Chat Integration Settings
      </h4>

      <div className="space-y-5">
        {/* General Settings Section */}
        <div className="border rounded-lg overflow-hidden">
          <SectionHeader id="general" title="General Settings" />
          
          {isSectionOpen("general") && (
            <div className="p-4 space-y-4 transition-all duration-300 ease-in-out">
              {/* Enable Chat Integration */}
              <div className="flex items-center justify-between">
                <label className="font-semibold">Enable Chat Integration:</label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={chatSettings.enabled} 
                    onChange={handleToggleChange}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>

              {/* Chat Provider Selection */}
              <div>
                <label className="block font-semibold mb-2">Chat Provider:</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div 
                    className={`border rounded-lg p-4 cursor-pointer flex items-center ${
                      chatSettings.provider === 'whatsapp' 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleProviderChange('whatsapp')}
                  >
                    <div className="flex items-center justify-center w-10 h-10 bg-green-500 text-white rounded-full mr-3">
                      <FaWhatsapp size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold">WhatsApp</h3>
                      <p className="text-sm text-gray-600">Connect with customers via WhatsApp</p>
                    </div>
                    <div className="ml-auto">
                      <input 
                        type="radio" 
                        checked={chatSettings.provider === 'whatsapp'} 
                        onChange={() => {}} 
                        className="w-5 h-5 accent-green-500" 
                      />
                    </div>
                  </div>

                  <div 
                    className={`border rounded-lg p-4 cursor-pointer flex items-center ${
                      chatSettings.provider === 'chatbot' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleProviderChange('chatbot')}
                  >
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full mr-3">
                      <BsChatDotsFill size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold">Chatbot</h3>
                      <p className="text-sm text-gray-600">Use AI-powered chatbot</p>
                    </div>
                    <div className="ml-auto">
                      <input 
                        type="radio" 
                        checked={chatSettings.provider === 'chatbot'} 
                        onChange={() => {}} 
                        className="w-5 h-5 accent-blue-500" 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Display Name */}
              <div>
                <label className="block font-semibold mb-1">Display Name:</label>
                <input
                  type="text"
                  name="displayName"
                  value={chatSettings.displayName}
                  onChange={handleInputChange}
                  className="w-full h-10 border rounded-md p-2"
                  placeholder="e.g., Customer Support"
                />
              </div>

              {/* Response Time */}
              <div>
                <label className="block font-semibold mb-1">Response Time Message:</label>
                <input
                  type="text"
                  name="responseTime"
                  value={chatSettings.responseTime}
                  onChange={handleInputChange}
                  className="w-full h-10 border rounded-md p-2"
                  placeholder="e.g., Typically replies within 10 minutes"
                />
              </div>
            </div>
          )}
        </div>

        {/* WhatsApp Settings */}
        <div className={`border rounded-lg overflow-hidden ${chatSettings.provider !== 'whatsapp' ? 'opacity-50' : ''}`}>
          <SectionHeader id="whatsapp" title="WhatsApp Settings" />
          
          {isSectionOpen("whatsapp") && (
            <div className="p-4 space-y-4 transition-all duration-300 ease-in-out">
              {/* WhatsApp Number */}
              <div>
                <label className="block font-semibold mb-1">WhatsApp Number:</label>
                <div className="flex">
                  <input
                    type="text"
                    name="whatsappNumber"
                    value={chatSettings.whatsappNumber}
                    onChange={handleInputChange}
                    className="w-full h-10 border rounded-md p-2"
                    placeholder="e.g., +2348012345678"
                    disabled={chatSettings.provider !== 'whatsapp'}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Include country code (e.g., +234 for Nigeria)</p>
              </div>

              {/* Default Message */}
              <div>
                <label className="block font-semibold mb-1">Default Welcome Message:</label>
                <textarea
                  name="whatsappMessage"
                  value={chatSettings.whatsappMessage}
                  onChange={handleInputChange}
                  className="w-full h-24 border rounded-md p-2"
                  placeholder="Hi, welcome to our store! How can we help you today?"
                  disabled={chatSettings.provider !== 'whatsapp'}
                />
              </div>
            </div>
          )}
        </div>

        {/* Chatbot Settings */}
        <div className={`border rounded-lg overflow-hidden ${chatSettings.provider !== 'chatbot' ? 'opacity-50' : ''}`}>
          <SectionHeader id="chatbot" title="Chatbot Settings" />
          
          {isSectionOpen("chatbot") && (
            <div className="p-4 space-y-4 transition-all duration-300 ease-in-out">
              {/* Chatbot ID */}
              <div>
                <label className="block font-semibold mb-1">Chatbot ID:</label>
                <input
                  type="text"
                  name="chatbotId"
                  value={chatSettings.chatbotId}
                  onChange={handleInputChange}
                  className="w-full h-10 border rounded-md p-2"
                  placeholder="Enter your chatbot ID"
                  disabled={chatSettings.provider !== 'chatbot'}
                />
                <p className="text-xs text-gray-500 mt-1">This ID is provided by your chatbot service</p>
              </div>
            </div>
          )}
        </div>

        {/* Appearance Settings */}
        <div className="border rounded-lg overflow-hidden">
          <SectionHeader id="appearance" title="Appearance" />
          
          {isSectionOpen("appearance") && (
            <div className="p-4 space-y-4 transition-all duration-300 ease-in-out">
              {/* Avatar Upload */}
              <div>
                <label className="block font-semibold mb-3">Chat Avatar:</label>
                <AvatarUpload />
              </div>
              
              {/* Preview */}
              <div className="mt-6 border rounded-lg p-4">
                <h3 className="font-semibold text-sm mb-2">Preview:</h3>
                <div className="border rounded-lg shadow-md max-w-sm mx-auto">
                  <div className="bg-green-700 text-white p-3 rounded-t-lg flex items-center">
                    <div className="w-8 h-8 rounded-full overflow-hidden mr-3 bg-white">
                      {avatarImage ? (
                        <img 
                          src={avatarImage} 
                          alt="Avatar" 
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-300"></div>
                      )}
                    </div>
                    <div>
                      <div className="font-semibold">{chatSettings.displayName || 'Customer Support'}</div>
                      <div className="text-xs">{chatSettings.responseTime || 'Typically replies within 10 minutes'}</div>
                    </div>
                    <button className="ml-auto text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4 bg-gray-100">
                    <div className="bg-white rounded-lg p-3 mb-2 inline-block max-w-[80%]">
                      <p className="text-sm">{chatSettings.whatsappMessage || 'Hi, welcome to our store! How can we help you today? 😊'}</p>
                      <span className="text-xs text-gray-500 block text-right">11:38 AM ✓</span>
                    </div>
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 border rounded-lg p-2 text-sm"
                        disabled
                      />
                      <button className="ml-2 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
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
    </DashboardLayout>
  );
};

export default ChatIntegrationSettings;