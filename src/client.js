/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import {Provider} from 'react-redux';
import { Router } from 'react-router';
import { browserHistory } from 'react-router';
import getRoutes from './routes';

const dest = document.getElementById('content');

const rootReducer = (ss) => ss;
const store = createStore(rootReducer, window.__data);

ReactDOM.render(
  <Provider store={store} key="provider">
    <Router history={browserHistory}>{getRoutes()}</Router>
  </Provider>,
  dest
);

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger

  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}
