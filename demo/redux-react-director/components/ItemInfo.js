import React, { Component, PropTypes } from 'react'

export default class ItemInfo extends Component {
	render() {
		var {info} = this.props;
		return <div>
			<ul>
				{info ? Object.keys(info).map(function(attr) {
					return <li>{attr} : {info[attr]}</li>;
				}) : '查无记录'}
			</ul>
		</div>;
	}
}