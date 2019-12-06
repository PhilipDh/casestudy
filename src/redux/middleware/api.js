/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {API} from '../actions/types.actions';
import {apiError, apiStart, apiEnd} from '../actions/api.actions';

const axios = require('axios').default;

const apiMiddleware = ({dispatch}) => next => action => {
  console.log(action.type);
  next(action);

  if (action.type !== API) return;

  const {url, method, data, onSuccess, onFailure, label} = action.payload;

  const dataOrParams = ['GET', 'DELETE'].includes(method) ? 'params' : 'data';

  if (label) {
    dispatch(apiStart(label));
  }
  console.log('INn middleware content is: ');
  console.log(data);
  axios
    .request({
      url,
      method,
      [dataOrParams]: data,
    })
    .then(data => {
      dispatch(onSuccess(data.data));
      dispatch(onFailure(''));
    })
    .catch(error => {
      console.log(error.message);
      dispatch(apiError(error));
      dispatch(onFailure(error.message));
    })
    .finally(() => {
      if (label) {
        dispatch(apiEnd(label));
      }
    });
};

export default apiMiddleware;
