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

/*
  This is my custom middle for my redux store
  Everytime an action is dispatched it will go throug this middleware
  If the aciton has an API label it will execute a network request with the data in the payload
  If it does not have an api label it will just go straight to the reducer
  
*/

const apiMiddleware = ({dispatch}) => next => action => {
  console.log(action.type);
  next(action);

  //If the action is not of the type API pass it to the reducer
  if (action.type !== API) return;

  const {url, method, data, onSuccess, onFailure, label} = action.payload;

  //If the method is get or delete the name of the content that is passed to axios has to be changed
  const dataOrParams = ['GET', 'DELETE'].includes(method) ? 'params' : 'data';

  //Dispatch the apiStart action that will set the isLoading status to true
  if (label) {
    dispatch(apiStart(label));
  }

  //Start a network request with the specified url, method and data
  axios
    .request({
      url,
      method,
      [dataOrParams]: data,
    })
    .then(data => {
      //Execute the onSuccess funciton that was passed in the payload, usually a function of the normal action format
      dispatch(onSuccess(data.data));
      //Reset error message
      dispatch(onFailure(''));
    })
    .catch(error => {
      console.log(error.message);
      //Set the error messsage on failure
      dispatch(apiError(error));
      dispatch(onFailure(error.message));
    })
    .finally(() => {
      if (label) {
        //Set is loading to false
        dispatch(apiEnd(label));
      }
    });
};

export default apiMiddleware;
