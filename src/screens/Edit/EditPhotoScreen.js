/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import {getPhotoUrl, getUploadUrl, getPhotoLocationUrl} from '../../config/api';
import EditPhotoComponent from '../../components/Edit/EditPhoto';
import {getPhotoDetails} from '../../redux/selectors/issue.selectors';
import {connect} from 'react-redux';
import {
  updatePhoto,
  updatePhotoWithImage,
  setPhotoSize,
} from '../../redux/actions/issue.actions';
const axios = require('axios').default;

type Props = {
  size: string,
  isLoading: boolean,
  id: string,
};
//Type definition for states of this class. Helps with type safety
type State = {
  uploadPhoto: any,
};

class EditPhotoScreen extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      uploadPhoto: null,
    };
  }

  setSize = size => this.props.setPhotoSize(size);
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
      return getPhotoLocationUrl(this.props.data._id);
    }
  };

  //Creates the data that can be processed by the backend to save an image
  createFormData = (photo, body) => {
    const data = new FormData();

    data.append('avatar', {
      name: this.props.data.location.slice(8),
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

  //Function that is called on button click that will update the Photograph
  updatePhoto = () => {
    var content = {
      size: this.props.data.size,
      issueId: this.props.issueId,
      id: this.props.data._id,
    };
    //If there is no locally selected photo don't trigger the upload function
    if (this.state.uploadPhoto == null) {
      this.props.updatePhoto(this.props.data._id, content);
    } else {
      this.props.updatePhotoWithImage(
        this.props.data._id,
        this.createFormData(this.state.uploadPhoto, content),
      );
    }
    this.props.navigation.goBack();
  };

  render() {
    if (this.props.isLoading) {
      return <View></View>;
    } else {
      return (
        <EditPhotoComponent
          photoLocation={this.props.data.location}
          handleChoosePhoto={this.handleChoosePhoto}
          setSize={this.setSize}
          size={this.props.data.size}
          updatePhoto={this.updatePhoto}
          getPhoto={this.getPhoto}
          isLoading={this.props.isLoading}
        />
      );
    }
  }
}

const mapStateToProps = state => ({
  data: state.issue.currentPhoto,
  isLoading: state.issue.isLoading,
  issueId: state.issue.currentIssue._id,
});

const mapDispatchToProps = dispatch => ({
  updatePhotoWithImage: (id, content) =>
    dispatch(updatePhotoWithImage(id, content)),
  updatePhoto: (id, content) => dispatch(updatePhoto(id, content)),
  setPhotoSize: size => dispatch(setPhotoSize(size)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPhotoScreen);
