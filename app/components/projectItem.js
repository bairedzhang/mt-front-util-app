import React from 'react';
import ReactDom from 'react-dom';
import FlatButton from 'material-ui/lib/flat-button';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import injectTapEventPlugin from 'react-tap-event-plugin';
const ipc = require('electron').ipcRenderer;
injectTapEventPlugin();

class ProjectItem extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      watched: false
    };
    let fn = ['onToggleWatch', 'onDelete', 'onBuild'];
    fn.forEach(function (item) {
      this[item] = this[item].bind(this);
    }.bind(this));
  }

  onDelete() {
    let id = this.props.item.id;
    this.props.onDelete(id);
  }

  onToggleWatch() {
    let watched = !this.state.watched;
    let config = Object.assign({}, this.props.item);
    this.setState({
      watched: watched
    });
    if (watched) {
      this.props.MT('watch', config);
    } else {
      this.props.MT('close', config);
    }
  }

  onBuild() {
    let method = 'build';
    if (this.state.watched) {
        method = 'compile';
    }
    this.props.MT(method, Object.assign({}, this.props.item));
  }

  render() {
    let {item}  = this.props;
    return <TableRow
      displayRowCheckbox={true}
      selectable={true}
      showRowHover={true}>
      <TableRowColumn>{item.name}</TableRowColumn>
      <TableRowColumn>{item.localPath}</TableRowColumn>
      <TableRowColumn>
        <FlatButton label={this.state.watched ? "close": 'watch'}
                    primary={this.state.watched}
                    secondary={true}
                    onTouchTap={this.onToggleWatch}/>
        <FlatButton label="build" secondary={true} onTouchTap={this.onBuild}/>
        <FlatButton label="delete" secondary={true} onTouchTap={this.onDelete}/>
      </TableRowColumn>
    </TableRow>
  }
}

export default ProjectItem;
