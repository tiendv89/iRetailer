import React from 'react';
import { connect } from 'react-redux';
import {
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
  Image,
  Text,
  View
} from 'react-native';
import { scaleStyleSheet } from '../utils/scaleUIStyle';
import fonts from '../utils/fonts';
import config from '../config';
import { createStore } from '../store/store/actions';
import IconButton from '../components/IconButton';

const STORE_NAME = 0;
const STORE_ADDRESS = 1;
const STORE_PHONE = 2;

class InitializeStoreScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.inputArr = {};

    this.state = {
      activeInput: -1
    };
  }

  deactivateInput() {
    if (this.state.activeInput != -1) {
      this.inputArr[this.state.activeInput].blur();
      this.setState({ activeInput: -1 });
    }
  }

  onSubmit() {
    this.props.dispatch(
      createStore('Test Store', '283 Khuong Trung', '0932372636')
    );
  }

  logout() {}

  render() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => this.deactivateInput()}
        style={scaleStyleSheet(styles.container)}
      >
        <Text
          style={scaleStyleSheet([
            fonts.android.bold,
            { fontSize: 60, marginVertical: 40 }
          ])}
        >
          Tạo mới cửa hàng
        </Text>
        <TextInput
          style={scaleStyleSheet(styles.input)}
          placeholder={'Tên cửa hàng'}
          underlineColorAndroid={'transparent'}
          onFocus={() => this.setState({ activeInput: STORE_NAME })}
          ref={ref => (this.inputArr[STORE_NAME] = ref)}
        />
        <TextInput
          style={scaleStyleSheet(styles.input)}
          placeholder={'Địa chỉ'}
          underlineColorAndroid={'transparent'}
          onFocus={() => this.setState({ activeInput: STORE_ADDRESS })}
          ref={ref => (this.inputArr[STORE_ADDRESS] = ref)}
        />
        <TextInput
          style={scaleStyleSheet(styles.input)}
          keyboardType={'phone-pad'}
          placeholder={'Số điện thoại'}
          underlineColorAndroid={'transparent'}
          onFocus={() => this.setState({ activeInput: STORE_PHONE })}
          ref={ref => (this.inputArr[STORE_PHONE] = ref)}
        />
        <IconButton
          style={scaleStyleSheet({ marginTop: 80, backgroundColor: '#3b5998' })}
          fontSize={40 * config.UI_SCALE}
          button
          title="Hoàn thành"
          type="hand-o-right"
          onPress={() => this.onSubmit()}
        />
        <View
          style={{
            height: 1,
            width: config.screen.width * 0.8,
            backgroundColor: 'gray',
            marginVertical: 10
          }}
        />
        <IconButton
          style={scaleStyleSheet({ backgroundColor: '#e14329' })}
          fontSize={40 * config.UI_SCALE}
          button
          title="Đăng xuất"
          type="sign-out"
          onPress={() => this.logout()}
        />
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
    backgroundColor: '#F5FCFF'
  },
  input: {
    width: config.screen.width * 0.9,
    borderBottomWidth: 1,
    fontSize: 20,
    marginTop: 10
  }
});

export default connect(mapStateToProps)(InitializeStoreScreen);
