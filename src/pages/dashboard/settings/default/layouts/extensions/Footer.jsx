import { useState } from "react";
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn, 
  FaYoutube,
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaClock, 
  FaChevronUp,
  FaChevronRight,
  FaArrowRight,
  FaPaperPlane
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from 'react-router-dom';
import useStore from "../../../../../features/hooks/useStore";

function Footer() {
  const { store } = useStore();
  const [expandedSection, setExpandedSection] = useState(null);
  const [email, setEmail] = useState("");

  // Footer navigation structure
  const footerNav = [
    {
      title: "Shop",
      links: [
        { name: "New Arrivals", url: "/shop/new-arrivals" },
        { name: "Best Sellers", url: "/shop/best-sellers" },
        { name: "Special Offers", url: "/shop/special-offers" },
        { name: "Clearance", url: "/shop/clearance" }
      ]
    },
    {
      title: "My Account",
      links: [
        { name: "Dashboard", url: "/dashboard" },
        { name: "My Orders", url: "/order-history" },
        { name: "Wishlist", url: "/wishlist" },
        { name: "Profile Settings", url: "/profile" }
      ]
    },
    {
      title: "About Us",
      links: [
        { name: "Our Story", url: "/about" },
        { name: "Careers", url: "/careers" },
        { name: "Press", url: "/press" },
        { name: "Blog", url: "/blog" }
      ]
    }
  ];

  // Toggle section for mobile accordion
  const toggleSection = (index) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  // Handle newsletter subscription
  const handleSubscribe = (e) => {
    e.preventDefault();
    // Subscription logic would go here
    console.log(`Subscribing email: ${email}`);
    setEmail("");
    // Show success message or handle accordingly
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50">
      {/* Newsletter Section */}
      <div className="bg-teal-700 py-16">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-medium text-white mb-2">Stay updated with latest offers</h3>
              <p className="text-teal-100">Subscribe to our newsletter and get 10% off your first purchase</p>
            </div>
            
            <div className="md:w-1/2">
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <div className="flex-grow relative">
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg text-sm focus:outline-none"
                    required
                  />
                  <FaEnvelope className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <button 
                  type="submit" 
                  className="bg-white text-teal-700 font-medium py-3 px-6 rounded-lg hover:bg-teal-50 transition duration-300 flex items-center justify-center"
                >
                  Subscribe <FaPaperPlane className="ml-2" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Footer Content */}
      <div className="py-16">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Column */}
            <div>
              <div className="mb-6">
                <img 
                  src={`${store.store_logo || 'https://myappspace.net/images/logo%20(2).svg'}`} 
                  alt="Store Logo" 
                  className="h-10 w-auto object-contain mb-4" 
                />
                <p className="text-gray-600 text-sm leading-relaxed">
                  {store.store_name} offers a wide selection of products with fast delivery and excellent customer service.
                </p>
              </div>
              
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-3">
                  <FaMapMarkerAlt className="text-teal-700 text-base mt-0.5 flex-shrink-0" />
                  <span>{store.store_location}</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <FaPhoneAlt className="text-teal-700 flex-shrink-0" />
                  <span>{store.store_contact}</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <FaEnvelope className="text-teal-700 flex-shrink-0" />
                  <span>support@{store.store_name.toLowerCase().replace(/\s+/g, '')}.com</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <FaClock className="text-teal-700 flex-shrink-0" />
                  <span>10:00 AM - 6:00 PM, Mon - Sat</span>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <a href="#" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-teal-700 hover:bg-teal-700 hover:text-white transition duration-300">
                  <FaFacebookF size={14} />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-teal-700 hover:bg-teal-700 hover:text-white transition duration-300">
                  <FaTwitter size={14} />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-teal-700 hover:bg-teal-700 hover:text-white transition duration-300">
                  <FaInstagram size={14} />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-teal-700 hover:bg-teal-700 hover:text-white transition duration-300">
                  <FaYoutube size={14} />
                </a>
              </div>
            </div>
            
            {/* Navigation Columns - Desktop */}
            <div className="hidden md:col-span-2 lg:col-span-3 md:grid md:grid-cols-3 gap-8">
              {footerNav.map((section, index) => (
                <div key={index}>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.links.map((link, i) => (
                      <li key={i}>
                        <NavLink 
                          to={link.url} 
                          className="text-gray-600 hover:text-teal-700 hover:underline transition duration-300 flex items-center text-sm"
                        >
                          <FaChevronRight className="text-teal-700 text-xs mr-2" /> {link.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            {/* Navigation Accordion - Mobile only */}
            <div className="md:hidden col-span-1">
              {footerNav.map((section, index) => (
                <div key={index} className="border-b border-gray-200 py-3">
                  <div 
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleSection(index)}
                  >
                    <h3 className="text-gray-900 font-medium">{section.title}</h3>
                    <FaChevronUp className={`transition-transform duration-300 text-gray-500 ${expandedSection === index ? 'rotate-0' : 'rotate-180'}`} />
                  </div>
                  
                  <AnimatePresence>
                    {expandedSection === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden pt-2"
                      >
                        <ul className="space-y-2 py-2">
                          {section.links.map((link, i) => (
                            <li key={i}>
                              <NavLink 
                                to={link.url} 
                                className="text-gray-600 hover:text-teal-700 transition duration-300 flex items-center text-sm"
                              >
                                <FaChevronRight className="text-teal-700 text-xs mr-2" /> {link.name}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
          
          {/* App Download Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Get our mobile app</h3>
                <p className="text-gray-600 text-sm mb-4">Shop on the go with our mobile app</p>
                <div className="flex space-x-3">
                  <a href="#" className="transition hover:opacity-80">
                    <img src="https://demo.themeies.com/ecom/assets/images/app-store.png" alt="App Store" className="h-10" />
                  </a>
                  <a href="#" className="transition hover:opacity-80">
                    <img src="https://demo.themeies.com/ecom/assets/images/play-store.png" alt="Play Store" className="h-10" />
                  </a>
                </div>
              </div>
              
              {/* Payment Methods */}
              <div className="flex flex-col items-center md:items-end">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Secure Payments</h3>
                <p className="text-gray-600 text-sm mb-4">We support all major payment methods</p>
                <div className="flex space-x-2">
                  <img src="https://cdn.shopify.com/s/files/1/0532/6186/6303/files/payment-method.png?v=1656670252" alt="Payment Methods" className="h-8" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Back to top button */}
          <div className="text-center mt-10">
            <button 
              onClick={scrollToTop}
              className="inline-flex items-center justify-center bg-teal-700 text-white w-10 h-10 rounded-full shadow-lg hover:bg-teal-800 transition duration-300"
            >
              <FaChevronUp />
            </button>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="bg-teal-800 py-4 text-sm">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center text-teal-100">
          <div className="mb-3 md:mb-0">
            <p>© {currentYear} {store.store_name}. All rights reserved.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/privacy-policy" className="hover:text-white transition">Privacy Policy</a>
            <a href="/terms-of-service" className="hover:text-white transition">Terms of Service</a>
            <a href="/refund-policy" className="hover:text-white transition">Refund Policy</a>
            <a href="/shipping-policy" className="hover:text-white transition">Shipping Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;