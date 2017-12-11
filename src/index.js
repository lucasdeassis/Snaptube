import React from 'react'
import { render } from 'react-dom'
import './index.css'
import App from './containers/App'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/index'
import { Provider } from 'react-redux'
import logger from 'redux-logger'
import ReduxPromise from 'redux-promise'

let store = createStore(
  rootReducer,
  applyMiddleware(ReduxPromise),
  applyMiddleware(logger)
)

render(
  <Provider store={store}>
    <App />
  </Provider >,
  document.getElementById('root'))
