import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { scaleStyle } from '../utils/scaleUIStyle';
import HomeScreen from '../containers/HomeScreen';

export const AppNavigator = StackNavigator(
  {
    Home: { screen: HomeScreen }
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: scaleStyle({ height: 96 })
    },
    cardStyle: { backgroundColor: '#ffffff' }
  }
);

class AppWithNavigationState extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { dispatch, appNav } = this.props;
    return (
      <AppNavigator
        navigation={addNavigationHelpers({ dispatch, state: appNav })}
      />
    );
  }
}

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  appNav: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  appNav: state.appNav
});

export default connect(mapStateToProps)(AppWithNavigationState);
