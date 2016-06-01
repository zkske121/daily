import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { change } from '../actions'
import { bindActionCreators } from 'redux'
import Item from '../components/Item'

import '../css/index.css'

class App extends Component {
  constructor() {
    super();
    this.state = {
      doSort: false
    }
  }
  clickHandle(sortName) {
    const {list} = this.props;
    const {change} = this.props.actions;
    const sortConfig = {
      bubbleSort,
      selectSort
    };
    const actions = sortConfig[sortName](list.map(v => v.value));

    const timer = setInterval(() => {
      if(!actions.length) {
        clearInterval(timer); 
      } else {
        change(actions.shift());
      }
    }, 1000);

    this.setState({
      doSort:true
    });
  }

  render() {
    var {list} = this.props;

    return (
        <div className = 'app'>
          <button onClick={this.clickHandle.bind(this, 'bubbleSort')} disabled = {this.state.doSort && 'disabled'}>冒泡排序</button>
          <button onClick={this.clickHandle.bind(this, 'selectSort')} disabled = {this.state.doSort && 'disabled'}>选择排序</button>
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

function bubbleSort(array) {
  var res = [];
    for (var i = 0; i < array.length; i++) {
        for (var j = array.length; j > 0; j--) {
            if (array[j] < array[j - 1]) {
                var temp = array[j - 1];
                array[j - 1] = array[j];
                array[j] = temp;
                res.push({
                  type: 'change',
                  index: j,
                  change: j - 1
                 });
            }
        }
    }

    return res;
}

function selectSort(array) {
     var min, temp, res = [];
     for (var i = 0; i < array.length; i++) {
         min = i;
         for (var j = i + 1; j < array.length; j++) {
             if (array[min] > array[j])
                 min = j;
         }
         if (min != i) {
             temp = array[i];
             array[i] = array[min];
             array[min] = temp;
             res.push({
                type: 'change',
                index: i,
                change: min
               });
         }
     }

     return res;
 }

/* function shallSort(array) {
   var increment = array.length;
   var i
   var temp; //暂存
   const res = [];
   do {
       increment = Math.floor(increment / 3) + 1;
       for (i = increment; i < array.length; i++) {
           if (array[i] < array[i - increment]) {
               temp = array[i];
               for (var j = i - increment; j > 0 && temp < array[j]; j -= increment) {

                   array[j + increment] = array[j];

               }
               array[j + increment] = temp;
               res.push({
                type: 'change',
                index: i,
                change: j + increment
               });
           }
       }
   }
   while (increment > 1)
  return res;
}*/
/*
 function insertSort(array) {
   var temp, res = [];
   for (var i = 1; i < array.length; i++) {
       var temp = array[i];
       for (var j = i; j > 0 && temp < array[j - 1]; j--) {
           array[j] = array[j - 1];
       }
       array[j] = temp;
       res.push({
              type: 'change',
              index: j + 1,
              change: i
             });
   }

   return res;
}*/

function exchange(ary, i, j) {
    const res = ary.slice(),
            tmpI = res[i],
            tmpJ = res[j];

    res[i] = tmpJ;
    res[j] = tmpI;

    return res; 
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
