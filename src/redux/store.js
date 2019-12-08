/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import {createStore, compose, applyMiddleware} from 'redux';
import rootReducer from './reducers/root.reducer';
import apiMiddleware from './middleware/api';

const enhancerList = [];

//Store with custom middleware
const initStore = () =>
  createStore(rootReducer, applyMiddleware(apiMiddleware));

module.exports = {
  initStore,
};
