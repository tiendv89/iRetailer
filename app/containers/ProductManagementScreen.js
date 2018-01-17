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
import firebase from 'react-native-firebase';
import { getStoreDetail } from '../store/shops/action';
import { Icon } from 'react-native-elements';

class ProductManagementScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(getStoreDetail());
  }

  componentWillReceiveProps(nextProps) {}

  render() {
    return (
      <View style={styles.container}>
        <Text>ProductManagement</Text>
      </View>
    );
  }
}

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

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(ProductManagementScreen);
