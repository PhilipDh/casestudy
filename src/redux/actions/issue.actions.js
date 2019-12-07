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
  GET_CURRENT_AD,
  SET_CURRENT_AD,
  GET_CURRENT_ARTICLE,
  SET_CURRENT_ARTICLE,
  GET_CURRENT_PHOTO,
  SET_CURRENT_PHOTO,
  UPDATE_AD_WITH_ID,
  SET_ADS,
  SET_AD_PLACEMENT,
  SET_ARTICLE_TITLE,
  SET_ARTICLE_CONTENT,
  SET_ARTICLES,
  UPDATE_ARTICLE_WITH_ID,
  SET_PHOTOS,
  UPDATE_PHOTO_WITH_ID,
  SET_PHOTO_SIZE,
  UPDATE_PHOTO_WITH_IMAGE,
} from './types.actions';
import {
  getIssueUrl,
  getIssueByIdUrl,
  addArticleUrl,
  addAdUrl,
  addPhotoUrl,
  getAdUrl,
  getArticleUrl,
  getPhotoUrl,
  getUploadUrl,
} from '../../config/api';
import {createFormData} from '../../../utils/formatting';

//export const setIssue = createAction(SET_ISSUE);
/* This is equivalent to
export const setTitle = (payload) => {
  return {
    type: SET_TITLE,
    payload: payload
  };
};
*/

export function updateAd(id, content) {
  return apiAction({
    url: getAdUrl(id),
    method: 'PUT',
    data: content,
    onSuccess: setAds,
    onFailure: setErrorMessage,
    label: UPDATE_AD_WITH_ID,
  });
}

export function getCurrentAd(id) {
  return apiAction({
    url: getAdUrl(id),
    onSuccess: setCurrentAd,
    onFailure: setErrorMessage,
    label: GET_CURRENT_AD,
  });
}
export const setAdPlacement = createAction(SET_AD_PLACEMENT);

export function updateArticle(id, content) {
  return apiAction({
    url: getArticleUrl(id),
    method: 'PUT',
    data: content,
    onSuccess: setArticles,
    onFailure: setErrorMessage,
    label: UPDATE_ARTICLE_WITH_ID,
  });
}
export function getCurrentArticle(id) {
  return apiAction({
    url: getArticleUrl(id),
    onSuccess: setCurrentArticle,
    onFailure: setErrorMessage,
    label: GET_CURRENT_ARTICLE,
  });
}
export const setArticleTitle = createAction(SET_ARTICLE_TITLE);
export const setArticleContent = createAction(SET_ARTICLE_CONTENT);

export function updatePhoto(id, content) {
  return apiAction({
    url: getPhotoUrl(id),
    method: 'PUT',
    data: content,
    onSuccess: setPhotos,
    onFailure: setErrorMessage,
    label: UPDATE_PHOTO_WITH_ID,
  });
}

export function updatePhotoWithImage(id, content) {
  return apiAction({
    url: getUploadUrl(),
    method: 'POST',
    data: content,
    onSuccess: setPhotos,
    onFailure: setErrorMessage,
    label: UPDATE_PHOTO_WITH_IMAGE,
  });
}

export function getCurrentPhoto(id) {
  return apiAction({
    url: getPhotoUrl(id),
    onSuccess: setCurrentPhoto,
    onFailure: setErrorMessage,
    label: GET_CURRENT_PHOTO,
  });
}

export const setPhotoSize = createAction(SET_PHOTO_SIZE);

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

export function setCurrentAd(data) {
  return {
    type: SET_CURRENT_AD,
    payload: data,
  };
}

export function setCurrentArticle(data) {
  return {
    type: SET_CURRENT_ARTICLE,
    payload: data,
  };
}

export function setCurrentPhoto(data) {
  return {
    type: SET_CURRENT_PHOTO,
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

function setAds(data) {
  return {
    type: SET_ADS,
    payload: data,
  };
}
function setArticles(data) {
  return {
    type: SET_ARTICLES,
    payload: data,
  };
}
function setPhotos(data) {
  return {
    type: SET_PHOTOS,
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
