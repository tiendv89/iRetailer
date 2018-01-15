import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { scaleStyleSheet } from '../utils/scaleUIStyle';
import config from '../config';
import fonts from '../utils/fonts';

const colors = {
  facebook: '#3b5998',
  twitter: '#00aced',
  ['google-plus-official']: '#dd4b39',
  pinterest: '#cb2027',
  linkedin: '#007bb6',
  youtube: '#bb0000',
  vimeo: '#aad450',
  tumblr: '#32506d',
  instagram: '#517fa4',
  quora: '#a82400',
  foursquare: '#0072b1',
  wordpress: '#21759b',
  stumbleupon: '#EB4823',
  github: '#000000',
  ['github-alt']: '#000000',
  twitch: '#6441A5',
  medium: '#02b875',
  soundcloud: '#f50',
  gitlab: '#e14329',
  angellist: '#1c4082',
  codepen: '#000000'
};

export default class IconButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      style,
      type,
      button,
      title,
      light,
      iconSize,
      iconColor,
      raised,
      onPress
    } = this.props;
    return (
      <TouchableOpacity
        style={[
          styles.container,
          button && styles.button,
          raised && styles.raised,
          style && style,
          !raised && {
            width: iconSize * 2 + 4,
            height: iconSize * 2 + 4,
            borderRadius: iconSize * 2
          },
          { backgroundColor: colors[type] },
          light && { backgroundColor: 'white' }
        ]}
        onPress={onPress}
      >
        <Icon
          name={type}
          color={light ? colors[type] : iconColor}
          size={iconSize}
        />
        {button &&
          title && (
            <Text style={[styles.title, light && { color: colors[type] }]}>
              {title}
            </Text>
          )}
      </TouchableOpacity>
    );
  }
}

IconButton.propTypes = {
  type: PropTypes.string.isRequired,
  onPress: PropTypes.func
};

IconButton.defaultProps = {
  raised: true,
  iconColor: 'white',
  iconSize: 48 * config.UI_SCALE,
  button: false
};

const styles = scaleStyleSheet(
  StyleSheet.create({
    container: {
      height: 52,
      width: config.screen.width * 0.8,
      borderRadius: 30,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    button: {
      paddingTop: 14,
      paddingBottom: 14
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
    },
    title: {
      color: 'white',
      marginLeft: 15,
      ...Platform.select({
        ios: {
          fontWeight: 'bold'
        },
        android: {
          ...fonts.android.black
        }
      })
    }
  })
);
