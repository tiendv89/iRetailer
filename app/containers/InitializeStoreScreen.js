import React from 'react';
import { connect } from 'react-redux';
import {
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Text,
  Picker,
  View,
  Platform
} from 'react-native';
import { scaleStyleSheet } from '../utils/scaleUIStyle';
import fonts from '../utils/fonts';
import config from '../config';
import { createStore, createBranch } from '../store/shared/actions';
import IconButton from '../components/IconButton';
import { NavigationActions } from 'react-navigation';

const BRANCH_NAME_2 = 0;
const STORE_NAME = 1;
const STORE_ADDRESS = 2;
const STORE_PHONE = 3;

const BRANCH_NAME = 4;

class InitializeStoreScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.inputArr = {};

    this.state = {
      activeInput: -1,
      createBranch: false,
      selected_branch: '',
      inputValue: {
        [STORE_NAME]: '',
        [STORE_ADDRESS]: '',
        [STORE_PHONE]: '',
        [BRANCH_NAME]: ''
      },
      branches: []
    };
  }

  componentWillMount() {
    if (this.props.navigation.state.params.createBranch)
      this.setState({ createBranch: true });
  }

  componentWillReceiveProps(nextProps) {
    const current_branch = this.props.branches.current_branch;
    if (
      !current_branch &&
      current_branch != nextProps.branches.current_branch
    ) {
      this.setState({
        createBranch: false,
        selected_branch: nextProps.branches.current_branch
      });
    }

    if (this.props.branches != nextProps.branches) {
      let data = [];
      for (let id in nextProps.branches) {
        if (nextProps.branches[id].name) {
          console.log(nextProps.branches[id]);
          data.push({ ...nextProps.branches[id], id });
        }
      }
      this.setState({ branches: data });
    }

    const current_shop = this.props.shops.current_shop;
    if (
      nextProps.shops.current_shop &&
      (!current_shop || current_shop !== nextProps.shops.current_shop)
    ) {
      this.goToMainPage();
    }
  }

  goToMainPage() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Retailer' })]
    });
    this.props.navigation.dispatch(resetAction);
    this.props.navigation.navigate('Main');
  }

  deactivateInput() {
    if (this.state.activeInput != -1) {
      this.inputArr[this.state.activeInput].blur();
      this.setState({ activeInput: -1 });
    }
  }

  onSubmitBranch() {
    this.props.dispatch(createStore('branches', { name: 'Test Branch' }));
  }

  onSkipBranch() {
    this.setState({ createBranch: false });
  }

  onSubmit() {
    this.props.dispatch(
      createStore('shops', {
        name: 'Hải sản Phong Lan',
        address: '5 ngõ 67 Thái Thịnh',
        phone: '0914686368',
        branch: this.props.branches.current_branch
      })
    );
  }

  logout() {}

  render() {
    if (this.state.createBranch) {
      return this.renderBranchCreation();
    } else {
      return this.renderStoreCreation();
    }
  }

  renderBranchCreation() {
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
          Tạo thương hiệu
        </Text>
        <TextInput
          style={scaleStyleSheet(styles.input)}
          placeholder={'Tên thương hiệu'}
          underlineColorAndroid={'transparent'}
          onFocus={() => this.setState({ activeInput: BRANCH_NAME })}
          ref={ref => (this.inputArr[BRANCH_NAME] = ref)}
        />
        <View
          style={{
            marginTop: 80,
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: config.screen.width * 0.8
          }}
        >
          <IconButton
            style={scaleStyleSheet({
              backgroundColor: '#3b5998',
              width: config.screen.width * 0.39
            })}
            fontSize={40 * config.UI_SCALE}
            button
            title="Tiếp tục"
            type="hand-o-right"
            onPress={() => this.onSubmitBranch()}
          />
          <IconButton
            style={scaleStyleSheet({
              backgroundColor: '#0072b1',
              width: config.screen.width * 0.39
            })}
            fontSize={40 * config.UI_SCALE}
            button
            title="Bỏ qua"
            type="hand-o-right"
            onPress={() => this.onSkipBranch()}
          />
        </View>
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

  renderStoreCreation() {
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
        <View
          style={scaleStyleSheet({
            width: config.screen.width * 0.8,
            alignItems: 'flex-start',
            justifyContent: 'center'
          })}
        >
          <Text style={scaleStyleSheet({ fontSize: 20 })}>Thương hiệu</Text>
          <Picker
            style={{
              borderWidth: 1,
              width: config.screen.width * 0.8
            }}
            selectedValue={this.state.selectedBranch}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ selectedBranch: itemValue })
            }
          >
            {this.state.branches.map(item => (
              <Picker.Item key={item.id} label={item.name} value={item.id} />
            ))}
          </Picker>
        </View>
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
  return {
    shops: state.shops,
    branches: state.branches
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
    backgroundColor: '#F5FCFF'
  },
  input: {
    width: config.screen.width * 0.8,
    borderBottomWidth: 1,
    fontSize: 20,
    marginTop: 10
  },
  raised: {
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1
      },
      android: {
        elevation: 2
      }
    })
  }
});

export default connect(mapStateToProps)(InitializeStoreScreen);
