import { useState, useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import ApiService from "../../../../../services/ApiService";
import { useNavigate } from "react-router-dom";


const api = new ApiService();

const fetchCategories = async ({ pageParam = 1 }) => {
  const response = await api.getWithAutoToken('/{store_code}/categories/getAll', {
    per_page: 10,
    page: pageParam
  });

  return {
    categories: response.categories.data, // Ensure correct access
    hasMore: response.categories.current_page < response.categories.last_page, // Check if more pages exist
  };
};


const Category = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const lastItemRef = useRef(null);

  const navigate = useNavigate();

  // Use React Query to fetch paginated categories
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasMore ? pages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });

  const categories = data?.pages.flatMap((page) => page.categories) || [];

  const handleNext = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 160, behavior: "smooth" });

      // Check if the last item is visible and load more data
      if (lastItemRef.current) {
        const { right } = lastItemRef.current.getBoundingClientRect();
        const containerRight = containerRef.current.getBoundingClientRect().right;
        if (right <= containerRight && hasNextPage) {
          fetchNextPage();
        }
      }
    }
  };

  const handlePrev = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -160, behavior: "smooth" });
    }
  };

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };
  
  const handleCategoryClick = (category) => {
    navigate(`/c/${category?.slug}`);
    console.log("Category clicked:", category);
  };
  

  return (
    <div className="w-full py-5">
      <div className="topCont pb-6 flex justify-between items-center">
        <h2 className="text-xl font-quicksand font-bold text-gray-800">
          Featured Categories
        </h2>
        <div className="sliderBtns flex items-center space-x-3">
          <button
            className="z-10 bg-white rounded-full shadow-md p-1.5 disabled:opacity-50"
            onClick={handlePrev}
          >
            &#8592;
          </button>
          <button
            className="z-10 bg-white rounded-full shadow-md p-1.5 disabled:opacity-50"
            onClick={handleNext}
          >
            &#8594;
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex items-center overflow-hidden overflow-x-auto whitespace-nowrap scroll-smooth overscroll-x-contain scrollbar-hide space-x-4 cursor-grab"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories
        .filter((category) => category && category.category_name) // Ensure valid categories
        .map((category, index) => (
          <motion.div
            key={category?.uuid}
            ref={index === categories.length - 1 ? lastItemRef : null}
            className={`w-[150px] md:w-[160px] lg:w-[180px] flex-shrink-0 bg-[#E3EFF3] p-4 rounded-lg text-center font-outfit font-normal transition-all duration-200 cursor-pointer ${
              hoveredCategory === category?.category_name ? "bg-gray-200 scale-105" : ""
            }`}
            onMouseEnter={() => setHoveredCategory(category?.category_name)}
            onMouseLeave={() => setHoveredCategory(null)}
            onClick={() => handleCategoryClick(category)}
          >
            <p className="whitespace-nowrap text-sm overflow-hidden text-ellipsis">
              {category?.category_name || "Unknown Category"}
            </p>
          </motion.div>
        ))}

        {isFetchingNextPage && (
          <motion.div
            className="w-[150px] md:w-[160px] lg:w-[180px] flex-shrink-0 bg-[#E3EFF3] p-4 rounded-lg text-center font-outfit font-normal animate-pulse"
          >
            Loading...
          </motion.div>
        )}
      </div>

      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </div>
  );
};

export default Category;
