import React, { Component } from 'react'

export default class Home extends Component {
	render() {
		return (
				<div style={{textAlign:'center', paddingBottom: 50}}>
					<h2 style={{margin:'50px 0'}}>一个简单的使用redux-react实现的demo</h2>
					<h3>路由是由redux管理，使用<a href='https://github.com/flatiron/director' target='_blank'>director.js</a>实现</h3>
					<h3>异步请求使用redux-thunk方式</h3>
					<h3>组件使用第三方<a href='http://ant.design' target='_blank'>ant.design</a></h3>
					<h3>动画使用<a href='https://github.com/twitter-fabric/velocity-react' target='_blank'>velocity-react</a></h3>
				</div>
			);
	}
}