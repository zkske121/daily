import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { setHash, addItem, select } from '../actions'
import { bindActionCreators } from 'redux'
import Home from '../components/Home'
import About from '../components/About'
import AddItem from '../components/AddItem'
import ItemList from '../components/ItemList'
import ItemInfo from '../components/ItemInfo'

class App extends Component {
  render() {
    const {setHash} = this.props.actions;

    const pages = {
      home: parent => <Home {...parent.props}/>,
      about: parent => <About />,
      add: parent => <AddItem actions = {parent.props.actions} />,
      list: parent => <ItemList list = {parent.props.list} setHash = {parent.props.actions.setHash} />,
      item: parent => {
        var info = parent.props.list.find(item => item.id == parent.props.select);

        return <ItemInfo info = {info} />
      }
    }

    const tpl = pages[this.props.route](this);

    return <div>
      <button onClick = {setHash.bind(null, 'home')} >Home</button>
      <button onClick = {setHash.bind(null, 'about')} >About</button>
      <button onClick = {setHash.bind(null, 'add')} >Add</button>
      <button onClick = {setHash.bind(null, 'list')} >List</button>
      <button onClick = {setHash.bind(null, 'item\/' + this.props.select)} >Item</button>
      <div style = {{marginBottom: '50px'}}></div>
    {pages[this.props.route](this)}</div>;
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
  route: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  select: PropTypes.string.isRequired
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      setHash,
      addItem,
      select
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
