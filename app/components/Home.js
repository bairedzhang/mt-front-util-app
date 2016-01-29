import React from 'react';
import ReactDom from 'react-dom';
import Nave from './Nave';
import css from './Home.module.css';
import ProjectItem from './projectItem';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
import Table from 'material-ui/lib/table/table';
import TableBody from 'material-ui/lib/table/table-body';
import TableFooter from 'material-ui/lib/table/table-footer';
import TableHeader from 'material-ui/lib/table/table-header';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import Toggle from 'material-ui/lib/toggle';
import Paper from 'material-ui/lib/paper';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import injectTapEventPlugin from 'react-tap-event-plugin'
import IconButton from 'material-ui/lib/icon-button';
import ClearAction from 'material-ui/lib/svg-icons/action/delete';
const ipc = require('electron').ipcRenderer;
injectTapEventPlugin();

const styles = {
  inputWrapper: {
    width: '500px',
    margin: '0 auto'
  },
  title: {
    fontWeight: 'normal',
    fontSize: '20px',
    paddingLeft: '24px',
    paddingRight: '24px',
    marginTop: '20px',
    height: '56px',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    color: '#9e9e9e',
    position: 'relative',
    backgroundColor: 'inherit'
  }
};
class AppBarExampleIconMenu extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      message: [],
      add: {
        name: '',
        serverPath: '',
        localPath: ''
      },
      global: {
        userName: this.props.global.userName,
        proxyRoot: this.props.global.proxyRoot
      },
      fixedHeader: true,
      fixedFooter: false,
      stripedRows: true,
      showRowHover: true,
      selectable: true,
      multiSelectable: true,
      enableSelectAll: true,
      deselectOnClickaway: false,
      height: '300px'
    };
    let fn = ['onDelete', 'onSave', 'onSaveGlobal', 'onChange', 'onDrop', 'clearMessage'];
    fn.forEach(function (item) {
      this[item] = this[item].bind(this);
    }.bind(this));

    this.events();
  }

  MT(method, data) {
    var o = {
      method: method,
      data: data || {}
    };
    ipc.send('message', JSON.stringify(o));
  }

  clearMessage() {
    this.setState({
      message: []
    });
  }

  events() {
    ipc.on('message', function (o, data) {
      this.notify(JSON.parse(data));
    }.bind(this));

    ipc.on('error', function (o, data) {
      console.log(data);
    }.bind(this));

    window.onbeforeunload = function (e) {
      this.MT('closeAll')
    }.bind(this);
  }

  onDelete(id) {
    this.props.del(id);
  }

  updateAll() {
    let {editAll, global} = this.props;
    let data = {
      serverRoot: `/usr/local/app/resin_${global.userName}/webapps`,
      proxyRoot: global.proxyRoot
    };
    editAll(data);
  }

  onSaveGlobal() {
    this.props.saveGlobal(this.state.global);
    this.updateAll();
  }

  onDrop(e) {
    e.preventDefault();
    let key = e.target.getAttribute('data-index').split('.');
    this.state[key[0]][key[1]] = e.dataTransfer.files[0].path;
    this.forceUpdate();
  }

  notify(item) {
    console.log(item);
    new Notification(item.status, {
      body: item.path
    });
    item.time = new Date();
    this.setState({
      message: [item, ...this.state.message]
    });
  }

  timeFilter(date) {
    var fmt = function (num) {
      return num < 10 ? ('0' + num) : num
    };
    return [date.getHours(), date.getMinutes(), date.getSeconds()].map((item) => fmt(item)).join(':');
  }

  onSave() {
    let {save, global} = this.props;
    let data = {
      serverRoot: `/usr/local/app/resin_${global.userName}/webapps`,
      proxyRoot: global.proxyRoot
    };
    let item = Object.assign({}, this.state.add, data);
    save(item);
  }

  onChange(e) {
    let key = e.target.getAttribute('data-index').split('.');
    this.state[key[0]][key[1]] = e.target.value;
    this.forceUpdate();
  }

  render() {
    const { project, global} = this.props;
    return (
      <div style={{
         'textAlign': 'center'
      }}>
        <Nave></Nave>
        <div style={styles.title}>
          <span>GLOBAL CONFIG</span>
        </div>
        {
          Object.keys(this.state.global).map(function (key, index) {
            return <div style={styles.inputWrapper} key={index}>
              <TextField
                data-index={ 'global.' + key}
                onChange={this.onChange}
                onDrop={this.onDrop}
                value={this.state.global[key]}
                fullWidth={true}
                hintText={key}
                floatingLabelText={key}/>
            </div>
          }.bind(this))
        }

        <div style={styles.inputWrapper}>
          <FlatButton label="Save" secondary={true} onTouchTap={this.onSaveGlobal}/>
        </div>

        <div style={styles.title}>
          <span>NEW PROJECT</span>
        </div>

        {
          Object.keys(this.state.add).map(function (key, index) {
            return <div style={styles.inputWrapper} key={index}>
              <TextField
                data-index={'add.' + key}
                onChange={this.onChange}
                onDrop={this.onDrop}
                value={this.state.add[key]}
                fullWidth={true}
                hintText={key}
                floatingLabelText={key}/>
            </div>
          }.bind(this))
        }

        <div style={styles.inputWrapper}>
          <FlatButton label="Save" secondary={true} onTouchTap={this.onSave}/>
        </div>
        <div style={{
          'width': '1200px',
          'margin': '0 auto'
        }}>
          <Table
            height={this.state.height}
            fixedHeader={this.state.fixedHeader}
            fixedFooter={this.state.fixedFooter}
            selectable={this.state.selectable}
            multiSelectable={this.state.multiSelectable}>
            <TableHeader
              selectable={false}
              displaySelectAll={false}
            >
              <TableRow>
                <TableHeaderColumn colSpan="3" style={{textAlign: 'center', fontSize: '20px'}}>
                  PROJECT LIST
                </TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn tooltip='项目名称'>ProjectName</TableHeaderColumn>
                <TableHeaderColumn tooltip='本地项目路径'>LocalPath</TableHeaderColumn>
                <TableHeaderColumn tooltip='操作'>Control</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              selectable={false}>
              {
                project.map((item, idx) => {
                  return <ProjectItem item={item} key={idx} onDelete={this.onDelete} MT={this.MT}></ProjectItem>
                })
              }
            </TableBody>
          </Table>

          <Table
            height={this.state.height}
            fixedHeader={this.state.fixedHeader}
            fixedFooter={this.state.fixedFooter}
            selectable={this.state.selectable}
            multiSelectable={this.state.multiSelectable}>
            <TableHeader
              displaySelectAll={false}
            >
              <TableRow>
                <TableHeaderColumn colSpan="3" style={{textAlign: 'center', fontSize: '20px'}}>
                  MESSAGE LIST
                  <IconButton tooltip="clear"
                              onTouchTap={this.clearMessage.bind(this)}
                              style={{right: '40px', top: '10px', position:'absolute'}}>
                    <ClearAction />
                  </IconButton>
                </TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn tooltip='时间'>TIME</TableHeaderColumn>
                <TableHeaderColumn tooltip='文件'>PATH</TableHeaderColumn>
                <TableHeaderColumn tooltip='状态'>STATUS</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              selectable={false}
              preScanRows={false}
              showRowHover={this.state.showRowHover}
              stripedRows={true}>
              {
                this.state.message.map((item, idx) => {
                  return <TableRow
                    key={idx}
                    selected={false}>
                    <TableRowColumn>{this.timeFilter(item.time)}</TableRowColumn>
                    <TableRowColumn>{item.path}</TableRowColumn>
                    <TableRowColumn>{item.status}</TableRowColumn>
                  </TableRow>
                })
              }
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}

export default AppBarExampleIconMenu;
