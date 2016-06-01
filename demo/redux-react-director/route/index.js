import { Router } from 'director'
import { setRoute, select } from '../actions'

var instance;

export function setPath(path) {
	instance.setRoute(path);
}

export function setStore(store) {
	instance = Router({
		'/(\\w+)\?|$': word => {word && word.length && store.dispatch(setRoute(word))},
		'/item/:id':id => {
			store.dispatch(select(id));
			store.dispatch(setRoute('item'));
		}
	}).init();
}