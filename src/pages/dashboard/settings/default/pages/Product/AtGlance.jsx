import React from 'react'

function AtGlance({ product }) {
  const { product_specification } = product;

  // Convert object to an array of key-value pairs
  const specsArray = Object.entries(product_specification);

  // Split into two columns dynamically
  const midIndex = Math.ceil(specsArray.length / 2);
  const leftSpecs = specsArray.slice(0, midIndex);
  const rightSpecs = specsArray.slice(midIndex);

  return (
    <div className="text-gray-600 text-sm py-5 order-2">
      <h3 className="text-lg font-quicksand font-bold">At a glance</h3>

      <div className="bg-gray-100 p-5 rounded-lg shadow-sm w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-5">
          
          {/* Left Section */}
          <div className="flex gap-2 flex-col w-full">
            {leftSpecs.map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <p className="font-semibold text-gray-700">{key}</p>
                <p className="text-black">{value}</p>
              </div>
            ))}
          </div>

          {/* Vertical Divider (Hidden on Small Screens) */}
          {rightSpecs.length > 0 && (
            <div className="hidden md:block border-l w-2 border-gray-300 h-20"></div>
          )}

          {/* Right Section */}
          <div className="flex gap-2 flex-col w-full">
            {rightSpecs.map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <p className="font-semibold text-gray-700">{key}</p>
                <p className="text-black">{value}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

export default AtGlance;
