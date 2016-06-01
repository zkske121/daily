import React, { Component, PropTypes } from 'react'

export default class AddItem extends Component {
	_add() {
		var name = this.refs.name.value;
		var age = this.refs.age.value;

		if(name == '' || age == '') {
			console.log('请正确填写!')
			return;
		}

		this.props.actions.addItem(name, age);
		this.props.actions.setHash('list');
	}

	render() {
		return <div>
			<input ref = 'name' type = 'text' placeholder = 'please input your name' /><br />
			<input ref = 'age' type = 'text' placeholder = 'please input your age' /><br />
			<button onClick = {this._add.bind(this)}>添加</button>
		</div>;
	}
}