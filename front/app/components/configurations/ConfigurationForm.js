import React, { Component, PropTypes } from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class ConfigurationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  shouldComponentUpdate(nextProps, nextState) {
    const changed = this.didPropsChanged(nextProps);
    return changed;
  }

  didPropsChanged(nextProps) {
    return this.props.ip !== nextProps.ip
      || this.props.port !== nextProps.port;
  }

  handleTouchAction = () => {
    const ip = { ip:this.refs.textFieldIp.getValue(), _id: this.props.ip._id, _rev: this.props.ip._rev };
    const port = { port: this.refs.textFieldPort.getValue(), _id: this.props.port._id, _rev: this.props.port._rev };

    this.props.updateIp(ip);
    this.props.updatePort(port);
  }

  render() {
    return(
      <div style={{ width: "80%", height: "80%", marginLeft: "10%", marginTop: "10%" }}>
      <TextField
        name="ip"
        defaultValue={this.props.ip.ip}
        ref="textFieldIp"
        fullWidth={true}
      />
      <TextField
        name="port"
        defaultValue={this.props.port.port}
        ref="textFieldPort"
        fullWidth={true}
      />

      <div style={{ marginTop: "10%", float: "right" }}>
        <RaisedButton label="Enregistrer" primary={true} onTouchTap={this.handleTouchAction} />
      </div>
      </div>
    );
  }

}

export default ConfigurationForm;