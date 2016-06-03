import React, { Component } from 'react'
import Edit from './Edit'

class Add extends Component {
	render() {
		return <Edit {...this.props} isAdd={true} />
	}
}

export default Add;