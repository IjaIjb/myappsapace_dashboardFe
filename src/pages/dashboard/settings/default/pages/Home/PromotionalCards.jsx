import React from 'react';
import { motion } from 'framer-motion';

const promotions = [
  {
    id: 1,
    title: 'New Arrivals',
    description: 'Check out the latest products in our store',
    image: 'https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    backgroundColor: 'bg-blue-50',
    textColor: 'text-blue-900',
    buttonColor: 'bg-blue-600 hover:bg-blue-700',
    url: '/new-arrivals'
  },
  {
    id: 2,
    title: 'Flash Sale',
    description: 'Up to 50% off on selected items',
    image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    backgroundColor: 'bg-red-50',
    textColor: 'text-red-900',
    buttonColor: 'bg-red-600 hover:bg-red-700',
    url: '/flash-sale'
  },
  {
    id: 3,
    title: 'Gift Cards',
    description: 'The perfect gift for tech enthusiasts',
    image: 'https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    backgroundColor: 'bg-green-50',
    textColor: 'text-green-900',
    buttonColor: 'bg-green-600 hover:bg-green-700',
    url: '/gift-cards'
  }
];

const PromotionalCards = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promotions.map((promo, index) => (
            <motion.div 
              key={promo.id}
              className={`${promo.backgroundColor} rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="p-6">
                <h3 className={`text-xl font-bold ${promo.textColor}`}>{promo.title}</h3>
                <p className="text-gray-600 mt-2 mb-4">{promo.description}</p>
                <a 
                  href={promo.url}
                  className={`inline-block px-6 py-2 rounded-full text-white font-medium ${promo.buttonColor} transition-colors`}
                >
                  Shop Now
                </a>
              </div>
              <div className="h-48 md:h-56 lg:h-64 overflow-hidden">
                <img 
                  src={promo.image} 
                  alt={promo.title} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromotionalCards;