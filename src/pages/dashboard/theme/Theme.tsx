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
  { 
    theme_name: "default", 
    price: "NGN 5,000", 
    image: "/images/theme/theme1Default.png",
    previewUrl: "/theme-preview/default"
  },
  { 
    theme_name: "classic", 
    price: "NGN 5,000", 
    image: "/images/theme/theme2Classic.png",
    previewUrl: "/theme-preview/classic"
  },
  { 
    theme_name: "modern", 
    price: "NGN 5,000", 
    image: "/images/theme/theme3Modern.png",
    previewUrl: "/theme-preview/modern"
  },
  { 
    theme_name: "website_one", 
    price: "NGN 5,000", 
    image: "/images/theme/theme3Modern.png",
    previewUrl: "/theme-preview/modern"
  },
  { 
    theme_name: "website_two", 
    price: "NGN 5,000", 
    image: "/images/theme/theme3Modern.png",
    previewUrl: "/theme-preview/modern"
  },
  // { theme_name: "super", price: "NGN 5,000", image: "/images/theme/theme4.svg", previewUrl: "/theme-preview/super" },
  // { theme_name: "ThemeFive", price: "NGN 5,000", image: "/images/theme/theme5.svg", previewUrl: "/theme-preview/theme-five" },
  // { theme_name: "ThemeSix", price: "NGN 5,000", image: "/images/theme/theme6.svg", previewUrl: "/theme-preview/theme-six" },
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
    previewUrl: string;
  } | null>(null);

  // Fetch selected theme from API
  useEffect(() => {
    if (!selectedStore) return;

    setLoading(true);
    UserApis.getStoreSettings(selectedStore, sectionName)
      .then((response) => {
        console.log(response);
        if (response?.data) {
          const foundTheme = themes.find(
            (theme) => theme.theme_name === response.data.theme.settings.theme_name
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
    previewUrl: string;
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

  // Handle preview
  const handlePreview = (previewUrl: string) => {
    // Open in a new tab
    window.open(`${previewUrl}?storeId=${selectedStore}`, '_blank');
  };

  const [open, setOpen] = useState(false);
  const onOpenModal = () => {
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

  console.log(selectedTheme);
  
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
        <div className="px-2 md:px-5 h-[100px] flex justify-center items-center text-center">
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
                    <div className="flex justify-between items-center">
                      <div>
                    <div className="flex items-center bg-[#796BEB1A]/[10%] px-3 w-fit py-1 rounded-[5px] gap-2">
                      <h5 className="text-[10px] font-[400]">Current theme</h5>
                    </div>
                    <div className="text-start flex flex-col gap-1 mt-2">
                      <h4 className="text-[#000000] text-[13px] font-[500]">
                        {selectedTheme.theme_name}
                      </h4>
                      
                    </div>
            </div>

                    <div className="mt-3">
                      <button 
                        onClick={() => handlePreview(selectedTheme.previewUrl)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-full text-sm flex items-center gap-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Preview Theme
                      </button>
                    </div>
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
                E-commerce web-page
              </h6>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {themes.map((theme) => (
                  <div
                    key={theme.theme_name}
                    className={`border shadow-sm rounded-[10px] p-2 ${
                      selectedTheme?.theme_name === theme.theme_name
                        ? "border-green-500"
                        : ""
                    }`}
                  >
                    <img src={theme.image} alt={theme.theme_name} />
                    <div className="text-start flex flex-col gap-1 mt-2">
                      <h4 className="text-[#000000] text-[14px] font-[700]">
                        {theme.theme_name}
                      </h4>
                      <div className="flex justify-between items-center mt-2">
                        <button
                          onClick={() => handlePreview(theme.previewUrl)}
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          Preview
                        </button>
                        
                        <button
                          onClick={() => handleThemeSelect(theme)}
                          className="rounded-full h-fit flex items-center gap-3 px-3 py-1"
                          style={{
                            background:
                              "linear-gradient(to bottom, #382B67, #7056CD)",
                          }}
                        >
                          <h5 className="text-[#FFFFFF] text-[14px] font-[400] whitespace-nowrap">
                            Use Theme
                          </h5>
                        </button>
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