import { Suspense, useEffect, useState } from "react";
import React from "react";
import useOrder from "../../../../../features/hooks/useOrder";
import OrderHistorySkeleton from "../../skeletons/Dashboard/OrderHistorySkeleton";
import OrderHistorySectionSkeleton from "../../skeletons/Dashboard/OrderHistorySectionSkeleton";

const RecentOrders = React.lazy(() => import('../Dashboard/RecentOrders'));
const SideBar = React.lazy(() => import('../../layouts/extensions/SideBar'));

export default function DisplayContent() {

    const [ordersLoading, setOrdersLoading] = useState(false);
    const [page, setPage] = useState(1);
    const { fetchOrders, orders } = useOrder();

    const fetchAllMyRecentOrders = async (page) => {
        const orderParams = {
            page: page,
            per_page: 10,
            include_analytics: true,
        }

        await fetchOrders(orderParams, {
            onBefore: () => setOrdersLoading(true),
            onFinally: () => setOrdersLoading(false),
        });
    }

    useEffect(() => {
        fetchAllMyRecentOrders(page);
    }, [page]);

    const handlePageChange = async (page) => {
        setPage(page);
    }

  return (
    <Suspense fallback={<OrderHistorySkeleton />}>
        <div className="flex gap-x-10">
      
            {/* Left Sidebar */}
            <SideBar />

            {/* Right Main Content */}
            <div className="w-[80%] p-2">
                {/* Recent Orders */}

                {
                    ordersLoading ? (
                        <OrderHistorySectionSkeleton />
                    ) : (
                        <RecentOrders ordersLoading={ordersLoading} showPagination={true} showAllButton={false} orders={orders} handlePageChange={handlePageChange}  />
                    )
                }
                
            </div>
        </div>
    </Suspense>
  );
}