import {createAction} from 'redux-actions';
import {API_END, API_ERROR, API_START} from './types.actions.js';

export const apiStart = label => ({
  type: API_START,
  payload: label,
});

export const apiEnd = label => ({
  type: API_END,
  payload: label,
});

export const apiError = error => ({
  type: API_ERROR,
  payload: error,
});
