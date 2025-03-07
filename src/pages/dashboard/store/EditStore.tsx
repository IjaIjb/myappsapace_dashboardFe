import React, { useState } from "react";
import DashboardLayout from "../../../components/DashboardLayout";
import { UserApis } from "../../../apis/userApi/userApi";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import { FaArrowRight } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

 interface ImageUploadProps {
   image: string | undefined; // URL of the uploaded image
   setImage: (image: string | undefined) => void; // Updates the image URL
 }

const EditStore = () => {
  const params = useParams();
  const [storeId, setStoreId] = useState("");
  const [image, setImage] = useState<any>(undefined);
  const [storeData, setStoreData] = useState({
    store_name: "",
    domain_name: "",
    store_abbreviation: "",
    industry_type: "",
    product_type: "",
    store_description: "",
    store_location: "",
    store_logo: "",
  });

  React.useEffect(() => {
    UserApis.getSingleStore(params?.id).then((response) => {
      if (response?.data) {
        console.log(response.data.store);
        setStoreData(response?.data?.store);
        setStoreId(response?.data?.store?.id);
      }
    });
  }, [params?.id]);

  console.log(storeData);
  // const [storeLogo, setStoreLogo] = useState<File | null>(null); // Store file here
  const [loader, setLoader] = useState(false);
  const [logoLoader, setLogoLoader] = useState(false); // Separate loader for logo
  const navigate = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setStoreData((prev) => ({ ...prev, [name]: value }));
  };

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
                  ) :  storeData?.store_logo ? (
                    <img src={storeData.store_logo} alt="Store logo" width={100} height={100} />
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
  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setStoreLogo(file); // Save the file
  //   }
  // };

  console.log(storeId)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);

    // Construct JSON payload
    const payload: Record<string, any> = {
      store_name: storeData.store_name,
      // domain_name: storeData.domain_name ? storeData.domain_name : "",
      store_abbreviation: storeData.store_abbreviation || "",
      industry_type: storeData.industry_type,
      product_type: storeData.product_type,
      store_description: storeData.store_description,
      store_location: storeData.store_location,
      id: storeId,
    };

    // Handle file upload separately if storeLogo exists
    // if (storeLogo) {
    //   const base64Logo = await toBase64(storeLogo);
    //   payload.store_logo = base64Logo; // Attach the file as a base64 string
    // }

    try {
      console.log("Submitting payload:", payload);

      const response: any = await UserApis.updateStore(storeId, payload); // Send JSON payload
      console.log(response);

      if (response?.status === 200 || response?.status === 201) {
        toast.success(response?.data?.message || "Store updated successfully!");
        navigate("/dashboard/store");
      } else {
        toast.error(response?.data?.message || "Failed to update store.");
      }
    } catch (error) {
      console.error("Error updating store:", error);
      toast.error("An error occurred while updating the store.");
    } finally {
      setLoader(false);
    }
  };

  const handleLogoUpload = async () => {
    if (!image) {
      toast.error("Please select a logo to upload.");
      return;
    }

    setLogoLoader(true);

    
    try {
      const formData = new FormData();
      formData.append("store_logo", image);
      // formData.append("store_id", storeId);

      console.log("Uploading logo...");
      const response = await UserApis.updateStoreLogo(storeId, formData);

      if (response?.status === 200 || response?.status === 201) {
        toast.success(response?.data?.message || "Logo updated successfully!");
        setStoreData((prev) => ({ ...prev, store_logo: response?.data?.store_logo }));
      } else {
        toast.error(response?.data?.message || "Failed to update logo.");
      }
    } catch (error) {
      console.error("Error uploading logo:", error);
      toast.error("An error occurred while uploading the logo.");
    } finally {
      setLogoLoader(false);
    }
  };


  // Function to convert file to base64
  // const toBase64 = (file: File): Promise<string> => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result as string);
  //     reader.onerror = (error) => reject(error);
  //   });
  // };

  return (
    <DashboardLayout>
      <div className="pt-10 px-5">
        <h5 className="text-[#000000] text-[16px] font-[600]">
          Business Information
        </h5>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col max-w-[570px] mt-5 gap-3"
        >
          {/* Add Logo */}
          <div>
            <label className="text-[#2B2C2B] text-[12px] font-[400]">Add Logo</label>
            <ImageUpload image={image} setImage={setImage} />
            {/* <div className="flex justify-center text-center">
              <label className="flex w-full bg-[#FBFBFF] border border-[#D8D8E2] flex-col items-center justify-center rounded-[5px] cursor-pointer relative">
                <div className="flex flex-col items-center justify-center h-[140px]">
                  {storeLogo ? (
                    <img src={URL.createObjectURL(storeLogo)} alt="Uploaded logo" width={100} height={100} />
                  ) : storeData?.store_logo ? (
                    <img src={storeData.store_logo} alt="Store logo" width={100} height={100} />
                  ) : (
                    <div className="flex flex-col">
                      <h4 className="text-[#9D9D9D] text-[12px] font-[400]">
                        Upload Logo Image here
                      </h4>
                      <h4 className="text-[#9D9D9D] text-[10px] font-[400]">
                        Recommended size 32px by 32px
                      </h4>
                    </div>
                  )}
                </div>
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
            </div> */}
            <button
              type="button"
              disabled={logoLoader}
              onClick={handleLogoUpload}
              className="bg-blue-600 text-white py-2 px-4 mt-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
              {logoLoader ? <LoadingSpinner /> : "Upload Logo"}
            </button>
          </div>

          {/* Store Name */}
          <div>
            <label
              htmlFor="store_name"
              className="text-[#2B2C2B] text-[12px] font-[400]"
            >
              Store Name
            </label>
            <input
              type="text"
              name="store_name"
              value={storeData.store_name}
              onChange={handleInputChange}
              className="block w-full mt-1 border px-3 py-2 rounded"
              placeholder="Enter store name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="domain_name"
              className="text-[#2B2C2B] text-[12px] font-[400]"
            >
              Domain Name
            </label>
            <input
              type="text"
              name="domain_name"
              value={storeData.domain_name ? storeData.domain_name : ""}
              onChange={handleInputChange}
              className="block w-full mt-1 border px-3 py-2 rounded"
              placeholder="Enter domain name"
              required
            />
          </div>
          {/* Store Abbreviation */}
          <div>
            <label
              htmlFor="store_abbreviation"
              className="text-[#2B2C2B] text-[12px] font-[400]"
            >
              Store Abbreviation
            </label>
            <input
              type="text"
              name="store_abbreviation"
              value={storeData.store_abbreviation}
              onChange={handleInputChange}
              className="block w-full mt-1 border px-3 py-2 rounded"
              placeholder="Enter abbreviation"
              required
            />
          </div>

          {/* Industry Type */}
          <div>
            <label
              htmlFor="industry_type"
              className="text-[#2B2C2B] text-[12px] font-[400]"
            >
              Industry Type
            </label>
            <input
              type="text"
              name="industry_type"
              value={storeData.industry_type}
              onChange={handleInputChange}
              className="block w-full mt-1 border px-3 py-2 rounded"
              placeholder="E.g., Retail, Fashion"
              required
            />
          </div>

          {/* Product Type */}
          <div>
            <label
              htmlFor="product_type"
              className="text-[#2B2C2B] text-[12px] font-[400]"
            >
              Product Type
            </label>
            <input
              type="text"
              name="product_type"
              value={storeData.product_type}
              onChange={handleInputChange}
              className="block w-full mt-1 border px-3 py-2 rounded"
              placeholder="Physical, Digital, Both"
              required
            />
          </div>

          {/* Store Location */}
          <div>
            <label
              htmlFor="store_location"
              className="text-[#2B2C2B] text-[12px] font-[400]"
            >
              Business Location
            </label>
            <input
              type="text"
              name="store_location"
              value={storeData.store_location}
              onChange={handleInputChange}
              className="block w-full mt-1 border px-3 py-2 rounded"
              placeholder="Enter business location"
              required
            />
          </div>

          {/* Store Description */}
          <div>
            <label
              htmlFor="store_description"
              className="text-[#2B2C2B] text-[12px] font-[400]"
            >
              Business Description
            </label>
            <textarea
              name="store_description"
              value={storeData.store_description}
              onChange={handleInputChange}
              className="block w-full mt-1 border px-3 py-2 rounded"
              rows={4}
              placeholder="Enter a short description"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end items-end h-full">
            <button
              type="submit"
              disabled={loader}
              className="bg-secondary text-white py-2 px-4 rounded hover:bg-green-700 disabled:bg-gray-400"
            >
              {loader ? <LoadingSpinner /> : "Proceed"}
              {!loader && <FaArrowRight />}
            </button>
          </div>
        </form>
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

export default EditStore;
