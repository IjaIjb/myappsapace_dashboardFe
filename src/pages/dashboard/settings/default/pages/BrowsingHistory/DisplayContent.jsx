import { Suspense } from "react";
import React from "react";
import BrowsingHistorySkeleton from "../../skeletons/Dashboard/BrowsingHistorySkeleton";

const BrowsingHistoryData = React.lazy(() => import('./BrowsingHistoryData'));
const SideBar = React.lazy(() => import('../../layouts/extensions/SideBar'));

export default function DisplayContent() {
  return (
    <Suspense fallback={<BrowsingHistorySkeleton />}>
        <div className="flex gap-x-10">
      
            {/* Left Sidebar */}
            <SideBar />

            {/* Right Main Content */}
            <div className="w-[80%] p-2">
                {/* Recent Orders */}
                <BrowsingHistoryData />
            </div>
        </div>
    </Suspense>
  );
}