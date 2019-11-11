/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {StackNavigator, TabNavigator, DrawerNavigator} from 'react-navigation';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import {StackActions} from 'react-navigation';
import RBSheet from 'react-native-raw-bottom-sheet';

const axios = require('axios').default;

type Props = {
  data: any,
  id: string,
  type: string,
};
type State = {
  data: any,
  type: string,
  id: string,
  loading: boolean,
  disabled: boolean,
  isLoading: boolean,
};

const popAction = StackActions.pop({
  n: 1,
});

export default class PaymentDetails extends Component<Props, State> {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('person', 'Details'),
    };
  };

  constructor(props) {
    super(props);

    //this.props.navigation.getParam('data')
    //
    this.state = {
      isLoading: true,
      data: {},
      type: this.props.navigation.getParam('type'),
      loading: false,
      disabled: false,
      id: this.props.navigation.getParam('id'),
    };
  }

  getButtonText() {
    var result = '';

    if (this.state.type == 'Ad') {
      result = this.state.data.payed ? 'Payed' : 'Pending';
    } else {
      result = this.state.data.payed ? 'Payed' : 'Pay';
    }
    return result;
  }

  getButtonColor() {
    var result = '';

    if (this.state.type == 'Ad') {
      result = this.state.data.payed ? 'green' : '#5D1049';
    } else {
      result = this.state.data.payed ? 'green' : '#5D1049';
    }
    return result;
  }

  getIcon() {
    var result = '';

    if (this.state.type == 'Ad') {
      result = this.state.data.payed ? 'check' : '';
    } else {
      result = this.state.data.payed ? 'check' : '';
    }
    return result;
  }

  updatePayment() {
    this.setState({loading: true});

    var url = 'http://10.0.2.2:3000/ad/' + this.state.data._id;
    var content = {};
    switch (this.state.type) {
      case 'Ad':
        url = 'http://10.0.2.2:3000/ad/' + this.state.data._id;
        content = {placement: this.state.data.placement, payed: 'true'};
        break;
      case 'Article':
        url = 'http://10.0.2.2:3000/article/' + this.state.data._id;
        content = {
          title: this.state.data.title,
          content: this.state.data.content,
          payed: 'true',
        };
        break;
      case 'Photograph':
        url = 'http://10.0.2.2:3000/photograph/' + this.state.data._id;
        content = {size: this.state.data.size, payed: 'true'};
        break;
      default:
    }

    //TODO SHow toast if content is empty -> error

    axios
      .put(url, content)
      .then(data => {
        this.setState({
          loading: false,
          data: data.data,
          disabled: data.data.payed,
        });
      })
      .catch(err => {
        console.log(err);
        return null;
      });
  }

  componentDidMount() {
    console.log(this.state.id);
    var url =
      'http://10.0.2.2:3000/' +
      this.state.type.toLowerCase() +
      '/' +
      this.state.id;

    axios
      .get(url)
      .then(data => {
        this.setState(
          {data: data.data, isLoading: false, disabled: data.data.payed},
          function() {},
        );
      })
      .catch(err => {
        console.log(err);
        return null;
      });
  }

  render() {
    if (this.state.isLoading) {
      return <View></View>;
    } else {
      console.log(this.state.data);
      return (
        <View style={styles.card}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{this.state.data.title}</Text>
            <Text style={styles.subtitleText}>{this.state.type}</Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>
              Payment: {this.state.data.payment}
            </Text>
            <Text style={styles.contentText}>Due: 31/10/19</Text>
            <Text style={styles.contentText}>
              Owner: {this.state.data.owner.name}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              icon={this.getIcon()}
              style={
                this.state.type == 'Ad' ? styles.adButton : styles.generalButton
              }
              loading={this.state.loading}
              disabled={this.state.disabled}
              color={this.getButtonColor()}
              mode={this.state.type == 'Ad' ? 'outlined' : 'contained'}
              onPress={() => this.updatePayment()}>
              {this.getButtonText()}
            </Button>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    height: 250,
    margin: 15,
    borderRadius: 8,
    padding: 5,
  },

  titleContainer: {
    flex: 1,
    marginTop: 5,
    alignItems: 'center',
    flexDirection: 'column',
  },

  contentContainer: {
    flex: 2,
    marginLeft: 15,
    justifyContent: 'center',
  },

  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  adButton: {borderRadius: 15, width: 120, borderWidth: 1},

  generalButton: {
    borderRadius: 15,
    width: 120,
    color: 'green',
  },

  titleText: {
    fontSize: 18,
    marginLeft: 15,
    fontWeight: 'bold',
  },
  subtitleText: {
    fontSize: 14,
    color: '#787878',
  },
  contentText: {
    fontSize: 16,
    paddingTop: 5,
  },
});
