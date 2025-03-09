import React, { useState } from 'react'
import { UserApis } from '../../../apis/userApi/userApi';
import { useLocation } from 'react-router-dom';
import DashboardLayout from '../../../components/DashboardLayout';

const TransactionDetails = () => {
    const [transaction, setTransaction] = useState<any>(null);
    const location = useLocation();

    const { transactionReference,storeCode } = location.state || {}; // Extract values correctly
    
    React.useEffect(() => {
      if (storeCode && transactionReference) {
        UserApis.getSingleTransaction(storeCode, transactionReference)
          .then((response) => {
            if (response?.data) {
              // console.log(response.data);
              setTransaction(response?.data);
            }
          })
          .catch((error) => {
            console.error("Error fetching transaction:", error);
          });
      }
    }, [storeCode, transactionReference]);
    
    // console.log(transaction);
    
  return (
    <DashboardLayout>
    <div className="grid lg:grid-cols-12 gap-3 my-6">
      <div className="col-span-8 flex flex-col gap-3">
      {/* <DeliveryMethod /> */}
      <div>
          <div className="bg-white rounded-[14px] pt-3 pb-4 pl-3 pr-5">
            <div className='pb-2 border-b'>
            <b
                style={{
                  fontWeight: "500",
                  fontSize: "10px",
                  backgroundColor: "#C9F0D0",
                  color: "#51CF66",
                  borderRadius: "10px",
                  padding: "2px 10px",
                }}
              >
                Fulfilled (2)
              </b>
            </div>
            <h4 className="text-[#000000] text-[14px] font-[600] pb-2">
              Delivery Method
            </h4>
            <h4 className="text-[#000000] text-[14px] font-[600] pb-2">
              Standard
            </h4>

            <div className="flex flex-col gap-2">
              <div className=" py-3 border-b px-2">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <svg
                      width="41"
                      height="42"
                      viewBox="0 0 41 42"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        y="0.579346"
                        width="41"
                        height="41"
                        rx="6"
                        fill="#F1F1FB"
                      />
                      <path
                        d="M29.7143 11.0793H13.2857C12.4146 11.0804 11.5794 11.4494 10.9634 12.1056C10.3474 12.7617 10.001 13.6514 10 14.5793V28.5793C10.001 29.5073 10.3474 30.3969 10.9634 31.0531C11.5794 31.7093 12.4146 32.0783 13.2857 32.0793H29.7143C30.5854 32.0783 31.4206 31.7093 32.0366 31.0531C32.6526 30.3969 32.9991 29.5073 33 28.5793V14.5793C32.9991 13.6514 32.6526 12.7617 32.0366 12.1056C31.4206 11.4494 30.5854 11.0804 29.7143 11.0793ZM25.6071 14.5793C26.0945 14.5793 26.571 14.7333 26.9762 15.0217C27.3815 15.3102 27.6973 15.7201 27.8838 16.1998C28.0704 16.6795 28.1192 17.2073 28.0241 17.7165C27.929 18.2257 27.6943 18.6934 27.3497 19.0605C27.005 19.4276 26.5659 19.6776 26.0879 19.7789C25.6099 19.8802 25.1144 19.8282 24.6641 19.6295C24.2138 19.4309 23.8289 19.0944 23.5582 18.6627C23.2874 18.231 23.1429 17.7235 23.1429 17.2043C23.1435 16.5084 23.4034 15.8411 23.8654 15.349C24.3274 14.8569 24.9538 14.5801 25.6071 14.5793ZM13.2857 30.3293C12.85 30.3293 12.4321 30.145 12.124 29.8168C11.8159 29.4886 11.6429 29.0435 11.6429 28.5793V24.8808L16.5119 20.2707C16.9817 19.8269 17.5926 19.5905 18.2203 19.6098C18.8479 19.6291 19.445 19.9026 19.89 20.3746L23.2245 23.9189L17.2065 30.3293H13.2857ZM31.3571 28.5793C31.3571 29.0435 31.1841 29.4886 30.876 29.8168C30.5679 30.145 30.15 30.3293 29.7143 30.3293H19.5301L25.7637 23.6892C26.2051 23.2894 26.7651 23.0691 27.3445 23.0675C27.9239 23.0659 28.485 23.2831 28.9283 23.6804L31.3571 25.8362V28.5793Z"
                        fill="#D8D8E2"
                      />
                    </svg>

                    <div className="flex flex-col gap-2">
                      <h5 className="text-[12px] font-[500]">Product Name</h5>
                      <div className="flex gap-1">
                        <div className="bg-[#796BEB1A]/[10%] rounded-[10px] py-1 px-3">
                          <h5 className="text-[10px] font-[400]">Colour</h5>
                        </div>
                        <div className="bg-[#796BEB1A]/[10%] rounded-[10px] py-1 px-3">
                          <h5 className="text-[10px] font-[400]">Size</h5>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <img
                          aria-hidden
                          src="/images/orders/discountcode.svg"
                          alt="Window icon"
                          //   className='w-[120px] h-[120px] '
                          // width={140}
                          // height={140}
                        />
                        <h5 className="text-[#9D9D9D] text-[12px] font-[500]">
                          DISCOUNT CODE?
                        </h5>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <h5 className="text-[12px] font-[500]">
                      <span className="text-[#9D9D9D]">
                        <del>$20.00</del>
                      </span>{" "}
                      $15.00 x 1
                    </h5>
                    <h5 className="text-[12px] font-[500]">$15.00</h5>
                  </div>
                </div>
              </div>

              <div className=" py-3 border-b px-2">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <svg
                      width="41"
                      height="42"
                      viewBox="0 0 41 42"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        y="0.579346"
                        width="41"
                        height="41"
                        rx="6"
                        fill="#F1F1FB"
                      />
                      <path
                        d="M29.7143 11.0793H13.2857C12.4146 11.0804 11.5794 11.4494 10.9634 12.1056C10.3474 12.7617 10.001 13.6514 10 14.5793V28.5793C10.001 29.5073 10.3474 30.3969 10.9634 31.0531C11.5794 31.7093 12.4146 32.0783 13.2857 32.0793H29.7143C30.5854 32.0783 31.4206 31.7093 32.0366 31.0531C32.6526 30.3969 32.9991 29.5073 33 28.5793V14.5793C32.9991 13.6514 32.6526 12.7617 32.0366 12.1056C31.4206 11.4494 30.5854 11.0804 29.7143 11.0793ZM25.6071 14.5793C26.0945 14.5793 26.571 14.7333 26.9762 15.0217C27.3815 15.3102 27.6973 15.7201 27.8838 16.1998C28.0704 16.6795 28.1192 17.2073 28.0241 17.7165C27.929 18.2257 27.6943 18.6934 27.3497 19.0605C27.005 19.4276 26.5659 19.6776 26.0879 19.7789C25.6099 19.8802 25.1144 19.8282 24.6641 19.6295C24.2138 19.4309 23.8289 19.0944 23.5582 18.6627C23.2874 18.231 23.1429 17.7235 23.1429 17.2043C23.1435 16.5084 23.4034 15.8411 23.8654 15.349C24.3274 14.8569 24.9538 14.5801 25.6071 14.5793ZM13.2857 30.3293C12.85 30.3293 12.4321 30.145 12.124 29.8168C11.8159 29.4886 11.6429 29.0435 11.6429 28.5793V24.8808L16.5119 20.2707C16.9817 19.8269 17.5926 19.5905 18.2203 19.6098C18.8479 19.6291 19.445 19.9026 19.89 20.3746L23.2245 23.9189L17.2065 30.3293H13.2857ZM31.3571 28.5793C31.3571 29.0435 31.1841 29.4886 30.876 29.8168C30.5679 30.145 30.15 30.3293 29.7143 30.3293H19.5301L25.7637 23.6892C26.2051 23.2894 26.7651 23.0691 27.3445 23.0675C27.9239 23.0659 28.485 23.2831 28.9283 23.6804L31.3571 25.8362V28.5793Z"
                        fill="#D8D8E2"
                      />
                    </svg>

                    <div className="flex flex-col gap-2">
                      <h5 className="text-[12px] font-[500]">Product Name</h5>
                      <div className="flex gap-1">
                        <div className="bg-[#796BEB1A]/[10%] rounded-[10px] py-1 px-3">
                          <h5 className="text-[10px] font-[400]">Colour</h5>
                        </div>
                        <div className="bg-[#796BEB1A]/[10%] rounded-[10px] py-1 px-3">
                          <h5 className="text-[10px] font-[400]">Size</h5>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <img
                          aria-hidden
                          src="/images/orders/discountcode.svg"
                          alt="Window icon"
                          //   className='w-[120px] h-[120px] '
                          // width={140}
                          // height={140}
                        />
                        <h5 className="text-[#9D9D9D] text-[12px] font-[500]">
                          DISCOUNT CODE?
                        </h5>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <h5 className="text-[12px] font-[500]">
                      <span className="text-[#9D9D9D]">
                        <del>$20.00</del>
                      </span>{" "}
                      $15.00 x 1
                    </h5>
                    <h5 className="text-[12px] font-[500]">$15.00</h5>
                  </div>
                </div>
              </div>
            </div>

            <div className=" py-3 border-b px-2">
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <svg
                    width="41"
                    height="42"
                    viewBox="0 0 41 42"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      y="0.579346"
                      width="41"
                      height="41"
                      rx="6"
                      fill="#F1F1FB"
                    />
                    <path
                      d="M29.7143 11.0793H13.2857C12.4146 11.0804 11.5794 11.4494 10.9634 12.1056C10.3474 12.7617 10.001 13.6514 10 14.5793V28.5793C10.001 29.5073 10.3474 30.3969 10.9634 31.0531C11.5794 31.7093 12.4146 32.0783 13.2857 32.0793H29.7143C30.5854 32.0783 31.4206 31.7093 32.0366 31.0531C32.6526 30.3969 32.9991 29.5073 33 28.5793V14.5793C32.9991 13.6514 32.6526 12.7617 32.0366 12.1056C31.4206 11.4494 30.5854 11.0804 29.7143 11.0793ZM25.6071 14.5793C26.0945 14.5793 26.571 14.7333 26.9762 15.0217C27.3815 15.3102 27.6973 15.7201 27.8838 16.1998C28.0704 16.6795 28.1192 17.2073 28.0241 17.7165C27.929 18.2257 27.6943 18.6934 27.3497 19.0605C27.005 19.4276 26.5659 19.6776 26.0879 19.7789C25.6099 19.8802 25.1144 19.8282 24.6641 19.6295C24.2138 19.4309 23.8289 19.0944 23.5582 18.6627C23.2874 18.231 23.1429 17.7235 23.1429 17.2043C23.1435 16.5084 23.4034 15.8411 23.8654 15.349C24.3274 14.8569 24.9538 14.5801 25.6071 14.5793ZM13.2857 30.3293C12.85 30.3293 12.4321 30.145 12.124 29.8168C11.8159 29.4886 11.6429 29.0435 11.6429 28.5793V24.8808L16.5119 20.2707C16.9817 19.8269 17.5926 19.5905 18.2203 19.6098C18.8479 19.6291 19.445 19.9026 19.89 20.3746L23.2245 23.9189L17.2065 30.3293H13.2857ZM31.3571 28.5793C31.3571 29.0435 31.1841 29.4886 30.876 29.8168C30.5679 30.145 30.15 30.3293 29.7143 30.3293H19.5301L25.7637 23.6892C26.2051 23.2894 26.7651 23.0691 27.3445 23.0675C27.9239 23.0659 28.485 23.2831 28.9283 23.6804L31.3571 25.8362V28.5793Z"
                      fill="#D8D8E2"
                    />
                  </svg>

                  <div className="flex flex-col gap-2">
                    <h5 className="text-[12px] font-[500]">Product Name</h5>
                    <div className="flex gap-1">
                      <div className="bg-[#796BEB1A]/[10%] rounded-[10px] py-1 px-3">
                        <h5 className="text-[10px] font-[400]">Colour</h5>
                      </div>
                      <div className="bg-[#796BEB1A]/[10%] rounded-[10px] py-1 px-3">
                        <h5 className="text-[10px] font-[400]">Size</h5>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <img
                        aria-hidden
                        src="/images/orders/discountcode.svg"
                        alt="Window icon"
                        //   className='w-[120px] h-[120px] '
                        // width={140}
                        // height={140}
                      />
                      <h5 className="text-[#9D9D9D] text-[12px] font-[500]">
                        DISCOUNT CODE?
                      </h5>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <h5 className="text-[12px] font-[500]">
                    <span className="text-[#9D9D9D]">
                      <del>$20.00</del>
                    </span>{" "}
                    $15.00 x 1
                  </h5>
                  <h5 className="text-[12px] font-[500]">$15.00</h5>
                </div>
              </div>
            </div>
          </div>
    </div>
      {/* <DiscountStatus /> */}
      </div>

      <div className="col-span-4 flex flex-col gap-3">
          {/* <Note />
          <CustomerInfo />
          <CustomerHistory /> */}
      </div>
    </div>
  </DashboardLayout>
  )
}

export default TransactionDetails