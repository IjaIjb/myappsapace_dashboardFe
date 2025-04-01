import React, { useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import useUser from "../../../../../features/hooks/useUser";
import useAuth from "../../../../../features/hooks/useAuth";
import useOrder from "../../../../../features/hooks/useOrder";
import { formatDateTimeRecord, formatTotalAmount } from "../../../../../helpers/helpers";
import Dynamic404 from "../Errors/Dynamic404";
import OrderSuccessSkeleton from "../../skeletons/Dashboard/OrderSuccessSkeleton";

export default function OrderSuccess() {
  const { profile } = useUser();
  const { orderCode } = useParams();
  const { isAuthenticated } = useAuth();
  const { fetchSingleOrder, singleOrder } = useOrder();
  const navigate = useNavigate();

  const [isOrderError, setIsOrderError] = useState(null);

  const [singleOrderLoading, setSingleOrderLoading] = useState(true);

  useEffect(() => {
    if (!orderCode) {
      navigate("/404"); // Redirect to 404 if orderCode is missing
      return;
    }
  
    const fetchSingleOrderData = async () => {
      await fetchSingleOrder(orderCode, {
        onBefore: () => {
          setIsOrderError(null);
        },
        onError: (error) => {
          setIsOrderError(error);
        },
        onFinally: () => setSingleOrderLoading(false)
      });
    };
  
    fetchSingleOrderData();
  }, []); // Add orderCode as a dependency
  
  const isLoggedIn = isAuthenticated;

  // Show loading skeleton while request is pending
  if (singleOrderLoading) return <OrderSuccessSkeleton />;

  // Redirect to 404 page if product is not found
  if (isOrderError) {
    return (
      <Dynamic404 
        name="Order" 
        description="Oops! The Order Reciept you're looking for doesn't exist." 
      />
    );
  }
  

  return (
    <div className="py-10 bg-white px-4 text-gray-800">
      <div className="max-w-3xl mx-auto w-full">
        {/* Main content */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 w-full">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-16 h-16 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="text-xl font-medium mb-1">Payment Success!</h2>
              <p className="text-2xl font-bold text-black">{formatTotalAmount(singleOrder.total, singleOrder.currency)}</p>
            </div>

            {/* Transaction Info */}
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Ref Number</span>
                <span className="font-medium">{singleOrder.transaction.transaction_reference}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Payment Time</span>
                <span className="font-medium">{formatDateTimeRecord(singleOrder.transaction.updated_at)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Payment Method</span>
                <span className="font-medium">{singleOrder.payment_method}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Sender Name</span>
                <span className="font-medium">
                  {isLoggedIn ? profile.first_name + " " + profile.last_name : "Guest"}
                </span>
              </div>
              {isLoggedIn && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Email</span>
                  <span className="font-medium">{profile.email || "Guest"}</span>
                </div>
              )}
            </div>

            <hr className="my-6 border-gray-300" />

            {/* Order Items */}
            <div className="text-sm space-y-3">
              <p className="font-semibold mb-2">Order Items:</p>
              {singleOrder.order_items.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span>{item.product.product_name}</span>
                  <span>{formatTotalAmount(item.total, singleOrder.currency)}</span>
                </div>
              ))}
            </div>

            <hr className="my-6 border-gray-300" />

            {/* Payment Breakdown */}
            <div className="text-sm space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>{formatTotalAmount(singleOrder.subtotal, singleOrder.currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Extra Fee</span>
                <span>{formatTotalAmount(singleOrder.total - singleOrder.subtotal, singleOrder.currency)}</span>
              </div>
              <div className="flex justify-between font-semibold text-black text-base mt-2">
                <span>Total Payment</span>
                <span>{formatTotalAmount(singleOrder.total, singleOrder.currency)}</span>
              </div>
            </div>

            {/* View Order Button (Only for Logged-in Users) */}
            {isLoggedIn && (
              <div className="mt-6 flex justify-center">
                <NavLink
                  to={`/order-history/${singleOrder.order_code}`}
                  className="px-6 py-3 text-white bg-green-600 hover:bg-green-700 rounded-lg text-sm font-semibold"
                >
                  Go to View Order
                </NavLink>
              </div>
            )}
          </div>
      </div>
    </div>
  );
}
