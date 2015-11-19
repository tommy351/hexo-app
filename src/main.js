import React, {createElement} from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import Root from './components/Root';
import {createHashHistory} from 'history';
import {Router, Route} from 'react-router';
import {syncReduxAndRouter} from 'redux-simple-router';

import App from './components/App';

const store = configureStore({});
const history = createHashHistory();
const routes = (
  <Route path='/' component={App}/>
);

syncReduxAndRouter(history, store);

render(
  createElement(Root, {store},
    createElement(Router, {routes, history})
  ), document.getElementById('root'));
