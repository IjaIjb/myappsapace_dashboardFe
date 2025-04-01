import { useState, useEffect, useRef } from "react";
import { 
  FaSearch, 
  FaUser, 
  FaShoppingCart, 
  FaHeart, 
  FaBell,
  FaChevronDown, 
  FaBars, 
  FaTimes
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from 'react-router-dom';
import useAuth from "../../../../../features/hooks/useAuth";
import useUser from "../../../../../features/hooks/useUser";
import useStore from "../../../../../features/hooks/useStore";
import ApiService from "../../../../../services/ApiService";
import { useLoading } from "../../../../../features/hooks/useLoading";
import { responseCatcher } from "../../../../../services/response";
import useCart from "../../../../../features/hooks/useCart";
import SearchBarDropDown from "../../../../extensions/SearchBarDropDown";
import MobileSearch from "../../../../extensions/MobileSearch";

export default function Header() {
  const [currency, setCurrency] = useState("NGN");
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showCurrencyMenu, setShowCurrencyMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState("home");
  const accountRef = useRef(null);
  const currencyRef = useRef(null);

  const { isAuthenticated, userLogout } = useAuth();
  const { profile } = useUser();
  const { totalQuantity } = useCart();
  const { storeSettings, store } = useStore();
  const { payment } = storeSettings;
  const api = new ApiService();
  const { setLoading } = useLoading();
  const { fetchCart } = useCart();

  const mainNavItems = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Categories", path: "/categories" },
    { name: "Deals", path: "/deals" },
    { name: "About", path: "/about" }
  ];

  const handleLogout = () => userLogout();

  const changeCurrency = async (cur) => {
    setLoading(true);
    setCurrency(cur);
    localStorage.setItem("selectedCurrency", cur);

    try {
      const currencyChanger = await api.postWithAutoToken('/{store_code}/update-currency', {currency: cur});
      console.log(currencyChanger);
      fetchCart();
    } catch (error) {
      responseCatcher(error);
      console.error("Failed to update currency", error);
    } finally {
      setLoading(false);
      setShowCurrencyMenu(false);
    }
  };

  useEffect(() => {
    const storedCurrency = localStorage.getItem("selectedCurrency");
    if (storedCurrency) {
      setCurrency(storedCurrency);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setShowAccountMenu(false);
      }
      if (currencyRef.current && !currencyRef.current.contains(event.target)) {
        setShowCurrencyMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="relative z-50">
      {/* Top Header Bar */}
      <div className="bg-teal-800 text-white py-2 text-xs">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="hidden sm:block">
            <span>Free shipping on orders over $50</span>
          </div>
          
          <div className="flex items-center space-x-4 sm:space-x-6">
            <div className="hidden sm:flex items-center space-x-4 divide-x divide-teal-700">
              <a href="/track-order" className="hover:text-teal-200 transition">Track Order</a>
              <a href="/help" className="pl-4 hover:text-teal-200 transition">Help</a>
            </div>
            
            <div className="relative" ref={currencyRef}>
              <button 
                onClick={() => setShowCurrencyMenu((prev) => !prev)} 
                className="flex items-center hover:text-teal-200 transition"
              >
                {currency} <FaChevronDown className="ml-1 text-xs" />
              </button>
              <AnimatePresence>
                {showCurrencyMenu && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: 5 }} 
                    className="absolute right-0 mt-2 w-24 bg-white text-gray-800 rounded shadow-lg overflow-hidden z-50 text-sm"
                  >
                    {payment?.settings?.currencies.map((cur) => (
                      <div 
                        key={cur} 
                        className={`px-3 py-2 hover:bg-teal-50 cursor-pointer transition ${currency === cur ? "text-teal-700 font-medium" : ""}`} 
                        onClick={() => changeCurrency(cur)}
                      >
                        {cur}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Header */}
      <div className={`transition-all duration-300 ${scrolled ? 'py-3 bg-white shadow-md' : 'py-5 bg-white'}`}>
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center">
          {/* Logo */}
          <div className="flex justify-between w-full md:w-auto items-center">
            <NavLink to="/" className="flex items-center">
              <img 
                src={`${store.store_logo || 'https://myappspace.net/images/logo%20(2).svg'}`} 
                alt="Store Logo" 
                className="h-10 w-auto object-contain" 
              />
            </NavLink>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-teal-800" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between flex-grow ml-10">
            {/* Main Navigation */}
            <nav>
              <ul className="flex space-x-8">
                {mainNavItems.map((item) => (
                  <li key={item.name}>
                    <NavLink 
                      to={item.path}
                      className={({ isActive }) => 
                        `text-sm font-medium transition-colors px-1 py-2 inline-block border-b-2 ${
                          isActive 
                            ? 'text-teal-700 border-teal-700' 
                            : 'text-gray-700 border-transparent hover:text-teal-700 hover:border-teal-700'
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
            
            {/* Search, User Icons */}
            <div className="flex items-center space-x-6">
              <div className="relative w-48">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="w-full py-2 pl-10 pr-4 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-1 focus:ring-teal-700 focus:border-teal-700"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              
              <div className="flex items-center space-x-4">
                <NavLink to="/wishlist" className="text-gray-700 hover:text-teal-700 transition">
                  <FaHeart size={20} />
                </NavLink>
                
                <NavLink to="/notifications" className="text-gray-700 hover:text-teal-700 transition">
                  <FaBell size={20} />
                </NavLink>
                
                <NavLink to="/cart" className="text-gray-700 hover:text-teal-700 transition">
                  <div className="relative">
                    <FaShoppingCart size={20} />
                    {totalQuantity > 0 && (
                      <span className="absolute -top-2 -right-2 bg-teal-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {totalQuantity}
                      </span>
                    )}
                  </div>
                </NavLink>
                
                <div className="relative" ref={accountRef}>
                  <button 
                    onClick={() => setShowAccountMenu(!showAccountMenu)} 
                    className="flex items-center text-gray-700 hover:text-teal-700 transition"
                  >
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-700">
                      {isAuthenticated ? profile.first_name.charAt(0).toUpperCase() : <FaUser size={14} />}
                    </div>
                  </button>
                  <AnimatePresence>
                    {showAccountMenu && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: 10 }} 
                        className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg overflow-hidden z-50"
                      >
                        {isAuthenticated ? (
                          <>
                            <div className="px-4 py-3 bg-gray-50">
                              <p className="text-sm font-medium text-gray-900">Welcome back</p>
                              <p className="text-xs text-gray-500 mt-1">{profile.first_name} {profile.last_name}</p>
                            </div>
                            <div className="py-1">
                              <NavLink to="/dashboard" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700">
                                Dashboard
                              </NavLink>
                              <NavLink to="/profile" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700">
                                Profile Settings
                              </NavLink>
                              <NavLink to="/order-history" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700">
                                Order History
                              </NavLink>
                              <div className="border-t border-gray-100 my-1"></div>
                              <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                              >
                                Sign out
                              </button>
                            </div>
                          </>
                        ) : (
                          <div className="py-1">
                            <NavLink to="/login" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700">
                              Sign in
                            </NavLink>
                            <NavLink to="/register" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700">
                              Create account
                            </NavLink>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t shadow-md overflow-hidden"
          >
            <div className="px-4 py-3">
              <div className="relative mb-4">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="w-full py-2 pl-10 pr-4 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-1 focus:ring-teal-700 focus:border-teal-700"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              
              <nav className="mb-6">
                <ul className="divide-y divide-gray-100">
                  {mainNavItems.map((item) => (
                    <li key={item.name}>
                      <NavLink 
                        to={item.path}
                        className={({ isActive }) => 
                          `block py-3 ${isActive ? 'text-teal-700 font-medium' : 'text-gray-700'}`
                        }
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
              
              <div className="space-y-3">
                <NavLink 
                  to="/wishlist" 
                  className="flex items-center space-x-3 text-gray-700 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaHeart /> <span>Wishlist</span>
                </NavLink>
                
                <NavLink 
                  to="/notifications" 
                  className="flex items-center space-x-3 text-gray-700 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaBell /> <span>Notifications</span>
                </NavLink>
                
                <NavLink 
                  to="/cart" 
                  className="flex items-center space-x-3 text-gray-700 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="relative">
                    <FaShoppingCart />
                    {totalQuantity > 0 && (
                      <span className="absolute -top-2 -right-2 bg-teal-700 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {totalQuantity}
                      </span>
                    )}
                  </div>
                  <span>Cart</span>
                </NavLink>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-700">
                        {profile.first_name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium">{profile.first_name} {profile.last_name}</p>
                        <p className="text-xs text-gray-500">{profile.email}</p>
                      </div>
                    </div>
                    
                    <NavLink 
                      to="/dashboard" 
                      className="block py-2 text-gray-700"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Dashboard
                    </NavLink>
                    
                    <NavLink 
                      to="/profile" 
                      className="block py-2 text-gray-700"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Profile Settings
                    </NavLink>
                    
                    <NavLink 
                      to="/order-history" 
                      className="block py-2 text-gray-700"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Order History
                    </NavLink>
                    
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left py-2 text-red-600"
                    >
                      Sign out
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <NavLink 
                      to="/login" 
                      className="flex-1 px-4 py-2 text-sm text-center bg-teal-700 text-white rounded-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign in
                    </NavLink>
                    
                    <NavLink 
                      to="/register" 
                      className="flex-1 px-4 py-2 text-sm text-center border border-teal-700 text-teal-700 rounded-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Register
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}