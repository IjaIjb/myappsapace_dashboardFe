import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { UserApis } from "../../../../apis/userApi/userApi";
import { RootState } from "../../../../store/store";
import LoadingSpinner from "../../../../components/UI/LoadingSpinner";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

// Section type interface
interface AccordionSection {
  id: string;
  title: string;
  isOpen: boolean;
}

const ServicesSettings = () => {
  const selectedStore = useSelector((state:RootState) => state.globalState?.selectedStore || null);

  const sectionName = "services";
  const [loading, setLoading] = useState(false);
  const [headerTitle, setHeaderTitle] = useState("");
  const [subheading, setSubheading] = useState("");
  const [services, setServices] = useState([
    {
      title: "",
      description: "",
      image: null,
      price: "",
      duration: ""
    },
  ]);

  // Accordion state - all sections closed initially
  const [sections, setSections] = useState<AccordionSection[]>([
    { id: "general", title: "General Settings", isOpen: false },
    { id: "services", title: "Services List", isOpen: false }
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
          const settings = response.data?.services.aboutSettings;
          setHeaderTitle(settings.header_title);
          setSubheading(settings.subheading);
          
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

  const ImageUpload = ({ image, setImage, index }:any) => {
    const [uploadLoading, setUploadLoading] = useState(false);

    const handleImageChange = async (e:any) => {
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
            if (index !== undefined) {
              const updatedServices = [...services];
              updatedServices[index].image = result.secure_url;
              setServices(updatedServices);
            } else {
              setImage(result.secure_url);
            }
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
                alt="Service"
                className="max-h-[110px] max-w-full object-contain"
              />
            ) : (
              <div className="flex justify-center items-center">
                <div className="flex flex-col">
                  <h4 className="text-[#9D9D9D] text-[12px] font-[400]">
                    Upload Service Image here
                  </h4>
                  <h4 className="text-[#9D9D9D] text-[10px] font-[400]">
                    Recommended size 600px by 400px
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
            subheading: subheading,
            services: services,
          },
        }
      );
      if (response?.status === 200 || response?.status === 201) {
        toast.success("Services updated successfully!");
      }
    } catch (error) {
      toast.error("Error updating services. Please try again.");
    }
    setLoading(false);
  };

  const handleServiceChange = (index:any, field:any, value:any) => {
    const updatedServices:any = [...services];
    updatedServices[index][field] = value;
    setServices(updatedServices);
  };

  const handleAddService = () => {
    setServices([
      ...services,
      {
        title: "",
        description: "",
        image: null,
        price: "",
        duration: ""
      },
    ]);
    
    // Auto-open the newly added service
    const newIndex = services.length;
    setOpenServices(prev => [...prev, newIndex]);
  };

  const handleRemoveService = (index:any) => {
    const updatedServices = services.filter((_, i) => i !== index);
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
  const ServiceHeader = ({ index, title }: { index: number; title: string }) => (
    <div 
      className="flex justify-between items-center py-2 px-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
      onClick={() => toggleService(index)}
    >
      <div className="font-medium">
        {title || `Service ${index + 1}`}
      </div>
      <div className="text-gray-600">
        {isServiceOpen(index) ? <FaChevronUp /> : <FaChevronDown />}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-[14px] p-6 shadow-lg">
      <h4 className="text-[#000000] text-[18px] font-bold pb-6">
        Services Section Settings
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

              {/* Subheading */}
              <div>
                <label className="block font-semibold mb-1">Subheading:</label>
                <input
                  type="text"
                  value={subheading}
                  onChange={(e) => setSubheading(e.target.value)}
                  className="w-full h-12 border rounded-md p-2"
                />
              </div>
            </div>
          )}
        </div>

        {/* Services Section */}
        <div className="border rounded-lg overflow-hidden">
          <SectionHeader id="services" title="Services List" />
          
          {isSectionOpen("services") && (
            <div className="p-4 space-y-4 transition-all duration-300 ease-in-out">
              <div className="space-y-3">
                {services.map((service, index) => (
                  <div key={index} className="border rounded-lg overflow-hidden">
                    <ServiceHeader index={index} title={service.title} />
                    
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
                            placeholder="e.g. Web Development"
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
                            placeholder="Describe this service..."
                          />
                        </div>

                        {/* Service Image */}
                        <div>
                          <label className="block font-semibold mb-1">Service Image:</label>
                          <ImageUpload 
                            image={service.image} 
                            setImage={(img:any) => handleServiceChange(index, "image", img)}
                            index={index}
                          />
                        </div>

                        {/* Price */}
                        <div>
                          <label className="block font-semibold mb-1">Price:</label>
                          <input
                            type="text"
                            value={service.price}
                            onChange={(e) =>
                              handleServiceChange(index, "price", e.target.value)
                            }
                            className="w-full h-10 border rounded-md p-2"
                            placeholder="e.g. $999"
                          />
                        </div>

                        {/* Duration */}
                        <div>
                          <label className="block font-semibold mb-1">Duration:</label>
                          <input
                            type="text"
                            value={service.duration}
                            onChange={(e) =>
                              handleServiceChange(index, "duration", e.target.value)
                            }
                            className="w-full h-10 border rounded-md p-2"
                            placeholder="e.g. 2 weeks"
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
          {loading ? "Saving..." : "Save Services"}
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

export default ServicesSettings;