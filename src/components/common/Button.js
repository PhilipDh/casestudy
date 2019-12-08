import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import theme from '../../../styles/main.theme';

/*
  Custom Button component that has more customization options than the native Button from react-native
  Uses TouchableOpacity to handle click events and a Text componentn with an optional Icon
*/
class Button extends Component {
  renderIcon = (icon, color = 'grey', size = 18) => {
    if (!icon) return;
    return (
      <Icon name={icon} color={color} size={size} style={{paddingRight: 5}} />
    );
  };

  render() {
    const {text, disabled, size, iconColor} = this.props;

    const buttonProps = {};

    const style = [
      styles.buttonStyle,
      this.props.buttonStyle,
      disabled ? styles.disabledButtonStyle : null,
    ];

    const textStyle = [
      styles.textStyle,
      this.props.textStyle,
      disabled ? styles.disabledTextStyle : null,
    ];

    if (!disabled) {
      (buttonProps.onPress = this.props.onPress),
        (buttonProps.onLongPress = this.props.onLongPress);
    }

    return (
      <TouchableOpacity {...buttonProps} style={style}>
        {this.renderIcon(
          this.props.icon,
          iconColor ? iconColor : 'grey',
          size ? size : 18,
        )}
        <Text style={textStyle}>{text ? text.toUpperCase() : ''}</Text>
      </TouchableOpacity>
    );
  }
}

export default Button;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: theme.colors.accent,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textStyle: {
    color: theme.setContrast(theme.colors.primary),
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 1,
  },

  disabledButtonStyle: {
    borderWidth: 1,
    borderColor: '#565656',
    backgroundColor: 'transparent',
  },

  disabledTextStyle: {
    color: '#565656',
  },
});
