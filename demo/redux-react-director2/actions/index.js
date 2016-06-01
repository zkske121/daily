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

export function fetchPosts() {
  return (dispatch, getState) => {
    dispatch(setReqState('loading'));

    var promise = new Promise(function (resolve, reject) {
 		setTimeout(function() {
 			resolve();
 		}, 3000);
  	});

  	promise.then(function(res) {
    	dispatch(setHash('list'));
  		dispatch(setReqState('success'));
    });

    return promise;
  }
}