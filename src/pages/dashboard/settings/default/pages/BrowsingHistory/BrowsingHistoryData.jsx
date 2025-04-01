import React, { useEffect, useState } from 'react'
import { FaRegCalendarAlt, FaRegStar, FaSearch, FaShoppingCart, FaSpinner, FaStar } from 'react-icons/fa';
import useProduct from '../../../../../features/hooks/useProduct';
import { getProductPrice } from '../../../../../helpers/helpers';

function BrowsingHistoryData() {

    const [browsingHistoryData, setBrowsingHistoryData] = useState(null);
    const [searchBrowser, setSearchBrowser] = useState("");
    const [searchBrowserPage, setSearchBrowserPage] = useState(1);
    const [searchBrowseDate, setSearchBrowseDate] = useState("");
    const [searchBrowseLoading, setSearchBrowseLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true);

    const { autoBrowsingHistoryDynamic } = useProduct();

    const pullBrowsingHistoryData = async (params) => {
       await autoBrowsingHistoryDynamic(params, {
            onBefore: () => setSearchBrowseLoading(true),
            onSuccess: (response) => setBrowsingHistoryData(response),
            onFinally: () => setSearchBrowseLoading(false)
        });
    }
   
    useEffect(() => {
        const params = {
            search: searchBrowser,
            page: searchBrowserPage,
            date: searchBrowseDate,
        };
        pullBrowsingHistoryData(params);
    }, [searchBrowser, searchBrowserPage, searchBrowseDate]);


    console.log(browsingHistoryData, "All Browsing History")
    const products = [
        {
          id: 1,
          image: "https://via.placeholder.com/150", // Replace with actual image URL
          badge: "HOT",
          rating: 5,
          reviews: 738,
          title: "TOZO T6 True Wireless Earbuds Bluetooth Headphone...",
          price: "$70",
        },
        {
          id: 2,
          image: "https://via.placeholder.com/150",
          rating: 5,
          reviews: 536,
          title: "Samsung Electronics Samsung Galaxy S21 5G",
          price: "$2,300",
        },
        {
          id: 3,
          image: "https://via.placeholder.com/150",
          badge: "BEST DEALS",
          rating: 5,
          reviews: 423,
          title: "Amazon Basics High-Speed HDMI Cable (18 Gbps, 4K/6...",
          price: "$360",
        },
        {
          id: 4,
          image: "https://via.placeholder.com/150",
          rating: 4,
          reviews: 816,
          title: "Portable Washing Machine, 11lbs capacity Model 18NMF...",
          price: "$80",
        },
        {
            id: 4,
            image: "https://via.placeholder.com/150",
            rating: 4,
            reviews: 816,
            title: "Portable Washing Machine, 11lbs capacity Model 18NMF...",
            price: "$80",
          },
      ];


  return (
    <div className='w-full '>
        <div className="topHeader pb-3">
            <h2 className="text-2xl font-semibold">Browsing History</h2>
        </div>

        <div className="flex items-center border mt-3 border-gray-300 rounded-md overflow-hidden w-full max-w-xl">
            {/* Search Input */}
            <div className="flex items-center px-3 bg-white">
                <FaSearch className="text-orange-500" />
            </div>
            <input
                type="text"
                placeholder="Search in browsing history"
                className="flex-1 text-sm p-2 text-gray-600 outline-none"
            />
            {/* Date Picker */}
            <div className="flex items-center px-3 bg-white">
                <FaRegCalendarAlt className="text-orange-500" />
            </div>
            <input
                type="date"
                className="p-2 text-gray-600 outline-none text-sm bg-white"
            />
        </div>

        <div className="mainContent w-full">
            {/* Loading Preloader */}
            {searchBrowseLoading && (
                <div className="py-12 text-center flex flex-col items-center">
                    <FaSpinner className="text-gray-400 text-5xl animate-spin mb-4" />
                    <h3 className="text-lg font-bold text-gray-500">Fetching your browsing history...</h3>
                    <p className="text-sm text-gray-400 mt-2">Please wait while we load your recent activity.</p>
                </div>
            )}

            {/* No Browsing History Found */}
            {!searchBrowseLoading && (!browsingHistoryData || browsingHistoryData.length < 1) && (
                <div className="py-12 text-center">
                    <FaShoppingCart className="text-gray-400 text-6xl mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-gray-500">No browsing history found</h3>
                    <p className="text-sm text-gray-400 mt-2">Start exploring our products and your history will appear here!</p>
                </div>
            )}

            {/* Display Browsing History Here */}
            {!searchBrowseLoading && browsingHistoryData && browsingHistoryData.length > 0 && (
                <div className="your-content-class">
                    {browsingHistoryData.map((history, index) => (
                        <div key={index} className="border rounded-lg mt-5">
                            {/* Date Header */}
                            <div className="topHeaderInner border-b py-3 px-3">
                                <h2 className="text-sm font-lato font-semibold">{history.date}</h2>
                            </div>

                            {/* Products Grid */}
                            <div className="grid p-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                {history.products.map((product) => (
                                    <div key={product.uuid} className="bg-white p-4 rounded-lg border relative">
                                        {/* Badge */}
                                        {product.badge && (
                                            <span
                                                className={`absolute top-2 left-2 px-2 py-1 text-xs font-bold text-white rounded ${
                                                    product.badge === "HOT" ? "bg-red-500" : "bg-blue-500"
                                                }`}
                                            >
                                                {product.badge}
                                            </span>
                                        )}

                                        {/* Image Placeholder (Replace with Actual Image URL) */}
                                        <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-md">
                                            <span className="text-gray-500 text-sm">Image Unavailable</span>
                                        </div>

                                        {/* Ratings */}
                                        <div className="flex items-center mt-2">
                                            {[...Array(5)].map((_, i) =>
                                                i < product.rating ? (
                                                    <FaStar key={i} className="text-orange-400 text-sm" />
                                                ) : (
                                                    <FaRegStar key={i} className="text-gray-300 text-sm" />
                                                )
                                            )}
                                            <span className="text-gray-500 text-xs ml-2">({product.reviews})</span>
                                        </div>

                                        {/* Title */}
                                        <p className="text-sm text-gray-700 mt-1 line-clamp-2">{product.title}</p>

                                        {/* Price */}
                                        <p className="text-blue-600 font-bold mt-2">
                                            {getProductPrice(product).discountedPrice}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                </div>
            )}


            <div className="loadMoree">
                {/* Load More Button */}
                {hasMore && (
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={() => {}}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition flex items-center"
                            disabled={searchBrowseLoading}
                        >
                            {searchBrowseLoading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M12 2v4M12 22v-4M2 12h4M22 12h-4" />
                                    </svg>
                                    Loading...
                                </>
                            ) : (
                                "Load More"
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>


        
    </div>
  )
}

export default BrowsingHistoryData