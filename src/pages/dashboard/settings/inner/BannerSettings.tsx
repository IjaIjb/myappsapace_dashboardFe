import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserApis } from "../../../../apis/userApi/userApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import LoadingSpinner from "../../../../components/UI/LoadingSpinner";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

// Updated interface to accept banner index
interface ImageUploadProps {
  image: string | null; // URL of the uploaded image
  setImage: (image: string | null) => void; // Updates the image URL
  index: number; // Index of the banner
}

// Section type interface
interface AccordionSection {
  id: string;
  title: string;
  isOpen: boolean;
}

const BannerSettings = () => {
  const selectedStore = useSelector(
    (state: RootState) => state.globalState?.selectedStore || null
  );

  const sectionName = "banner";
  const [loading, setLoading] = useState(false);
  const [themeColor, setThemeColor] = useState("#ff0000");
  const [welcomeText, setWelcomeText] = useState(
    "Welcome to our premium store!"
  );
  const [banners, setBanners] = useState<any>([
    { image: null, title: "", description: "", cta_text: "", cta_link: "" },
  ]);

  // Accordion state - all sections closed initially
  const [sections, setSections] = useState<AccordionSection[]>([
    { id: "general", title: "General Settings", isOpen: false },
    { id: "banners", title: "Banner Management", isOpen: false }
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

  // Apply theme color dynamically
  useEffect(() => {
    document.body.style.setProperty("--theme-color", themeColor);
  }, [themeColor]);

  // Fetch settings from the API
  useEffect(() => {
    if (!selectedStore) return;

    setLoading(true);
    UserApis.getStoreSettings(selectedStore, sectionName)
      .then((response) => {
        if (response?.data) {
          setThemeColor(
            response.data?.banner.settings.banners.theme_color || "#ff0000"
          );
          setWelcomeText(response.data?.banner.settings.banners.welcome_text || "");
          
          // Make sure banners have the image property
          const fetchedBanners = response.data?.banner.settings.banners || [];
          if (fetchedBanners.length > 0) {
            setBanners(fetchedBanners);
          }
        }
      })
      .catch(() => {
        // Error handling is silent as per original code
      })
      .finally(() => setLoading(false));
  }, [selectedStore]);

  const ImageUpload: React.FC<ImageUploadProps> = ({ image, setImage, index }) => {
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
            // Set the image URL directly to the banner
            setImage(result.secure_url);
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
        <label className="flex w-full bg-[#FBFBFF] border border-[#D8D8E2] flex-col items-center justify-center rounded-[5px] cursor-pointer relative">
          <div className="flex flex-col items-center justify-center h-[120px] w-full">
            {image ? (
              <img
                src={image}
                alt="Banner"
                className="max-h-[110px] max-w-full object-contain"
              />
            ) : (
              <div className="flex justify-center items-center">
                <div className="flex flex-col">
                  <h4 className="text-[#9D9D9D] text-[12px] font-[400]">
                    Upload Banner Image here
                  </h4>
                  <h4 className="text-[#9D9D9D] text-[10px] font-[400]">
                    Recommended size 1200px by 400px
                  </h4>
                </div>
              </div>
            )}
          </div>
          <input
            type="file"
            accept="image/x-png,image/gif,image/jpeg"
            className="hidden mb-2 text-sm text-[#6C757D] font-medium"
            onChange={handleImageChange}
          />
        </label>
        {uploadLoading && <div className="absolute"><LoadingSpinner /></div>}
      </div>
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await UserApis.updateSettings(
        selectedStore,
        sectionName,
        {
          settings: {
            theme_color: themeColor,
            welcome_text: welcomeText,
            banners,
          },
        }
      );
      if (response?.status === 200 || response?.status === 201) {
        toast.success("Settings updated successfully!");
      }
    } catch (error) {
      toast.error("Error updating settings. Please try again.");
    }
    setLoading(false);
  };

  const handleBannerChange = (index: number, field: string, value: string) => {
    const updatedBanners = [...banners];
    updatedBanners[index][field] = value;
    setBanners(updatedBanners);
  };

  const handleSetBannerImage = (index: number, imageUrl: string | null) => {
    const updatedBanners = [...banners];
    updatedBanners[index].image = imageUrl;
    setBanners(updatedBanners);
  };

  const handleAddBanner = () => {
    setBanners([
      ...banners,
      { image: null, title: "", description: "", cta_text: "", cta_link: "" },
    ]);
  };

  const handleRemoveBanner = (index: number) => {
    const updatedBanners = banners.filter((_: any, i: any) => i !== index);
    setBanners(updatedBanners);
  };
  
  // Individual banner accordion state - all closed initially
  const [openBanners, setOpenBanners] = useState<number[]>([]); // All banners closed by default
  
  const toggleBanner = (index: number) => {
    setOpenBanners(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  const isBannerOpen = (index: number): boolean => {
    return openBanners.includes(index);
  };

  // Section header component
  const SectionHeader = ({ id, title }: { id: string; title: string }) => (
    <div 
      className="flex justify-between items-center py-3 px-4 bg-gray-100 rounded-lg cursor-pointer mb-4 hover:bg-gray-200 transition-colors"
      onClick={() => toggleSection(id)}
    >
      <h4 className="text-lg font-semibold">{title}</h4>
      <div className="text-gray-600">
        {isSectionOpen(id) ? <FaChevronUp /> : <FaChevronDown />}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-[14px] p-6 shadow-lg">
      <h4 className="text-[#000000] text-[18px] font-bold pb-6">
        Update Site Settings
      </h4>

      <div className="space-y-6">
        {/* General Settings Section */}
        <div>
          <SectionHeader id="general" title="General Settings" />
          
          {isSectionOpen("general") && (
            <div className="px-2 py-2 space-y-4 transition-all duration-300 ease-in-out">
              {/* Theme Color */}
              <div className="mb-4">
                <label className="block font-semibold mb-1">Theme Color:</label>
                <input
                  type="color"
                  value={themeColor}
                  onChange={(e) => setThemeColor(e.target.value)}
                  className="w-full h-10 border rounded-md"
                />
              </div>

              {/* Welcome Text */}
              <div className="mb-4">
                <label className="block font-semibold mb-1">Welcome Text:</label>
                <input
                  type="text"
                  value={welcomeText}
                  onChange={(e) => setWelcomeText(e.target.value)}
                  className="w-full h-12 border rounded-md p-2"
                />
              </div>
            </div>
          )}
        </div>

        {/* Banner Management Section */}
        <div>
          <SectionHeader id="banners" title="Banner Management" />
          
          {isSectionOpen("banners") && (
            <div className="px-2 py-2 space-y-4 transition-all duration-300 ease-in-out">
              {banners.map((banner: any, index: number) => (
                <div key={index} className="border rounded-lg mb-4 overflow-hidden">
                  {/* Banner Header with Toggle */}
                  <div 
                    className="flex justify-between items-center px-4 py-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => toggleBanner(index)}
                  >
                    <div className="font-medium">Banner {index + 1}</div>
                    <div>
                      {isBannerOpen(index) ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                  </div>
                  
                  {/* Banner Content */}
                  {isBannerOpen(index) && (
                    <div className="p-4 bg-white transition-all duration-300 ease-in-out">
                      {/* Banner Image */}
                      <label className="block font-semibold mb-1">Banner Image:</label>
                      <ImageUpload 
                        image={banner.image} 
                        setImage={(imageUrl) => handleSetBannerImage(index, imageUrl)}
                        index={index}
                      />

                      {/* Title */}
                      <label className="block font-semibold mb-1">Title:</label>
                      <input
                        type="text"
                        value={banner.title}
                        onChange={(e) =>
                          handleBannerChange(index, "title", e.target.value)
                        }
                        className="w-full h-10 border rounded-md p-2 mb-3"
                      />

                      {/* Description */}
                      <label className="block font-semibold mb-1">Description:</label>
                      <textarea
                        value={banner.description}
                        onChange={(e) =>
                          handleBannerChange(index, "description", e.target.value)
                        }
                        className="w-full h-16 border rounded-md p-2 mb-3"
                      />

                      {/* CTA Text */}
                      <label className="block font-semibold mb-1">CTA Text:</label>
                      <input
                        type="text"
                        value={banner.cta_text}
                        onChange={(e) =>
                          handleBannerChange(index, "cta_text", e.target.value)
                        }
                        className="w-full h-10 border rounded-md p-2 mb-3"
                      />

                      {/* CTA Link */}
                      <label className="block font-semibold mb-1">CTA Link:</label>
                      <input
                        type="text"
                        value={banner.cta_link}
                        onChange={(e) =>
                          handleBannerChange(index, "cta_link", e.target.value)
                        }
                        className="w-full h-10 border rounded-md p-2 mb-3"
                      />

                      {/* Remove Button */}
                      {banners.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveBanner(index)}
                          className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md"
                        >
                          Remove Banner
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Add Banner Button */}
              <button
                type="button"
                onClick={handleAddBanner}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
              >
                Add Banner
              </button>
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
  );
};

export default BannerSettings;