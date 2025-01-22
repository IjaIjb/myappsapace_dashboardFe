import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { FaArrowRight } from "react-icons/fa";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { UserApis } from "../../apis/userApi/userApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { login } from "../../reducer/loginSlice";
interface ImageUploadProps {
  image: string | undefined; // URL of the uploaded image
  setImage: (image: string | undefined) => void; // Updates the image URL
}
const AddStore = () => {
  // const [showPassword, setShowPassword] = useState(false);
  // const [confirmPassword, setShowConfirmPassword] = useState(false);
  // const dispatch: Dispatch = useDispatch();
  const [image, setImage] = useState<any>(undefined);

  const history = useHistory();
  const dispatch: Dispatch = useDispatch();

  const initialData = {
    store_logo: "",
    store_name: "",
    store_abbreviation: "",
    industry_type: "",
    product_type: "",
    store_description: "",
    store_location: "",
  };

  const validation = Yup.object().shape({
    store_logo: Yup.mixed()
      .required("Store logo is required")
      .test(
        "fileType",
        "Invalid file type. Only images are allowed.",
        (value: any) =>
          value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
      )
      .test(
        "fileSize",
        "File size is too large. Maximum size is 2MB.",
        (value: any) => value && value.size <= 2 * 1024 * 1024 // 2MB
      ),
    store_name: Yup.string()
      .required("Store name is required")
      .min(3, "Store name must be at least 3 characters")
      .max(100, "Store name cannot exceed 100 characters"),
    store_abbreviation: Yup.string()
      .required("Store abbreviation is required")
      .max(10, "Abbreviation cannot exceed 10 characters"),
    industry_type: Yup.string().required("Industry type is required"),
    product_type: Yup.string().required("Product type is required"),
    store_description: Yup.string()
      .required("Store description is required")
      .min(10, "Description must be at least 10 characters"),
    store_location: Yup.string().required("Store location is required"),
  });

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
        {loading && <p>Uploading...</p>}
      </div>
    );
  };

  const onSubmit = async (
    values: any,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true);

    try {
      // Create a FormData object
      const formData = new FormData();
      formData.append("store_logo", image); // File
      formData.append("store_name", values.store_name);
      formData.append(
        "store_abbreviation",
        values.store_abbreviation ? values.store_abbreviation : ""
      );
      formData.append("industry_type", values.industry_type);
      formData.append("product_type", values.product_type);
      formData.append("store_description", values.store_description);
      formData.append("store_location", values.store_location);

      // Send the data to the API
      const response = await UserApis.createStore(formData);

      if (response?.data?.status === true) {
              dispatch(
                    login({
                      login: values.login,
                      token: response.data.token,
                      id: response.data.data.id,
                      name: response.data.data.first_name,
                      data: response?.data?.data,
                    })
                  );
        toast.success("Store created successfully!");
        // Redirect or reset form
        console.log("Store created:", response.data);
        history.push("/dashboard/home");
      } else {
        toast.error("Failed to create store. Please try again.");
        console.error("Error response:", response);
      }
    } catch (error) {
      console.error("Error creating store:", error);
      toast.error("An error occurred while creating the store.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="p-8">
        <div className="grid md:grid-cols-2 ">
          <div className="h-screen md:block hidden ">
            <img
              src="/images/auth/authImage1.svg"
              className="h-screen"
              alt="mart Logo"
            />
          </div>

          <div className="md:block flex ">
            <div className=" pt-10  px-5">
              <div className="">
                <img
                  src="/images/logo2.svg"
                  className="w-"
                  alt="myappspace Logo"
                />
                <div className=" mt-7 ">
                  <h5 className="text-[#000000] text-[16px] font-[600] ">
                    Business Information
                  </h5>
                </div>
              </div>

              <div className="flex flex-col max-w-[570px] mt-2 gap-3">
                <Formik
                  initialValues={initialData}
                  validationSchema={validation}
                  onSubmit={onSubmit}
                >
                  {({ values, isSubmitting, handleChange }) => (
                    <Form className="w-full  mb-6 flex flex-col justify-between">
                      <div className="">
                        <div className=" mb-3 w-full relative">
                          <label
                            className=" text-[#2B2C2B] text-[12px] font-[400] "
                            htmlFor="first_name"
                          >
                            Add Logo
                          </label>
                          <ImageUpload image={image} setImage={setImage} />

                          <p className="text-red-700 text-xs mt-1 ">
                            <ErrorMessage name="first_name" />
                          </p>
                        </div>

                        <div className="flex gap-3">
                          <div className=" mb-3 w-full relative">
                            <label
                              className=" text-[#2B2C2B] text-[12px] font-[400] "
                              htmlFor="store_name"
                            >
                              Store Name
                            </label>
                            <Field
                              className="mt-1 block w-full h-[40px] border-[0.5px]  pl-3 rounded-[5px] focus:outline-none text-[#969696] bg-[#FBFBFF]  border-[#D8D8E2] "
                              name="store_name"
                              type="text"
                              id="store_name"
                              onChange={handleChange}
                              value={values.store_name}
                              placeholder="Store Name"
                            />
                            <p className="text-red-700 text-xs mt-1 ">
                              <ErrorMessage name="store_name" />
                            </p>
                          </div>

                          <div className=" mb-3 w-full relative">
                            <label
                              className=" text-[#2B2C2B] text-[12px] font-[400] "
                              htmlFor="industry_type"
                            >
                              Industry Type
                            </label>
                            <Field
                              className="mt-1 block w-full h-[40px] border-[0.5px]  pl-3 rounded-[5px] focus:outline-none text-[#969696] bg-[#FBFBFF]  border-[#D8D8E2] "
                              name="industry_type"
                              type="text"
                              id="industry_type"
                              onChange={handleChange}
                              value={values.industry_type}
                              placeholder="Retail, Fashion etc"
                            />
                            <p className="text-red-700 text-xs mt-1 ">
                              <ErrorMessage name="industry_type" />
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <div className=" mb-3 w-full relative">
                            <label
                              className=" text-[#2B2C2B] text-[12px] font-[400] "
                              htmlFor="store_location"
                            >
                              Business Location
                            </label>
                            <Field
                              className="mt-1 block w-full h-[40px] border-[0.5px]  pl-3 rounded-[5px] focus:outline-none text-[#969696] bg-[#FBFBFF]  border-[#D8D8E2] "
                              name="store_location"
                              type="text"
                              id="store_location"
                              onChange={handleChange}
                              value={values.store_location}
                              placeholder="Abuja, Nigeria"
                            />
                            <p className="text-red-700 text-xs mt-1 ">
                              <ErrorMessage name="store_location" />
                            </p>
                          </div>

                          <div className=" mb-3 w-full relative">
                            <label
                              className=" text-[#2B2C2B] text-[12px] font-[400] "
                              htmlFor="product_type"
                            >
                              Products Type
                            </label>
                            <Field
                              className="mt-1 block w-full h-[40px] border-[0.5px]  pl-3 rounded-[5px] focus:outline-none text-[#969696] bg-[#FBFBFF]  border-[#D8D8E2] "
                              name="product_type"
                              type="text"
                              id="product_type"
                              onChange={handleChange}
                              value={values.product_type}
                              placeholder="Physical, Digital, Both"
                            />
                            <p className="text-red-700 text-xs mt-1 ">
                              <ErrorMessage name="product_type" />
                            </p>
                          </div>
                        </div>

                        <div className=" mb-3 w-full relative">
                          <label
                            className=" text-[#2B2C2B] text-[12px] font-[400] "
                            htmlFor="store_description"
                          >
                            Business Description
                          </label>
                          <Field
                            as="textarea"
                            rows={4}
                            className="mt-1 block w-full  border-[0.5px]  pl-3 rounded-[5px] focus:outline-none text-[#969696] bg-[#FBFBFF]  border-[#D8D8E2] "
                            name="store_description"
                            type="text"
                            id="store_description"
                            onChange={handleChange}
                            value={values.store_description}
                            placeholder="Enter a short description of your store"
                          />
                          <p className="text-red-700 text-xs mt-1 ">
                            <ErrorMessage name="store_description" />
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-end items-end h-full">
                        <button
                          type="submit"
                          disabled={isSubmitting} // Formik automatically sets this during submission
                          className={`disabled:bg-gray-500 flex gap-2 items-center py-2 w-fit px-6 bg-secondary text-white rounded-full hover:bg-secondary/[70%]`}
                        >
                          {isSubmitting ? <LoadingSpinner /> : "Proceed"}
                          {!isSubmitting && <FaArrowRight />}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
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

export default AddStore;
