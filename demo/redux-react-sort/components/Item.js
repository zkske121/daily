import React, { Component, PropTypes } from 'react'

export default class Item extends Component {
	render() {
		
		var styleObj = {
			left: this.props.index * 70,
			height: this.props.height * 50,
			top: 500 - this.props.height * 50
		};
		return (
			<span className = 'item' style = {styleObj} >
			</span>
		);
	}
}