import React, { Suspense, useState, useEffect } from 'react'
import OverlaySpinner from '../../../extensions/OverlaySpinner';
import FadeTransition from '../../../extensions/FadeTransition';
import LayoutSkeleton from '../../../layouts/skeletons/LayoutSkeleton';
import useUser from '../../../../features/hooks/useUser';
import { useLoading } from '../../../../features/hooks/useLoading';
import { useLayout } from '../../../../features/hooks/useLayout';
import Header from './extensions/Header';
import Footer from './extensions/Footer';
import Subscribe from './extensions/Subscribe';



const MainLayout = ({ children }) => {
  const {
    pageName,
    urlLocation,
    banner: PageBanner,
    skeletonLoading,
    isSideBarOpen,
    setSideBarStatus,
    setLayoutScreenWidth,
    skeleton: Skeleton
  } = useLayout();

  const { isRequestLoading } = useLoading();
  const { profile } = useUser();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Determine current page and set dynamic page name
  const currentPage = urlLocation?.currentPage;
  const pageNameNew = currentPage === "/profile" ? `${profile?.first_name || ''} ${profile?.last_name || ''}` : pageName;

  // Handle sidebar behavior and window resize events
  useEffect(() => {
    const isMobile = window.innerWidth <= 1024;
    setSideBarStatus(isMobile);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setLayoutScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setSideBarStatus, setLayoutScreenWidth]);

  // Toggle Sidebar
  const toggleSidebar = () => setSideBarStatus(!isSideBarOpen);

  return (
    <Suspense fallback={<LayoutSkeleton />}>
      <FadeTransition className="flex grow">
        <div className='h-full w-full'>
          <div className='pb-4'>
            <Header />
          </div>

          {isRequestLoading ? <OverlaySpinner /> : ""}

          <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-0">
            {
              skeletonLoading ? <Skeleton /> : <>
                {children}
              </>
            }

          </div>

          <div className='pt-5'>
            <Footer />
          </div>

        </div>

      </FadeTransition>
    </Suspense>
  );
};

export default MainLayout;
