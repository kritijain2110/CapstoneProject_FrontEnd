import React from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import './index.css';

import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'
import App from './App';

import App from './App';

//render(
//<App />, document.getElementById('root'));
ReactDOM.render(

  <BrowserRouter>
    <App />
  </BrowserRouter>,
    document.getElementById('root')
);


