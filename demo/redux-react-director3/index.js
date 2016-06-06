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
			uId: 0,
			name: 'zenki',
			sex: 1,
			birthday: new Date(),
			eat: true,
			sleep: true,
			beat: true,
			phone: 13333333333
		},
		{
			uId: 1,
			name: 'zen',
			sex: 0,
			birthday: new Date('2016-06-03'),
			eat: false,
			sleep: false,
			beat: true,
			phone: 13333322222
		},
		{
			uId: 2,
			name: 'zk',
			sex: 1,
			birthday: new Date('2016-06-06'),
			eat: true,
			sleep: true,
			beat: false,
			phone: 11111111111
		},
		{
			uId: 3,
			name: 'ki',
			sex: 0,
			birthday: new Date('2016-06-03'),
			eat: true,
			sleep: true,
			beat: true,
			phone: 22222222222
		},
		{
			uId: 4,
			name: 'kkk',
			sex: 1,
			birthday: new Date('2016-06-06'),
			eat: false,
			sleep: false,
			beat: false,
			phone: 33333333333
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
