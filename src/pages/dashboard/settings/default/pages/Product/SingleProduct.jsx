import React, { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProduct from "../../../../../features/hooks/useProduct";

const SingleProductContent = React.lazy(() => import('./SingleProductContent'));
const Dynamic404 = React.lazy(() => import('../Errors/Dynamic404'));
import SingleProductSkeleton from '../../skeletons/Product/SingleProductSkeleton';

function SingleProduct() {
  const { fetchProduct } = useProduct();
  const { slug } = useParams();

  const [isProductLoading, setIsProductLoading] = useState(true);
  const [isProductError, setIsProductError] = useState(null);

  const fetchSingleProductData = async () => {
    if (!slug) return; // Prevent fetching if slug is undefined

    await fetchProduct(slug, {
      onBefore: () => {
        setIsProductError(null);
        setIsProductLoading(true);
      },
      onSuccess: () => setIsProductError(null),
      onError: (error) => setIsProductError(error),
      onFinally: () => setIsProductLoading(false),
    });

  };

  useEffect(() => {
      fetchSingleProductData();
  }, []);

  // Show loading skeleton while request is pending
  if (isProductLoading) return <SingleProductSkeleton />;

  // Redirect to 404 page if product is not found
  if (isProductError) {
    return (
      <Dynamic404 
        name="Product" 
        description="Oops! The product you're looking for doesn't exist." 
      />
    );
  }

  return (
    <Suspense fallback={<SingleProductSkeleton />}>
      <SingleProductContent />
    </Suspense>
  );
}

export default SingleProduct;
