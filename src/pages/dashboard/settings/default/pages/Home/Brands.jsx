import React from 'react';
import { motion } from 'framer-motion';

// Sample brand data - replace with your actual brands
const brands = [
  {
    id: 1,
    name: 'Apple',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    url: '/brands/apple'
  },
  {
    id: 2,
    name: 'Samsung',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg',
    url: '/brands/samsung'
  },
  {
    id: 3,
    name: 'Sony',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg',
    url: '/brands/sony'
  },
  {
    id: 4,
    name: 'Microsoft',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg',
    url: '/brands/microsoft'
  },
  {
    id: 5,
    name: 'LG',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/LG_symbol.svg',
    url: '/brands/lg'
  },
  {
    id: 6,
    name: 'Dell',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Dell_Logo.png',
    url: '/brands/dell'
  }
];

const FeaturedBrands = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900">Featured Brands</h2>
          <p className="text-gray-600 mt-2">Shop from top brands in the industry</p>
        </div>
        
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
        >
          {brands.map((brand) => (
            <motion.a
              key={brand.id}
              href={brand.url}
              className="flex items-center justify-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src={brand.logo} 
                alt={`${brand.name} logo`} 
                className="max-h-12 max-w-full" 
              />
            </motion.a>
          ))}
        </motion.div>
        
        <div className="text-center mt-8">
          <a 
            href="/brands" 
            className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium transition-colors"
          >
            View all brands
            <svg 
              className="ml-2 w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBrands;