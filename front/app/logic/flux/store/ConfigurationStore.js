import ActionTypes from '../constant/ConfigurationsConstant';
import AppDispatcher from '../AppDispatcher';
import BaseStore from '../base/BaseStore';

class ConfigurationStore extends BaseStore {
  constructor() {
    super('configurations');
    this.ip = { _id: 'ip_serveur', ip:'localhost' };
    this.port = { _id: 'port_serveur', port: '3000' };
  }

  getIp() {
    return this.ip;
  }

  getPort() {
    return this.port;
  }

  setIpInStore(ip) {
    this.ip = ip;
    this.emitChange();
  }

  setPortInStore(port) {
    this.port = port;
    this.emitChange();
  }

}

const ConfigurationStoreInstance = new ConfigurationStore();

ConfigurationStoreInstance.dispatchToken = AppDispatcher.register((action) => {
  switch(action.type) {
    case ActionTypes.SET_CURRENT_USER:
      ConfigurationStoreInstance.setCurrentUserInStore(action.data);
      break;

    case ActionTypes.SET_IP_IN_STORE:
      ConfigurationStoreInstance.setIpInStore(action.data);
      break;

    case ActionTypes.SET_PORT_IN_STORE:
      ConfigurationStoreInstance.setPortInStore(action.data);
      break;

    default :
      return;
  }
});

export default ConfigurationStoreInstance;