import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDynamicData } from '../../../../../features/hooks/useDynamicData';
import { NavLink, useNavigate } from 'react-router-dom';
import ApiService from '../../../../../services/ApiService';
import { responseCatcher } from '../../../../../services/response';
import { useLoading } from '../../../../../features/hooks/useLoading';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import useAuth from '../../../../../features/hooks/useAuth';


function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { dynamicData } = useDynamicData();
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);
  const api = new ApiService();
  const { setLoading } = useLoading();

  const { resendResetPasswordToken } = useAuth();

  useEffect(() => {
    if (!dynamicData?.resetPassword?.email) {
      navigate('/forgot-password');
    }
  }, [dynamicData, navigate]);

  const verifyToken = async (token) => {
    try {
        setLoading(true);
        const payload = {
            token: token,
            email: dynamicData?.resetPassword?.email,
        };
        const verifyTokenRaw = await api.postWithOutToken("/{store_code}/auth/verify-token", payload);
        toast.success(verifyTokenRaw.message)
        setIsVerified(true);
    } catch (error) {
        responseCatcher(error);
    } finally {
        setLoading(false);
    }
  };

  const resetPassword = async (values) => {
    try {
        setLoading(true);
        const resetPasswordRaw = await api.postWithOutToken("/{store_code}/auth/reset-password", values);
        toast.success(resetPasswordRaw.message);
        navigate('/login');
    } catch (error) {
        responseCatcher(error);
    } finally {
        setLoading(false);
    }
  };


  // Track resend delay using localStorage
    const [resendPassTokenDelay, setResendPassTokenDelay] = useState(() => {
      return parseInt(localStorage.getItem('resendPassTokenDelay')) || 30; // Start at 30s
    });
    const [isResendPassTokenDisabled, setIsResendPassTokenDisabled] = useState(false);
  
    useEffect(() => {
      if (isResendPassTokenDisabled) {
        const interval = setInterval(() => {
          setResendPassTokenDelay((prev) => {
            if (prev > 1) return prev - 1;
            clearInterval(interval);
            setIsResendPassTokenDisabled(false);
            return 0;
          });
        }, 1000);
        return () => clearInterval(interval);
      }
    }, [isResendPassTokenDisabled]);
  
    const handleResendToken = async () => {
      try {
        setIsResendPassTokenDisabled(true);
        await resendResetPasswordToken({ email: dynamicData?.resetPassword?.email });
  
        const newDelay = resendPassTokenDelay * 2; // Increase delay (e.g., 30s → 60s → 120s)
        localStorage.setItem('resendPassTokenDelay', newDelay);
        setResendPassTokenDelay(newDelay);
      } catch (error) {
        console.error('Resend Token Error:', error);
      }
    };

  const formik = useFormik({
    initialValues: {
      token: ['', '', '', '', '', ''],
      email: dynamicData?.resetPassword?.email || '',
      password: '',
      password_confirmation: ''
    },
    validationSchema: Yup.object({
      token: Yup.array()
        .of(Yup.string().matches(/^[0-9]$/, 'Must be a single digit'))
        .length(6, 'Must be exactly 6 digits'),
      password: isVerified ? Yup.string().min(6, 'Must be at least 6 characters').required('Required') : Yup.string(),
      password_confirmation: isVerified
        ? Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required')
        : Yup.string(),
    }),
    onSubmit: async (values) => {
        if (!isVerified) {
          const verificationToken = values.token.join('');
          await verifyToken(verificationToken);
        } else {
          await resetPassword({ 
            email: values.email, 
            password: values.password,
            password_confirmation: values.password_confirmation, // ✅ Ensure it's included
            token: values.token.join('') // ✅ Send token for verification
          });
        }
    },
      
  });

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newToken = [...formik.values.token];
      newToken[index] = value;
      formik.setFieldValue('token', newToken);

      if (value && index < 5) {
        document.getElementById(`token-${index + 1}`).focus();
      }

      if (newToken.every(digit => digit !== '')) {
        setTimeout(() => formik.submitForm(), 100);
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
        <h1 className='text-2xl text-blue-500 font-quicksand font-bold'>Reset Password</h1>
        <h2 className='text-lg font-outfit font-thin'>{isVerified ? 'Enter new password' : 'Enter your reset token'}</h2>
      </div>

      <form className='w-full p-6 bg-white rounded-lg' onSubmit={formik.handleSubmit}>
        <div className="sectionEmail py-3">
          <p className='text-lg font-quicksand'>Hi <span className='font-semibold'>{dynamicData?.resetPassword?.email}</span></p>
        </div>

        {!isVerified && (
            <>
                <div className='form-group flex justify-center gap-2 pb-5'>
                    {formik.values.token.map((digit, index) => (
                    <input
                        key={index}
                        id={`token-${index}`}
                        type='text'
                        maxLength='1'
                        className='w-12 h-12 text-center text-xl border rounded-lg focus:outline-none border-gray-300'
                        value={digit}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                    ))}
                </div>

                <div className='flex justify-center space-x-1 items-center'>
                    <p className='text-sm font-outfit'>Didn't receive the code? </p>
                    <NavLink 
                        onClick={handleResendToken}
                        disabled={isResendPassTokenDisabled} 
                        className={`text-sm font-medium transition ${
                            isResendPassTokenDisabled ? 'text-gray-300 cursor-not-allowed' : 'text-blue-500 hover:text-blue-600'
                        }`}
                    >
                        {isResendPassTokenDisabled ? `Resend Code in ${resendPassTokenDelay}s` : 'Resend Code'}
                    </NavLink>
                </div>
            </>
        )}

        {isVerified && (
          <>
            <div className='form-group flex flex-col gap-1.5 pb-3'>
                <label htmlFor="password" className='text-sm font-lato font-normal'>Password</label>
                <div className='relative'>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id='password'
                        name='password'
                        placeholder='Enter your password'
                        className={`h-[45px] focus:outline-none border text-sm w-full bg-inputBg rounded-lg px-5 pr-10 ${
                            formik.touched.password && formik.errors.password ? 'border-red-500' : ''
                        }`}
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    />
                    {/* Eye Icon for Toggling Password Visibility */}
                    <div
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500'
                    >
                        {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                    </div>
                </div>

                {formik.touched.password && formik.errors.password && (
                    <span className='text-red-500 text-xs'>{formik.errors.password}</span>
                )}
            </div>
            
            
            <div className='form-group flex flex-col gap-1.5 pb-3'>
                <label htmlFor="password_confirmation" className='text-sm font-lato font-normal'>Confirm Password</label>
                <div className='relative'>
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id='password_confirmation'
                        name='password_confirmation'
                        placeholder='Confirm password'
                        className={`h-[45px] focus:outline-none border text-sm w-full bg-inputBg rounded-lg px-5 pr-10 ${
                            formik.touched.password_confirmation && formik.errors.password_confirmation ? 'border-red-500' : ''
                        }`}
                        value={formik.values.password_confirmation}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    />
                    {/* Eye Icon for Toggling Password Visibility */}
                    <div
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className='absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500'
                    >
                        {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                    </div>
                </div>

                {formik.touched.password_confirmation && formik.errors.password_confirmation && (
                    <span className='text-red-500 text-xs'>{formik.errors.password_confirmation}</span>
                )}
            </div>
          </>
        )}

        <button
          type='submit'
          className='mt-4 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300'
        >
          {isVerified ? 'Reset Password' : 'Verify Token'}
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
