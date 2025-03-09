import React, { useEffect, useState } from "react";
import { UserApis } from "../../../apis/userApi/userApi";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardLayout from "../../../components/DashboardLayout";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import { FaArrowRight } from "react-icons/fa";
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
  // console.log("Selected Store Code:", selectedStore);
  const [open, setOpen] = useState(false);  
    const onOpenModal = () => {
      // e.preventDefault();
      setOpen(true);
    };
    const onCloseModal = () => setOpen(false);
  
    useEffect(() => {
      if (!selectedStore) {
        onOpenModal();
      } else {
        onCloseModal();
      }
    }, [selectedStore]);

  const [showPassword, setShowPassword] = useState(false);
  // const [stores, setStores] = useState<any>([]);
  const [formValues, setFormValues] = useState({
    first_name: "",
    last_name: "",
    store_code: "",
    email: "",
    username: "",
    phone_number: "", // Use store_code instead of store_name
    password: "",
    status: "active",
  });
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   UserApis.getStore()
  //     .then((response) => {
  //       if (response?.data) {
  //         setStores(response?.data || []); // Adjusting to your API response structure
  //       }
  //     })
  //     .catch((error) => console.error("Error fetching stores:", error));
  // }, []);
  // console.log(stores);
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

    const formData = new FormData();

    formData.append("first_name", formValues.first_name);
    formData.append("last_name", formValues.last_name);
    formData.append("email", formValues.email);
    formData.append("phone_number", formValues.phone_number);
    formData.append("username", formValues.username);
    formData.append("password", formValues.password);
    formData.append("status", formValues.status);
    // console.log("Submitting payload:", formValues);

    try {
      // console.log("Submitting payload:", formValues);

      const response: any = await UserApis.createCustomer(
        selectedStore,
        formData
      );
      // console.log(response);

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
              onClose={() => {}} // Prevents closing the modal
        closeOnEsc={false} // Prevent closing with the Escape key
        closeOnOverlayClick={false} // Prevent closing by clicking outside
        showCloseIcon={false} // Hides the close button
              center
            >
              <div className="px-2 md:px-5  h-[100px] flex justify-center items-center  text-center">
          
        <div>
        <h4 className="text-[20px] font-[600] mb-4">Don't have a Store?</h4>
      <Link to="/dashboard/create-store" className="underline text-blue-800">Create a Store</Link>
      </div>
           
             
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
                type="number"
                name="phone_number"
                value={formValues.phone_number}
                onChange={handleInputChange}
                className="block w-full mt-1 border px-3 py-2 rounded"
                placeholder="Enter phone number"
                required
              />
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
                // role="button"
                aria-label="show password"
                title=" show password"
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
      </div>
    </DashboardLayout>
  );
};

export default CreateCustomer;
