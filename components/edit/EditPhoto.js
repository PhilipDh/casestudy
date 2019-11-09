/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Picker,
} from 'react-native';
import {Avatar, Button, Card, Title, TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';

const axios = require('axios').default;

type Props = {
  size: string,
  isLoading: boolean,
  id: string,
};

type State = {
  payed: boolean,
  size: string,
  isLoading: boolean,
  id: string,
  loading: boolean,
  reloadList: any,
  photoLocation: any,
  uploadPhoto: any,
};

export default class EditPhoto extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      payed: null,
      size: '',
      id: this.props.navigation.getParam('id'),
      isLoading: true,
      loading: false,
      reloadList: this.props.navigation.getParam('reloadList'),
      photoLocation: null,
      uploadPhoto: null,
    };
  }

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({uploadPhoto: response});
      }
    });
  };

  componentDidMount() {
    var url = 'http://10.0.2.2:3000/photograph/' + this.state.id;
    axios
      .get(url)
      .then(data => {
        this.setState({
          payed: data.data.payed,
          isLoading: false,
          loading: false,
          size: data.data.size,
          photoLocation: data.data.location,
        });
      })
      .catch(err => {
        console.log(err);
        return null;
      });
  }

  createFormData = (photo, body) => {
    const data = new FormData();

    data.append('avatar', {
      name: this.state.id,
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

  handleUploadPhoto = () => {
    fetch('http://10.0.2.2:3000/upload', {
      method: 'POST',
      body: this.createFormData(this.state.uploadPhoto, {
        id: this.state.id,
        size: this.state.size,
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

  updatePhoto() {
    if (this.state.uploadPhoto != null) {
      console.log('photo changed');
      this.handleUploadPhoto();
    }
    var url = 'http://10.0.2.2:3000/photograph/' + this.state.id;

    var content = {
      size: this.state.size,
      payed: this.state.payed.toString(),
    };
    console.log(content);
    axios
      .put(url, content)
      .then(data => {
        this.setState({
          loading: false,
          size: data.data.size,
        });
        this.state.reloadList();
      })
      .catch(err => {
        console.log(err);
        return null;
      });
  }

  render() {
    const {photoLocation} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {photoLocation && (
            <Image
              source={{
                uri: 'http://10.0.2.2:3000/' + photoLocation,
                cache: 'reload',
              }}
              style={{width: 300, height: 300}}
            />
          )}
          <Button
            //icon={this.getIcon()}
            style={styles.saveButton}
            loading={this.state.loading}
            color={'#fa3336'}
            mode={'contained'}
            onPress={() => this.handleChoosePhoto()}>
            Choose Photo
          </Button>
        </View>
        <View style={styles.textContainer}>
          <Picker
            selectedValue={this.state.size}
            style={{width: 300, height: 50}}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({size: itemValue})
            }>
            <Picker.Item label="200x200" value="200x200" />
            <Picker.Item label="400x400" value="400x400" />
          </Picker>
        </View>
        <Button
          //icon={this.getIcon()}
          style={styles.saveButton}
          loading={this.state.loading}
          color={'#fa3336'}
          mode={'contained'}
          onPress={() => this.updatePhoto()}>
          Upload
        </Button>
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
    alignItems: 'center',
  },
  saveButton: {margin: 10},
});
