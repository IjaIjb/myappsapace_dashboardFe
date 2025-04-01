import React from 'react';

const Products = () => {
  const products = [
    {
      id: 1,
      title: 'Sport Bag',
      price: 35,
      image: '/images/theme/preview/Img - Sport Bag (1).png',
      placeholder: 'https://via.placeholder.com/150x150?text=Sport+Bag'
    },
    {
      id: 2,
      title: 'Panduka',
      price: 15,
      image: '/images/theme/preview/Img - Panduka (1).png',
      placeholder: 'https://via.placeholder.com/150x150?text=Towel'
    },
    {
      id: 3,
      title: 'Pilate Mat',
      price: 21,
      image: '/images/theme/preview/Img - Pillates Mat (1).png',
      placeholder: 'https://via.placeholder.com/150x150?text=Yoga+Mat',
      color: 'purple'
    },
    {
      id: 4,
      title: 'Prosource',
      price: 30,
      image: '/images/theme/preview/Img - ProSource (1).png',
      placeholder: 'https://via.placeholder.com/150x150?text=Bottle',
      color: 'blue'
    }
  ];

  return (
    <div className="py-16 px-4 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-light text-gray-700 mb-10">
          OUR PRODUCTS
          <span className="inline-block ml-2">
            <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.633 10.0001C6.633 8.15008 8.1501 6.6333 10 6.6333C11.8499 6.6333 13.367 8.15008 13.367 10.0001C13.367 11.8499 11.8499 13.3667 10 13.3667C8.1501 13.3667 6.633 11.8499 6.633 10.0001Z" />
            </svg>
          </span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="text-center">
              <div className="bg-gray-100 p-4 rounded-md mb-3">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-32 object-contain mx-auto"
                  onError={(e:any) => {
                    e.target.onerror = null;
                    e.target.src = product.placeholder;
                  }}
                />
              </div>
              <h3 className="text-gray-700 text-sm font-medium">{product.title}</h3>
              <p className="text-gray-900 font-semibold">${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;