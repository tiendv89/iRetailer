import React from "react";
import { connect } from "react-redux";
import {
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
  Text,
  View
} from "react-native";
import { GoogleSignin } from "react-native-google-signin";
import LoadingOverlay from "../components/LoadingOverlay";
import { scaleStyleSheet } from "../utils/scaleUIStyle";
import IconButton from "../components/IconButton";
import { STATE_AUTHENTICATED_DONE } from "../store/authenticate/helper";
import {
  initializeGoogleProvider,
  authenticateWithGoogle
} from "../store/authenticate/actions";

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

  signInGoogle() {
    if (!this.state.isLoading) this.props.dispatch(authenticateWithGoogle());
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../../assets/RNFirebase512x512.png")}
          style={scaleStyleSheet(styles.logo)}
        />
        {this.state.isLoading ? null : (
          <IconButton
            button
            title="Google"
            type="google-plus-official"
            onPress={() => this.signInGoogle()}
          />
        )}
        <LoadingOverlay isVisible={this.state.isLoading} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  logo: {
    height: 80,
    marginBottom: 16,
    width: 80
  }
});

function mapStateToProps(state) {
  return {
    authenticate: state.authenticate
  };
}

export default connect(mapStateToProps)(App);
