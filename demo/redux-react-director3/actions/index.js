export function setRoute(value) {
	return {
		type:'setRoute',
		route: value
	}
}

export function setHash(value) {
	return {
		type:'setHash',
		route: value
	}
}

export function setReqState(value) {
	return {
		type:'reqState',
		value: value
	}
}

export function addUser({name, sex, birthday, phone, eat, sleep, beat}) {
	return {
		type:'add',
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
		type:'update',
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
		type: 'find',
		uId
	}
}

export function deleteUser(uId) {
	return {
		type:'delete',
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