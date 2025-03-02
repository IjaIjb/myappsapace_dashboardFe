import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye, FaArrowRight } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { UserApis } from '../../apis/userApi/userApi';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const OTPVerify = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [timer, setTimer] = useState(0);
    const [isValidEmail, setIsValidEmail] = useState(false);
  const [loader, setLoader] = React.useState<any>(false);

  const [passwordError, setPasswordError] = useState("");
    const [userData, setUserdata] = useState({
      'one': "",
      'two': "",
      'three': "",
      'four': "",
      'five': "",
      'six': "",
      'email': "",
      'password': "",
      'confirm_password': ""
    });
  
    useEffect(() => {
      // Check if OTPEmail is set
      const OTPEmail = localStorage.getItem('OTPEmail');
      if (!OTPEmail) {
        // Redirect to forgot-password if OTPEmail is not set
        navigate('/forgot-password');
      } else {
        // Auto display the email and make the input read-only
        setUserdata((prevData) => ({ ...prevData, email: OTPEmail }));
        validateEmail(OTPEmail); // Set the email as valid
      }
  
      const storedTime = localStorage.getItem('resendOTPTimer');
      if (storedTime) {
        const remainingTime = Math.max(0, Number(storedTime) - Math.floor(Date.now() / 1000));
        setTimer(remainingTime);
      }
    }, [navigate]);
  
    useEffect(() => {
      if (timer > 0) {
        const interval = setInterval(() => {
          setTimer(prev => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
      }
    }, [timer]);
    
    const validateEmail = (email:any) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsValidEmail(emailRegex.test(email));
  };

  const validatePassword = (password:any, confirmPassword:any) => {
      const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!strongPasswordRegex.test(password)) {
          setPasswordError("Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
          return false;
      }
      if (password !== confirmPassword) {
          setPasswordError("Passwords do not match.");
          return false;
      }
      setPasswordError("");
      return true;
  };

  const handleChange = (e:any) => {
      const { name, value } = e.target;
      if (name === 'email') {
          validateEmail(value);
      }
      setUserdata((prevData) => {
        const updatedData = { ...prevData, [name]: value };
        if (name === 'password' || name === 'confirm_password') {
            validatePassword(updatedData.password, updatedData.confirm_password);
        }
        return updatedData;
    });
  };

  
    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!validatePassword(userData.password, userData.confirm_password)) {
        return;
    }
    setLoader(true)
      const formData = new FormData();
      formData.append('token', userData?.one + userData?.two + userData?.three + userData?.four + userData?.five + userData?.six);
      formData.append('email', userData?.email);
      formData.append('password', userData?.password);
      formData.append('password_confirmation', userData?.confirm_password);
  
      UserApis.resetPassword(formData).then(
        (response) => {
          if (response?.data && response?.status === 200) {
            // Remove OTPEmail from local storage
            localStorage.removeItem('OTPEmail');
            setLoader(false)
            
            navigate('/reset-success');
          }
        }
      ).catch(function (error) {
        setLoader(false)

        console.log(error.response.data);
      });
    };
  
    const handleResendOTP = () => {
      if (isValidEmail && timer === 0) {
        UserApis.forgotPassword({ email: userData.email }).then(
          (response) => {
            if (response?.data) {
              
              const newTimerValue = 60;
              setTimer(newTimerValue);
              localStorage.setItem('resendOTPTimer', String(Math.floor(Date.now() / 1000) + newTimerValue));
              
              toast.success('OTP resent successfully');
              console.log('OTP resent successfully');
            }
          }
        ).catch(function (error) {
          toast.error('OTP resent Failed');
          console.log(error);
        });
      }
    };
    
  return (
    <>
    
    <section className="bg-[#FBFBFB]  body-font font-poppins ">
      <div className="flex justify-center py-24">
        <div className="lg:px-24  md:w-[700px] px-5 mt-30">
          <div className="flex justify-center">
          <a href="https://myappspace.net/" rel="noreferrer" target="_blank">
            <img
              src="/images/auth/MyAppspace (3).png"
              className="w-[170px] h-full"
              alt="Logo"
            />
            </a>
         </div>
         <div className='flex justify-center'>
          <h1 className="max-w-2xl mt-6 text-3xl text-[#000000] font-semibold leading-10 md:text-3xl xl:text-4xl text-center">
            Password Reset
          </h1>
          </div>
          <p className="text-xs mt-3 text-gray-500 text-center">
            We sent a code to your Email
          </p>
          <form onSubmit={handleSubmit}>
            <div id="otp" className="flex flex-row justify-center text-center px-2 mt-5 mb-5">
              <input className="m-2 border h-14 w-12 text-center form-control focus:border-[#48B774] focus:ring-[#48B774] font-semibold text-3xl" type="text" id="first" name="one" onChange={handleChange} maxLength={1} />
              <input className="m-2 border h-14 w-12 text-center form-control focus:border-[#48B774] focus:ring-[#48B774] font-semibold text-3xl" type="text" id="second" name="two" onChange={handleChange} maxLength={1} />
              <input className="m-2 border h-14 w-12 text-center form-control focus:border-[#48B774] focus:ring-[#48B774] font-semibold text-3xl" type="text" id="third" name="three" onChange={handleChange} maxLength={1} />
              <input className="m-2 border h-14 w-12 text-center form-control focus:border-[#48B774] focus:ring-[#48B774] font-semibold text-3xl" type="text" id="fourth" name="four" onChange={handleChange} maxLength={1} />
              <input className="m-2 border h-14 w-12 text-center form-control focus:border-[#48B774] focus:ring-[#48B774] font-semibold text-3xl" type="text" id="fifth" name="five" onChange={handleChange} maxLength={1} />
              <input className="m-2 border h-14 w-12 text-center form-control focus:border-[#48B774] focus:ring-[#48B774] font-semibold text-3xl" type="text" id="sixth" name="six" onChange={handleChange} maxLength={1} />
            </div>

            <div className="mb-5">
              <label className="block mb-2 text-sm font-semibold text-[#414143]">Email</label>
              <input
                type="email"
                className="border border-[#D9D9D9] text-[#333333] text-sm rounded-lg block w-full p-3"
                placeholder="*****"
                name="email"
                required
                value={userData.email}
                readOnly
              />
            </div>

            <div className="relative mb-5">
              <label className="block mb-2 text-sm font-semibold text-[#414143]">Password</label>
              <input
                type={show ? "text" : "password"}
                className="border border-[#D9D9D9] text-[#333333] text-sm rounded-lg block w-full p-3"
                placeholder="Enter a new password"
                name="password"
                required
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-2.5 bottom-3.5"
                onClick={() => setShow((prev) => !prev)}
              >
                {!show ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="relative mb-5">
              <label className="block mb-2 text-sm font-semibold text-[#414143]">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="border border-[#D9D9D9] text-[#333333] text-sm rounded-lg block w-full p-3"
                placeholder="*****"
                name="confirm_password"
                required
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-2.5 bottom-3.5"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {!showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div>
            {passwordError && <p className="text-red-500 text-sm mb-3">{passwordError}</p>}

            </div>
            <button
              type="submit"
              disabled={userData.one === "" || userData.two === "" || userData.three === "" || userData.four === "" || userData.five === "" || userData.six === "" || userData.password !== userData.confirm_password}


              className="w-full disabled:bg-gray-500 flex justify-center gap-2 text-center items-center  text-white bg-secondary hover:bg-secondary/[70%] focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2"
            >
          {loader ? <LoadingSpinner /> : "Continue"}
                      {!loader && <FaArrowRight />}

            </button>
          </form>

          <p className="text-center text-xs font-semibold mt-4 text-gray-500">
            Didn't receive any email?{" "}
            <span
              className={`text-[#000] cursor-pointer ${timer > 0 || !isValidEmail ? "pointer-events-none opacity-50" : ""}`}
              onClick={handleResendOTP}
            >
              <span className="text-green-800">{timer > 0 ? `Resend in ${timer}s` : "Click here to resend"}</span>
            </span>
          </p>

          <NavLink to={"/"} className="flex justify-center mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <span className="text-sm font-semibold text-gray-500 hover:text-[#333333]">Back to login</span>
          </NavLink>
        </div>
      </div>
    </section>
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
  </>
  )
}

export default OTPVerify