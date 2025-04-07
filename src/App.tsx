import React, { Suspense } from 'react';
// import logo from './logo.svg';
import { Route } from "react-router-dom";
import routes from './routes/Index';
import { Routes } from 'react-router-dom';
// import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
// import LoadingSpinnerPage from './components/UI/LoadingSpinnerPage';

function App() {
  // const [openLoader, setOpenLoader] = useState(true);

  // useEffect(() => {
  //   // Close the loader when the component is loaded
  //   const timer = setTimeout(() => setOpenLoader(false), 1000); // Simulating a delay
  //   return () => clearTimeout(timer);
  // }, []);
  
  return (
    <div className="">
            <Suspense fallback={
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary"></div>
        </div>
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
