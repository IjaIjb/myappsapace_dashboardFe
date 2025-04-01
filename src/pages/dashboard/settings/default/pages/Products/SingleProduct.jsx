import React from "react";
import { useNavigate } from "react-router-dom";
import StarRating from "../../extensions/StarRating";
import { getProductPrice } from "../../../../../helpers/helpers";
import useCart from "../../../../../features/hooks/useCart";

function SingleProduct({ product }) {
  const navigate = useNavigate();
  const { items, addProductToCart, reduceProductQuantity, removeProductFromCart } = useCart();
  
  const { currency, sellingPrice, discountedPrice } = getProductPrice(product);

  // Find the product in the cart
  const cartItem = items.find((item) => item.uuid === product.uuid);

  return (
    <div 
      key={product.uuid} 
      className="bg-white border border-[#ECECEC] rounded-lg relative flex flex-col h-full 
                hover:shadow-lg hover:scale-105 transition-transform cursor-pointer"
    >
      {product.sale_type !== "none" && (
        <span className="absolute font-lato font-light top-0 left-0 bg-[#F74B81] text-white text-xs px-3 py-1.5 rounded-tl-lg rounded-br-lg">
          {product.sale_type}
        </span>
      )}

      <img
        src={product.product_images?.[0] || "https://dummyimage.com/300x400/ddd/555&text=No+Image"}
        alt={product.product_name}
        className="w-full h-56 object-cover rounded-tl-lg rounded-tr-lg"
        onClick={() => navigate(`/product/${product.product_slug}`)}
      />

      <div className="bottomCont p-3"> 
        <div className="flex-grow space-y-1.5">
          <h3 className="text-sm text-[#253D4E] font-quicksand font-medium mt-2 line-clamp-1">
            {product.product_name}
          </h3>
          <StarRating rating={4.5} />
          <p className="text-xs font-lato font-light text-gray-500">Code: {product.product_code}</p>
        </div>

        {/* Price Row */}
        <div className="flex flex-wrap items-center justify-between mt-3 gap-2">
          <div className="flex flex-wrap items-center">
            <span className="text-sm font-quicksand font-semibold truncate max-w-[80px] sm:max-w-[120px] md:max-w-[150px]">
              {discountedPrice || sellingPrice}
            </span>
            
            {product.discount_percentage && (
              <span className="text-xs font-quicksand text-gray-400 line-through ml-2 truncate max-w-[80px] sm:max-w-[120px]">
                {sellingPrice}
              </span>
            )}
          </div>

          {/* Add to Cart OR Increment/Decrement Buttons */}
          {cartItem ? (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => 
                  cartItem.quantity > 1 
                    ? reduceProductQuantity(cartItem.uuid) 
                    : removeProductFromCart(cartItem.uuid)
                }
                className="bg-[#DEEAF9] text-white text-xs px-2 py-1 rounded"
              >
                ➖
              </button>
              <span className="text-xs font-quicksand font-medium">{cartItem.quantity}</span>
              <button
                onClick={() => addProductToCart(cartItem.uuid, 1)}
                className="bg-[#DEEAF9] text-white text-xs px-2 py-1 rounded"
              >
                ➕
              </button>
            </div>
          ) : (
            <button
              onClick={() => addProductToCart(product.uuid, 1)}
              className="bg-[#DEEAF9] font-lato font-semibold text-xs flex items-center justify-between space-x-1 px-3 py-2 rounded"
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_931_1347)">
                  <path d="M14.5898 2.30674H3.06318V2.12008C3.00095 1.68452 2.80651 1.31897 2.47984 1.02341C2.15318 0.727856 1.75651 0.580078 1.28984 0.580078H0.589844V1.74675H1.28984C1.4454 1.74675 1.57762 1.79341 1.68651 1.88674C1.7954 1.98008 1.8654 2.10452 1.89651 2.26008L2.82984 10.1001C2.86095 10.5667 3.03984 10.9401 3.36651 11.2201C3.69318 11.5001 4.08984 11.6556 4.55651 11.6867H12.2565V10.4734H4.55651C4.40095 10.4734 4.26873 10.4267 4.15984 10.3334C4.05095 10.2401 3.98095 10.1156 3.94984 9.96008L3.90318 9.30674H13.3298L14.5898 2.30674ZM12.3498 8.14008H3.76318L3.20318 3.47341H13.1898L12.3498 8.14008ZM3.52984 13.4134C3.49873 13.7245 3.59984 13.9967 3.83318 14.2301C4.06651 14.4634 4.34651 14.5801 4.67318 14.5801C4.99984 14.5801 5.27207 14.4634 5.48984 14.2301C5.70762 13.9967 5.82429 13.7245 5.83984 13.4134C5.8554 13.1023 5.74651 12.8301 5.51318 12.5967C5.27984 12.3634 4.99984 12.2467 4.67318 12.2467C4.34651 12.2467 4.07429 12.3634 3.85651 12.5967C3.63873 12.8301 3.52984 13.1023 3.52984 13.4134ZM9.36318 13.4134C9.33207 13.7245 9.43318 13.9967 9.66651 14.2301C9.89984 14.4634 10.1798 14.5801 10.5065 14.5801C10.8332 14.5801 11.1054 14.4634 11.3232 14.2301C11.541 13.9967 11.6576 13.7245 11.6732 13.4134C11.6887 13.1023 11.5798 12.8301 11.3465 12.5967C11.1132 12.3634 10.8332 12.2467 10.5065 12.2467C10.1798 12.2467 9.90762 12.3634 9.68984 12.5967C9.47207 12.8301 9.36318 13.1023 9.36318 13.4134Z" fill="black"/>
                </g>
              </svg>
              <span>Add</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
