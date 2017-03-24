import './index.css';
import './layout.css';

import React from 'react';
import ReactDOM from 'react-dom';

import App from '~/src/App';
import reducer from '~/src/App/reducers';

import { Provider } from 'react-redux'
import { createStore } from 'redux'
const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
