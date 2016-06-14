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
			<h3>路由是由redux管理，使用<a href='https://github.com/flatiron/director' target='_blank'>director.js</a>实现</h3>,
			<h3>异步请求使用redux-thunk方式</h3>,
			<h3>组件使用第三方<a href='http://ant.design' target='_blank'>ant.design</a></h3>,
			<h3>动画使用<a href='https://github.com/twitter-fabric/velocity-react' target='_blank'>velocity-react</a></h3>
		];
	}

	// 逐条添加描述，有动画效果
	componentDidMount() {
		const timer = window.setInterval(() => {
			var {data, index} = this.state;
			
			if(index == this.describeList.length) {
				window.clearInterval(timer);
				return;
			}

			data.push(this.describeList[index]);

			this.setState({
				index: ++index,
				data: data
			})
		}, 900);
	}

	render() {
		const enterAnimation = velocityHelpers.registerEffect({
			  defaultDuration: 750,
			  calls: [
			      [ { opacity: [ 1, 0 ], translateX: [ 30, -1250 ] }, 0.60, { easing: "easeOutCirc" } ],
			      [ { translateX: -10 }, 0.20 ],
			      [ { translateX: 0 }, 0.20 ]
			  ]
		  });

		const leaveAnimation = velocityHelpers.registerEffect({
		  defaultDuration: 850,
          calls: [
              [ { opacity: [ 0, 1 ], transformOriginX: [ "50%", "100%" ], transformOriginY: [ "100%", "100%" ], scaleX: 0, scaleY: 0, translateX: -700, translateZ: 0 } ]
          ],
          reset: { transformOriginX: "50%", transformOriginY: "50%", scaleX: 1, scaleY: 1, translateX: 0 }
		});

		return (
				<div style={{textAlign:'center', paddingBottom: 50}}>
					<h2 style={{margin:'50px 0'}}>一个简单的使用redux-react实现的demo</h2>
					<VelocityTransitionGroup component='div' enter={enterAnimation} leave={leaveAnimation} runOnMount='true' >
						{this.state.data}
					</VelocityTransitionGroup>
				</div>
			);
	}
}