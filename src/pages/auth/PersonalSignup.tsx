import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { FaArrowRight } from "react-icons/fa";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { UserApis } from "../../apis/userApi/userApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../../reducer/loginSlice";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";

const PersonalSignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch: Dispatch = useDispatch();

  const history = useHistory();

  const initialData = {
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    password_confirmation: "",
  };

  const validation = Yup.object({
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone_number: Yup.string().required("Phone number is required"),
    password: Yup.string().required("Password is required"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("Confirm Password is required"),
  });

  // const onSubmit = async (values:any) => {
  //   if (values?.password !== values?.password_confirmation) {
  //     return toast.error("Password does not match");
  // }
  //   try {
  //     // Convert form values to FormData
  //     const formData = new FormData();
  //     formData.append("first_name", values.first_name);
  //     formData.append("last_name", values.last_name);
  //     formData.append("email", values.email);
  //     formData.append("phone_number", values.phone_number);
  //     formData.append("password", values.password);

  //     // Submit formData to the API
  //     const response = await UserApis.register(formData);
  //     dispatch(login({ email: values?.email, token: response.data.token, name: response.data.name }))

  //     console.log("Registration successful:", response);
  //     toast.success("Login Successful");
  //     history.push("/auth/verify-email");
  //     window.scrollTo(0, 0); // Scroll to top
  //   } catch (error) {
  //     console.error("Error registering user:", error);
  //   }
  //   // UserApis.register("console.log()")
  //   //   history.push("/auth/verify-email");

  //   //   window.scrollTo(0, 0); // Scroll to top

  // };

  const onSubmit = async (
    values: {
      first_name: string;
      last_name: string;
      email: string;
      phone_number: string;
      password: string;
      password_confirmation: string;
    },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    if (values.password !== values.password_confirmation) {
      toast.error("Passwords do not match");
      setSubmitting(false);
      return;
    }
  
    const formData = new FormData();
    formData.append("first_name", values.first_name);
    formData.append("last_name", values.last_name);
    formData.append("email", values.email);
    formData.append("phone_number", values.phone_number);
    formData.append("password", values.password);
    formData.append("password_confirmation", values.password_confirmation);
  
    try {
      const response = await UserApis.register(formData);
      if (response?.data?.status === true) {
        dispatch(
          login({
            email: values.email,
            token: response.data.token,
            name: response.data.name,
          })
        );
        console.log("Signup created:", response.data);

        toast.success("Login Successful");
        history.push("/auth/verify-email");
      } else {
        toast.error(response?.data?.errors?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
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
                    Personal Information
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
                        <div className="flex gap-3">
                          <div className=" mb-3 w-full relative">
                            <label
                              className=" text-[#2B2C2B] text-[12px] font-[400] "
                              htmlFor="first_name"
                            >
                              First Name
                            </label>
                            <Field
                              className="mt-1 block w-full h-[40px] border-[0.5px]  pl-3 rounded-[5px] focus:outline-none text-[#969696] bg-[#FBFBFF]  border-[#D8D8E2] "
                              name="first_name"
                              type="text"
                              id="first_name"
                              onChange={handleChange}
                              value={values.first_name}
                              placeholder="First Name"
                            />
                            <p className="text-red-700 text-xs mt-1 ">
                              <ErrorMessage name="first_name" />
                            </p>
                          </div>

                          <div className=" mb-3 w-full relative">
                            <label
                              className=" text-[#2B2C2B] text-[12px] font-[400] "
                              htmlFor="last_name"
                            >
                              Last Name
                            </label>
                            <Field
                              className="mt-1 block w-full h-[40px] border-[0.5px]  pl-3 rounded-[5px] focus:outline-none text-[#969696] bg-[#FBFBFF]  border-[#D8D8E2] "
                              name="last_name"
                              type="text"
                              id="last_name"
                              onChange={handleChange}
                              value={values.last_name}
                              placeholder="Last Name"
                            />
                            <p className="text-red-700 text-xs mt-1 ">
                              <ErrorMessage name="last_name" />
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <div className=" mb-5 w-full relative">
                            <label
                              className=" text-[#2B2C2B] text-[12px] font-[400] "
                              htmlFor="email"
                            >
                              Email Address
                            </label>
                            <Field
                              className="mt-1 block w-full h-[40px] border-[0.5px]  pl-3 rounded-[5px] focus:outline-none text-[#969696] bg-[#FBFBFF]  border-[#D8D8E2] "
                              name="email"
                              type="email"
                              id="email"
                              onChange={handleChange}
                              value={values.email}
                              placeholder=""
                            />
                            <p className="text-red-700 text-xs mt-1 ">
                              <ErrorMessage name="email" />
                            </p>
                          </div>

                          <div className=" mb-5 w-full relative">
                            <label
                              className=" text-[#2B2C2B] text-[12px] font-[400] "
                              htmlFor="phone_number"
                            >
                              Phone Number
                            </label>
                            <Field
                              className="mt-1 block w-full h-[40px] border-[0.5px]  pl-3 rounded-[5px] focus:outline-none text-[#969696] bg-[#FBFBFF]  border-[#D8D8E2] "
                              name="phone_number"
                              type="number"
                              id="phone_number"
                              onChange={handleChange}
                              value={values.phone_number}
                              placeholder="08166965025"
                            />
                            <p className="text-red-700 text-xs mt-1 ">
                              <ErrorMessage name="phone_number" />
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <div className=" mb-3 w-full relative">
                            <label
                              className=" text-[#2B2C2B] text-[12px] font-[400] "
                              htmlFor="password"
                            >
                              Password
                            </label>
                            <div>
                              <Field
                                className="mt-1 block w-full h-[40px] border-[0.5px]  pl-3 rounded-[5px] focus:outline-none text-[#969696] bg-[#FBFBFF]  border-[#D8D8E2] "
                                name="password"
                                onChange={handleChange}
                                value={values.password}
                                id="password"
                                type={!showPassword ? "password" : "text"}
                                placeholder=""
                              />
                              <button
                                type="button"
                                // role="button"
                                aria-label="show password"
                                title=" show password"
                                onClick={() =>
                                  setShowPassword(() => !showPassword)
                                }
                                className={`absolute right-4 top-12`}
                              >
                                {!showPassword ? (
                                  <AiOutlineEyeInvisible className="" />
                                ) : (
                                  <AiOutlineEye className="" />
                                )}
                              </button>
                            </div>
                            <p className="text-red-700 text-xs mt-1 ">
                              <ErrorMessage name="password" />
                            </p>
                          </div>
                          <div className=" mb-3 w-full relative">
                            <label
                              className=" text-[#2B2C2B] text-[12px] font-[400] "
                              htmlFor="password_confirmation"
                            >
                              Confirm Password
                            </label>
                            <div>
                              <Field
                                className="mt-1 block w-full h-[40px] border-[0.5px]  pl-3 rounded-[5px] focus:outline-none text-[#969696] bg-[#FBFBFF]  border-[#D8D8E2] "
                                name="password_confirmation"
                                id="password_confirmation"
                                onChange={handleChange}
                                value={values.password_confirmation}
                                type={!confirmPassword ? "password" : "text"}
                                placeholder=""
                              />
                              <button
                                type="button"
                                // role="button"
                                aria-label="show password"
                                title=" show password"
                                onClick={() =>
                                  setShowConfirmPassword(() => !confirmPassword)
                                }
                                className={`absolute right-4 top-12`}
                              >
                                {!confirmPassword ? (
                                  <AiOutlineEyeInvisible className="" />
                                ) : (
                                  <AiOutlineEye className="" />
                                )}
                              </button>
                            </div>
                            <p className="text-red-700 text-xs mt-1 ">
                              <ErrorMessage name="password_confirmation" />
                            </p>
                          </div>
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

export default PersonalSignup;
