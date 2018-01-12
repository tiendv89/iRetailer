import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
  Text,
  View
} from 'react-native';
import { GoogleSignin } from 'react-native-google-signin';
import { SocialIcon } from 'react-native-elements';
import LoadingOverlay from '../components/LoadingOverlay';
import config from '../config';
import { scaleStyleSheet } from '../utils/scaleUIStyle';

const USER_LOGGING_UNDEFINED = 0;
const USER_NOT_LOGGED_IN = 1;
const USER_LOGGED_IN = 2;

export default class App extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();

    this.state = {
      google_ready: false,
      user_logged_in: USER_LOGGING_UNDEFINED,
      isLoading: true
    };
  }

  componentDidMount() {
    GoogleSignin.hasPlayServices({ autoResolve: true })
      .then(() => {
        GoogleSignin.configure({
          iosClientId:
            '815371491076-243sbqkdbs46cgec2kn80a1evmrtqeiq.apps.googleusercontent.com'
        }).then(() => {
          this.setState({ google_ready: true });
          GoogleSignin.currentUserAsync()
            .then(user => {
              this.setState({ isLoading: false });
              if (user) {
                console.log(user);
                this.setState({ user_logged_in: USER_LOGGED_IN });
              } else {
                this.setState({ user_logged_in: USER_NOT_LOGGED_IN });
              }
            })
            .done();
        });
      })
      .catch(err => {
        console.log('Play services error', err.code, err.message);
      });
  }

  signInGoogle() {
    if (
      !this.state.isLoading & this.state.google_ready &&
      this.state.user_logged_in != USER_LOGGED_IN
    )
      GoogleSignin.signIn()
        .then(user => {
          console.log(user);
          this.setState({ user_logged_in: USER_LOGGED_IN });
        })
        .catch(err => {
          this.setState({ user_logged_in: USER_NOT_LOGGED_IN });
        })
        .done();
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/RNFirebase512x512.png')}
          style={scaleStyleSheet(styles.logo)}
        />
        <SocialIcon
          style={{ width: config.screen.width * 0.7 }}
          button
          title={'Sign In'}
          type={'facebook'}
          onPress={() => this.signInGoogle()}
        />
        <LoadingOverlay isVisible={this.state.isLoading} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  logo: {
    height: 80,
    marginBottom: 16,
    width: 80
  }
});
