import { combineReducers } from 'redux' 
import { setPath }  from '../route'
import Types from '../constants'

let count = 100;

function route(state = 'home', action) {
	switch(action.type) {
		case Types.ROUTE_SET:
			return action.route;
		case Types.ROUTE_HASH:
			// 只改变hash值，由director触发事件，改变route
			setPath('\/' + action.route);
			return state;
		default:
			return state;
	}
}

function reqState(state = 'success', action) {
	switch(action.type) {
		case Types.REQ_STATE:
			return action.value;
		default:
			return state;
	}
}

function userList(state = [], action) {
	const ary = state.slice();
	let index;

	switch(action.type) {
		case Types.USER_ADD:
			ary.push(Object.assign({uId: count++}, action.user));
			return ary;
		case Types.USER_UPDATE:
			index = ary.findIndex(u => u.uId == action.user.uId);
			ary.splice(index, 1, Object.assign({}, action.user));

			return ary;
		case Types.USER_DELETE:
			index = ary.findIndex(u => u.uId == action.uId);
			ary.splice(index, 1);
			return ary;
		default:
			return state;
	}
}

function userId(state = -1, action) {
	switch(action.type) {
		case Types.USER_FIND:
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
