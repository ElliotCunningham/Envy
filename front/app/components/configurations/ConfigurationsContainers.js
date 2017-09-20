import React, { Component, PropTypes } from 'react';

import ConfigurationToolBar from './ConfigurationToolBar';
import ConfigurationForm from './ConfigurationForm';

import ConfigurationsActionCreators from '../../logic/flux/action/ConfigurationsActionCreators';
import ConfigurationStore from '../../logic/flux/store/ConfigurationStore';

const _updateIpAdress = (ip) => {
  return ConfigurationsActionCreators.updateIpAdress(ip);
};

const _updatePortNumber = (port) => {
  return ConfigurationsActionCreators.updatePortNumber(port);
};

const _updateState = () => {
  const ip = ConfigurationStore.getIp();
  const port = ConfigurationStore.getPort();

  return {
    ip,
    port
  };
};

class ConfigurationsContainers extends Component {
  constructor(props) {
    super(props);
    this.state = _updateState();
    this.storeSubcriber = this._onChanges.bind(this);
  }

  componentWillMount() {
    ConfigurationStore.addChangeListener(this.storeSubcriber);
    ConfigurationsActionCreators.intConfigurations();
    this.router = this.props.router;
  }

  shouldComponentUpdate(nextProps, nextState) {
    const changed = this.didPropsChanged(nextProps) || this.didStateChanged(nextState);
    return changed;
  }

  didPropsChanged(nextProps) {
    return this.props !== nextProps;
  }

  didStateChanged(nextState) {
    return this.state.ip !== nextState.ip
      || this.state.port !== nextState.port;
  }

  _onChanges() {
      this.setState(_updateState());
  }

  navigateSomewhere = (somewhere) => {
    this.router.push(somewhere);
  }

  updateIpAdress = (ip) => {
    _updateIpAdress(ip);
  }

  updatePortNumber = (port) => {
    _updatePortNumber(port);
  }

  render() {
    return(
      <div className="ConfigurationsContainers" style={{ width: "100%", height: "100%" }}>
        <ConfigurationToolBar
          navigateSomewhere={this.navigateSomewhere}
        />
        <ConfigurationForm
          ip={this.state.ip}
          port={this.state.port}
          updateIp={this.updateIpAdress}
          updatePort={this.updatePortNumber}
        />
      </div>
    );
  }

}

export default ConfigurationsContainers;