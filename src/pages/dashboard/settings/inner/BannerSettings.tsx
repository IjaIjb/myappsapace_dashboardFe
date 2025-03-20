import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserApis } from "../../../../apis/userApi/userApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import LoadingSpinner from "../../../../components/UI/LoadingSpinner";
interface ImageUploadProps {
  image: string | null; // URL of the uploaded image
  setImage: (image: string | null) => void; // Updates the image URL
}

const BannerSettings = () => {
  const selectedStore = useSelector(
    (state: RootState) => state.globalState?.selectedStore || null
  );

  const sectionName = "banner";
  const [image, setImage] = useState<any>(null);

  const [loading, setLoading] = useState(false);
  const [themeColor, setThemeColor] = useState("#ff0000");
  const [welcomeText, setWelcomeText] = useState(
    "Welcome to our premium store!"
  );
  const [banners, setBanners] = useState<any>([
    { image: null, title: "", description: "", cta_text: "", cta_link: "" },
  ]);

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
        if (response?.data?.settings) {
          // console.log(response?.data?.settings);
          setThemeColor(
            response.data?.settings.settings.theme_color || "#ff0000"
          );
          setWelcomeText(response.data?.settings.settings.welcome_text || "");
          setBanners(response.data?.settings.settings.banners || []);
        }
      })
      .catch(() => {
        // toast.error("Failed to load store settings.");
      })
      .finally(() => setLoading(false));
  }, [selectedStore]);

  const ImageUpload: React.FC<ImageUploadProps> = ({ image, setImage }) => {
    const [loading, setLoading] = useState(false);

    const handleImageChange = async (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const file = e.target.files?.[0];
      if (file) {
        setLoading(true); // Show loading spinner or indicator

        try {
          // Create a FormData object
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "urban_image"); // Replace with your Cloudinary preset

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
            // Set the image URL in the state
            setImage(result.secure_url);
          }

          setLoading(false); // Stop loading
        } catch (error) {
          console.error("Error uploading image", error);
          toast.error("Error uploading image. Please try again.");
          setLoading(false);
        }
      }
    };

    return (
      <div className="flex justify-center text-center">
        <label className="flex w-full bg-[#FBFBFF] border border-[#D8D8E2] flex-col items-center justify-center rounded-[5px] cursor-pointer relative">
          <div className="flex flex-col items-center justify-center h-[80px]">
            {image ? (
              <img
                className=""
                src={image} // This should now be the Cloudinary URL
                alt="Uploaded logo"
                width={100}
                height={100}
              />
            ) : (
              <div className="flex justify-center items-center">
                <div className="flex flex-col">
                  <h4 className="text-[#9D9D9D] text-[12px] font-[400] ">
                    Upload Logo Image here{" "}
                  </h4>
                  <h4 className="text-[#9D9D9D] text-[10px] font-[400] ">
                    Recommended size 32px by 32px{" "}
                  </h4>
                </div>
              </div>
              //   <img
              //     className=""
              //     src="/onboarding/Icon.svg" // Default placeholder image
              //     alt="Default"
              //     width={100}
              //     height={100}
              //   />
            )}
          </div>
          <input
            type="file"
            accept="image/x-png,image/gif,image/jpeg"
            className="hidden mb-2 text-sm text-[#6C757D] font-medium"
            onChange={handleImageChange}
          />
        </label>
        {loading && <p><LoadingSpinner /></p>}
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
      } else {
        // toast.error("Failed to update settings.");
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

  // const handleImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     const file = e.target.files[0];
  //     const updatedBanners = [...banners];
  //     updatedBanners[index].image = file; // Save the file reference
  //     setBanners(updatedBanners);
  //   }
  // };

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

  return (
    <div className="bg-white rounded-[14px] p-6 shadow-lg">
      <h4 className="text-[#000000] text-[18px] font-bold pb-4">
        Update Site Settings
      </h4>

      <div>
        {/* Theme Color */}
        <div className="mb-4">
          <label className="block font-semibold">Theme Color:</label>
          <input
            type="color"
            value={themeColor}
            onChange={(e) => setThemeColor(e.target.value)}
            className="w-full h-10 border rounded-md"
          />
        </div>

        {/* Welcome Text */}
        <div className="mb-4">
          <label className="block font-semibold">Welcome Text:</label>
          <input
            type="text"
            value={welcomeText}
            onChange={(e) => setWelcomeText(e.target.value)}
            className="w-full h-12 border rounded-md p-2"
          />
        </div>

        {/* Banner Section */}
        <div>
          <h4 className="text-lg font-bold mb-2">Banners:</h4>
          {banners.map((banner: any, index: any) => (
            <div key={index} className="border p-4 rounded-lg mb-4">
              {/* Banner Image */}
              <label className="block font-semibold">Banner Image:</label>
              <ImageUpload image={image} setImage={setImage} />

              {/* Title */}
              <label className="block font-semibold">Title:</label>
              <input
                type="text"
                value={banner.title}
                onChange={(e) =>
                  handleBannerChange(index, "title", e.target.value)
                }
                className="w-full h-10 border rounded-md p-2 mb-2"
              />

              {/* Description */}
              <label className="block font-semibold">Description:</label>
              <textarea
                value={banner.description}
                onChange={(e) =>
                  handleBannerChange(index, "description", e.target.value)
                }
                className="w-full h-16 border rounded-md p-2 mb-2"
              />

              {/* CTA Text */}
              <label className="block font-semibold">CTA Text:</label>
              <input
                type="text"
                value={banner.cta_text}
                onChange={(e) =>
                  handleBannerChange(index, "cta_text", e.target.value)
                }
                className="w-full h-10 border rounded-md p-2 mb-2"
              />

              {/* CTA Link */}
              <label className="block font-semibold">CTA Link:</label>
              <input
                type="text"
                value={banner.cta_link}
                onChange={(e) =>
                  handleBannerChange(index, "cta_link", e.target.value)
                }
                className="w-full h-10 border rounded-md p-2 mb-2"
              />

              {/* Remove Button */}
              {banners.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveBanner(index)}
                  className="bg-red-500 text-white py-1 px-3 rounded-md"
                >
                  Remove Banner
                </button>
              )}
            </div>
          ))}

          {/* Add Banner Button */}
          <button
            type="button"
            onClick={handleAddBanner}
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Add Banner
          </button>
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
