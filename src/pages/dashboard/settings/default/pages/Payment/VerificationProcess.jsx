import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useCheckout from "../../../../../features/hooks/useCheckout";
import { FaSpinner } from "react-icons/fa";

export default function VerificationProcess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { verifyPayment } = useCheckout();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const hasVerified = useRef(false); // Prevent duplicate calls

  // Extract query parameters from the URL
  const queryParams = new URLSearchParams(location.search);
  const order_id = queryParams.get("order_id");
  const payment_method = queryParams.get("payment_method");
  const status = queryParams.get("status");
  const tx_ref = queryParams.get("tx_ref");
  const transaction_id = queryParams.get("transaction_id");

  useEffect(() => {
    if (hasVerified.current) return; // Stop duplicate requests
    hasVerified.current = true; // Mark as verified

    // Check if required parameters are missing
    if (!order_id || !payment_method || !status || !tx_ref || !transaction_id) {
      console.error("Missing payment query params", { order_id, payment_method, status, tx_ref, transaction_id });
      navigate("/404");
      return;
    }

    // Perform payment verification
    verifyPayment(
      { order_id, payment_method, status, transaction_ref: tx_ref, transaction_id },
      {
        onBefore: () => setLoading(true),
        onSuccess: (response) => {
          setPaymentData(response.data);
          setError(null);
        },
        onError: (err) => {
          setError(err.message);
          setLoading(false);
        },
        onFinally: () => {
          setLoading(false);
        },
      }
    );
  }, []); // Empty dependency array ensures it runs only once

  // Navigate to success page when payment is confirmed
  useEffect(() => {
    if (paymentData && paymentData.transaction?.payment_status === "completed") {
      navigate(`/checkout/success/${paymentData.order.order_code}`);
    }
  }, [paymentData, navigate]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="relative flex flex-col items-center">
          {/* Beautiful Preloader Animation */}
          <div className="w-24 h-24 border-8 border-green-600 border-t-transparent rounded-full animate-spin"></div>
          <FaSpinner className="absolute top-6 text-green-600 text-5xl animate-spin" />
        </div>
        <h2 className="mt-6 text-2xl font-bold text-green-700">
          Verifying Payment...
        </h2>
        <p className="mt-2 text-gray-600 text-sm font-medium text-center">
          <b>Please do not close or refresh this page</b> to avoid payment issues.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="text-center p-6 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-md w-3/4 md:w-1/2">
          <h2 className="text-xl font-bold">Payment Verification Failed</h2>
          <p className="mt-2 text-sm">
            We encountered an issue while verifying your payment. Please try again later or contact support if the issue persists.
          </p>
          <button 
            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
            onClick={() => navigate("/support")}
          >
            Contact Support
          </button>
        </div>
      </div>
    );
  }
  

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-bold text-green-700">Verifying Payment...</h2>
    </div>
  );
}
