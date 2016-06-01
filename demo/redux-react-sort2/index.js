import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import configureStore from './store/configureStore'

const list = new Array(15).toString().split(',').map((v, i) => i + 1).sort(() => Math.random() > 0.5);

const initialState = {
	list: list.map((v, i) => {
    return {
      left: i * 70,
      height: v * 30,
      top: 500 - v * 30,
      index: i,
      value: v
    }
  })
};

const store = configureStore(initialState)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
