import React, { useState, useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import ApiService from "../../../../../../services/ApiService";

function FetchCategories() {
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const containerRef = useRef(null);
  const api = new ApiService();

  const pathSegments = location.pathname.split('/').filter(Boolean);
  const selectedSlug = pathSegments[1];

  // Get selected categories from URL
  const selectedCategories = searchParams.get("categories")
    ? searchParams.get("categories").split(",").map(String)
    : [];

  // Fetch categories using React Query v5
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["categories"],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await api.getWithAutoToken("/{store_code}/categories/getAll", {
        page: pageParam,
        per_page: 10,
      });
      return response.categories.data;
    },
    getNextPageParam: (lastPage, pages) => (lastPage.length > 0 ? pages.length + 1 : undefined),
    keepPreviousData: true,
  });

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 10 && hasNextPage) {
      fetchNextPage();
    }
  };

  const toggleCategory = (categorySlug) => {
    const updatedCategories = selectedCategories.includes(categorySlug)
      ? selectedCategories.filter((slug) => slug !== categorySlug)
      : [...selectedCategories, categorySlug];
  
    // Preserve existing search params
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      if (updatedCategories.length > 0) {
        newParams.set("categories", updatedCategories.join(","));
      } else {
        newParams.delete("categories"); // Remove param if empty
      }
      return newParams;
    });
  };
  

  
  // Flatten categories from paginated response
  const categories = data?.pages.flat() || [];

  // Filter categories by search input
  const filteredCategories = categories
  .filter((category) => category?.category_name?.toLowerCase().includes(search.toLowerCase()))
  .filter((category) => category.slug !== selectedSlug); // Exclude selectedSlug


  return (
    <div className="w-full border-b pb-4">
      <h2 className="text-lg font-quicksand font-semibold mb-3">Categories</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search categories..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 text-xs border border-gray-300 rounded-md focus:outline-none"
      />

      {/* Scrollable Category List */}
      <div ref={containerRef} onScroll={handleScroll} className="h-64 overflow-y-auto mt-3">
        {filteredCategories.map((category) => (
          <label
            key={category.id}
            className="flex items-center font-lato space-x-3 p-2 cursor-pointer transition-all duration-200 rounded-md hover:bg-gray-100"
          >
            {/* Custom Checkbox */}
            <div className="relative">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.slug)}
                onChange={() => toggleCategory(category.slug)}
                className="peer hidden"
              />
              <div className="w-5 h-5 border-2 border-gray-400 rounded-md flex items-center justify-center transition-all peer-checked:border-blue-500 peer-checked:bg-blue-500">
                <svg
                  className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-all"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <span className="text-sm text-gray-700">{category.category_name}</span>
          </label>
        ))}
        {isFetchingNextPage && <p className="text-sm text-gray-500 mt-2">Loading more...</p>}
      </div>
    </div>
  );
}

export default FetchCategories;
