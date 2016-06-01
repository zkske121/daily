import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import configureStore from './store/configureStore'

const list = new Array(10).toString().split(',').map((v, i) => i + 1).sort(() => Math.random() > 0.5);
var tmp = list.slice();
const actions = [];

console.log(tmp);

for(var i = 0; i < tmp.length; i++) {
    for(var j = i + 1; j < tmp.length; j++) {
        if(tmp[i] > tmp[j]) {
           tmp = exchange(tmp, i, j);
           actions.push({
           	type: 'change',
           	index: i,
           	change: j
           });
        }
    }
}
console.log(tmp);

const initialState = {
	list: list.map((v, i) => {
    return {
      left: i * 70,
      height: v * 50,
      top: 500 - v * 50
    }
  })
};

const store = configureStore(initialState)

const timer = setInterval(() => {
	if(!actions.length) {
		clearInterval(timer); 
	} else {
		store.dispatch(actions.shift());
	}
}, 1000);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

function exchange(ary, i, j) {
    const res = ary.slice(),
            tmpI = res[i],
            tmpJ = res[j];

    res[i] = tmpJ;
    res[j] = tmpI;

    return res; 
}