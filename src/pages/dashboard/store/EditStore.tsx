import React, { useState, useEffect } from "react";
import DashboardLayout from "../../../components/DashboardLayout";
import { UserApis } from "../../../apis/userApi/userApi";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import { FaArrowRight } from "react-icons/fa";
import { BsClipboardData } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authService } from "../../../apis/live/login";
import StoreQuestionnaire from './StoreQuestionnaire';

interface ImageUploadProps {
  image: string | undefined; // URL of the uploaded image for preview
  setImage: (image: string | undefined) => void; // Updates the image URL
  onFileChange: (file: File | null) => void; // Function to pass the actual file back
}

const EditStore = () => {
  // Get the store name from URL path and ID from query parameter
  const { storeName } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const storeIdFromQuery = queryParams.get('id');
  
  const [storeId, setStoreId] = useState(storeIdFromQuery || "");
  const [image, setImage] = useState<string | undefined>(undefined);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [storeData, setStoreData] = useState({
    store_name: "",
    store_abbreviation: "",
    industry_type: "",
    product_type: "",
    store_description: "",
    store_location: "",
    store_logo: "",
    store_code: "", // Added store_code for questionnaire
  });
  const [loader, setLoader] = useState(false);
  const [logoLoader, setLogoLoader] = useState(false);
  const [activeTab, setActiveTab] = useState("basic-info");
  const [questionnaireExists, setQuestionnaireExists] = useState(false);
  const [questionnaireLoading, setQuestionnaireLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch store data when component mounts
  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        if (!storeId) {
          toast.error("Store ID is missing");
          return;
        }
        
        const response = await UserApis.getSingleStore(storeId);
        if (response?.data) {
          setStoreData(response.data.store);
          // Set the existing logo URL for preview
          if (response.data.store.store_logo) {
            setImage(response.data.store.store_logo);
          }
          
          // Check if this store has existing questionnaire
          if (response.data.store.store_code) {
            checkQuestionnaireExists(response.data.store.store_code);
          }
        }
      } catch (error) {
        console.error("Error fetching store data:", error);
        toast.error("Failed to load store data");
      }
    };

    if (storeId) {
      fetchStoreData();
    }
  }, [storeId]);

  // Check if questionnaire exists for this store
  const checkQuestionnaireExists = async (storeCode: string) => {
    setQuestionnaireLoading(true);
    try {
      // Assuming there's an API to check if questionnaire exists
      const response = await UserApis.getSingleKycStoreQuestionaire(storeCode);
      setQuestionnaireExists(!!response?.data?.questionnaire);
      console.log(response.data)
    } catch (error) {
      console.error("Error checking questionnaire:", error);
      // If API doesn't exist yet, you can remove this or handle differently
    } finally {
      setQuestionnaireLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setStoreData((prev) => ({ ...prev, [name]: value }));
  };

  // Image upload component with file handling
  const ImageUpload: React.FC<ImageUploadProps> = ({ image, setImage, onFileChange }) => {
    const [loading, setLoading] = useState(false);

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        // Check if the file is an image
        if (!file.type.match('image.*')) {
          toast.error("Please select an image file (JPEG, PNG, JPG, GIF)");
          return;
        }

        // Store the actual file for backend upload
        onFileChange(file);
        setLoading(true);

        try {
          // Create a preview URL for the UI
          const reader = new FileReader();
          reader.onload = (event) => {
            if (event.target?.result) {
              setImage(event.target.result as string);
            }
          };
          reader.readAsDataURL(file);
          
          setLoading(false);
        } catch (error) {
          console.error("Error processing image", error);
          toast.error("Error processing image. Please try again.");
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
                src={image}
                alt="Uploaded logo"
                width={100}
                height={100}
                className="max-h-[70px] object-contain"
              />
            ) : (
              <div className="flex justify-center items-center">
                <div className="flex flex-col">
                  <h4 className="text-[#9D9D9D] text-[12px] font-[400]">
                    Upload Logo Image here
                  </h4>
                  <h4 className="text-[#9D9D9D] text-[10px] font-[400]">
                    Recommended size 32px by 32px
                  </h4>
                </div>
              </div>
            )}
          </div>
          <input
            type="file"
            accept="image/jpeg,image/png,image/jpg,image/gif"
            className="hidden mb-2 text-sm text-[#6C757D] font-medium"
            onChange={handleImageChange}
          />
        </label>
        {loading && <p><LoadingSpinner /></p>}
      </div>
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);

    if (!storeId) {
      toast.error("Store ID is missing");
      setLoader(false);
      return;
    }

    // Construct JSON payload for store data
    const payload: Record<string, any> = {
      store_name: storeData.store_name,
      industry_type: storeData.industry_type,
      product_type: storeData.product_type,
      store_description: storeData.store_description,
      store_location: storeData.store_location,
      id: storeId,
    };

    try {
      const response:any = await authService.updateSite(storeId, payload);

      if (response?.status === 200 || response?.status === 201) {
        toast.success(response?.data?.message || "Site updated successfully!");
        
        // If coming from questionnaire tab, don't navigate away
        if (activeTab !== "questionnaire") {
          navigate("/dashboard/site");
        }
      } else {
        toast.error(response?.data?.message || "Failed to update Site.");
      }
    } catch (error) {
      console.error("Error updating Site:", error);
      toast.error("An error occurred while updating the Site.");
    } finally {
      setLoader(false);
    }
  };

  const handleLogoUpload = async () => {
    if (!logoFile) {
      toast.error("Please select a logo image to upload.");
      return;
    }

    if (!storeId) {
      toast.error("Store ID is missing");
      return;
    }
  
    setLogoLoader(true);
  
    try {
      // Create a new FormData instance
      const formData:any = new FormData();
      
      // Explicitly set name and content type
      formData.append("store_logo", logoFile, logoFile.name);
      
      console.log("File details:", {
        name: logoFile.name,
        type: logoFile.type,
        size: logoFile.size
      });
      
      // Log each entry to verify content
      for (let pair of formData.entries()) {
        console.log("FormData entry:", pair[0], 
          pair[1] instanceof File ? 
          `File: ${(pair[1] as File).name}, type: ${(pair[1] as File).type}, size: ${(pair[1] as File).size}` : 
          pair[1]);
      }
  
      // Call your API with the correct Content-Type header
      const response = await UserApis.updateStoreLogo(storeId, formData);
  
      if (response?.status === 200 || response?.status === 201) {
        toast.success(response?.data?.message || "Logo updated successfully!");
        
        if (response?.data?.store_logo) {
          setStoreData((prev) => ({ ...prev, store_logo: response.data.store_logo }));
          setImage(response.data.store_logo);
        }
      } else {
        toast.error(response?.data?.message || "Failed to update logo.");
      }
    } catch (error: any) {
      console.error("Error uploading logo:", error);
      
      if (error.response?.data?.errors?.store_logo) {
        const errorMsg = error.response.data.errors.store_logo.join(', ');
        toast.error(`Logo upload failed: ${errorMsg}`);
      } else {
        toast.error("An error occurred while uploading the logo.");
      }
    } finally {
      setLogoLoader(false);
    }
  };

  const onQuestionnaireComplete = () => {
    setQuestionnaireExists(true);
    toast.success("Questionnaire saved successfully!");
  };

  return (
    <DashboardLayout>
      <div className="pt-6 px-5">
        <h4 className="text-[#000000] text-[20px] font-[600] mb-6">
          {storeName && `${decodeURIComponent(storeName)}`} - Site Management
        </h4>
        
        {/* Tab Navigation */}
        <div className="mb-6 border-b">
          <div className="flex space-x-1">
            <button 
              onClick={() => setActiveTab("basic-info")} 
              className={`py-2 px-4 font-medium text-sm transition-colors duration-150 ${
                activeTab === "basic-info" 
                  ? "border-b-2 border-indigo-600 text-indigo-600" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Basic Information
            </button>
            <button 
              onClick={() => setActiveTab("questionnaire")} 
              className={`py-2 px-4 font-medium text-sm transition-colors duration-150 flex items-center gap-2 ${
                activeTab === "questionnaire" 
                  ? "border-b-2 border-indigo-600 text-indigo-600" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <BsClipboardData />
              Questionnaire
              {questionnaireExists && (
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              )}
            </button>
          </div>
        </div>
        
        {activeTab === "basic-info" ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col max-w-[570px] gap-3"
          >
            {/* Add Logo */}
            <div>
              <label className="text-[#2B2C2B] text-[12px] font-[400]">Add Logo</label>
              <ImageUpload 
                image={image} 
                setImage={setImage} 
                onFileChange={(file) => setLogoFile(file)} 
              />
              <button
                type="button"
                disabled={logoLoader || !logoFile}
                onClick={handleLogoUpload}
                className={`${
                  logoLoader || !logoFile 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white py-2 px-4 mt-2 rounded transition-colors`}
              >
                {logoLoader ? <LoadingSpinner /> : "Upload Logo"}
              </button>
              {!logoFile && image && 
                <p className="text-xs text-gray-500 mt-1">Click on the image area to select a new logo</p>
              }
            </div>

            {/* Store Name */}
            <div>
              <label
                htmlFor="store_name"
                className="text-[#2B2C2B] text-[12px] font-[400]"
              >
                Site Name
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
            
            {/* Store Abbreviation */}
            <div>
              <label
                htmlFor="store_abbreviation"
                className="text-[#2B2C2B] text-[12px] font-[400]"
              >
                Site Abbreviation
              </label>
              <input
                type="text"
                name="store_abbreviation"
                value={storeData.store_abbreviation}
                onChange={handleInputChange}
                className="block bg-white w-full mt-1 border px-3 py-2 rounded"
                placeholder="Enter abbreviation"
                disabled
              />
            </div>

            {/* Industry Type - Updated to Dropdown */}
            <div>
              <label
                htmlFor="industry_type"
                className="text-[#2B2C2B] text-[12px] font-[400]"
              >
                Industry Type
              </label>
              <select
                name="industry_type"
                value={storeData.industry_type}
                onChange={handleInputChange}
                className="block w-full mt-1 border px-3 py-2 rounded"
                required
              >
                <option value="">Select Industry Type</option>
                <option value="Retail">Retail</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Fashion">Fashion</option>
                <option value="Technology">Technology</option>
                <option value="Food & Beverage">Food & Beverage</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Finance">Finance</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Travel & Tourism">Travel & Tourism</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Automotive">Automotive</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Art & Design">Art & Design</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Product Type - Updated to Dropdown */}
            <div>
              <label
                htmlFor="product_type"
                className="text-[#2B2C2B] text-[12px] font-[400]"
              >
                Product Type
              </label>
              <select
                name="product_type"
                value={storeData.product_type}
                onChange={handleInputChange}
                className="block w-full mt-1 border px-3 py-2 rounded"
                required
              >
                <option value="">Select Product Type</option>
                <option value="Physical">Physical</option>
                <option value="Digital">Digital</option>
                <option value="Service">Service</option>
                <option value="Online">Online</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Subscription">Subscription</option>
                <option value="Customizable">Customizable</option>
                <option value="Other">Other</option>
              </select>
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
            <div className="flex justify-end items-end h-full mt-4">
              <button
                type="submit"
                disabled={loader}
                className={`flex items-center gap-2 ${
                  loader 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-secondary hover:bg-green-700'
                } text-white py-2 px-4 rounded transition-colors`}
              >
                {loader ? <LoadingSpinner /> : (
                  <>
                    Save Changes
                    <FaArrowRight />
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border p-5">
            {questionnaireLoading ? (
              <div className="flex justify-center items-center py-10">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-700"></div>
              </div>
            ) : storeData.store_code ? (
              <div>
                <div className="mb-4">
                  <h5 className="text-lg font-medium text-gray-800">
                    {questionnaireExists ? 'Edit Site Questionnaire' : 'Create Site Questionnaire'}
                  </h5>
                  <p className="text-sm text-gray-500 mt-1">
                    {questionnaireExists 
                      ? 'Update your existing questionnaire to better understand your site requirements.' 
                      : 'Complete this questionnaire to help us understand your site requirements better.'}
                  </p>
                </div>
                
                <StoreQuestionnaire 
                  storeCode={storeData.store_code} 
                  onComplete={onQuestionnaireComplete}
                  isModal={false}
                  questionnaireExists={questionnaireExists}
                />
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Please save basic site information first to create a questionnaire.
              </div>
            )}
          </div>
        )}
        
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