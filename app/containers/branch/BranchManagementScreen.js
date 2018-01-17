import React from 'react';
import { connect } from 'react-redux';
import {
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import { scaleStyleSheet } from '../../utils/scaleUIStyle';
import fonts from '../../utils/fonts';
import config from '../../config';
import { getBranchDetail } from '../../store/branches/actions';
import LoadingOverlay from '../../components/LoadingOverlay';
import { Icon } from 'react-native-elements';
import * as utils from '../../utils/';

class BranchManagementScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Thương hiệu',
    drawerIcon: ({ tintColor }) => <Icon name={'branding-watermark'} />
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  componentWillMount() {
    this.props.dispatch(getBranchDetail());
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.branches[nextProps.branches.current_branch] &&
      !nextProps.branches[nextProps.branches.current_branch].error
    ) {
      this.setState({ isLoading: false });
    }
  }

  onStoreAdd() {
    this.props.navigation.navigate('InitializeStore', { createBranch: false });
  }

  renderPanel(color, label, detail, onPress) {
    let Component = onPress ? TouchableOpacity : View;
    return (
      <Component
        onPress={() => onPress()}
        style={scaleStyleSheet([
          styles.panel,
          { borderColor: color, backgroundColor: color }
        ])}
      >
        <Text style={scaleStyleSheet(styles.label)}>{label}</Text>
        <Text style={scaleStyleSheet([styles.detail, fonts.android.bold])}>
          {detail}
        </Text>
      </Component>
    );
  }

  render() {
    let brand = this.props.branches[this.props.branches.current_branch];
    return (
      <View style={styles.container}>
        {brand && !brand.error ? (
          <View>
            {this.renderPanel('#517fa4', 'Thương hiệu', brand.name)}
            {this.renderPanel(
              '#aad450',
              'Doanh thu',
              utils.numberWithCommas(1000000) + '\u20ab'
            )}
            {this.renderPanel(
              '#cb2027',
              'Cửa hàng',
              this.props.branch.shops && this.props.branch.shops.length
                ? this.props.branch.shops.length
                : 0,
              () => {
                this.onStoreAdd();
              }
            )}
          </View>
        ) : null}
        <LoadingOverlay isVisible={this.state.isLoading} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    branches: state.branches,
    branch: state.branches.current_branch
      ? state.branches[state.branches.current_branch]
      : null
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  panel: {
    width: config.screen.width * 0.9,
    borderWidth: 1,
    padding: 8,
    marginVertical: 8
  },
  label: {
    fontSize: 25,
    textAlign: 'left',
    color: 'white',
    marginBottom: 8
  },
  detail: {
    fontSize: 35,
    color: 'white',
    textAlign: 'right'
  }
});

export default connect(mapStateToProps)(BranchManagementScreen);
