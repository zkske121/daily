import 'babel-polyfill'
import React,{ Component } from 'react'
import { render } from 'react-dom'


class App extends Component {
	constructor() {
		super();
		this.state = {
			source: [
				{
					name: 'zenki',
					checked: true
				},

				{
					name: 'ccc',
					checked: true
				},

				{
					name: 'aaa',
					checked: false
				}
			],
			target:[
				{
					name: 'www',
					checked: true
				},

				{
					name: '333',
					checked: false
				}
			],
			isChecked: false
		};
	}
	toggle() {
		this.setState({
			isChecked: !this.state.isChecked    
		});
	}
	selectAll() {
		var { isChecked, source, target } = this.state;
      
		if(!source.length) return;

		this.setState({
			target: target.concat(
						source.map(v => {
							v.checked = isChecked;
							return v;
						})
					),
			source: []
		});
	}
	cancel() {
		var { source, target } = this.state;

		if(!target.length) return;

		this.setState({
			source: source.concat(target),
			target: []
		});
	}
	choice(index, fromSource) {
		var { source, target, isChecked } = this.state;

		if(fromSource) {
			target = target.concat(source.splice(index, 1));
		} else {
			source = source.concat(target.splice(index, 1));
		}

		this.setState({
			source,
			target
		});
	}
	itemMap(ary, isSource) {
		return ary.map((v, index) => {
					return <li key={index}>
							<span onClick = {this.choice.bind(this, index, isSource)} >{v.name}</span> 
							<span onClick = {this.itemChioce.bind(this, index, v.checked, isSource)}>{v.checked ? '选中' : '不选'}</span>
						</li>
				});
	}
	itemChioce(index, checked, isSource) {
		this.state[ isSource ? 'source' : 'target'][index].checked = !checked;
		this.setState(this.state);
	}
	render() {
		let { isChecked, source, target } = this.state; 
		return (
		    <div >
		    	<button onClick = { this.selectAll.bind(this) }>down</button>
		    	<button style={{border: 'solid 1px ' + (isChecked ? 'red' : 'white') }} 
		    			onClick={ this.toggle.bind(this) }>{ isChecked ? '选中' : '不选' }
    			</button>
				<ul>
					{
						this.itemMap(source, true)
					}
				</ul>
				<div style={{width:'100%',border:'1px solid gray'}}></div>
				<button onClick = { this.cancel.bind(this) }>up</button>
				<ul>
					{
						this.itemMap(target)
					}
				</ul>
		    </div>
		  )
	}
}

App.propTypes = {
}              

render(
  	<App></App>,
  document.getElementById('root')
)