import { useState } from "react";
import {
  FaRegHeart,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

function ProductLeftSection({ product }) {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  const handleNextImage = () => {
    const currentIndex = product.images.indexOf(selectedImage);
    const nextIndex = (currentIndex + 1) % product.images.length;
    setSelectedImage(product.images[nextIndex]);
  };

  const handlePrevImage = () => {
    const currentIndex = product.images.indexOf(selectedImage);
    const prevIndex = (currentIndex - 1 + product.images.length) % product.images.length;
    setSelectedImage(product.images[prevIndex]);
  };

  return (
    <div className="lg:col-span-3 w-full leftSection p-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Thumbnails */}
        <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
          {product.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="Thumbnail"
              className={`w-16 h-16 md:w-24 md:h-20 rounded-lg cursor-pointer border ${
                selectedImage === img ? "border-blue-500" : "border-gray-300"
              }`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>

        {/* Main Image with Navigation */}
        <div className="relative flex-1">
          <img
            src={selectedImage}
            alt="Product"
            className="w-full rounded-lg border"
          />
          <button
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full"
            onClick={handlePrevImage}
          >
            <FaChevronLeft />
          </button>
          <button
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full"
            onClick={handleNextImage}
          >
            <FaChevronRight />
          </button>
        </div>

        {/* Wishlist Icon */}
        <div className="md:ml-2">
          <div className="h-10 w-10 flex justify-center items-center rounded-full shadow-md bg-white">
            <FaRegHeart size={18} className="text-red-500 hover:text-red-700" />
          </div>
        </div>
      </div>

      {/* Product Features */}
      <div className="text-gray-600 text-sm py-5">
        <h3 className="text-lg font-quicksand font-bold">At a glance</h3>

        <div className="bg-gray-100 p-5 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Left Section */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="font-semibold text-gray-700">Screen size</p>
                <p className="text-black">50 in</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold text-gray-700">Platform</p>
                <p className="text-black">Roku TV</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold text-gray-700">Resolution</p>
                <p className="text-black">4K UHD</p>
              </div>
            </div>

            {/* Right Section */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="font-semibold text-gray-700">Display</p>
                <p className="text-black">LED</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold text-gray-700">Refresh rate</p>
                <p className="text-black">60 Hz</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold text-gray-700">Aspect</p>
                <p className="text-black">16:9</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      {/* <ProductDescription /> */}
    </div>
  );
}

export default ProductLeftSection;
