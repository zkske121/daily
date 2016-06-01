import { combineReducers } from 'redux' 

function exchange(ary, i, j) {
	const res = ary.slice(),
			tmpI = res[i],
			tmpJ = res[j];

	res[i] = tmpJ;
	res[j] = tmpI;

	return res; 
}

function list(state = [], action) {
	switch(action.type) {
		case 'change':
			const {index, change} = action;

			return exchange(state, index, change); 
		default:
			return state;
	}
}

function index(state = 0, action) {
	switch(action.type) {
		default: 
			return state;
	}
}

const rootReducer = combineReducers({
  list,
  index
});

export default rootReducer
