/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {View, StyleSheet, Picker, ScrollView} from 'react-native';
//import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import theme from '../../../styles/main.theme.js';
import {
  addPhotoUrl,
  getUploadUrl,
  getPhotoLocationUrl,
  getEditByTypeUrl,
  getPeopleUrl,
} from '../../config/api';
import ImageView from '../../components/common/ImageView';
import Button from '../../components/common/Button';
import TextInput from '../../components/common/TextInput';

const axios = require('axios').default;

type Props = {
  size: string,
  isLoading: boolean,
  id: string,
};

type State = {
  size: string,
  isLoading: boolean,
  id: string,
  loading: boolean,
  reloadList: any,
  photoLocation: any,
  uploadPhoto: any,
  title: string,
  payment: string,
  owner: string,
};

export default class AddPhoto extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      size: '200x200',
      id: this.props.navigation.getParam('id'),
      isLoading: true,
      loading: false,
      reloadList: this.props.navigation.getParam('reloadList'),
      photoLocation: null,
      uploadPhoto: null,
      title: '',
      payment: '',
      owner: '',
      availablePeople: {},
      availableArticles: {},
      articleId: '',
      articleName: '',
    };
  }

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({photoLocation: response});
      }
    });
  };

  setTitle = text => this.setState({title: text});
  setPayment = text => this.setState({payment: text});

  createFormData = (photo, body) => {
    const data = new FormData();

    data.append('avatar', {
      name: body.id,
      type: photo.type,
      uri:
        Platform.OS === 'android'
          ? photo.uri
          : photo.uri.replace('file://', ''),
    });

    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });
    return data;
  };

  handleUploadPhoto = (id, size) => {
    console.log(id);
    fetch(getUploadUrl(), {
      method: 'POST',
      body: this.createFormData(this.state.photoLocation, {
        id: id,
        size: size,
      }),
    })
      .then(response => response.json())
      .then(response => {
        console.log('upload succes', response);
        alert('Upload success!');
        this.setState({photoLocation: response.location});
      })
      .catch(error => {
        console.log('upload error', error);
        alert('Upload failed!');
      });
  };

  addPhoto = () => {
    var url = addPhotoUrl(this.state.articleId);

    var content = {
      size: this.state.size,
      title: this.state.title,
      payment: this.state.payment,
      owner: this.state.owner,
    };
    console.log(content);
    console.log(url);

    axios
      .post(url, content)
      .then(data => {
        console.log(data);
        this.handleUploadPhoto(data.data._id, data.data.size);
        this.state.reloadList();
        this.props.navigation.goBack();
      })
      .catch(err => {
        console.log(err);
        return null;
      });
  };

  getPeople = () => {
    let url = getPeopleUrl();
    return axios
      .get(url)
      .then(data => {
        let people = data.data.filter(person =>
          person.job.includes('Photographer'),
        );
        this.setState(
          {availablePeople: people, owner: people[0].name},
          function() {},
        );
      })
      .catch(err => {
        this.setState({data: [], isLoading: false});
      });
  };

  getArticleList = () => {
    var url = getEditByTypeUrl(this.state.id, 'article');
    return axios
      .get(url)
      .then(data => {
        this.setState(
          {availableArticles: data.data, articleId: data.data[0]._id},
          function() {},
        );
      })
      .catch(err => {
        //this.setState({data: [], isLoading: false, showSnackbar: true});
        return null;
      });
  };

  //Render a Picker item for each item in the company list
  _renderPeoplePickerItem = item => {
    return <Picker.Item label={item.name} value={item.name} />;
  };
  _renderArticlePickerItem = item => {
    return <Picker.Item label={item.title} value={item._id} />;
  };

  componentDidMount() {
    axios.all([this.getArticleList(), this.getPeople()]).then(
      axios.spread(() => {
        this.setState({isLoading: false});
      }),
    );
  }

  render() {
    const {photoLocation} = this.state;
    if (this.state.isLoading) {
      return <View></View>;
    } else {
      return (
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.textContainer}>
              <TextInput
                inputStyle={styles.textInputStyle}
                text={this.state.title}
                label={'Title'}
                onTextChange={this.setTitle}
                secure={false}
                multiline={true}
              />
              <TextInput
                inputStyle={styles.textInputStyle}
                keyboardType="numeric"
                text={this.state.payment}
                label={'Payment'}
                onTextChange={this.setPayment}
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
                onPress={this.handleChoosePhoto}
              />
            </View>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={this.state.size}
                style={{width: 300, height: 50, color: 'white'}}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({size: itemValue})
                }>
                <Picker.Item label="200x200" value="200x200" />
                <Picker.Item label="400x400" value="400x400" />
              </Picker>
              <Picker
                selectedValue={this.state.owner}
                style={{width: 300, height: 50, color: 'white'}}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({owner: itemValue})
                }>
                {this.state.availablePeople.map(item =>
                  this._renderPeoplePickerItem(item),
                )}
              </Picker>
              <Picker
                selectedValue={this.state.articleId}
                style={{width: 300, height: 50, color: 'white'}}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({
                    articleId: itemValue,
                  })
                }>
                {this.state.availableArticles.map(item =>
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
                onPress={this.addPhoto}
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
    width: '100%',
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
