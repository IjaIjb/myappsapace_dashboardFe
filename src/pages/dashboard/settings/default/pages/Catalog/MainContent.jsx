import React from "react";
import { useSearchParams } from "react-router-dom";
import SingleLimitedProduct from "../Products/SingleLimitedProduct";
import NoProductsFound from "./Extral/NoProductsFound";
import Pagination from "../../../../extensions/Pagination";

function MainContent({ allProductsData }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const pagination = {
    currentPage,
    totalPages: allProductsData?.pagination?.total_pages || 1,
    totalItems: allProductsData?.pagination?.total_items || 0,
    perPage: allProductsData?.pagination?.per_page || 10,
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.totalPages) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("page", page);
      setSearchParams(newParams);
    }
  };

  const hasProducts = allProductsData?.products?.length > 0;

  return (
    <div className="w-3/4 p-2 flex flex-col min-h-screen">
      {/* Main Content Wrapper - Takes all available space */}
      <div className="flex-grow">
        {hasProducts ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {allProductsData.products.map((product) => (
              <div key={product.uuid}>
                <SingleLimitedProduct product={product} />
              </div>
            ))}
          </div>
        ) : (
          <NoProductsFound />
        )}
      </div>

      {/* Pagination Stays at Bottom */}
      {hasProducts && (
        <div className="mt-auto pt-6">
          <Pagination pagination={pagination} handlePageChange={handlePageChange} />
        </div>
      )}
    </div>
  );
}

export default MainContent;
