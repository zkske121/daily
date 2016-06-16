import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as action from '../actions'
import { bindActionCreators } from 'redux'
import { Row, Col, Menu, Icon, SubMenu, MenuItemGroup, Spin } from 'antd'
import Add from '../components/Add'
import Edit from '../components/Edit'
import Home from '../components/Home'
import List from '../components/List'
import warrperContainer from '../hoc/warrperContainer'
import { VelocityComponent, VelocityTransitionGroup, velocityHelpers } from 'velocity-react'
import 'velocity-animate/velocity.ui'

import '../style/home.css'
import 'antd/dist/antd.css';

class App extends Component {
  // 因布局因素，需根据容器内容高度，重置容器高度
  resetHeight(height) {
     const container = React.findDOMNode(this.refs.container);
     container.style.height = `${height}px`;
  }

  render() {
    const {setHash} = this.props.actions;
    var {route} = this.props;
    let container;

    // 匹配不到路由时，默认为home
    if(!route in pages) route = 'home';

    const Page = pages[route];
    const tpl = <Page key={route} {...this.props} resetHeight={this.resetHeight.bind(this)} />;


    const enterAnimation = velocityHelpers.registerEffect({
      defaultDuration: 700,
      calls: [
          [ { opacity: [ 1, 0 ], transformPerspective: [ 800, 800 ], rotateY: [ 0, -55 ] } ]
      ],
      reset: { transformPerspective: 0 }
    });

    const leaveAnimation = velocityHelpers.registerEffect({
      defaultDuration: 700,
      calls: [
          [ { opacity: [ 0, 1 ], transformPerspective: [ 800, 800 ], rotateY: 55 } ]
      ],
      reset: { transformPerspective: 0, rotateY: 0 }
    });

    return (
        <div >
            <Row className='header'>
              <Col span={20} offset={2}>
                <h2 className='logo'><Icon type="appstore" /> CMS / 人员信息录入平台</h2> 
                <Menu 
                    onClick = {e => setHash(e.key)}
                    selectedKeys={[route]}
                    id='nav'
                    mode="horizontal">
                    <Menu.Item  key="home" >
                      <Icon type="home" />首页
                    </Menu.Item>
                    <Menu.Item  key="add">
                      <Icon type="plus-circle-o" />新增用户
                    </Menu.Item>
                    <Menu.Item  key='edit' disabled>
                      <Icon type="edit" />编辑用户
                    </Menu.Item>
                    <Menu.Item  key="list">
                      <Icon type="bars" />用户列表
                    </Menu.Item>
                </Menu>
              </Col>
            </Row>
            <Row>
              <Col offset={2} span={20}>
                <Spin spinning={this.props.reqState == 'loading'} >
                    <VelocityTransitionGroup ref='container' component='div' enter={enterAnimation} leave={leaveAnimation} runOnMount='true' className='container'>
                      {this.props.reqState != 'fail' ? tpl : '数据加载失败,请重试!'}
                    </VelocityTransitionGroup>
                </Spin>
              </Col>
            </Row>
            <footer className='footer'>
              <h2>此demo仅供个人学习使用  
                  <a target='_blank' href='https://github.com/zkske121/daily/tree/master/demo/redux-react-director3'>源码地址</a>
              </h2>
            </footer>
        </div>
      )
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
  route: PropTypes.string.isRequired
} 

// 初始化组件，包装设置容器高度方法
const routComponents = {Home, Edit, List, Add};
const pages = Object.keys(routComponents)
                    .reduce( (p, n) => (p[n.toLowerCase()] = warrperContainer(routComponents[n]), p), {});                   

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(action, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
