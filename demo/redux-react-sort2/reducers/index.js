import { combineReducers } from 'redux' 

function list(state = [], action) {
	switch(action.type) {
		case 'change':
			const {index, change} = action;
			const res = state.map(v => Object.assign({}, v));

			const indexItem = res.find(v => v.index == index);
			const changeItem = res.find(v => v.index == change);
			const tmp = Object.assign({}, changeItem);

			changeItem.left = indexItem.left;
			changeItem.index = indexItem.index;

			indexItem.left = tmp.left;
			indexItem.index = tmp.index;

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
