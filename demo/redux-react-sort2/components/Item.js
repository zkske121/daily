import React, { Component, PropTypes } from 'react'

export default class Item extends Component {
	render() {
		const {left, height, top} = this.props;

		var styleObj = {
			left,
			height,
			top
		};
		return (
			<span className = 'item' style = {styleObj} >
			</span>
		);
	}
}