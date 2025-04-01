import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ApiService from "../../../../../services/ApiService";

import { FaBoxOpen, FaArrowRight } from "react-icons/fa";
import SingleLimitedProduct from "./SingleLimitedProduct";

function AllProducts() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const api = new ApiService();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.getWithOutToken('/{store_code}/products/getAll', {});
        
        if (response?.products) {
          setAllProducts(response.products);
        } else {
          setError("No products found");
        }
      } catch (error) {
        console.error(error);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (loading) {
    return (
      <div className="w-full py-12">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6">
          <div className="flex justify-center items-center py-20">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-600 border-t-transparent mb-4"></div>
              <span className="text-teal-600 font-medium">Loading products...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-12">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6">
          <div className="flex justify-center items-center py-20">
            <div className="flex flex-col items-center text-center">
              <FaBoxOpen size={48} className="text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Products Found</h3>
              <p className="text-gray-600 max-w-md">
                We couldn't find any products at the moment. Please check back later.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full py-12 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Popular Products</h2>
            <p className="text-gray-600 mt-1">Discover our most sought-after items</p>
          </div>
          
          <a 
            href="/shop" 
            className="hidden md:flex items-center text-teal-600 hover:text-teal-700 font-medium transition-colors"
          >
            View all products
            <FaArrowRight className="ml-2" />
          </a>
        </div>
        
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {allProducts.map((product) => (
            <SingleLimitedProduct key={product.uuid} product={product} />
          ))}
        </motion.div>
        
        <div className="mt-8 text-center md:hidden">
          <a 
            href="/shop" 
            className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium transition-colors"
          >
            View all products
            <FaArrowRight className="ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default AllProducts;