import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { UserApis } from "../../../../apis/userApi/userApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../../../../components/UI/LoadingSpinner";

interface ImageUploadProps {
  image: string | null; // URL of the uploaded image
  setImage: (image: string | null) => void; // Updates the image URL
}
const LogoSettings = () => {
  const selectedStore = useSelector(
    (state: RootState) => state.globalState?.selectedStore || null
  );
  const [loading, setLoading] = useState(false);

  const sectionName = "logo";
  const [image, setImage] = useState<any>(null);
  // const [data, setData] = useState<any>([]);

  // Fetch settings from the API
  useEffect(() => {
    if (!selectedStore) return;

    setLoading(true);
    UserApis.getStoreSettings(selectedStore, sectionName)
      .then((response) => {
        if (response?.data?.settings) {
          console.log(response?.data?.settings);
          setImage(response?.data?.settings?.settings?.logo);
        }
      })
      .catch(() => {
        toast.error("Failed to load store settings.");
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
            logo: image,
          },
        }
      );
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
      <h4 className="text-[#000000] text-[18px] font-bold pb-4">Update Logo</h4>

      <div>
        {/* Banner Section */}
        <div>
          <ImageUpload image={image} setImage={setImage} />
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

export default LogoSettings;
