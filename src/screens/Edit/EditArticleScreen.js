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
import {getArticleUrl} from '../../config/api';
import EditArticleComponent from '../../components/Edit/EditArticle';
import {connect} from 'react-redux';
import {
  updateArticle,
  setArticleTitle,
  setArticleContent,
} from '../../redux/actions/issue.actions';
const axios = require('axios').default;

type Props = {};

//Type definition for states of this class. Helps with type safety
type State = {
  data: any,
  isLoading: boolean,
  loading: boolean,
  title: string,
  content: string,
  reloadList: any,
};

class EditArticleScreen extends Component<State, Props> {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      id: this.props.navigation.getParam('id'),
      loading: false,
      isLoading: true,
      title: '',
      content: '',
      reloadList: this.props.navigation.getParam('reloadList'),
    };
  }

  setTitle = text => this.props.setArticleTitle(text);

  setContent = text => this.props.setArticleContent(text);

  updateArticle = () => {
    var body = {
      title: this.props.data.title,
      content: this.props.data.content,
      issueId: this.props.issueId,
    };

    //TODO SHow toast if content is empty -> error
    this.props.updateArticle(this.props.data._id, body);
    this.props.navigation.goBack();
  };

  render() {
    if (this.props.isLoading) {
      return <View></View>;
    } else {
      return (
        <EditArticleComponent
          setTitle={this.setTitle}
          setContent={this.setContent}
          title={this.props.data.title}
          content={this.props.data.content}
          isLoading={this.props.isLoading}
          updateArticle={this.updateArticle}
        />
      );
    }
  }
}

const mapStateToProps = state => ({
  data: state.issue.currentArticle,
  isLoading: state.issue.isLoading,
  errorMessage: state.issue.errorMessage,
  issueId: state.issue.currentIssue._id,
});

const mapDispatchToProps = dispatch => ({
  updateArticle: (id, content) => dispatch(updateArticle(id, content)),
  setArticleTitle: title => dispatch(setArticleTitle(title)),
  setArticleContent: content => dispatch(setArticleContent(content)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditArticleScreen);
