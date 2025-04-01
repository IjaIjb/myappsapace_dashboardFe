import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../components/DashboardLayout";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdInfo } from "react-icons/md";
import VariantTable from "./inner/VariantTable";
import { UserApis } from "../../../apis/userApi/userApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import { FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
// import LoadingSpinnerPage from "../../../components/UI/LoadingSpinnerPage";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { Link } from "react-router-dom";

interface MediaProps {
  id: number;
  file: File | null;
}

const CreateProduct = () => {
  const navigate = useNavigate();
  const selectedStore = useSelector(
    (state: RootState) => state.globalState?.selectedStore || null
  );
  // console.log("Selected Store Code:", selectedStore);
  const sectionName = "payment";
  const [open, setOpen] = useState(false);

  // const [categoryLogo, setCategoryLogo] = useState<File | null>(null);
  const [isActive, setIsActive] = useState<any>(true);
  const [loader, setLoader] = useState(false);

  const [currencies, setCurrencies] = useState<any>([]);
  // const [newCurrency, setNewCurrency] = useState<any>("");
  // const [defaultCurrency, setDefaultCurrency] = useState("");
  //   const [storeSettings, setStoreSettings] = useState<any>([]);

  const onOpenModal = () => {
    // e.preventDefault();
    setOpen(true);
  };
  const onCloseModal = () => setOpen(false);

  useEffect(() => {
    if (!selectedStore || !currencies || currencies.length === 0) {
      onOpenModal();
    } else {
      onCloseModal();
    }
  }, [selectedStore, currencies]);
  // const [stores, setStores] = useState<any>([]);
  const [category, setCategory] = useState<any>([]);
  const [formValues, setFormValues] = useState<any>({
    product_name: "",
    product_description: "",
    store_code: "",
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

  useEffect(() => {
    if (!selectedStore) {
      toast.error("Please select a site");
      return;
    }
    // Reset currencies immediately
    setCurrencies([]);
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
        console.error("Error fetching store settings:", error);
        toast.error("Failed to load store settings.");
      })
      .finally(() => {
        setLoader(false);
      });
  }, [selectedStore, sectionName]);
  
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
  // useEffect(() => {
  //   UserApis.getStore()
  //     .then((response) => {
  //       if (response?.data) {
  //         setStores(response?.data || []); // Adjusting to your API response structure
  //       }
  //     })
  //     .catch((error) => console.error("Error fetching stores:", error));
  // }, []);

  useEffect(() => {
    UserApis.getCategory(selectedStore)
      .then((response) => {
        if (response?.data) {
          setCategory(response?.data || []); // Adjusting to your API response structure
        }
      })
      .catch((error) => console.error("Error fetching sites:", error));
  }, [selectedStore]);
  // console.log(category);
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormValues((prev: any) => ({ ...prev, [name]: value }));
  };

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setCategoryLogo(file);
  //   }
  // };

  const [media, setMedia] = useState<MediaProps[]>(
    Array(8)
      .fill(null)
      .map((_, idx) => ({ id: idx, file: null }))
  );

  //   const handleFileChange = (file: File, id: number) => {
  //     setMedia((prev) =>
  //       prev.map((item) => (item.id === id ? { ...item, file } : item))
  //     );
  //   };
  const handleFileChange = (file: File, id: number) => {
    setFormValues((prev: any) => ({
      ...prev,
      product_images: [...prev.product_images, file], // Append the new file
    }));

    setMedia((prev) =>
      prev.map((item) => (item.id === id ? { ...item, file } : item))
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);

    const formData = new FormData();
    // if (categoryLogo) {
    //   formData.append("category_image", categoryLogo);
    // }
    formData.append("product_name", formValues.product_name);
    formData.append("product_description", formValues.product_description);
    formData.append(
      "product_short_description",
      formValues.product_short_description
    );
    formData.append("tags", formValues.tags);
    formData.append("selling_price", JSON.stringify(formValues.selling_price));
    formData.append("cost_price", JSON.stringify(formValues.cost_price));
    // formData.append("product_type_id", formValues.product_type_id);
    formData.append("category_id", formValues.category_id);
    formData.append("stock_quantity", formValues.stock_quantity);
    formData.append("stock_unit", formValues.stock_unit);
    formData.append("vendor", formValues.vendor);
    formData.append("product_status", isActive ? "active" : "inactive");

    // Ensure the correct product_type_id
    // formData.append(
    //   "product_type_id",
    //   String(Number(formValues.product_type_id) || 2)
    // );

    // Append images correctly
    media.forEach(({ file }, index) => {
      if (file) {
        formData.append(`product_images[${index}]`, file);
      }
    });
    // console.log("Submitting payload:", formValues);
    // console.log("Submitting payload:", formData);

    try {
      // console.log("Submitting payload:", formValues);

      const response: any = await UserApis.createProduct(
        selectedStore,
        formData
      );
      // console.log(response);

      if (response?.data) {
        toast.success(
          response?.data?.message || "Category created successfully!"
        );
        setLoader(false);

        navigate("/dashboard/products");
      } else {
        toast.error(response?.data?.message || "Failed to create category.");
        setLoader(false);
      }
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("An error occurred while creating the category.");
      setLoader(false);
    } finally {
      setLoader(false);
    }
  };
// console.log(currencies)
  return (
    <div>
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
       {!selectedStore ? (
  <div>
  <h4 className="text-[20px] font-[600] mb-4">Don't have a Site?</h4>
<Link to="/dashboard/create-site" className="underline text-blue-800">Create a Site</Link>
</div>
       ) : (
        <div>
        <h4 className="text-[20px] font-[600] mb-4">Don't have a Currency?</h4>
      <Link to="/dashboard/settings/general-information" className="underline text-blue-800">Set Currency</Link>
      </div>
       )}
       
        </div>
      </Modal>
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
                    {media.map(({ id, file }) => (
                      <div
                        key={id}
                        className="relative flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-blue-400"
                      >
                        <input
                          type="file"
                          accept="image/x-png,image/gif,image/jpeg,application/pdf,video/*"
                          name={`product_images_${id}`}
                          // required
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

              {/* <div className="bg-white rounded-[14px] pt-3 pb-4 pl-3 pr-5">
                <h4 className="text-[#000000] text-[14px] font-[600] pb-2">
                  Product Sales Summary
                </h4>

                <div className="">
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
                </div>
              </div> */}

              {/* Submit Button */}
              <div className="flex justify-end ">
                <button
                  type="submit"
                  disabled={loader}
                  className={`disabled:bg-gray-500 flex gap-2 items-center py-2 w-fit px-6 bg-secondary text-white rounded-full hover:bg-secondary/[70%]`}
                >
                  {loader ? <LoadingSpinner /> : "Proceed"}
                  {!loader && <FaArrowRight />}
                </button>
              </div>
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
          </form>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default CreateProduct;
