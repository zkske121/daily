import React, { Component, PropTypes } from 'react'

export default class ItemList extends Component {
	_getInfo(id) {
		 this.props.setHash('item\/' + id);
	}

	render() {
		return <div>
			<table>
				<tbody>
					<tr>
						<th>id</th>
						<th>name</th>
						<th>age</th>
						<th>options</th>
					</tr>
					{this.props.list.map(row => {
						return <tr>
							<td>{row.id}</td>
							<td>{row.name}</td>
							<td>{row.age}</td>
							<td><button onClick = {this._getInfo.bind(this, row.id)}>info</button></td>
						</tr>
					}, this)}
				</tbody>
			</table>
		</div>;
	}
}