import React, { Component, PropTypes } from 'react';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ActionHome from 'material-ui/svg-icons/action/home';

import HomeActionCreators from '../logic/flux/action/HomeActionCreators';
import HomeStore from '../logic/flux/store/HomeStore';

const _testYourFlux = () => {
  HomeActionCreators.testYourFlux();
};

const _conectSocket = () => {
  HomeActionCreators.conectSocket();
};

const _socketMessage = (message, data) => {
  HomeActionCreators.socketMessage(message, data);
};

const _updateState = () => {
  const test = HomeStore.getYourTestFlux();

  return {
    test,
  };
}

class Home extends Component {
	constructor() {
		super();
		this.state = _updateState();
            this.state.isOpenDrawer = false;
            this.storeSubcriber = this._onChanges.bind(this);
	}

    _onChanges() {
      this.setState(_updateState());
    }

	componentWillMount() {
            HomeStore.addChangeListener(this.storeSubcriber);
		this.router = this.props.router;
            _testYourFlux();
            _conectSocket();
            setTimeout(() => { console.log('test your flux response', this.state.test); }, 2000);
	}

      componentWillUnmount() {
        HomeStore.removeChangeListener(this.storeSubcriber);
      }

	navigateSomewhere(somewhere) {
		this.router.push(somewhere);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return this.shouldStateChange(nextState)
			|| this.shouldPropsChange(nextProps);
	}

	shouldStateChange(nextState) {
		return this.state.isOpenDrawer !== nextState.isOpenDrawer;
	}

	shouldPropsChange(nextProps) {
		return this.props !== nextProps;
	}

	HandleNavigationConfig = () => {
		this.navigateSomewhere('configs');
	}

	handleOpenDrawer = () => {
		this.setState({ isOpenDrawer: true });
	}

	handleDrawerChange = (change) => {
		this.setState({ isOpenDrawer: change });
	}

	handleCloseDrawer = () => {
		this.setState({ isOpenDrawer: false });
	}

	renderMenu() {
        return(
          <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
		targetOrigin={{horizontal: 'right', vertical: 'top'}}
		anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          >
          <MenuItem primaryText="Actualiser"/>
          <MenuItem primaryText="Aide"/>
          <MenuItem primaryText="Apropos"/>
          </IconMenu>
	  );
      }

      render() {
        return(
          <div>
            <Drawer
              docked={false}
              width={'25%'}
              open={this.state.isOpenDrawer}
              onRequestChange={this.handleDrawerChange}
            >
              <MenuItem onTouchTap={this.HandleNavigationConfig}>Configuration</MenuItem>
              <MenuItem onTouchTap={this.handleCloseDrawer}>Menu Item 2</MenuItem>
            </Drawer>
            <AppBar
              title="WELCOME TO ENVY, the javascript robotic"
              iconElementLeft={<IconButton><ActionHome onTouchTap={this.handleOpenDrawer}/></IconButton>}
              iconElementRight={this.renderMenu()}
            />
          </div>
        );
	}

}

export default Home;

