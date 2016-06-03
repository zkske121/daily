import { Router } from 'director'
import { setRoute, findByUId } from '../actions'

var instance;

export function setPath(path) {
	instance.setRoute(path);
}

export function setStore(store) {
	instance = Router({
		'/(\\w+)\?|$': word => {word && word.length && store.dispatch(setRoute(word))},
		'edit\/:uId': uId => {
			if(store.getState().userList.some(user => user.uId == uId)) {
				store.dispatch(findByUId(parseInt(uId)));
				store.dispatch(setRoute('edit'));
			} else {
				store.dispatch(setRoute('add'));
			}
		}
	}).init();
}