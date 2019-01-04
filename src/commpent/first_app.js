import React, { Component } from 'react';
import logo from './../logo.svg';
import './../App.css';

import { Link } from 'react-router-dom';

 
class App extends Component {
    constructor (props) {
        super(props)
    }
 
   render() {
       return (
           <div id="test-container">
               <p>search:{this.props.location.search} </p>
               <p>state:{this.props.location.state.mold} </p>
               <p>aa:{this.props.location.state.aa} </p>
               <div onClick={() =>  this.props.history.goBack()}>返回上一页</div>
               <div onClick={() => this.props.history.push('/')}>message页面</div>
           </div>
       );
   }
}


export default App;
