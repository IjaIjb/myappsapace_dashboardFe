import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserApis } from "../../../../apis/userApi/userApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
// import LoadingSpinner from "../../../../components/UI/LoadingSpinner";

const AboutMission = () => {
  const selectedStore = useSelector(
    (state: RootState) => state.globalState?.selectedStore || null
  );

  const sectionName = "aboutmission";
  const [loading, setLoading] = useState(false);
  const [missionTitle, setMissionTitle] = useState("");
  const [missionDescription, setMissionDescription] = useState(
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
          const settings = response.data?.aboutmission.aboutSettings;
          setMissionTitle(settings.mission_title || "");
          setMissionDescription(
            settings.mission_description ||
            ""
          );
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
            mission_title: missionTitle,
            mission_description: missionDescription,
          },
        }
      );
      if (response?.status === 200 || response?.status === 201) {
        toast.success("Mission settings updated successfully!");
      }
    } catch (error) {
      toast.error("Error updating mission settings. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-[14px] p-6 shadow-lg">
      <h4 className="text-[#000000] text-[18px] font-bold pb-4">
        About Mission Section Settings
      </h4>

      <div>
        {/* Mission Title */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Mission Title:</label>
          <input
            type="text"
            value={missionTitle}
            onChange={(e) => setMissionTitle(e.target.value)}
            className="w-full h-12 border rounded-md p-2"
          />
        </div>

        {/* Mission Description */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Mission Description:</label>
          <textarea
            value={missionDescription}
            onChange={(e) => setMissionDescription(e.target.value)}
            className="w-full h-32 border rounded-md p-2"
            placeholder="Enter your company's mission statement"
          />
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

export default AboutMission;