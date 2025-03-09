import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import DashboardLayout from "../../../components/DashboardLayout";
import { UserApis } from "../../../apis/userApi/userApi";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import { FaArrowRight } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AddFlashSales = () => {
  const navigate = useNavigate();
  const selectedStore = useSelector(
    (state: RootState) => state.globalState?.selectedStore || null
  );
  const [product, setProduct] = React.useState<any>([]);
  const [loader, setLoader] = useState(false);

  React.useEffect(() => {
    UserApis.getProduct(selectedStore)
      .then((response) => {
        if (response?.data) {
          console?.log(response?.data);
          setProduct(response?.data);
          // setTotalProducts(response?.data?.products?.length || 0);
          // Calculate total cost price
          // const total = response?.data?.products?.reduce(
          //   (sum: number, prod: any) => sum + (prod.cost_price || 0),
          //   0
          // );
          // setTotalCost(total);
        } else {
          // dispatch(login([]))
        }
      })
      .catch(function (error) {});
  }, [selectedStore]);

  const [formValues, setFormValues] = useState<any>({
    product_id: "",
    sale_type: "flash",
    discount_percentage: 0,
    sale_start: "",
    sale_end: "",
  });
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormValues((prev: any) => ({ ...prev, [name]: value }));
    // console.log(name);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);

    const formData = new FormData();
    // if (categoryLogo) {
    //   formData.append("category_image", categoryLogo);
    // }
    formData.append("product_id", formValues.product_id);
    formData.append("sale_type", formValues.sale_type);
    formData.append("discount_percentage", formValues.discount_percentage);
    formData.append("sale_start", formValues.sale_start);
    formData.append("sale_end", formValues.sale_end);

    // Ensure the correct product_type_id
    // formData.append(
    //   "product_type_id",
    //   String(Number(formValues.product_type_id) || 2)
    // );

    // console.log("Submitting payload:", formValues);
    // console.log("Submitting payload:", formData);

    try {
      // console.log("Submitting payload:", formValues);

      const response: any = await UserApis.addProductToSale(
        selectedStore,
        formValues.product_id,
        formData
      );
      // console.log(response);

      if (response?.data) {
        toast.success(
          response?.data?.message || "product added to sale successfully!"
        );
        setLoader(false);

        navigate("/dashboard/products");
      } else {
        toast.error(
          response?.data?.message || "Failed to add product to sale."
        );
        setLoader(false);
      }
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("An error occurred while creating the product.");
      setLoader(false);
    } finally {
      setLoader(false);
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
                <div className="mt-3">
                  <h4 className="text-[12px] font-[400]">Product</h4>
                  <select
                    name="product_id"
                    value={formValues.product_id}
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
                </div>

                <div className="">
                  <h4 className="text-[12px] font-[400]">Discount (%)</h4>
                  <input
                    type="number"
                    name="discount_percentage"
                    value={formValues.discount_percentage}
                    onChange={handleInputChange}
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
                    value={formValues.sale_start}
                    onChange={handleInputChange}
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
                    value={formValues.sale_end}
                    onChange={handleInputChange}
                    className="block w-full mt-1 border px-3 py-2 rounded"
                    placeholder=""
                    required
                  />
                </div>

                <div className="flex justify-start ">
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
            </div>
          </form>
        </div>
      </DashboardLayout>
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

export default AddFlashSales;
