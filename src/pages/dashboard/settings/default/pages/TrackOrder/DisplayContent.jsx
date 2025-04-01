import { Suspense } from "react";
import React from "react";
import useCart from "../../../../../features/hooks/useCart";
import CartSkeleton from "../../skeletons/Cart/CartSkeleton";

const AdvancedProductTracking = React.lazy(() => import('./AdvancedProductTracking'));
const NoProductToTrack = React.lazy(() => import('./NoProductToTrack'));
const SideBar = React.lazy(() => import('../../layouts/extensions/SideBar'));

export default function DisplayContent() {
    const { items } = useCart();

  return (
    <Suspense fallback={<CartSkeleton />}>
        <div className="flex gap-x-5">
      
            {/* Left Sidebar */}
            <SideBar />

            {/* Right Main Content */}
            <div className="w-[80%]">
                {/* Cart Section */}
                <AdvancedProductTracking />
                {/* {items.length > 0 ? <CartSection /> : <NoCartSection />} */}
            </div>
        </div>
    </Suspense>
  );
}