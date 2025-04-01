import React from 'react'
import FetchCategories from './Extral/FetchCategories'
import PriceRangeFilter from './Extral/PriceRangeFilter'
import DiscountFilter from './Extral/DiscountFilter'

function FilterSection() {
  return (
    <div className='w-1/4 bg-white p-4 rounded-md border shadow-sm'>
        {/* Display Categories */}
        <FetchCategories />
        
        {/* Price Rnage */}
        <PriceRangeFilter />

        {/* Discount percentage */}
        <DiscountFilter />
        
        {/* Popular Brands */}

        {/* Popular Tags */}

        {/* Small Ads Section */}
    </div>
  )
}

export default FilterSection