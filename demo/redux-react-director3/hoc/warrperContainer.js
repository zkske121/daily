import React, { Component } from 'react'

const warrperContainer = Warrper => 
  class PopupContainer extends Component {
    componentDidMount() {
      const warrper = React.findDOMNode(this.refs.warrper);
      this.props.resetHeight(warrper.offsetHeight > 600 ? warrper.offsetHeight : 600);
    }

    render() {
      return (
          <Warrper ref='warrper' {...this.props} />
        );
    }
  }

export default warrperContainer;