import React, { Suspense, useEffect, useState } from "react";
import ApiService from "../../../../../services/ApiService";

const HomeSkeleton = React.lazy(() => import('../../skeletons/Home/HomeSkeleton'));
const PolicyCards = React.lazy(() => import('../Policies/PolicyCards'));
const Category = React.lazy(() => import('./Category'));
const Brands = React.lazy(() => import('./Brands'));
const PromotionalCards = React.lazy(() => import('./PromotionalCards'));
const CustomerTestimonials = React.lazy(() => import('./CustomerTestimonials'));
const Newsletter = React.lazy(() => import('./Newsletter'));
const Banner = React.lazy(() => import('../../layouts/extensions/Banner'));
const AllProducts = React.lazy(() => import('../Products/AllProducts'));
const DynamicProductsLists = React.lazy(() => import('../Products/DynamicProductsLists'));
 
function Content() {

  const [dynamicSectionProducts, setDynamicSectionProducts] = useState([]);
  const [AllSectionLoading, setAllSectionLoading] = useState(false);

  const api = new ApiService();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setAllSectionLoading(true)
        const response = await api.getWithOutToken('/{store_code}/products/getAllSection', {});
        setDynamicSectionProducts(response.data);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }finally{
        setAllSectionLoading(false)
      }
    };
 
    fetchProducts();
  }, []);


  return (
    <Suspense fallback={<HomeSkeleton />}>
      <div className='w-full'>

        {/* Banner loads immediately */}
        <div className="banner">
          <Banner />
        </div>

        {/* Category loads immediately */}
        {/* <div className="category">
          <Category />
        </div> */}


        <div className='popularProducts'>
          <AllProducts />
        </div>

        {/* Display home dynamic sections */}
      {AllSectionLoading ? (
        <div className="flex justify-center items-center py-10">
          <span className="animate-spin h-8 w-8 border-4 border-gray-300 border-t-gray-800 rounded-full"></span>
        </div>
      ) : (
        dynamicSectionProducts
          .filter((section) => section.products && section.products.length > 0) // Exclude empty product arrays
          .map((section) => (
            <DynamicProductsLists 
              key={section.section.section_name} 
              sectionDetails={section.section} 
              products={section.products} 
            />
          ))
      )}

<div>
  <PromotionalCards />
</div>


<div>
  <CustomerTestimonials />
</div>
<div>
  <Brands />
</div>

<div>
  <Newsletter />
</div>
        {/* Policy Cards load immediately */}
        {/* <div className="policyCards">
          <PolicyCards />
        </div> */}

        </div>
    </Suspense>
    
  );
}

export default Content;
