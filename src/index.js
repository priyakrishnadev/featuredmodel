import 'babel-polyfill';
import React from 'react';
import {render} from "react-dom";
import configstore from './configstore';
import Root from './components/Root';
import {BrowserRouter as Router} from 'react-router-dom';

const store = configstore();
render(
  <Router>
    <Root store={store} />
  </Router>,
document.getElementById('root'));
