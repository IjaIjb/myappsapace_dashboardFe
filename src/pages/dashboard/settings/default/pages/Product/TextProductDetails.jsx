import React from 'react';
import useProduct from '../../../../../features/hooks/useProduct';

function TextProductDetails() {
  const { product } = useProduct();

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Product Details</h2>
      {product ? (
        <ul className="space-y-2 text-gray-700">
          {Object.entries(product).map(([key, value]) => (
            <li key={key} className="border-b pb-2">
              <strong className="capitalize">{key.replace(/_/g, ' ')}:</strong> {JSON.stringify(value)}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-red-500">No product data available.</p>
      )}
    </div>
  );
}

export default TextProductDetails;
