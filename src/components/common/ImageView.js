import React, {Component} from 'react';
import {Platform, View, StyleSheet, Image} from 'react-native';
import theme from '../../../styles/main.theme';
import AndroidImage from './AndroidImage';

/*
  Image that will be used as a component in the App
  If the Platform is iOS use the native Image component otherwise AndroidImage
*/
class ImageView extends Component {
  render() {
    const {photoLocation, cacheType, width, height} = this.props;
    const style = {
      width: width,
      height: height,
    };

    if (Platform.OS === 'ios') {
      return (
        <Image
          source={{
            uri: photoLocation,
            cache: cacheType,
          }}
          style={style}
        />
      );
    } else {
      return <AndroidImage src={photoLocation} style={style} />;
    }
  }
}

export default ImageView;
