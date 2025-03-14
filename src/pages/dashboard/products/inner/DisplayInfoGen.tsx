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
  const [paymentGateways, setPaymentGateways] = useState<string[]>([
    "stripe", "paypal", "flutterwave", "paystack"
  ]);
  const [selectedGateway, setSelectedGateway] = useState<string>("");
  const [paymentGatewayAccess, setPaymentGatewayAccess] = useState<number>();
  const [flutterwavePublicKey, setFlutterwavePublicKey] = useState<string>("");
  const [flutterwaveSecretKey, setFlutterwaveSecretKey] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedStore) return;

    setLoading(true);
    UserApis.getStoreSettings(selectedStore, sectionName)
      .then((response) => {
        if (response?.data) {
          const settings = response.data?.settings;
console.log(settings)
          setCurrencies(settings?.settings?.currencies || []);
          setDefaultCurrency(settings?.settings?.default_currency || "");
          setPaymentGateways(settings?.settings?.payment_gateways || []);
          setSelectedGateway(settings?.settings?.selected_gateway || "");
          setPaymentGatewayAccess(settings?.settings?.payment_gateway_access || 0);
          setFlutterwavePublicKey(settings?.settings?.payment_credentials?.flutterwave_public_key || "");
          setFlutterwaveSecretKey(settings?.settings?.payment_credentials?.flutterwave_secret_key || "");
          setFlutterwavePublicKey(settings?.settings?.payment_credentials?.flutterwave_public_key || "");
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
        payment_gateways: paymentGateways,
        selected_gateway: selectedGateway,
        payment_gateway_access: paymentGatewayAccess,
        payment_credentials: {
          flutterwave_public_key: flutterwavePublicKey,
          flutterwave_secret_key: flutterwaveSecretKey,
        },
      },
    };

    setLoading(true);

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
          <div className="flex items-center gap-2">
            <select
              className="w-full p-2 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={newCurrency}
              onChange={(e) => setNewCurrency(e.target.value.toUpperCase())}
            >
              <option value="">Select Currency</option>
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
            {currencies.map((currency) => (
              <div key={currency} className="w-full flex justify-between p-2 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md">
                <span>{currency}</span>
                <button className="text-red-500" onClick={() => handleRemoveCurrency(currency)}>✕</button>
              </div>
            ))}
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

          {/* Payment Gateways */}
          <div>
            <label className="text-[13px]">Select Payment Gateway</label>
            <select
              className="w-full p-2 mt-1 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={selectedGateway}
              onChange={(e) => setSelectedGateway(e.target.value)}
            >
              {paymentGateways.map((gateway) => (
                <option key={gateway} value={gateway}>{gateway}</option>
              ))}
            </select>
          </div>

          {/* Payment Gateway Access */}
          <div>
            <label className="text-[13px]">Payment Gateway Access</label>
            <input
              type="number"
              className="w-full p-2 mt-1 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md"
              value={paymentGatewayAccess}
              onChange={(e) => setPaymentGatewayAccess(Number(e.target.value))}
            />
          </div>

          {/* Payment Credentials */}
          <div>
            <label className="text-[13px]">Flutterwave Public Key</label>
            <input
              type="text"
              className="w-full p-2 mt-1 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md"
              value={flutterwavePublicKey}
              onChange={(e) => setFlutterwavePublicKey(e.target.value)}
            />
          </div>

          <div>
            <label className="text-[13px]">Flutterwave Secret Key</label>
            <input
              type="text"
              className="w-full p-2 mt-1 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md"
              value={flutterwaveSecretKey}
              onChange={(e) => setFlutterwaveSecretKey(e.target.value)}
            />
          </div>

          <button className="bg-blue-500 text-white px-4 py-2 rounded-md w-full disabled:opacity-50 disabled:bg-gray-400" onClick={handleSubmit} disabled={loading}>
            {loading ? <LoadingSpinner /> : "Update Settings"}
          </button>
        </div>
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
