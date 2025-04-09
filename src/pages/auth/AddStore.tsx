import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AnimatePresence, motion } from "framer-motion";
import { UserApis } from "../../apis/userApi/userApi";

const images = [
  "/images/auth/authImage1.svg",
  "/images/auth/authImage2.svg",
  "/images/auth/authImage3.svg",
];

// Field label mapping - changing "store" to "site" in UI only
const fieldLabels = {
  store_name: "Site Name",
  domain_name: "Domain Name",
  store_abbreviation: "Site Abbreviation",
  industry_type: "Industry Type",
  product_type: "Product Type",
  store_description: "Site Description",
  store_location: "Site Location"
};

const AddSite = () => {
  const [index, setIndex] = useState(0);
  const [image, setImage] = useState<string | null>(null); 
  const [preview, setPreview] = useState("");
  const [formData, setFormData] = useState<any>({
    store_name: "",
    domain_name: "",
    store_abbreviation: "",
    industry_type: "",
    product_type: "",
    store_description: "",
    store_location: "",
    already_have_domain: false,
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e:any) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      if (image) form.append("store_logo", image);

      // Append form data
      Object.keys(formData).forEach((key: any) => {
        if (key === "already_have_domain") {
          form.append(key, formData[key] ? "1" : "0"); // Convert boolean to 1 or 0
        } else if (key === "domain_name" && !formData.already_have_domain) {
          return; // Skip adding domain_name if already_have_domain is false
        } else {
          form.append(key, formData[key]);
        }
      });

      // Keep the same API call - payload format stays the same
      const response = await UserApis.createStore(form);
      if (response?.status === 200 || response.status === 201) {
        toast.success("Site created successfully!");
        navigate("/dashboard/home");
      } else {
        toast.error("Failed to create site. Please try again.");
      }
    } catch (error) {
      console.error("Error creating site:", error);
      toast.error("An error occurred while creating the site.");
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    toast.success("Logged in Successfully");
    localStorage.removeItem("selectedStore"); // Keep the original key name
    navigate("/dashboard/home");
  };

  return (
    <div className="p-8">
      <div className="grid lg:grid-cols-2">
        <div className="h-screen lg:block hidden relative overflow-hidden">
          <AnimatePresence>
            <motion.img
              key={images[index]}
              src={images[index]}
              alt="Auth Image"
              className="h-screen absolute top-0 left-0"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 1 }}
            />
          </AnimatePresence>
        </div>
        <div className="lg:block flex pt-10 lg:px-5">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-[570px]">
            <label className="text-sm font-medium">Add Logo</label>
            <div className="flex justify-center text-center">
              <label className="flex w-full bg-[#FBFBFF] border border-[#D8D8E2] flex-col items-center justify-center rounded-[5px] cursor-pointer relative">
                <div className="flex flex-col items-center justify-center h-[85px]">
                  {preview ? (
                    <img src={preview} alt="Uploaded logo" width={100} height={100} />
                  ) : (
                    <div className="flex flex-col">
                      <h4 className="text-[#9D9D9D] text-[12px] font-[400] ">Upload Logo Image here</h4>
                      <h4 className="text-[#9D9D9D] text-[10px] font-[400] ">Recommended size 32px by 32px</h4>
                    </div>
                  )}
                </div>
                <input type="file" accept="image/png, image/jpeg" className="hidden" onChange={handleImageChange} />
              </label>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {Object.keys(formData).map((key) => {
                if (key === "already_have_domain") return null;
                if (key === "domain_name" && !formData.already_have_domain) return null;

                return (
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
                      required
                    />
                  </div>
                );
              })}
            </div>

            {/* Toggle for "Already Have a Domain" */}
            <div className="flex items-center space-x-3 mt-4">
              <input
                type="checkbox"
                name="already_have_domain"
                checked={formData.already_have_domain}
                onChange={handleChange}
                className="h-4 w-4"
              />
              <label className="text-sm font-medium">Already have a domain?</label>
            </div>

            {/* Show domain name field only when checkbox is checked */}
            {formData.already_have_domain && (
              <div className="mt-2">
                <label className="text-[#2B2C2B] text-[12px] font-[400]">Domain Name</label>
                <input
                  type="text"
                  name="domain_name"
                  value={formData.domain_name}
                  onChange={handleChange}
                  className="mt-1 block w-full h-[40px] border-[0.5px] pl-3 rounded-[5px] focus:outline-none text-sm bg-[#FBFBFF] border-[#D8D8E2]"
                  required
                />
              </div>
            )}

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
          </form>
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

