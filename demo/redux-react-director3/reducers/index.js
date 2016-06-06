import { combineReducers } from 'redux' 
import { setPath }  from '../route'

let count = 100;

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

function reqState(state = 'success', action) {
	switch(action.type) {
		case 'reqState':
			return action.value;
		default:
			return state;
	}
}

function userList(state = [], action) {
	const ary = state.slice();
	let index;

	switch(action.type) {
		case 'add':
			ary.push(Object.assign({uId: count++}, action.user));
			return ary;
		case 'update':
			index = ary.findIndex(u => u.uId == action.user.uId);
			ary.splice(index, 1, Object.assign({}, action.user));

			return ary;
		case 'delete':
			index = ary.findIndex(u => u.uId == action.uId);
			ary.splice(index, 1);
			return ary;
		default:
			return state;
	}
}

function userId(state = -1, action) {
	switch(action.type) {
		case 'find':
			return action.uId;
		default:
			return state;
	}
}

const rootReducer = combineReducers({
  route,
  reqState,
  userList,
  userId
});

export default rootReducer
