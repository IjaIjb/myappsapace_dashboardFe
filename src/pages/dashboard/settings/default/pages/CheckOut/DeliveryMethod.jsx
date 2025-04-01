import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

function DeliveryMethod({ isPaymentSelected, isDeliverySelected, formik, storeDeliveryMethods }) {
  
  // Define available delivery methods and their icons
  const deliveryOptions = {
    standard: { id: "standard", label: "Standard Delivery", img: "/images/standard-delivery.png" },
    express: { id: "express", label: "Express Delivery", img: "/images/express-delivery.png" },
    pickup: { id: "pickup", label: "Store Pickup", img: "/images/store-pickup.png" }
  };

  // Filter delivery methods based on store settings
  const availableDeliveryMethods = storeDeliveryMethods
    .map(method => deliveryOptions[method])
    .filter(Boolean); // Remove undefined values if storeDeliveryMethods contains an invalid key

  return (
    <div>
      <h2 className='text-lg font-bold flex items-center gap-2'>
        <FaCheckCircle className={`text-${isDeliverySelected ? 'green' : 'gray'}-500`} /> 
        3. Choose Delivery Method
      </h2>

      <AnimatePresence>
        {isPaymentSelected && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className='overflow-hidden'
          >
            {availableDeliveryMethods.length > 0 ? (
              <div className='p-4 border rounded-lg mt-3 grid grid-cols-1 md:grid-cols-3 gap-4'>
                {availableDeliveryMethods.map((option) => (
                  <label 
                    key={option.id} 
                    className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer hover:shadow-md transition ${
                      formik.values.delivery_method === option.id ? "border-blue-500 shadow-md" : ""
                    }`}
                  >
                    <input 
                      type='radio' 
                      name='delivery_method' 
                      value={option.id} 
                      className='hidden' 
                      onChange={() => formik.setFieldValue('delivery_method', option.id)}
                      checked={formik.values.delivery_method === option.id}
                    />
                    <img src={option.img} alt={option.label} className='w-12 h-12' />
                    <span className='text-sm mt-2'>{option.label}</span>
                  </label>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 mt-3">No available delivery methods.</p>
            )}

            {/* Formik Validation Error */}
            {formik.touched.delivery_method && formik.errors.delivery_method && (
              <div className="text-red-500 text-xs mt-2">{formik.errors.delivery_method}</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default DeliveryMethod;
