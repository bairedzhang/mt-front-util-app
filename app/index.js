import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
import './app.css';
const PROJECT = 'project';
const GLOBAL = 'global';
let projects = localStorage.getItem(PROJECT);
let global = localStorage.getItem(GLOBAL);
const store = configureStore({
  project: projects != 'undefined' ? JSON.parse(projects) : [],
  global: (global && global != 'undefined') ? JSON.parse(global) :
  {
    userName: '',
    proxyRoot: ''
  }
});

store.subscribe(function () {
  let project = store.getState().project;
  let global = store.getState().global;
  localStorage.setItem(PROJECT, JSON.stringify(project));
  localStorage.setItem(GLOBAL , JSON.stringify(global));
});

render(
  <Provider store={store}>
    <Router>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root')
);

if (process.env.NODE_ENV !== 'production') {
  // Use require because imports can't be conditional.
  // In production, you should ensure process.env.NODE_ENV
  // is envified so that Uglify can eliminate this
  // module and its dependencies as dead code.
  // require('./createDevToolsWindow')(store);
}
