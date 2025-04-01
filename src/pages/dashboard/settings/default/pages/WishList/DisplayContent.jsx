import { Suspense, useEffect, useState } from "react";
import React from "react";
import OrderHistorySkeleton from "../../skeletons/Dashboard/OrderHistorySkeleton";

const WishListData = React.lazy(() => import('./WishListData'));
const SideBar = React.lazy(() => import('../../layouts/extensions/SideBar'));

export default function DisplayContent() {
   
  return (
    <Suspense fallback={<OrderHistorySkeleton />}>
        <div className="flex gap-x-10">
      
            {/* Left Sidebar */}
            <SideBar />

            {/* Right Main Content */}
            <div className="w-[80%] p-2">
                {/* Recent Orders */}
                <WishListData />
            </div>
        </div>
    </Suspense>
  );
}