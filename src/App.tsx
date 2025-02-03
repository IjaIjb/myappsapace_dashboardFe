import React, { Suspense } from 'react';
// import logo from './logo.svg';
import { Route } from "react-router-dom";
import routes from './routes/Index';
import { Routes } from 'react-router-dom';

function App() {
  return (
    <div className="">
            <Suspense fallback={<div>Loading...</div>}>
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
