import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CirclesLoader, TextLoader } from 'react-native-indicator';

import config from '../config';
import { scaleStyle, scaleStyleSheet } from '../utils/scaleUIStyle';

export default class LoadingOverlay extends React.Component {
  render() {
    return this.props.isVisible ? (
      <View style={styles.overlay}>
        <CirclesLoader />
      </View>
    ) : (
      <View />
    );
  }
}

const styles = StyleSheet.create(
  scaleStyleSheet({
    overlay: {
      flex: 1,
      backgroundColor: '#00000080',
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      width: config.SCREEN_WIDTH,
      height: config.SCREEN_HEIGHT,
      alignItems: 'center',
      justifyContent: 'center'
    }
  })
);
