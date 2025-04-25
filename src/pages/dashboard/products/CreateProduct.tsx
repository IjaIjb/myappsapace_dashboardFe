import React, { useEffect, useState, useMemo } from "react";
import DashboardLayout from "../../../components/DashboardLayout";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdInfo } from "react-icons/md";
import VariantTable from "./inner/VariantTable";
import { UserApis } from "../../../apis/userApi/userApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import LoadingSpinnerPage from "../../../components/UI/LoadingSpinnerPage";
import { FaArrowRight, FaMoneyBillWave, FaStore } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { Link } from "react-router-dom";

interface MediaProps {
  id: number;
  file: File | null;
}

const SECTION_NAME = "payment";
const MAX_MEDIA_ITEMS = 8;

const CreateProduct = () => {
  const navigate = useNavigate();
  const selectedStore = useSelector(
    (state: RootState) => state.globalState?.selectedStore || null
  );
  
  // UI State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActive, setIsActive] = useState(true);
  
  // Data State
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [category, setCategory] = useState<any>([]);
  const [media, setMedia] = useState<MediaProps[]>(
    Array(MAX_MEDIA_ITEMS).fill(null).map((_, idx) => ({ id: idx, file: null }))
  );
  
  // Loading States
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isCategoryLoading, setIsCategoryLoading] = useState(true);
  const [isCurrencyLoading, setIsCurrencyLoading] = useState(true);

  // Form State
  const [formValues, setFormValues] = useState<any>({
    product_name: "",
    product_description: "",
    product_short_description: "",
    tags: "",
    product_images: [],
    category_id: "",
    product_type_id: "2",
    selling_price: {},
    cost_price: {},
    stock_quantity: "",
    stock_unit: "",
    vendor: "",
    collection_id: "",
    product_status: "active",
  });

  // Compute whether we should show modal
  const shouldShowModal = useMemo(() => {
    return !selectedStore || (currencies.length === 0 && !isCurrencyLoading);
  }, [selectedStore, currencies, isCurrencyLoading]);

  // Effect to handle modal visibility
  useEffect(() => {
    if (shouldShowModal) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [shouldShowModal]);

  // Load currencies when store is selected
  useEffect(() => {
    if (!selectedStore) {
      setCurrencies([]);
      setIsCurrencyLoading(false);
      return;
    }
    
    setIsCurrencyLoading(true);
    
    UserApis.getStoreSettings(selectedStore, SECTION_NAME)
      .then((response) => {
        if (response?.data?.payment?.settings?.currencies) {
          setCurrencies(response.data.payment.settings.currencies || []);
        } else {
          setCurrencies([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching store settings:", error);
        toast.error("Failed to load store settings");
        setCurrencies([]);
      })
      .finally(() => {
        setIsCurrencyLoading(false);
      });
  }, [selectedStore]);

  // Load categories when store is selected
  useEffect(() => {
    if (!selectedStore) {
      setCategory([]);
      setIsCategoryLoading(false);
      return;
    }
    
    setIsCategoryLoading(true);
    
    UserApis.getCategory(selectedStore)
      .then((response) => {
        if (response?.data) {
          setCategory(response.data || []);
        } else {
          setCategory([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories");
        setCategory([]);
      })
      .finally(() => {
        setIsCategoryLoading(false);
      });
  }, [selectedStore]);

  // Update overall loading state when individual loading states change
  useEffect(() => {
    setIsInitialLoading(isCurrencyLoading || isCategoryLoading);
  }, [isCurrencyLoading, isCategoryLoading]);

  // Handle input changes for form fields
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev:any) => ({ ...prev, [name]: value }));
  };

  // Handle price changes for selling and cost price
  const handlePriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    priceType: "selling_price" | "cost_price",
    currency: string
  ) => {
    const { value } = e.target;
    setFormValues((prev:any) => ({
      ...prev,
      [priceType]: {
        ...prev[priceType],
        [currency]: value,
      },
    }));
  };

  // Handle file uploads for product images
  const handleFileChange = (file: File, id: number) => {
    setFormValues((prev:any) => ({
      ...prev,
      product_images: [...prev.product_images, file],
    }));

    setMedia((prev) =>
      prev.map((item) => (item.id === id ? { ...item, file } : item))
    );
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!selectedStore) {
      toast.error("Please select a store first");
      return;
    }
    
    if (currencies.length === 0) {
      toast.error("Please set up your currency preferences first");
      return;
    }
    
    setIsLoading(true);

    try {
      const formData = new FormData();
      
      // Append form fields to FormData
      formData.append("product_name", formValues.product_name);
      formData.append("product_description", formValues.product_description);
      formData.append("product_short_description", formValues.product_short_description);
      formData.append("tags", formValues.tags);
      formData.append("selling_price", JSON.stringify(formValues.selling_price));
      formData.append("cost_price", JSON.stringify(formValues.cost_price));
      formData.append("category_id", formValues.category_id);
      formData.append("stock_quantity", formValues.stock_quantity);
      formData.append("stock_unit", formValues.stock_unit);
      formData.append("vendor", formValues.vendor);
      formData.append("product_status", isActive ? "active" : "inactive");

      // Append images
      media.forEach(({ file }, index) => {
        if (file) {
          formData.append(`product_images[${index}]`, file);
        }
      });

      const response = await UserApis.createProduct(selectedStore, formData);

      if (response?.data) {
        toast.success(response?.data?.message || "Product created successfully!");
        navigate("/dashboard/products");
      } else {
        toast.error(response?.data?.message || "Failed to create product.");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("An error occurred while creating the product.");
    } finally {
      setIsLoading(false);
    }
  };

  // If initial data is still loading, show loader
  if (isInitialLoading && selectedStore) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-96">
          <LoadingSpinnerPage />
          <p className="mt-4 text-gray-600">Loading product form...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <div>
      {/* Modal for store/currency selection */}
      <Modal
        classNames={{
          modal: "rounded-xl overflow-visible relative",
          overlay: "bg-black bg-opacity-70",
        }}
        open={isModalOpen}
        onClose={() => {}} // Prevents closing the modal
        closeOnEsc={false}
        closeOnOverlayClick={false}
        showCloseIcon={false}
        center
      >
        <div className="px-8 py-10 text-center">
          {!selectedStore ? (
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                <FaStore className="text-blue-600 text-4xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Site Selected</h3>
              <p className="text-gray-600 mb-6">You need to create or select a site before adding products</p>
              <Link 
                to="/dashboard/create-site" 
                className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span>Create a New Site</span>
                <FaArrowRight size={14} />
              </Link>
              <Link 
                to="/dashboard/site" 
                className="mt-3 inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline"
              >
                Select Existing Site
              </Link>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                <FaMoneyBillWave className="text-green-600 text-4xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Currency Not Set</h3>
              <p className="text-gray-600 mb-6">Please set up your currency preferences before adding products</p>
              <Link 
                to="/dashboard/settings/payment-preference" 
                className="inline-flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
              >
                <span>Set Up Currency</span>
                <FaArrowRight size={14} />
              </Link>
              <p className="mt-4 text-sm text-gray-500">
                Currency settings are required to define product prices correctly
              </p>
            </div>
          )}
        </div>
      </Modal>

      <DashboardLayout>
        <div className="container mx-auto px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Create New Product</h1>
            <p className="text-gray-600">Fill in the details to add a new product to your inventory</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left column (2/3 width on large screens) */}
              <div className="lg:col-span-2 space-y-6">
                {/* Product Information */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-medium text-gray-800 mb-4">Product Information</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="product_name" className="block text-sm font-medium text-gray-700 mb-1">
                        Product Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="product_name"
                        name="product_name"
                        value={formValues.product_name}
                        onChange={handleInputChange}
                        placeholder="Enter product title"
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="product_description" className="block text-sm font-medium text-gray-700 mb-1">
                        Short Description
                      </label>
                      <input
                        type="text"
                        id="product_description"
                        name="product_description"
                        value={formValues.product_description}
                        onChange={handleInputChange}
                        placeholder="Brief description of your product"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="product_short_description" className="block text-sm font-medium text-gray-700 mb-1">
                        Detailed Description
                      </label>
                      <textarea
                        id="product_short_description"
                        name="product_short_description"
                        value={formValues.product_short_description}
                        onChange={handleInputChange}
                        placeholder="Provide detailed information about your product"
                        rows={4}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-1">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center gap-2">
                        <select
                          id="category_id"
                          name="category_id"
                          value={formValues.category_id}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="" disabled>
                            {isCategoryLoading ? "Loading categories..." : "Select category"}
                          </option>
                          {category?.categories?.data?.map((cat: any) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.category_name}
                            </option>
                          ))}
                        </select>
                        <Link 
                          to="/dashboard/create-category" 
                          className="flex items-center justify-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-md transition-colors"
                        >
                          <IoAddCircleOutline />
                          <span className="text-sm">New</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Media Upload */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-medium text-gray-800 mb-4">Product Media</h2>
                  
                  <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                    <MdInfo className="text-blue-500" />
                    <span>Recommended dimension: 930px x 1163px, Max file size: 5mb</span>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {media.map(({ id, file }) => (
                      <div
                        key={id}
                        className="relative flex items-center justify-center aspect-square border-2 border-dashed border-gray-300 rounded-md overflow-hidden hover:border-primary transition-colors"
                      >
                        <input
                          type="file"
                          accept="image/x-png,image/gif,image/jpeg,application/pdf,video/*"
                          name={`product_images_${id}`}
                          className="absolute inset-0 opacity-0 cursor-pointer z-10"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleFileChange(e.target.files[0], id);
                            }
                          }}
                        />
                        {file ? (
                          <img
                            src={URL.createObjectURL(file)}
                            alt="Uploaded Preview"
                            className="object-cover w-full h-full absolute inset-0"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center text-gray-400">
                            <img
                              src="/images/products/imageProduct.svg"
                              alt="Placeholder"
                              className="w-10 h-10 mb-2"
                            />
                            <span className="text-xs text-center px-2">Upload Image</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Product Price */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-medium text-gray-800 mb-4">Product Price</h2>
                  
                  {isCurrencyLoading ? (
                    <div className="flex justify-center py-4">
                      <LoadingSpinner />
                      <span className="ml-2 text-gray-600">Loading currencies...</span>
                    </div>
                  ) : currencies.length === 0 ? (
                    <div className="bg-yellow-50 p-4 rounded-md">
                      <p className="text-yellow-700">
                        Please configure your currency settings in the Payment Preferences section.
                      </p>
                      <Link 
                        to="/dashboard/settings/payment-preference" 
                        className="inline-flex items-center mt-2 text-sm text-blue-600 hover:underline"
                      >
                        Go to Payment Settings
                        <FaArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </div>
                  ) : (
                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Selling Prices */}
                        <div className="space-y-4">
                          <h3 className="text-sm font-medium text-gray-700">Selling Prices</h3>
                          {currencies.map((currency: string) => (
                            <div key={`selling-${currency}`}>
                              <label htmlFor={`selling_price_${currency}`} className="block text-sm text-gray-600 mb-1">
                                Price in {currency} <span className="text-red-500">*</span>
                              </label>
                              <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                  {currency}
                                </span>
                                <input
                                  type="number"
                                  id={`selling_price_${currency}`}
                                  name={`selling_price_${currency}`}
                                  value={formValues.selling_price[currency] || ""}
                                  onChange={(e) => handlePriceChange(e, "selling_price", currency)}
                                  placeholder="0.00"
                                  required
                                  min="0"
                                  step="0.01"
                                  className="w-full pl-12 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Cost Prices */}
                        <div className="space-y-4">
                          <h3 className="text-sm font-medium text-gray-700">Cost Prices</h3>
                          {currencies.map((currency: string) => (
                            <div key={`cost-${currency}`}>
                              <label htmlFor={`cost_price_${currency}`} className="block text-sm text-gray-600 mb-1">
                                Cost in {currency} <span className="text-red-500">*</span>
                              </label>
                              <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                  {currency}
                                </span>
                                <input
                                  type="number"
                                  id={`cost_price_${currency}`}
                                  name={`cost_price_${currency}`}
                                  value={formValues.cost_price[currency] || ""}
                                  onChange={(e) => handlePriceChange(e, "cost_price", currency)}
                                  placeholder="0.00"
                                  required
                                  min="0"
                                  step="0.01"
                                  className="w-full pl-12 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-4 py-3 px-4 bg-blue-50 rounded-md">
                        <p className="text-sm text-blue-700">
                          Setting accurate prices helps optimize your profit margins and inventory value.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Product Inventory */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-medium text-gray-800 mb-4">Inventory Management</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="stock_quantity" className="block text-sm font-medium text-gray-700 mb-1">
                        Stock Quantity <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="stock_quantity"
                        name="stock_quantity"
                        value={formValues.stock_quantity}
                        onChange={handleInputChange}
                        placeholder="Enter available quantity"
                        required
                        min="0"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="stock_unit" className="block text-sm font-medium text-gray-700 mb-1">
                        Stock Unit <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="stock_unit"
                        name="stock_unit"
                        value={formValues.stock_unit}
                        onChange={handleInputChange}
                        placeholder="Enter stock unit"
                        required
                        min="0"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Variants - Hidden on mobile for simplicity */}
                <div className="bg-white rounded-xl shadow-sm p-6 hidden md:block">
                  <h2 className="text-lg font-medium text-gray-800 mb-4">Product Variants</h2>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Available Colors</h3>
                    <div className="flex flex-wrap gap-2 border-b pb-4">
                      <div className="flex items-center bg-gray-100 px-3 py-2 rounded-md">
                        <div className="w-4 h-4 bg-blue-500 rounded-sm mr-2"></div>
                        <span className="text-sm">Blue</span>
                      </div>
                      <div className="flex items-center bg-gray-100 px-3 py-2 rounded-md">
                        <div className="w-4 h-4 bg-purple-500 rounded-sm mr-2"></div>
                        <span className="text-sm">Purple</span>
                      </div>
                      <button type="button" className="flex items-center gap-1 bg-white border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-50">
                        <IoAddCircleOutline />
                        <span className="text-sm">Add Color</span>
                      </button>
                    </div>
                    
                    <div className="mt-4">
                      <button type="button" className="flex items-center gap-1 bg-white border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-50">
                        <IoAddCircleOutline />
                        <span className="text-sm">Add Another Option</span>
                      </button>
                    </div>
                    
                    <div className="mt-6">
                      <VariantTable />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right column (1/3 width on large screens) */}
              <div className="space-y-6">
                {/* Product Status */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-medium text-gray-800 mb-4">Product Status</h2>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Available for sale</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isActive}
                        name="product_status"
                        onChange={() => setIsActive(!isActive)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                  </div>
                  
                  <p className="mt-3 text-sm text-gray-600">
                    {isActive 
                      ? "This product will be visible to customers and available for purchase." 
                      : "This product will be hidden from customers and unavailable for purchase."}
                  </p>
                </div>
                
                {/* Summary Card */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-medium text-gray-800 mb-4">Product Summary</h2>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Status:</span>
                      <span className={`text-sm font-medium ${isActive ? 'text-green-600' : 'text-gray-600'}`}>
                        {isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Images:</span>
                      <span className="text-sm font-medium text-gray-800">
                        {media.filter(m => m.file).length} uploaded
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Currency:</span>
                      <span className="text-sm font-medium text-gray-800">
                        {currencies.length > 0 ? currencies.join(', ') : 'Not set'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 my-4"></div>
                  
                  <div className="flex flex-col">
                    <button
                      type="submit"
                      disabled={isLoading || shouldShowModal}
                      className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition-colors w-full disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <LoadingSpinner />
                          <span>Creating...</span>
                        </>
                      ) : (
                        <>
                          <span>Create Product</span>
                          <FaArrowRight />
                        </>
                      )}
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => navigate('/dashboard/products')}
                      className="mt-3 text-gray-600 hover:text-gray-800 text-sm font-medium text-center"
                    >
                      Cancel and return to products
                    </button>
                  </div>
                </div>
                
                {/* Help Card */}
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-blue-800 font-medium mb-3">Tips for Product Creation</h3>
                  <ul className="space-y-2 text-sm text-blue-700">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Upload high-quality images for better customer experience</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Detailed descriptions help improve search results</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Set accurate stock quantities to avoid overselling</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </form>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default CreateProduct;