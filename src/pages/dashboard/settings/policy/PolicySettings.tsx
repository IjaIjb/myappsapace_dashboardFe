import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserApis } from "../../../../apis/userApi/userApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
// import LoadingSpinner from "../../../../components/UI/LoadingSpinner";
import ImprovedRichTextEditor from "./ImprovedRichTextEditor";

const PolicySettings = () => {
  const selectedStore = useSelector(
    (state: RootState) => state.globalState?.selectedStore || null
  );

  const sectionName = "policy";
  const [loading, setLoading] = useState(false);
  const [policyTitle, setPolicyTitle] = useState("Our Policies");
  const [privacyPolicy, setPrivacyPolicy] = useState("");
  const [termsConditions, setTermsConditions] = useState("");
  const [returnPolicy, setReturnPolicy] = useState("");
  const [shippingPolicy, setShippingPolicy] = useState("");

  // Fetch settings from the API
  useEffect(() => {
    if (!selectedStore) return;

    setLoading(true);
    UserApis.getStoreSettings(selectedStore, sectionName)
      .then((response) => {
        console.log(response.data);

        if (response?.data) {
          const settings = response.data?.policy.policySettings;
          setPolicyTitle(settings.policy_title || "Our Policies");
          setPrivacyPolicy(settings.privacy_policy || "");
          setTermsConditions(settings.terms_conditions || "");
          setReturnPolicy(settings.return_policy || "");
          setShippingPolicy(settings.shipping_policy || "");
        }
      })
      .catch(() => {
        // Silent error handling
      })
      .finally(() => setLoading(false));
  }, [selectedStore]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await UserApis.updateSettings(
        selectedStore,
        sectionName,
        {
          policySettings: {
            policy_title: policyTitle,
            privacy_policy: privacyPolicy,
            terms_conditions: termsConditions,
            return_policy: returnPolicy,
            shipping_policy: shippingPolicy
          },
        }
      );
      if (response?.status === 200 || response?.status === 201) {
        toast.success("Policy settings updated successfully!");
      }
    } catch (error) {
      toast.error("Error updating policy settings. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-[14px] p-6 shadow-lg">
      <h4 className="text-[#000000] text-[18px] font-bold pb-4">
        Store Policy Settings
      </h4>

      <div>
        {/* Policy Page Title */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Policy Page Title:</label>
          <input
            type="text"
            value={policyTitle}
            onChange={(e) => setPolicyTitle(e.target.value)}
            className="w-full h-12 border rounded-md p-2"
          />
        </div>

        {/* Privacy Policy */}
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <label className="block font-semibold">Privacy Policy:</label>
            <div className="ml-2 text-xs text-gray-500">
              (Describe how you collect, use, and protect customer data)
            </div>
          </div>
          <div className="border rounded-md">
            <ImprovedRichTextEditor
              value={privacyPolicy}
              onChange={setPrivacyPolicy}
              placeholder="Enter your privacy policy details here..."
            />
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <label className="block font-semibold">Terms & Conditions:</label>
            <div className="ml-2 text-xs text-gray-500">
              (Outline the rules and guidelines for using your store)
            </div>
          </div>
          <div className="border rounded-md">
            <ImprovedRichTextEditor
              value={termsConditions}
              onChange={setTermsConditions}
              placeholder="Enter your terms and conditions here..."
            />
          </div>
        </div>

        {/* Return Policy */}
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <label className="block font-semibold">Return Policy:</label>
            <div className="ml-2 text-xs text-gray-500">
              (Explain your return, refund, and exchange procedures)
            </div>
          </div>
          <div className="border rounded-md">
            <ImprovedRichTextEditor
              value={returnPolicy}
              onChange={setReturnPolicy}
              placeholder="Enter your return policy details here..."
            />
          </div>
        </div>

        {/* Shipping Policy */}
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <label className="block font-semibold">Shipping Policy:</label>
            <div className="ml-2 text-xs text-gray-500">
              (Detail shipping methods, timeframes, and costs)
            </div>
          </div>
          <div className="border rounded-md">
            <ImprovedRichTextEditor
              value={shippingPolicy}
              onChange={setShippingPolicy}
              placeholder="Enter your shipping policy details here..."
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className={`text-white py-2 px-6 rounded-md mt-6 w-full ${
            loading ? "bg-green-400" : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {loading ? "Saving..." : "Save Policy Settings"}
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

export default PolicySettings;