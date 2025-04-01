import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function DiscountFilter() {
  const discountOptions = [5, 10, 20, 30, 40, 50]; // Available discount percentages
  const [searchParams, setSearchParams] = useSearchParams();

  // Get selected discounts from URL
  const selectedDiscounts = searchParams.get("discounts")
    ? searchParams.get("discounts").split(",").map(Number)
    : [];

  const handleCheckboxChange = (discount) => {
    const updatedDiscounts = selectedDiscounts.includes(discount)
      ? selectedDiscounts.filter((d) => d !== discount) // Remove if already selected
      : [...selectedDiscounts, discount]; // Add if not selected

    // Preserve existing search params while updating discounts
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      if (updatedDiscounts.length > 0) {
        newParams.set("discounts", updatedDiscounts.join(","));
      } else {
        newParams.delete("discounts"); // Remove if empty
      }
      return newParams;
    });
  };

  return (
    <section className="w-full border-b py-5">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-quicksand font-bold">Filter by Discount</h2>
      </div>

      {/* Discount Options */}
      <div className="flex flex-col gap-2">
        {discountOptions.map((discount) => (
          <label
            key={discount}
            className="flex items-center font-lato space-x-3 p-2 cursor-pointer transition-all duration-200 rounded-md hover:bg-gray-100"
          >
            {/* Custom Checkbox */}
            <div className="relative">
              <input
                type="checkbox"
                checked={selectedDiscounts.includes(discount)}
                onChange={() => handleCheckboxChange(discount)}
                className="peer hidden"
              />
              <div className="w-5 h-5 border-2 border-gray-400 rounded-md flex items-center justify-center transition-all peer-checked:border-blue-500 peer-checked:bg-blue-500">
                <svg
                  className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-all"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <span className="text-sm text-gray-700">{discount}% or more</span>
          </label>
        ))}
      </div>
    </section>
  );
}
