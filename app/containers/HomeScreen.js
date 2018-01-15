import React from 'react';
import { connect } from 'react-redux';
import {
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
  Text,
  View
} from 'react-native';
import LoadingOverlay from '../components/LoadingOverlay';
import { scaleStyleSheet } from '../utils/scaleUIStyle';
import IconButton from '../components/IconButton';
import {
  STATE_AUTHENTICATED_DONE,
  STATE_AUTHENTICATED_ERROR,
  STATE_INITIALIZED
} from '../store/authenticate/helper';
import { GOOGLE_PROVIDER } from '../utils/firebase';
import {
  initializeGoogleProvider,
  authenticateWithGoogle
} from '../store/authenticate/actions';
import Icon from 'react-native-vector-icons/FontAwesome';

class App extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();

    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    this.props.dispatch(initializeGoogleProvider());
  }

  componentWillReceiveProps(nextProps) {
    let done = true;
    for (let provider_key in nextProps.authenticate) {
      let provider = nextProps.authenticate[provider_key];
      if (provider.status < STATE_AUTHENTICATED_DONE) {
        done = false;
      }
    }

    this.setState({ isLoading: !done });
  }

  signIn(provider) {
    const authentication = this.props.authenticate[GOOGLE_PROVIDER];
    if (
      authentication.status === STATE_AUTHENTICATED_ERROR ||
      authentication.status === STATE_INITIALIZED
    )
      this.props.dispatch(authenticateWithGoogle());
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/logo.png')}
          style={scaleStyleSheet(styles.logo)}
        />
        {this.state.isLoading ? null : (
          <IconButton
            button
            title="Google"
            type="google-plus-official"
            onPress={() => this.signIn(GOOGLE_PROVIDER)}
          />
        )}
        <Text>v0.0.1</Text>
        <LoadingOverlay isVisible={this.state.isLoading} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  logo: {
    height: 160,
    marginVertical: 80,
    width: 160
  }
});

function mapStateToProps(state) {
  return {
    authenticate: state.authenticate
  };
}

export default connect(mapStateToProps)(App);
