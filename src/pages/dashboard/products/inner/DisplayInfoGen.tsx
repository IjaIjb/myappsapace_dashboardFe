import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { UserApis } from "../../../../apis/userApi/userApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../../../../components/UI/LoadingSpinner";

const DisplayInfoGen = () => {
  const selectedStore = useSelector(
    (state: RootState) => state.globalState?.selectedStore || null
  );
  // console.log("Selected Store Code:", selectedStore);
  const sectionName = "payment";

  const [currencies, setCurrencies] = useState<any>([]);
  const [newCurrency, setNewCurrency] = useState<any>("");
  const [defaultCurrency, setDefaultCurrency] = useState("");
  const [loading, setLoading] = useState(false);
  // const [message, setMessage] = useState("");
  // const [storeSettings, setStoreSettings] = useState<any>([]);

  // const [currencyDisplay, setCurrencyDisplay] = useState<string>("");

  useEffect(() => {
    if (!selectedStore) return;

    setLoading(true);
    UserApis.getStoreSettings(selectedStore, sectionName)
      .then((response) => {
        // console.log(response)
        if (response?.data) {
          const settings = response.data?.settings;
          // setStoreSettings(settings);

          // Populate the form fields with existing settings
          setCurrencies(settings?.settings?.currencies || []);
          setDefaultCurrency(settings?.settings.default_currency || "");
          // setCurrencyDisplay(settings?.settings.currency_display || "symbol");
        }
      })
      .catch((error) => {
        console.error("Error fetching store settings:", error);
        toast.error("Failed to load store settings.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedStore, sectionName]);

    // console.log(storeSettings)
    
  const handleAddCurrency = () => {
    if (newCurrency && !currencies.includes(newCurrency)) {
      setCurrencies([...currencies, newCurrency]);
      setNewCurrency("");
    }
  };

  const handleRemoveCurrency = (currency: any) => {
    setCurrencies(currencies.filter((c: any) => c !== currency));
  };

  const handleSubmit = async () => {
    if (!defaultCurrency || !currencies.includes(defaultCurrency)) {
 toast.error("Default currency must be in the currency list.");
      return;
    }

    const payload = {
      settings: {
        currencies,
        default_currency: defaultCurrency,
        currency_display: "symbol",
      },
    };

    setLoading(true);
    // setMessage("");

    try {
      const response = await UserApis.updateSettings(
        selectedStore,
        sectionName,
        payload
      );
      // console.log(response);
      if (response?.status === 200 || response?.status === 201) {
        // setMessage("Settings updated successfully!");
        toast.success(
          response?.data?.message || "Settings updated successfully!"
        );
        // navigate("/dashboard/store");
        setLoading(false);
      } else {
        toast.error(response?.data?.message || "Failed to create settings.");
        setLoading(false);
      }
    } catch (error) {
      // setMessage("Error updating settings. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-white rounded-[14px] pt-3 pb-4 pl-3 pr-5">
        <h4 className="text-[#000000] text-[14px] font-[600] pb-2">
          Update Payment Information
        </h4>

        <div className="max-w-lg mx-auto  space-y-4">
          {/* <h2 className="text-xl font-bold">Update Payment Settings</h2> */}

          <div className="flex items-center gap-2">
            <select
              // type="text"
              className="w-full p-2  border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              // className="border p-2 flex-grow rounded-md"
              // placeholder="Enter currency (e.g., USD)"
              value={newCurrency}
              onChange={(e) => setNewCurrency(e.target.value.toUpperCase())}
            >
<option >NGN</option>
<option value="NGN">NGN</option>
<option value="USD">USD</option>
              </select>
            <button
              className="bg-secondary text-white px-4 py-1 rounded-md"
              onClick={handleAddCurrency}
            >
              Add
            </button>
          </div>

          <div className="space-y-2">
            {currencies.map((currency: any) => (
              <div
                key={currency}
                className="w-full flex justify-between  p-2 mt-2 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary"

                // className="flex justify-between p-2 border rounded-md"
              >
                <span>{currency}</span>
                <button
                  className="text-red-500"
                  onClick={() => handleRemoveCurrency(currency)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

<div className="mt-2">
          <label className="text-[13px]">Select default Currency</label>

          <select
            className="w-full p-2 mt-1  border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            // className="border p-2 w-full rounded-md"
            value={defaultCurrency}
            onChange={(e) => setDefaultCurrency(e.target.value)}
          >
            
            <option value="">Select Default Currency</option>
            {currencies.map((currency: any) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md w-full disabled:opacity-50 disabled:bg-gray-400"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <LoadingSpinner /> : "Update Settings"}
          </button>

          {/* {message && <p className="text-center mt-2">{message}</p>} */}
        </div>

        {/* <div className="flex flex-col gap-2">
                          <div className="bg-[#FBFBFF] py-3 px-2">
                            <h4 className="text-[12px] font-[400]">
                              Ezeh Rachael, John Mustapha, Chukwu Yemi
                            </h4>
                          </div>
                        </div> */}

        {/* <div className="flex items-center bg-[#796BEB1A]/[10%] px-3 w-fit py-1 mt-3 rounded-[5px] gap-2">
                          <IoAddCircleOutline className="" />
        
                          <h5 className="text-[10px] font-[400]">New Customer</h5>
                        </div> */}

{/* <div>
        <div className="">
          <h4 className="text-[12px] font-[400]">Currency Display</h4>
          <input
            type="text"
            placeholder=""
            className="w-full p-2 mt-2 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex items-center bg-[#796BEB1A]/[10%] px-3 w-fit py-1 mt-1 rounded-[5px] gap-2">
          <input
            type="checkbox"
            id="customCheckbox"
            name="customCheckbox"
            className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
          <h5 className="text-[10px] font-[400]">
            Allow Customers Choose Currency Display
          </h5>
        </div>

        <h4 className="text-[#000000] mt-4 text-[14px] font-[600] pb-2">
          Unit System
        </h4>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="mt-3">
            <h4 className="text-[12px] font-[400]">Unit System</h4>
            <input
              type="text"
              placeholder="Metric System"
              className="w-full p-2 mt-2 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="mt-3">
            <h4 className="text-[12px] font-[400]">Default Weight</h4>
            <input
              type="text"
              placeholder="Title"
              className="w-full p-2 mt-2 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="mt-3">
          <h4 className="text-[12px] font-[400]">Time zone</h4>
          <input
            type="text"
            placeholder=""
            className="w-full p-2 mt-2 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex items-center bg-[#796BEB1A]/[10%] px-3 w-fit py-1 mt-3 rounded-[5px] gap-2">
          <h5 className="text-[10px] font-[400]">
            Sets time for recording of orders and analytics
          </h5>
        </div>

        <div className="mt-3">
          <h4 className="text-[12px] font-[400]">Language</h4>
          <input
            type="text"
            placeholder="English UK"
            className="w-full p-2 mt-2 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex items-center bg-[#796BEB1A]/[10%] px-3 w-fit py-1 mt-1 rounded-[5px] gap-2">
          <input
            type="checkbox"
            id="customCheckbox"
            name="customCheckbox"
            className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
          <h5 className="text-[10px] font-[400]">
            Allow Customers Choose Currency Display
          </h5>
        </div>

        <div className="mt-3">
          <h4 className="text-[12px] font-[400]">Add Notes (Optional)</h4>
          <textarea
            placeholder="Add Note"
            rows={5}
            className="w-full p-2 mt-2 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        </div> */}
      </div>
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
    </div>
  );
};

export default DisplayInfoGen;
