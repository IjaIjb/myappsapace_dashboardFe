import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { UserApis } from "../apis/userApi/userApi";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedStore } from "../store/stateSlice";
import { RootState } from "../store/store";
import { Listbox } from "@headlessui/react";
import { Transition } from "@headlessui/react";
import { Fragment } from "react";
// import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { AiOutlineCheck, AiOutlineDown } from "react-icons/ai";

type Props = {
  toggle: () => void;
  DrawerOpen: boolean;
  open: () => void;
};

const Sidebar = (props: Props) => {
  const dispatch = useDispatch();
 
  const selectedStore = useSelector((state: RootState) => state.globalState?.selectedStore || null);
  console.log(selectedStore)
  const [stores, setStores] = useState<any>([]);
    
        useEffect(() => {
          const storedStore = localStorage.getItem("selectedStore"); // Retrieve from localStorage
          if (storedStore) {
            dispatch(setSelectedStore(storedStore));
          }
      
          UserApis.getStore()
            .then((response) => {
              if (response?.data) {
                setStores(response?.data || []);
                if (!selectedStore && response?.data?.data.length > 0) {
                  const firstStore = response?.data?.data[0].store_code;
                  dispatch(setSelectedStore(firstStore));
                  localStorage.setItem("selectedStore", firstStore); // Store it persistently
                }
              }
            })
            .catch((error) => console.error("Error fetching stores:", error));
        }, [dispatch, selectedStore]);
      
        const handleStoreSelect = (storeCode: string) => {
          dispatch(setSelectedStore(storeCode));
          localStorage.setItem("selectedStore", storeCode);
        };
      
  const url = useLocation();
  const { pathname } = url;
  const pathnames = pathname.split("/").filter((x: any) => x);
  return (
    <aside
      className={`${
        props.DrawerOpen ? "" : ""
      } relative w-[250px] bg-[#796BEB] z-[100] scrollbar-hide overflow-y-auto pl-8 pr-3  border-[#ECEDEF] h-screen`}
    >
      <div className="flex items-center pt-6  justify-between px-2 md:px-4">
        <div className="lg:hidden block"></div>
       
       <div>
        <div className="flex justify-center ">
          <Link to={"/dashboard/home"}>
            <img
              aria-hidden
              src="/images/logo.svg"
              alt="Window icon"
              //   className='w-[120px] h-[120px] '
              // width={140}
              // height={140}
            />
            {/* <img src={logo} alt="Logo" className="w-[100px] h-[37px]" /> */}
          </Link>


        </div>
       {/* Store Selector */}
        <div className="mt-5">
    <h5 className="text-white text-[12px] font-[700]">STORE</h5>
    
    <Listbox value={selectedStore || ""} onChange={handleStoreSelect}>
      <div className="relative mt-2">
        <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-secondary py-2 pl-3 pr-10 text-left shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm">
          <span className="block truncate text-white">
            {stores.data?.data?.find((store: any) => store.store_code === selectedStore)?.store_name || "Select a Store"}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            {/* <SelectorIcon className="w-5 h-5 text-gray-500" aria-hidden="true" /> */}
            <AiOutlineDown className="w-5 h-5 text-gray-500" aria-hidden="true" />
          </span>
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {stores.data?.data?.map((store: any) => (
              <Listbox.Option
                key={store.id}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                    active ? "bg-indigo-100 text-indigo-900" : "text-gray-900"
                  }`
                }
                value={store.store_code}
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                      {store.store_name}
                    </span>
                    {selected && (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        {/* <CheckIcon className="w-5 h-5 text-indigo-600" aria-hidden="true" /> */}
                        <AiOutlineCheck className="w-5 h-5 text-purple-600" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  </div>
        </div>
        <button
          onClick={() => {
            // setShowInfoTag(false)
            props.toggle();
          }}
          className=""
        >
          {props.DrawerOpen ? (
            <AiOutlineClose className="w-4 h-4 md:w-6 md:h-6 font-bold text-white " />
          ) : (
            <AiOutlineMenu className="w-4 h-4 md:w-6 md:h-6  font-bold hidden " />
          )}
        </button>
      </div>

      <div className="">
        <div className="flex gap-2"></div>
        <div className="mt-7 flex flex-col gap-3">
          <h5 className="text-white text-[12px] font-[700]">ACTIVITY</h5>

          <div className="">
            <div className="">
              <Link to={"/dashboard/home"} className="relative gap-1  ">
                <div
                  className={`${
                    ["dashboard", "home"].every((ai) => pathnames.includes(ai))
                      ? "bg-white text-primary "
                      : " text-white"
                  } gap-x-3 flex items-center px-6 text-[14px]  hover:text-[16px] hover:font-[600] rounded-[10px] py-[10px] `}
                >
                  <img
                    aria-hidden
                    src={
                      ["dashboard", "home"].every((ai) =>
                        pathnames.includes(ai)
                      )
                        ? "/images/dashboard.svg"
                        : "/images/dashboard.svg"
                    }
                    alt="Window icon"
                    // width={16}
                    // height={16}
                  />
                  <h5 className="  ">Dashboard</h5>
                </div>
              </Link>
            </div>

            <div className="">
              <Link to={"/dashboard/customers"} className="relative gap-1  ">
                <div
                  className={`${
                    ["dashboard", "customers"].every((ai) =>
                      pathnames.includes(ai)
                    )
                      ? "bg-white text-primary "
                      : " text-white"
                  } gap-x-3 flex items-center px-6 text-[14px] hover:text-[16px] hover:font-[600] rounded-[10px] py-[10px] `}
                >
                  <img
                    aria-hidden
                    src={
                      ["dashboard", "customers"].every((ai) =>
                        pathnames.includes(ai)
                      )
                        ? "/images/customers.svg"
                        : "/images/customers.svg"
                    }
                    alt="Window icon"
                    // width={16}
                    // height={16}
                  />
                  <h5 className=" ">Customers</h5>
                </div>
              </Link>
            </div>

            <div className="">
              <Link to={"/dashboard/products"} className="relative gap-1  ">
                <div
                  className={`${
                    ["dashboard", "products"].every((ai) =>
                      pathnames.includes(ai)
                    )
                      ? "bg-white text-primary "
                      : " text-white"
                  } gap-x-3 flex items-center px-6 text-[14px] hover:text-[16px] hover:font-[600] rounded-[10px] py-[10px] `}
                >
                  <img
                    aria-hidden
                    src={
                      ["dashboard", "products"].every((ai) =>
                        pathnames.includes(ai)
                      )
                        ? "/images/products.svg"
                        : "/images/products.svg"
                    }
                    alt="Window icon"
                    // width={16}
                    // height={16}
                  />
                  <h5 className="">Products</h5>
                </div>
              </Link>
            </div>

            <div className="">
              <Link to={"/dashboard/order"} className="relative gap-1  ">
                <div
                  className={`${
                    ["dashboard", "order"].every((ai) => pathnames.includes(ai))
                      ? "bg-white text-primary "
                      : " text-white"
                  } gap-x-3 flex items-center px-6 text-[14px] hover:text-[16px] hover:font-[600] rounded-[10px] py-[10px] `}
                >
                  <img
                    aria-hidden
                    src={
                      ["dashboard", "order"].every((ai) =>
                        pathnames.includes(ai)
                      )
                        ? "/images/orders.svg"
                        : "/images/orders.svg"
                    }
                    alt="Window icon"
                    // width={16}
                    // height={16}
                  />
                  <h5 className=" ">Orders</h5>
                </div>
              </Link>
            </div>

            <div className="">
              <Link to={"/dashboard/transaction"} className="relative gap-1  ">
                <div
                  className={`${
                    ["dashboard", "transaction"].every((ai) => pathnames.includes(ai))
                      ? "bg-white text-primary "
                      : " text-white"
                  } gap-x-3 flex items-center px-6 text-[14px] hover:text-[16px] hover:font-[600] rounded-[10px] py-[10px] `}
                >
                  <img
                    aria-hidden
                    src={
                      ["dashboard", "transaction"].every((ai) =>
                        pathnames.includes(ai)
                      )
                        ? "/images/orders.svg"
                        : "/images/orders.svg"
                    }
                    alt="Window icon"
                    // width={16}
                    // height={16}
                  />
                  <h5 className=" ">Transactions</h5>
                </div>
              </Link>
            </div>

            <div className="">
              <Link to={"/dashboard/category"} className="relative gap-1  ">
                <div
                  className={`${
                    ["dashboard", "category"].every((ai) => pathnames.includes(ai))
                      ? "bg-white text-primary "
                      : " text-white"
                  } gap-x-3 flex items-center px-6 text-[14px] hover:text-[16px] hover:font-[600] rounded-[10px] py-[10px] `}
                >
                  <img
                    aria-hidden
                    src={
                      ["dashboard", "category"].every((ai) =>
                        pathnames.includes(ai)
                      )
                        ? "/images/orders.svg"
                        : "/images/orders.svg"
                    }
                    alt="Window icon"
                    // width={16}
                    // height={16}
                  />
                  <h5 className=" ">Category</h5>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-3">
          <h5 className="text-white text-[12px] font-[700]">MY STORE</h5>

          <div className="">
          <div className="">
              <Link to={"/dashboard/store"} className="relative gap-1  ">
                <div
                  className={`${
                    ["dashboard", "store"].every((ai) => pathnames.includes(ai))
                      ? "bg-white text-primary "
                      : " text-white"
                  } gap-x-3 flex items-center px-6 text-[14px] hover:text-[16px] hover:font-[600] rounded-[10px] py-[10px] `}
                >
                  <img
                    aria-hidden
                    src={
                      ["dashboard", "store"].every((ai) =>
                        pathnames.includes(ai)
                      )
                        ? "/images/theme.svg"
                        : "/images/theme.svg"
                    }
                    alt="Window icon"
                    // width={16}
                    // height={16}
                  />
                  <h5 className="">Store</h5>
                </div>
              </Link>
            </div>

            <div className="">
              <Link to={"/dashboard/theme"} className="relative gap-1  ">
                <div
                  className={`${
                    ["dashboard", "theme"].every((ai) => pathnames.includes(ai))
                      ? "bg-white text-primary "
                      : " text-white"
                  } gap-x-3 flex items-center px-6 text-[14px] hover:text-[16px] hover:font-[600] rounded-[10px] py-[10px] `}
                >
                  <img
                    aria-hidden
                    src={
                      ["dashboard", "theme"].every((ai) =>
                        pathnames.includes(ai)
                      )
                        ? "/images/theme.svg"
                        : "/images/theme.svg"
                    }
                    alt="Window icon"
                    // width={16}
                    // height={16}
                  />
                  <h5 className="">Theme</h5>
                </div>
              </Link>
            </div>

            <div className="">
              <Link to={"/dashboard/finances"} className="relative gap-1  ">
                <div
                  className={`${
                    ["dashboard", "finances"].every((ai) =>
                      pathnames.includes(ai)
                    )
                      ? "bg-white text-primary "
                      : " text-white"
                  } gap-x-3 flex items-center px-6 text-[14px] hover:text-[16px] hover:font-[600] rounded-[10px] py-[10px] `}
                >
                  <img
                    aria-hidden
                    src={
                      ["dashboard", "finances"].every((ai) =>
                        pathnames.includes(ai)
                      )
                        ? "/images/finances.svg"
                        : "/images/finances.svg"
                    }
                    alt="Window icon"
                    // width={16}
                    // height={16}
                  />
                  <h5 className=" ">Finances</h5>
                </div>
              </Link>
            </div>

            <div className="">
              <Link to={"/dashboard/gift-cards"} className="relative gap-1  ">
                <div
                  className={`${
                    ["dashboard", "gift-cards"].every((ai) =>
                      pathnames.includes(ai)
                    )
                      ? "bg-white text-primary "
                      : " text-white"
                  } gap-x-3 flex items-center px-6 text-[14px] hover:text-[16px] hover:font-[600] rounded-[10px] py-[10px] `}
                >
                  <img
                    aria-hidden
                    src={
                      ["dashboard", "gift-cards"].every((ai) =>
                        pathnames.includes(ai)
                      )
                        ? "/images/giftcard.svg"
                        : "/images/giftcard.svg"
                    }
                    alt="Window icon"
                    // width={16}
                    // height={16}
                  />
                  <h5 className="">Gift Cards</h5>
                </div>
              </Link>
            </div>

            <div className="">
              <Link to={"/dashboard/discounts"} className="relative gap-1  ">
                <div
                  className={`${
                    ["dashboard", "discounts"].every((ai) =>
                      pathnames.includes(ai)
                    )
                      ? "bg-white text-primary "
                      : " text-white"
                  } gap-x-3 flex items-center px-6 text-[14px] hover:text-[16px] hover:font-[600] rounded-[10px] py-[10px] `}
                >
                  <img
                    aria-hidden
                    src={
                      ["dashboard", "discounts"].every((ai) =>
                        pathnames.includes(ai)
                      )
                        ? "/images/discount.svg"
                        : "/images/discount.svg"
                    }
                    alt="Window icon"
                    // width={16}
                    // height={16}
                  />
                  <h5 className="">Discounts/Promo</h5>
                </div>
              </Link>
            </div>

            <div className="">
              <Link to={"/dashboard/analytics"} className="relative gap-1  ">
                <div
                  className={`${
                    ["dashboard", "analytics"].every((ai) =>
                      pathnames.includes(ai)
                    )
                      ? "bg-white text-primary "
                      : " text-white"
                  } gap-x-3 flex items-center px-6 text-[14px] hover:text-[16px] hover:font-[600] rounded-[10px] py-[10px] `}
                >
                  <img
                    aria-hidden
                    src={
                      ["dashboard", "analytics"].every((ai) =>
                        pathnames.includes(ai)
                      )
                        ? "/images/analytics.svg"
                        : "/images/analytics.svg"
                    }
                    alt="Window icon"
                    // width={16}
                    // height={16}
                  />
                  <h5 className="">Analytics</h5>
                </div>
              </Link>
            </div>

            <div className="">
              <Link to={"/dashboard/marketing"} className="relative gap-1  ">
                <div
                  className={`${
                    ["dashboard", "marketing"].every((ai) =>
                      pathnames.includes(ai)
                    )
                      ? "bg-white text-primary "
                      : " text-white"
                  } gap-x-3 flex items-center px-6 text-[14px] hover:text-[16px] hover:font-[600] rounded-[10px] py-[10px] `}
                >
                  <img
                    aria-hidden
                    src={
                      ["dashboard", "marketing"].every((ai) =>
                        pathnames.includes(ai)
                      )
                        ? "/images/marketing.svg"
                        : "/images/marketing.svg"
                    }
                    alt="Window icon"
                    // width={16}
                    // height={16}
                  />
                  <h5 className="">Marketing</h5>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-3">
          <h5 className="text-white text-[12px] font-[700]">SETUP</h5>

          <div className="">
            <div className="">
              <Link to={"/dashboard/settings"} className="relative gap-1  ">
                <div
                  className={`${
                    ["dashboard", "settings"].every((ai) =>
                      pathnames.includes(ai)
                    )
                      ? "bg-white text-primary "
                      : " text-white"
                  } gap-x-3 flex items-center px-6 text-[14px] hover:text-[16px] hover:font-[600] rounded-[10px] py-[10px] `}
                >
                  <img
                    aria-hidden
                    src={
                      ["dashboard", "settings"].every((ai) =>
                        pathnames.includes(ai)
                      )
                        ? "/images/settings.svg"
                        : "/images/settings.svg"
                    }
                    alt="Window icon"
                    // width={16}
                    // height={16}
                  />
                  <h5 className="">Settings</h5>
                </div>
              </Link>
            </div>

            {/* <div className="">
              <Link to={"/dashboard/setup-theme"} className="relative gap-1  ">
                <div
                  className={`${
                    ["dashboard", "setup-theme"].every((ai) =>
                      pathnames.includes(ai)
                    )
                      ? "bg-white text-primary "
                      : " text-white"
                  } gap-x-3 flex items-center px-6 text-[14px] hover:text-[16px] hover:font-[600] rounded-[10px] py-[10px] `}
                >
                  <img
                    aria-hidden
                    src={
                      ["dashboard", "setup-theme"].every((ai) =>
                        pathnames.includes(ai)
                      )
                        ? "/images/themeset.svg"
                        : "/images/themeset.svg"
                    }
                    alt="Window icon"
                    // width={16}
                    // height={16}
                  />
                  <h5 className=" ">Theme</h5>
                </div>
              </Link>
            </div> */}

            <div className="">
              <Link to={"/dashboard/subscription"} className="relative gap-1  ">
                <div
                  className={`${
                    ["dashboard", "subscription"].every((ai) =>
                      pathnames.includes(ai)
                    )
                      ? "bg-white text-primary "
                      : " text-white"
                  } gap-x-3 flex items-center px-6 text-[14px] hover:text-[16px] hover:font-[600] rounded-[10px] py-[10px] `}
                >
                  <img
                    aria-hidden
                    src={
                      ["dashboard", "subscription"].every((ai) =>
                        pathnames.includes(ai)
                      )
                        ? "/images/subscription.svg"
                        : "/images/subscription.svg"
                    }
                    alt="Window icon"
                    // width={16}
                    // height={16}
                  />
                  <h5 className="">Subscription</h5>
                </div>
              </Link>
            </div>

            <div className="">
              <Link
                to={"/dashboard/help-and-support"}
                className="relative gap-1  "
              >
                <div
                  className={`${
                    ["dashboard", "help-and-support"].every((ai) =>
                      pathnames.includes(ai)
                    )
                      ? "bg-white text-primary "
                      : " text-white"
                  } gap-x-3 flex items-center px-6 text-[14px] hover:text-[16px] hover:font-[600] rounded-[10px] py-[10px] `}
                >
                  <img
                    aria-hidden
                    src={
                      ["dashboard", "help-and-support"].every((ai) =>
                        pathnames.includes(ai)
                      )
                        ? "/images/help.svg"
                        : "/images/help.svg"
                    }
                    alt="Window icon"
                    // width={16}
                    // height={16}
                  />
                  <h5 className="">Help and Support</h5>
                </div>
              </Link>
            </div>
          </div>

          <h5 className="text-[#FFFFFF]/[40%] py-8 text-[12px] font-[700]">
            Powered by MyAppSpace
          </h5>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
