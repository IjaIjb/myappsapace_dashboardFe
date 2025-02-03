import DashboardLayout from "../../../components/DashboardLayout";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import { UserApis } from "../../../apis/userApi/userApi";

const CreateStore = () => {
  const [formValues, setFormValues] = useState({
    store_name: "",
    store_abbreviation: "",
    industry_type: "",
    product_type: "",
    store_description: "",
    store_location: "",
  });

  const [storeLogo, setStoreLogo] = useState<File | null>(null); // Store file here
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setStoreLogo(file); // Save the file
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);

    const formData = new FormData();
    if (storeLogo) {
      formData.append("store_logo", storeLogo); // Attach the file
    }
    formData.append("store_name", formValues.store_name);
    formData.append("store_abbreviation", formValues.store_abbreviation || "");
    formData.append("industry_type", formValues.industry_type);
    formData.append("product_type", formValues.product_type);
    formData.append("store_description", formValues.store_description);
    formData.append("store_location", formValues.store_location);

    try {
      console.log("Submitting payload:", formData);

      const response:any = await UserApis.createStore(formData);
console.log(response)
      if (response?.status === 200 || response?.status === 201) {
        toast.success(response?.data?.message || "Store created successfully!");
        navigate("/dashboard/store");
      } else {
        toast.error(response?.data?.message || "Failed to create store.");
      }
    } catch (error) {
      console.error("Error creating store:", error);
      toast.error("An error occurred while creating the store.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="pt-10 px-5">
        <h5 className="text-[#000000] text-[16px] font-[600]">Business Information</h5>
        <form onSubmit={handleSubmit} className="flex flex-col max-w-[570px] mt-5 gap-3">
          {/* Add Logo */}
          <div>
            <label htmlFor="store_logo" className="text-[#2B2C2B] text-[12px] font-[400]">
              Add Logo
            </label>
            <div className="flex justify-center text-center">
              <label className="flex w-full bg-[#FBFBFF] border border-[#D8D8E2] flex-col items-center justify-center rounded-[5px] cursor-pointer relative">
                <div className="flex flex-col items-center justify-center h-[80px]">
                  {storeLogo ? (
                    <img
                      src={URL.createObjectURL(storeLogo)}
                      alt="Uploaded logo"
                      width={100}
                      height={100}
                    />
                  ) : (
                    <div className="flex flex-col">
                      <h4 className="text-[#9D9D9D] text-[12px] font-[400]">Upload Logo Image here</h4>
                      <h4 className="text-[#9D9D9D] text-[10px] font-[400]">
                        Recommended size 32px by 32px
                      </h4>
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
            </div>
          </div>

          {/* Store Name */}
          <div>
            <label htmlFor="store_name" className="text-[#2B2C2B] text-[12px] font-[400]">
              Store Name
            </label>
            <input
              type="text"
              name="store_name"
              value={formValues.store_name}
              onChange={handleInputChange}
              className="block w-full mt-1 border px-3 py-2 rounded"
              placeholder="Enter store name"
              required
            />
          </div>

          {/* Store Abbreviation */}
          <div>
            <label htmlFor="store_abbreviation" className="text-[#2B2C2B] text-[12px] font-[400]">
              Store Abbreviation
            </label>
            <input
              type="text"
              name="store_abbreviation"
              value={formValues.store_abbreviation}
              onChange={handleInputChange}
              className="block w-full mt-1 border px-3 py-2 rounded"
              placeholder="Enter abbreviation"
              required
            />
          </div>

          {/* Industry Type */}
          <div>
            <label htmlFor="industry_type" className="text-[#2B2C2B] text-[12px] font-[400]">
              Industry Type
            </label>
            <input
              type="text"
              name="industry_type"
              value={formValues.industry_type}
              onChange={handleInputChange}
              className="block w-full mt-1 border px-3 py-2 rounded"
              placeholder="E.g., Retail, Fashion"
              required
            />
          </div>

          {/* Product Type */}
          <div>
            <label htmlFor="product_type" className="text-[#2B2C2B] text-[12px] font-[400]">
              Product Type
            </label>
            <input
              type="text"
              name="product_type"
              value={formValues.product_type}
              onChange={handleInputChange}
              className="block w-full mt-1 border px-3 py-2 rounded"
              placeholder="Physical, Digital, Both"
              required
            />
          </div>

          {/* Store Location */}
          <div>
            <label htmlFor="store_location" className="text-[#2B2C2B] text-[12px] font-[400]">
              Business Location
            </label>
            <input
              type="text"
              name="store_location"
              value={formValues.store_location}
              onChange={handleInputChange}
              className="block w-full mt-1 border px-3 py-2 rounded"
              placeholder="Enter business location"
              required
            />
          </div>

          {/* Store Description */}
          <div>
            <label htmlFor="store_description" className="text-[#2B2C2B] text-[12px] font-[400]">
              Business Description
            </label>
            <textarea
              name="store_description"
              value={formValues.store_description}
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
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:bg-gray-400"
          >
            {loader ? <LoadingSpinner /> : "Proceed"}
            {!loader && <FaArrowRight />}
          </button>
          </div>
        </form>
        <ToastContainer autoClose={3000} />
      </div>
    </DashboardLayout>
  );
};

export default CreateStore;





// import DashboardLayout from '../../../components/DashboardLayout'
// import { ErrorMessage, Field, Form, Formik } from "formik";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import * as Yup from "yup";
// import { FaArrowRight } from "react-icons/fa";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { UserApis } from '../../../apis/userApi/userApi';
// import LoadingSpinner from '../../../components/UI/LoadingSpinner';
// interface ImageUploadProps {
//   image: string | undefined; // URL of the uploaded image
//   setImage: (image: string | undefined) => void; // Updates the image URL
// }
// const CreateStore = () => {

//     const [image, setImage] = useState<any>(undefined);
//     const [loader, setLoader] = useState(false);

//     const navigate = useNavigate();
  
//     const initialData = {
//       store_logo: "",
//       store_name: "",
//       store_abbreviation: "",
//       industry_type: "",
//       product_type: "",
//       store_description: "",
//       store_location: "",
//     };
  
//     const validation = Yup.object().shape({
//       store_logo: Yup.mixed()
//         .required("Store logo is required")
//         .test(
//           "fileType",
//           "Invalid file type. Only images are allowed.",
//           (value: any) =>
//             value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
//         )
//         .test(
//           "fileSize",
//           "File size is too large. Maximum size is 2MB.",
//           (value: any) => value && value.size <= 2 * 1024 * 1024 // 2MB
//         ),
//       store_name: Yup.string()
//         .required("Store name is required")
//         .min(3, "Store name must be at least 3 characters")
//         .max(100, "Store name cannot exceed 100 characters"),
//       store_abbreviation: Yup.string()
//         .required("Store abbreviation is required")
//         .max(10, "Abbreviation cannot exceed 10 characters"),
//       industry_type: Yup.string().required("Industry type is required"),
//       product_type: Yup.string().required("Product type is required"),
//       store_description: Yup.string()
//         .required("Store description is required")
//         .min(10, "Description must be at least 10 characters"),
//       store_location: Yup.string().required("Store location is required"),
//     });
  
//     const ImageUpload: React.FC<ImageUploadProps> = ({ image, setImage }) => {
//       const [loading, setLoading] = useState(false);
  
//       const handleImageChange = async (
//         e: React.ChangeEvent<HTMLInputElement>
//       ) => {
//         const file = e.target.files?.[0];
//         if (file) {
//           setLoading(true); // Show loading spinner or indicator
  
//           try {
//             // Create a FormData object
//             const formData = new FormData();
//             formData.append("file", file);
//             formData.append("upload_preset", "urban_image"); // Replace with your Cloudinary preset
  
//             // Upload to Cloudinary
//             const response = await fetch(
//               "https://api.cloudinary.com/v1_1/dngyazspl/image/upload",
//               {
//                 method: "POST",
//                 body: formData,
//               }
//             );
  
//             const result = await response.json();
//             if (result.secure_url) {
//               // Set the image URL in the state
//               setImage(result.secure_url);
//             }
  
//             setLoading(false); // Stop loading
//           } catch (error) {
//             console.error("Error uploading image", error);
//             toast.error("Error uploading image. Please try again.");
//             setLoading(false);
//           }
//         }
//       };
  
//       return (
//         <div className="flex justify-center text-center">
//           <label className="flex w-full bg-[#FBFBFF] border border-[#D8D8E2] flex-col items-center justify-center rounded-[5px] cursor-pointer relative">
//             <div className="flex flex-col items-center justify-center h-[80px]">
//               {image ? (
//                 <img
//                   className=""
//                   src={image} // This should now be the Cloudinary URL
//                   alt="Uploaded logo"
//                   width={100}
//                   height={100}
//                 />
//               ) : (
//                 <div className="flex justify-center items-center">
//                   <div className="flex flex-col">
//                     <h4 className="text-[#9D9D9D] text-[12px] font-[400] ">
//                       Upload Logo Image here{" "}
//                     </h4>
//                     <h4 className="text-[#9D9D9D] text-[10px] font-[400] ">
//                       Recommended size 32px by 32px{" "}
//                     </h4>
//                   </div>
//                 </div>
//                 //   <img
//                 //     className=""
//                 //     src="/onboarding/Icon.svg" // Default placeholder image
//                 //     alt="Default"
//                 //     width={100}
//                 //     height={100}
//                 //   />
//               )}
//             </div>
//             <input
//               type="file"
//               accept="image/x-png,image/gif,image/jpeg"
//               className="hidden mb-2 text-sm text-[#6C757D] font-medium"
//               onChange={handleImageChange}
//             />
//           </label>
//           {loading && <p>Uploading...</p>}
//         </div>
//       );
//     };
  
//     const onSubmit = async (values: { 
//       store_logo: string; // Use the image URL directly
//       store_name: string; 
//       store_abbreviation: string; 
//       industry_type: string; 
//       product_type: string; 
//       store_description: string; 
//       store_location: string; 
//      }) => {
//       setLoader(true);
//       const payload = {
//         store_logo: image, // Use the image URL directly
//         store_name: values.store_name,
//         store_abbreviation: values.store_abbreviation || "",
//         industry_type: values.industry_type,
//         product_type: values.product_type,
//         store_description: values.store_description,
//         store_location: values.store_location,
//       };
//       try {
//         // Create a JSON object instead of FormData
    
    
//         console.log("Submitting payload:", payload);
    
//         // Send the JSON payload to the API
//         const response = await UserApis.createStore(payload); // Ensure your `createStore` method supports JSON payloads
    
//         console.log("API Response:", response);
    
//         if (response?.data?.status === true) {
//           toast.success("Store created successfully!");
//           // Redirect or reset form
//           console.log("Store created:", response.data);
//           navigate("/dashboard/store");
//         } else {
//           toast.error("Failed to create store. Please try again.");
//           console.error("Error response:", response);
//         }
//       } catch (error) {
//         console.error("Error creating store:", error);
//         toast.error("An error occurred while creating the store.");
//       } finally {
//         setLoader(false);
//       }
//     };
    

    
//   return (
// <DashboardLayout>
// <div>
// <div className="md:block flex ">
//             <div className=" pt-10  px-5">
//               <div className="">
        
//                 <div className=" mt-7 ">
//                   <h5 className="text-[#000000] text-[16px] font-[600] ">
//                     Business Information
//                   </h5>
//                 </div>
//               </div>

//               <div className="flex flex-col max-w-[570px] mt-2 gap-3">
//               <Formik
//   initialValues={initialData}
//   validationSchema={validation}
//   onSubmit={onSubmit} // Formik will automatically call this function
// >
//   {({ setFieldValue }) => (
//     <Form className="w-full mb-6 flex flex-col justify-between">
//       <div>
//         <div className="mb-3 w-full relative">
//           <label
//             className="text-[#2B2C2B] text-[12px] font-[400]"
//             htmlFor="first_name"
//           >
//             Add Logo
//           </label>
//           <ImageUpload image={image} setImage={setImage} />
//           <p className="text-red-700 text-xs mt-1">
//             <ErrorMessage name="first_name" />
//           </p>
//         </div>

//         <div className="flex gap-3">
//           <div className="mb-3 w-full relative">
//             <label
//               className="text-[#2B2C2B] text-[12px] font-[400]"
//               htmlFor="store_name"
//             >
//               Store Name
//             </label>
//             <Field
//               className="mt-1 block w-full h-[40px] border-[0.5px] pl-3 rounded-[5px] focus:outline-none text-[#969696] bg-[#FBFBFF] border-[#D8D8E2]"
//               name="store_name"
//               type="text"
//               id="store_name"
//               placeholder="Store Name"
//               onChange={(e: any) =>
//                 setFieldValue("store_name", e.target.value)
//               }
//             />
//             <p className="text-red-700 text-xs mt-1">
//               <ErrorMessage name="store_name" />
//             </p>
//           </div>

//           <div className="mb-3 w-full relative">
//             <label
//               className="text-[#2B2C2B] text-[12px] font-[400]"
//               htmlFor="industry_type"
//             >
//               Industry Type
//             </label>
//             <Field
//               className="mt-1 block w-full h-[40px] border-[0.5px] pl-3 rounded-[5px] focus:outline-none text-[#969696] bg-[#FBFBFF] border-[#D8D8E2]"
//               name="industry_type"
//               type="text"
//               id="industry_type"
//               placeholder="Retail, Fashion, etc."
//               onChange={(e: any) =>
//                 setFieldValue("industry_type", e.target.value)
//               }
//             />
//             <p className="text-red-700 text-xs mt-1">
//               <ErrorMessage name="industry_type" />
//             </p>
//           </div>
//         </div>

//         <div className="flex gap-3">
//           <div className="mb-3 w-full relative">
//             <label
//               className="text-[#2B2C2B] text-[12px] font-[400]"
//               htmlFor="store_location"
//             >
//               Business Location
//             </label>
//             <Field
//               className="mt-1 block w-full h-[40px] border-[0.5px] pl-3 rounded-[5px] focus:outline-none text-[#969696] bg-[#FBFBFF] border-[#D8D8E2]"
//               name="store_location"
//               type="text"
//               id="store_location"
//               placeholder="Abuja, Nigeria"
//               onChange={(e: any) =>
//                 setFieldValue("store_location", e.target.value)
//               }
//             />
//             <p className="text-red-700 text-xs mt-1">
//               <ErrorMessage name="store_location" />
//             </p>
//           </div>

//           <div className="mb-3 w-full relative">
//             <label
//               className="text-[#2B2C2B] text-[12px] font-[400]"
//               htmlFor="product_type"
//             >
//               Products Type
//             </label>
//             <Field
//               className="mt-1 block w-full h-[40px] border-[0.5px] pl-3 rounded-[5px] focus:outline-none text-[#969696] bg-[#FBFBFF] border-[#D8D8E2]"
//               name="product_type"
//               type="text"
//               id="product_type"
//               placeholder="Physical, Digital, Both"
//               onChange={(e: any) =>
//                 setFieldValue("product_type", e.target.value)
//               }
//             />
//             <p className="text-red-700 text-xs mt-1">
//               <ErrorMessage name="product_type" />
//             </p>
//           </div>
//         </div>

//         <div className="mb-3 w-full relative">
//           <label
//             className="text-[#2B2C2B] text-[12px] font-[400]"
//             htmlFor="store_description"
//           >
//             Business Description
//           </label>
//           <Field
//             as="textarea"
//             rows={4}
//             className="mt-1 block w-full border-[0.5px] pl-3 rounded-[5px] focus:outline-none text-[#969696] bg-[#FBFBFF] border-[#D8D8E2]"
//             name="store_description"
//             type="text"
//             id="store_description"
//             onChange={(e: any) =>
//               setFieldValue("store_description", e.target.value)
//             }
//             placeholder="Enter a short description of your store"
//           />
//           <p className="text-red-700 text-xs mt-1">
//             <ErrorMessage name="store_description" />
//           </p>
//         </div>
//       </div>

//       <button
//         type="submit" // Formik handles the onSubmit
//         disabled={loader}
//         onClick={() =>onSubmit}
//         className={`disabled:bg-gray-500 flex gap-2 items-center py-2 w-fit px-6 bg-secondary text-white rounded-full hover:bg-secondary/[70%]`}
//       >
//         {loader ? <LoadingSpinner /> : "Proceed"}
//         {!loader && <FaArrowRight />}
//       </button>
//     </Form>
//   )}
// </Formik>

//               </div>
//             </div>
//                   <ToastContainer
//                     position="top-right"
//                     autoClose={2000}
//                     hideProgressBar={true}
//                     newestOnTop={false}
//                     closeOnClick
//                     rtl={false}
//                     pauseOnFocusLoss
//                     draggable
//                     pauseOnHover
//                   />
//           </div>
// </div>
// </DashboardLayout>
//   )
// }

// export default CreateStore