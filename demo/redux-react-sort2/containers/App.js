import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { change } from '../actions'
import { bindActionCreators } from 'redux'
import Item from '../components/Item'

import '../css/index.css'

class App extends Component {
  render() {
    var {list} = this.props;

    return (
        <div className = 'app'>
          {list.map((v, i) => <Item {...v}  key = {i} />)}
        </div>
      )
  }
}


function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      change
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
