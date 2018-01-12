import React from 'react';
import { UIManager } from 'react-native';
import { Provider } from 'react-redux';
import AppWithNavigationState from './app/navigators/AppNavigator';
import store from './app/store/configureStore';

export default class App extends React.Component {
  componentWillMount() {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
