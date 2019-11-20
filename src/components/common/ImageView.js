import React, {Component} from 'react';
import {Platform, View, StyleSheet, Image} from 'react-native';
import theme from '../../../styles/main.theme';
import AndroidImage from './AndroidImage';

class ImageView extends Component {
  render() {
    const {photoLocation, cacheType, width, height} = this.props;

    if (Platform.OS === 'ios') {
      return (
        <Image
          source={{
            uri: photoLocation,
            cache: cacheType,
          }}
          style={{width: width, height: height}}
        />
      );
    } else {
      return (
        <AndroidImage
          src={photoLocation}
          style={{width: width, height: height}}
        />
      );
    }
  }
}

export default ImageView;
