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

export function addItem(name, age) {
	return {
		type: 'add',
		row: {
			name: name,
			age: age
		}
	}
}

export function select(id) {
	return {
		type: 'select',
		select: id
	}
}