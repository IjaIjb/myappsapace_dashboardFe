import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AnimatePresence, motion } from "framer-motion";
import { authService } from "../../apis/live/login";

const images = [
  "/images/auth/authImage1.svg",
  "/images/auth/authImage2.svg",
  "/images/auth/authImage3.svg",
];



const AddSite = () => {
  const [index, setIndex] = useState(0);
  const [formValues, setFormValues] = useState({
    store_name: "",
    store_abbreviation: "",
    industry_type: "",
    product_type: "",
    store_description: "", // optional
    store_location: "", // optional
  });
 
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  
    const [storeLogo, setStoreLogo] = useState<File | null>(null);
    const [loader, setLoader] = useState(false);
  
    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target;
      setFormValues((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setStoreLogo(file);
      }
    };
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoader(true);
  
      const formData = new FormData();
      if (storeLogo) {
        formData.append("store_logo", storeLogo);
      }
      
      // Required fields
      formData.append("store_name", formValues.store_name);
      formData.append("store_abbreviation", formValues.store_abbreviation);
      formData.append("industry_type", formValues.industry_type);
      formData.append("product_type", formValues.product_type);
      
      // Optional fields - only add if they have values
      if (formValues.store_description) {
        formData.append("store_description", formValues.store_description);
      }
      
      if (formValues.store_location) {
        formData.append("store_location", formValues.store_location);
      }
  
      try {
        const response: any = await authService.createSite(formData);
        if (response?.data) {
          // console.log(response.data)
          toast.success(response?.data?.message);
          navigate("/auth/kyc");
          localStorage.setItem('storeCode', response.data.store.store_code);

        } else {
          toast.error(response || "Failed to create Site.");
        }
      } catch (error:any) {
        console.error("Error creating Site:", error);
        toast.error(error?.response?.data?.message || "An error occurred while creating the Site.");
      } finally {
        setLoader(false);
      }
    };
    
  // const handleChange = (e: any) => {
  //   const { name, value } = e.target;
  //   setFormData((prev: any) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // const handleImageChange = (e:any) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setImage(file);
  //     setPreview(URL.createObjectURL(file));
  //   }
  // };

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     const form = new FormData();
  //     if (image) form.append("store_logo", image);

  //     // Append form data - only the fields present in the new payload sample
  //     Object.keys(formData).forEach((key: string) => {
  //       form.append(key, formData[key]);
  //     });

  //     // Keep the same API call - payload format stays the same
  //     const response = await UserApis.createStore(form);
  //     if (response?.status === 200 || response.status === 201) {
  //       toast.success("Site created successfully!");
  //       navigate("/dashboard/home");
  //     } else {
  //       toast.error("Failed to create site. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error creating site:", error);
  //     toast.error("An error occurred while creating the site.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSkip = () => {
    toast.success("Logged in Successfully");
    localStorage.removeItem("selectedStore"); // Keep the original key name
    navigate("/dashboard/home");
  };

  // const isRequiredField = (fieldName: string) => {
  //   return !fieldName.includes("description") && !fieldName.includes("location");
  // };

  return (
    <div className="p-8">
      <div className="grid lg:grid-cols-2">
        <div className="h-full lg:block hidden relative overflow-hidden">
          <AnimatePresence>
            <motion.img
              key={images[index]}
              src={images[index]}
              alt="Auth Image"
              className="h-full absolute top-0 left-0"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 1 }}
            />
          </AnimatePresence>
        </div>
        <div className="pt-10 lg:px-5">
         
        <h5 className="text-gray-900 text-xl font-semibold mb-6 border-b pb-3">
          Business Information
        </h5>
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto"
        >
          {/* Add Logo */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Add Logo <span className="text-red-500">*</span>
            </label>
            <div className="flex justify-center text-center">
              <label className="flex w-full bg-gray-50 border border-gray-200 flex-col items-center justify-center rounded-lg cursor-pointer hover:bg-gray-100 transition duration-300">
                <div className="flex flex-col items-center justify-center h-40 w-full">
                  {storeLogo ? (
                    <div className="flex flex-col items-center">
                      <img
                        src={URL.createObjectURL(storeLogo)}
                        alt="Uploaded logo"
                        className="w-24 h-24 object-contain mb-2"
                      />
                      <p className="text-sm text-gray-500">Click to change</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-sm font-medium text-gray-600">Upload Logo Image</p>
                      <p className="text-xs text-gray-500 mt-1">Recommended size 32px by 32px</p>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/x-png,image/gif,image/jpeg"
                  className="hidden"
                  onChange={handleImageChange}
                  required
                />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Store Name */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Site Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="store_name"
                value={formValues.store_name}
                onChange={handleInputChange}
                placeholder=""
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                required
              />
            </div>

            {/* Store Abbreviation */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Site Abbreviation <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="store_abbreviation"
                value={formValues.store_abbreviation}
                onChange={handleInputChange}
                placeholder=""
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                required
              />
            </div>

            {/* Industry Type - Updated Dropdown */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Industry Type <span className="text-red-500">*</span>
              </label>
              <select
                name="industry_type"
                value={formValues.industry_type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                required
              >
                <option value="">Select Industry Type</option>
                <option value="Agriculture & Farming">Agriculture & Farming</option>
                <option value="Food & Beverage">Food & Beverage</option>
                <option value="Fashion & Apparel">Fashion & Apparel</option>
                <option value="Beauty & Personal Care">Beauty & Personal Care</option>
                <option value="Health & Wellness">Health & Wellness</option>
                <option value="Education & Training">Education & Training</option>
                <option value="Technology & Software">Technology & Software</option>
                <option value="Retail & E-Commerce">Retail & E-Commerce</option>
                <option value="Manufacturing & Industrial">Manufacturing & Industrial</option>
                <option value="Transportation & Logistics">Transportation & Logistics</option>
                <option value="Finance & Fintech">Finance & Fintech</option>
                <option value="Real Estate & Property">Real Estate & Property</option>
                <option value="Art & Craft">Art & Craft</option>
                <option value="Automotive">Automotive</option>
                <option value="Construction & Engineering">Construction & Engineering</option>
                <option value="Hospitality & Tourism">Hospitality & Tourism</option>
                <option value="Media & Entertainment">Media & Entertainment</option>
                <option value="Home & Living">Home & Living</option>
                <option value="Legal & Consulting Services">Legal & Consulting Services</option>
                <option value="Events & Rentals">Events & Rentals</option>
                <option value="Sports & Fitness">Sports & Fitness</option>
                <option value="Energy & Environment">Energy & Environment</option>
                <option value="Telecommunications">Telecommunications</option>
                <option value="Nonprofit & NGOs">Nonprofit & NGOs</option>
                <option value="Publishing & Printing">Publishing & Printing</option>
                <option value="Others">Others</option>
              </select>
            </div>

            {/* Product Type - Updated to Dropdown */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Product Type <span className="text-red-500">*</span>
              </label>
              <select
                name="product_type"
                value={formValues.product_type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                required
              >
                <option value="">Select Product Type</option>
                <option value="Physical">Physical</option>
                <option value="Digital">Digital</option>
                <option value="Service">Service</option>
                <option value="Online">Online</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            {/* Store Description (Optional) */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Store Description
                <span className="text-gray-400 text-xs ml-1">(optional)</span>
              </label>
              <textarea
                name="store_description"
                value={formValues.store_description}
                onChange={handleInputChange}
                placeholder=""
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                rows={3}
              />
            </div>

            {/* Store Location (Optional) */}
            <div className="mb-8">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Business Location
                <span className="text-gray-400 text-xs ml-1">(optional)</span>
              </label>
              <input
                type="text"
                name="store_location"
                value={formValues.store_location}
                onChange={handleInputChange}
                placeholder=""
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-between items-center h-full">
           <div
           onClick={handleSkip}
               // to="/dashboard/home"       
               className=" flex gap-2 items-center py-2 w-fit px-10 bg-gray-400 text-white rounded-full hover:bg-secondary/[70%]"
             >
           Skip
             </div>
             <button
               type="submit"
               disabled={loader}
               className="disabled:bg-gray-500 flex gap-2 items-center py-2 w-fit px-6 bg-secondary text-white rounded-full hover:bg-secondary/[70%]"
             >
               {loader ? <LoadingSpinner /> : "Proceed"}
               {!loader && <FaArrowRight />}
             </button>
           </div>
        </form>
         
          {/* <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-[570px]">
            <label className="text-sm font-medium">Add Logo</label>
            <div className="flex justify-center text-center">
              <label className="flex w-full bg-[#FBFBFF] border border-[#D8D8E2] flex-col items-center justify-center rounded-[5px] cursor-pointer relative">
                <div className="flex flex-col items-center justify-center h-[85px]">
                  {preview ? (
                    <img src={preview} alt="Uploaded logo" width={100} height={100} />
                  ) : (
                    <div className="flex flex-col">
                      <h4 className="text-[#9D9D9D] text-[12px] font-[400]">Upload Logo Image here</h4>
                      <h4 className="text-[#9D9D9D] text-[10px] font-[400]">Recommended size 32px by 32px</h4>
                    </div>
                  )}
                </div>
                <input type="file" accept="image/png, image/jpeg" className="hidden" onChange={handleImageChange} />
              </label>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {Object.keys(formData).map((key) => (
                <div key={key}>
                  <label className="text-[#2B2C2B] text-[12px] font-[400]">
                    {fieldLabels[key as keyof typeof fieldLabels] || key.replace("_", " ")}
                  </label>
                  <input
                    type="text"
                    name={key}
                    value={formData[key as keyof typeof formData]}
                    onChange={handleChange}
                    className="mt-1 block w-full h-[40px] border-[0.5px] pl-3 rounded-[5px] focus:outline-none text-sm bg-[#FBFBFF] border-[#D8D8E2]"
                    placeholder={fieldPlaceholders[key as keyof typeof fieldPlaceholders] || ""}
                    required={isRequiredField(key)}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center h-full mt-8">
              <div
                onClick={handleSkip}
                className="flex gap-2 items-center py-2 w-fit px-10 bg-gray-400 text-white rounded-full hover:bg-gray-500 cursor-pointer transition-colors"
              >
                Skip
              </div>
              <button
                type="submit"
                disabled={loading}
                className="disabled:bg-gray-500 flex gap-2 items-center py-2 w-fit px-6 bg-secondary text-white rounded-full hover:bg-secondary/[70%] transition-colors"
              >
                {loading ? <LoadingSpinner /> : "Proceed"}
                {!loading && <FaArrowRight />}
              </button>
            </div>
          </form> */}
        </div>
      </div>
      <ToastContainer 
        position="top-right" 
        autoClose={2000} 
        hideProgressBar 
        newestOnTop 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
    </div>
  );
};

export default AddSite;



// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaArrowRight } from "react-icons/fa";
// import LoadingSpinner from "../../components/UI/LoadingSpinner";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { AnimatePresence, motion } from "framer-motion";
// import { UserApis } from "../../apis/userApi/userApi";

// const images = [
//   "/images/auth/authImage1.svg",
//   "/images/auth/authImage2.svg",
//   "/images/auth/authImage3.svg",
// ];

// const AddStore = () => {
//   const [index, setIndex] = useState(0);
//   const [image, setImage] = useState<string | null>(null); 
//    const [preview, setPreview] = useState("");
//    const [formData, setFormData] = useState<any>({
//     store_name: "",
//     domain_name: "",
//     store_abbreviation: "",
//     industry_type: "",
//     product_type: "",
//     store_description: "",
//     store_location: "",
//     already_have_domain: false, // Added field
//   });
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleChange = (e: any) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev: any) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleImageChange = (e:any) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   const file:any = e.target.files?.[0];
//   //   if (file) {
//   //     setImage(file); // Store the file object directly
//   //   }
//   // };
  

//   // const handleSubmit = async (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   setLoading(true);
//   //   try {
//   //     console.log("Submitting store details:", { ...formData, store_logo: image });
//   //     toast.success("Store created successfully!");
//   //     navigate("/auth/choose-profession");
//   //   } catch (error) {
//   //     toast.error("An error occurred while creating the store.");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const form = new FormData();
//       if (image) form.append("store_logo", image);

//       // Append form data
//       Object.keys(formData).forEach((key: any) => {
//         if (key === "already_have_domain") {
//           form.append(key, formData[key] ? "1" : "0"); // Convert boolean to 1 or 0
//         } else if (key === "domain_name" && !formData.already_have_domain) {
//           return; // Skip adding domain_name if already_have_domain is false
//         } else {
//           form.append(key, formData[key]);
//         }
//       });

//       const response = await UserApis.createStore(form);
//       if (response?.status === 200 || response.status === 201) {
//         toast.success("Site created successfully!");
//         navigate("/auth/choose-profession");
//       } else {
//         toast.error("Failed to create site. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error creating site:", error);
//       toast.error("An error occurred while creating the site.");
//     } finally {
//       setLoading(false);
//     }
//   };


//   const handleSkip = () => {
//   toast.success("Logged in Succesfully");
//     localStorage.removeItem("selectedStore"); // Remove selected store if needed

//     navigate("/dashboard/home"); // Redirect to login page
//   };
//   return (
//     <div className="p-8">
//     <div className="grid lg:grid-cols-2">
//       <div className="h-screen lg:block hidden relative overflow-hidden">
//         <AnimatePresence>
//           <motion.img
//             key={images[index]}
//             src={images[index]}
//             alt="Auth Image"
//             className="h-screen absolute top-0 left-0"
//             initial={{ opacity: 0, scale: 1.1 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 1.1 }}
//             transition={{ duration: 1 }}
//           />
//         </AnimatePresence>
//       </div>
//       <div className="lg:block flex pt-10 px-5">
//         <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-[570px]">
//           <label className="text-sm font-medium">Add Logo</label>
//           <div className="flex justify-center text-center">
//             <label className="flex w-full bg-[#FBFBFF] border border-[#D8D8E2] flex-col items-center justify-center rounded-[5px] cursor-pointer relative">
//               <div className="flex flex-col items-center justify-center h-[85px]">
//                 {preview ? (
//                   <img src={preview} alt="Uploaded logo" width={100} height={100} />
//                 ) : (
//                   <div className="flex flex-col">
//                     <h4 className="text-[#9D9D9D] text-[12px] font-[400] ">Upload Logo Image here</h4>
//                     <h4 className="text-[#9D9D9D] text-[10px] font-[400] ">Recommended size 32px by 32px</h4>
//                   </div>
//                 )}
//               </div>
//               <input type="file" accept="image/png, image/jpeg" className="hidden" onChange={handleImageChange} />
//             </label>
//           </div>

//           <div className="grid grid-cols-2 gap-3">
//             {Object.keys(formData).map((key) => {
//               if (key === "already_have_domain") return null; // Skip rendering the checkbox here
//               if (key === "domain_name" && !formData.already_have_domain) return null; // Hide domain_name if not needed

//               return (
//                 <div key={key}>
//                   <label className="text-[#2B2C2B] capitalize text-[12px] font-[400] ">
//                     {key.replace("_", " ")}
//                   </label>
//                   <input
//                     type="text"
//                     name={key}
//                     value={formData[key as keyof typeof formData]}
//                     onChange={handleChange}
//                     className="mt-1 block w-full h-[40px] border-[0.5px] pl-3 rounded-[5px] focus:outline-none text-sm bg-[#FBFBFF] border-[#D8D8E2]"
//                     required
//                   />
//                 </div>
//               );
//             })}
//           </div>

//           {/* Toggle for "Already Have a Domain" */}
//           <div className="flex items-center space-x-3 mt-4">
//             <input
//               type="checkbox"
//               name="already_have_domain"
//               checked={formData.already_have_domain}
//               onChange={handleChange}
//               className="h-4 w-4"
//             />
//             <label className="text-sm font-medium">Already have a domain?</label>
//           </div>

//           <div className="flex justify-between items-center h-full">
//           <div
//           onClick={handleSkip}
//               // to="/dashboard/home"
         
//               className=" flex gap-2 items-center py-2 w-fit px-10 bg-gray-400 text-white rounded-full hover:bg-secondary/[70%]"
//             >
//           Skip
//             </div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="disabled:bg-gray-500 flex gap-2 items-center py-2 w-fit px-6 bg-secondary text-white rounded-full hover:bg-secondary/[70%]"
//             >
//               {loading ? <LoadingSpinner /> : "Proceed"}
//               {!loading && <FaArrowRight />}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//     <ToastContainer 
//     position="top-right" 
//     autoClose={2000} 
//     hideProgressBar 
//     newestOnTop 
//     closeOnClick 
//     rtl={false} 
//     pauseOnFocusLoss 
//     draggable 
//     pauseOnHover 
//     />
//   </div>
//   );
// };

// export default AddStore;

