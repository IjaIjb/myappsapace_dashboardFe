import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserApis } from "../../../../apis/userApi/userApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import LoadingSpinner from "../../../../components/UI/LoadingSpinner";

// Interface for image upload component
interface ImageUploadProps {
  image: string | null;
  setImage: (image: string | null) => void;
  index?: number;
}

const WhatWeDoSettings = () => {
  const selectedStore = useSelector(
    (state: RootState) => state.globalState?.selectedStore || null
  );

  const sectionName = "whatwedo";
  const [loading, setLoading] = useState(false);
  const [headerTitle, setHeaderTitle] = useState("What We Do?");
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);
  const [viewDetailBtnText, setViewDetailBtnText] = useState("View Detail");
  const [services, setServices] = useState<any>([
    { 
    //   icon: "mobile", 
      title: "", 
      description: ""
    },
  ]);

  // Fetch settings from the API
  useEffect(() => {
    if (!selectedStore) return;

    setLoading(true);
    UserApis.getStoreSettings(selectedStore, sectionName)
      .then((response) => {
        console.log(response.data)

        if (response?.data) {
            console.log(response.data)
          const settings = response.data?.whatwedo.aboutSettings;
          setHeaderTitle(settings.header_title || "What We Do?");
          setFeaturedImage(settings.featured_image || null);
          setViewDetailBtnText(settings.view_detail_btn_text || "View Detail");
          
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
        // icon: "code", 
        title: "", 
        description: ""
      },
    ]);
  };

  const handleRemoveService = (index: number) => {
    const updatedServices = services.filter((_: any, i: number) => i !== index);
    setServices(updatedServices);
  };

  // Available icons to choose from
//   const availableIcons = [
//     { value: "mobile", label: "Mobile" },
//     { value: "desktop", label: "Desktop" },
//     { value: "code", label: "Code" },
//     { value: "paint", label: "Design" },
//     { value: "chart", label: "Analytics" },
//     { value: "server", label: "Server" }
//   ];

  return (
    <div className="bg-white rounded-[14px] p-6 shadow-lg">
      <h4 className="text-[#000000] text-[18px] font-bold pb-4">
        What We Do Section Settings
      </h4>

      <div>
        {/* Header Title */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Header Title:</label>
          <input
            type="text"
            value={headerTitle}
            onChange={(e) => setHeaderTitle(e.target.value)}
            className="w-full h-12 border rounded-md p-2"
          />
        </div>

        {/* Featured Image */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Featured Image:</label>
          <ImageUpload 
            image={featuredImage} 
            setImage={setFeaturedImage}
          />
        </div>

        {/* View Detail Button Text */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">View Detail Button Text:</label>
          <input
            type="text"
            value={viewDetailBtnText}
            onChange={(e) => setViewDetailBtnText(e.target.value)}
            className="w-full h-12 border rounded-md p-2"
          />
        </div>

        {/* Services Section */}
        <div>
          <h4 className="text-lg font-bold mb-2">Services:</h4>
          {services.map((service: any, index: number) => (
            <div key={index} className="border p-4 rounded-lg mb-4">
              {/* Service Number */}
              <div className="bg-gray-100 px-3 py-1 mb-3 inline-block rounded-md">
                <span className="font-medium">Service {index + 1}</span>
              </div>
              
              {/* Icon Selection */}
              {/* <label className="block font-semibold mb-1">Icon:</label>
              <select
                value={service.icon}
                onChange={(e) => handleServiceChange(index, "icon", e.target.value)}
                className="w-full h-10 border rounded-md p-2 mb-3"
              >
                {availableIcons.map((icon) => (
                  <option key={icon.value} value={icon.value}>
                    {icon.label}
                  </option>
                ))}
              </select> */}

              {/* Title */}
              <label className="block font-semibold mb-1">Title:</label>
              <input
                type="text"
                value={service.title}
                onChange={(e) =>
                  handleServiceChange(index, "title", e.target.value)
                }
                className="w-full h-10 border rounded-md p-2 mb-3"
              />

              {/* Description */}
              <label className="block font-semibold mb-1">Description:</label>
              <textarea
                value={service.description}
                onChange={(e) =>
                  handleServiceChange(index, "description", e.target.value)
                }
                className="w-full h-16 border rounded-md p-2 mb-3"
              />

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
          ))}

          {/* Add Service Button */}
          <button
            type="button"
            onClick={handleAddService}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            Add Service
          </button>
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