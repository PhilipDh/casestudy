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
import theme from '../../../styles/main.theme.js';
import {
  addPhotoUrl,
  getUploadUrl,
  getPhotoLocationUrl,
  getEditByTypeUrl,
  getPeopleUrl,
} from '../../config/api';
import {makeId} from '../../../utils/formatting';
import AddPhotoComponent from '../../components/Add/AddPhoto';
import {connect} from 'react-redux';
import {addPhotoToIssue} from '../../redux/actions/issue.actions';

const axios = require('axios').default;

type Props = {};
//Type definition for states of this class. Helps with type safety
type State = {
  size: string,
  isLoading: boolean,
  loading: boolean,
  photoLocation: any,
  uploadPhoto: any,
  title: string,
  payment: string,
  owner: string,
  articleId: string,
};

class AddPhotoScreen extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      size: '200x200',
      isLoading: true,
      loading: false,
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

  //Setters for the different states
  setTitle = text => this.setState({title: text});
  setPayment = text => this.setState({payment: text});
  setSize = text => this.setState({size: text});
  setOwner = text => this.setState({owner: text});
  setArticle = text => this.setState({articleId: text});

  //Function that opens the Image Picker activity on the phone.
  //Once an image has been picked the result will be stored in the photoLocation state
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

  //Build the necessary content for uploading an image.
  createFormData = (photo, body) => {
    const data = new FormData();

    //The name has to match the upload name on the backend, in this case 'avatar'
    data.append('avatar', {
      name: body.location,
      type: photo.type,
      uri:
        //Based on the OS of the device change the URI to match the needed pattern
        Platform.OS === 'android'
          ? photo.uri
          : photo.uri.replace('file://', ''),
    });

    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });
    return data;
  };

  //Upload the photo to the database
  handleUploadPhoto = (id, size) => {
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

  //Create a new Photo entry in the database
  addPhoto = () => {
    var url = addPhotoUrl(this.props.currentIssue._id);
    //Set the due date to the date the issue releases
    let dueDate = new Date(this.props.currentIssue.releaseDate);
    var c = {
      size: this.state.size,
      title: this.state.title,
      amount: this.state.payment,
      owner: this.state.owner,
      due:
        dueDate.getFullYear() +
        '-' +
        (dueDate.getMonth() + 1) +
        '-' +
        dueDate.getDate(),
      location: makeId(10),
      articleId: this.state.articleId,
    };

    var content = this.createFormData(this.state.photoLocation, c);

    this.props.addPhotoToIssue(this.props.currentIssue._id, content);
    this.props.navigation.goBack();
  };

  //Get a list of all photographers
  getPeople = () => {
    let url = getPeopleUrl();
    return axios
      .get(url)
      .then(data => {
        //Filter the returned data for people that have the job Photographer
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

  //Get a list of all articles that the photo can be shown in
  getArticleList = () => {
    var url = getEditByTypeUrl(this.props.currentIssue._id, 'article');
    return axios
      .get(url)
      .then(data => {
        this.setState({availableArticles: data.data}, function() {});
      })
      .catch(err => {
        return null;
      });
  };

  componentDidMount() {
    //Execute both getPeople and getArticleList together, once this is done set the loading state to false
    axios.all([this.getArticleList(), this.getPeople()]).then(
      axios.spread(() => {
        this.setState({isLoading: false});
      }),
    );
  }

  render() {
    const {photoLocation} = this.state;
    return (
      <AddPhotoComponent
        setSize={this.setSize}
        setPayment={this.setPayment}
        setTitle={this.setTitle}
        setOwner={this.setOwner}
        setArticle={this.setArticle}
        size={this.state.size}
        payment={this.state.payment}
        title={this.state.title}
        owner={this.state.owner}
        articleId={this.state.articleId}
        isLoading={this.state.isLoading}
        addPhoto={this.addPhoto}
        availablePeople={this.state.availablePeople}
        availableArticles={this.state.availableArticles}
        handleChoosePhoto={this.handleChoosePhoto}
        photoLocation={this.state.photoLocation}
      />
    );
  }
}

//States from the redux store that should be mapped to props in this component
const mapStateToProps = state => ({
  currentIssue: state.issue.currentIssue,
});

//Actions that should be mapped to props in this component
const mapDispatchToProps = dispatch => ({
  addPhotoToIssue: (id, content) => dispatch(addPhotoToIssue(id, content)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPhotoScreen);
