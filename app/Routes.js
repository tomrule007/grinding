import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import LogPage from './containers/LogPage';
import ChartPage from './containers/ChartPage';

export default () => (
  <App>
    <Switch>
      <Route path={routes.COUNTER} component={CounterPage} />
      <Route exact path={routes.HOME} component={HomePage} />
      <Route path={routes.LOG} component={LogPage} />
      <Route path={routes.CHART} component={ChartPage} />
    </Switch>
  </App>
);
