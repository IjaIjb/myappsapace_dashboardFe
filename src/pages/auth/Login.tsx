import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { FaArrowRight } from "react-icons/fa";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { UserApis } from "../../apis/userApi/userApi";
// import { AxiosResponse } from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { login } from "../../reducer/loginSlice";
import { motion, AnimatePresence } from "framer-motion";
import { authService } from "../../apis/live/login";

const images = [
  "/images/auth/authImage1.svg",
  "/images/auth/authImage2.svg",
  "/images/auth/authImage3.svg",
]; // Add more images as needed

const Login = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch: Dispatch = useDispatch();

  const initialData = {
    login: "",
    password: "",
  };

  const validation = Yup.object({
    login: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
  });

  const onSubmit = async (
    values: { login: string; password: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const data:any = JSON.stringify({
        login: values.login,
        password: values.password,
      });
  
      const response: any = await authService.login(data);
  console.log(response)
      if (response?.data) {
        // if (response?.data?.status === true) {
          const accessToken = response.data.data.token.access_token;
          dispatch(
            login({
              login: values.login,
              token: response.data.data.token.access_token,
              id: response.data.data.id,
              data: response?.data.data.user,
            })
          );
          // Store token in localStorage to persist login
          localStorage.setItem("token", accessToken);
          localStorage.removeItem("selectedStore");
  
          toast.success(response?.data?.message);
          navigate("/dashboard/home");
        // } else {
        //   // Display the error message from the response
        //   toast.error(response?.data?.message || "Invalid Login Credentials");
        // }
      } else if (response === "Unauthorized") {
        dispatch(
          login({
            email: values.login,
          })
        );
        navigate("/auth/verify-email");
      } else {
        toast.error(response || "An error occurred. Please try again.");
      }
    } catch (error: any) {
      console.error("Error during login:", error);
      toast.error(error || "An error occurred. Please try again.");
      
      // Check if the error response contains data
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Login failed. Please try again.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };
  

  // const onSubmit = async () => {
  //   console.log("hhh");
  //   navigate("/auth/verify-email");

  //   window.scrollTo(0, 0); // Scroll to top
  // };

  return (
    <div>
      <div className="p-8">
        <div className="grid lg:grid-cols-2 ">
        
              <div className="h-screen lg:block hidden relative overflow-hidden">
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

          <div className="lg:block flex ">
            <div className=" pt-10  lg:px-5">
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
                  {({ isSubmitting, setFieldValue }) => (
                    <Form className="w-full  mb-6 flex flex-col justify-between">
                      <div className="">
                        <div className="flex gap-3">
                          <div className=" mb-5 w-full relative">
                            <label
                              className=" text-[#2B2C2B] text-[12px] font-[400] "
                              htmlFor="login"
                            >
                              Email Address
                            </label>
                            <Field
                              className="mt-1 block w-full h-[40px] border-[0.5px]  pl-3 rounded-[5px] focus:outline-none text-sm bg-[#FBFBFF]  border-[#D8D8E2] "
                              name="login"
                              type="login"
                              id="login"
                              placeholder=""
                        
                            />
                            <p className="text-red-700 text-xs mt-1 ">
                              <ErrorMessage name="login" />
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
                                className="mt-1 block w-full h-[40px] border-[0.5px]  pl-3 rounded-[5px] focus:outline-none text-sm bg-[#FBFBFF]  border-[#D8D8E2] "
                                name="password"
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
                        </div>
<div className="flex justify-end">
<Link to={"/forgot-password"} className="mt-1 text-right">
                    <p className="text-[#000] text-sm font-semibold">Forgot Password?</p>
                  </Link>
</div>
                        <p className="flex items-center justify-center gap-x-1 text-[#1A1A1A] text-[16px] lg:text-[18px] font-normal">
                          Don&apos;t have an account yet?
                          <Link
                            to="/auth/signup"
                            className="text-secondary underline font-bold hover:underline"
                          >
                            Register Here
                          </Link>
                        </p>
                      </div>

                      <div className="flex justify-center items-end mt-3 h-full">
                        <button
                          type="submit"
                          // onClick={onSubmit}
                          disabled={isSubmitting} // Disable button if no option is selected
                          className={`disabled:bg-gray-500  flex gap-2 items-center py-2 w-fit px-6 bg-secondary text-white rounded-full  hover:bg-secondary/[70%]
}`}
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
  <a href="https://myappspace.net/terms-and-condition"  rel="noopener noreferrer" target="_blank" className="text-secondary underline font-bold hover:underline mx-1">
    Terms & Conditions
  </a>
  and
  <a href="https://myappspace.net/privacy-policy"  rel="noopener noreferrer" target="_blank"  className="text-secondary underline font-bold hover:underline mx-1">
    Privacy Policy
  </a>.
</p>
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
    </div>
  );
};

export default Login;
