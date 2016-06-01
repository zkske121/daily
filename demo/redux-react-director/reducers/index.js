import { combineReducers } from 'redux' 
import { setPath }  from '../route'

function route(state = 'home', action) {
	switch(action.type) {
		case 'setRoute': 
			return action.route;
		case 'setHash':
			setPath('\/' + action.route);
			return state;
		default:
			return state;
	}
}

function list(state = [], action) {
	switch(action.type) {
		case 'add':
			var result = state.slice();
			var row = Object.assign({}, action.row, {
				id: state.length + 1
			});
				result.push(row);
			return result;
		default:
			return state;
	}
}

function select(state = '1', action) {
	switch(action.type) {
		case 'select': 
			return action.select;
		default:
			return state;
	}
}

const rootReducer = combineReducers({
  route,
  list,
  select
});

export default rootReducer
