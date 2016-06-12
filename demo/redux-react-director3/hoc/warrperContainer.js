import React, { Component } from 'react'

const warrperContainer = Warrper => 
  class PopupContainer extends Component {
    componentDidMount() {
      const warrper = React.findDOMNode(this.refs.warrper);
      // 首次加载，父级组件没有渲染完成，无法获取ref 
      setTimeout(() => {
        this.props.resetHeight(warrper.offsetHeight > 300 ? warrper.offsetHeight : 300);
      });
    }

    render() {
      return (
          <Warrper ref='warrper' {...this.props} />
        );
    }
  }

export default warrperContainer;