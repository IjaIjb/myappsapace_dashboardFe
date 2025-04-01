import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaCheck, FaExclamationCircle } from 'react-icons/fa';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscriptionState, setSubscriptionState] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setSubscriptionState('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }
    
    setSubscriptionState('loading');
    
    // Simulate API call
    try {
      // Replace with your actual newsletter API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubscriptionState('success');
      setEmail('');
      
      // Reset to idle state after showing success message
      setTimeout(() => {
        setSubscriptionState('idle');
      }, 5000);
    } catch (error) {
      setSubscriptionState('error');
      setErrorMessage('Failed to subscribe. Please try again later.');
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-teal-700 to-teal-600">
      <div className="max-w-screen-xl mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-teal-100">
              Get the latest updates on new products, special promotions, and exclusive deals.
            </p>
          </motion.div>
          
          <motion.form 
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-3 md:gap-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative flex-grow">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3.5 rounded-lg md:rounded-r-none text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-300"
                disabled={subscriptionState === 'loading' || subscriptionState === 'success'}
              />
              
              {subscriptionState === 'error' && (
                <div className="absolute -bottom-8 left-0 text-red-200 text-sm flex items-center">
                  <FaExclamationCircle className="mr-1" />
                  {errorMessage}
                </div>
              )}
            </div>
            
            <button
              type="submit"
              className={`
                relative overflow-hidden px-6 py-3.5 text-white font-medium rounded-lg md:rounded-l-none
                ${subscriptionState === 'loading' ? 'bg-teal-800' : 
                  subscriptionState === 'success' ? 'bg-green-600' : 'bg-teal-800 hover:bg-teal-900'} 
                transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500
                ${subscriptionState === 'loading' || subscriptionState === 'success' ? 'cursor-default' : 'cursor-pointer'}
              `}
              disabled={subscriptionState === 'loading' || subscriptionState === 'success'}
            >
              {subscriptionState === 'idle' && (
                <>
                  Subscribe <FaPaperPlane className="inline-block ml-2" />
                </>
              )}
              
              {subscriptionState === 'loading' && (
                <>
                  <span className="inline-block">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Subscribing...
                  </span>
                </>
              )}
              
              {subscriptionState === 'success' && (
                <>
                  <FaCheck className="inline-block mr-2" /> 
                  Subscribed!
                </>
              )}
            </button>
          </motion.form>
          
          <motion.p 
            className="text-center text-teal-200 text-sm mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            We respect your privacy. Unsubscribe at any time.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;