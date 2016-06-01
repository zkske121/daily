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

function reqState(state = 'success', action) {
	switch(action.type) {
		case 'reqState':
			return action.value;
		default:
			return state;
	}
}

const rootReducer = combineReducers({
  route,
  reqState
});

export default rootReducer
