import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import configureStore from './store/configureStore'
import { setStore}  from './route'

const initState = {
	userList: [
		{
			uId: -1,
			name: 'zenki',
			sex: 1,
			birthday: new Date(),
			eat: true,
			sleep: true,
			beat: true,
			phone: 13333333333
		}
	]
}
const store = configureStore(initState);

setStore(store);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
