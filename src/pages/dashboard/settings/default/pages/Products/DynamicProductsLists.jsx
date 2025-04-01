import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import SingleLimitedProduct from "./SingleLimitedProduct";
import { NavLink } from "react-router-dom";
 

function DynamicProductsLists({ sectionDetails, products}) {

  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleNext = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  // Handle Dragging
  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 2; // Adjust speed
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <div className="w-full py-4 relative">
      {/* Header Section */}
      <div className="topCont pb-6 flex justify-between items-center">
        <h2 className="text-xl font-quicksand font-bold text-gray-800">{sectionDetails.display_name}</h2>
        <NavLink to={`/s/${sectionDetails.section_name}`} className="bg-[#E3EFF3] font-lato p-2.5 hover:opacity-70 transition duration-300 ease-in-out rounded-lg text-xs font-medium">View All</NavLink>
      </div>

      {/* Scrollable Product Slider */}
      <div className="relative overflow-hidden">

      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white z-10 p-2 shadow-md rounded-full"
        onClick={handlePrev}
        >
        &#8592;
        </button>

        <div
            ref={containerRef}
            className="flex items-center overflow-hidden overflow-x-auto py-3 whitespace-nowrap scroll-smooth scrollbar-hide space-x-4 cursor-grab"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >

            {products.map((product) => (
            <motion.div
                key={product.uuid}
                className="w-[200px] md:w-[220px] lg:w-[240px] flex-shrink-0"
            >
                <SingleLimitedProduct product={product} />
            </motion.div>
            ))}
        </div>

        <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white z-10 p-2 shadow-md rounded-full"
            onClick={handleNext}
        >
        &#8594;
        </button>

      </div>
      
    </div>
  );
}

export default DynamicProductsLists;
