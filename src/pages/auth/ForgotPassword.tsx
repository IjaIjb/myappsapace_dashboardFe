import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserApis } from '../../apis/userApi/userApi';
import { NavLink } from 'react-router-dom';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight } from 'react-icons/fa';

const images = [
  "/images/auth/authImage1.svg",
  "/images/auth/authImage2.svg",
  "/images/auth/authImage3.svg",
]; // Add more images as needed

const ForgotPassword = () => {
    const [index, setIndex] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000); // Change image every 3 seconds
  
      return () => clearInterval(interval);
    }, []);

    const navigate = useNavigate();


  const [userData, setUserdata] = useState({
    'email': "",
  });
  
  // const [timer, setTimer] = useState(60);
  
  const [loader, setLoader] = React.useState<any>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserdata({ ...userData, [name]: value });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true)
    const formData = new FormData()
    formData.append('email', userData?.email)
    UserApis.forgotPassword(formData).then(
      (response:any) => {
        // console.log(response)
        if (response?.data) {
         
            // console.log(response)
            const newTimerValue = 60;
            // setTimer(newTimerValue);
            localStorage.setItem('resendOTPTimer', String(Math.floor(Date.now() / 1000) + newTimerValue));
            localStorage.setItem('OTPEmail', userData?.email);

            toast.success(response?.data?.message || "OTP Sent Successfully");
            
            navigate('/otp-verify');
            setLoader(false)
          // }
        } 
        toast.warn(response?.data?.message || "error occured");
          setLoader(false)

        // toast.success(response?.data?.message);
      }
    ).catch(function (error) {
      setLoader(false)
      toast.warn('Invalid Credentials');
      console.log(error.response.data);
      // toast.error("Offfline");
    }).finally(() => {
      setLoader(false)
      // toast.error("No Internet Connection");

    });
  }
  return (
    <>
    {/* <!-- Start block --> */}
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

    <section className="bg-[#FBFBFB] min-h-screen pt-16 pb-32 ">
      <div className="container flex flex-col md:justify-center mx-auto items-center rounded-lg p-6 md:max-w-3xl">

        <div>
          <div className='flex justify-center'>
          <a href="https://myappspace.net/" rel="noreferrer" target="_blank">
            <img
              src="/images/auth/MyAppspace (3).png"
              className="w-[170px] h-full"
              alt="Logo"
            />
            </a>
          </div>
          <h1 className="mt-6 text-[#000] lg:text-[32px] text-[28px] font-semibold text-center"> Forgot Password?</h1>
          <p className='mt-4 text-center text-[#00000080] text-[14px] font-normal'> No worries, we’ll send you reset instructions.</p>
        </div>


        <div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col lg:flex-row lg:justify-between max-w-screen-xl mx-auto  mt-5">
              <div className="relative flex flex-col min-w-0 break-words w-full  ">
                <div className="flex-auto   py-10 pt-0">
                  <div className="flex flex-wrap ">
                    <div className="w-full lg:w-12/12 ">
                      <div className="relative w-full mb-6">
                        <label className="block mb-2 text-sm font-semibold text-[#414143]">
                          Email Address*
                        </label>
                        <input
                          type="email"
                          className="bg-[#FBFBFB] border border-[#00000040] text-[#333333] text-sm rounded-[7px] block w-full p-2 placeholder:text-[#00000040] placeholder:text-[12px]  ease-linear transition-all duration-150"
                          placeholder="Enter Email"
                          name="email"

                          required
                          onChange={handleChange}

                        />
                      </div>
                    </div>
                    <div className="flex justify-center items-end mt-3 w-full">
                    <button
                      type="submit"
                      disabled={loader}
                      className={`disabled:bg-gray-500  flex gap-2 items-center py-2 w-fit px-6 bg-secondary text-white rounded-full  hover:bg-secondary/[70%]
                        }`}
                      >
                     {loader ? <LoadingSpinner /> : "Reset Password"}
                      {!loader && <FaArrowRight />}


                    </button>
                    </div>

                    <NavLink to={"/"} className="flex justify-center">
                      {/* <SvgElement type={icontypesEnum.BARS} /> */}
                      <p className="text-center text-xs font-semibold text-[#027DCB] mt-1">

                        Back to login

                      </p>
                    </NavLink>

                  </div>
                </div>
              </div>
            </div>

          </form>
        </div>

      </div>
    </section>
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
      pauseOnHover />

    {/* <!-- End block --> */}
  </>
  )
}

export default ForgotPassword