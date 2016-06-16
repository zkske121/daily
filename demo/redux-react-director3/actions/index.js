import Types from '../constants'

export function setRoute(value) {
	return {
		type: Types.ROUTE_SET,
		route: value
	}
}

export function setHash(value) {
	return {
		type: Types.ROUTE_HASH,
		route: value
	}
}

export function setReqState(value) {
	return {
		type: Types.REQ_STATE,
		value: value
	}
}

export function addUser({name, sex, birthday, phone, eat, sleep, beat}) {
	return {
		type: Types.USER_ADD,
		user: {
			name,
			sex,
			birthday,
			phone,
			eat,
			sleep,
			beat
		}
	}
}

export function updateUser({uId, name, sex, birthday, phone, eat, sleep, beat}) {
	return {
		type: Types.USER_UPDATE,
		user: {
			uId,
			name,
			sex,
			birthday,
			phone,
			eat,
			sleep,
			beat
		}
	}
}

export function findByUId(uId) {
	return {
		type: Types.USER_FIND,
		uId
	}
}

export function deleteUser(uId) {
	return {
		type: Types.USER_DELETE,
		uId
	}
}

export function fetchPosts(data) {
  return (dispatch, getState) => {
    dispatch(setReqState('loading'));

    var promise = new Promise(function (resolve, reject) {
 		setTimeout(function() {
 			resolve(data);
 		}, 3000);
  	});

  	promise.then(function(res) {
  		dispatch(setReqState('success'));
    });

    return promise;
  }
}