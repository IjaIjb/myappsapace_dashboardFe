import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useInfiniteQuery } from "@tanstack/react-query";
import { useDynamicData } from '../../../../../features/hooks/useDynamicData';
import useAuth from '../../../../../features/hooks/useAuth';
import { debounce } from "lodash";
import CustomDropdown from '../../../../extensions/CustomDropdown';
import { fetchCountries } from '../../../../../services/functions/LocationService';


function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [phoneCode, setPhoneCode] = useState("234");
  const [flag, setFlag] = useState("\ud83c\uddf3\ud83c\uddec");

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchCountry, setSearchCountry] = useState("");
  const debouncedSearchCountry = debounce(setSearchCountry, 500);

  const handleCountrySelect = (item) => {
    setSelectedCountry(item.id);
    setPhoneCode(item.phone_code || "+");
    setFlag(item.flag || null);
  };

     // Fetch Countries with search and pagination
    const {
      data: countryData,
      fetchNextPage: fetchMoreCountries,
      isFetching: isFetchingCountries,
      isFetchingNextPage: isFetchingMoreCountries,
    } = useInfiniteQuery({
      queryKey: ["countries", searchCountry],
      queryFn: ({ pageParam = 1 }) => fetchCountries({ search: searchCountry, page: pageParam }),
      getNextPageParam: (lastPage) => {
          if (!lastPage || !lastPage.next_page_url) return undefined; // No more pages
          // Extract the next page number from the URL
          const url = new URL(lastPage.next_page_url);
          return Number(url.searchParams.get("page")); // Convert to number
      },
      enabled: true,
    });

  const { setDynamicDataValue } = useDynamicData();

  const { registerUser } = useAuth();

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      gender: '',
      phone_number: '',
      password: '',
      password_confirmation: '',
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required('First name is required'),
      last_name: Yup.string().required('Last name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      gender: Yup.string().required('Gender is required'),
      phone_number: Yup.string().matches(/^[0-9]+$/, 'Must be a valid phone number').required('Phone number is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
      password_confirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
    }),
    onSubmit: async (values) => { 
        await registerUser(values, {
            onSuccess: (res) => {
                setDynamicDataValue("register.email", values.email);
                navigate('/verify-account')
            }
        });
    },
  });

  return (
    <div className='max-w-screen-md w-full'>

      <div className='flex flex-col items-center justify-center mb-2 space-y-1 text-center'>
        <h1 className='text-3xl text-blue-500 font-quicksand font-bold'>Create your account</h1>
        <p className='text-lg font-outfit font-thin'>Enter the fields below to get started</p>
      </div>


      <form className='p-6' onSubmit={formik.handleSubmit}>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>

            <div className='form-group flex flex-col gap-1.5 pb-3'>
                <label htmlFor="first_name" className='text-sm font-lato font-normal'>First Name</label>
                <input
                    type='text'
                    id='first_name'
                    name='first_name'
                    placeholder='John'
                    className={`h-[45px] focus:outline-none border text-sm w-full bg-inputBg rounded-lg px-5 ${
                    formik.touched.first_name && formik.errors.first_name ? 'border-red-500' : ''
                    }`}
                    value={formik.values.first_name}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />

                {formik.touched.first_name && formik.errors.first_name && (
                    <span className='text-red-500 text-xs'>{formik.errors.first_name}</span>
                )}
            </div>


            <div className='form-group flex flex-col gap-1.5 pb-3'>
                <label htmlFor="last_name" className='text-sm font-lato font-normal'>Last Name</label>
                <input
                    type='text'
                    id='last_name'
                    name='last_name'
                    placeholder='Smith'
                    className={`h-[45px] focus:outline-none border text-sm w-full bg-inputBg rounded-lg px-5 ${
                    formik.touched.last_name && formik.errors.last_name ? 'border-red-500' : ''
                    }`}
                    value={formik.values.last_name}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />

                {formik.touched.last_name && formik.errors.last_name && (
                    <span className='text-red-500 text-xs'>{formik.errors.last_name}</span>
                )}
            </div>

        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
            <div className='form-group flex flex-col gap-1.5 pb-5'>
                <label htmlFor="email" className='text-sm font-lato font-normal'>Email</label>
                <input
                    type='email'
                    id='email'
                    name='email'
                    placeholder='mymail@myappspace.com'
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

            <div className='form-group flex flex-col gap-1.5 pb-3'>
                <label htmlFor='gender' className='text-sm font-lato font-normal'>Gender</label>
                <select
                    id='gender'
                    name='gender'
                    className={`h-[45px] focus:outline-none border text-sm w-full bg-inputBg rounded-lg px-5 ${
                    formik.touched.gender && formik.errors.gender ? 'border-red-500' : ''
                    }`}
                    {...formik.getFieldProps('gender')}
                >
                    <option value='' label='Select gender' />
                    <option value='male' label='Male' />
                    <option value='female' label='Female' />
                    <option value='other' label='Other' />
                </select>
                {formik.touched.gender && formik.errors.gender && (
                    <span className='text-red-500 text-xs'>{formik.errors.gender}</span>
                )}
            </div>
        </div>

        


        <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
          
            {/* COuntry */}
            <div className='w-full'>
                <CustomDropdown
                    label="Country"
                    name="country"
                    data={countryData?.pages.flatMap((page) => page?.data) || []}
                    placeholder="Search country..."
                    onSelect={(item) => handleCountrySelect(item)}
                    onSearchChange={debouncedSearchCountry}
                    loadMore={fetchMoreCountries}
                    loading={isFetchingCountries || isFetchingMoreCountries}
                    formik={formik}
                />
            </div>

            <div className="form-group flex flex-col gap-1.5 pb-3">
                <label htmlFor="phone_number" className="text-sm font-lato font-normal">Phone Number</label>
                <div className={`flex h-[45px] items-center border rounded-lg bg-inputBg ${
                        formik.touched.phone_number && formik.errors.phone_number ? 'border-red-500' : ''
                    }`}>
                  {/* Country Flag & Code */}
                  {flag && (
                    <div className="flex items-center justify-center bg-gray-300 px-3 h-full rounded-l-lg">
                      <span className="text-lg">{JSON.parse(`"${flag}"`)}</span>
                      <span className="ml-2 text-sm">{phoneCode}</span>
                    </div>
                  )}
                  
                  {/* Phone Number Input (Without + or Country Code) */}
                  <input
                    type="text"
                    id="phone_number"
                    name="phone_number"
                    placeholder="Enter Phone Number"
                    className={`focus:outline-none h-full text-sm w-full bg-inputBg rounded-lg px-5`}
                    value={formik.values.phone_number}
                    onBlur={formik.handleBlur}
                    onChange={(e) => {
                      const inputVal = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                      formik.setFieldValue("phone_number", inputVal);
                    }}
                  />
                </div>

                {formik.touched.phone_number && formik.errors.phone_number && (
                  <span className="text-red-500 text-xs">{formik.errors.phone_number}</span>
                )}
              </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
          
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

        </div>
        <button type='submit' className='w-full bg-blue-500 text-white py-3 rounded-lg mt-6 hover:bg-blue-600 transition'>
          Create account
        </button>
      </form>
      <div className='text-center'>
        <p className='text-sm'>Already have an account? <NavLink to='/login' className='text-blue-500 hover:underline'>Log in</NavLink></p>
      </div>
    </div>
  );
}

export default Register;
