import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../components/DashboardLayout";
import CustomersTable from "./CustomersTable";
import { IoAddCircleOutline } from "react-icons/io5";
// import { IoAddCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { UserApis } from "../../../apis/userApi/userApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const Customers = () => {
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
  // const [stores, setStores] = useState<any>([]);
  const [customer, setCustomer] = React.useState<any>([]);

  // const [formValues, setFormValues] = useState({
  //   category_name: "",
  //   store_code: "", // Use store_code instead of store_name
  //   category_description: "",
  //   status: "active",
  // });

  // useEffect(() => {
  //   UserApis.getStore()
  //     .then((response) => {
  //       if (response?.data) {
  //         setStores(response?.data || []); // Adjusting to your API response structure
  //       }
  //     })
  //     .catch((error) => console.error("Error fetching stores:", error));
  // }, []);

  React.useEffect(() => {
    UserApis.getAllCustomer(selectedStore)
      .then((response) => {
        if (response?.data) {
          console?.log(response?.data);
          setCustomer(response?.data);
          //             setTotalProducts(response?.data?.products?.length || 0);
          //                // Calculate total cost price
          // const total = response?.data?.products?.reduce((sum: number, prod: any) => sum + (prod.cost_price || 0), 0);
          // setTotalCost(total);
        } else {
          // dispatch(login([]))
        }
      })
      .catch(function (error) {});
  }, [selectedStore]);
  // console.log(customer)
  const activeCustomersCount =
    customer?.data?.customers?.filter((cust: any) => cust.status === "active")
      .length || 0;
  const notActiveCustomersCount =
    customer?.data?.customers?.filter((cust: any) => cust.status !== "active")
      .length || 0;

  // const handleInputChange = (
  //   e: React.ChangeEvent<
  //     HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  //   >
  // ) => {
  //   const { name, value } = e.target;
  //   setFormValues((prev) => ({ ...prev, [name]: value }));
  // };

  // console.log(stores);
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
            <h4 className="text-[20px] font-[600] mb-4">Don't have a Site?</h4>
            <Link
              to="/dashboard/create-site"
              className="underline text-blue-800"
            >
              Create a Site
            </Link>
          </div>
        </div>
      </Modal>
      <div className="lg:flex gap-3 items-end mb-7">
        <div className="grid lg:grid-cols-5 w-full items gap-2">
          <div className="bg-white rounded-[10px] pt-2 pb-1 px-3">
            <div className="flex flex-col gap-1">
              <h5 className="text-[#9D9D9D] text-[12px] font-[600]">
                Total Customers
              </h5>
              <div className="flex justify-between">
                <h5 className="text-[#9D9D9D] text-[16px] font-[300]">
                  {/* 234 (780) */}
                  {customer?.data?.customers?.length ?? 0}
                </h5>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="32"
                    height="32"
                    rx="4"
                    fill="#796BEB"
                    fill-opacity="0.1"
                  />
                  <path
                    d="M24.7738 22C25.5238 22 26.1188 21.529 26.6538 20.87C27.7498 19.52 25.9508 18.44 25.2648 17.913C24.5678 17.376 23.7888 17.071 22.9998 17M21.9998 15C22.6628 15 23.2987 14.7366 23.7675 14.2678C24.2364 13.7989 24.4998 13.163 24.4998 12.5C24.4998 11.837 24.2364 11.2011 23.7675 10.7322C23.2987 10.2634 22.6628 10 21.9998 10M7.22578 22C6.47578 22 5.88078 21.529 5.34578 20.87C4.24978 19.52 6.04878 18.44 6.73478 17.913C7.43178 17.376 8.20978 17.07 8.99978 17M9.49978 15C8.83674 15 8.20086 14.7366 7.73201 14.2678C7.26317 13.7989 6.99978 13.163 6.99978 12.5C6.99978 11.837 7.26317 11.2011 7.73201 10.7322C8.20086 10.2634 8.83674 10 9.49978 10M12.0838 19.111C11.0618 19.743 8.38278 21.033 10.0138 22.647C10.8128 23.436 11.6998 24 12.8168 24H19.1848C20.3018 24 21.1888 23.436 21.9858 22.647C23.6178 21.033 20.9388 19.743 19.9168 19.111C18.7396 18.385 17.3838 18.0005 16.0008 18.0005C14.6177 18.0005 13.2619 18.385 12.0848 19.111M19.4998 11.5C19.4998 11.9596 19.4093 12.4148 19.2334 12.8394C19.0575 13.264 18.7997 13.6499 18.4747 13.9749C18.1496 14.2999 17.7638 14.5577 17.3392 14.7336C16.9145 14.9095 16.4594 15 15.9998 15C15.5402 15 15.085 14.9095 14.6604 14.7336C14.2357 14.5577 13.8499 14.2999 13.5249 13.9749C13.1999 13.6499 12.9421 13.264 12.7662 12.8394C12.5903 12.4148 12.4998 11.9596 12.4998 11.5C12.4998 10.5717 12.8685 9.6815 13.5249 9.02513C14.1813 8.36875 15.0715 8 15.9998 8C16.928 8 17.8183 8.36875 18.4747 9.02513C19.131 9.6815 19.4998 10.5717 19.4998 11.5Z"
                    stroke="#8F75EF"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[10px] pt-2 pb-1 px-3">
            <div className="flex flex-col gap-1">
              <h5 className="text-[#9D9D9D] text-[12px] font-[600]">Active</h5>
              <div className="flex justify-between">
                <h5 className="text-[#9D9D9D] text-[16px] font-[300]">
                  {activeCustomersCount}
                </h5>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="32"
                    height="32"
                    rx="4"
                    fill="#00AB44"
                    fill-opacity="0.15"
                  />
                  <path
                    d="M24.7738 22C25.5238 22 26.1188 21.529 26.6538 20.87C27.7498 19.52 25.9508 18.44 25.2648 17.913C24.5678 17.376 23.7888 17.071 22.9998 17M21.9998 15C22.6628 15 23.2987 14.7366 23.7675 14.2678C24.2364 13.7989 24.4998 13.163 24.4998 12.5C24.4998 11.837 24.2364 11.2011 23.7675 10.7322C23.2987 10.2634 22.6628 10 21.9998 10M7.22578 22C6.47578 22 5.88078 21.529 5.34578 20.87C4.24978 19.52 6.04878 18.44 6.73478 17.913C7.43178 17.376 8.20978 17.07 8.99978 17M9.49978 15C8.83674 15 8.20086 14.7366 7.73201 14.2678C7.26317 13.7989 6.99978 13.163 6.99978 12.5C6.99978 11.837 7.26317 11.2011 7.73201 10.7322C8.20086 10.2634 8.83674 10 9.49978 10M12.0838 19.111C11.0618 19.743 8.38278 21.033 10.0138 22.647C10.8128 23.436 11.6998 24 12.8168 24H19.1848C20.3018 24 21.1888 23.436 21.9858 22.647C23.6178 21.033 20.9388 19.743 19.9168 19.111C18.7396 18.385 17.3838 18.0005 16.0008 18.0005C14.6177 18.0005 13.2619 18.385 12.0848 19.111M19.4998 11.5C19.4998 11.9596 19.4093 12.4148 19.2334 12.8394C19.0575 13.264 18.7997 13.6499 18.4747 13.9749C18.1496 14.2999 17.7638 14.5577 17.3392 14.7336C16.9145 14.9095 16.4594 15 15.9998 15C15.5402 15 15.085 14.9095 14.6604 14.7336C14.2357 14.5577 13.8499 14.2999 13.5249 13.9749C13.1999 13.6499 12.9421 13.264 12.7662 12.8394C12.5903 12.4148 12.4998 11.9596 12.4998 11.5C12.4998 10.5717 12.8685 9.6815 13.5249 9.02513C14.1813 8.36875 15.0715 8 15.9998 8C16.928 8 17.8183 8.36875 18.4747 9.02513C19.131 9.6815 19.4998 10.5717 19.4998 11.5Z"
                    stroke="#00AB44"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[10px] pt-2 pb-1 px-3">
            <div className="flex flex-col gap-1">
              <h5 className="text-[#9D9D9D] text-[12px] font-[600]">
                Inactive
              </h5>
              <div className="flex justify-between">
                <h5 className="text-[#9D9D9D] text-[16px] font-[300]">
                  {notActiveCustomersCount}
                </h5>
                <img
                  aria-hidden
                  src="/images/home/customer.svg"
                  alt="Window icon"
                  //   className='w-[120px] h-[120px] '
                  // width={140}
                  // height={140}
                />
              </div>
            </div>
          </div>
        </div>

        <Link
          to={"/dashboard/create-customer"}
          className="rounded-full lg:mt-0 mt-4 h-fit flex items-center gap-3 w-fit px-4 py-2"
          style={{
            background: "linear-gradient(to bottom, #382B67, #7056CD)",
          }}
        >
          <IoAddCircleOutline className="text-white" />
          <h5 className="text-[#FFFFFF] text-[16px] font-[400] whitespace-nowrap">
            Create Customer
          </h5>
          {/* <LiaUploadSolid className="text-white" /> */}
        </Link>
      </div>

      <CustomersTable customer={customer} />
    </DashboardLayout>
  );
};

export default Customers;
