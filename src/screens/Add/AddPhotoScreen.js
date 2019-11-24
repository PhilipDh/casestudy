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
import ImagePicker from 'react-native-image-picker';
import theme from '../../../styles/main.theme.js';
import {
  addPhotoUrl,
  getUploadUrl,
  getPhotoLocationUrl,
  getEditByTypeUrl,
  getPeopleUrl,
} from '../../config/api';
import AddPhotoComponent from '../../components/Add/AddPhoto';

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

export default class AddPhotoScreen extends Component<Props, State> {
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
  setSize = text => this.setState({size: text});
  setOwner = text => this.setState({owner: text});
  setArticle = text => this.setState({articleId: text});

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
