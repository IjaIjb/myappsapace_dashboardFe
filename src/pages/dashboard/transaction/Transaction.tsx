import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../components/DashboardLayout";
// import { Link } from 'react-router-dom'
// import { IoAddCircleOutline } from 'react-icons/io5'
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { UserApis } from "../../../apis/userApi/userApi";
import TransactionTable from "./TransactionTable";
import Paid from "./paid/Paid";
import Pending from "./pending/Pending";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { Link } from "react-router-dom";

const Transaction = () => {
  const [loader, setLoader] = React.useState<boolean>(false);

  const selectedStore = useSelector(
    (state: RootState) => state.globalState?.selectedStore || null
  );
  // console.log("Selected Store Code:", selectedStore);
  const [transaction, setTransaction] = React.useState<any>([]);
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
    
  React.useEffect(() => {
    setLoader(true);
    const query = {
      transaction_reference: "",
      payment_status: "",
      payment_method: "",
      currency: "",
      min_amount: "",
      max_amount: "",
      start_date: "",
      end_date: "",
      per_page: "",
    };

    UserApis.getTransaction(selectedStore, query)
      .then((response) => {
        if (response?.data) {
          // console.log(response?.data);

          setTransaction(response?.data);
          setLoader(false);
        } else {
          setLoader(false);
        }
      })
      .catch(function (error) {
        console.error("Error fetching transaction:", error);
        setLoader(false);
      });
  }, [selectedStore]); // Depend on selectedCurrency so it updates when changed

  const totalTransactions = transaction?.transactions?.data?.length || 0;

  // console.log("Total Orders:", totalTransactions);
  const initialStatusState = {
    allElement: true,
    paidElement: false,
    pendingElement: false,
  };
  
  const [statusValues, setStatusValues] = useState({
    ...initialStatusState,
  });
  
  const handleAllState = () => {
    // e.preventDefault();
    setStatusValues({
      allElement: true,
      paidElement: false,
      pendingElement: false,
    });
  };
  
  const handleDraftState = () => {
    // e.preventDefault();
    setStatusValues({
      allElement: false,
      paidElement: true,
      pendingElement: false,
    });
  };
  
  const handleFlashSalesState = () => {
    // e.preventDefault();
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
                    <TransactionTable transaction={transaction} />

  
  
            </div>
          </>
        )}
  
        {/* show inactive */}
        {statusValues.paidElement && (
          <>
            <div className="">
            <Paid transaction={transaction} />
            </div>
          </>
        )}
         {statusValues.pendingElement && (
          <>
            <div className="">
            <Pending transaction={transaction} />
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
      {loader ? null : (
        <div>
          <div className="flex gap-3 items-center mb-7">
            <div className="grid lg:grid-cols-5 w-full items gap-2">
              <div className="bg-white rounded-[10px] pt-2 pb-1 px-3">
                <div className="flex flex-col gap-1">
                  <h5 className="text-[#9D9D9D] text-[12px] font-[600]">
                    TOTAL TRANSACTIONS
                  </h5>
                  <div className="flex justify-between">
                    <h5 className="text-[#9D9D9D] text-[16px] font-[300]">
                      {totalTransactions}
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
                      $0
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
            {/* <Link
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
        </Link> */}
          </div>
            <div className="flex gap-2 mb-2">
        <div
         className={`${statusValues.allElement ? 
 "bg-primary text-white rounded-full px-8 py-1"
 :  "bg-white text-[#9D9D9D] rounded-full px-8 py-1"
         } cursor-pointer`}
         onClick={() => handleAllState()}
        
         >
          <h6 className=" text-[12px] font-[400]">All</h6>
        </div>

        <div 
             className={`${statusValues.paidElement ? 
              "bg-primary text-white rounded-full px-6 py-1"
              :  "bg-white text-[#9D9D9D] rounded-full px-6 py-1"
                      } cursor-pointer`}
                      onClick={() => handleDraftState()}>
          <h6 className="text-[12px] font-[400]">Completed</h6>
        </div>
        <div
            className={`${statusValues.pendingElement ? 
              "bg-primary text-white rounded-full px-4 py-1"
              :  "bg-white text-[#9D9D9D] rounded-full px-4 py-1"
                      } cursor-pointer`}
                      onClick={() => handleFlashSalesState()}
                     >
          <h6 className=" text-[12px] font-[400]">Pending</h6>
        </div>
      </div>
      <div className="pt-3">{showProfileConnector()}</div>

        </div>
      )}
    </DashboardLayout>
  );
};

export default Transaction;
