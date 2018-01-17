import React from 'react';
import { connect } from 'react-redux';
import {
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { scaleStyleSheet } from '../utils/scaleUIStyle';
import fonts from '../utils/fonts';
import config from '../config';
import { getStoreDetail } from '../store/shops/action';
import { Icon } from 'react-native-elements';

class MainScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Cửa hàng',
    drawerIcon: ({ tintColor }) => <Icon name={'store'} />
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(getStoreDetail());
  }

  componentWillReceiveProps() {}

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>In Progress</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(MainScreen);
