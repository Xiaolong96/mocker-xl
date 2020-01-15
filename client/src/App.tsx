/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import MainLayout from 'components/main-layout';
import NoMatch from 'views/no-match';
import { RouteConfig } from 'react-router-config';
import routes from './router';

function App() {
  return (
    <div className="App">
      <Router>
        <MainLayout>
          <Switch>
            {routes.map((route: RouteConfig, i: number) => (
              <Route
                key={route.key || i}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            ))}
            <Route component={NoMatch} />
          </Switch>
        </MainLayout>
      </Router>
    </div>
  );
}

export default App;
