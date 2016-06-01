import { combineReducers } from 'redux' 

function list(state = [], action) {
	switch(action.type) {
		case 'change':
			const {index, change} = action;

			const res = state.map(v => Object.assign({}, v));

			const tmp = res[index].left;

			res[index].left = res[change].left;
			res[change].left = tmp;

			return res; 
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
