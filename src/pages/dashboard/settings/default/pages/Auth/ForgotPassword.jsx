import { useFormik } from 'formik';
import * as Yup from 'yup';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../../../../features/hooks/useAuth';
import { toast } from 'react-toastify';
import { useDynamicData } from '../../../../../features/hooks/useDynamicData';

function ForgotPassword() {

    const { resetPassword } = useAuth();

    const navigate = useNavigate();

    const { setDynamicDataValue } = useDynamicData();

    const formik = useFormik({
        initialValues: {
        email: '',
        },
        validationSchema: Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        }),
        onSubmit: async (values) => {
          await resetPassword(values, {
            onSuccess: (data) => {
              toast.success(data.message);
              setDynamicDataValue("resetPassword.email", values.email);
              navigate('/reset-password')
            }
          });
        },
    });

  return (
    <div className='w-full max-w-sm'>
      {/* Welcome Greeting and subtitle */}
      <div className='flex flex-col items-center justify-center mb-2 space-y-1 text-center'>
        <h1 className='text-2xl text-blue-500 font-quicksand font-bold'>Forgot Your Password?</h1>
        <h2 className='text-lg font-outfit font-thin'>Enter your email to reset</h2>
      </div>

      {/* Login Form */}
      <form className='w-full p-6 bg-white rounded-lg' onSubmit={formik.handleSubmit}>
        {/* Email Field */}
        <div className='form-group flex flex-col gap-1.5 pb-5'>
            <label htmlFor="" className='text-sm font-lato font-normal'>Email</label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='yourid@mail.com'
              className={`h-[45px] focus:outline-none border text-sm w-full bg-inputBg rounded-lg px-5 ${
                formik.touched.email && formik.errors.email ? 'border-red-500' : ''
              }`}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />

            {formik.touched.email && formik.errors.email && (
                <span className='text-red-500 text-xs'>{formik.errors.email}</span>
            )}
        </div>

        {/* Request for reset password */}
        <button
          type='submit'
          className='mt-4 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300'
        >
          Request Reset
        </button>
      </form>

      {/* Sign Up Link */}
      <div className='text-center'>
        <p className='text-sm'>Remebered password? <NavLink to='/login' className='text-blue-500 hover:underline'>Login</NavLink></p>
      </div>
    </div>
  )
}

export default ForgotPassword