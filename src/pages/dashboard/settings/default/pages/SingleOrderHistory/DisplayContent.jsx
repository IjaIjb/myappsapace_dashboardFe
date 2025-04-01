import { Suspense, useEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import useOrder from "../../../../../features/hooks/useOrder";
import SingleOrderHistory from "../../skeletons/Dashboard/SingleOrderHistorySkeleton";

const SideBar = React.lazy(() => import('../../layouts/extensions/SideBar'));
const SingleOrder = React.lazy(() => import('./SingleOrder'));
const Dynamic404 = React.lazy(() => import('../Errors/Dynamic404'));

export default function DisplayContent() {
  const { orderCode } = useParams();
  const [singleOrderLoading, setSingleOrderLoading] = useState(false);
  const [isOrderError, setIsOrderError] = useState(null);
  
  const { fetchSingleOrder } = useOrder();

  const handleFetchSingleOrder = async () => {
    if (!orderCode) return; // Prevent fetching when orderCode is null or empty
    await fetchSingleOrder(orderCode, {
      onBefore: () => setSingleOrderLoading(true),
      onError: (error) => setIsOrderError(error),
      onFinally: () => setSingleOrderLoading(false),
    });
  };
 
  useEffect(() => {
    handleFetchSingleOrder();
  }, [orderCode]);

  // Show loading skeleton while request is pending
  if (singleOrderLoading) return <SingleOrderHistory />;

  if (isOrderError) {
    return (
      <Dynamic404
        name="Order" 
        description="Oops! The order you're looking for doesn't exist." 
      />
    );
  }

  return (
    <Suspense fallback={<SingleOrderHistory />}>
      <div className="flex gap-x-10">
       
        {/* Left Sidebar */}
        <SideBar />

        {/* Right Main Content */}
        <div className="w-[80%] p-2">
          {/* Single Orders */}
          <SingleOrder />
        </div>
      </div>
    </Suspense>
  );
}
