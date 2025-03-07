import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserApis } from '../../../../apis/userApi/userApi';
import LoadingSpinner from '../../../../components/UI/LoadingSpinner';

const DraftTable = (props: any) => {
     const { product } = props;
      const [categories, setCategories] = useState<{ [key: string]: any }>({});
      const navigate = useNavigate();
      console.log(product)
      const flashSaleProducts = product?.products.filter((product: any) => product.product_status === "Inactive");

            useEffect(() => {
              if (flashSaleProducts) {
                  flashSaleProducts.forEach((prod: any) => {
                  if (
                    prod.store_code &&
                    prod.category_id &&
                    !categories[prod.category_id]
                  ) {
                    UserApis.getSingleCategory(prod.store_code, prod.category_id)
                      .then((response) => {
                        if (response?.data) {
                          console.log(response.data)
                          setCategories((prevCategories: any) => ({
                            ...prevCategories,
                            [prod.category_id]: response.data, // Store category data by ID
                          }));
                        }
                      })
                      .catch((error) => {
                        console.error("Error fetching category:", error);
                      });
                  }
                });
              }
            }, [flashSaleProducts, categories]);
            // console.log(categories)
            const handleRowClick = (productId: any, product: any) => {
              navigate(`/dashboard/product-details/${productId}`,
               {  state: {
                  productId: product.id,
                  storeCode: product.store_code,
              }
              });
            };
          
  return (
    <div>
      <div className="bg-white rounded-[14px] pt-3 pb-4 pl-3 pr-5">
        <div className="bg-[#EFF1F3] flex items-center mb-3 rounded-[8px] gap-3 py-1 w-fit px-5">
          <h5 className="text-[#686868]">Filter by</h5>
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.125 4.95834H3.38583C4.91017 4.95834 5.67233 4.95834 6.29 5.28134C6.5537 5.41968 6.79394 5.59873 7.00188 5.81189C7.48921 6.30984 7.70808 7.04014 8.14583 8.50001C8.58358 9.95989 8.80317 10.6902 9.28979 11.1881C9.49804 11.4013 9.73817 11.5806 10.0024 11.7187C10.6193 12.0417 11.3815 12.0417 12.9065 12.0417H14.875M14.875 12.0417L12.75 9.91668M14.875 12.0417L12.75 14.1667"
              stroke="#686868"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.1258 4.70758L13.0008 2.58258L12.4993 3.08408L14.02 4.60416H12.8888C12.1415 4.60416 11.5572 4.60416 11.0826 4.64596C10.5995 4.68846 10.2035 4.77629 9.83804 4.96754C9.52431 5.13185 9.24015 5.34731 8.99725 5.60504C9.0865 5.78259 9.16654 5.96062 9.23738 6.13912L9.316 6.34525C9.38189 6.24259 9.45782 6.14673 9.54267 6.05908C9.72477 5.87262 9.93513 5.71605 10.166 5.59512C10.4182 5.46337 10.7114 5.38971 11.1449 5.35146C11.5841 5.3125 12.138 5.3125 12.9058 5.3125H14.02L12.4993 6.83258L13.0008 7.33337L15.1258 5.20837L15.3758 4.95833L15.1258 4.70758ZM7.29442 11.3942C7.17269 11.1547 7.06623 10.9077 6.97567 10.6547C6.90977 10.7574 6.83385 10.8533 6.749 10.9409C6.5669 11.1274 6.35654 11.2839 6.12567 11.4049C5.8735 11.5366 5.58025 11.6103 5.14675 11.6485C4.70758 11.6875 4.15438 11.6875 3.38583 11.6875H2.125V12.3958H3.40283C4.15013 12.3958 4.7345 12.3958 5.20908 12.354C5.69217 12.3115 6.08813 12.2237 6.45363 12.0325C6.76736 11.8681 7.05152 11.652 7.29442 11.3942Z"
              fill="#686868"
            />
          </svg>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs pl-6 text-gray-700 rounded-[6px] px-3 bg-[#EFF1F3]">
            <tr className="">
              <th scope="col" className="text-[10px] font-[500] pl-4 py-3">
                #
              </th>
              <th scope="col" className="text-[10px] font-[500] py-3">
                Primary Name
              </th>
              <th scope="col" className="text-[10px] font-[500] py-3">
                Collection
              </th>
              <th scope="col" className="text-[10px] font-[500] py-3">
                Variations
              </th>
              <th scope="col" className="text-[10px] font-[500] py-3">
                In Stock
              </th>
              <th scope="col" className="text-[10px] font-[500] py-3">
                Price
              </th>
              <th scope="col" className="text-[10px] font-[500] py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {flashSaleProducts?.map((product: any) => {
              let prices;
              try {
                prices = JSON.parse(product.selling_price); // Parse the string to an object
              } catch (error) {
                console.error("Error parsing selling_price:", error);
                prices = {}; // Fallback if parsing fails
              }

              return (
                <tr
                  key={product.id}
                  onClick={() => handleRowClick(product.product_name, product)}
                  className="cursor-pointer hover:bg-gray-200"
                >
                  <td className="text-[12px] font-[300] pl-4 py-4">
                    {product.id}
                  </td>
                  <td className="text-[12px] font-[300] py-4">
                    {product.product_name}
                  </td>
                  <td className="text-[12px] font-[300] py-4">
                    {categories[product.category_id]?.category?.category_name ||
                      <LoadingSpinner />}
                  </td>
                  <td className="text-[12px] font-[300] py-4">
                    {product.variations}
                  </td>
                  <td className="text-[12px] font-[300] py-4">
                    {product.stock_unit}
                  </td>
                  <td className="text-[12px] font-[300] py-4">
                    {Object.entries(prices).map(([currency, amount]: any) => (
                      <p key={currency} className="text-[10px] font-[400]">
                        {currency}: {amount}
                      </p>
                    ))}
                  </td>
                  <td className="py-4">
                    <p>
                      <b
                        style={{
                          fontWeight: "500",
                          fontSize: "10px",
                          backgroundColor: "#C9F0D0",
                          color: "#51CF66",
                          borderRadius: "10px",
                          padding: "2px 10px",
                        }}
                      >
                        {product.product_status}
                      </b>
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DraftTable