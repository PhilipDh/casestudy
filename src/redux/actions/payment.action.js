import {createAction} from 'redux-actions';
import {
  API,
  SET_PAYMENT_LIST,
  GET_PAYMENT_LIST,
  SET_ERROR_MESSAGE,
} from './types.actions';
import {getPaymentsUrl} from '../../config/api';

export function getPaymentList(id) {
  return apiAction({
    url: getPaymentsUrl(id),
    method: 'GET',
    onSuccess: setPaymentList,
    onFailure: setErrorMessage,
    label: GET_PAYMENT_LIST,
  });
}

function setPaymentList(data) {
  return {
    type: SET_PAYMENT_LIST,
    payload: data,
  };
}

function setErrorMessage(message) {
  return {
    type: SET_ERROR_MESSAGE,
    payload: message,
  };
}

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
