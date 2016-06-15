import React, { Component } from 'react'
import { VelocityTransitionGroup, velocityHelpers } from 'velocity-react'

import 'velocity-animate/velocity.ui'

export default class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			index: 0,
			data: []
		}
		this.describeList = [
			<h3 key='0'>路由是由redux管理，使用<a href='https://github.com/flatiron/director' target='_blank'>director.js</a>实现</h3>,
			<h3 key='1'>异步请求使用redux-thunk方式</h3>,
			<h3 key='2'>组件使用第三方<a href='http://ant.design' target='_blank'>ant.design</a></h3>,
			<h3 key='3'>动画使用<a href='https://github.com/twitter-fabric/velocity-react' target='_blank'>velocity-react</a></h3>
		];
		this.timer = null;
	}

	// 逐条添加描述，有动画效果
	componentDidMount() {
		this.timer = window.setInterval(() => {
			var {data, index} = this.state;
			
			if(index >= this.describeList.length) {
				window.clearInterval(this.timer);
				return;
			}

			data.push(this.describeList[index]);

			this.setState({
				index: ++index,
				data: data
			})
		}, 900);
	}

	// 组件销毁时必须要清除定时器，否则在添入条目时切换tab，则定时器无法清除
	componentWillUnmount() {
		window.clearInterval(this.timer);
	}

	render() {
		// 动画可在velocity-animate/velocity.ui.js Velocity.RegisterEffect.packagedEffects中查看，使用key值即可
		return (
				<div style={{textAlign:'center', paddingBottom: 50}}>
					<h2 style={{margin:'50px 0'}}>一个简单的使用redux-react实现的demo</h2>
					<VelocityTransitionGroup component='div' enter='transition.bounceLeftIn' leave='transition.bounceLeftOut' runOnMount='true' >
						{this.state.data}
					</VelocityTransitionGroup>
				</div>
			);
	}
}