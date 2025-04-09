import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../components/DashboardLayout";
import ReferAndEarn from "./ReferAndEarn";
import TopSelling from "./TopSelling";
import QuickAction from "./QuickAction";
import OrderHome from "./OrderHome";
import { useSelector } from "react-redux";
import OrderChart from "./OrderChart";
import { UserApis } from "../../../apis/userApi/userApi";
import { RootState } from "../../../store/store";
import LoadingSpinnerPage from "../../../components/UI/LoadingSpinnerPage";

const Home = () => {
  // const userLoginData = useSelector((state: any) => state.data.login.value);
  // console.log(userLoginData);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const selectedStore = useSelector(
    (state: RootState) => state.globalState?.selectedStore || null
  );

  const [customer, setCustomer] = React.useState<any>([]);


    React.useEffect(() => {
      UserApis.getAllCustomer(selectedStore)
        .then((response) => {
          if (response?.data) {
            console?.log(response?.data);
            setCustomer(response?.data);
          } else {
            // dispatch(login([]))
          }
        })
        .catch(function (error) {});
    }, [selectedStore]);
    // console.log(customer)

    const activeCustomersCount = customer?.data?.customers?.filter((cust: any) => cust.status === "active").length || 0;

// console.log("Total Active Customers:", activeCustomersCount);

  useEffect(() => {
    setLoading(true);
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
          setOrders(response?.data?.orders?.data);
        }
      })
      .catch((error) => console.error("Error fetching orders:", error))
      .finally(() => setLoading(false));
  }, [selectedStore]);

  return (
    <div>
      <DashboardLayout>
        <div className="w-full">
          <div className="grid lg:grid-cols-12 gap-3">
            <div className="lg:col-span-8 flex flex-col gap-3">
              <div className="grid lg:grid-cols-4 gap-2">
                <div className="bg-white rounded-[10px] pt-2 pb-1 px-3">
                  <div className="flex flex-col gap-1">
                    <h5 className="text-[#9D9D9D] text-[12px] font-[600]">
                      CUSTOMERS
                    </h5>
                    <div className="flex justify-between">
                      <h5 className="text-[#9D9D9D] text-[16px] font-[300]">
                        {activeCustomersCount}
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

                <div className="bg-white rounded-[10px] pt-2 pb-1 px-3">
                  <div className="flex flex-col gap-1">
                    <h5 className="text-[#9D9D9D] text-[12px] font-[600]">
                      TOTAL SALES
                    </h5>
                    <div className="flex justify-between">
                      <h5 className="text-[#9D9D9D] text-[16px] font-[300]">
                        0$
                      </h5>
                      <img
                        aria-hidden
                        src="/images/home/totalsales.svg"
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
                      PRODUCTS
                    </h5>
                    <div className="flex justify-between">
                      <h5 className="text-[#9D9D9D] text-[16px] font-[300]">
                        0
                      </h5>
                      <img
                        aria-hidden
                        src="/images/home/product.svg"
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
                      CONVERSION RATE
                    </h5>
                    <div className="flex justify-between">
                      <h5 className="text-[#9D9D9D] text-[16px] font-[300]">
                        0.00%
                      </h5>
                      <img
                        aria-hidden
                        src="/images/home/rate.svg"
                        alt="Window icon"
                        //   className='w-[120px] h-[120px] '
                        // width={140}
                        // height={140}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {loading ? (
               <div>
<LoadingSpinnerPage />
                </div>
              ) : (
                <>
                  <OrderChart orders={orders} />
                  <OrderHome orders={orders} />
                </>
              )}
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <TopSelling />
              <QuickAction />

              <ReferAndEarn />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default Home;
