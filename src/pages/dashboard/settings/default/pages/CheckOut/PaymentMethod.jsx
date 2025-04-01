import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

function PaymentMethod({ isAddressSelected, isPaymentSelected, formik, storePaymentGateWays }) {
  
  // Define available payment methods and their icons
  const paymentOptions = {
    flutterwave: { id: "flutterwave", label: "Flutterwave", img: "/images/flutterwave.png" },
    paystack: { id: "paystack", label: "Paystack", img: "/images/paystack.png" },
    stripe: { id: "stripe", label: "Stripe", img: "/images/stripe.png" },
    pay_on_delivery: { id: "cod", label: "Pay on Delivery", img: "/images/cash-on-delivery.png" }
  };

  // Filter payment methods based on store settings
  const availablePaymentMethods = storePaymentGateWays
    .map(method => paymentOptions[method])
    .filter(Boolean); // Remove undefined values if storePaymentGateWays contains an invalid key

  return (
    <div>
      <h2 className='text-lg font-bold flex items-center gap-2'>
        <FaCheckCircle className={`text-${isPaymentSelected ? 'green' : 'gray'}-500`} /> 
        2. Payment Options
      </h2>

      <AnimatePresence>
        {isAddressSelected && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className='overflow-hidden'
          >
            {availablePaymentMethods.length > 0 ? (
              <div className='p-4 border rounded-lg mt-3 grid grid-cols-1 md:grid-cols-3 gap-4'>
                {availablePaymentMethods.map((option) => (
                  <label 
                    key={option.id} 
                    className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer hover:shadow-md transition ${
                      formik.values.payment_method === option.id ? "border-blue-500 shadow-md" : ""
                    }`}
                  >
                    <input 
                      type='radio' 
                      name='payment_method' 
                      value={option.id} 
                      className='hidden' 
                      onChange={() => formik.setFieldValue('payment_method', option.id)}
                      checked={formik.values.payment_method === option.id}
                    />
                    <img src={option.img} alt={option.label} className='w-12 h-12' />
                    <span className='text-sm mt-2'>{option.label}</span>
                  </label>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 mt-3">No available payment methods.</p>
            )}

            {/* Formik Validation Error */}
            {formik.touched.payment_method && formik.errors.payment_method && (
              <div className="text-red-500 text-xs mt-2">{formik.errors.payment_method}</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default PaymentMethod;
