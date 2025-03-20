import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import { FaArrowRight } from "react-icons/fa";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { UserApis } from "../../apis/userApi/userApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../../reducer/loginSlice";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import CountryPhoneInput from "./CountryPhoneInput"; // Import the new component

const images = [
  "/images/auth/authImage1.svg",
  "/images/auth/authImage2.svg",
  "/images/auth/authImage3.svg",
]; // Add more images as needed

const PersonalSignup = () => {
  const [index, setIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds
  
    return () => clearInterval(interval);
  }, []);
    
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

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
    phone_number: Yup.string()
      .required("Phone number is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character (@, $, !, %, *, ?, &)"
      )
      .required("Password is required"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("Confirm Password is required"),
  });
  
  const isValidEmail = (email:any) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
  const onSubmit = async (
    values:any,
    { setSubmitting }:any
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
      if (response?.status === 200) {
        dispatch(
          login({
            email: values.email,
          })
        );

        toast.success("Signup Successful");
        navigate("/auth/verify-email");
      } else {
        toast.error(response?.data?.errors?.message);
      }
    } catch (error:any) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <div>
      <div className="p-8">
        <div className="grid md:grid-cols-2 ">
          <div className="h-screen md:block hidden relative overflow-hidden">
            <AnimatePresence>
              <motion.img
                key={images[index]} // Ensure smooth transition
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

          <div className="md:block flex ">
            <div className=" pt-10  px-5">
              <div className="">
<div className="flex justify-center">

                <a href="https://myappspace.net/" rel="noreferrer" target="_blank">
                  <img
                    src="/images/auth/MyAppspace (3).png"
                    className="w-[170px] h-full"
                    alt="Logo"
                  />
                </a>
                </div>
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
                  {({ values, isSubmitting, handleChange, errors, touched, setFieldValue }) => (
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
                              className="mt-1 block w-full h-[40px] border-[0.5px]  pl-3 rounded-[5px] focus:outline-none text-sm bg-[#FBFBFF]  border-[#D8D8E2] "
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
                              className="mt-1 block w-full h-[40px] border-[0.5px]  pl-3 rounded-[5px] focus:outline-none text-sm bg-[#FBFBFF]  border-[#D8D8E2] "
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
                              className="mt-1 block w-full h-[40px] border-[0.5px]  pl-3 rounded-[5px] focus:outline-none text-sm bg-[#FBFBFF]  border-[#D8D8E2] "
                              name="email"
                              type="email"
                              id="email"
                              onChange={handleChange}
                              value={values.email}
                              placeholder="Email Address"
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
                            {/* Replace the original phone input with the new component */}
                            <CountryPhoneInput
                              name="phone_number"
                              value={values.phone_number}
                              onChange={(e:any) => setFieldValue('phone_number', e.target.value)}
                              error={touched.phone_number && errors.phone_number}
                            />
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
                                className="mt-1 block w-full h-[40px] border-[0.5px]  pl-3 rounded-[5px] focus:outline-none text-sm bg-[#FBFBFF]  border-[#D8D8E2] "
                                name="password"
                                onChange={handleChange}
                                value={values.password}
                                id="password"
                                type={!showPassword ? "password" : "text"}
                                placeholder="Password"
                              />
                              <button
                                type="button"
                                aria-label="show password"
                                title="show password"
                                onClick={() => setShowPassword(!showPassword)}
                                className={`absolute right-4 top-[40px]`}
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
                                className="mt-1 block w-full h-[40px] border-[0.5px]  pl-3 rounded-[5px] focus:outline-none text-sm bg-[#FBFBFF]  border-[#D8D8E2] "
                                name="password_confirmation"
                                id="password_confirmation"
                                onChange={handleChange}
                                value={values.password_confirmation}
                                type={!confirmPassword ? "password" : "text"}
                                placeholder="Confirm Password"
                              />
                              <button
                                type="button"
                                aria-label="show password"
                                title="show password"
                                onClick={() => setShowConfirmPassword(!confirmPassword)}
                                className={`absolute right-4 top-[40px]`}
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
                      <p className="flex items-center justify-center gap-x-1 text-[#1A1A1A] text-[16px] md:text-[18px] font-normal">
                        Already have an account?
                        <Link
                          to="/"
                          className="text-secondary underline font-bold hover:underline"
                        >
                          Login Here
                        </Link>
                      </p>
                      <div className="flex justify-center items-end h-full">
                        <button
                          type="submit"
                          disabled={isSubmitting || 
                            values.first_name === "" ||
                            !isValidEmail(values.email) ||
                            values.last_name === "" || 
                            values.email === "" || 
                            values.phone_number === "" || 
                            (values.password !== values.password_confirmation)}
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
              <p className="text-center text-sm text-[#1A1A1A] mt-4">
                By signing up, you agree to our
                <a href="https://myappspace.net/terms-and-condition" rel="noopener noreferrer" target="_blank" className="text-secondary underline font-bold hover:underline mx-1">
                  Terms & Conditions
                </a>
                and
                <a href="https://myappspace.net/privacy-policy" rel="noopener noreferrer" target="_blank" className="text-secondary underline font-bold hover:underline mx-1">
                  Privacy Policy
                </a>.
              </p>
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