import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserApis } from "../../../../apis/userApi/userApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import ImprovedRichTextEditor from "../policy/ImprovedRichTextEditor";

const TermsConditionsSettings = () => {
  const selectedStore = useSelector(
    (state: RootState) => state.globalState?.selectedStore || null
  );

  const sectionName = "terms_conditions";
  const [loading, setLoading] = useState(false);
  const [termsTitle, setTermsTitle] = useState("");
  const [termsDescription, setTermsDescription] = useState(
    ""
  );
  const [termsContent, setTermsContent] = useState(
    ""
  );

  // Fetch settings from the API
  useEffect(() => {
    if (!selectedStore) return;

    setLoading(true);
    UserApis.getStoreSettings(selectedStore, sectionName)
      .then((response) => {
        console.log(response.data);

        if (response?.data) {
          const settings = response.data?.[sectionName].termsConditionsSettings;
          setTermsTitle(settings.terms_title);
          setTermsDescription(settings.terms_description);
          setTermsContent(settings.terms_content);
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
          termsConditionsSettings: {
            terms_title: termsTitle,
            terms_description: termsDescription,
            terms_content: termsContent,
          },
        }
      );
      if (response?.status === 200 || response?.status === 201) {
        toast.success("Terms and Conditions updated successfully!");
      }
    } catch (error) {
      toast.error("Error updating Terms and Conditions. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-[14px] p-6 shadow-lg">
      <h4 className="text-[#000000] text-[18px] font-bold pb-4">
        Terms and Conditions Settings
      </h4>

      <div>
        {/* Terms Title */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Terms Page Title:</label>
          <input
            type="text"
            value={termsTitle}
            onChange={(e) => setTermsTitle(e.target.value)}
            className="w-full h-12 border rounded-md p-2"
          />
        </div>

        {/* Terms Description */}
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <label className="block font-semibold">Terms Description:</label>
            <div className="ml-2 text-xs text-gray-500">
              (Brief introduction to your terms and conditions)
            </div>
          </div>
          <textarea
            value={termsDescription}
            onChange={(e) => setTermsDescription(e.target.value)}
            className="w-full h-32 border rounded-md p-2"
            placeholder="Enter a brief introduction to your terms and conditions..."
          />
        </div>

        {/* Terms Content */}
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <label className="block font-semibold">Terms Content:</label>
            <div className="ml-2 text-xs text-gray-500">
              (Detailed terms and conditions that govern the use of your store)
            </div>
          </div>
          <div className="border rounded-md">
            <ImprovedRichTextEditor
              value={termsContent}
              onChange={setTermsContent}
              placeholder="Enter your detailed terms and conditions here..."
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
          {loading ? "Saving..." : "Save Terms and Conditions"}
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

export default TermsConditionsSettings;