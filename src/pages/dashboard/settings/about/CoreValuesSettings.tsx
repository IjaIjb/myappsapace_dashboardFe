import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserApis } from "../../../../apis/userApi/userApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";

const CoreValuesSettings = () => {
  const selectedStore = useSelector(
    (state: RootState) => state.globalState?.selectedStore || null
  );

  const sectionName = "core-values";
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<string[]>([]);
  const [newValue, setNewValue] = useState("");

  // Fetch settings from the API
  useEffect(() => {
    if (!selectedStore) return;

    setLoading(true);
    UserApis.getStoreSettings(selectedStore, sectionName)
      .then((response) => {
        console.log(response.data);

        if (response?.data) {
          const settings = response.data?.[sectionName].aboutSettings;
          setValues(settings.values);
        }
      })
      .catch(() => {
        // Silent error handling
      })
      .finally(() => setLoading(false));
  }, [selectedStore]);

  const handleAddValue = () => {
    if (newValue.trim() === "") {
      toast.error("Please enter a value first");
      return;
    }
    
    if (values.includes(newValue.trim())) {
      toast.error("This value already exists");
      return;
    }

    setValues([...values, newValue.trim()]);
    setNewValue("");
  };

  const handleRemoveValue = (index: number) => {
    const updatedValues = [...values];
    updatedValues.splice(index, 1);
    setValues(updatedValues);
  };

  const handleValueChange = (index: number, value: string) => {
    const updatedValues = [...values];
    updatedValues[index] = value;
    setValues(updatedValues);
  };

  const handleMoveValue = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === values.length - 1)
    ) {
      return;
    }

    const updatedValues = [...values];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap elements
    [updatedValues[index], updatedValues[newIndex]] = 
    [updatedValues[newIndex], updatedValues[index]];
    
    setValues(updatedValues);
  };

  const handleSubmit = async () => {
    if (values.length === 0) {
      toast.error("Please add at least one core value");
      return;
    }

    setLoading(true);
    try {
      const response = await UserApis.updateSettings(
        selectedStore,
        sectionName,
        {
          aboutSettings: {
            values: values,
          },
        }
      );
      if (response?.status === 200 || response?.status === 201) {
        toast.success("Core Values updated successfully!");
      }
    } catch (error) {
      toast.error("Error updating Core Values. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white mt-3 rounded-[14px] p-6 shadow-lg">
      <h4 className="text-[#000000] text-[18px] font-bold pb-4">
        Core Values Settings
      </h4>

      <div>
        <p className="text-sm text-gray-600 mb-4">
          Core values represent the fundamental beliefs of your organization. These guiding principles help define what your company stands for.
        </p>

        {/* Add new value */}
        <div className="mb-6">
          <label className="block font-semibold mb-1">Add New Core Value:</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="flex-grow h-10 border rounded-md p-2"
              placeholder="Enter a core value"
            />
            <button
              type="button"
              onClick={handleAddValue}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Add
            </button>
          </div>
        </div>

        {/* List of values */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Current Core Values:</label>
          {values.length === 0 ? (
            <p className="text-gray-500 italic">No core values added yet.</p>
          ) : (
            <div className="space-y-2">
              {values.map((value, index) => (
                <div key={index} className="flex items-center border rounded-md p-2">
                  <div className="flex-grow">
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleValueChange(index, e.target.value)}
                      className="w-full border-none focus:ring-0 p-0"
                    />
                  </div>
                  <div className="flex space-x-1">
                    <button
                      type="button"
                      onClick={() => handleMoveValue(index, 'up')}
                      disabled={index === 0}
                      className={`px-2 py-1 rounded ${index === 0 ? 'text-gray-300' : 'text-blue-500 hover:bg-blue-50'}`}
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveValue(index, 'down')}
                      disabled={index === values.length - 1}
                      className={`px-2 py-1 rounded ${index === values.length - 1 ? 'text-gray-300' : 'text-blue-500 hover:bg-blue-50'}`}
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveValue(index)}
                      className="text-red-500 hover:bg-red-50 px-2 py-1 rounded"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
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
          {loading ? "Saving..." : "Save Core Values"}
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

export default CoreValuesSettings;