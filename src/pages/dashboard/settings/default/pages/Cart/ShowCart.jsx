import React, { Suspense } from "react";
import useCart from "../../../../../features/hooks/useCart";

const CartSection = React.lazy(() => import('./CartSection'));
const NoCartSection = React.lazy(() => import('./NoCartSection'));
const CartSkeleton = React.lazy(() => import('../../skeletons/Cart/CartSkeleton'));

function ShowCart() {
    const { items, cartLoading } = useCart();
    
  return (
    <Suspense fallback={<CartSkeleton />}>
        <div className='w-full'>
            {/* Show carts */}
            {items.length > 0 ? <CartSection /> : <NoCartSection />}
        </div>
    </Suspense>
  )
}

export default ShowCart