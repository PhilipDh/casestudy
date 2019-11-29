/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 *
 */
import React, {Component} from 'react';
import {View, StyleSheet, Picker, ScrollView, Text} from 'react-native';
//import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import theme from '../../../styles/main.theme.js';
import ImageView from '../../components/common/ImageView';
import Button from '../../components/common/Button';
import TextInput from '../../components/common/TextInput';

const axios = require('axios').default;

//Type definition for states of this class. Helps with type safety
type Props = {
  setSize: any,
  setTitle: any,
  setPayment: any,
  addPhoto: any,
  title: string,
  payment: number,
  owner: string,
  availableArticles: any,
  availablePeople: any,
  isLoading: boolean,
  setOwner: any,
  setArticle: any,
  size: string,
  articleId: string,
  handleChoosePhoto: any,
  photoLocation: string,
};

export default class AddPhoto extends Component<Props> {
  constructor(props) {
    super(props);
  }

  //Render a Picker item for each item in the company list
  _renderPeoplePickerItem = item => {
    return <Picker.Item label={item.name} value={item.name} />;
  };
  _renderArticlePickerItem = item => {
    return <Picker.Item label={item.title} value={item._id} />;
  };

  render() {
    const {
      setSize,
      setPayment,
      setTitle,
      setOwner,
      setArticle,
      size,
      payment,
      title,
      articleId,
      owner,
      isLoading,
      addPhoto,
      availablePeople,
      availableArticles,
      handleChoosePhoto,
      photoLocation,
    } = this.props;

    if (isLoading) {
      return <View></View>;
    } else {
      return (
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.textContainer}>
              <TextInput
                inputStyle={styles.textInputStyle}
                text={title}
                label={'Title'}
                onTextChange={setTitle}
                secure={false}
                multiline={true}
              />
              <TextInput
                inputStyle={styles.textInputStyle}
                keyboardType="numeric"
                text={payment}
                label={'Payment'}
                onTextChange={setPayment}
                secure={false}
                multiline={true}
              />
            </View>
            <View style={styles.imageContainer}>
              {photoLocation && (
                <ImageView
                  photoLocation={photoLocation.uri}
                  cacheType={'reload'}
                  width={200}
                  height={200}
                />
              )}
              <Button
                buttonStyle={{
                  padding: 8,
                  margin: 10,
                  //width: 120,
                  borderRadius: 4,
                  backgroundColor: theme.colors.accent,
                }}
                text={'Change Photo'}
                onPress={handleChoosePhoto}
              />
            </View>
            <View style={styles.pickerContainer}>
              <Text style={styles.textStyle}>Size</Text>
              <Picker
                selectedValue={size}
                style={{width: 300, height: 50, color: 'white'}}
                onValueChange={(itemValue, itemIndex) => setSize(itemValue)}>
                <Picker.Item label="200x200" value="200x200" />
                <Picker.Item label="400x400" value="400x400" />
              </Picker>
              <Text style={styles.textStyle}>Photographer</Text>
              <Picker
                selectedValue={owner}
                style={{width: 300, height: 50, color: 'white'}}
                onValueChange={(itemValue, itemIndex) => setOwner(itemValue)}>
                {availablePeople.map(item =>
                  this._renderPeoplePickerItem(item),
                )}
              </Picker>
              <Text style={styles.textStyle}>Article</Text>
              <Picker
                selectedValue={articleId}
                style={{width: 300, height: 50, color: 'white'}}
                onValueChange={(itemValue, itemIndex) => setArticle(itemValue)}>
                {availableArticles.map(item =>
                  this._renderArticlePickerItem(item),
                )}
              </Picker>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                buttonStyle={{
                  padding: 8,
                  //width: 120,
                  //flex: 1,
                  borderRadius: 4,
                  backgroundColor: theme.colors.accent,
                }}
                text={'Save'}
                onPress={addPhoto}
              />
            </View>
          </View>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {height: '100%'},
  textContainer: {},
  textInputStyle: {
    width: '95%',
  },

  pickerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageContainer: {
    height: 300,
    alignItems: 'center',

    justifyContent: 'flex-end',
  },

  buttonContainer: {
    //alignItems: 'center',
    margin: 10,
    justifyContent: 'flex-end',
  },
  saveButton: {margin: 10},
  textStyle: {
    color: theme.setContrast(theme.colors.primary),
    fontSize: theme.FONT_SIZE_LARGE,
  },
});

/*

            <Image
              source={{
                uri: getPhotoLocationUrl(photoLocation),
                cache: 'reload',
              }}
              style={{width: 300, height: 300}}
            />
*/
