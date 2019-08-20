import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import ButtonPage from './containers/ButtonPage';
import LogPage from './containers/LogPage';
import ChartPage from './containers/ChartPage';
import StartPage from './containers/StartPage';
import StopPage from './containers/StopPage';

export default () => (
  <App>
    <Switch>
      <Route exact path={routes.BUTTON} component={ButtonPage} />
      <Route path={routes.LOG} component={LogPage} />
      <Route path={routes.CHART} component={ChartPage} />
      <Route path={routes.START} component={StartPage} />
      <Route path={routes.STOP} component={StopPage} />
    </Switch>
  </App>
);
