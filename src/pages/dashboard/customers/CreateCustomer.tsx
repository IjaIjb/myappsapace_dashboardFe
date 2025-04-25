import React, { useEffect, useState } from "react";
import { UserApis } from "../../../apis/userApi/userApi";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardLayout from "../../../components/DashboardLayout";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import { FaArrowRight, FaStore } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { Link } from "react-router-dom";

const CreateCustomer = () => {
  const selectedStore = useSelector(
    (state: RootState) => state.globalState?.selectedStore || null
  );
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  useEffect(() => {
    if (!selectedStore) {
      onOpenModal();
    } else {
      onCloseModal();
    }
  }, [selectedStore]);

  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    first_name: "",
    last_name: "",
    store_code: "",
    email: "",
    username: "",
    phone_number: "", 
    password: "",
    status: "active",
  });
  
  // Add validation state
  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
  });
  
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const validateInput = (name:any, value:any) => {
    let error = "";
    
    switch (name) {
      case "first_name":
        if (!/^[A-Za-z\s]+$/.test(value)) {
          error = "First name should contain only letters";
        }
        break;
      case "last_name":
        if (!/^[A-Za-z\s]+$/.test(value)) {
          error = "Last name should contain only letters";
        }
        break;
      case "phone_number":
        // Removing any non-digit characters for validation
        const digitsOnly = value.replace(/\D/g, '');
        if (digitsOnly.length !== 11) {
          error = "Phone number must be exactly 11 digits";
        }
        break;
      default:
        break;
    }
    
    return error;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    
    // Special handling for name fields to prevent numbers
    if ((name === "first_name" || name === "last_name") && /\d/.test(value)) {
      return;
    }
    
    setFormValues((prev) => ({ ...prev, [name]: value }));
    
    // Validate the input and update errors state
    const error = validateInput(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const hasErrors = () => {
    return Object.values(errors).some(error => error !== "");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate all fields before submission
    const newErrors = {
      first_name: validateInput("first_name", formValues.first_name),
      last_name: validateInput("last_name", formValues.last_name),
      phone_number: validateInput("phone_number", formValues.phone_number),
    };
    
    setErrors(newErrors);
    
    // Check if there are any errors
    if (Object.values(newErrors).some(error => error !== "")) {
      toast.error("Please fix the errors before submitting");
      return;
    }
    
    setLoader(true);

    const formData = new FormData();

    formData.append("first_name", formValues.first_name);
    formData.append("last_name", formValues.last_name);
    formData.append("email", formValues.email);
    formData.append("phone_number", formValues.phone_number);
    formData.append("username", formValues.username);
    formData.append("password", formValues.password);
    formData.append("status", formValues.status);

    try {
      const response: any = await UserApis.createCustomer(
        selectedStore,
        formData
      );

      if (response?.data) {
        toast.success(
          response?.data?.message || "Customer created successfully!"
        );
        navigate("/dashboard/customers");
      } else {
        toast.error(response?.data?.message || "Failed to create customer.");
      }
    } catch (error: any) {
      console.error("Error creating customer:", error);
      toast.error(
        error?.response?.data?.message ||
          "An error occurred while creating the customer."
      );
    } finally {
      setLoader(false);
    }
  };

  return (
    <DashboardLayout>
      <Modal
        classNames={{
          modal: "rounded-[10px] overflow-visible relative",
        }}
        open={open}
        onClose={() => {}}
        closeOnEsc={false}
        closeOnOverlayClick={false}
        showCloseIcon={false}
        center
      >
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
          <FaStore className="text-blue-600 text-4xl" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Site Selected</h3>
        <p className="text-gray-600 mb-6">You need to create or select a site before adding products</p>
        <Link 
          to="/dashboard/create-site" 
          className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <span>Create a New Site</span>
          <FaArrowRight size={14} />
        </Link>
        <Link 
          to="/dashboard/site" 
          className="mt-3 inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline"
        >
          Select Existing Site
        </Link>
      </div>
      </Modal>
      <div className="bg-white rounded-[14px] pt-3 pb-4 pl-3 pr-5">
        <h5 className="text-[#000000] text-[16px] font-[600] mb-7">
          Create Customer
        </h5>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full mt-5 gap-3"
        >
          <div className="grid md:grid-cols-2 gap-3 ">
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
                className={`block w-full mt-1 border px-3 py-2 rounded ${errors.first_name ? 'border-red-500' : ''}`}
                placeholder="Enter first name"
                pattern="[A-Za-z\s]+"
                title="First name should contain only letters"
                required
              />
              {errors.first_name && (
                <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>
              )}
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
                className={`block w-full mt-1 border px-3 py-2 rounded ${errors.last_name ? 'border-red-500' : ''}`}
                placeholder="Enter last name"
                pattern="[A-Za-z\s]+"
                title="Last name should contain only letters"
                required
              />
              {errors.last_name && (
                <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-3 ">
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
          </div>

          <div className="grid md:grid-cols-2 gap-3 ">
            <div>
              <label
                htmlFor="phone_number"
                className="text-[#2B2C2B] text-[12px] font-[400]"
              >
                Phone Number
              </label>
              <input
                type="tel"
                name="phone_number"
                value={formValues.phone_number}
                onChange={handleInputChange}
                className={`block w-full mt-1 border px-3 py-2 rounded ${errors.phone_number ? 'border-red-500' : ''}`}
                placeholder="Enter phone number (11 digits)"
                pattern="[0-9]{11}"
                maxLength={11}
                required
              />
              {errors.phone_number && (
                <p className="text-red-500 text-xs mt-1">{errors.phone_number}</p>
              )}
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="text-[#2B2C2B] text-[12px] font-[400]"
              >
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
                aria-label="show password"
                title="show password"
                onClick={() => setShowPassword(() => !showPassword)}
                className={`absolute right-4 top-12`}
              >
                {!showPassword ? (
                  <AiOutlineEyeInvisible className="" />
                ) : (
                  <AiOutlineEye className="" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end items-end h-full">
            <button
              type="submit"
              disabled={loader || hasErrors()}
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
      </div>
    </DashboardLayout>
  );
};

export default CreateCustomer;