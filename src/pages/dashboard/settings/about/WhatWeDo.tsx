import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserApis } from "../../../../apis/userApi/userApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import LoadingSpinner from "../../../../components/UI/LoadingSpinner";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

// Interface for image upload component
interface ImageUploadProps {
  image: string | null;
  setImage: (image: string | null) => void;
  index?: number;
}

// Section type interface
interface AccordionSection {
  id: string;
  title: string;
  isOpen: boolean;
}

const WhatWeDoSettings = () => {
  const selectedStore = useSelector(
    (state: RootState) => state.globalState?.selectedStore || null
  );

  const sectionName = "whatwedo";
  const [loading, setLoading] = useState(false);
  const [headerTitle, setHeaderTitle] = useState("");
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);
  const [viewDetailBtnText, setViewDetailBtnText] = useState("");
  const [services, setServices] = useState<any>([
    { 
      title: "", 
      description: ""
    },
  ]);

  // Accordion state - all sections closed initially
  const [sections, setSections] = useState<AccordionSection[]>([
    { id: "general", title: "General Settings", isOpen: false },
    { id: "services", title: "Services", isOpen: false }
  ]);

  // Individual service accordion state - all closed initially
  const [openServices, setOpenServices] = useState<number[]>([]);

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

  // Toggle service visibility
  const toggleService = (index: number) => {
    setOpenServices(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  // Get section open state
  const isSectionOpen = (sectionId: string): boolean => {
    return sections.find(section => section.id === sectionId)?.isOpen || false;
  };

  // Get service open state
  const isServiceOpen = (index: number): boolean => {
    return openServices.includes(index);
  };

  // Fetch settings from the API
  useEffect(() => {
    if (!selectedStore) return;

    setLoading(true);
    UserApis.getStoreSettings(selectedStore, sectionName)
      .then((response) => {
        if (response?.data) {
          const settings = response.data?.whatwedo.aboutSettings;
          setHeaderTitle(settings.header_title);
          setFeaturedImage(settings.featured_image || null);
          setViewDetailBtnText(settings.view_detail_btn_text);
          
          // Set services if available
          if (settings.services && settings.services.length > 0) {
            setServices(settings.services);
          }
        }
      })
      .catch(() => {
        // Silent error handling
      })
      .finally(() => setLoading(false));
  }, [selectedStore]);

  const ImageUpload: React.FC<ImageUploadProps> = ({ image, setImage }) => {
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
                alt="Featured"
                className="max-h-[110px] max-w-full object-contain"
              />
            ) : (
              <div className="flex justify-center items-center">
                <div className="flex flex-col">
                  <h4 className="text-[#9D9D9D] text-[12px] font-[400]">
                    Upload Featured Image here
                  </h4>
                  <h4 className="text-[#9D9D9D] text-[10px] font-[400]">
                    Recommended size 600px by 800px
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
          aboutSettings: {
            header_title: headerTitle,
            featured_image: featuredImage,
            view_detail_btn_text: viewDetailBtnText,
            services,
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

  const handleServiceChange = (index: number, field: string, value: string) => {
    const updatedServices = [...services];
    updatedServices[index][field] = value;
    setServices(updatedServices);
  };

  const handleAddService = () => {
    setServices([
      ...services,
      { 
        title: "", 
        description: ""
      },
    ]);
    
    // Auto-open the newly added service
    const newIndex = services.length;
    setOpenServices(prev => [...prev, newIndex]);
  };

  const handleRemoveService = (index: number) => {
    const updatedServices = services.filter((_: any, i: number) => i !== index);
    setServices(updatedServices);
    
    // Remove from open services if it was open
    setOpenServices(prev => prev.filter(i => i !== index).map(i => i > index ? i - 1 : i));
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

  // Service header component
  const ServiceHeader = ({ index }: { index: number }) => (
    <div 
      className="flex justify-between items-center py-2 px-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
      onClick={() => toggleService(index)}
    >
      <div className="font-medium">Service {index + 1}</div>
      <div className="text-gray-600">
        {isServiceOpen(index) ? <FaChevronUp /> : <FaChevronDown />}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-[14px] p-6 shadow-lg">
      <h4 className="text-[#000000] text-[18px] font-bold pb-6">
        What We Do Section Settings
      </h4>

      <div className="space-y-5">
        {/* General Settings Section */}
        <div className="border rounded-lg overflow-hidden">
          <SectionHeader id="general" title="General Settings" />
          
          {isSectionOpen("general") && (
            <div className="p-4 space-y-4 transition-all duration-300 ease-in-out">
              {/* Header Title */}
              <div>
                <label className="block font-semibold mb-1">Header Title:</label>
                <input
                  type="text"
                  value={headerTitle}
                  onChange={(e) => setHeaderTitle(e.target.value)}
                  className="w-full h-12 border rounded-md p-2"
                />
              </div>

              {/* Featured Image */}
              <div>
                <label className="block font-semibold mb-1">Featured Image:</label>
                <ImageUpload 
                  image={featuredImage} 
                  setImage={setFeaturedImage}
                />
              </div>

              {/* View Detail Button Text */}
              <div>
                <label className="block font-semibold mb-1">View Detail Button Text:</label>
                <input
                  type="text"
                  value={viewDetailBtnText}
                  onChange={(e) => setViewDetailBtnText(e.target.value)}
                  className="w-full h-12 border rounded-md p-2"
                />
              </div>
            </div>
          )}
        </div>

        {/* Services Section */}
        <div className="border rounded-lg overflow-hidden">
          <SectionHeader id="services" title="Services" />
          
          {isSectionOpen("services") && (
            <div className="p-4 space-y-4 transition-all duration-300 ease-in-out">
              <div className="space-y-3">
                {services.map((service: any, index: number) => (
                  <div key={index} className="border rounded-lg overflow-hidden">
                    <ServiceHeader index={index} />
                    
                    {isServiceOpen(index) && (
                      <div className="p-4 space-y-3 transition-all duration-300 ease-in-out">
                        {/* Title */}
                        <div>
                          <label className="block font-semibold mb-1">Title:</label>
                          <input
                            type="text"
                            value={service.title}
                            onChange={(e) =>
                              handleServiceChange(index, "title", e.target.value)
                            }
                            className="w-full h-10 border rounded-md p-2"
                          />
                        </div>

                        {/* Description */}
                        <div>
                          <label className="block font-semibold mb-1">Description:</label>
                          <textarea
                            value={service.description}
                            onChange={(e) =>
                              handleServiceChange(index, "description", e.target.value)
                            }
                            className="w-full h-16 border rounded-md p-2"
                          />
                        </div>

                        {/* Remove Button */}
                        {services.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveService(index)}
                            className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md"
                          >
                            Remove Service
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Add Service Button */}
                <button
                  type="button"
                  onClick={handleAddService}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md w-full"
                >
                  Add Service
                </button>
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
  );
};

export default WhatWeDoSettings;