import React from 'react';
import { connect } from 'react-redux';
import {
  Alert,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
  Text,
  View
} from 'react-native';
import LoadingOverlay from '../components/LoadingOverlay';
import { scaleStyleSheet } from '../utils/scaleUIStyle';
import { NavigationActions } from 'react-navigation';
import IconButton from '../components/IconButton';
import {
  STATE_AUTHENTICATED_DONE,
  STATE_AUTHENTICATED_ERROR,
  STATE_INITIALIZED
} from '../store/authenticate/helper';
import { GOOGLE_PROVIDER } from '../utils/firebase';
import {
  initializeGoogleProvider,
  authenticateWithGoogle,
  getProfile,
  setProfile
} from '../store/authenticate/actions';
import global from '../global';

class HomeScreen extends React.Component {
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
    let authentication = nextProps.authenticate;
    for (let provider_key in authentication) {
      let provider = authentication[provider_key];
      if (provider.status < STATE_AUTHENTICATED_DONE) {
        done = false;
      }
    }

    if (done) {
      // Try to authenticate with Firebase using Google credential first
      if (authentication[GOOGLE_PROVIDER].status === STATE_AUTHENTICATED_DONE) {
        this.getFirebaseUser(GOOGLE_PROVIDER);
      } else if (
        authentication[GOOGLE_PROVIDER].status === STATE_AUTHENTICATED_ERROR
      ) {
        this.setState({ isLoading: !done });
      }
    }
  }

  getFirebaseUser(provider) {
    let user = this.props.authenticate[GOOGLE_PROVIDER].firebase_user._user;
    if (global.usingFirebaseAuthentication && user) {
      this.props.dispatch(getProfile(GOOGLE_PROVIDER)).then(snapshot => {
        const profile = snapshot.val();
        this.setState({ isLoading: false });
        if (profile) {
          if (profile.stores) {
          } else {
            this.createStore();
          }
        } else {
          this.props.dispatch(setProfile(GOOGLE_PROVIDER, user));
          this.createStore();
        }
      });
    }
  }

  createStore() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'InitializeStore' })]
    });
    this.props.navigation.dispatch(resetAction);
  }

  signIn(provider) {
    const authentication = this.props.authenticate[provider];
    if (
      authentication.status === STATE_AUTHENTICATED_ERROR ||
      authentication.status === STATE_INITIALIZED
    ) {
      if (provider === GOOGLE_PROVIDER) {
        this.setState({ isLoading: true });
        this.props.dispatch(authenticateWithGoogle());
      } else Alert.alert('Lỗi', 'Chỉ có google được support!');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Image
            source={require('../../assets/logo.png')}
            style={scaleStyleSheet(styles.logo)}
          />
          <Text
            style={scaleStyleSheet({
              marginTop: 10,
              fontSize: 40,
              fontWeight: 'bold'
            })}
          >
            iRetailer
          </Text>
          {this.state.isLoading ? null : (
            <IconButton
              style={scaleStyleSheet({ marginTop: 80 })}
              button
              title="Google"
              type="google-plus-official"
              onPress={() => this.signIn(GOOGLE_PROVIDER)}
            />
          )}
        </View>
        <Text style={scaleStyleSheet({ fontSize: 17 })}>v0.0.1</Text>
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
    marginTop: 80,
    width: 160
  }
});

const mapStateToProps = state => {
  return {
    authenticate: state.authenticate
  };
};

export default connect(mapStateToProps)(HomeScreen);
