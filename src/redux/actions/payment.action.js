import {createAction} from 'redux-actions';
import {
  API,
  SET_PAYMENT_LIST,
  GET_PAYMENT_LIST,
  SET_ERROR_MESSAGE,
  SET_CURRENT_PAYMENT,
  UPDATE_PAYMENT,
  SET_PAYMENT_STATUS,
  SET_PAYMENT_FILTER,
} from './types.actions';
import {getPaymentsUrl, getUpdatePaymentUrl} from '../../config/api';

/*
  This file holds all actions related to payments
  For an explanation on what the different types are see issue.actions.js
*/

//API request to get all payments
export function getPaymentList(id) {
  return apiAction({
    url: getPaymentsUrl(),
    method: 'GET',
    onSuccess: setPaymentList,
    onFailure: setErrorMessage,
    label: GET_PAYMENT_LIST,
  });
}

//Takes the result returned from the payment API request and stores it in the payload
function setPaymentList(data) {
  return {
    type: SET_PAYMENT_LIST,
    payload: data,
  };
}

//Takes the data that was selected from the selected item in payment list and stores it in the paylaod
export function setCurrentPayment(data) {
  return {
    type: SET_CURRENT_PAYMENT,
    payload: data,
  };
}

//API request to update a certain payment
export function updatePayment(id, data) {
  return apiAction({
    url: getUpdatePaymentUrl(id),
    method: 'POST',
    data: data,
    onSuccess: setPaymentList,
    onFailure: setErrorMessage,
    label: UPDATE_PAYMENT,
  });
}

//Takes the updated payment status and stores it in paylaod
export function setPaymentStatus(data) {
  return {
    type: SET_PAYMENT_STATUS,
    payload: data,
  };
}

//Sets the filter for the payment list
export function setPaymentFilter(filter) {
  return {
    type: SET_PAYMENT_FILTER,
    payload: filter,
  };
}

//Sets an error message
function setErrorMessage(message) {
  return {
    type: SET_ERROR_MESSAGE,
    payload: message,
  };
}

//Boilerplate code for making an API request
function apiAction({
  url = '',
  method = 'GET',
  data = null,
  onSuccess = () => {},
  onFailure = () => {},
  label = '',
}) {
  return {
    type: API,
    payload: {
      url,
      method,
      data,
      onSuccess,
      onFailure,
      label,
    },
  };
}
