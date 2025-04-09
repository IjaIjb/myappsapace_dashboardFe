import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserApis } from "../../../../apis/userApi/userApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

// Section type interface
interface AccordionSection {
  id: string;
  title: string;
  isOpen: boolean;
}

const CoreValuesSettings = () => {
  const selectedStore = useSelector(
    (state: RootState) => state.globalState?.selectedStore || null
  );

  const sectionName = "core-values";
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<string[]>([]);
  const [newValue, setNewValue] = useState("");

  // Accordion state - all sections closed initially
  const [sections, setSections] = useState<AccordionSection[]>([
    { id: "add", title: "Add New Core Value", isOpen: false },
    { id: "current", title: "Current Core Values", isOpen: false }
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

  // Fetch settings from the API
  useEffect(() => {
    if (!selectedStore) return;

    setLoading(true);
    UserApis.getStoreSettings(selectedStore, sectionName)
      .then((response) => {
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
    
    // Open the current values section after adding a new one
    setSections(prev => prev.map(section => 
      section.id === "current" 
        ? { ...section, isOpen: true } 
        : section
    ));
    
    toast.success("Core value added!");
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

  // Section header component
  const SectionHeader = ({ id, title }: { id: string; title: string }) => (
    <div 
      className="flex justify-between items-center py-3 px-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
      onClick={() => toggleSection(id)}
    >
      <h5 className="font-semibold">{title}</h5>
      <div className="text-gray-600">
        {isSectionOpen(id) ? <FaChevronUp /> : <FaChevronDown />}
      </div>
    </div>
  );

  return (
    <div className="bg-white mt-3 rounded-[14px] p-6 shadow-lg">
      <h4 className="text-[#000000] text-[18px] font-bold pb-6">
        Core Values Settings
      </h4>

      <div className="space-y-5">
        <p className="text-sm text-gray-600 mb-4">
          Core values represent the fundamental beliefs of your organization. These guiding principles help define what your company stands for.
        </p>

        {/* Add new value */}
        <div className="border rounded-lg overflow-hidden">
          <SectionHeader id="add" title="Add New Core Value" />
          
          {isSectionOpen("add") && (
            <div className="p-4 transition-all duration-300 ease-in-out">
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
          )}
        </div>

        {/* List of values */}
        <div className="border rounded-lg overflow-hidden">
          <SectionHeader id="current" title="Current Core Values" />
          
          {isSectionOpen("current") && (
            <div className="p-4 transition-all duration-300 ease-in-out">
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