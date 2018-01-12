import React, {Component} from "react";
import PropTypes from "prop-types";
import {StatusBar} from "react-native";
import {addNavigationHelpers, StackNavigator} from "react-navigation";
import {connect} from "react-redux";
import {GoogleSignin} from 'react-native-google-signin';
import {scaleStyle} from "../utils/scaleUIStyle";
import HomeScreen from "../containers/HomeScreen";

export const AppNavigator = StackNavigator(
    {
        Home: {screen: HomeScreen},
    },
    {
        initialRouteName: "Home",
        navigationOptions: {
            headerStyle: scaleStyle({height: 96})
        },
        cardStyle: {backgroundColor: "#ffffff"}
    }
);

class AppWithNavigationState extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
            // play services are available. can now configure library
            GoogleSignin.configure({
                // iosClientId: <FROM DEVELOPER CONSOLE>, // only for iOS
            })
            .then(() => {
                // you can now call currentUserAsync()
                console.log('Google Signin ready!');
            });
        })
        .catch((err) => {
            console.log("Play services error", err.code, err.message);
        })
    }

    componentWillReceiveProps(nextProps) {
        // if (nextProps.appNav != this.props.appNav) {
        //     const {appNav} = nextProps;
        //     if(appNav.routes[appNav.index].routeName === 'Main') {
        //         StatusBar.setHidden(true, null);
        //     } else {
        //         StatusBar.setHidden(false, null);
        //     }
        // }
    }

    render() {
        let {dispatch, appNav} = this.props;
        return (
            <AppNavigator navigation={addNavigationHelpers({dispatch, state: appNav})}/>
        )
    }
}

AppWithNavigationState.propTypes = {
    dispatch: PropTypes.func.isRequired,
    appNav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    appNav: state.appNav,
});

export default connect(mapStateToProps)(AppWithNavigationState);