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
import { AiOutlineCheck } from "react-icons/ai";
import LoadingSpinnerPage from "./UI/LoadingSpinnerPage";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { logout } from "../reducer/loginSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
type Props = {
  toggle: () => void;
  DrawerOpen: boolean;
  open: () => void;
};

const Sidebar = (props: Props) => {
  const dispatch = useDispatch();
  const userLoginData = useSelector((state: any) => state.data.login.value);
  const selectedStore = useSelector(
    (state: RootState) => state.globalState?.selectedStore || null
  );
  const [stores, setStores] = useState<any>([]);
  const [openLoadModal, setOpenLoadModal] = useState(false); // Modal loader state

  useEffect(() => {
  const storedStore = localStorage.getItem("selectedStore");

  UserApis.getStore()
    .then((response) => {
      if (response?.data?.data?.data?.length > 0) {
        const storeList = response.data;
        setStores(storeList);

        if (!selectedStore && response?.data?.data?.data?.length > 0) {
                    const firstStore = response?.data?.data?.data[0].store_code;
                    dispatch(setSelectedStore(firstStore));
                    localStorage.setItem("selectedStore", firstStore);
                  }

        // Check if storedStore exists in the fetched list
        const isStoredStoreValid = storeList.some(
          (store: any) => store.store_code === storedStore
        );

        if (storedStore && isStoredStoreValid) {
          dispatch(setSelectedStore(storedStore));
        } else {
          // Reset store if not valid
          dispatch(setSelectedStore(""));
          localStorage.removeItem("selectedStore");
        }
      } else {
        setStores([]);
        dispatch(setSelectedStore(""));
        localStorage.removeItem("selectedStore");
      }
    })
    .catch((error) => console.error("Error fetching stores:", error));
}, [dispatch, selectedStore]);

  const handleStoreSelect = (storeCode: string) => {
    setOpenLoadModal(true); // Show loader modal
    if (!storeCode) {
      dispatch(setSelectedStore(""));
      localStorage.removeItem("selectedStore");
      setTimeout(() => {
        setOpenLoadModal(false); // Hide modal after simulated delay
      }, 2000);
    } else {
      dispatch(setSelectedStore(storeCode));
      localStorage.setItem("selectedStore", storeCode);
      setTimeout(() => {
        setOpenLoadModal(false); // Hide modal after simulated delay
      }, 2000);
    }
 
  };

  const url = useLocation();
  const { pathname } = url;
  const pathnames = pathname.split("/").filter((x: any) => x);

  const handleLogout = () => {
    dispatch(logout()); // Clear authentication state in Redux
    localStorage.removeItem("token"); // Remove token
    toast.success("Logged out successfully");
    localStorage.removeItem("selectedStore"); // Remove selected store if needed
  };
  
  return (
    <aside
      className={`${
        props.DrawerOpen ? "" : ""
      } relative w-[250px] bg-[#796BEB] scrollbar-hide overflow-y-auto pl-8 pr-3 border-[#ECEDEF] h-screen`}
    >
      <div className="flex items-center pt-6 justify-between px-2">
        <div className="lg:hidden block"></div>

        <div>
          <div className="flex justify-center">
            <Link to={"/dashboard/home"}>
              <img
                aria-hidden
                src="/images/logo.svg"
                alt="Window icon"
              />
            </Link>
          </div>
          {/* Store Selector */}
          <div className="mt-6">
          <div className="bg-indigo-700/50 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-indigo-500/30">
         
          {/* User Info */}
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-medium">
              {userLoginData?.data?.first_name?.charAt(0)}
            </div>
            <h5 className="text-white ml-2 font-medium">
              {userLoginData?.data?.first_name} {userLoginData?.data?.last_name}
            </h5>
          </div>
          
          {/* Store Selector with higher z-index */}
          <div className="relative" style={{ zIndex: 50 }}>
            <Listbox value={selectedStore || ""} onChange={handleStoreSelect}>
              {({ open }) => (
                <div className="relative">
                  <Listbox.Button className="relative w-full py-2 px-3 bg-indigo-800/50 hover:bg-indigo-800/70 rounded-lg transition-colors duration-200 cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-white/30">
                    <span className="block truncate text-sm text-white">
                      {stores.data?.data?.find(
                        (store:any) => store.store_code === selectedStore
                      )?.store_name || "Select a Site"}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                      {open ? (
                        <FaChevronUp className="w-4 h-4 text-white/70" aria-hidden="true" />
                      ) : (
                        <FaChevronDown className="w-4 h-4 text-white/70" aria-hidden="true" />
                      )}
                    </span>
                  </Listbox.Button>

                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute left-0 mt-2 w-full rounded-lg bg-white py-1 overflow-hidden shadow-xl ring-1 ring-black/5 focus:outline-none text-sm" style={{ zIndex: 999 }}>
                      <div className="max-h-60 z-50 relative overflow-y-auto">
                        {/* Store Options */}
                        {stores.data?.data?.map((store:any) => (
                          <Listbox.Option
                            key={store.id}
                            className={({ active }) =>
                              `relative cursor-pointer z-50 select-none py-2 pl-10 pr-4 ${
                                active ? "bg-indigo-100 text-indigo-900" : "text-primary"
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
                                    <AiOutlineCheck className="w-5 h-5 text-indigo-600" aria-hidden="true" />
                                  </span>
                                )}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </div>
                      
                      {/* Additional Options */}
                      <div className="border-t border-gray-200 mt-1">
                        <Link to="/dashboard/site" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                          <span className="ml-6">Add a site</span>
                        </Link>
                        <Link to="/dashboard/subscription" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                          <span className="ml-6">Subscription</span>
                        </Link>
                        <Link to="/dashboard/help-and-support" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                          <span className="ml-6">Help and Support</span>
                        </Link>
                        <button 
                          onClick={handleLogout} 
                          className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          <span className="ml-6">Log out</span>
                        </button>
                      </div>
                    </Listbox.Options>
                  </Transition>
                </div>
              )}
            </Listbox>
          </div>
            </div>
            {/* Loader Modal */}
            <Modal
              classNames={{
                modal: "rounded-[10px] overflow-visible relative",
              }}
              open={openLoadModal}
              onClose={() => setOpenLoadModal(false)}
              showCloseIcon={false}
              center
            >
              <div className="px-2 md:px-5 w-[100px] h-[100px] flex justify-center items-center text-center">
                <LoadingSpinnerPage />
              </div>
            </Modal>
          </div>
        </div>
        <button
          onClick={() => {
            props.toggle();
          }}
          className=""
        >
          {props.DrawerOpen ? (
            <AiOutlineClose className="w-4 h-4 md:w-6 md:h-6 font-bold text-white " />
          ) : (
            <AiOutlineMenu className="w-4 h-4 md:w-6 md:h-6 font-bold hidden " />
          )}
        </button>
      </div>

{userLoginData?.data?.business_questionnaire?.store_type === "basic_website" ? (
  <div className="">
  <div className="flex gap-2"></div>
  <div className="mt-7 flex flex-col gap-3">
    <h5 className="text-white text-[12px] font-[700]">ACTIVITY</h5>

    <div className="">
      <div className="">
        <Link to={"/dashboard/home"} className=" gap-1  ">
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
            />
            <h5 className="  ">Dashboard</h5>
          </div>
        </Link>
      </div>

      <div className="">
        <Link to={"/dashboard/coupon"} className=" gap-1  ">
          <div
            className={`${
              ["dashboard", "coupon"].every((ai) =>
                pathnames.includes(ai)
              )
                ? "bg-white text-primary "
                : " text-white"
            } gap-x-3 flex items-center px-6 text-[14px] hover:text-[16px] hover:font-[600] rounded-[10px] py-[10px] `}
          >
            <img
              aria-hidden
              src={
                ["dashboard", "coupon"].every((ai) =>
                  pathnames.includes(ai)
                )
                  ? "/images/orders.svg"
                  : "/images/orders.svg"
              }
              alt="Window icon"
            />
            <h5 className=" ">Coupon</h5>
          </div>
        </Link>
      </div>
    </div>
  </div>

  <div className="mt-7 flex flex-col gap-3">
    <h5 className="text-white text-[12px] font-[700]">MY SITE</h5>

    <div className="">
      <div className="">
        <Link to={"/dashboard/site"} className="relative gap-1  ">
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
            />
            <h5 className="">Site</h5>
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
            />
            <h5 className="">Theme</h5>
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
            />
            <h5 className="">Settings</h5>
          </div>
        </Link>
      </div>

   
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
            />
            <h5 className="">Subscription</h5>
          </div>
        </Link>
      </div>
    </div>
  </div>
</div> 
) : (
  <div className="">
  <div className="flex gap-2"></div>
  <div className="mt-7 flex flex-col gap-3">
    <h5 className="text-white text-[12px] font-[700]">ACTIVITY</h5>

    <div className="">
      <div className="">
        <Link to={"/dashboard/home"} className="gap-1  ">
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
            />
            <h5 className="  ">Dashboard</h5>
          </div>
        </Link>
      </div>

      <div className="">
        <Link to={"/dashboard/customers"} className=" gap-1  ">
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
            />
            <h5 className=" ">Customers</h5>
          </div>
        </Link>
      </div>

      <div className="">
        <Link to={"/dashboard/products"} className=" gap-1  ">
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
            />
            <h5 className="">Products</h5>
          </div>
        </Link>
      </div>

      <div className="">
        <Link to={"/dashboard/order"} className=" gap-1  ">
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
            />
            <h5 className=" ">Orders</h5>
          </div>
        </Link>
      </div>

      <div className="">
        <Link to={"/dashboard/transaction"} className=" gap-1  ">
          <div
            className={`${
              ["dashboard", "transaction"].every((ai) =>
                pathnames.includes(ai)
              )
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
            />
            <h5 className=" ">Transactions</h5>
          </div>
        </Link>
      </div>

      <div className="">
        <Link to={"/dashboard/category"} className=" gap-1  ">
          <div
            className={`${
              ["dashboard", "category"].every((ai) =>
                pathnames.includes(ai)
              )
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
            />
            <h5 className=" ">Category</h5>
          </div>
        </Link>
      </div>

      
      <div className="">
        <Link to={"/dashboard/coupon"} className=" gap-1  ">
          <div
            className={`${
              ["dashboard", "coupon"].every((ai) =>
                pathnames.includes(ai)
              )
                ? "bg-white text-primary "
                : " text-white"
            } gap-x-3 flex items-center px-6 text-[14px] hover:text-[16px] hover:font-[600] rounded-[10px] py-[10px] `}
          >
            <img
              aria-hidden
              src={
                ["dashboard", "coupon"].every((ai) =>
                  pathnames.includes(ai)
                )
                  ? "/images/orders.svg"
                  : "/images/orders.svg"
              }
              alt="Window icon"
            />
            <h5 className=" ">Coupon</h5>
          </div>
        </Link>
      </div>

      <div className="">
        <Link to={"/dashboard/delivery"} className=" gap-1  ">
          <div
            className={`${
              ["dashboard", "delivery"].every((ai) => pathnames.includes(ai))
                ? "bg-white text-primary "
                : " text-white"
            } gap-x-3 flex items-center px-6 text-[14px] hover:text-[16px] hover:font-[600] rounded-[10px] py-[10px] `}
          >
            <img
              aria-hidden
              src={
                ["dashboard", "delivery"].every((ai) =>
                  pathnames.includes(ai)
                )
                  ? "/images/theme.svg"
                  : "/images/theme.svg"
              }
              alt="Window icon"
            />
            <h5 className="">Delivery</h5>
          </div>
        </Link>
      </div>
    </div>
  </div>

  <div className="mt-7 flex flex-col gap-3">
    <h5 className="text-white text-[12px] font-[700]">MY SITE</h5>

    <div className="">
      <div className="">
        <Link to={"/dashboard/site"} className=" gap-1  ">
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
            />
            <h5 className="">Site</h5>
          </div>
        </Link>
      </div>

      <div className="">
        <Link to={"/dashboard/theme"} className=" gap-1  ">
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
            />
            <h5 className="">Theme</h5>
          </div>
        </Link>
      </div>

      <div className="">
        <Link to={"/dashboard/finances"} className=" gap-1  ">
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
            />
            <h5 className=" ">Finances</h5>
          </div>
        </Link>
      </div>

      <div className="">
        <Link to={"/dashboard/chat"} className=" gap-1  ">
          <div
            className={`${
              ["dashboard", "chat"].every((ai) =>
                pathnames.includes(ai)
              )
                ? "bg-white text-primary "
                : " text-white"
            } gap-x-3 flex items-center px-6 text-[14px] hover:text-[16px] hover:font-[600] rounded-[10px] py-[10px] `}
          >
            <img
              aria-hidden
              src={
                ["dashboard", "chat"].every((ai) =>
                  pathnames.includes(ai)
                )
                  ? "/images/finances.svg"
                  : "/images/finances.svg"
              }
              alt="Window icon"
            />
            <h5 className=" ">Chat</h5>
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
            />
            <h5 className="">Settings</h5>
          </div>
        </Link>
      </div>

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
            />
            <h5 className="">Subscription</h5>
          </div>
        </Link>
      </div>
    </div>
  </div>
</div>
)}
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
    </aside>
  );
};

export default Sidebar;