/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {View} from 'react-native';
//import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getPhotoUrl, getUploadUrl, getPhotoLocationUrl} from '../../config/api';
import EditPhotoComponent from '../../components/Edit/EditPhoto';

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

export default class EditPhotoScreen extends Component<Props, State> {
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

  setSize = size => this.setState({size: size});

  //Function that will open the Image Gallery of the phone and sets the selected photo to be the photo that should be uploaded
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

  //Returns the photo that should be displayed by the ImageView
  getPhoto = () => {
    //If a photo has been locally selected show this
    if (this.state.uploadPhoto) {
      return this.state.uploadPhoto.uri;
    } else {
      //Otherwise show the photo returned by the server
      return getPhotoLocationUrl(this.state.photoLocation);
    }
  };

  //Creates the data that can be processed by the backend to save an image
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

  //Uploads the currently selected photo
  handleUploadPhoto = () => {
    fetch(getUploadUrl(), {
      method: 'POST',
      body: this.createFormData(this.state.uploadPhoto, {
        id: this.state.id,
        size: this.state.size,
      }),
    })
      .then(response => response.json())
      .then(response => {
        console.log('upload succes', response);
        //alert('Upload success!');
        this.setState({photoLocation: response.location});
      })
      .catch(error => {
        console.log('upload error', error);
        alert('Upload failed!');
      });
  };

  //Function that is called on button click that will update the Photograph
  updatePhoto = () => {
    //If there is no locally selected photo don't trigger the upload function
    if (this.state.uploadPhoto != null) {
      this.handleUploadPhoto();
    }
    var url = getPhotoUrl(this.state.id);

    var content = {
      size: this.state.size,
      payed: this.state.payed.toString(),
    };
    axios
      .put(url, content)
      .then(data => {
        this.setState({
          loading: false,
          size: data.data.size,
        });
        this.state.reloadList();
        this.props.navigation.goBack();
      })
      .catch(err => {
        console.log(err);
        return null;
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

  render() {
    return (
      <EditPhotoComponent
        photoLocation={this.state.photoLocation}
        handleChoosePhoto={this.handleChoosePhoto}
        setSize={this.setSize}
        size={this.state.size}
        updatePhoto={this.updatePhoto}
        getPhoto={this.getPhoto}
        isLoading={this.state.isLoading}
      />
    );
  }
}
