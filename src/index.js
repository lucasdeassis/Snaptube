import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './components/App';
import { createStore } from 'redux';
import rootReducer from './reducers/index';
import { Provider } from 'react-redux';

let store = createStore(rootReducer)

render(
  <Provider store={store}>
    <App />
  </Provider >,
  document.getElementById('root'));
