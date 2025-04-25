import React, { useEffect, useState } from "react";
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
import Paid from "./paid/Paid";
import Pending from "./pending/Pending";
import { FaArrowRight, FaStore } from "react-icons/fa";
import { formatCurrency } from "../../../components/utils/currencyUtils";

const Orders = () => {
  const [loader, setLoader] = React.useState<boolean>(false);

  const selectedStore = useSelector(
    (state: RootState) => state.globalState?.selectedStore || null
  );
  
  // Get the selected currency from Redux
  const selectedCurrency = useSelector(
    (state: RootState) => state.globalState?.selectedCurrency || "NGN"
  );
  
  const [orders, setOrders] = React.useState<any>([]);
  const [open, setOpen] = useState(false);
  const [openM, setOpenM] = useState(false);
  const [currencyTotals, setCurrencyTotals] = useState<{[key: string]: number}>({});

  const onCloseModal = () => setOpen(false);
  const onOpenModalM = () => setOpenM(true);
  const onCloseModalM = () => setOpenM(false);

  useEffect(() => {
    if (!selectedStore) {
      onOpenModalM();
    } else {
      onCloseModalM();
    }
  }, [selectedStore]);

  React.useEffect(() => {
    if (!selectedStore) return;
    
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
          setOrders(response?.data);
          console.log(response?.data);
          
          // Calculate totals for each currency
          const totals: {[key: string]: number} = {};
          const orderList = response?.data?.orders?.data || [];
          
          orderList.forEach((order: any) => {
            if (order?.transaction) {
              const amount = parseFloat(order.total || 0);
              const currency = order.transaction.currency || "NGN";
              
              if (!totals[currency]) {
                totals[currency] = 0;
              }
              
              totals[currency] += amount;
            }
          });
          
          setCurrencyTotals(totals);
          setLoader(false);
        } else {
          setLoader(false);
        }
      })
      .catch(function (error) {
        console.error("Error fetching orders:", error);
        setLoader(false);
      });
  }, [selectedStore, selectedCurrency]); // Depend on selectedCurrency so it updates when changed

  const totalOrders = orders?.orders?.data?.length || 0;
  
  // Get the total for the selected currency or 0 if not available
  const selectedCurrencyTotal = currencyTotals[selectedCurrency] || 0;
  
  // Format the selected currency total with the appropriate currency symbol
  const formattedCurrencyTotal = formatCurrency(selectedCurrencyTotal, selectedCurrency);

  const initialStatusState = {
    allElement: true,
    paidElement: false,
    pendingElement: false,
  };

  const [statusValues, setStatusValues] = useState({
    ...initialStatusState,
  });

  const handleAllState = () => {
    setStatusValues({
      allElement: true,
      paidElement: false,
      pendingElement: false,
    });
  };

  const handleDraftState = () => {
    setStatusValues({
      allElement: false,
      paidElement: true,
      pendingElement: false,
    });
  };

  const handleFlashSalesState = () => {
    setStatusValues({
      allElement: false,
      paidElement: false,
      pendingElement: true,
    });
  };
  
  const showProfileConnector = () => {
    return (
      <>
        {/* show active */}
        {statusValues.allElement && (
          <>
            <div className="">
              <RecentOrders orders={orders} />
            </div>
          </>
        )}

        {/* show inactive */}
        {statusValues.paidElement && (
          <>
            <div className="">
              <Paid orders={orders} />
            </div>
          </>
        )}
        
        {statusValues.pendingElement && (
          <>
            <div className="">
              <Pending orders={orders} />
            </div>
          </>
        )}
      </>
    );
  };

  return (
    <DashboardLayout>
      <Modal
        classNames={{
          modal: "rounded-[10px] overflow-visible relative",
        }}
        open={openM}
        onClose={() => {}} // Prevents closing the modal
        closeOnEsc={false} // Prevent closing with the Escape key
        closeOnOverlayClick={false} // Prevent closing by clicking outside
        showCloseIcon={false} // Hides the close button
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
      
      {loader ? null : (
        <div>
          <div className="md:flex gap-3 items-center mb-7">
            <div className="grid lg:grid-cols-5 md:mb-0 mb-3 w-full items gap-2">
              <div className="bg-white rounded-[10px] pt-2 pb-1 px-3">
                <div className="flex flex-col gap-1">
                  <h5 className="text-[#9D9D9D] text-[12px] font-[600]">
                    TOTAL ORDERS
                  </h5>
                  <div className="flex justify-between">
                    <h5 className="text-[#9D9D9D] text-[16px] font-[300]">
                      {totalOrders}
                    </h5>
                    <img
                      aria-hidden
                      src="/images/orders/totalorders.svg"
                      alt="Window icon"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[10px] pt-2 pb-1 px-3">
                <div className="flex flex-col gap-1">
                  <h5 className="text-[#9D9D9D] text-[12px] font-[600]">
                    RETURNS ({selectedCurrency})
                  </h5>
                  <div className="flex justify-between">
                    <h5 className="text-[#9D9D9D] text-[16px] font-[300]">
                      {formattedCurrencyTotal}
                    </h5>
                    <img
                      aria-hidden
                      src="/images/orders/returns.svg"
                      alt="Window icon"
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
                    />
                  </div>
                </div>
              </div>
            </div>
            <Link
              to={"/dashboard/create-an-order"}
              className="rounded-full h-fit w-fit flex items-center gap-3 px-4 py-2"
              style={{
                background: "linear-gradient(to bottom, #382B67, #7056CD)",
              }}
            >
              <IoAddCircleOutline className="text-white" />
              <h5 className="text-[#FFFFFF] text-[16px] font-[400] whitespace-nowrap">
                Create Order
              </h5>
            </Link>
          </div>
          
          <div className="flex gap-2 mb-2">
            <div
              className={`${statusValues.allElement ? 
                "bg-primary text-white rounded-full px-8 py-1"
                : "bg-white text-[#9D9D9D] rounded-full px-8 py-1"
              } cursor-pointer`}
              onClick={() => handleAllState()}
            >
              <h6 className="text-[12px] font-[400]">All</h6>
            </div>

            <div 
              className={`${statusValues.paidElement ? 
                "bg-primary text-white rounded-full px-6 py-1"
                : "bg-white text-[#9D9D9D] rounded-full px-6 py-1"
              } cursor-pointer`}
              onClick={() => handleDraftState()}
            >
              <h6 className="text-[12px] font-[400]">Paid</h6>
            </div>
            
            <div
              className={`${statusValues.pendingElement ? 
                "bg-primary text-white rounded-full px-4 py-1"
                : "bg-white text-[#9D9D9D] rounded-full px-4 py-1"
              } cursor-pointer`}
              onClick={() => handleFlashSalesState()}
            >
              <h6 className="text-[12px] font-[400]">Pending</h6>
            </div>
          </div>
          
          <div className="pt-3">{showProfileConnector()}</div>
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