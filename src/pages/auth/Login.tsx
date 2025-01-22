import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { FaArrowRight } from "react-icons/fa";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { UserApis } from "../../apis/userApi/userApi";
import { AxiosResponse } from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { login } from "../../reducer/loginSlice";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const history = useHistory();
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
      const data = JSON.stringify({
        login: values.login,
        password: values.password,
      });
  
      const response: AxiosResponse<any> = await UserApis.login(data);
  
      if (response?.data) {
        console.log(response.data)
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
  
          toast.success(response?.data?.message);
          history.push("/dashboard/home");
          // window.scrollTo(0, 0); // Scroll to top
        } else {
        console.log(response.data)

          toast.error("Invalid Login Credentials");
        }
      }
    } catch (error:any) {
      console.error("Error during login:", error.response?.data || error);
      toast.error("An error occurred. Please try again.");
    } finally {
      
      setSubmitting(false);
    }
  };
  

  // const onSubmit = async () => {
  //   console.log("hhh");
  //   history.push("/auth/verify-email");

  //   window.scrollTo(0, 0); // Scroll to top
  // };

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
                              className="mt-1 block w-full h-[40px] border-[0.5px]  pl-3 rounded-[5px] focus:outline-none text-[#969696] bg-[#FBFBFF]  border-[#D8D8E2] "
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
                                className="mt-1 block w-full h-[40px] border-[0.5px]  pl-3 rounded-[5px] focus:outline-none text-[#969696] bg-[#FBFBFF]  border-[#D8D8E2] "
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
                        </div>

                        <p className="flex items-center justify-center gap-x-1 text-[#1A1A1A] text-[16px] md:text-[18px] font-normal">
                          Don&apos;t have an account yet?
                          <Link
                            to="/auth/signup"
                            className="text-secondary underline font-bold hover:underline"
                          >
                            Register Here
                          </Link>
                        </p>
                      </div>

                      <div className="flex justify-end items-end h-full">
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
