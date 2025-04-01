import React, { useState } from 'react';

const FeaturedProducts = () => {
  const categories = ['Popular Products', 'Body Products', 'Oils', 'All'];
  const [activeCategory, setActiveCategory] = useState('Popular Products');
  
  const products = [
    {
      id: 1,
      title: 'Daily Ritual',
      price: 24.99,
      salePrice: 18.75,
      image: '/images/theme/preview/Img - Daily Ritual.png',
      placeholder: 'https://via.placeholder.com/200x200?text=Daily+Ritual',
      category: 'Popular Products'
    },
    {
      id: 2,
      title: 'Massage Body Oil',
      price: 45,
      image: '/images/theme/preview/Img - Massage Body Oil.png',
      placeholder: 'https://via.placeholder.com/200x200?text=Massage+Oil',
      category: 'Body Products'
    },
    {
      id: 3,
      title: 'Textural Solution',
      price: 35,
      image: '/images/theme/preview/Img - Natural Balance (5).png',
      placeholder: 'https://via.placeholder.com/200x200?text=Textural+Solution',
      category: 'Popular Products'
    },
    {
      id: 4,
      title: 'Botanical Tonic',
      price: 76,
      image: '/images/theme/preview/Img - Natural Balance (4).png',
      placeholder: 'https://via.placeholder.com/200x200?text=Botanical+Tonic',
      category: 'Popular Products'
    },
    {
      id: 5,
      title: 'Botanical Oil',
      price: 68,
      image: '/images/theme/preview/Img - Natural Balance (3).png',
      placeholder: 'https://via.placeholder.com/200x200?text=Botanical+Oil',
      category: 'Oils'
    },
    {
      id: 6,
      title: 'Natural Tonic',
      price: 56,
      image: '/images/theme/preview/Img - Natural Balance (2).png',
      placeholder: 'https://via.placeholder.com/200x200?text=Natural+Tonic',
      category: 'Body Products'
    },
    {
      id: 7,
      title: 'Natural Tincture',
      price: 58,
      image: '/images/theme/preview/Img - Natural Balance (1).png',
      placeholder: 'https://via.placeholder.com/200x200?text=Natural+Tincture',
      category: 'Oils'
    },
    {
      id: 8,
      title: 'Botanical Cream',
      price: 27,
      image: '/images/theme/preview/Img - Natural Balance.png',
      placeholder: 'https://via.placeholder.com/200x200?text=Botanical+Cream',
      category: 'Body Products'
    }
  ];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <div className="py-16 px-4 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-light text-gray-700 mb-2">
          FEATURED PRODUCTS
          <span className="inline-block ml-2">
            <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.633 10.0001C6.633 8.15008 8.1501 6.6333 10 6.6333C11.8499 6.6333 13.367 8.15008 13.367 10.0001C13.367 11.8499 11.8499 13.3667 10 13.3667C8.1501 13.3667 6.633 11.8499 6.633 10.0001Z" />
            </svg>
          </span>
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-sm mb-8">
          Exclusively developed products for all your beauty, health and wellness needs. All products are
          natural and handcrafted with care.
        </p>

        <div className="flex flex-wrap justify-center space-x-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              className={`mb-2 ${
                activeCategory === category
                  ? 'text-gray-900 font-medium'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="text-center">
              <div className="bg-gray-50 p-4 mb-3">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-40 object-contain mx-auto"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = product.placeholder;
                  }}
                />
              </div>
              <h3 className="text-gray-700 text-sm font-medium">{product.title}</h3>
              <div className="flex justify-center items-center mt-2">
                {product.salePrice ? (
                  <>
                    <p className="text-gray-400 line-through mr-2">${product.price}</p>
                    <p className="text-gray-900 font-semibold">${product.salePrice}</p>
                  </>
                ) : (
                  <p className="text-gray-900 font-semibold">${product.price}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;