import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { setHash, fetchPosts } from '../actions'
import { bindActionCreators } from 'redux'
import { Row, Col, Menu, Icon, SubMenu, MenuItemGroup, Spin  } from 'antd'
import Add from '../components/Add'
import Edit from '../components/Edit'
import Home from '../components/Home'
import List from '../components/List'

import 'antd/dist/antd.css';

class App extends Component {
  render() {
    const {setHash} = this.props.actions;
    const {route} = this.props;

    const pages = {
      home: parent => <Home {...parent.props}/>,
      add: parent => <Add fetch = {parent.props.actions.fetchPosts} />,
      list: parent => <List />,
      edit: parent => <Edit />
    };

    const tpl = pages[route](this);

    return (
        <div>
            <Row>
              <Col span={20} offset={2}>
                <h2 style={{marginTop:'20px'}}><Icon type="appstore" /> SDMS / 服务文档管理系统</h2> 
                <Menu 
                    onClick = {e => setHash(e.key)}
                    selectedKeys={[route]}
                    style={{float:'right'}}
                    mode="horizontal">
                    <Menu.Item  key="home" >
                      <Icon type="home" />首页
                    </Menu.Item>
                    <Menu.Item  key="add">
                      <Icon type="plus-circle-o" />新增契约
                    </Menu.Item>
                    <Menu.Item  key="edit">
                      <Icon type="edit" />编辑契约
                    </Menu.Item>
                    <Menu.Item  key="list">
                      <Icon type="bars" />契约列表
                    </Menu.Item>
                </Menu>
              </Col>
            </Row>
            <Row type="flex" justify="space-around" align="middle">
              <Col span={20} offset={2}>
                <Spin spinning={this.props.reqState == 'loading'}>
                  {this.props.reqState != 'fail' ? tpl : '数据加载失败,请重试!'}
                </Spin>
              </Col>
            </Row>
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
    actions: bindActionCreators({
      setHash,
      fetchPosts
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
