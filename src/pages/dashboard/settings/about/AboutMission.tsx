import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserApis } from "../../../../apis/userApi/userApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";

const VisionMissionSettings = () => {
  const selectedStore = useSelector(
    (state: RootState) => state.globalState?.selectedStore || null
  );

  const sectionName = "vision-and-mission";
  const [loading, setLoading] = useState(false);
  const [vision, setVision] = useState(
    ""
  );
  const [mission, setMission] = useState(
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
          const settings = response.data?.[sectionName].aboutSettings;
          setVision(settings.vision || "To be the leading online store in the world, offering the best shopping experience.");
          setMission(settings.mission || "Our mission is to make shopping easy, affordable, and convenient for everyone.");
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
            vision: vision,
            mission: mission,
          },
        }
      );
      if (response?.status === 200 || response?.status === 201) {
        toast.success("Vision and Mission updated successfully!");
      }
    } catch (error) {
      toast.error("Error updating Vision and Mission. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-[14px] p-6 shadow-lg">
      <h4 className="text-[#000000] text-[18px] font-bold pb-4">
        Vision and Mission Settings
      </h4>

      <div>
        {/* Vision */}
        <div className="mb-6">
          <label className="block font-semibold mb-1">Company Vision:</label>
          <textarea
            value={vision}
            onChange={(e) => setVision(e.target.value)}
            className="w-full h-32 border rounded-md p-2"
            placeholder="Enter your company's vision statement"
          />
          <p className="text-sm text-gray-500 mt-1">
            Your vision statement should describe what you want your company to become in the future.
          </p>
        </div>

        {/* Mission */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Company Mission:</label>
          <textarea
            value={mission}
            onChange={(e) => setMission(e.target.value)}
            className="w-full h-32 border rounded-md p-2"
            placeholder="Enter your company's mission statement"
          />
          <p className="text-sm text-gray-500 mt-1">
            Your mission statement should describe why your company exists and its purpose.
          </p>
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

export default VisionMissionSettings;