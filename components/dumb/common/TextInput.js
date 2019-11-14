import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import theme from '../../../styles/main.theme';
import {TextInput, Snackbar, DefaultTheme} from 'react-native-paper';

class TextArea extends Component {
  render() {
    const {
      multiline,
      secure,
      onTextChange,
      text,
      label,
      ...extraProps
    } = this.props;
    return (
      <TextInput
        label={label}
        value={text}
        placeholder={label}
        underlineColor={theme.colors.primary}
        onChangeText={text => onTextChange(text)}
        multiline={multiline ? multiline : false}
        secureTextEntry={secure}
        theme={{...DefaultTheme, colors: {text: 'black'}}}
        style={{backgroundColor: '#FFF', margin: 10}}
      />
    );
  }
}
export default TextArea;
