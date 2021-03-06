import React from 'react';
import Main from '../components/Main';
import Home from '../components/Home';

import UsersContainers from '../components/users/UsersContainers';
import ConfigurationsContainers from '../components/configurations/ConfigurationsContainers';

import { IndexRoute, Router, Route, browserHistory } from 'react-router';

export default (
  <Router history={browserHistory}>
    <Route name="app" path="/" component={Main}>

    	<IndexRoute name="home" component={Home}/>

      <Route name='users' path='/users' component={UsersContainers} />
      <Route name='configs' path='/configs' component={ConfigurationsContainers} />
    </Route>
  </Router>
);