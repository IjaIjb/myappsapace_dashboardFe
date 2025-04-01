import { useState } from "react";
import { FaStar, FaStarHalfAlt, FaShieldAlt, FaPlus, FaTruck, FaStore, FaBoxOpen, FaRedo } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const ProductRightSection = ({ product }) => {
  // Default to the first variant
  const [selectedSize, setSelectedSize] = useState(product.variants[0]?.size);
  const [selectedColor, setSelectedColor] = useState(product.variants[0]?.color);

  // Get available colors based on selected size
  const availableColors = product.variants
    .filter((variant) => variant.size === selectedSize)
    .map((variant) => variant.color);

  // Find the selected variant
  const selectedVariant = product.variants.find(
    (variant) => variant.size === selectedSize && variant.color === selectedColor
  ) || product.variants[0]; // Fallback to first variant

  return (
    <div className="col-span-2 self-start">
      
      {/* top right section */}
      <div className="topSection border p-5 rounded-lg shadow-sm bg-white">
        {/* Labels */}
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-blue-200 text-blue-700 text-xs font-bold px-2 py-1 rounded">Best Seller</span>
          <span className="bg-gray-200 text-gray-700 text-xs font-bold px-2 py-1 rounded">Popular Pick</span>
        </div>
      
        {/* Product Title */}
        <h2 className="text-2xl font-bold">{product.title}</h2>
        <p className="text-gray-600 text-sm">{product.model}</p>

        {/* Ratings */}
        <div className="flex items-center gap-1 text-yellow-500 mt-2">
          {[...Array(5)].map((_, i) =>
            i < Math.floor(product.rating) ? <FaStar key={i} /> : <FaStarHalfAlt key={i} />
          )}
          <span className="text-gray-500 text-sm">({product.reviews.toLocaleString()} reviews)</span>
        </div>

        {/* Pricing */}
        <p className="text-3xl font-bold mt-3">${selectedVariant.price.toFixed(2)}</p>

        {/* Variants - Size */}
        <div className="mt-5">
          <p className="font-bold mb-2">Size:</p>
          <div className="flex gap-3">
            {[...new Set(product.variants.map((v) => v.size))].map((size) => (
              <button
                key={size}
                className={`px-2.5 py-1.5 border rounded-lg text-xs font-medium transition ${
                  selectedSize === size ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => {
                  setSelectedSize(size);
                  // Auto-select first available color when size changes
                  setSelectedColor(
                    product.variants.find((v) => v.size === size)?.color || availableColors[0]
                  );
                }}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Variants - Color */}
        <div className="mt-5">
          <p className="font-bold mb-2">Color:</p>
          <div className="flex gap-3">
            {availableColors.map((color) => (
              <button
                key={color}
                className={`w-7 h-7 rounded-full border-2 transition ${
                  selectedColor === color ? "border-blue-600" : "border-gray-300"
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              ></button>
            ))}
          </div>
        </div>

        {/* Add to Cart */}
        <button className="bg-blue-600 text-white w-full py-3 rounded-lg mt-4 hover:bg-blue-700 transition">
          Add to cart
        </button>
      </div>


      {/* Protection & Services */}
      <div className="mt-5 border rounded-lg shadow-sm p-4">
        
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




  );
};

export default ProductRightSection;
