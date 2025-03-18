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
  const sectionName = "payment";

  const [currencies, setCurrencies] = useState<string[]>(["USD", "EUR", "GBP", "NGN"]);
  const [newCurrency, setNewCurrency] = useState<string>("");
  const [defaultCurrency, setDefaultCurrency] = useState<string>("NGN");
  const [availablePaymentGateways, setAvailablePaymentGateways] = useState<string[]>([
    "stripe", "paypal", "flutterwave", "paystack"
  ]);
  const [selectedGateways, setSelectedGateways] = useState<string[]>([]);
  // const [singleSelectedGateway, setSingleSelectedGateway] = useState<string>("");
  const [paymentGatewayAccess, setPaymentGatewayAccess] = useState<number>(0);
  const [gatewayCredentials, setGatewayCredentials] = useState<Record<string, Record<string, string>>>({
    flutterwave: { public_key: "", secret_key: "" },
    paypal: { public_key: "", secret_key: "" },
    stripe: { public_key: "", secret_key: "" },
    paystack: { public_key: "", secret_key: "" }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedStore) return;

    setLoading(true);
    UserApis.getStoreSettings(selectedStore, sectionName)
      .then((response) => {
        if (response?.data) {
          const settings = response.data?.settings;
          console.log(settings);

          setCurrencies(settings?.settings?.currencies || []);
          setDefaultCurrency(settings?.settings?.default_currency || "");
          setAvailablePaymentGateways(settings?.settings?.available_payment_gateways || [
            "stripe", "paypal", "flutterwave", "paystack"
          ]);
          setPaymentGatewayAccess(settings?.settings?.payment_gateway_access || 0);
          
          // Handle payment gateway selection based on access mode
          if (settings?.settings?.payment_gateway_access === 1) {
            setSelectedGateways(settings?.settings?.payment_gateways || []);
          } else {
            // setSingleSelectedGateway(settings?.settings?.selected_gateway || "");
          }
          
          // Initialize gateway credentials
          const credentials = settings?.settings?.payment_credentials || {};
          const initialGatewayCredentials = {
            flutterwave: {
              public_key: credentials?.flutterwave_public_key || "",
              secret_key: credentials?.flutterwave_secret_key || ""
            },
            paypal: {
              public_key: credentials?.paypal_public_key || "",
              secret_key: credentials?.paypal_secret_key || ""
            },
            stripe: {
              public_key: credentials?.stripe_public_key || "",
              secret_key: credentials?.stripe_secret_key || ""
            },
            paystack: {
              public_key: credentials?.paystack_public_key || "",
              secret_key: credentials?.paystack_secret_key || ""
            }
          };
          
          setGatewayCredentials(initialGatewayCredentials);
        }
      })
      .catch((error) => {
        console.error("Error fetching store settings:", error);
        // toast.error("Failed to load store settings.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedStore, sectionName]);

  const handleAddCurrency = () => {
    if (newCurrency && !currencies.includes(newCurrency)) {
      setCurrencies([...currencies, newCurrency]);
      setNewCurrency("");
    }
  };

  const handleRemoveCurrency = (currency: string) => {
    setCurrencies(currencies.filter((c) => c !== currency));
  };

  const handleGatewayCheckboxChange = (gateway: string) => {
    if (selectedGateways.includes(gateway)) {
      setSelectedGateways(selectedGateways.filter(g => g !== gateway));
    } else {
      setSelectedGateways([...selectedGateways, gateway]);
    }
  };

  const handleGatewayCredentialChange = (gateway: string, field: string, value: string) => {
    setGatewayCredentials(prev => ({
      ...prev,
      [gateway]: {
        ...prev[gateway],
        [field]: value
      }
    }));
  };

  const handleSubmit = async () => {
    if (!defaultCurrency || !currencies.includes(defaultCurrency)) {
      toast.error("Default currency must be in the currency list.");
      return;
    }

    if (paymentGatewayAccess === 1 && selectedGateways.length === 0) {
      toast.error("Please select at least one payment gateway.");
      return;
    }

    // Check if all selected gateways have credentials
    if (paymentGatewayAccess === 1) {
      const missingCredentials = selectedGateways.some(gateway => 
        !gatewayCredentials[gateway]?.public_key || !gatewayCredentials[gateway]?.secret_key
      );
      
      if (missingCredentials) {
        toast.error("Please provide all required credentials for selected payment gateways.");
        return;
      }
    }

    // Format payment credentials based on selected gateways
    const paymentCredentials: Record<string, string> = {};
    
    if (paymentGatewayAccess === 1) {
      // For gateways when user has access
      selectedGateways.forEach(gateway => {
        paymentCredentials[`${gateway}_public_key`] = gatewayCredentials[gateway].public_key;
        paymentCredentials[`${gateway}_secret_key`] = gatewayCredentials[gateway].secret_key;
      });
    }

    const payload = {
      settings: {
        currencies,
        default_currency: defaultCurrency,
        currency_display: "symbol",
        payment_gateways: paymentGatewayAccess === 1 ? selectedGateways : [],
        // selected_gateway: paymentGatewayAccess === 1 && selectedGateways.length === 1 ? selectedGateways[0] : "",
        payment_gateway_access: paymentGatewayAccess,
        payment_credentials: paymentCredentials,
      },
    };

    setLoading(true);
// console.log(payload)
    try {
      const response = await UserApis.updateSettings(
        selectedStore,
        sectionName,
        payload
      );

      if (response?.status === 200 || response?.status === 201) {
        toast.success(response?.data?.message || "Settings updated successfully!");
      } else {
        toast.error(response?.data?.message || "Failed to update settings.");
      }
    } catch (error) {
      toast.error("Error updating settings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-white rounded-[14px] pt-3 pb-4 pl-3 pr-5">
        <h4 className="text-[#000000] text-[14px] font-[600] pb-2">
          Update Payment Information
        </h4>

        <div className="max-w-lg mx-auto space-y-4">
          {/* Currencies */}
          <div>
            <label className="text-[13px]">Currencies</label>
            <div className="flex items-center gap-2 mt-1">
              <select
                className="w-full p-2 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={newCurrency}
                onChange={(e) => setNewCurrency(e.target.value.toUpperCase())}
              >
                <option value="">Select Currency</option>
                {/* A - I */}
                <option value="AED">AED</option>
                <option value="ALL">ALL</option>
                <option value="AUD">AUD</option>
                <option value="BGN">BGN</option>
                <option value="BHD">BHD</option>
                <option value="BND">BND</option>
                <option value="CAD">CAD</option>
                <option value="CHF">CHF</option>
                <option value="CLP">CLP</option>
                <option value="CNY">CNY</option>
                <option value="COP">COP</option>
                <option value="CRC">CRC</option>
                <option value="CZK">CZK</option>
                <option value="DKK">DKK</option>
                <option value="DOP">DOP</option>
                <option value="DZD">DZD</option>
                <option value="EGP">EGP</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="GHS">GHS</option>
                <option value="GMD">GMD</option>
                <option value="GTQ">GTQ</option>
                <option value="HKD">HKD</option>
                <option value="HNL">HNL</option>
                <option value="HUF">HUF</option>
                <option value="IDR">IDR</option>
                <option value="ILS">ILS</option>
                <option value="INR">INR</option>
                <option value="IQD">IQD</option>
                <option value="ISK">ISK</option>
                {/* J - M */}
                <option value="JOD">JOD</option>
                <option value="JPY">JPY</option>
                <option value="KES">KES</option>
                <option value="KHR">KHR</option>
                <option value="KRW">KRW</option>
                <option value="KWD">KWD</option>
                <option value="LBP">LBP</option>
                <option value="LKR">LKR</option>
                <option value="LYD">LYD</option>
                <option value="MAD">MAD</option>
                <option value="MOP">MOP</option>
                <option value="MYR">MYR</option>
                {/* N - S */}
                <option value="NGN">NGN</option>
                <option value="NOK">NOK</option>
                <option value="NZD">NZD</option>
                <option value="OMR">OMR</option>
                <option value="PAB">PAB</option>
                <option value="PHP">PHP</option>
                <option value="PYG">PYG</option>
                <option value="QAR">QAR</option>
                <option value="ROL">ROL</option>
                <option value="SAR">SAR</option>
                <option value="SDD">SDD</option>
                <option value="SEK">SEK</option>
                <option value="SGD">SGD</option>
                <option value="SLL">SLL</option>
                <option value="SVC">SVC</option>
                {/* T - Z */}
                <option value="THB">THB</option>
                <option value="TND">TND</option>
                <option value="TRL">TRL</option>
                <option value="TWD">TWD</option>
                <option value="TZS">TZS</option>
                <option value="UGX">UGX</option>
                <option value="USD">USD</option>
                <option value="VEF">VEF</option>
                <option value="VND">VND</option>
                <option value="YER">YER</option>
                <option value="ZAR">ZAR</option>
                <option value="ZMK">ZMK</option>
              </select>
              <button
                className="bg-secondary text-white px-4 py-1 rounded-md"
                onClick={handleAddCurrency}
              >
                Add
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[13px]">Active Currencies</label>
            <div className="max-h-32 overflow-y-auto">
              {currencies.map((currency) => (
                <div key={currency} className="w-full flex justify-between p-2 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md mb-1">
                  <span>{currency}</span>
                  <button className="text-red-500" onClick={() => handleRemoveCurrency(currency)}>✕</button>
                </div>
              ))}
            </div>
          </div>

          {/* Default Currency */}
          <div>
            <label className="text-[13px]">Select Default Currency</label>
            <select
              className="w-full p-2 mt-1 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={defaultCurrency}
              onChange={(e) => setDefaultCurrency(e.target.value)}
            >
              <option value="">Select Default Currency</option>
              {currencies.map((currency) => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>

          {/* Payment Gateway Access Question */}
          <div>
            <label className="text-[13px]">Do you have payment gateway access?</label>
            <div className="flex items-center mt-2 space-x-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="gateway-access-yes"
                  name="gateway-access"
                  checked={paymentGatewayAccess === 1}
                  onChange={() => setPaymentGatewayAccess(1)}
                  className="mr-2"
                />
                <label htmlFor="gateway-access-yes" className="text-[12px] font-[400] text-black">
                  Yes
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="gateway-access-no"
                  name="gateway-access"
                  checked={paymentGatewayAccess === 0}
                  onChange={() => setPaymentGatewayAccess(0)}
                  className="mr-2"
                />
                <label htmlFor="gateway-access-no" className="text-[12px] font-[400] text-black">
                  No
                </label>
              </div>
            </div>
          </div>

          {/* Payment Gateways Selection - Only show if user has access */}
          {paymentGatewayAccess === 1 && (
            <div>
              <label className="text-[13px]">Select Payment Gateways</label>
              <div className="mt-1 space-y-2 border p-3 rounded-md">
                {availablePaymentGateways.map((gateway) => (
                  <div key={gateway} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`gateway-${gateway}`}
                      checked={selectedGateways.includes(gateway)}
                      onChange={() => handleGatewayCheckboxChange(gateway)}
                      className="mr-2"
                    />
                    <label htmlFor={`gateway-${gateway}`} className="text-[12px] font-[400] text-black capitalize">
                      {gateway}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Payment Credentials - Only show if user has gateway access */}
          {paymentGatewayAccess === 1 && selectedGateways.length > 0 && (
            <div className="space-y-4">
              <label className="text-[13px] font-semibold">Payment Gateway Credentials</label>
              
              <div className="space-y-6">
                {selectedGateways.map((gateway) => (
                  <div key={gateway} className="p-3 border rounded-md">
                    <h5 className="text-[14px] font-[600] capitalize mb-2">{gateway}</h5>
                    <div className="space-y-2">
                      <div>
                        <label className="text-[13px]">Public Key</label>
                        <input
                          type="text"
                          className="w-full p-2 mt-1 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md"
                          value={gatewayCredentials[gateway]?.public_key || ""}
                          onChange={(e) => handleGatewayCredentialChange(gateway, "public_key", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-[13px]">Secret Key</label>
                        <input
                          type="password"
                          className="w-full p-2 mt-1 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md"
                          value={gatewayCredentials[gateway]?.secret_key || ""}
                          onChange={(e) => handleGatewayCredentialChange(gateway, "secret_key", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          </div>

          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded-md w-full disabled:opacity-50 disabled:bg-gray-400" 
            onClick={handleSubmit} 
            disabled={loading || paymentGatewayAccess === 0 || (paymentGatewayAccess === 1 && selectedGateways.length === 0)}
          >
            {loading ? <LoadingSpinner /> : "Update Settings"}
          </button>
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