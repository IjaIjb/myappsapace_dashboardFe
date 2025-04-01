import React, { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
import CustomDropdown from '../../../../extensions/CustomDropdown'
import { fetchCountries, fetchStates } from "../../../../../services/functions/LocationService";
import { FaCheckCircle } from "react-icons/fa";
 
function GuestAddressDetails({ formik, isAddressSelected }) {

    const [phoneCode, setPhoneCode] = useState("234");
    const [flag, setFlag] = useState("\ud83c\uddf3\ud83c\uddec");

    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    
    const [searchCountry, setSearchCountry] = useState("");
    const [searchState, setSearchState] = useState("");

    const debouncedSearchCountry = debounce(setSearchCountry, 500);
    const debouncedSearchState = debounce(setSearchState, 500);

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
    refetch: refetchCountries,
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

  // Fetch States with search and pagination
  const {
    data: stateData,
    fetchNextPage: fetchMoreStates,
    isFetching: isFetchingStates,
    isFetchingNextPage: isFetchingMoreStates,
    refetch: refetchStates,
  } = useInfiniteQuery({
    queryKey: ["states", selectedCountry, searchState],
    queryFn: ({ pageParam = 1 }) => fetchStates({ countryId: selectedCountry, search: searchState, page: pageParam }),
    enabled: !!selectedCountry,
    getNextPageParam: (lastPage) => {
        if (!lastPage || !lastPage.next_page_url) return undefined; // No more pages
        // Extract the next page number from the URL
        const url = new URL(lastPage.next_page_url);
        return Number(url.searchParams.get("page")); // Convert to number
    },
  });

  return (
    <div className="w-full my-4">

        <div className="flex justify-between items-center mb-4">
            <h2 className='text-lg font-bold flex items-center gap-2'>
                <FaCheckCircle className={`text-${isAddressSelected ? 'green' : 'gray'}-500`} /> 
                1. Fill Delivery Address Details
            </h2>
        </div>
                                
        <div className="space-y-4">

            <div className='flex flex-col gap-1'>
                <label className="block text-sm font-lato">Full Name</label>
                <input
                    type="text" 
                    name="recipient_name"
                    className={`h-[45px] border focus:outline-none text-sm w-full bg-inputBg rounded-lg px-5 ${
                        formik.touched['recipient_name'] && formik.errors['recipient_name'] ? 'border-red-500' : ''
                    }`}
                    {...formik.getFieldProps("recipient_name")}
                />
                {formik.touched.recipient_name && formik.errors.recipient_name ? (
                    <div className="text-red-500 text-xs">{formik.errors.recipient_name}</div>
                ) : null}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

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

                <div className='w-full'>
                    <CustomDropdown
                        label="State"
                        name="state"
                        data={stateData?.pages.flatMap((page) => page?.data) || []}
                        placeholder="Search state..."
                        onSelect={(item) => setSelectedState(item.id)}
                        onSearchChange={debouncedSearchState}
                        loadMore={fetchMoreStates}
                        disabled={!selectedCountry || isFetchingStates}
                        loading={isFetchingStates || isFetchingMoreStates}
                        formik={formik}
                    />
                </div>

            </div>


            <div className="grid grid-cols-2 gap-4">

                <div className='flex flex-col gap-1'>
                    <label className="block text-sm font-lato">Email</label>
                    <input
                        type="email"
                        name="email"
                        className={`h-[45px] border focus:outline-none text-sm w-full bg-inputBg rounded-lg px-5 ${
                            formik.touched['email'] && formik.errors['email'] ? 'border-red-500' : ''
                        }`}
                        {...formik.getFieldProps("email")}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="text-red-500 text-xs">{formik.errors.email}</div>
                    ) : null}
                </div>

                <div className="form-group flex flex-col gap-1">
                    <label htmlFor="phone_number" className="text-sm font-lato font-normal">Phone Number</label>
                    <div className={`flex items-center border rounded-lg bg-inputBg h-[45px] ${
                        formik.touched['phone_number'] && formik.errors['phone_number'] ? 'border-red-500' : ''
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
                            className="focus:outline-none text-sm w-full px-2"
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

            <div className='flex flex-col gap-1'>
                <label className="block font-lato text-sm">Address 1</label>
                <input
                    type="text"
                    name="address_line_1"
                    className={`h-[45px] border focus:outline-none text-sm w-full bg-inputBg rounded-lg px-5 ${
                        formik.touched['address_line_1'] && formik.errors['address_line_1'] ? 'border-red-500' : ''
                    }`}
                    {...formik.getFieldProps("address_line_1")}
                />
                {formik.touched.address_line_1 && formik.errors.address_line_1 ? (
                    <div className="text-red-500 text-xs">{formik.errors.address_line_1}</div>
                ) : null}
            </div>

            <div className='flex flex-col gap-1'>
                <label className="block font-lato text-sm">Address 2</label>
                <input
                    type="text"
                    name="address_line_2"
                    className={`h-[45px] border focus:outline-none text-sm w-full bg-inputBg rounded-lg px-5 ${
                        formik.touched['address_line_2'] && formik.errors['address_line_2'] ? 'border-red-500' : ''
                    }`}
                    {...formik.getFieldProps("address_line_2")}
                />
                {formik.touched.address_line_2 && formik.errors.address_line_2 ? (
                    <div className="text-red-500 text-xs">{formik.errors.address_line_2}</div>
                ) : null}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className='flex flex-col gap-1'>
                    <label className="block text-sm font-lato">City</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        className={`h-[45px] border focus:outline-none text-sm w-full bg-inputBg rounded-lg px-5 ${
                            formik.touched['city'] && formik.errors['city'] ? 'border-red-500' : ''
                        }`}
                        {...formik.getFieldProps("city")}
                    />
                    {formik.touched.city && formik.errors.city ? (
                        <div className="text-red-500 text-xs">{formik.errors.city}</div>
                    ) : null}
                </div>

                <div className='flex flex-col gap-1'>
                    <label className="block font-lato text-sm">Zip Code</label>
                    <input
                        type="text"
                        name="postal_code"
                        className={`h-[45px] border focus:outline-none text-sm w-full bg-inputBg rounded-lg px-5 ${
                            formik.touched['postal_code'] && formik.errors['postal_code'] ? 'border-red-500' : ''
                        }`}
                        {...formik.getFieldProps("postal_code")}
                    />
                    {formik.touched.postal_code && formik.errors.postal_code ? (
                        <div className="text-red-500 text-xs">{formik.errors.postal_code}</div>
                    ) : null}
                </div>
            </div>

            

        </div>
    </div>
  )
}

export default GuestAddressDetails