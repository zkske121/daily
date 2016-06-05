import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as action from '../actions'
import { bindActionCreators } from 'redux'
import { Row, Col, Menu, Icon, SubMenu, MenuItemGroup, Spin, QueueAnim } from 'antd'
import Add from '../components/Add'
import Edit from '../components/Edit'
import Home from '../components/Home'
import List from '../components/List'
import warrperContainer from '../hoc/warrperContainer'

import '../style/home.css'
import 'antd/dist/antd.css';

class App extends Component {
  resetHeight(height) {
    const container = React.findDOMNode(this.refs.container);
    container.style.height = `${height}px`;
  }

  render() {
    const {setHash} = this.props.actions;
    const {route} = this.props;
    let container;

    switch(route) {
      case 'home':
        container = Home;
        break;
      case 'add':
        container = Add;
        break;
      case 'edit':
        container = Edit;
        break;
      case 'list':
        container = List;
        break;
      default:
        container = Home;
    }

    const Page = warrperContainer(container);
    const tpl = <Page key={route} resetHeight={this.resetHeight.bind(this)} {...this.props} />;

    return (
        <div>
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
              <Col offset={2} span={20} >
                <Spin spinning={this.props.reqState == 'loading'} >
                  <QueueAnim leaveReverse={true} className='container' ref='container' type={['right','top']}>
                      {this.props.reqState != 'fail' ? tpl : '数据加载失败,请重试!'}
                  </QueueAnim>
                </Spin>
              </Col>
            </Row>
            <footer className='footer'>
              <h2>此demo仅供个人学习使用  <a target='_blank' href='https://github.com/zkske121/daily/tree/master/demo/redux-react-director3'>源码</a>
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

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(action, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
