import { Suspense } from 'react';
import OverlaySpinner from '../../../extensions/OverlaySpinner';
import appConfig from '../../../../config/appConfig';
import { useLoading } from '../../../../features/hooks/useLoading';
import FadeTransition from '../../../extensions/FadeTransition';
import { useLayout } from '../../../../features/hooks/useLayout';
import useDocumentMeta from '../../../../features/hooks/useDocumentMeta';
import { NavLink } from 'react-router-dom';
import useStore from '../../../../features/hooks/useStore';

const AuthLayout = ({ children }) => {
  const { pageName, pageDescription } = useLayout();
  const { isRequestLoading } = useLoading();
  const { store } = useStore();

 
  useDocumentMeta({
    title: `${appConfig.appName} | ${pageName}`,
    description: pageDescription || '',
    twitterCard: 'summary_large_image',
    twitterTitle: `${appConfig.appName} | ${pageName}`,
    twitterDescription: pageDescription || '',
    twitterImage: '',
    faviconUrl: '',
  });
 
  return (
    <Suspense fallback={<OverlaySpinner />}>
      <FadeTransition className="">
        <div className="min-h-screen w-full overflow-auto"> {/* Changed h-screen to min-h-screen */}
          <div className="antialiased flex min-h-screen text-base text-gray-700 dark:bg-coal-500"> {/* Ensure min-h-screen */}
            {isRequestLoading && <OverlaySpinner />}

            {/* Main Container */}
            <div className="flex items-center justify-center grow bg-center bg-no-repeat page-bg overflow-auto"> {/* Added overflow-auto */}
              <div className="w-full flex justify-center flex-col items-center mx-auto px-4 py-8"> {/* Added padding to prevent content cutting off */}
                
                {/* Logo Section */}
                <div className="flex items-center justify-center p-4">
                  <NavLink to='/'>
                    <img src={`${store.store_logo || 'https://myappspace.net/images/logo%20(2).svg'}`} alt="Mart+ Logo" className="h-10 w-32 md:w-40" />
                  </NavLink>
                </div>

                {/* Children */}
                {children}

                {/* Footer Section */}

              </div>
            </div>
          </div>
        </div>
      </FadeTransition>
    </Suspense>
  );
};

export default AuthLayout;
