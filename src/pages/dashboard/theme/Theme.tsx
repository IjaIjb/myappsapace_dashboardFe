import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../components/DashboardLayout";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { UserApis } from "../../../apis/userApi/userApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { Link } from "react-router-dom";

const themes = [
  { theme_name: "default", price: "NGN 5,000", image: "/images/theme/theme1.svg" },
  { theme_name: "classic", price: "NGN 5,000", image: "/images/theme/theme2.svg" },
  { theme_name: "modern", price: "NGN 5,000", image: "/images/theme/theme3.svg" },
  { theme_name: "super", price: "NGN 5,000", image: "/images/theme/theme4.svg" },
  { theme_name: "ThemeFive", price: "NGN 5,000", image: "/images/theme/theme5.svg" },
  { theme_name: "ThemeSix", price: "NGN 5,000", image: "/images/theme/theme6.svg" },
];

const Theme = () => {
  const selectedStore = useSelector(
    (state: RootState) => state.globalState?.selectedStore || null
  );
  const sectionName = "theme";
  const [loading, setLoading] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<{
    theme_name: string;
    price: string;
    image: string;
  } | null>(null);

  // Fetch selected theme from API
  useEffect(() => {
    if (!selectedStore) return;

    setLoading(true);
    UserApis.getStoreSettings(selectedStore, sectionName)
      .then((response) => {
        console.log(response.data.settings.settings);
        if (response?.data?.settings?.settings) {
          const foundTheme = themes.find(
            (theme) => theme.theme_name === response.data.settings.settings.theme_name
          );
          if (foundTheme) setSelectedTheme(foundTheme);
        }
      })
      .catch(() => {
        toast.error("Failed to load store settings.");
      })
      .finally(() => setLoading(false));
  }, [selectedStore]);

  // Handle theme selection
  const handleThemeSelect = async (theme: {
    theme_name: string;
    price: string;
    image: string;
  }) => {
    setLoading(true);
    try {
      const response = await UserApis.updateSettings(
        selectedStore,
        sectionName,
        {
          settings: { theme_name: theme.theme_name }, // Send as an object under settings
        }
      );

      if (response?.status === 200 || response?.status === 201) {
        setSelectedTheme(theme);
        toast.success("Theme updated successfully!");
      } else {
        toast.error("Failed to update theme.");
      }
    } catch (error) {
      toast.error("Error updating theme. Please try again.");
    }
    setLoading(false);
  };
  const [open, setOpen] = useState(false);
  const onOpenModal = () => {
    // e.preventDefault();
    setOpen(true);
  };
  const onCloseModal = () => setOpen(false);

  useEffect(() => {
    if (!selectedStore) {
      onOpenModal();
    } else {
      onCloseModal();
    }
  }, [selectedStore]);

  console.log(selectedTheme)
  return (
    <DashboardLayout>
      <Modal
        classNames={{
          modal: "rounded-[10px] overflow-visible relative",
        }}
        open={open}
        onClose={() => {}} // Prevents closing the modal
        closeOnEsc={false} // Prevent closing with the Escape key
        closeOnOverlayClick={false} // Prevent closing by clicking outside
        showCloseIcon={false} // Hides the close button
        center
      >
        <div className="px-2 md:px-5  h-[100px] flex justify-center items-center  text-center">
          <div>
            <h4 className="text-[20px] font-[600] mb-4">Don't have a Store?</h4>
            <Link
              to="/dashboard/create-site"
              className="underline text-blue-800"
            >
              Create a Site
            </Link>
          </div>
        </div>
      </Modal>
      <div className="flex flex-col gap-3">
        {/* Current Selected Theme */}
        {selectedTheme && (
          <div className="bg-white rounded-[14px] pt-3 pb-[30px] pl-3 pr-5">
            <div className="flex justify-center mt-7">
              <div className="max-w-[800px] relative text-center">
                <img
                  src={selectedTheme.image}
                  alt={selectedTheme.theme_name}
                  className="mx-auto"
                />
                <div className="-mt-[80px] absolute w-full z-20">
                  <div className="bg-white py-3 z-20">
                    <div className="flex items-center bg-[#796BEB1A]/[10%] px-3 w-fit py-1 rounded-[5px] gap-2">
                      <h5 className="text-[10px] font-[400]">Current theme</h5>
                    </div>
                    <div className="text-start flex flex-col gap-1 mt-2">
                      <h4 className="text-[#000000] text-[13px] font-[500]">
                        {selectedTheme.theme_name}
                      </h4>
                      <h4 className="text-[#000000] text-[13px] font-[300]">
                        Last saved: 2 Dec at 1:59 pm
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Theme Library */}
        <div className="bg-white rounded-[14px] pt-3 pb-[30px] pl-3 pr-5">
          <div className="flex justify-center mt-4">
            <div className="max-w-[800px] relative text-center">
              <h5 className="text-[#382B67] text-[24px] text-start font-[600]">
                Theme Library
              </h5>
              <h6 className="text-[#9D9D9D] text-[13px] text-start mb-3 font-[500]">
                Access resources for troubleshooting and guidance.
              </h6>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {themes.map((theme) => (
                  <div
                    key={theme.theme_name}
                    className={`border shadow-sm rounded-[10px] p-2 cursor-pointer ${
                      selectedTheme?.theme_name === theme.theme_name
                        ? "border-green-500"
                        : ""
                    }`}
                    onClick={() => handleThemeSelect(theme)}
                  >
                    <img src={theme.image} alt={theme.theme_name} />
                    <div className="text-start flex flex-col gap-1 mt-2">
                      <h4 className="text-[#000000] text-[14px] font-[700]">
                        {theme.theme_name}
                      </h4>
                      <div className="flex justify-between items-center">
                        {/* <h4 className="text-[#000000] text-[12px] font-[400]">
                          {theme.price}
                        </h4> */}
                        <div
                          className="rounded-full h-fit flex items-center gap-3 px-2 py-1"
                          style={{
                            background:
                              "linear-gradient(to bottom, #382B67, #7056CD)",
                          }}
                        >
                          <h5 className="text-[#FFFFFF] text-[14px] font-[400] whitespace-nowrap">
                            Use Theme
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <ToastContainer
                position="bottom-left"
                autoClose={2000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
              {loading && (
                <p className="text-center text-gray-500 mt-3">
                  <LoadingSpinner />
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Theme;
