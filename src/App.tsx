import React, { Suspense, useEffect, useState } from 'react';
// import logo from './logo.svg';
import { Route } from "react-router-dom";
import routes from './routes/Index';
import { Routes } from 'react-router-dom';
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import LoadingSpinnerPage from './components/UI/LoadingSpinnerPage';

function App() {
  const [openLoader, setOpenLoader] = useState(true);

  useEffect(() => {
    // Close the loader when the component is loaded
    const timer = setTimeout(() => setOpenLoader(false), 1000); // Simulating a delay
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="">
            <Suspense fallback={
              <Modal
        classNames={{
          modal: "rounded-[10px] bg-primary overflow-visible relative",
        }}
        open={openLoader}
        onClose={() => setOpenLoader(false)}
        showCloseIcon={false} // Hides the close button
        center
      >
        <div className="px-2  md:px-5 w-[100px] h-[100px] flex justify-center items-center text-center">
          <LoadingSpinnerPage />
        </div>
      </Modal>
            }>
        <Routes>
          {routes.map((route: any, i: number) =>
            route.component ? (
              <Route key={i} path={route.path} element={<route.component />} />
            ) : null
          )}
        </Routes>
      </Suspense>
     {/* <Suspense >
        <Routes>
          {routes.map((route: any, i: any) => {
            return route.component ? (
              <Route
                key={i}
                exact={true}
                path={route.path}
                render={(props: any) => <route.component {...props} />}
              />
            ) : null;
          })}
        </Routes>
      </Suspense> */}
   
    </div>
  );
}

export default App;
