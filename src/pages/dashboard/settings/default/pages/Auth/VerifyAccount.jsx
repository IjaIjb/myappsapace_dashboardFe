import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDynamicData } from '../../../../../features/hooks/useDynamicData';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../../../../features/hooks/useAuth';

function VerifyAccount() {
  const { dynamicData } = useDynamicData();
  const navigate = useNavigate();
  const { verifyAccount, resendVerificationToken } = useAuth(); // Assume resendVerificationToken is available

  // Redirect to login if email is not set
  useEffect(() => {
    if (!dynamicData?.register?.email) {
      navigate('/login'); 
    }
  }, [dynamicData, navigate]);

  // Track resend delay using localStorage
  const [resendDelay, setResendDelay] = useState(() => {
    return parseInt(localStorage.getItem('resendDelay')) || 30; // Start at 30s
  });
  const [isResendDisabled, setIsResendDisabled] = useState(false);

  useEffect(() => {
    if (isResendDisabled) {
      const interval = setInterval(() => {
        setResendDelay((prev) => {
          if (prev > 1) return prev - 1;
          clearInterval(interval);
          setIsResendDisabled(false);
          return 0;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isResendDisabled]);

  const handleResendToken = async () => {
    try {
      setIsResendDisabled(true);
      await resendVerificationToken({ email: dynamicData?.register?.email });

      const newDelay = resendDelay * 2; // Increase delay (e.g., 30s → 60s → 120s)
      localStorage.setItem('resendDelay', newDelay);
      setResendDelay(newDelay);
    } catch (error) {
      console.error('Resend Token Error:', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      token: ['', '', '', '', '', ''],
      email: dynamicData?.register?.email || '',
    },
    validationSchema: Yup.object({
      token: Yup.array()
        .of(Yup.string().matches(/^[0-9]$/, 'Must be a single digit'))
        .length(6, 'Must be exactly 6 digits'),
    }),
    onSubmit: async (values) => {
      const verificationToken = values.token.join('');
      const payload = {
        code: verificationToken,
        email: values.email, // Ensure email is sent in the request
      };

      await verifyAccount(payload);
      console.log('Verification Payload:', payload);
    },
  });

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newToken = [...formik.values.token];
      newToken[index] = value;
      formik.setFieldValue('token', newToken);

      // Move focus to the next input if not the last one
      if (value && index < 5) {
        document.getElementById(`token-${index + 1}`).focus();
      }

      // Auto-submit if all digits are entered
      if (newToken.every(digit => digit !== '')) {
        setTimeout(() => formik.submitForm(), 100); // Small delay to ensure state updates
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !formik.values.token[index] && index > 0) {
      document.getElementById(`token-${index - 1}`).focus();
    }
  };

  return (
    <div className='w-full max-w-sm'>
      <div className='flex flex-col items-center justify-center mb-2 space-y-1 text-center'>
        <h1 className='text-2xl text-blue-500 font-quicksand font-bold'>Verify Account!</h1>
        <h2 className='text-lg font-outfit font-thin'>Enter your verification token</h2>
      </div>

      <form className='w-full p-6 bg-white rounded-lg' onSubmit={formik.handleSubmit}>
        <div className="sectionEmail py-3">
          <p className='text-lg font-quicksand'>Hi <span className='font-semibold'>{dynamicData?.register?.email}</span></p>
        </div>
        <div className='form-group flex justify-center gap-2 pb-5'>
          {formik.values.token.map((digit, index) => (
            <input
              key={index}
              id={`token-${index}`}
              type='text'
              maxLength='1'
              className={`w-12 h-12 text-center text-xl border rounded-lg focus:outline-none ${
                formik.errors.token ? 'border-red-500' : 'border-gray-300'
              }`}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>

        {formik.errors.token && (
          <span className='text-red-500 text-xs'>Enter all 6 digits</span>
        )}

        <button
          type='submit'
          className='mt-4 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300'
        >
          Verify Account
        </button>
      </form>

      {/* Resend Token Section */}
      <div className='flex justify-center space-x-1 items-center'>
        <p className='text-sm font-outfit'>Didn't receive the code? </p>
        <NavLink 
            onClick={handleResendToken}
            disabled={isResendDisabled} 
            className={`text-sm font-medium transition ${
                isResendDisabled ? 'text-gray-300 cursor-not-allowed' : 'text-blue-500 hover:text-blue-600'
            }`}
        >
          {isResendDisabled ? `Resend Code in ${resendDelay}s` : 'Resend Code'}
        </NavLink>
      </div>

    </div>
  );
}

export default VerifyAccount;
