import React from 'react';
import PropTypes from 'prop-types';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { scaleStyle } from '../utils/scaleUIStyle';
import HomeScreen from '../containers/HomeScreen';
import InitializeStoreScreen from '../containers/InitializeStoreScreen';
import RetailerWithNavigationState from '../navigators/RetailerNavigator';
export const AppNavigator = StackNavigator(
  {
    Home: { screen: HomeScreen },
    InitializeStore: { screen: InitializeStoreScreen },
    Retailer: { screen: RetailerWithNavigationState }
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none'
  }
);

class AppWithNavigationState extends React.Component {
  constructor(props) {
    super(props);

    // dirty fix for the warning not show up everytime :<
    // ...2 months later, I do not even mind to remove this dirty fix... now this has just became an beautiful, official and PERMANENT fix !!!
    console.ignoredYellowBox = ['Setting a timer'];
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
