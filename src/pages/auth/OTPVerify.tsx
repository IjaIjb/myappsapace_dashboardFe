import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye, FaArrowRight } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { UserApis } from '../../apis/userApi/userApi';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { authService } from '../../apis/live/login';

const OTPVerify = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [timer, setTimer] = useState(0);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [loader, setLoader] = React.useState<any>(false);
    const [passwordError, setPasswordError] = useState("");
    
    // Create refs for OTP input boxes
    const inputRefs = {
      one: useRef<HTMLInputElement>(null),
      two: useRef<HTMLInputElement>(null),
      three: useRef<HTMLInputElement>(null),
      four: useRef<HTMLInputElement>(null),
      five: useRef<HTMLInputElement>(null),
      six: useRef<HTMLInputElement>(null),
    };
    
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

    // Handle OTP input changes with auto-move functionality
    const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      
      // Allow only numbers
      const newValue = value.replace(/[^0-9]/g, '');
      
      // Update state with the new value
      setUserdata((prevData) => ({ ...prevData, [name]: newValue.slice(0, 1) }));
      
      // Auto-move to next input if a digit was entered
      if (newValue.length === 1) {
        // Define the input field sequence
        const inputSequence = ['one', 'two', 'three', 'four', 'five', 'six'];
        const currentIndex = inputSequence.indexOf(name);
        
        // Move to next input if not the last one
        if (currentIndex < inputSequence.length - 1) {
          const nextField = inputSequence[currentIndex + 1];
          inputRefs[nextField as keyof typeof inputRefs].current?.focus();
        }
      }
    };
    
    // Handle backspace for OTP inputs
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, fieldName: string) => {
      // If backspace is pressed and the field is empty, move to the previous field
      if (e.key === 'Backspace' && userData[fieldName as keyof typeof userData] === '') {
        const inputSequence = ['one', 'two', 'three', 'four', 'five', 'six'];
        const currentIndex = inputSequence.indexOf(fieldName);
        
        // Move to previous input if not the first one
        if (currentIndex > 0) {
          const prevField = inputSequence[currentIndex - 1];
          inputRefs[prevField as keyof typeof inputRefs].current?.focus();
        }
      }
    };
    
    // Handle paste functionality for OTP
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
      
      if (pastedData) {
        const otpArray = pastedData.split('');
        const fields = ['one', 'two', 'three', 'four', 'five', 'six'];
        
        // Create a new userData object with pasted values
        const newUserData = { ...userData };
        
        // Fill available digits from pasted content
        fields.forEach((field, index) => {
          if (index < otpArray.length) {
            newUserData[field as keyof typeof userData] = otpArray[index];
          }
        });
        
        setUserdata(newUserData);
        
        // Focus on the next empty field or the last field if all are filled
        const lastFilledIndex = Math.min(otpArray.length, fields.length) - 1;
        if (lastFilledIndex < fields.length - 1) {
          inputRefs[fields[lastFilledIndex + 1] as keyof typeof inputRefs].current?.focus();
        } else {
          inputRefs.six.current?.focus();
        }
      }
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!validatePassword(userData.password, userData.confirm_password)) {
        return;
      }
      setLoader(true);
      const formData = new FormData();
      formData.append('token', userData?.one + userData?.two + userData?.three + userData?.four + userData?.five + userData?.six);
      formData.append('email', userData?.email);
      formData.append('password', userData?.password);
      formData.append('password_confirmation', userData?.confirm_password);
  
      authService.resetPassword(formData).then(
        (response:any) => {
          console.log(response);

          if (response?.data) {
            console.log(response);
            // Remove OTPEmail from local storage
            localStorage.removeItem('OTPEmail');
            setLoader(false);
            
            navigate('/reset-success');
          } else {
            setLoader(false);
          }
        }
      ).catch(function (error) {
        setLoader(false);
        console.log(error);
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
    <section className="bg-[#FBFBFB] body-font font-poppins ">
      <div className="flex justify-center py-24">
        <div className="lg:px-24 md:w-[700px] px-5 mt-30">
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
              <input 
                className="m-2 border h-14 w-12 text-center form-control focus:border-[#48B774] focus:ring-[#48B774] font-semibold text-3xl" 
                type="text" 
                id="first" 
                name="one" 
                value={userData.one}
                onChange={handleOTPChange}
                onKeyDown={(e) => handleKeyDown(e, 'one')}
                onPaste={handlePaste}
                maxLength={1}
                ref={inputRefs.one}
                autoFocus
              />
              <input 
                className="m-2 border h-14 w-12 text-center form-control focus:border-[#48B774] focus:ring-[#48B774] font-semibold text-3xl" 
                type="text" 
                id="second" 
                name="two" 
                value={userData.two}
                onChange={handleOTPChange}
                onKeyDown={(e) => handleKeyDown(e, 'two')}
                maxLength={1}
                ref={inputRefs.two}
              />
              <input 
                className="m-2 border h-14 w-12 text-center form-control focus:border-[#48B774] focus:ring-[#48B774] font-semibold text-3xl" 
                type="text" 
                id="third" 
                name="three" 
                value={userData.three}
                onChange={handleOTPChange}
                onKeyDown={(e) => handleKeyDown(e, 'three')}
                maxLength={1}
                ref={inputRefs.three}
              />
              <input 
                className="m-2 border h-14 w-12 text-center form-control focus:border-[#48B774] focus:ring-[#48B774] font-semibold text-3xl" 
                type="text" 
                id="fourth" 
                name="four" 
                value={userData.four}
                onChange={handleOTPChange}
                onKeyDown={(e) => handleKeyDown(e, 'four')}
                maxLength={1}
                ref={inputRefs.four}
              />
              <input 
                className="m-2 border h-14 w-12 text-center form-control focus:border-[#48B774] focus:ring-[#48B774] font-semibold text-3xl" 
                type="text" 
                id="fifth" 
                name="five" 
                value={userData.five}
                onChange={handleOTPChange}
                onKeyDown={(e) => handleKeyDown(e, 'five')}
                maxLength={1}
                ref={inputRefs.five}
              />
              <input 
                className="m-2 border h-14 w-12 text-center form-control focus:border-[#48B774] focus:ring-[#48B774] font-semibold text-3xl" 
                type="text" 
                id="sixth" 
                name="six" 
                value={userData.six}
                onChange={handleOTPChange}
                onKeyDown={(e) => handleKeyDown(e, 'six')}
                maxLength={1}
                ref={inputRefs.six}
              />
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
              className="w-full disabled:bg-gray-500 flex justify-center gap-2 text-center items-center text-white bg-secondary hover:bg-secondary/[70%] focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2"
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