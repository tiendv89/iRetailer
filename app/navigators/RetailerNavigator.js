import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, DrawerNavigator } from 'react-navigation';
import BranchManagementScreen from '../containers/branch/BranchManagementScreen';
import MainScreen from '../containers/MainScreen';

export const RetailerNavigator = DrawerNavigator({
  BranchManagement: { screen: BranchManagementScreen },
  Main: { screen: MainScreen }
});

class RetailerWithNavigationState extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {}

  render() {
    let { dispatch, retailerNav } = this.props;
    return (
      <RetailerNavigator
        navigation={addNavigationHelpers({ dispatch, state: retailerNav })}
      />
    );
  }
}

RetailerWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  retailerNav: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  retailerNav: state.retailerNav
});

export default connect(mapStateToProps)(RetailerWithNavigationState);
