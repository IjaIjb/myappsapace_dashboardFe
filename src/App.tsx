import React, { Suspense } from 'react';
// import logo from './logo.svg';
import { Route, Switch } from "react-router-dom";
import routes from './routes/Index';

function App() {
  return (
    <div className="">
     <Suspense>
        <Switch>
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
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
