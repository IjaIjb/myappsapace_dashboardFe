import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import SingleLimitedProduct from "../Products/SingleLimitedProduct";
import useProduct from "../../../../../features/hooks/useProduct";

const products = [
  {
    id: 1,
    image: "https://dummyimage.com/200x150/ddd/555&text=No+Image",
    title: "TOZO T6 True Wireless Earbuds Bluetooth Headphones",
    price: "$70",
    rating: 4.5,
    reviews: 738,
    badge: "HOT",
    badgeColor: "bg-red-500",
  },
  {
    id: 2,
    image: "https://dummyimage.com/200x150/ddd/555&text=No+Image",
    title: "Samsung Electronics Samsung Galaxy S21 5G",
    price: "$2,300",
    rating: 4.7,
    reviews: 536,
  },
  {
    id: 3,
    image: "https://dummyimage.com/200x150/ddd/555&text=No+Image",
    title: "Amazon Basics High-Speed HDMI Cable (18 Gbps, 4K/6...",
    price: "$360",
    rating: 4.6,
    reviews: 423,
    badge: "BEST DEALS",
    badgeColor: "bg-blue-500",
  },
  {
    id: 4,
    image: "https://dummyimage.com/200x150/ddd/555&text=No+Image",
    title: "Portable Washing Machine, 11lbs capacity Model 18NMF...",
    price: "$80",
    rating: 4.2,
    reviews: 816,
  },
];

const BrowsingHistory = () => {
  const scrollRef = useRef(null);

  const [browsingHostoryLoading, setBrowsingHistoryLoading] = useState(false);
  const [browsingHistory, setBrowsingHistory] = useState([]);

  const { fetchProductsDynamic } = useProduct();

  const fetchAllBrowsingHistoryData = async () => {
    const recentParams = {
      'limit': 10,
      'order_by': 'created_at',
      'order': 'desc',
    }
    await fetchProductsDynamic('s', 'recent_view', recentParams, {
      onBefore: () => setBrowsingHistoryLoading(true),
      onSuccess: (response) => setBrowsingHistory(response.products),
      onFinally: () => setBrowsingHistoryLoading(false),
    });
  }

  useEffect(() => {
    fetchAllBrowsingHistoryData();
  },[]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -250, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 250, behavior: "smooth" });
    }
  };

  if (browsingHostoryLoading) {
    return <BrowsingHistorySkeleton />
  }
  return (
    <div className="my-5 w-full border rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center p-3 border-b">
        <h2 className="text-md font-quicksand font-semibold">Browsing History</h2>
        <NavLink to="/browsing-history" className="text-orange-500 hover:underline font-lato text-sm">View All →</NavLink>
      </div>

      {/* Product List */}
      <div className="relative p-4">
        {/* Scrollable container */}
          <div
          ref={scrollRef}
          className="overflow-x-auto scroll-smooth snap-x flex space-x-3 px-4 py-4 scrollbar-hide"
        >

          {browsingHistory.map((product) => (
            <div key={product.uuid} className="snap-center min-w-[150px] md:min-w-[150px] lg:min-w-[230px]">
              <SingleLimitedProduct product={product} />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 hidden md:block"
        >
          <FaChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 hidden md:block"
        >
          <FaChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default BrowsingHistory;


const BrowsingHistorySkeleton = () => {
  return (
    <div className="my-5 w-full border rounded-lg">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center p-3 border-b">
        <div className="h-4 w-32 bg-gray-300 rounded animate-pulse"></div>
        <div className="h-3 w-20 bg-gray-300 rounded animate-pulse"></div>
      </div>

      {/* Product List Skeleton */}
      <div className="relative p-4">
        <div className="overflow-x-auto flex gap-4 px-4 py-4 scrollbar-hide">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="min-w-[200px] md:min-w-[250px] lg:min-w-[300px] snap-center transition-transform transform scale-100"
            >
              <div className="relative bg-white border rounded-lg p-3 shadow-sm">
                {/* Image Skeleton */}
                <div className="w-full h-40 bg-gray-300 rounded-md animate-pulse"></div>

                <div className="mt-2 space-y-2">
                  {/* Rating Skeleton */}
                  <div className="h-3 w-20 bg-gray-300 rounded animate-pulse"></div>

                  {/* Title Skeleton */}
                  <div className="h-4 w-3/4 bg-gray-300 rounded animate-pulse"></div>

                  {/* Price Skeleton */}
                  <div className="h-4 w-1/4 bg-gray-300 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
