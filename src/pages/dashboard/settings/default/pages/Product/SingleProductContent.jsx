import React, { useEffect, useState } from "react";
import {
    FaRegHeart,
    FaShieldAlt,
    FaTruck,
    FaStore,
    FaBoxOpen,
    FaPlus,
    FaStar,
    FaStarHalfAlt,
    FaChevronLeft,
    FaChevronRight,
    FaRedo,
    FaHeart
  } from "react-icons/fa";

import { NavLink } from "react-router-dom";
import useProduct from "../../../../../features/hooks/useProduct";
import useCart from "../../../../../features/hooks/useCart";
import { getProductPrice, formatProductPrice, formatDiscount } from "../../../../../helpers/helpers";
import useWishlist from "../../../../../features/hooks/useWishlist";


const Reviews = React.lazy(() => import('./Reviews'));
const AtGlance = React.lazy(() => import('./AtGlance'));
const ProductDescription = React.lazy(() => import('./ProductDescription'));
  


function SingleProductContent() {

  const { productLoading, product, reviews, pagination, fetchMoreReviews  } = useProduct();

  const { items, addProductToCart, reduceProductQuantity, removeProductFromCart } = useCart();

  const { wishlists, addProductToWishlist, removeProductFromWishlist } = useWishlist();

   // State for selected image
   const [selectedImage, setSelectedImage] = useState(null);

   const { sellingPrice, discountedPrice} = getProductPrice(product);
  
   // Dynamic state for variants
   const [selectedVariants, setSelectedVariants] = useState({});

   // Find the product in the cart and wishlist
  const cartItem = items.find((item) => item.uuid === product.uuid);
  const wishlistItem = wishlists.find((item) => item.product.uuid === product.uuid);

  const toggleWishlist = async (productId) => {
    if (wishlistItem) {
      await removeProductFromWishlist(productId);
    } else {
      await addProductToWishlist(productId);
    }
  };
 
  // Default fallback image
  const fallbackImage = "https://dummyimage.com/200x150/ddd/555&text=No+Image";

    // Initialize state when product loads
    useEffect(() => {
      if (product) {

        // Create a safe product image array (do not mutate original product)
        const productImages = product?.product_images?.length > 0 ? product.product_images : [fallbackImage];

        setSelectedImage(productImages[0]);

        // Dynamically set default values for each variant type
        const initialVariantState = {};
        product.variants.forEach(({ variant_name, variant_value }) => {
          if (!initialVariantState[variant_name]) {
            initialVariantState[variant_name] = variant_value; // First available option
          }
        });
        setSelectedVariants(initialVariantState);
      }
    }, [product]);
 
    // Handle variant selection dynamically
    const handleVariantChange = (variantType, value) => {
      setSelectedVariants((prev) => ({
        ...prev,
        [variantType]: value,
      }));
    };
 
    // Get available variant values for a specific variant type
    const getVariantValues = (variantType) => {
      return [...new Set(product.variants
        .filter((variant) => variant.variant_name === variantType)
        .map((variant) => variant.variant_value)
      )];
    };
 
    // Find the currently selected variant object
    const selectedVariant = product.variants.find((variant) =>
      Object.entries(selectedVariants).every(
        ([key, value]) => variant.variant_name === key && variant.variant_value === value
      )
    ) || product.variants[0]; // Fallback to first variant


    useEffect(() => {
      const imageSection = document.getElementById("image-section");
      const titleSection = document.getElementById("title-section");
      const rightSection = document.getElementById("right-section");
  
      const moveTitle = () => {
        if (window.innerWidth < 768) { // Only move title on screens smaller than 768px
          if (imageSection && titleSection && !imageSection.nextElementSibling?.isSameNode(titleSection)) {
            imageSection.insertAdjacentElement("afterend", titleSection);
          }
        } else {
          if (rightSection && titleSection && !rightSection.contains(titleSection)) {
            rightSection.prepend(titleSection);
          }
        }
      };
  
      moveTitle(); // Run on page load
      window.addEventListener("resize", moveTitle); // Run on resize
  
      return () => window.removeEventListener("resize", moveTitle); // Cleanup
    }, []);


    const handleNextImage = () => {
      const productImages = product?.product_images?.length > 0 ? product.product_images : [fallbackImage];
      const currentIndex = productImages.indexOf(selectedImage);
      const nextIndex = (currentIndex + 1) % productImages.length;
      setSelectedImage(productImages[nextIndex]);
    };
    
    const handlePrevImage = () => {
      const productImages = product?.product_images?.length > 0 ? product.product_images : [fallbackImage];
      const currentIndex = productImages.indexOf(selectedImage);
      const prevIndex = (currentIndex - 1 + productImages.length) % productImages.length;
      setSelectedImage(productImages[prevIndex]);
    };

  return (
    <div className="max-w-screen-xl mx-auto px-4">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-10">
        
        {/* Left Section - Image & Other Details */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex flex-col">
          {/* Image Section */}
          <div id="image-section" className="flex w-full gap-2 lg:flex-row flex-col-reverse py-5">
            {/* Thumbnails */}
            <div className="flex lg:flex-col gap-2 mr-4">
              {product.product_images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="Thumbnail"
                  className={`w-24 h-20 rounded-lg cursor-pointer border ${
                    selectedImage === img ? "border-blue-500" : "border-gray-300"
                  }`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>

            {/* Main Image with Navigation */}
            <div className="relative w-full">
                
              <img
                src={selectedImage}
                alt="Product"
                className="w-full rounded-lg border"
              />

              <button
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full"
                onClick={handlePrevImage}
              >
                <FaChevronLeft />
              </button>

              <button
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full"
                onClick={handleNextImage}
              >
                <FaChevronRight />
              </button>

              {/* Wishlist icons */}
              <div className="whishlist">
                <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent parent click event
                      toggleWishlist(product.uuid); // Handle wishlist toggle
                    }}
                    className="circleHear absolute top-2 right-2 h-8 w-8 flex justify-center items-center rounded-full shadow-md bg-white"
                  >
                    {wishlistItem ? (
                      <FaHeart size={15} className="w-4 h-4 text-red-500" />
                    ) : (
                      <FaRegHeart size={15} className="w-4 h-4 text-gray-500 hover:text-red-500 transition" />
                    )}
                  </button>
              </div>
 
            </div>
          </div>

          {/* Other Details */}
          <div id="other-details" className="order-2">

            {/* Additional Features */}
            {product.product_specification && Object.keys(product.product_specification).length > 0 && (
              <AtGlance product={product} />
            )}

            {/* Description */}
            <ProductDescription />

            {/* Reviews */}
            <Reviews />

            {/* Dynamic Products (Similar Products) */}
            

          </div>    
        </div>

        {/* Right Section */}
        <div id="right-section" className="col-span-1 sm:col-span-2 lg:col-span-2 flex flex-col">
            
            {/* Title Section (Single Title, Dynamically Moved) */}
            <div id="title-section">
                {/* top right section */}
                <div className="topSection w-full border p-5 order-1 sm:order-first rounded-lg shadow-sm bg-white">
                    {/* Labels */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-blue-200 text-blue-700 text-xs font-bold px-2 py-1 rounded">Best Seller</span>
                      <span className="bg-gray-200 text-gray-700 text-xs font-bold px-2 py-1 rounded">Popular Pick</span>
                    </div>

                    <div className="titles flex flex-col space-y-2">
                      {/* Product Title */}
                      <h2 className="text-2xl font-lato font-bold">{product.product_name}</h2>
                      <p className="text-gray-600 font-outfit text-sm">Product Code: {product.product_code}</p>
                    </div>
                    

                    {/* Ratings */}
                    <div className="flex items-center text-sm gap-1 text-yellow-500 mt-1">
                    {[...Array(5)].map((_, i) =>
                        i < Math.floor(product.rating) ? <FaStar size={11} key={i} /> : <FaStarHalfAlt size={11} key={i} />
                    )}

                    <span className="text-gray-500 text-xs">({reviews.length} reviews)</span>
                    </div>

                    {/* Pricing */}
                    <div className="mt-3">
                      {discountedPrice ? (
                        <div className="flex items-center gap-3">
                          {/* Discounted Price */}
                          <p className="text-2xl font-bold text-red-600">{discountedPrice}</p>
                          {/* Original Price (strikethrough) */}
                          
                          {product.is_discounted  && (
                            <>
                              <p className="text-sm text-gray-500 line-through">{sellingPrice}</p>
                              <span className="text-xs font-medium bg-red-100 text-red-600 px-2 py-1 rounded-md">
                                {formatDiscount(product.discount_percentage)}
                              </span>
                            </>
                          )}
                          
                        </div>
                      ) : (
                        // Show only selling price if there's no discount
                        <p className="text-2xl font-bold">{sellingPrice}</p>
                      )}
                    </div>


                    {/* Variants */}
                    {Object.keys(selectedVariants).map((variantType) => (
                      <div className="mt-5 mb-3" key={variantType}>
                        <p className="font-bold mb-2">{variantType}:</p>
                        <div className="flex gap-3">
                          {getVariantValues(variantType).map((value) => (
                            <button
                              key={value}
                              className={`px-2.5 py-1.5 border rounded-lg text-xs font-medium transition ${
                                selectedVariants[variantType] === value ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
                              }`}
                              style={variantType.toLowerCase() === "color" ? { backgroundColor: value, width: "28px", height: "28px", borderRadius: "50%" } : {}}
                              onClick={() => handleVariantChange(variantType, value)}
                            >
                              {variantType.toLowerCase() === "color" ? "" : value}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}

                    {/* Add to Cart or Update Quantity */}
                    <div className="mt-4 flex justify-between items-center">
                      {cartItem ? (
                        <div className="flex items-center gap-3">
                          {/* Decrease Quantity */}
                          <button
                            onClick={() => {
                              if (cartItem.quantity > 1) {
                                reduceProductQuantity(cartItem.uuid);
                              } else {
                                removeProductFromCart(cartItem.uuid); // Remove if quantity is 1
                              }
                            }}
                            className="bg-gray-200 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-300 transition"
                          >
                            −
                          </button>

                          {/* Quantity */}
                          <span className="text-lg font-semibold">{cartItem.quantity}</span>

                          {/* Increase Quantity */}
                          <button
                            onClick={() => addProductToCart(product.uuid, 1)}
                            className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addProductToCart(product.uuid, 1)}
                          className="bg-blue-600 text-white w-full py-3 rounded-lg hover:bg-blue-700 transition"
                        >
                          Add to Cart
                        </button>
                      )}

                      {/* Show total price & remove button */}
                      {cartItem && (
                        <div className="flex items-center gap-4">
                          {/* Total Price */}
                          <span className="text-lg font-semibold text-gray-700">
                            {formatProductPrice(cartItem.total)}
                          </span>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeProductFromCart(cartItem.uuid)}
                            className="text-red-600 hover:text-red-800 transition"
                          >
                            🗑️
                          </button>
                        </div>
                      )}
                    </div>


                </div>

                {/* Protection & Services */}
                <div className="mt-5 border w-full rounded-lg shadow-sm p-4">
                    
                    {/* Delivery Section */}
                    <div className="mb-5">
                    <div className="flex items-center gap-2 font-quicksand font-bold text-lg">
                        <FaTruck />
                        <span>Delivery</span>
                    </div>
                    <p className="text-gray-600 font-lato text-xs mt-1">Estimated delivery time 1-9 business days</p>
                    <p className="text-gray-900 font-lato font-semibold mt-2">Express Delivery Available</p>
                    <p className="text-gray-600 text-xs font-lato mt-1">
                        <span className="font-bold">For Same-Day-Delivery:</span> Please place your order before 11AM
                    </p>
                    <p className="text-gray-600 text-xs font-lato mt-1">
                        <span className="font-bold">Next-Day-Delivery:</span> Orders placed after 11AM will be delivered the next day
                    </p>
                    <p className="text-gray-500 text-sm font-lato mt-1">Note: Availability may vary by location</p>
                    </div>
                    
                    {/* Return Policy Section */}
                    <div className="mb-5">
                    <div className="flex items-center gap-2 font-quicksand font-bold text-lg">
                        <FaRedo />
                        <span>Return Policy</span>
                    </div>
                    <p className="text-gray-900 font-semibold font-lato mt-2">Guaranteed 7-Day Return Policy</p>
                    <p className="text-gray-600 text-xs font-lato mt-1">
                        For details about return shipping options, please visit -{" "}
                        <NavLink to="/" className="text-pink-500 font-lato underline">
                        MyAppSpace Return Policy
                        </NavLink>
                    </p>
                    </div>
                    
                    {/* Warranty Section */}
                    <div>
                    <div className="flex items-center gap-2 font-quicksand font-bold text-lg">
                        <FaShieldAlt />
                        <span>Warranty</span>
                    </div>
                    <p className="text-gray-600 font-lato text-sm mt-1">Warranty information unavailable for this item.</p>
                    </div>
                </div>
                
            </div>
        </div>

      </div>
    </div>
  )
}

export default SingleProductContent