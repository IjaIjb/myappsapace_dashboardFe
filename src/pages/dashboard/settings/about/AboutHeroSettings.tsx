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

const AboutHeroSettings = () => {
  const selectedStore = useSelector(
    (state: RootState) => state.globalState?.selectedStore || null
  );

  const sectionName = "about-hero";
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [heroImage, setHeroImage] = useState<string | null>(null);

  // Accordion state - all sections closed initially
  const [sections, setSections] = useState<AccordionSection[]>([
    { id: "content", title: "Hero Content", isOpen: false },
    { id: "image", title: "Hero Image", isOpen: false }
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
        if (response?.data) {
          const settings = response.data?.abouthero.aboutSettings;
          setTitle(settings.title);
          setSubtitle(settings.subtitle);
          setHeroImage(settings.background_image || null);
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
                alt="Hero"
                className="max-h-[110px] max-w-full object-contain"
              />
            ) : (
              <div className="flex justify-center items-center">
                <div className="flex flex-col">
                  <h4 className="text-[#9D9D9D] text-[12px] font-[400]">
                    Upload Hero Image here
                  </h4>
                  <h4 className="text-[#9D9D9D] text-[10px] font-[400]">
                    Recommended size 1920px by 1080px
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
            title: title,
            subtitle: subtitle,
            background_image: heroImage,
          },
        }
      );
      if (response?.status === 200 || response?.status === 201) {
        toast.success("Hero settings updated successfully!");
      }
    } catch (error) {
      toast.error("Error updating hero settings. Please try again.");
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
    <div className="bg-white rounded-[14px] p-6 shadow-lg">
      <h4 className="text-[#000000] text-[18px] font-bold pb-6">
        Hero Section Settings
      </h4>

      <div className="space-y-5">
        {/* Content Section */}
        <div className="border rounded-lg overflow-hidden">
          <SectionHeader id="content" title="Hero Content" />
          
          {isSectionOpen("content") && (
            <div className="p-4 space-y-4 transition-all duration-300 ease-in-out">
              {/* Title */}
              <div>
                <label className="block font-semibold mb-1">Title:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full h-12 border rounded-md p-2"
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="block font-semibold mb-1">Subtitle:</label>
                <textarea
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full h-24 border rounded-md p-2"
                  placeholder="Enter a compelling subtitle for your hero section"
                />
              </div>
            </div>
          )}
        </div>

        {/* Image Section */}
        <div className="border rounded-lg overflow-hidden">
          <SectionHeader id="image" title="Hero Image" />
          
          {isSectionOpen("image") && (
            <div className="p-4 transition-all duration-300 ease-in-out">
              <ImageUpload 
                image={heroImage} 
                setImage={setHeroImage}
              />
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

export default AboutHeroSettings;