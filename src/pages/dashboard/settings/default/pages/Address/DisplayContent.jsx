import { Suspense } from "react";
import React from "react";
import AddressesDataSkeleton from "../../skeletons/Dashboard/AddressesDataSkeleton";

const AddressData = React.lazy(() => import('./AddressData'));
const SideBar = React.lazy(() => import('../../layouts/extensions/SideBar'));

export default function DisplayContent() {
   
  return (
    <Suspense fallback={<AddressesDataSkeleton />}>
        <div className="flex gap-x-10">
      
            {/* Left Sidebar */}
            <SideBar />

            {/* Right Main Content */}
            <div className="w-[80%] p-2">
                {/* Recent Orders */}
                <AddressData />
            </div>
        </div>
    </Suspense>
  );
}