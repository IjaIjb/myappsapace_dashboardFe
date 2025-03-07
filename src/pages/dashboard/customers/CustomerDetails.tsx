import React, { useState } from "react";
import DashboardLayout from "../../../components/DashboardLayout";
// import LatestOrder from "./inner/LatestOrder";
// import RecentOrders from "../orders/RecentOrders";
// import CustomerInfo from "./inner/CustomerInfo";
import { useLocation } from "react-router-dom";
import { UserApis } from "../../../apis/userApi/userApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import { FaArrowRight } from "react-icons/fa";

const CustomerDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);

  const { productId, storeCode } = location.state || {}; // Extract values
  const [formValues, setFormValues] = useState({
    first_name: "",
    last_name: "",
    store_code: "",
    email: "",
    username: "",
    phone_number: "", // Use store_code instead of store_name
    password: "",
    address: "",
    country: "",
    gender: "",
    date_of_birth: "",
    lga: "",
    status: "active",
  });
  React.useEffect(() => {
    UserApis.getSingleCustomer(storeCode, productId).then((response) => {
      if (response?.data) {
        console.log(response.data?.data?.customer);
        setFormValues(response?.data?.data?.customer);
        // setStoreId(response?.data?.store?.id);
      }
    });
  }, [storeCode, productId]);
  console.log(formValues);
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);
  
    // Create JSON payload
    const payload = {
      first_name: formValues.first_name,
      last_name: formValues.last_name,
      email: formValues.email,
      phone_number: formValues.phone_number,
      username: formValues.username,
      password: formValues.password,
      status: formValues.status,
      address: formValues.address || "",
      country: formValues.country || "",
      gender: formValues.gender || "",
      date_of_birth: formValues.date_of_birth || "",
      lga: formValues.lga || "",
    };
  
    console.log("Submitting payload:", payload);
  
    try {
      const response: any = await UserApis.updateCustomer(storeCode, productId, payload);
      console.log(response);
  
      if (response?.data) {
        toast.success(response?.data?.message || "Customer updated successfully!");
        navigate("/dashboard/customers");
      } else {
        toast.error(response?.data?.message || "Failed to update customer.");
      }
    } catch (error: any) {
      console.error("Error updating customer:", error);
      toast.error(
        error?.response?.data?.message || "An error occurred while updating the customer."
      );
    } finally {
      setLoader(false);
    }
  };

  
  return (
    <div>
      <DashboardLayout>
        <h5 className="text-[#000000] text-[16px] font-[600] mb-7">
          Update Customer
        </h5>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col max-w-[570px] mt-5 gap-3"
        >
          {/* Customer Name */}
          <div>
            <label
              htmlFor="first_name"
              className="text-[#2B2C2B] text-[12px] font-[400]"
            >
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              value={formValues.first_name}
              onChange={handleInputChange}
              className="block w-full mt-1 border px-3 py-2 rounded"
              placeholder="Enter first name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="last_name"
              className="text-[#2B2C2B] text-[12px] font-[400]"
            >
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              value={formValues.last_name}
              onChange={handleInputChange}
              className="block w-full mt-1 border px-3 py-2 rounded"
              placeholder="Enter last name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="text-[#2B2C2B] text-[12px] font-[400]"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
              className="block w-full mt-1 border px-3 py-2 rounded"
              placeholder="Enter email"
              required
            />
          </div>

          <div>
            <label
              htmlFor="username"
              className="text-[#2B2C2B] text-[12px] font-[400]"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formValues.username}
              onChange={handleInputChange}
              className="block w-full mt-1 border px-3 py-2 rounded"
              placeholder="Enter user name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="phone_number"
              className="text-[#2B2C2B] text-[12px] font-[400]"
            >
              Phone Number
            </label>
            <input
              type="number"
              name="phone_number"
              value={formValues.phone_number}
              onChange={handleInputChange}
              className="block w-full mt-1 border px-3 py-2 rounded"
              placeholder="Enter phone number"
              required
            />
          </div>

{formValues?.address && (
       <div>
       <label
         htmlFor="address"
         className="text-[#2B2C2B] text-[12px] font-[400]"
       >
        Address
       </label>
       <input
         type="text"
         name="address"
         value={formValues.address}
         onChange={handleInputChange}
         className="block w-full mt-1 border px-3 py-2 rounded"
         placeholder="Enter phone number"
         required
       />
     </div>
)}

{formValues?.country && (
       <div>
       <label
         htmlFor="country"
         className="text-[#2B2C2B] text-[12px] font-[400]"
       >
        Country
       </label>
       <input
         type="text"
         name="country"
         value={formValues.country}
         onChange={handleInputChange}
         className="block w-full mt-1 border px-3 py-2 rounded"
         placeholder="Enter phone number"
         required
       />
     </div>
)}

{formValues?.gender && (
       <div>
       <label
         htmlFor="gender"
         className="text-[#2B2C2B] text-[12px] font-[400]"
       >
       Gender
       </label>
       <select id="gender"
           name="gender"
           value={formValues.gender}
           onChange={handleInputChange}
         className="block w-full mt-1 border px-3 py-2 rounded"
         >
                                                        <option selected>Select Gender</option>
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                        <option value="Rather not say">Rather not say</option>
                                                    </select>
       {/* <input
         type="text"
         name="gender"
         value={formValues.gender}
         onChange={handleInputChange}
         className="block w-full mt-1 border px-3 py-2 rounded"
         placeholder="Enter phone number"
         required
       /> */}
     </div>
)}

{formValues?.date_of_birth && (
       <div>
       <label
         htmlFor="date_of_birth"
         className="text-[#2B2C2B] text-[12px] font-[400]"
       >
       Date of birth
       </label>
       <input
         type="date"
         name="date_of_birth"
         value={formValues.date_of_birth}
         onChange={handleInputChange}
         className="block w-full mt-1 border px-3 py-2 rounded"
         placeholder="Enter phone number"
         required
       />
     </div>
)}
{formValues?.lga && (
       <div>
       <label
         htmlFor="lga"
         className="text-[#2B2C2B] text-[12px] font-[400]"
       >
      Local Government
       </label>
       <input
         type="text"
         name="lga"
         value={formValues.lga}
         onChange={handleInputChange}
         className="block w-full mt-1 border px-3 py-2 rounded"
         placeholder="Enter phone number"
         required
       />
     </div>
)}
          {/* <div className='relative'>
            <label htmlFor="password" className="text-[#2B2C2B] text-[12px] font-[400]">
          Password
            </label>
            <input
             name="password"
             id="password"
           type={!showPassword ? "password" : "text"}
             placeholder=""
              value={formValues.password}
              onChange={handleInputChange}
              className="block w-full mt-1 border px-3 py-2 rounded"
         
              required
            />
                   <button
                                            type="button"
                                            // role="button"
                                            aria-label="show password"
                                            title=" show password"
                                            onClick={() =>
                                              setShowPassword(() => !showPassword)
                                            }
                                            className={`absolute right-4 top-12`}
                                          >
                                            {!showPassword ? (
                                              <AiOutlineEyeInvisible className="" />
                                            ) : (
                                              <AiOutlineEye className="" />
                                            )}
                                          </button>
          </div> */}

          {/* Submit Button */}
          <div className="flex justify-end items-end h-full">
            <button
              type="submit"
              disabled={loader}
              className={`disabled:bg-gray-500 flex gap-2 items-center py-2 w-fit px-6 bg-secondary text-white rounded-full hover:bg-secondary/[70%]`}
            >
              {loader ? <LoadingSpinner /> : "Proceed"}
              {!loader && <FaArrowRight />}
            </button>
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
        </form>

        {/* <div className='flex flex-col gap-3'>
        <div className="grid lg:grid-cols-5 w-full items gap-2">
              <div className="bg-white rounded-[10px] pt-2 pb-1 px-3">
                <div className="flex flex-col gap-1">
                  <h5 className="text-[#9D9D9D] text-[12px] font-[600]">
                  Total Amount  Ordered
                  </h5>
                  <div className="flex justify-between">
                    <h5 className="text-[#9D9D9D] text-[16px] font-[300]">$458.89</h5>
          <div className='w-7 h-7 bg-[#FF1B1B1A]/[10%] rounded-[4px]'></div>


                  </div>
                </div>
              </div>
  
              <div className="bg-white rounded-[10px] pt-2 pb-1 px-3">
                <div className="flex flex-col gap-1">
                  <h5 className="text-[#9D9D9D] text-[12px] font-[600]">
                Total Orders
                  </h5>
                  <div className="flex justify-between">
                    <h5 className="text-[#9D9D9D] text-[16px] font-[300]">
                    54
                    </h5>
                    <div className='w-7 h-7 bg-[#00AB441A]/[10%] rounded-[4px]'></div>


                  </div>
                </div>
              </div>
  
              <div className="bg-white rounded-[10px] pt-2 pb-1 px-3">
                <div className="flex flex-col gap-1">
                  <h5 className="text-[#9D9D9D] text-[12px] font-[600]">
                  Abandoned Checkouts
                  </h5>
                  <div className="flex justify-between">
                    <h5 className="text-[#9D9D9D] text-[16px] font-[300]">34</h5>
                    <div className='w-7 h-7 bg-[#3491DE1A]/[10%] rounded-[4px]'></div>

                  </div>
                </div>
              </div>
  
         
          
            </div>
<CustomerInfo />
<LatestOrder />
<RecentOrders />
            </div> */}
      </DashboardLayout>
    </div>
  );
};

export default CustomerDetails;
