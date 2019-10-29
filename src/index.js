import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { App } from 'views/App';
import configureStore from 'state/store';

import 'views/css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import 'views/css/react-grid-override.css';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App store={store} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app-root')
)
