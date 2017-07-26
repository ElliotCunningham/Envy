import ActionTypes from '../constant/ConfigurationsConstant';
import AppDispatcher from '../AppDispatcher';

// import ConfigurationsHttpApi from '../../api/http/ConfigurationsHttpApi';
import ConfigurationsBddApi from '../../api/bdd/ConfigurationsBddApi';


class ConfigurationsActionCreators {
  constructor() {
  this.init = false
  }

  initConfigurationsBdd() {
    if (!this.init) {
      ConfigurationsBddApi.initConfigurationsBddApi(this.ConfigurationsBddChange);
      this.init = true;
    }
  }

  intConfigurations() {
    this.initConfigurationsBdd();
    ConfigurationsBddApi.fetchAllDocuments()
      .then((res) => {
        res.rows.map((row) => {
          if (row.doc._id === 'ip_serveur') {
            AppDispatcher.dispatch({
              type: ActionTypes.SET_IP_IN_STORE,
              data: row.doc
            });
          }
          if (row.doc._id === 'port_serveur') {
            AppDispatcher.dispatch({
              type: ActionTypes.SET_PORT_IN_STORE,
              data: row.doc
            });
          }
        });
      })
      .catch((err) => {
        console.log('error get all configurations', err);
        throw new Error(err);
      });
  }

  updateIpAdress(ip) {
    this.initConfigurationsBdd();
    ConfigurationsBddApi.updateDocument(ip)
      .then((res) => {
        ip._rev = res.rev;
        AppDispatcher.dispatch({
          type: ActionTypes.SET_IP_IN_STORE,
          data: ip
        });
      })
      .catch((err) => {
        console.log('error update configurations', err);
        throw new Error(err);
      });
  }

  updatePortNumber(port) {
    this.initConfigurationsBdd();
    ConfigurationsBddApi.updateDocument(port)
      .then((res) => {
        port._rev = res.rev;
        AppDispatcher.dispatch({
          type: ActionTypes.SET_PORT_IN_STORE,
          data: port
        });
      })
      .catch((err) => {
        console.log('error update configurations', err);
        throw new error(err);
      });
  }



  ConfigurationsBddChange = (change) => {
    console.log('configurations Bdd has changed', change);
  }

}

export default new ConfigurationsActionCreators();