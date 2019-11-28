/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../../styles/main.theme.js';
import TextInput from '../../components/common/TextInput';
import Button from '../../components/common/Button';
const axios = require('axios').default;

//Type definition for states of this class. Helps with type safety
type Props = {
  isLoading: boolean,
  title: string,
  content: string,
  setTitle: any,
  setContent: any,
  updateArticle: any,
};

export default class EditArticle extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      setTitle,
      setContent,
      title,
      content,
      isLoading,
      updateArticle,
    } = this.props;

    if (isLoading) {
      return (
        <View>
          <Text>Loading</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <TextInput
              text={title}
              label={'Title'}
              onTextChange={setTitle}
              secure={false}
              multiline={false}
            />
          </View>

          <View style={styles.contentContainer}>
            <TextInput
              text={content}
              label={'Content'}
              onTextChange={setContent}
              secure={false}
              multiline={true}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              buttonStyle={styles.saveButton}
              text={'Save'}
              onPress={updateArticle}
            />
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  saveButton: {
    padding: 8,
    width: 120,
    borderRadius: 4,
    backgroundColor: theme.colors.accent,
  },
  titleContainer: {},
  contentContainer: {},
  buttonContainer: {
    //justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
