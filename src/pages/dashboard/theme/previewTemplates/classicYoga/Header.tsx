import React, { useState } from "react";
import {
  FaSearch,
  FaUser,
  FaShoppingCart,
  FaChevronDown,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from 'react-router-dom';
import { GrShop } from "react-icons/gr";
import { MdOutlineSearch } from "react-icons/md";
import { RiMenu3Fill } from "react-icons/ri";

export default function Header() {
  const [currency, setCurrency] = useState("NGN");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMobileAccountMenu, setShowMobileAccountMenu] = useState(false);
  const [showMobileCurrencyMenu, setShowMobileCurrencyMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showDesktopMenu, setShowDesktopMenu] = useState(false);

  // Placeholder currency data
  const currencies = ["NGN", "USD", "EUR", "GBP"];
  
  // Placeholder cart quantity
  const totalQuantity = 3;

  return (
    <div className="pt-4 px-4 md:px-8 shadow-sm relative">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto text-white">
        {/* Left Search Icon */}
        <MdOutlineSearch className="text-[#333333] w-7 h-7"/>

        {/* Desktop Navigation */}
        <div className="md:flex hidden items-center gap-5 ">
          <NavLink to="/" className="text-[#333333] text-[16px]">Home</NavLink>
          <NavLink to="/shop" className="text-[#333333] text-[16px]">Shop</NavLink>
          <NavLink to="/gallery" className="text-[#333333] text-[16px]">Gallery</NavLink>

          {/* Logo in the middle */}
          <NavLink to='/'>
            <img src="/images/theme/preview/classicLogo.png" alt="logo" className="h-14" />
          </NavLink>
          
          <NavLink to="/about" className="text-[#333333] text-[16px]">About</NavLink>
          <NavLink to="/blog" className="text-[#333333] text-[16px]">Blog</NavLink>
          <NavLink to="/contact" className="text-[#333333] text-[16px]">Contact</NavLink>
        </div>

        {/* Desktop Right Icons */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Shopping Cart */}
          <NavLink to='/cart' >
            <div className="relative cursor-pointer hover:opacity-80 transition">
              <GrShop className="text-xl w-8 h-8 text-[#333333]" />
              <span className="absolute bottom-1 right-2 text-black text-xs rounded-full px-1">{totalQuantity}</span>
            </div>
          </NavLink>

          {/* Desktop Menu Toggle */}
          <div className="relative">
            <RiMenu3Fill 
              className="text-black w-7 h-7 cursor-pointer hover:opacity-80 transition" 
              onClick={() => setShowDesktopMenu(!showDesktopMenu)}
            />
            
            {/* Desktop Menu Dropdown */}
            <AnimatePresence>
              {showDesktopMenu && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -10 }} 
                  className="absolute right-0 mt-2 w-56 bg-white text-black rounded-lg shadow-lg overflow-hidden z-50"
                >
                  {/* Currency Section */}
                  <div className="p-2 border-b border-gray-200">
                    <h3 className="text-sm font-semibold mb-1">Currency</h3>
                    <div className="max-h-32 overflow-y-auto">
                      {currencies.map((cur) => (
                        <div 
                          key={cur} 
                          className={`mb-1 px-2 py-1.5 rounded hover:bg-gray-100 cursor-pointer flex items-center justify-between ${
                            currency === cur ? "bg-blue-50 border-l-2 border-blue-500" : ""
                          }`} 
                          onClick={() => setCurrency(cur)}
                        >
                          <span className={currency === cur ? "font-medium text-blue-700 text-sm" : "text-sm"}>{cur}</span>
                          {currency === cur && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Account Section */}
                  <div className="p-2">
                    <h3 className="text-sm font-semibold mb-1">Account</h3>
                    <div className="space-y-1">
                      <NavLink to="/login">
                        <div className="px-2 py-1.5 bg-blue-500 text-white text-center rounded text-sm hover:bg-blue-600 cursor-pointer transition-colors">
                          Login
                        </div>
                      </NavLink>
                      <NavLink to="/register">
                        <div className="px-2 py-1.5 border border-gray-200 text-center rounded text-sm hover:bg-gray-50 cursor-pointer transition-colors">
                          Register
                        </div>
                      </NavLink>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex space-x-4">
            <NavLink to='/cart'>
              <div className="relative cursor-pointer hover:opacity-80 transition">
                  <FaShoppingCart className="text-xl text-[#333333]" />
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full px-1">{totalQuantity}</span>
              </div>
            </NavLink>
            
            <button onClick={() => setShowMobileSearch(true)} className="text-xl text-[#333333] focus:outline-none">
                <FaSearch />
            </button>

            <button className="text-xl text-[#333333] focus:outline-none" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }} 
            className="bg-white text-black p-4 absolute w-full left-0 top-16 shadow-md z-50 md:hidden rounded-b-lg"
          >
            <div className="flex flex-col space-y-4">
              {/* Mobile Navigation Links */}
              <NavLink to="/" className="py-2 border-b border-gray-100">Home</NavLink>
              <NavLink to="/shop" className="py-2 border-b border-gray-100">Shop</NavLink>
              <NavLink to="/gallery" className="py-2 border-b border-gray-100">Gallery</NavLink>
              <NavLink to="/about" className="py-2 border-b border-gray-100">About</NavLink>
              <NavLink to="/blog" className="py-2 border-b border-gray-100">Blog</NavLink>
              <NavLink to="/contact" className="py-2 border-b border-gray-100">Contact</NavLink>
              
              {/* Account Section */}
              <div 
                className="flex items-center justify-between cursor-pointer py-2 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition" 
                onClick={() => setShowMobileAccountMenu(!showMobileAccountMenu)}
              >
                <div className="flex items-center space-x-2">
                  <FaUser /> <span>Account</span>
                </div>
                <FaChevronDown className={`transition-transform ${showMobileAccountMenu ? "rotate-180" : "rotate-0"}`} />
              </div>
              
              {showMobileAccountMenu && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: "auto" }} 
                  exit={{ opacity: 0, height: 0 }} 
                  className="pl-6 space-y-2 overflow-hidden"
                >
                  <NavLink to="/login">
                    <div className="cursor-pointer py-2 px-4 rounded-lg hover:bg-gray-100 transition">Login</div>
                  </NavLink>
                  <NavLink to="/register">
                    <div className="cursor-pointer py-2 px-4 rounded-lg hover:bg-gray-100 transition">Register</div>
                  </NavLink>
                </motion.div>
              )}

              {/* Currency Section */}
              <div 
                className="flex items-center justify-between cursor-pointer py-2 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition" 
                onClick={() => setShowMobileCurrencyMenu(!showMobileCurrencyMenu)}
              >
                <span>Currency: {currency}</span>
                <FaChevronDown className={`transition-transform ${showMobileCurrencyMenu ? "rotate-180" : "rotate-0"}`} />
              </div>
              
              {showMobileCurrencyMenu && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: "auto" }} 
                  exit={{ opacity: 0, height: 0 }} 
                  className="pl-6 space-y-2 overflow-hidden"
                >
                  {currencies.map((cur) => (
                    <div 
                      key={cur} 
                      onClick={() => setCurrency(cur)} 
                      className="cursor-pointer py-2 px-4 rounded-lg hover:bg-gray-100 transition"
                    >
                      {cur}
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Floating Search */}
      <AnimatePresence>
        {showMobileSearch && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 w-full bg-white p-4 shadow-lg z-50 md:hidden flex items-center rounded-b-2xl"
          >
            <div className="flex w-full items-center bg-gray-100 px-4 py-2 rounded-full shadow-inner">
              <FaSearch className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search products..."
                className="flex-1 outline-none bg-transparent text-gray-700 placeholder-gray-400 text-sm"
              />
              <button
                className="text-gray-500 hover:text-red-500 transition"
                onClick={() => setShowMobileSearch(false)}
              >
                <FaTimes className="text-lg" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}