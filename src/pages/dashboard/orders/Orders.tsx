import React, { useState } from "react";
import DashboardLayout from "../../../components/DashboardLayout";
import RecentOrders from "./RecentOrders";
import { IoAddCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { UserApis } from "../../../apis/userApi/userApi";
import LoadingSpinnerPage from "../../../components/UI/LoadingSpinnerPage";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";

const Orders = () => {
  const [loader, setLoader] = React.useState<boolean>(false);

  const selectedStore = useSelector(
    (state: RootState) => state.globalState?.selectedStore || null
  );
  // console.log("Selected Store Code:", selectedStore);
  const [orders, setOrders] = React.useState<any>([]);
  const [open, setOpen] = useState(false);

  const onCloseModal = () => setOpen(false);

  React.useEffect(() => {
    setLoader(true);
    const query = {
      order_code: "",
      customer_name: "",
      email: "",
      phone_number: "",
      status: "",
      payment_method: "",
      currency: "",
      start_date: "",
      end_date: "",
      min_total: "",
      max_total: "",
      sort_by: "",
      sort_order: "",
      per_page: "",
    };

    UserApis.getOrder(selectedStore, query)
      .then((response) => {
        if (response?.data) {
          // console.log(response?.data);

          setOrders(response?.data);
          setLoader(false);
        } else {
          setLoader(false);
        }
      })
      .catch(function (error) {
        console.error("Error fetching orders:", error);
        setLoader(false);
      });
  }, [selectedStore]); // Depend on selectedCurrency so it updates when changed
  // console.log(orders)

  const totalOrders = orders?.orders?.data?.length || 0;

// console.log("Total Orders:", totalOrders);

  return (
    <DashboardLayout>
      {loader ? null : (
        <div>
          <div className="flex gap-3 items-center mb-7">
            <div className="grid lg:grid-cols-5 w-full items gap-2">
              <div className="bg-white rounded-[10px] pt-2 pb-1 px-3">
                <div className="flex flex-col gap-1">
                  <h5 className="text-[#9D9D9D] text-[12px] font-[600]">
                    TOTAL ORDERS
                  </h5>
                  <div className="flex justify-between">
                    <h5 className="text-[#9D9D9D] text-[16px] font-[300]">
                      {/* 45 */}
                      {totalOrders}
                    </h5>
                    <img
                      aria-hidden
                      src="/images/orders/totalorders.svg"
                      alt="Window icon"
                      //   className='w-[120px] h-[120px] '
                      // width={140}
                      // height={140}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[10px] pt-2 pb-1 px-3">
                <div className="flex flex-col gap-1">
                  <h5 className="text-[#9D9D9D] text-[12px] font-[600]">
                    RETURNS
                  </h5>
                  <div className="flex justify-between">
                    <h5 className="text-[#9D9D9D] text-[16px] font-[300]">
                     0
                    </h5>
                    <img
                      aria-hidden
                      src="/images/orders/returns.svg"
                      alt="Window icon"
                      //   className='w-[120px] h-[120px] '
                      // width={140}
                      // height={140}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[10px] pt-2 pb-1 px-3">
                <div className="flex flex-col gap-1">
                  <h5 className="text-[#9D9D9D] text-[12px] font-[600]">
                    FULFILLED
                  </h5>
                  <div className="flex justify-between">
                    <h5 className="text-[#9D9D9D] text-[16px] font-[300]">
                    0
                    </h5>
                    <img
                      aria-hidden
                      src="/images/orders/fulfiled.svg"
                      alt="Window icon"
                      //   className='w-[120px] h-[120px] '
                      // width={140}
                      // height={140}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[10px] pt-2 pb-1 px-3">
                <div className="flex flex-col gap-1">
                  <h5 className="text-[#9D9D9D] text-[12px] font-[600]">
                    UNFUFILLED
                  </h5>
                  <div className="flex justify-between">
                    <h5 className="text-[#9D9D9D] text-[16px] font-[300]">
                0
                    </h5>
                    <img
                      aria-hidden
                      src="/images/orders/unfulfiled.svg"
                      alt="Window icon"
                      //   className='w-[120px] h-[120px] '
                      // width={140}
                      // height={140}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[10px] pt-2 pb-1 px-3">
                <div className="flex flex-col gap-1">
                  <h5 className="text-[#9D9D9D] text-[12px] font-[600]">
                    UNPAID
                  </h5>
                  <div className="flex justify-between">
                    <h5 className="text-[#9D9D9D] text-[16px] font-[300]">
                    0
                    </h5>
                    <img
                      aria-hidden
                      src="/images/orders/unpaid.svg"
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
              to={"/dashboard/create-an-order"}
              className="rounded-full h-fit flex items-center gap-3 px-4 py-2"
              style={{
                background: "linear-gradient(to bottom, #382B67, #7056CD)",
              }}
            >
              <IoAddCircleOutline className="text-white" />
              <h5 className="text-[#FFFFFF] text-[16px] font-[400] whitespace-nowrap">
                Create Order
              </h5>
              {/* <LiaUploadSolid className="text-white" /> */}
            </Link>
          </div>
          <RecentOrders orders={orders} />
        </div>
      )}

      <Modal
        classNames={{
          modal: "rounded-[10px] overflow-visible relative",
        }}
        open={open}
        onClose={onCloseModal}
        showCloseIcon={false} // Hides the close button
        center
      >
        <div className="px-2 md:px-5 w-[100px] h-[100px] flex justify-center items-center text-center">
          <LoadingSpinnerPage />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default Orders;
