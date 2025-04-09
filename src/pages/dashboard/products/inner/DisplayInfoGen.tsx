import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { UserApis } from "../../../../apis/userApi/userApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../../../../components/UI/LoadingSpinner";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

// Section type interface
interface AccordionSection {
  id: string;
  title: string;
  isOpen: boolean;
}

const DisplayInfoGen = () => {
  const selectedStore = useSelector(
    (state: RootState) => state.globalState?.selectedStore || null
  );
  const sectionName = "payment";

  const [currencies, setCurrencies] = useState<string[]>([]);
  const [newCurrency, setNewCurrency] = useState<string>("");
  const [availablePaymentGateways, setAvailablePaymentGateways] = useState<string[]>([
    "stripe", "paypal", "flutterwave", "paystack"
  ]);
  const [selectedGateways, setSelectedGateways] = useState<string[]>([]);
  const [selectedGateway, setSelectedGateway] = useState<string>("");
  const [gatewayCredentials, setGatewayCredentials] = useState<Record<string, { enabled: number, public_key: string, secret_key: string }>>({
    flutterwave: { enabled: 1, public_key: "", secret_key: "" },
    paypal: { enabled: 1, public_key: "", secret_key: "" },
    stripe: { enabled: 1, public_key: "", secret_key: "" },
    paystack: { enabled: 1, public_key: "", secret_key: "" }
  });
  const [loading, setLoading] = useState(false);

  // Accordion state - all sections closed initially
  const [sections, setSections] = useState<AccordionSection[]>([
    { id: "currencies", title: "Currency Settings", isOpen: false },
    { id: "gateways", title: "Payment Gateways", isOpen: false },
    { id: "credentials", title: "Payment Credentials", isOpen: false }
  ]);

  // Toggle section visibility
  const toggleSection = (sectionId: string) => {
    setSections(prevSections => 
      prevSections.map(section => 
        section.id === sectionId 
          ? { ...section, isOpen: !section.isOpen } 
          : section
      )
    );
  };

  // Get section open state
  const isSectionOpen = (sectionId: string): boolean => {
    return sections.find(section => section.id === sectionId)?.isOpen || false;
  };

  useEffect(() => {
    if (!selectedStore) return;

    setLoading(true);
    UserApis.getStoreSettings(selectedStore, sectionName)
      .then((response) => {
        if (response?.data) {
          const settings = response.data?.payment;

          setCurrencies(settings?.settings?.currencies || []);
          setAvailablePaymentGateways(settings?.settings?.available_payment_gateways || [
            "stripe", "paypal", "flutterwave", "paystack"
          ]);
          
          setSelectedGateways(settings?.settings?.payment_gateways || []);
          setSelectedGateway(settings?.settings?.selected_gateway || "");
          
          // Initialize gateway credentials
          const credentials = settings?.settings?.payment_credentials || {};
          const initialGatewayCredentials = {
            flutterwave: {
              enabled: credentials?.flutterwave?.enabled || 1,
              public_key: credentials?.flutterwave?.public_key || "",
              secret_key: credentials?.flutterwave?.secret_key || ""
            },
            paypal: {
              enabled: credentials?.paypal?.enabled || 1,
              public_key: credentials?.paypal?.public_key || "",
              secret_key: credentials?.paypal?.secret_key || ""
            },
            stripe: {
              enabled: credentials?.stripe?.enabled || 1,
              public_key: credentials?.stripe?.public_key || "",
              secret_key: credentials?.stripe?.secret_key || ""
            },
            paystack: {
              enabled: credentials?.paystack?.enabled || 1,
              public_key: credentials?.paystack?.public_key || "",
              secret_key: credentials?.paystack?.secret_key || ""
            }
          };
          
          setGatewayCredentials(initialGatewayCredentials);
        }
      })
      .catch((error) => {
        console.error("Error fetching store settings:", error);
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
  
  const handleDefaultGatewayChange = (gateway: string) => {
    setSelectedGateway(gateway);
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
    if (selectedGateways.length === 0) {
      toast.error("Please select at least one payment gateway.");
      return;
    }

    // Prepare credentials format based on selection
    const paymentCredentials:any = {};
    selectedGateways.forEach(gateway => {
      paymentCredentials[gateway] = {
        enabled: 1,
        public_key: gatewayCredentials[gateway].public_key,
        secret_key: gatewayCredentials[gateway].secret_key
      };
    });

    const payload = {
      settings: {
        currencies,
        currency_display: "symbol",
        payment_gateways: selectedGateways,
        selected_gateway: selectedGateways.length === 1 ? selectedGateways[0] : selectedGateway || selectedGateways[0],
        payment_gateway_access: 0,
        payment_credentials: paymentCredentials,
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

  // Section header component
  const SectionHeader = ({ id, title }: { id: string; title: string }) => (
    <div 
      className="flex justify-between items-center py-3 px-4 bg-gray-100 rounded-lg cursor-pointer mb-3 hover:bg-gray-200 transition-colors"
      onClick={() => toggleSection(id)}
    >
      <h5 className="text-[14px] font-semibold">{title}</h5>
      <div className="text-gray-600">
        {isSectionOpen(id) ? <FaChevronUp /> : <FaChevronDown />}
      </div>
    </div>
  );

  return (
    <div>
      <div className="bg-white rounded-[14px] pt-3 pb-4 pl-3 pr-5">
        <h4 className="text-[#000000] text-[14px] font-[600] pb-4">
          Update Payment Information
        </h4>

        <div className="max-w-lg mx-auto space-y-5">
          {/* Currency Settings Section */}
          <div className="border rounded-lg overflow-hidden">
            <SectionHeader id="currencies" title="Currency Settings" />
            
            {isSectionOpen("currencies") && (
              <div className="p-4 space-y-4 transition-all duration-300 ease-in-out">
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
              </div>
            )}
          </div>

          {/* Payment Gateways Section */}
          <div className="border rounded-lg overflow-hidden">
            <SectionHeader id="gateways" title="Payment Gateways" />
            
            {isSectionOpen("gateways") && (
              <div className="p-4 space-y-4 transition-all duration-300 ease-in-out">
                {/* Payment Gateways Selection */}
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

                {/* Default Gateway Selection - Show if multiple gateways selected */}
                {selectedGateways.length > 1 && (
                  <div>
                    <label className="text-[13px]">Select Default Payment Gateway</label>
                    <select
                      className="w-full p-2 mt-1 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      value={selectedGateway}
                      onChange={(e) => handleDefaultGatewayChange(e.target.value)}
                    >
                      <option value="">Select Default Gateway</option>
                      {selectedGateways.map((gateway) => (
                        <option key={gateway} value={gateway} className="capitalize">{gateway}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Credentials Section - Only visible if gateways are selected */}
          {selectedGateways.length > 0 && (
            <div className="border rounded-lg overflow-hidden">
              <SectionHeader id="credentials" title="Payment Credentials" />
              
              {isSectionOpen("credentials") && (
                <div className="p-4 space-y-4 transition-all duration-300 ease-in-out">
                  <p className="text-[12px] text-gray-500 italic">Leave blank to use MyAppSpace credentials</p>
                  
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
                              placeholder="Leave blank to use MyAppSpace credentials"
                            />
                          </div>
                          <div>
                            <label className="text-[13px]">Secret Key</label>
                            <input
                              type="password"
                              className="w-full p-2 mt-1 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md"
                              value={gatewayCredentials[gateway]?.secret_key || ""}
                              onChange={(e) => handleGatewayCredentialChange(gateway, "secret_key", e.target.value)}
                              placeholder="Leave blank to use MyAppSpace credentials"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button 
            className="bg-blue-500 mt-6 text-white px-4 py-2 rounded-md w-full disabled:opacity-50 disabled:bg-gray-800" 
            onClick={handleSubmit} 
            disabled={loading || selectedGateways.length === 0}
          >
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