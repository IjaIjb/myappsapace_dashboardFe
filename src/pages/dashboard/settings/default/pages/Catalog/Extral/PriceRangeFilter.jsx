import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./PriceSlider.css";

export default function PriceRangeFilter() {
  const minPrice = 0;
  const maxPrice = 150000;

  // Get URL parameters
  const [searchParams, setSearchParams] = useSearchParams();
  const urlMin = Number(searchParams.get("min_price")) || minPrice;
  const urlMax = Number(searchParams.get("max_price")) || maxPrice;

  // Store applied values (for syncing with the URL)
  const [min, setMin] = useState(urlMin);
  const [max, setMax] = useState(urlMax);

  // Temporary values (for user selection before applying)
  const [tempMin, setTempMin] = useState(urlMin);
  const [tempMax, setTempMax] = useState(urlMax);
  const [minInput, setMinInput] = useState(urlMin);
  const [maxInput, setMaxInput] = useState(urlMax);

  // Handle slider change
  const handleMinChange = (e) => {
    let value = Number(e.target.value);
    if (value >= minPrice && value < tempMax) {
      setTempMin(value);
      setMinInput(value);
    }
  };

  const handleMaxChange = (e) => {
    let value = Number(e.target.value);
    if (value <= maxPrice && value > tempMin) {
      setTempMax(value);
      setMaxInput(value);
    }
  };

  // Handle input change
  const handleMinInputChange = (e) => setMinInput(e.target.value);
  const handleMaxInputChange = (e) => setMaxInput(e.target.value);

  // Validate on blur
  const handleMinBlur = () => {
    let value = Number(minInput);
    if (!isNaN(value) && value >= minPrice && value < tempMax) {
      setTempMin(value);
    } else {
      setMinInput(tempMin);
    }
  };

  const handleMaxBlur = () => {
    let value = Number(maxInput);
    if (!isNaN(value) && value <= maxPrice && value > tempMin) {
      setTempMax(value);
    } else {
      setMaxInput(tempMax);
    }
  };

  // Apply selected values to the URL when clicking "Apply"
  const applyFilter = () => {
    setMin(tempMin);
    setMax(tempMax);
  
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set("min_price", tempMin);
      newParams.set("max_price", tempMax);
      return newParams;
    });
  };

  // Reset filter (removes min_price and max_price from URL params)
  const resetFilter = () => {
    setTempMin(minPrice);
    setTempMax(maxPrice);
    setMinInput(minPrice);
    setMaxInput(maxPrice);
    setMin(minPrice);
    setMax(maxPrice);

    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.delete("min_price");
      newParams.delete("max_price");
      return newParams;
    });
  };

  return (
    <section className="w-full mx-auto py-5 border-b">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-quicksand font-bold">Price Range</h2>
        <div className="flex gap-2">
          <button
            onClick={resetFilter}
            className="bg-gray-500 text-white text-xs px-3 py-1 rounded hover:bg-gray-600"
          >
            Reset
          </button>
          <button
            onClick={applyFilter}
            className="bg-blue-600 text-white text-xs px-3 py-1 rounded hover:bg-blue-700"
          >
            Apply
          </button>
        </div>
      </div>

      {/* Slider Container */}
      <div className="slider-container">
        <div className="slider-track"></div>
        <div
          className="progress-bar"
          style={{
            left: `${((tempMin - minPrice) / (maxPrice - minPrice)) * 100}%`,
            width: `${((tempMax - tempMin) / (maxPrice - minPrice)) * 100}%`,
          }}
        ></div>

        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={tempMin}
          onChange={handleMinChange}
          className="slider slider-left"
        />

        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={tempMax}
          onChange={handleMaxChange}
          className="slider slider-right"
        />
      </div>

      {/* Editable Input Fields */}
      <div className="flex items-center gap-2 justify-center mt-3">
        <input
          type="number"
          value={minInput}
          min={minPrice}
          max={tempMax - 1}
          onChange={handleMinInputChange}
          onBlur={handleMinBlur}
          className="p-1 w-28 border border-gray-300 rounded text-sm text-center outline-none"
        />

        <span className="text-lg text-gray-600">-</span>

        <input
          type="number"
          value={maxInput}
          min={tempMin + 1}
          max={maxPrice}
          onChange={handleMaxInputChange}
          onBlur={handleMaxBlur}
          className="p-1 w-28 border border-gray-300 rounded text-sm text-center outline-none"
        />
      </div>
    </section>
  );
}
