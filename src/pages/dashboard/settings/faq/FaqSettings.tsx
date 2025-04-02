import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserApis } from "../../../../apis/userApi/userApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
// import LoadingSpinner from "../../../../components/UI/LoadingSpinner";

// Interface for FAQ item
interface FAQItem {
  question: string;
  answer: string;
}

const FAQSettings = () => {
  const selectedStore = useSelector(
    (state: RootState) => state.globalState?.selectedStore || null
  );

  const sectionName = "faq";
  const [loading, setLoading] = useState(false);
  const [faqTitle, setFaqTitle] = useState("Frequently Asked Questions");
  const [faqItems, setFaqItems] = useState<FAQItem[]>([
    {
      question: "",
      answer: ""
    },
  ]);

  // Fetch settings from the API
  useEffect(() => {
    if (!selectedStore) return;

    setLoading(true);
    UserApis.getStoreSettings(selectedStore, sectionName)
      .then((response) => {
        console.log(response.data);

        if (response?.data) {
          const settings = response.data?.faq.aboutSettings;
          setFaqTitle(settings.faq_title || "Frequently Asked Questions");
          
          // Set FAQ items if available
          if (settings.faq_items && settings.faq_items.length > 0) {
            setFaqItems(settings.faq_items);
          }
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
          aboutSettings: {
            faq_title: faqTitle,
            faq_items: faqItems,
          },
        }
      );
      if (response?.status === 200 || response?.status === 201) {
        toast.success("FAQ settings updated successfully!");
      }
    } catch (error) {
      toast.error("Error updating FAQ settings. Please try again.");
    }
    setLoading(false);
  };

  const handleFaqItemChange = (index: number, field: string, value: string) => {
    const updatedFaqItems = [...faqItems];
    updatedFaqItems[index] = {
      ...updatedFaqItems[index],
      [field]: value
    };
    setFaqItems(updatedFaqItems);
  };

  const handleAddFaqItem = () => {
    setFaqItems([
      ...faqItems,
      {
        question: "",
        answer: ""
      },
    ]);
  };

  const handleRemoveFaqItem = (index: number) => {
    const updatedFaqItems = faqItems.filter((_, i) => i !== index);
    setFaqItems(updatedFaqItems);
  };

  return (
    <div className="bg-white mt-4 rounded-[14px] p-6 shadow-lg">
      <h4 className="text-[#000000] text-[18px] font-bold pb-4">
        FAQ Section Settings
      </h4>

      <div>
        {/* FAQ Title */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">FAQ Section Title:</label>
          <input
            type="text"
            value={faqTitle}
            onChange={(e) => setFaqTitle(e.target.value)}
            className="w-full h-12 border rounded-md p-2"
          />
        </div>

        {/* FAQ Items Section */}
        <div>
          <h4 className="text-lg font-bold mb-2">FAQ Items:</h4>
          {faqItems.map((item, index) => (
            <div key={index} className="border p-4 rounded-lg mb-4">
              {/* FAQ Number */}
              <div className="bg-gray-100 px-3 py-1 mb-3 inline-block rounded-md">
                <span className="font-medium">FAQ {index + 1}</span>
              </div>
              
              {/* Question */}
              <label className="block font-semibold mb-1">Question:</label>
              <input
                type="text"
                value={item.question}
                onChange={(e) =>
                  handleFaqItemChange(index, "question", e.target.value)
                }
                className="w-full h-10 border rounded-md p-2 mb-3"
                placeholder="Enter the question here"
              />

              {/* Answer */}
              <label className="block font-semibold mb-1">Answer:</label>
              <textarea
                value={item.answer}
                onChange={(e) =>
                  handleFaqItemChange(index, "answer", e.target.value)
                }
                className="w-full h-32 border rounded-md p-2 mb-3"
                placeholder="Enter the answer here"
              />

              {/* Remove Button */}
              {faqItems.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveFaqItem(index)}
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md"
                >
                  Remove FAQ
                </button>
              )}
            </div>
          ))}

          {/* Add FAQ Button */}
          <button
            type="button"
            onClick={handleAddFaqItem}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            Add FAQ
          </button>
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
          {loading ? "Saving..." : "Save Settings"}
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

export default FAQSettings;