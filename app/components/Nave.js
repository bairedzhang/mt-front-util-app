import React, { Component, PropTypes } from 'react';
import { Router, Route, browserHistory, Link } from 'react-router'
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/lib/menus/menu-item';
import LeftNav from 'material-ui/lib/left-nav';
import FlatButton from 'material-ui/lib/flat-button';
import FontIcon from 'material-ui/lib/font-icon';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
    this.toggle = () => this.setState({open: !this.state.open});
  }

  render() {
    return (
      <div>
        <LeftNav
          docked={false}
          open={this.state.open}
          onRequestChange={this.toggle}
        >
          <Link to="/" onTouchTap={this.toggle}><MenuItem>MT</MenuItem></Link>
          <Link to="/counter" onTouchTap={this.toggle}><MenuItem>BUILD</MenuItem></Link>
        </LeftNav>
        <AppBar
          title={
            <div style={{margin: '0 auto', 'textAlign': 'center'}}>MT-FRONT-UTIL</div>
          }
          onLeftIconButtonTouchTap={this.toggle}
        />
      </div>
    );
  }
}

export default Counter;
