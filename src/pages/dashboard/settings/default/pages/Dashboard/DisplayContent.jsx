
import useUser from "../../../../../features/hooks/useUser";
import { Suspense, useEffect, useState } from "react";
import DashboardSkeleton from "../../skeletons/Dashboard/DashboardSkeleton";
import React from "react";
import useOrder from "../../../../../features/hooks/useOrder";

const ProfileAddressBlock = React.lazy(() => import('./ProfileAddressBlock'));
const RecentOrders = React.lazy(() => import('./RecentOrders'));
const BrowsingHistory = React.lazy(() => import('./BrowsingHistory'));
const SideBar = React.lazy(() => import('../../layouts/extensions/SideBar'));

export default function DisplayContent() {
    const { profile } = useUser();

    const [ordersLoading, setOrdersLoading] = useState(false);
    const { fetchOrders, orders, analytics } = useOrder();

    const fetchAllMyRecentOrders = async () => {
        const orderParams = {
          page: 1,
          per_page: 10,
          include_analytics: true,
        }
        await fetchOrders(orderParams, {
            onBefore: () => setOrdersLoading(true),
            onFinally: () => setOrdersLoading(false),
        });
    }

    useEffect(() => {
        fetchAllMyRecentOrders();
    }, []);

  return (
    <Suspense fallback={<DashboardSkeleton />}>
        <div className="flex gap-x-10">
      
            {/* Left Sidebar */}
            <SideBar />

            {/* Right Main Content */}
            <div className="w-[80%] p-2">
                <h2 className="text-xl font-lato font-semibold mb-4">Hello {profile.first_name},</h2>

                {/* First Section: Profile block, address block and Order Block */}
                <ProfileAddressBlock ordersLoading={ordersLoading} orderAnalytics={analytics} />

                {/* Recent Orders */}
                <RecentOrders ordersLoading={ordersLoading} showAllButton={true} orders={orders}  />
                
                {/* Browsing History */}
                <BrowsingHistory />

            </div>
        </div>
    </Suspense>
  );
}