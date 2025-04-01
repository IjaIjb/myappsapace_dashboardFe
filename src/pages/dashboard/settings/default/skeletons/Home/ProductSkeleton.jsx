import React from "react";

function ProductSkeleton() {
  return (
    <div className="w-full animate-pulse py-6">
        <div className="h-2 w-14 rounded-lg bg-gray-400 mb-5"></div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-3 gap-x-2.5">
        {Array.from({ length: 10 }).map((_, index) => (
            <div 
            key={index} 
            className="bg-white border border-[#ECECEC] rounded-lg relative flex flex-col h-full 
                      hover:shadow-lg hover:scale-105 transition-transform cursor-pointer">
              {/* {product.label && (
                <span className="absolute font-lato font-light top-0 left-0 bg-[#F74B81] text-white text-xs px-3 py-1.5 rounded-tl-lg rounded-br-lg">
                  {product.label}
                </span>
              )} */}
              <div className="w-full h-56 object-cover bg-gray-400 rounded-tl-lg rounded-tr-lg" ></div>
  
              <div className="bottomCont p-3">
  
                  <div className="flex-grow space-y-1.5">
                    <div className="h-2 w-11 rounded-lg bg-gray-400 mt-2 line-clamp-1"></div>
                    <div className="h-2 w-11 bg-gray-400"></div>
                  </div>
 
                  {/* Mobile View: Full-Width Add to Cart Button */}
                  <div className="block mt-3">
                      <button className="w-full bg-gray-400 h-2 py-2 rounded-lg"></button>
                  </div>
  
              </div>
              
            </div>
        ))}
        </div>
    </div>
  );
}

export default ProductSkeleton;
