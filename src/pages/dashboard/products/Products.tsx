import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../components/DashboardLayout";
// import RecentOrders from '../orders/RecentOrders'
import { IoAddCircleOutline } from "react-icons/io5";
import ProductsTable from "./ProductsTable";
import { Link } from "react-router-dom";
import { UserApis } from "../../../apis/userApi/userApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const Products = () => {
  const selectedStore = useSelector(
    (state: RootState) => state.globalState?.selectedStore || null
  );
  console.log("Selected Store Code:", selectedStore);
  const [stores, setStores] = useState<any>([]);
  const [product, setProduct] = React.useState<any>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  // const [formValues, setFormValues] = useState({
  //   category_name: "",
  //   store_code: "", // Use store_code instead of store_name
  //   category_description: "",
  //   status: "active",
  // });
  useEffect(() => {
    UserApis.getStore()
      .then((response) => {
        if (response?.data) {
          setStores(response?.data || []); // Adjusting to your API response structure
        }
      })
      .catch((error) => console.error("Error fetching stores:", error));
  }, []);

  React.useEffect(() => {
    UserApis.getProduct(selectedStore)
      .then((response) => {
        if (response?.data) {
          // console?.log(response?.data);
          setProduct(response?.data);
          setTotalProducts(response?.data?.products?.length || 0);
          // Calculate total cost price
          const total = response?.data?.products?.reduce(
            (sum: number, prod: any) => sum + (prod.cost_price || 0),
            0
          );
          setTotalCost(total);
        } else {
          // dispatch(login([]))
        }
      })
      .catch(function (error) {});
  }, [selectedStore]);

  console.log(product.products);

  //  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  //       const { name, value } = e.target;
  //       setFormValues((prev) => ({ ...prev, [name]: value }));
  //     };

  // console.log(stores);
  return (
    <DashboardLayout>
      <div>
        <div className="lg:flex gap-3 items-end mb-7">
          <div className="grid lg:grid-cols-4 w-full items gap-2">
            <div className="bg-white rounded-[10px] pt-2 pb-1 px-3">
              <div className="flex flex-col gap-1">
                <h5 className="text-[#9D9D9D] text-[12px] font-[600]">
                  Total Products
                </h5>
                <div className="flex justify-between">
                  <h5 className="text-[#9D9D9D] text-[16px] font-[300]">
                    {totalProducts}
                  </h5>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="32"
                      height="32"
                      rx="4"
                      fill="#FF1B1B"
                      fill-opacity="0.1"
                    />
                    <path
                      d="M13 16C13 16.7956 13.3161 17.5587 13.8787 18.1213C14.4413 18.6839 15.2044 19 16 19C16.7956 19 17.5587 18.6839 18.1213 18.1213C18.6839 17.5587 19 16.7956 19 16"
                      stroke="#FF1B1B"
                      stroke-linecap="round"
                    />
                    <path
                      d="M8.5 12.711C8.5 12.11 8.5 11.809 8.586 11.526C8.672 11.243 8.838 10.992 9.172 10.492L9.312 10.282C9.894 9.409 10.184 8.973 10.627 8.737C11.069 8.5 11.593 8.5 12.641 8.5H19.359C20.407 8.5 20.931 8.5 21.373 8.737C21.815 8.973 22.106 9.409 22.687 10.281L22.828 10.492C23.162 10.992 23.328 11.242 23.414 11.526C23.5 11.809 23.5 12.11 23.5 12.711V19.5C23.5 21.386 23.5 22.328 22.914 22.914C22.328 23.5 21.386 23.5 19.5 23.5H12.5C10.614 23.5 9.672 23.5 9.086 22.914C8.5 22.328 8.5 21.386 8.5 19.5V12.711Z"
                      stroke="#FF1B1B"
                    />
                    <path
                      d="M8.5 13.5H23.5"
                      stroke="#FF1B1B"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[10px] pt-2 pb-1 px-3">
              <div className="flex flex-col gap-1">
                <h5 className="text-[#9D9D9D] text-[12px] font-[600]">
                  Product Value
                </h5>
                <div className="flex justify-between">
                  <h5 className="text-[#9D9D9D] text-[16px] font-[300]">
                    ${totalCost}
                  </h5>
                  <img
                    aria-hidden
                    src="/images/products/productvalue.svg"
                    alt="Window icon"
                    //   className='w-[120px] h-[120px] '
                    // width={140}
                    // height={140}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[10px] pt-2 pb-1 px-3">
              <div className="flex flex-col gap-1">
                <h5 className="text-[#9D9D9D] text-[12px] font-[600]">
                  Products Sold
                </h5>
                <div className="flex justify-between">
                  <h5 className="text-[#9D9D9D] text-[16px] font-[300]">234</h5>
                  <img
                    aria-hidden
                    src="/images/products/productsold.svg"
                    alt="Window icon"
                    //   className='w-[120px] h-[120px] '
                    // width={140}
                    // height={140}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[10px] pt-2 pb-1 px-3">
              <div className="flex flex-col gap-1">
                <h5 className="text-[#9D9D9D] text-[12px] font-[600]">
                  Out of Stock
                </h5>
                <div className="flex justify-between">
                  <h5 className="text-[#9D9D9D] text-[16px] font-[300]">67</h5>
                  <img
                    aria-hidden
                    src="/images/products/outofstock.svg"
                    alt="Window icon"
                    //   className='w-[120px] h-[120px] '
                    // width={140}
                    // height={140}
                  />
                </div>
              </div>
            </div>
          </div>
          <Link
            to={"/dashboard/create-product"}
            className="rounded-full h-fit lg:mt-0 mt-4 w-fit flex items-center gap-3 px-4 py-2"
            style={{
              background: "linear-gradient(to bottom, #382B67, #7056CD)",
            }}
          >
            <IoAddCircleOutline className="text-white" />
            <h5 className="text-[#FFFFFF] text-[16px] font-[400] whitespace-nowrap">
              Create Products
            </h5>
            {/* <LiaUploadSolid className="text-white" /> */}
          </Link>
        </div>

        <ProductsTable product={product} />
      </div>
    </DashboardLayout>
  );
};

export default Products;
