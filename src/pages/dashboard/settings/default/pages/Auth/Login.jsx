import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { NavLink } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from '../../../../../features/hooks/useAuth';

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const { loginUser, authLoading } = useAuth();


  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: Yup.object({
      login: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      await loginUser(values);
    },
  });

  return (
    <div className='w-full max-w-sm'>
      {/* Welcome Greeting and subtitle */}
      <div className='flex flex-col items-center justify-center mb-2 space-y-1 text-center'>
        <h1 className='text-2xl text-blue-500 font-quicksand font-bold'>Welcome to Mart!</h1>
        <h2 className='text-lg font-outfit font-thin'>Sign in to your account</h2>
      </div>

      {/* Login Form */}
      <form className='w-full p-4 rounded-lg' onSubmit={formik.handleSubmit}>
        {/* Email Field */}
        <div className='form-group flex flex-col gap-1.5 pb-5'>
          <label htmlFor="" className='text-sm font-lato font-normal'>Email</label>
          <input
            type='email'
            id='login' 
            name='login'
            placeholder='yourid@mail.com'
            className={`h-[45px] focus:outline-none border text-sm w-full bg-inputBg rounded-lg px-5 ${
              formik.touched.login && formik.errors.login ? 'border-red-500' : ''
            }`}
            value={formik.values.login}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />

          {formik.touched.login && formik.errors.login && (
            <span className='text-red-500 text-xs'>{formik.errors.login}</span>
          )}
        </div>

        {/* Password Field with Show/Hide Toggle */}
        <div className='form-group flex flex-col gap-1.5 pb-3'>
          <label htmlFor="" className='text-sm font-lato font-normal'>Password</label>
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

        {/* Remember Me Checkbox and Forgot Password Link */}
        <div className='flex items-center pt-1 justify-between'>
          <div className='flex items-center'>
            <input
              type='checkbox'
              id='rememberMe'
              name='rememberMe'
              checked={formik.values.rememberMe}
              onChange={formik.handleChange}
              className='mr-2'
            />
            <label htmlFor='rememberMe' className='text-xs'>Remember me</label>
          </div>
          <NavLink to='/forgot-password' className='text-xs text-blue-500 hover:underline'>Forgot password?</NavLink>
        </div>

        {/* Login Button */}
        <button
          type='submit'
          className='mt-4 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300'
        >
          Login
        </button>
      </form>

      {/* Sign Up Link */}
      <div className='text-center'>
        <p className='text-sm'>Don't have an account yet? <NavLink to='/register' className='text-blue-500 hover:underline'>Sign up</NavLink></p>
      </div>
    </div>
  );
}

export default Login;
