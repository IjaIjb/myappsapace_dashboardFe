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
}

const SeoSettings = () => {
  const selectedStore = useSelector(
    (state: RootState) => state.globalState?.selectedStore || null
  );

  const sectionName = "seo";
  const [loading, setLoading] = useState(false);
  
  // SEO Form Fields
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [robots, setRobots] = useState("");
  const [ogTitle, setOgTitle] = useState("");
  const [ogDescription, setOgDescription] = useState("");
  const [ogImage, setOgImage] = useState<string | null>("");
  const [ogUrl, setOgUrl] = useState("");

  // Fetch settings from the API
  useEffect(() => {
    if (!selectedStore) return;

    setLoading(true);
    UserApis.getStoreSettings(selectedStore, sectionName)
      .then((response) => {
        console.log(response.data);

        if (response?.data) {
          const settings = response.data?.seo.settings;
          setMetaTitle(settings.meta_title);
          setMetaDescription(settings.meta_description);
          setMetaKeywords(settings.meta_keywords);
          setRobots(settings.robots);
          setOgTitle(settings.og_title);
          setOgDescription(settings.og_description);
          setOgImage(settings.og_image);
          setOgUrl(settings.og_url);
        }
      })
      .catch((error) => {
        console.error("Error fetching SEO settings:", error);
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
                alt="OG"
                className="max-h-[110px] max-w-full object-contain"
              />
            ) : (
              <div className="flex justify-center items-center">
                <div className="flex flex-col">
                  <h4 className="text-[#9D9D9D] text-[12px] font-[400]">
                    Upload OG Image here
                  </h4>
                  <h4 className="text-[#9D9D9D] text-[10px] font-[400]">
                    Recommended size 1200px by 630px
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
            meta_title: metaTitle,
            meta_description: metaDescription,
            meta_keywords: metaKeywords,
            robots: robots,
            og_title: ogTitle,
            og_description: ogDescription,
            og_image: ogImage,
            og_url: ogUrl
          },
        }
      );
      if (response?.status === 200 || response?.status === 201) {
        toast.success("SEO settings updated successfully!");
      }
    } catch (error) {
      toast.error("Error updating SEO settings. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-[14px] p-6 shadow-lg">
      <h4 className="text-[#000000] text-[18px] font-bold pb-4">
        SEO Settings
      </h4>

      <div>
        {/* Meta Title */}
        <div className="mb-4">
          <label className="block text-[13px] font-semibold mb-1">Meta Title:</label>
          <input
            type="text"
            value={metaTitle}
            onChange={(e) => setMetaTitle(e.target.value)}
            className="w-full h-10 border border-[#D8D8E2] bg-[#FBFBFF] rounded-md p-2 text-[12px]"
            placeholder="Enter meta title for search engines"
          />
          <p className="text-[10px] text-gray-500 mt-1">Recommended length: 50-60 characters</p>
        </div>

        {/* Meta Description */}
        <div className="mb-4">
          <label className="block text-[13px] font-semibold mb-1">Meta Description:</label>
          <textarea
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            className="w-full h-20 border border-[#D8D8E2] bg-[#FBFBFF] rounded-md p-2 text-[12px]"
            placeholder="Enter meta description for search engines"
          />
          <p className="text-[10px] text-gray-500 mt-1">Recommended length: 150-160 characters</p>
        </div>

        {/* Meta Keywords */}
        <div className="mb-4">
          <label className="block text-[13px] font-semibold mb-1">Meta Keywords:</label>
          <input
            type="text"
            value={metaKeywords}
            onChange={(e) => setMetaKeywords(e.target.value)}
            className="w-full h-10 border border-[#D8D8E2] bg-[#FBFBFF] rounded-md p-2 text-[12px]"
            placeholder="Enter keywords separated by commas"
          />
        </div>

        {/* Robots */}
        <div className="mb-4">
          <label className="block text-[13px] font-semibold mb-1">Robots:</label>
          <select
            value={robots}
            onChange={(e) => setRobots(e.target.value)}
            className="w-full h-10 border border-[#D8D8E2] bg-[#FBFBFF] rounded-md p-2 text-[12px]"
          >
            <option value="index, follow">Index, Follow (recommended)</option>
            <option value="noindex, follow">NoIndex, Follow</option>
            <option value="index, nofollow">Index, NoFollow</option>
            <option value="noindex, nofollow">NoIndex, NoFollow</option>
          </select>
        </div>

        <h5 className="text-[#000000] text-[16px] font-semibold mt-6 mb-4">
          Open Graph Settings
        </h5>

        {/* OG Title */}
        <div className="mb-4">
          <label className="block text-[13px] font-semibold mb-1">OG Title:</label>
          <input
            type="text"
            value={ogTitle}
            onChange={(e) => setOgTitle(e.target.value)}
            className="w-full h-10 border border-[#D8D8E2] bg-[#FBFBFF] rounded-md p-2 text-[12px]"
            placeholder="Enter title for social media sharing"
          />
        </div>

        {/* OG Description */}
        <div className="mb-4">
          <label className="block text-[13px] font-semibold mb-1">OG Description:</label>
          <textarea
            value={ogDescription}
            onChange={(e) => setOgDescription(e.target.value)}
            className="w-full h-20 border border-[#D8D8E2] bg-[#FBFBFF] rounded-md p-2 text-[12px]"
            placeholder="Enter description for social media sharing"
          />
        </div>

        {/* OG Image */}
        <div className="mb-4">
          <label className="block text-[13px] font-semibold mb-1">OG Image:</label>
          <ImageUpload 
            image={ogImage} 
            setImage={setOgImage}
          />
          <p className="text-[10px] text-gray-500 mt-1">Image displayed when shared on social media</p>
        </div>

        {/* OG URL */}
        <div className="mb-4">
          <label className="block text-[13px] font-semibold mb-1">OG URL:</label>
          <input
            type="text"
            value={ogUrl}
            onChange={(e) => setOgUrl(e.target.value)}
            className="w-full h-10 border border-[#D8D8E2] bg-[#FBFBFF] rounded-md p-2 text-[12px]"
            placeholder="Enter canonical URL for your store"
          />
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className={`text-white py-2 px-6 rounded-md mt-6 w-full ${
            loading ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? <LoadingSpinner /> : "Save SEO Settings"}
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

export default SeoSettings;