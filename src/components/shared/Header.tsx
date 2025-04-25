import React, { useEffect, useState } from "react";
import BreadscrumbDisplay from "./BreadscrumbDisplay";
import { BiSolidBell } from "react-icons/bi";
import { RiSettings4Line } from "react-icons/ri";
import { LiaUploadSolid } from "react-icons/lia";
import { FiSearch } from "react-icons/fi";
import { IoChevronDown } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { UserApis } from "../../apis/userApi/userApi";
import { setSelectedCurrency } from "../../store/stateSlice";
import { Link } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const userLoginData = useSelector((state: any) => state.data.login.value);
  const selectedStore = useSelector(
    (state: RootState) => state.globalState?.selectedStore || null
  );
  // console.log(userLoginData)
  // Get the selected currency from Redux store or use null if not set
  const selectedCurrency = useSelector(
    (state: RootState) => state.globalState?.selectedCurrency || null
  );
  
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const sectionName = "payment";

  // Fetch currencies when the selected store changes
  useEffect(() => {
    if (!selectedStore) {
      return;
    }
    
    setCurrencies([]);
    setLoader(true);
    
    UserApis.getStoreSettings(selectedStore, sectionName)
      .then((response) => {
        if (response?.data) {
          const settings = response.data?.payment.settings;
          
          // Populate the currencies array with existing settings
          const availableCurrencies = settings.currencies || [];
          setCurrencies(availableCurrencies);
          
          // If we have currencies but no selected currency yet, set the default to NGN or the first available
          if (availableCurrencies.length > 0 && !selectedCurrency) {
            const defaultCurrency = availableCurrencies.includes("NGN") 
              ? "NGN" 
              : availableCurrencies[0];
            
            dispatch(setSelectedCurrency(defaultCurrency));
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching store settings:", error);
      })
      .finally(() => {
        setLoader(false);
      });
  }, [selectedStore, sectionName, dispatch, selectedCurrency]);

  // Handle currency selection
  const handleCurrencyChange = (currency: string) => {
    dispatch(setSelectedCurrency(currency));
    setCurrencyDropdownOpen(false);
  };

  // Toggle currency dropdown
  const toggleCurrencyDropdown = () => {
    setCurrencyDropdownOpen(!currencyDropdownOpen);
  };

  return (
    <div className=" ">
      {/* Desktop Header */}
      <div className="lg:flex hidden justify-between py-4 px-6 items-center w-full">
        <div>
          <BreadscrumbDisplay />
        </div>
        
        <div className="flex items-center gap-4">
          {/* Currency Selector */}
          {currencies.length > 0 && (
            <div className="relative">
              <button
                onClick={toggleCurrencyDropdown}
                className="flex items-center gap-1 border border-gray-200 rounded-md px-3 py-1.5 text-sm hover:bg-gray-50"
              >
                <span className="font-medium">{selectedCurrency || (currencies.includes("NGN") ? "NGN" : currencies[0])}</span>
                <IoChevronDown className={`text-gray-600 transition-transform ${currencyDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-20">
                  {currencies.map((currency) => (
                    <button
                      key={currency}
                      onClick={() => handleCurrencyChange(currency)}
                      className={`w-full text-left px-3 py-1.5 text-sm hover:bg-gray-50 ${
                        selectedCurrency === currency ? 'bg-purple-50 text-purple-700 font-medium' : ''
                      }`}
                    >
                      {currency}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {/* Search Icon */}
          {/* <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
            <FiSearch className="w-5 h-5" />
          </button> */}
          
          {/* Notification Bell */}
          <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600 relative">
            <BiSolidBell className="w-5 h-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          
          {/* Settings */}
          <Link to="/dashboard/settings">
          <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
            <RiSettings4Line className="w-5 h-5" />
          </button>
          </Link>
          
          {/* Upgrade Button */}
          <button
            className="rounded-full flex items-center gap-2 px-4 py-2 text-white transition-transform hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(to bottom, #382B67, #7056CD)",
            }}
          >
            <span className="text-sm font-medium">Upgrade</span>
            <LiaUploadSolid className="text-white" />
          </button>
          
          {/* User Profile */}
          <div className="flex items-center gap-3 ml-3">
            <div className="h-9 w-9 rounded-full bg-purple-600 flex items-center justify-center text-white font-medium">
              {userLoginData?.data?.first_name?.charAt(0)}
            </div>
            <div className="hidden xl:block">
              <h5 className="text-gray-900 text-sm font-medium">
                {userLoginData?.data?.first_name} {userLoginData?.data?.last_name}
              </h5>
              <h5 className="text-gray-500 text-xs">Admin</h5>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden py-3 px-4">
        <div className="flex items-center justify-between">
          <BreadscrumbDisplay />
          
          <div className="flex items-center gap-3">
            {/* Currency Selector for Mobile */}
            {currencies.length > 0 && (
              <div className="relative">
                <button
                  onClick={toggleCurrencyDropdown}
                  className="flex items-center gap-1 border border-gray-200 rounded-md px-2 py-1 text-xs hover:bg-gray-50"
                >
                  <span>{selectedCurrency || (currencies.includes("NGN") ? "NGN" : currencies[0])}</span>
                  <IoChevronDown className={`text-gray-600 transition-transform ${currencyDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {currencyDropdownOpen && (
                  <div className="absolute right-0 mt-1 w-28 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-20">
                    {currencies.map((currency) => (
                      <button
                        key={currency}
                        onClick={() => handleCurrencyChange(currency)}
                        className={`w-full text-left px-3 py-1.5 text-xs hover:bg-gray-50 ${
                          selectedCurrency === currency ? 'bg-purple-50 text-purple-700 font-medium' : ''
                        }`}
                      >
                        {currency}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {/* Notification Bell */}
            <button className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 relative">
              <BiSolidBell className="w-5 h-5" />
              <span className="absolute top-1 right-1 h-1.5 w-1.5 bg-red-500 rounded-full"></span>
            </button>
            
            {/* Settings */}
            <button className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600">
              <RiSettings4Line className="w-5 h-5" />
            </button>
            
            {/* User Profile */}
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-medium">
                {userLoginData?.data?.first_name?.charAt(0)}
              </div>
              <div className="">
                <h5 className="text-gray-900 text-xs font-medium">
                  {userLoginData?.data?.first_name?.charAt(0)}. {userLoginData?.data?.last_name}
                </h5>
                <h5 className="text-gray-500 text-xs">Admin</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;