import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../components/DashboardLayout";
// import { IoAddCircleOutline } from "react-icons/io5";
// import { MdInfo } from "react-icons/md";
// import TitleProduct from "./inner/TitleProduct";
// import ProductPrice from "./inner/ProductPrice";
// import Variants from "./inner/Variants";
// import ProductInventory from "./inner/ProductInventory";
import { useLocation } from "react-router-dom";
import { UserApis } from "../../../apis/userApi/userApi";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdInfo } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import VariantTable from "./inner/VariantTable";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import { FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

type MediaProps = {
  id: number;
  file: File | null;
  url?: string; // Add this to handle existing image URLs
};

const ProductDetails = () => {
  const navigate = useNavigate();
  const selectedStore = useSelector((state: RootState) => state.globalState?.selectedStore || null);
  // console.log("Selected Store Code:", selectedStore);
      
  
  const location = useLocation();
  const { productId, storeCode } = location.state || {}; // Extract values
  const [isActive, setIsActive] = useState<any>(true);

  // console.log("Product ID:", productId);
  // console.log("Store Code:", storeCode);
  // const [storeId, setStoreId] = useState("");
  const [loader, setLoader] = useState(false);
  const [flashLoader, setFlashLoader] = useState(false);
  const [category, setCategory] = useState<any>([]);
  const [currencies, setCurrencies] = useState<any>([]);
  // const [produtId, setProductId] = useState<any>("");
  const sectionName = "payment";

  const [formValues, setFormValues] = useState({
    product_name: "",
    id: "",
    product_description: "",
    store_code: "",
    product_short_description: "",
    tags: "",
    product_images: [],
    category_id: "",
    product_type_id: "2",
    selling_price: "",
    cost_price: "",
    stock_quantity: "",
    stock_unit: "",
    vendor: "",
    collection_id: "",
    product_status: "active",
  });

  useEffect(() => {
    if (!selectedStore) {
      toast.error("Please select a Site");
      return;
    }
  
    setLoader(true);
    UserApis.getStoreSettings(selectedStore, sectionName)
      .then((response) => {
        // console.log(response);
        if (response?.data) {
          const settings = response.data?.settings.settings;
  
          // Populate the form fields with existing settings
          setCurrencies(settings.currencies || []);
        }
      })
      .catch((error) => {
        console.error("Error fetching Site settings:", error);
        toast.error("Failed to load Site settings.");
      })
      .finally(() => {
        setLoader(false);
      });
  }, [selectedStore, sectionName]);
  
  React.useEffect(() => {
    UserApis.getSingleProduct(storeCode, productId).then((response) => {
      if (response?.data) {
        // console.log(response.data.product);
        // setProductId(response.data.product.id);
    
              // Parse selling and cost price if they exist
      const sellingPrice =
      response?.data?.product?.selling_price
        ? JSON.parse(response.data.product.selling_price)
        : {};
    const costPrice =
      response?.data?.product?.cost_price
        ? JSON.parse(response.data.product.cost_price)
        : {};

      // If product_images contains URLs, convert them to media objects
      const existingImages = response?.data?.product?.product_images?.map(
        (imgUrl: string, idx: number) => ({
          id: idx,
          file: null, // No file object for existing images
          url: imgUrl, // Store URL for preview
        })
      ) || [];

           setFormValues({
        ...response?.data?.product,
        selling_price: sellingPrice,
        cost_price: costPrice,
      });
      
      setMedia(existingImages); // Initialize media with existing images
        // setStoreId(response?.data?.store?.id);
      }
    });
  }, [storeCode, productId]);

  // console.log(formValues)
  useEffect(() => {
    UserApis.getCategory(storeCode)
      .then((response) => {
        if (response?.data) {
          setCategory(response?.data || []); // Adjusting to your API response structure
        }
      })
      .catch((error) => console.error("Error fetching Sites:", error));
  }, [storeCode]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const [media, setMedia] = useState<MediaProps[]>([]);

  const handleFileChange = (file: File, id: number) => {
    setFormValues((prev: any) => ({
      ...prev,
      product_images: prev.product_images.map((img: any, index: number) =>
        index === id ? file : img
      ),
    }));
  
    setMedia((prev) =>
      prev.map((item, index) =>
        index === id ? { ...item, file, url: URL.createObjectURL(file) } : item
      )
    );
  };

    // Handle input changes for selling and cost price dynamically
    const handlePriceChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      priceType: "selling_price" | "cost_price",
      currency: string
    ) => {
      const { value } = e.target;
  
      setFormValues((prev: any) => ({
        ...prev,
        [priceType]: {
          ...prev[priceType],
          [currency]: value,
        },
      }));
    };
    
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);
  
    const payload: any = {
      product_name: formValues.product_name,
      product_description: formValues.product_description,
      store_code: selectedStore,
      product_short_description: formValues.product_short_description,
      tags: formValues.tags,
      category_id: formValues.category_id,
      product_type_id: formValues.product_type_id,
      selling_price: formValues.selling_price,
      cost_price: formValues.cost_price,
      stock_quantity: formValues.stock_quantity,
      stock_unit: formValues.stock_unit,
      vendor: formValues.vendor,
      collection_id: formValues.collection_id,
      product_status: formValues.product_status,
      // product_images: [], // This will hold both new files and existing URLs
    };
  
    // const formData = new FormData();
  
    // media.forEach((item, index) => {
    //   if (item.file) {
    //     // Append new files
    //     formData.append(`product_images[${index}]`, item.file);
    //   } else if (item.url) {
    //     // Append existing URLs
    //     payload.product_images.push(item.url);
    //   }
    // });
  
    try {
      // console.log("Submitting payload:", payload);
  
      const response: any = await UserApis.updateProduct(storeCode, productId, payload);
      
      if (response?.data) {
        toast.success(response?.data?.message || "Product updated successfully!");
        navigate("/dashboard/products");
      } else {
        toast.error(response?.data?.message || "Failed to update product.");
      }
    } catch (error: any) {
      console.error("Error updating product:", error);
      toast.error(
        error?.response?.data?.message || "An error occurred while updating the product."
      );
    } finally {
      setLoader(false);
    }
  };
  
  
    const [formFlashValues, setFormFlashValues] = useState<any>({
      product_id: productId,
      sale_type: "flash",
      discount_percentage: 0,
      sale_start: "",
      sale_end: "",
    });
    
      const handleInputFlashChange = (
        e: React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
      ) => {
        const { name, value } = e.target;
        setFormFlashValues((prev: any) => ({ ...prev, [name]: value }));
        // console.log(name);
      };

        const handleFlashSubmit = async (e: any) => {
          e.preventDefault();
          setFlashLoader(true);
      
          const formData = new FormData();
          // if (categoryLogo) {
          //   formData.append("category_image", categoryLogo);
          // }
          formData.append("product_id", formFlashValues?.product_id);
          formData.append("sale_type", formFlashValues.sale_type);
          formData.append("discount_percentage", formFlashValues.discount_percentage);
          formData.append("sale_start", formFlashValues.sale_start);
          formData.append("sale_end", formFlashValues.sale_end);
      
          // Ensure the correct product_type_id
          // formData.append(
          //   "product_type_id",
          //   String(Number(formFlashValues.product_type_id) || 2)
          // );
      
          // console.log("Submitting payload:", formFlashValues);
          // console.log("Submitting payload:", formData);
          // console.log("Submitting payload:", formFlashValues);
      
          try {
            // console.log("Submitting payload:", formFlashValues);
      
            const response: any = await UserApis.addProductToSale(
              selectedStore,
              formFlashValues.product_id,
              formData
            );
            // console.log(response);
      
            if (response?.data) {
              toast.success(
                response?.data?.message || "product added to sale successfully!"
              );
              setFlashLoader(false);
      
              // navigate("/dashboard/products");
            } else {
              toast.error(
                response?.data?.message || "Failed to add product to sale."
              );
              setFlashLoader(false);
            }
          } catch (error) {
            console.error("Error creating product:", error);
            toast.error("An error occurred while creating the product.");
            setFlashLoader(false);
          } finally {
            setFlashLoader(false);
          }
        };
  return (
    <div>
      <DashboardLayout>
        <div>
          <form
            onSubmit={handleSubmit}
            className="grid lg:grid-cols-12 gap-3 pb-6"
          >
            <div className="lg:col-span-8 flex flex-col gap-3">
              {/* <TitleProduct /> */}
              <div className="bg-white rounded-[14px] pt-3 pb-4 pl-3 pr-5">
                <div className="">
                  <h4 className="text-[12px] font-[400]">Title</h4>
                  <input
                    type="text"
                    name="product_name"
                    value={formValues.product_name}
                    onChange={handleInputChange}
                    placeholder="Title"
                    required
                    className="w-full p-2 mt-2 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="mt-3">
                  <h4 className="text-[12px] font-[400]">
                    Short Description (Optional)
                  </h4>
                  <input
                    type="text"
                    name="product_description"
                    value={formValues.product_description}
                    onChange={handleInputChange}
                    placeholder="Title"
                    className="w-full p-2 mt-2 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="mt-3">
                  <h4 className="text-[12px] font-[400]">
                    Description (Optional)
                  </h4>
                  <textarea
                    placeholder="Add Note"
                    name="product_short_description"
                    value={formValues.product_short_description}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full p-2 mt-2 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="mt-3">
                  <h3 className="text-[12px] font-[400] pb-1">Media</h3>
                  <div className="mb-2 flex gap-1 items-center ">
                    <MdInfo className="text-[#6B65E9]" />
                    <h4 className="text-[10px] font-[400] text-[#9D9D9D]">
                      {" "}
                      Recommended dimension: 930px x 1163px, Max file size: 5mb
                    </h4>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                {media.map(({ id, file, url }) => (
      <div
        key={id}
        className="relative flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-blue-400"
      >
        <input
          type="file"
          accept="image/x-png,image/gif,image/jpeg,application/pdf,video/*"
          className="absolute inset-0 opacity-0 cursor-pointer"
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
            className="object-cover w-full h-full rounded-md"
          />
        ) : url ? (
          <img
            src={url}
            alt="Existing one"
            className="object-cover w-full h-full rounded-md"
          />
        ) : (
          <div className="flex flex-col items-center text-gray-400">
            <img
              aria-hidden="true"
              src="/images/products/imageProduct.svg"
              alt="Placeholder"
              className="w-12 h-12"
            />
            <span className="text-sm">Upload Image</span>
          </div>
        )}
      </div>
    ))}
                  </div>
                </div>

                <div className="mt-3">
                  <h4 className="text-[12px] font-[400]">Category</h4>
                  <select
                    name="category_id"
                    value={formValues.category_id}
                    //   placeholder="CHRISTMAS BABY"
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 mt-2 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="" disabled>
                      Select category
                    </option>
                    {category?.categories?.data?.map((cat: any) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.category_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center bg-[#796BEB1A]/[10%] px-3 w-fit py-1 mt-2 rounded-[5px] gap-2">
                  <IoAddCircleOutline className="" />

                  <h5 className="text-[10px] font-[400]">New Product</h5>
                </div>

                <div className="mt-3">
                  <h4 className="text-[12px] font-[400]">
                    Size Chart (Optional)
                  </h4>
                  <input
                    type="text"
                    placeholder="Chart"
                    className="w-full p-2 mt-2 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              {/* <ProductPrice /> */}
              <div className="bg-white rounded-[14px] pt-3 pb-4 pl-3 pr-5">
                <h4 className="text-[#000000] text-[14px] font-[600] pb-2">
                  Product Price
                </h4>

                <div className="grid md:grid-cols-2 gap-3">
                  {/* Left side - Selling Prices */}
                  <div>
                    {currencies.map((currency: any) => (
                      <div key={currency} className="mb-3">
                        <h4 className="text-[12px] font-[400]">
                          Selling Price ({currency})
                        </h4>
                        <input
                          type="number"
                          name={`selling_price_${currency}`}
                          value={formValues.selling_price[currency] || ""}
                          onChange={(e) =>
                            handlePriceChange(e, "selling_price", currency)
                          }
                          placeholder={`Selling Price in ${currency}`}
                          required
                          className="w-full p-2 mt-2 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Right side - Cost Prices */}
                  <div>
                    {currencies.map((currency: any) => (
                      <div key={currency} className="mb-3">
                        <h4 className="text-[12px] font-[400]">
                          Cost Price ({currency})
                        </h4>
                        <input
                          type="number"
                          name={`cost_price_${currency}`}
                          value={formValues.cost_price[currency] || ""}
                          onChange={(e) =>
                            handlePriceChange(e, "cost_price", currency)
                          }
                          placeholder={`Cost Price in ${currency}`}
                          required
                          className="w-full p-2 mt-2 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* <Variants /> */}
              <div className="bg-white rounded-[14px] pt-3 pb-4 pl-3 pr-5">
                <h4 className="text-[#000000] text-[14px] font-[600] pb-2">
                  Variants
                </h4>

                <h5 className="text-[12px] font-[400] pt-5">Colour</h5>
                <div className="flex gap-2 border-b pb-4">
                  <div className="flex items-center bg-[#796BEB1A]/[10%] px-2 w-fit py-1 mt-2 rounded-[5px] gap-2">
                    <div className="w-4 h-4 bg-[#3491DE] rounded-[2px]"></div>
                    <h5 className="text-[10px] font-[400]">Blue</h5>
                  </div>
                  <div className="flex items-center bg-[#796BEB1A]/[10%] px-2 w-fit py-1 mt-2 rounded-[5px] gap-2">
                    <div className="w-4 h-4 bg-purple-500 rounded-[2px]"></div>
                    <h5 className="text-[10px] font-[400]">Purple</h5>
                  </div>

                  <div className="flex items-center bg-[#796BEB1A]/[10%] px-3 w-fit py-1 mt-2 rounded-[5px] gap-2">
                    <IoAddCircleOutline className="" />

                    <h5 className="text-[10px] font-[400]">Add Color</h5>
                  </div>
                </div>
                <div className="flex items-center bg-[#796BEB1A]/[10%] px-3 w-fit py-1 mt-4 rounded-[5px] gap-2">
                  <IoAddCircleOutline className="" />

                  <h5 className="text-[10px] font-[400]">Add Another Option</h5>
                </div>

                <VariantTable />
              </div>
              {/* <ProductInventory /> */}
              <div className="bg-white rounded-[14px] pt-3 pb-4 pl-3 pr-5">
                <h4 className="text-[#000000] text-[14px] font-[600] pb-2">
                  Product Inventory
                </h4>

                <div className="grid md:grid-cols-2 gap-3">
                  <div className="">
                    <h4 className="text-[12px] font-[400]">Stock Quantity</h4>
                    <input
                      type="number"
                      name="stock_quantity"
                      value={formValues.stock_quantity}
                      onChange={handleInputChange}
                      placeholder="Title"
                      required
                      className="w-full p-2 mt-2 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="">
                    <h4 className="text-[12px] font-[400]">Stock Unit</h4>
                    <input
                      type="number"
                      name="stock_unit"
                      value={formValues.stock_unit}
                      onChange={handleInputChange}
                      placeholder="Title"
                      required
                      className="w-full p-2 mt-2 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <div className="bg-white rounded-[14px] pt-3 pb-4 pl-3 pr-5">
                <h4 className="text-[#000000] text-[14px] font-[600] pb-2">
                  Product Status
                </h4>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isActive}
                    name="product_status"
                    onChange={() => setIsActive(!isActive)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20  rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-[#02B718]"></div>

                  <span className="ml-3 text-gray-800">
                    {isActive ? "Active" : "Inactive"}
                  </span>
                </label>
              </div>
              <div className="bg-white rounded-[14px] pt-3 pb-4 px-3">
                <h4 className="text-[#000000] text-[14px] font-[600] pb-2">
                  Add to Flash Sales
                </h4>
                <div className="flex flex-col gap-4">
                <form
            onSubmit={handleFlashSubmit}
            className=" pb-6"
          >
            
              {/* <TitleProduct /> */}
              <div className="bg-white rounded-[14px] pt-3 pb-4 pl-3 pr-5">
                {/* <div className="mt-3">
                  <h4 className="text-[12px] font-[400]">Product</h4>
                  <select
                    name="product_id"
                    value={formFlashValues.product_id}
                    //   placeholder="CHRISTMAS BABY"
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 mt-2 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="" disabled>
                      Select Product
                    </option>
                    {product?.products?.map((prod: any) => (
                      <option key={prod.id} value={prod.id}>
                        {prod.product_name}
                      </option>
                    ))}
                  </select>
                </div> */}

                <div className="">
                  <h4 className="text-[12px] font-[400]">Discount (%)</h4>
                  <input
                    type="number"
                    name="discount_percentage"
                    value={formFlashValues.discount_percentage}
                    onChange={handleInputFlashChange}
                    placeholder=""
                    required
                    className="w-full p-2 mt-2 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label
                    htmlFor="sale_start"
                    className="text-[#2B2C2B] text-[12px] font-[400]"
                  >
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="sale_start"
                    value={formFlashValues.sale_start}
                    onChange={handleInputFlashChange}
                    className="block w-full mt-1 border px-3 py-2 rounded"
                    placeholder=""
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="sale_end"
                    className="text-[#2B2C2B] text-[12px] font-[400]"
                  >
                    End Date
                  </label>
                  <input
                    type="date"
                    name="sale_end"
                    value={formFlashValues.sale_end}
                    onChange={handleInputFlashChange}
                    className="block w-full mt-1 border px-3 py-2 rounded"
                    placeholder=""
                    required
                  />
                </div>

                <div className="flex justify-start mt-3">
                  <button
                    onClick={handleFlashSubmit}
                    disabled={flashLoader}
                    className={`disabled:bg-gray-500 flex gap-2 items-center py-2 w-fit px-6 bg-secondary text-white rounded-full hover:bg-secondary/[70%]`}
                  >
                    {flashLoader ? <LoadingSpinner /> : "Add Flash Sales"}
                    {!flashLoader && <FaArrowRight />}
                  </button>
                </div>
              </div>
          </form>
                </div>
               
              </div>
              <div className="bg-white rounded-[14px] pt-3 pb-4 pl-3 pr-5">
                <h4 className="text-[#000000] text-[14px] font-[600] pb-2">
                  Product Sales Summary
                </h4>
                <div className="flex flex-col gap-4">
                <h4 className="text-[12px] font-[400]">Product Sold</h4>
                <h4 className="text-[12px] font-[400]">Available Products</h4>

                </div>
                {/* <div className="">
                  <h4 className="text-[12px] font-[400]">Product Type</h4>
                  <input
                    type="text"
                    name="product_type_id"
                    value={formValues.product_type_id}
                    onChange={handleInputChange}
                    placeholder="Title"
                    className="w-full p-2 mt-2 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="">
                  <h4 className="text-[12px] font-[400]">Vendor</h4>
                  <input
                    type="text"
                    name="vendor"
                    value={formValues.vendor}
                    onChange={handleInputChange}
                    placeholder="Title"
                    className="w-full p-2 mt-2 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="">
                  <h4 className="text-[12px] font-[400]">Collection</h4>
                  <input
                    type="text"
                    name="collection_id"
                    value={formValues.collection_id}
                    onChange={handleInputChange}
                    placeholder="Title"
                    className="w-full p-2 mt-2 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="">
                  <h4 className="text-[12px] font-[400]">Tags</h4>
                  <input
                    type="text"
                    name="tags"
                    value={formValues.tags}
                    onChange={handleInputChange}
                    placeholder="Title"
                    className="w-full p-2 mt-2 border text-[12px] font-[400] text-black border-[#D8D8E2] bg-[#FBFBFF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div> */}
              </div>


              {/* Submit Button */}
              <div className="flex justify-end ">
                <button
                  type="submit"
                  disabled={loader}
                  className={`disabled:bg-gray-500 flex gap-2 items-center py-2 w-fit px-6 bg-secondary text-white rounded-full hover:bg-secondary/[70%]`}
                >
                  {loader ? <LoadingSpinner /> : "Update"}
                  {!loader && <FaArrowRight />}
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
          </form>
          {/* <div className="grid lg:grid-cols-12 gap-3 pb-6">
            <div className="col-span-8 flex flex-col gap-3">
              <TitleProduct />
              <ProductPrice />
              <Variants />
              <ProductInventory />
            </div>
            <div className="col-span-4"></div>
          </div> */}
        </div>
      </DashboardLayout>
    </div>
  );
};

export default ProductDetails;
