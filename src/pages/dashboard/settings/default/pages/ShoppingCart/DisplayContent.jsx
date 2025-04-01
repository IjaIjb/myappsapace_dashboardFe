import { Suspense } from "react";
import React from "react";
import useCart from "../../../../../features/hooks/useCart";
import CartSkeleton from "../../skeletons/Cart/CartSkeleton";

const CartSection = React.lazy(() => import('../Cart/CartSection'));
const NoCartSection = React.lazy(() => import('../Cart/NoCartSection'));
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
                {items.length > 0 ? <CartSection /> : <NoCartSection />}
            </div>
        </div>
    </Suspense>
  );
}