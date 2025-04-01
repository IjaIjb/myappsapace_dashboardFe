import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import FilterSection from './FilterSection';
import MainContent from './MainContent';
import { useDynamicData } from '../../../../../features/hooks/useDynamicData';
import useProduct from '../../../../../features/hooks/useProduct';
import { useLoading } from '../../../../../features/hooks/useLoading';
import ViewCatalogSkeleton from '../../skeletons/Catalog/ViewCatalogSkeleton';
import SectionDetails from './Extral/SectionDetails';

function ViewCatalog() {
  const { dynamicData, setDynamicDataValue } = useDynamicData();
  const { fetchProductsDynamic } = useProduct();
  const location = useLocation();
  const { setLoading } = useLoading();

  const [allProductsData, setAllProductsData] = useState(null);

  const [params, setParams] = useState({});
  const [baseRoute, setBaseRoute] = useState(""); // Stores the main route type
  const [slug, setSlug] = useState(null); // Stores the category/section slug if applicable

  const requestFirstLoaded = dynamicData?.catalog?.requestFirstLoaded || false;
  const [showSkeleton, setShowSkeleton] = useState(!requestFirstLoaded); // Show skeleton only if it's first load

  /**
   * Extract query parameters and path segments dynamically
   */
  useEffect(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const searchParams = new URLSearchParams(location.search);
    let extractedParams = {};
    let routeType = "";
    let extractedSlug = null;
  
    if (pathSegments.length > 0) {
      routeType = `/${pathSegments[0]}`;
  
      if (routeType === "/c" || routeType === "/s") {
        extractedSlug = pathSegments[1] || null;
      }
  
      extractedParams = {
        ...pathSegments.slice(extractedSlug ? 2 : 1).reduce((acc, val, index) => ({
          ...acc,
          [`param${index + 1}`]: val
        }), {})
      };
    }
  
    for (let [key, value] of searchParams.entries()) {
      extractedParams[key] = value;
    }
  
    // ✅ Ensure paginate: 1 for `/s` routes
    if (routeType === "/s") {
      extractedParams.paginate = 1;
    }
  
    setBaseRoute(routeType);
    setSlug(extractedSlug);
    setParams(extractedParams);
  }, [location.search, location.pathname]);
  

  useEffect(() => {
    if (slug !== undefined) {
      setDynamicDataValue("catalog.requestFirstLoaded", false); // Reset request state
    }
  }, [slug]);

  
  /**
   * Fetch product data when the page loads (first time)
   */
  useEffect(() => {
    if (baseRoute && slug !== undefined && !requestFirstLoaded) {
      fetchProductsDynamic(baseRoute.replace("/", ""), slug, params, {
        onBefore: () => setShowSkeleton(true),
        onSuccess: (data) => {
          setAllProductsData(data);
          setDynamicDataValue("catalog.requestFirstLoaded", true);
        },
        onFinally: () => setShowSkeleton(false),
      });
    }
  }, [baseRoute, slug]); // <-- Added slug as dependency
  

  /**
   * Fetch product data again when query params change (without showing skeleton)
   */
  useEffect(() => {
    if (baseRoute) {
      fetchProductsDynamic(baseRoute.replace("/", ""), slug, { ...params }, {
        onBefore: () => setLoading(true),
        onSuccess: (data) => setAllProductsData(data),
        onFinally: () => setLoading(false),
      });
    }
  }, [JSON.stringify(params)]);

  return (
    <div className="w-full">
      {showSkeleton ? (
        <ViewCatalogSkeleton /> // Show skeleton on the first load
      ) : (
        <>
          {
            <SectionDetails details={allProductsData?.category || allProductsData?.section} />
          }
          <div className="flex gap-4 justify-between items-start">
            <FilterSection />

            <MainContent allProductsData={allProductsData} />
          </div>
        </>
        
      )}
    </div>
  );
}

export default ViewCatalog;
