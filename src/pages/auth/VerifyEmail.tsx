import React, { useRef, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa';
import { UserApis } from '../../apis/userApi/userApi';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { login } from '../../reducer/loginSlice';

const VerifyEmail = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [code, setCode] = useState(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const dispatch: Dispatch = useDispatch();


  // const email  = "ijabolu@gmail.com"; // Assumes email is stored in Redux state
  const { email } = useSelector((state: any) => state?.data?.login.value); // Assumes email is stored in Redux state
  const navigate = useNavigate();

// console.log(email)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Move focus to the next input if exists
      if (index < 5 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (value === "") {
      // Allow backspace to delete and focus previous input
      const newCode = [...code];
      newCode[index] = "";
      setCode(newCode);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && code[index] === "") {
      // Move focus to the previous input
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    // Combine the 6 inputs into a single verification code
    const verificationCode = code.join(""); // Assuming `code` is the state managing the 6 inputs
  
    if (verificationCode.length !== 6) {
      toast.error("Please enter a complete 6-digit code.");
      setIsSubmitting(false);
      return;
    }
  
    try {
      const response: any = await UserApis.verifyMail({ email, code: verificationCode });
  // console.log(response)
      if (response?.data) {
            dispatch(
                    login({
                      login: response.data.data.user.email,
                      token: response.data.data.token.access_token,
                      id: response.data.data.id,
                      data: response?.data.data.user,
                    })
                  );
        toast.success(response?.message || "Email verified successfully!");
        // navigate("/auth/kyc"); // Navigate to the next page
        navigate("/auth/add-store"); // Navigate to the next page
      } else {
        toast.error(response?.message || "Invalid verification code. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  const resendCode = async () => {
    try {
      const response:any = await UserApis.resendVerificationCode({ email });

      if (response) {
        // console.log(":Verified", response.data);

        toast.success(response?.data?.message || "Verification code resent successfully!");
        // navigate("/auth/add-store");
    
      } else {
        toast.error(response?.message || "Failed to resend the verification code.");
      }
    } catch (error) {
      console.error("Error resending code:", error);
      toast.error("An error occurred. Please try again.");
    }
  };
    
  return (
    <div>
        <div className='flex justify-center'>
<form onSubmit={handleSubmit} className='mt-10'>
    <div className='flex justify-center'>
    <a href="https://myappspace.net/" rel="noreferrer" target="_blank">
            <img
              src="/images/auth/MyAppspace (3).png"
              className="w-[170px] h-full text-center"
              alt="Logo"
            />
            </a>
</div>
<div className='mt-[60px]'>
<h4 className='text-[#000000] text-[24px] font-[700] text-center'>Verify email</h4>
<h4 className='text-[#969696] text-[16px] font-[500] text-center'>Please check your  mail for a code and input the code here to proceed</h4>
</div>

<div className='mx-10 my-10'>
    <hr />
</div>

<div className="flex flex-col items-center p-4 ">
      <h2 className="text-black font-bold text-lg mb-4">Verification Code</h2>
      <div className="flex gap-2 mb-4">

      {/* <input
              type="text"
              id="verificationCode"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            /> */}
        {code.map((digit, index) => (
          <input
            key={index}
            id={`code-input-${index}`}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ref={(el) => (inputRefs.current[index] = el)}
             />
        ))}
      </div>
      <button
         onClick={resendCode}
          className="text-blue-600 font-medium hover:underline"
        >
          Resend verification code
        </button>
      {/* {timer > 0 ? (
        <p className="text-red-600 text-sm">
          Resend verification code ({timer}s)
        </p>
      ) : (
        <button
          onClick={() => setTimer(30)}
          className="text-blue-600 font-medium hover:underline"
        >
          Resend verification code
        </button>
      )} */}
    </div>

    <div className="flex justify-center mt-10">
    <button
            type="submit"
            // onClick={handleSubmit}
            disabled={isSubmitting}
                        className={`disabled:bg-gray-500  flex gap-2 items-center py-2 w-fit px-6 bg-secondary text-white rounded-full  hover:bg-secondary/[70%]
}`}
                      >
               Proceed
                      <FaArrowRight />
                      </button>
                    </div>
</form>
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
  )
}

export default VerifyEmail