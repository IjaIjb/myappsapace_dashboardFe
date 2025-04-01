import React, { useState, useEffect } from "react";
import DashboardLayout from "../../../../components/DashboardLayout";
import { FaArrowRight } from "react-icons/fa";
import { UserApis } from "../../../../apis/userApi/userApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../../components/UI/LoadingSpinner";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { Link } from "react-router-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const CreateCategory = () => {
  const selectedStore = useSelector(
    (state: RootState) => state.globalState?.selectedStore || null
  );
  // console.log("Selected Store Code:", selectedStore);

  // const [stores, setStores] = useState<any>([]);
  const [formValues, setFormValues] = useState({
    category_name: "",
    store_code: "", // Use store_code instead of store_name
    category_description: "",
    status: "active",
  });
  const [categoryLogo, setCategoryLogo] = useState<File | null>(null);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const onOpenModal = () => {
    // e.preventDefault();
    setOpen(true);
  };
  const onCloseModal = () => setOpen(false);

  useEffect(() => {
    if (!selectedStore) {
      onOpenModal();
    } else {
      onCloseModal();
    }
  }, [selectedStore]);

  // useEffect(() => {
  //   UserApis.getStore()
  //     .then((response) => {
  //       if (response?.data) {
  //         setStores(response?.data || []); // Adjusting to your API response structure
  //       }
  //     })
  //     .catch((error) => console.error("Error fetching stores:", error));
  // }, []);
  // console.log(stores);
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCategoryLogo(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);

    const formData = new FormData();
    if (categoryLogo) {
      formData.append("category_image", categoryLogo);
    }
    formData.append("category_name", formValues.category_name);
    formData.append("category_description", formValues.category_description);
    formData.append("status", formValues.status);
    // console.log("Submitting payload:", formValues);

    try {
      // console.log("Submitting payload:", formValues);

      const response: any = await UserApis.createCategory(
        selectedStore,
        formData
      );
      // console.log(response);

      if (response?.data) {
        toast.success(
          response?.data?.message || "Category created successfully!"
        );
        navigate("/dashboard/category");
      } else {
        toast.error(response?.data?.message || "Failed to create category.");
      }
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("An error occurred while creating the category.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <DashboardLayout>
      <Modal
        classNames={{
          modal: "rounded-[10px] overflow-visible relative",
        }}
        open={open}
        onClose={() => {}} // Prevents closing the modal
        closeOnEsc={false} // Prevent closing with the Escape key
        closeOnOverlayClick={false} // Prevent closing by clicking outside
        showCloseIcon={false} // Hides the close button
        center
      >
        <div className="px-2 md:px-5  h-[100px] flex justify-center items-center  text-center">
          <div>
            <h4 className="text-[20px] font-[600] mb-4">Don't have a Site?</h4>
            <Link
              to="/dashboard/create-site"
              className="underline text-blue-800"
            >
              Create a Site
            </Link>
          </div>
        </div>
      </Modal>
      <div>
        <h5 className="text-[#000000] text-[16px] font-[600] mb-7">
          Create Category
        </h5>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col max-w-[570px] mt-5 gap-3"
        >
          {/* Category Image */}
          <div>
            <label
              htmlFor="store_image"
              className="text-[#2B2C2B] text-[12px] font-[400]"
            >
              Category Image
            </label>
            <div className="flex justify-center text-center">
              <label className="flex w-full bg-[#FBFBFF] border border-[#D8D8E2] flex-col items-center justify-center rounded-[5px] cursor-pointer">
                <div className="flex flex-col items-center justify-center h-full ">
                  {categoryLogo ? (
                    <img
                      src={URL.createObjectURL(categoryLogo)}
                      alt="Uploaded logo"
                      width={100}
                      height={100}
                    />
                  ) : (
                    <div className="h-[100px] flex justify-center items-center">
                    <div>
                      <p className="text-[#9D9D9D] text-[12px]  font-[400]">
                        Upload Logo Image here
                      </p>
                      <p className="text-[#9D9D9D] text-[10px] font-[400]">
                        Recommended size 32px by 32px
                      </p>
                      </div>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/x-png,image/gif,image/jpeg"
                  className="hidden"
                  // required
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>

          {/* Category Name */}
          <div>
            <label
              htmlFor="category_name"
              className="text-[#2B2C2B] text-[12px] font-[400]"
            >
              Category Name
            </label>
            <input
              type="text"
              name="category_name"
              value={formValues.category_name}
              onChange={handleInputChange}
              className="block w-full mt-1 border px-3 py-2 rounded"
              placeholder="Enter category name"
              required
            />
          </div>

          {/* Category Description */}
          <div>
            <label
              htmlFor="category_description"
              className="text-[#2B2C2B] text-[12px] font-[400]"
            >
              Category Description
            </label>
            <textarea
              name="category_description"
              value={formValues.category_description}
              onChange={handleInputChange}
              className="block w-full mt-1 border px-3 py-2 rounded"
              rows={4}
              placeholder="Enter a short description"
              // required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end items-end h-full">
            <button
              type="submit"
              disabled={loader}
              className={`disabled:bg-gray-500 flex gap-2 items-center py-2 w-fit px-6 bg-secondary text-white rounded-full hover:bg-secondary/[70%]`}
            >
              {loader ? <LoadingSpinner /> : "Proceed"}
              {!loader && <FaArrowRight />}
            </button>
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
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CreateCategory;

// import React, { useState } from 'react'
// import DashboardLayout from '../../../../components/DashboardLayout'
// import { IoAddCircleOutline } from 'react-icons/io5'
// import { Link } from "react-router-dom";
// import { UserApis } from '../../../../apis/userApi/userApi';
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
// import LoadingSpinner from '../../../../components/UI/LoadingSpinner';
// import { FaArrowRight } from 'react-icons/fa';

// const CreateCategory = () => {
//   const [stores, setStores] = React.useState<any>([]);

//   React.useEffect(() => {
//     UserApis.getStore()
//       .then((response) => {
//         if (response?.data) {
//           // console?.log(response?.data);
//           setStores(response?.data);
//         } else {
//           // dispatch(login([]))
//         }
//       })
//       .catch(function (error) {});
//   }, []);

//    const [formValues, setFormValues] = useState({
//       category_name: "",
//       store_name: "",
//       category_description: "",
//       status: "active",
//     });

//     const [categoryLogo, setCategoryLogo] = useState<File | null>(null); // Store file here
//     const [loader, setLoader] = useState(false);
//     const navigate = useNavigate();

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//       const { name, value } = e.target;
//       setFormValues((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       const file = e.target.files?.[0];
//       if (file) {
//         setCategoryLogo(file); // Save the file
//       }
//     };

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//       e.preventDefault();
//       setLoader(true);

//       const formData = new FormData();
//       if (categoryLogo) {
//         formData.append("category_image", categoryLogo); // Attach the file
//       }
//       formData.append("category_name", formValues.category_name);
//       formData.append("category_description", formValues.category_description);
//       formData.append("status", formValues.status);

//       try {
//         console.log("Submitting payload:", formData);

//         const response:any = await UserApis.createCategory(formValues.store_name, formData);
//   console.log(response)
//         if (response?.status === 200 || response?.status === 201) {
//           toast.success(response?.data?.message || "Store created successfully!");
//           navigate("/dashboard/category");
//         } else {
//           toast.error(response?.data?.message || "Failed to create category.");
//         }
//       } catch (error) {
//         console.error("Error creating category:", error);
//         toast.error("An error occurred while creating the category.");
//       } finally {
//         setLoader(false);
//       }
//     };

//   return (
//     <DashboardLayout>
//       <div>
//         <div className="flex gap-3 items-center mb-7">
//         <h5 className="text-[#000000] text-[16px] font-[600]">Business Information</h5>
//         <form onSubmit={handleSubmit} className="flex flex-col max-w-[570px] mt-5 gap-3">
//           {/* Add Logo */}
//           <div>
//             <label htmlFor="store_image" className="text-[#2B2C2B] text-[12px] font-[400]">
//          Category Image
//             </label>
//             <div className="flex justify-center text-center">
//               <label className="flex w-full bg-[#FBFBFF] border border-[#D8D8E2] flex-col items-center justify-center rounded-[5px] cursor-pointer relative">
//                 <div className="flex flex-col items-center justify-center h-[80px]">
//                   {categoryLogo ? (
//                     <img
//                       src={URL.createObjectURL(categoryLogo)}
//                       alt="Uploaded logo"
//                       width={100}
//                       height={100}
//                     />
//                   ) : (
//                     <div className="flex flex-col">
//                       <h4 className="text-[#9D9D9D] text-[12px] font-[400]">Upload Logo Image here</h4>
//                       <h4 className="text-[#9D9D9D] text-[10px] font-[400]">
//                         Recommended size 32px by 32px
//                       </h4>
//                     </div>
//                   )}
//                 </div>
//                 <input
//                   type="file"
//                   accept="image/x-png,image/gif,image/jpeg"
//                   className="hidden mb-2 text-sm text-[#6C757D] font-medium"
//                   onChange={handleImageChange}
//                 />
//               </label>
//             </div>
//           </div>

//           <div>
//       <label htmlFor="store_name" className="block text-sm font-medium text-gray-700">
//         Select Store
//       </label>
//       <select
//         name="store_name"
//         // value={formValues.store_name}
//         onChange={handleInputChange}
//         className="block w-full mt-1 border px-3 py-2 rounded"
//         required
//       >
//         <option value="" disabled>
//           Select a store
//         </option>
//         {stores?.data?.data?.map((store: any) => (
//           <option key={store.id} value={store.store_code}>
//             {store.store_name}
//           </option>
//         ))}
//       </select>
//     </div>
//           {/* category Name */}
//           <div>
//             <label htmlFor="category_name" className="text-[#2B2C2B] text-[12px] font-[400]">
//              Category Name
//             </label>
//             <input
//               type="text"
//               name="category_name"
//               value={formValues.category_name}
//               onChange={handleInputChange}
//               className="block w-full mt-1 border px-3 py-2 rounded"
//               placeholder="Enter category name"
//               required
//             />
//           </div>

//           {/* category Description */}
//           <div>
//             <label htmlFor="category_description" className="text-[#2B2C2B] text-[12px] font-[400]">
//            Category Description
//             </label>
//             <textarea
//               name="category_description"
//               value={formValues.category_description}
//               onChange={handleInputChange}
//               className="block w-full mt-1 border px-3 py-2 rounded"
//               rows={4}
//               placeholder="Enter a short description"
//               required
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loader}
//             className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:bg-gray-400"
//           >
//             {loader ? <LoadingSpinner /> : "Proceed"}
//             {!loader && <FaArrowRight />}
//           </button>
//         </form>
//         </div>
//         {/* <RecentOrders /> */}
//       </div>
//     </DashboardLayout>
//   )
// }

// export default CreateCategory
