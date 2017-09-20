import ActionTypes from '../constant/HomeConstant';
import AppDispatcher from '../AppDispatcher';

import SocketApi from '../../api/socket/SocketApi';


class ApplicationAction {
  constructor() {
  }

  testYourFlux() {
    AppDispatcher.dispatch({
      type: ActionTypes.TEST_FLUX,
      data: true
    });
  }

  conectSocket() {
    SocketApi.connectSocket()
      .then((res) => {
        console.log('socket connected ?', res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  socketMessage(message, data) {
    SocketApi.sendSocketMessage()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

}

export default new ApplicationAction();