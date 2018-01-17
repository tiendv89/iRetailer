import React from 'react';
import PropTypes from 'prop-types';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import ProductManagementScreen from '../containers/ProductManagementScreen';

export const ProductNavigator = StackNavigator(
  {
    ProductManagement: { screen: ProductManagementScreen }
  },
  {
    initialRouteName: 'ProductManagement',
    headerMode: 'none'
  }
);

class ProductWithNavigationState extends React.Component {
  constructor(props) {
    super(props);

    // dirty fix for the warning not show up everytime :<
    // ...2 months later, I do not even mind to remove this dirty fix... now this has just became an beautiful, official and PERMANENT fix !!!
    console.ignoredYellowBox = ['Setting a timer'];
  }

  render() {
    let { dispatch, productNav } = this.props;
    return (
      <ProductNavigator
        navigation={addNavigationHelpers({ dispatch, state: productNav })}
      />
    );
  }
}

ProductWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  productNav: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  productNav: state.productNav
});

export default connect(mapStateToProps)(ProductWithNavigationState);
