import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaTimes, FaTruck, FaCheckCircle, FaClock, FaShippingFast } from "react-icons/fa";

export default function AdvancedProductTracking() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortBy, setSortBy] = useState("Name");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Sample Product Data
  const [products, setProducts] = useState([
    { id: 1, name: "Smartphone", status: "Shipped", location: "New York, USA", progress: 60, eta: "2025-03-28", details: "Expected in 3 days" },
    { id: 2, name: "Laptop", status: "In Transit", location: "Paris, France", progress: 40, eta: "2025-03-30", details: "Customs Clearance Pending" },
    { id: 3, name: "Headphones", status: "Delivered", location: "Lagos, Nigeria", progress: 100, eta: "2025-03-21", details: "Delivered Successfully" },
    { id: 4, name: "Smartwatch", status: "Pending", location: "Dubai, UAE", progress: 10, eta: "2025-04-02", details: "Waiting for Dispatch" },
  ]);

  // Simulated Real-time Tracking Updates
  useEffect(() => {
    const interval = setInterval(() => {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.status !== "Delivered" && product.progress < 100
            ? { ...product, progress: product.progress + 5 }
            : product
        )
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Calculate Days Left for ETA
  const getDaysLeft = (eta) => {
    const today = new Date();
    const deliveryDate = new Date(eta);
    const diffTime = deliveryDate - today;
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return daysLeft > 0 ? `${daysLeft} days left` : "Arriving today!";
  };

  // Filter & Sort Products
  const filteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedStatus === "All" || product.status === selectedStatus)
    )
    .sort((a, b) => {
      if (sortBy === "Name") return a.name.localeCompare(b.name);
      if (sortBy === "Status") return a.status.localeCompare(b.status);
      if (sortBy === "Progress") return b.progress - a.progress;
      return 0;
    });

  return (
    <div className="p-1">
      <div className="rounded-2xl p-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FaTruck className="text-blue-600" /> Advanced Product Tracking
        </h2>

        {/* Search & Filter Bar */}
        <div className="flex gap-3 mb-4">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search product..."
              className="w-full pl-10 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select className="p-3 border border-gray-300 rounded-xl bg-white" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="In Transit">In Transit</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
          <select className="p-3 border border-gray-300 rounded-xl bg-white" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="Name">Sort: Name</option>
            <option value="Status">Sort: Status</option>
            <option value="Progress">Sort: Progress</option>
          </select>
        </div>

        {/* Product List */}
        <div className="space-y-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                className="bg-gray-50 p-4 rounded-xl shadow-md cursor-pointer hover:bg-gray-100 transition"
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedProduct(product)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.location}</p>
                    <p className="text-xs text-blue-500 flex items-center gap-1">
                      <FaClock /> {getDaysLeft(product.eta)}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-xl text-sm font-semibold ${
                      product.status === "Delivered"
                        ? "bg-green-100 text-green-700 flex items-center gap-1"
                        : product.status === "Shipped"
                        ? "bg-blue-100 text-blue-700 flex items-center gap-1"
                        : product.status === "In Transit"
                        ? "bg-yellow-100 text-yellow-700 flex items-center gap-1"
                        : "bg-red-100 text-red-700 flex items-center gap-1"
                    }`}
                  >
                    {product.status === "Delivered" && <FaCheckCircle />}
                    {product.status === "Shipped" && <FaShippingFast />}
                    {product.status}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <motion.div
                    className={`h-2 rounded-full ${
                      product.progress === 100 ? "bg-green-500" : "bg-blue-500"
                    }`}
                    style={{ width: `${product.progress}%` }}
                    animate={{ width: `${product.progress}%` }}
                    transition={{ duration: 0.5 }}
                  ></motion.div>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-600">No matching products found.</p>
          )}
        </div>
      </div>

      {/* Modal for Product Details */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <motion.div className="bg-white rounded-2xl p-6 shadow-lg max-w-sm w-full" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h3>
            <p className="text-gray-600 mb-4">{selectedProduct.details}</p>
            <button className="w-full bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 flex items-center justify-center gap-2" onClick={() => setSelectedProduct(null)}>
              <FaTimes /> Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
