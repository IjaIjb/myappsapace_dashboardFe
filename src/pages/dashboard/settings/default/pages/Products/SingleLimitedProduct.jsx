import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaRegHeart, FaShoppingCart, FaMinus, FaPlus, FaEye } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import StarRating from '../../extensions/StarRating';
import SalesIndicator from '../../extensions/SalesIndicator';
import { formatDiscount, getProductPrice } from '../../../../../helpers/helpers';
import useCart from '../../../../../features/hooks/useCart';
import useWishlist from '../../../../../features/hooks/useWishlist';

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { currency, sellingPrice, discountedPrice } = getProductPrice(product);
  const { items, addProductToCart, reduceProductQuantity, removeProductFromCart } = useCart();
  const { wishlists, addProductToWishlist, removeProductFromWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);

  // Find the product in the cart and wishlist
  const cartItem = items.find((item) => item.uuid === product.uuid);
  const wishlistItem = wishlists.find((item) => item.product.uuid === product.uuid);

  const toggleWishlist = async (e) => {
    e.stopPropagation();
    if (wishlistItem) {
      await removeProductFromWishlist(product.uuid);
    } else {
      await addProductToWishlist(product.uuid);
    }
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    navigate(`/${product.slug}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addProductToCart(product.uuid, 1);
  };

  const handleReduceQuantity = (e) => {
    e.stopPropagation();
    if (cartItem.quantity > 1) {
      reduceProductQuantity(cartItem.uuid);
    } else {
      removeProductFromCart(cartItem.uuid);
    }
  };

  const handleIncreaseQuantity = (e) => {
    e.stopPropagation();
    addProductToCart(cartItem.uuid, 1);
  };

  return (
    <motion.div 
      className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/${product.slug}`)}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Product Image Section */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {/* Sale Tags */}
        <div className="absolute top-0 left-0 z-10 flex flex-col gap-2 p-2">
          {product.sale_type && product.sale_type !== "none" && product.sale_type !== "discount" && (
            <span className="bg-teal-600 text-white text-xs font-medium px-2 py-1 rounded-md">
              {product.sale_type}
            </span>
          )}
          
          {product.is_discounted && (
            <span className="bg-rose-500 text-white text-xs font-medium px-2 py-1 rounded-md">
              {formatDiscount(product.discount_percentage)}
            </span>
          )}
        </div>
        
        {/* Wishlist Button */}
        <button
          onClick={toggleWishlist}
          className="absolute top-2 right-2 z-10 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md transition-all duration-300 hover:bg-gray-100"
          aria-label={wishlistItem ? "Remove from wishlist" : "Add to wishlist"}
        >
          {wishlistItem ? (
            <FaHeart className="text-rose-500" />
          ) : (
            <FaRegHeart className="text-gray-500" />
          )}
        </button>
        
        {/* Product Image */}
        <img
          src={product.product_images[0] || 'https://dummyimage.com/200x150/ddd/555&text=No+Image'}
          alt={product.product_name}
          className="w-full h-full object-cover transition-all duration-500"
        />
        
        {/* Quick View Overlay on Hover */}
        <motion.div 
          className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 transition-opacity"
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          <button
            onClick={handleQuickView}
            className="bg-white text-gray-800 rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Quick view"
          >
            <FaEye />
          </button>
        </motion.div>
      </div>
      
      {/* Product Info Section */}
      <div className="p-3 flex flex-col gap-2">
        {/* Product Name and Rating */}
        <div>
          <h3 className="text-sm font-medium text-gray-800 line-clamp-1 hover:text-teal-600 transition-colors">
            {product.product_name}
          </h3>
          <div className="flex items-center mt-1">
            <StarRating rating={4.5} />
            <span className="text-xs text-gray-500 ml-2">({product.review_count || 0})</span>
          </div>
        </div>
        
        {/* Product Code */}
        <p className="text-xs text-gray-500">
          Code: {product.product_code}
        </p>
        
        {/* Pricing Section */}
        <div className="flex items-baseline mt-1">
          <span className="text-sm font-semibold text-gray-900">
            {discountedPrice}
          </span>
          
          {product.is_discounted && (
            <span className="ml-2 text-xs text-gray-400 line-through">
              {sellingPrice}
            </span>
          )}
        </div>
        
        {/* Stock Indicator (if limited) */}
        {product.stock_status === "Limited Stock" && (
          <div className="mt-2">
            <SalesIndicator progress={product.stock_progress} />
            <span className="text-xs text-gray-500 block mt-1">
              Sold: {product.total_sold}/{product.stock_quantity}
            </span>
          </div>
        )}
        
        {/* Add to Cart Section */}
        <div className="mt-3">
          {cartItem ? (
            <div className="flex items-center justify-between border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={handleReduceQuantity}
                className="w-10 h-10 flex items-center justify-center bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <FaMinus size={12} />
              </button>
              
              <span className="text-sm font-medium">
                {cartItem.quantity}
              </span>
              
              <button
                onClick={handleIncreaseQuantity}
                className="w-10 h-10 flex items-center justify-center bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <FaPlus size={12} />
              </button>
            </div>
          ) : (
            <button 
              onClick={handleAddToCart}
              className="w-full h-10 bg-teal-50 text-teal-700 hover:bg-teal-100 font-medium text-sm flex items-center justify-center rounded-lg transition-colors"
            >
              <FaShoppingCart className="mr-2" />
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;