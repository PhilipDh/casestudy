/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {View, StyleSheet, Picker, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import theme from '../../../styles/main.theme.js';
import ImageView from '../../components/common/ImageView';
import Button from '../../components/common/Button';

const axios = require('axios').default;

//Type definition for states of this class. Helps with type safety
type Props = {
  size: string,
  isLoading: boolean,
  photoLocation: string,
  handleChoosePhoto: any,
  setSize: any,
  updatePhoto: any,
  getPhoto: any,
};

export default class EditPhoto extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      photoLocation,
      handleChoosePhoto,
      setSize,
      size,
      updatePhoto,
      getPhoto,
      isLoading,
    } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {photoLocation && (
            <ImageView
              photoLocation={getPhoto()}
              cacheType={'reload'}
              width={300}
              height={300}
            />
          )}
          <Button
            buttonStyle={styles.changeButton}
            text={'Change Photo'}
            onPress={handleChoosePhoto}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textStyle}>Size</Text>
          <Picker
            selectedValue={size}
            style={{width: 300, height: 50, color: 'white'}}
            onValueChange={(itemValue, itemIndex) => setSize(itemValue)}>
            <Picker.Item label="200x200" value="200x200" />
            <Picker.Item label="400x400" value="400x400" />
          </Picker>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={styles.saveButton}
            text={'Upload'}
            onPress={updatePhoto}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {height: '100%'},
  textContainer: {
    flex: 1,
    alignItems: 'center',
  },

  imageContainer: {
    flex: 3,
    alignItems: 'center',
  },

  buttonContainer: {
    flex: 1,
    //alignItems: 'center',
    justifyContent: 'flex-end',
  },
  changeButton: {
    padding: 8,
    margin: 10,
    //width: 120,
    borderRadius: 4,
    backgroundColor: theme.colors.accent,
  },
  saveButton: {
    padding: 8,
    //width: 120,
    //flex: 1,
    borderRadius: 4,
    backgroundColor: theme.colors.accent,
  },
  textStyle: {
    color: theme.setContrast(theme.colors.primary),
    fontSize: theme.FONT_SIZE_LARGE,
  },
});
