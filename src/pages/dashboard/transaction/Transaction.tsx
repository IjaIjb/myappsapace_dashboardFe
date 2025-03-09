import React from "react";
import DashboardLayout from "../../../components/DashboardLayout";
// import { Link } from 'react-router-dom'
// import { IoAddCircleOutline } from 'react-icons/io5'
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { UserApis } from "../../../apis/userApi/userApi";
import TransactionTable from "./TransactionTable";

const Transaction = () => {
  const [loader, setLoader] = React.useState<boolean>(false);

  const selectedStore = useSelector(
    (state: RootState) => state.globalState?.selectedStore || null
  );
  // console.log("Selected Store Code:", selectedStore);
  const [transaction, setTransaction] = React.useState<any>([]);

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
  return (
    <DashboardLayout>
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
          <TransactionTable transaction={transaction} />
        </div>
      )}
    </DashboardLayout>
  );
};

export default Transaction;
