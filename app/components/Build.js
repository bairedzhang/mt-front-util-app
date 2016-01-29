import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Nave from '../components/Nave'

class Counter extends Component {
  render() {
    return (
      <div>
        <Nave></Nave>
        <iframe src="http://build.3gqq.com"
                frameBorder={"0"}
                style={{ 'border':'none', 'marginTop': 0, 'padding': 0, height: '100%', width:'100%',position:'fixed'}}
        ></iframe>
      </div>
    );
  }
}

export default Counter;
