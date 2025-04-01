import React from 'react'
import BannerSkeleton from './BannerSkeleton'
import CategorySkeleton from './CategorySkeleton'
import ProductSkeleton from './ProductSkeleton'

function HomeSkeleton() {
  return (
    <div className=''>
        <BannerSkeleton />

        <CategorySkeleton />

        <ProductSkeleton />
    </div>
  )
}

export default HomeSkeleton