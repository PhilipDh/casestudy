import {createAction} from 'redux-actions';
import {
  SET_TITLE,
  GET_ISSUE_LIST,
  API,
  SET_ISSUE_LIST,
  SET_SELECTED_ISSUE,
  SET_ERROR_MESSAGE,
  GET_CURRENT_ISSUE,
  SET_CURRENT_ISSUE,
  ADD_ARTICLE_TO_ISSUE,
  ADD_AD_TO_ISSUE,
  ADD_PHOTO_TO_ISSUE,
  UPLOAD_PHOTO,
} from './types.actions';
import {
  getIssueUrl,
  getIssueByIdUrl,
  addArticleUrl,
  addAdUrl,
  addPhotoUrl,
} from '../../config/api';
import {createFormData} from '../../../utils/formatting';

export const setTitle = createAction(SET_TITLE);
//export const setIssue = createAction(SET_ISSUE);
/* This is equivalent to
export const setTitle = (payload) => {
  return {
    type: SET_TITLE,
    payload: payload
  };
};
*/

export const selectIssue = createAction(SET_SELECTED_ISSUE);

export function getIssueList() {
  return apiAction({
    url: getIssueUrl(),
    onSuccess: setIssueList,
    onFailure: setErrorMessage,
    label: GET_ISSUE_LIST,
  });
}

export function addArticleToIssue(id, content) {
  return apiAction({
    url: addArticleUrl(id),
    method: 'POST',
    data: content,
    onSuccess: setCurrentIssue,
    onFailure: setErrorMessage,
    label: ADD_ARTICLE_TO_ISSUE,
  });
}

export function addAdToIssue(id, content) {
  return apiAction({
    url: addAdUrl(id),
    method: 'POST',
    data: content,
    onSuccess: setCurrentIssue,
    onFailure: setErrorMessage,
    label: ADD_AD_TO_ISSUE,
  });
}

export function addPhotoToIssue(id, content) {
  return apiAction({
    url: addPhotoUrl(id),
    method: 'POST',
    data: content,
    onSuccess: setCurrentIssue,
    onFailure: setErrorMessage,
    label: ADD_PHOTO_TO_ISSUE,
  });
}

export function getCurrentIssue(id) {
  return apiAction({
    url: getIssueByIdUrl(id),
    onSuccess: setCurrentIssue,
    onFailure: setErrorMessage,
    label: GET_CURRENT_ISSUE,
  });
}

function setCurrentIssue(data) {
  return {
    type: SET_CURRENT_ISSUE,
    payload: data,
  };
}

function setErrorMessage(message) {
  return {
    type: SET_ERROR_MESSAGE,
    payload: message,
  };
}

function setIssueList(data) {
  return {
    type: SET_ISSUE_LIST,
    payload: data,
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
