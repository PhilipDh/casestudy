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

/*
  File that holds all my actions that are related to issues
  There are two kinds of actions in this file:
    -API actions
    -Non API actions
  API actions are those that use the function "apiAction"  to create a new action that will do a network request. This aciton will have a type that is not "rejected" by the middleware.
  The apiAction exists to avoid a lot of boilerplate code to make an API request.
  The non api actions directly return a type and a payload. They will be "rejected" by the middleware and directly change the store.
*/

//API request to update a certain ad
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

//API request to get an ad with a certain id
export function getCurrentAd(id) {
  return apiAction({
    url: getAdUrl(id),
    onSuccess: setCurrentAd,
    onFailure: setErrorMessage,
    label: GET_CURRENT_AD,
  });
}
//Sets the current ad placement
export const setAdPlacement = createAction(SET_AD_PLACEMENT);

//API request to update a certain article
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
//API request to get an article with a certain id
export function getCurrentArticle(id) {
  return apiAction({
    url: getArticleUrl(id),
    onSuccess: setCurrentArticle,
    onFailure: setErrorMessage,
    label: GET_CURRENT_ARTICLE,
  });
}
//Setters for current article
export const setArticleTitle = createAction(SET_ARTICLE_TITLE);
export const setArticleContent = createAction(SET_ARTICLE_CONTENT);

//API request to update a certain photo
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
//API request to update a certain photo with a new image
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

//API request to get an photo with a certain id
export function getCurrentPhoto(id) {
  return apiAction({
    url: getPhotoUrl(id),
    onSuccess: setCurrentPhoto,
    onFailure: setErrorMessage,
    label: GET_CURRENT_PHOTO,
  });
}

//Setter for photo size
export const setPhotoSize = createAction(SET_PHOTO_SIZE);
//export const setPhotoSize = createAction(SET_PHOTO_SIZE);
/* This is equivalent to
export const setPhotoSize = (payload) => {
  return {
    type: SET_PHOTO_SIZE,
    payload: payload
  };
};
*/

//API request to get a list of all issues
export function getIssueList() {
  return apiAction({
    url: getIssueUrl(),
    onSuccess: setIssueList,
    onFailure: setErrorMessage,
    label: GET_ISSUE_LIST,
  });
}

//API request to add an article to an issue
export function addArticleToIssue(id, content) {
  return apiAction({
    url: addArticleUrl(id),
    method: 'POST',
    data: content,
    onSuccess: setArticles,
    onFailure: setErrorMessage,
    label: ADD_ARTICLE_TO_ISSUE,
  });
}

//API request to add an ad to an issue
export function addAdToIssue(id, content) {
  return apiAction({
    url: addAdUrl(id),
    method: 'POST',
    data: content,
    onSuccess: setAds,
    onFailure: setErrorMessage,
    label: ADD_AD_TO_ISSUE,
  });
}

//API request to add a photo to an issue
export function addPhotoToIssue(id, content) {
  return apiAction({
    url: addPhotoUrl(id),
    method: 'POST',
    data: content,
    onSuccess: setPhotos,
    onFailure: setErrorMessage,
    label: ADD_PHOTO_TO_ISSUE,
  });
}

//API request to get the selected issue
export function getCurrentIssue(id) {
  return apiAction({
    url: getIssueByIdUrl(id),
    onSuccess: setCurrentIssue,
    onFailure: setErrorMessage,
    label: GET_CURRENT_ISSUE,
  });
}

//Sets the current issue
function setCurrentIssue(data) {
  return {
    type: SET_CURRENT_ISSUE,
    payload: data,
  };
}

//Sets the current Ad
export function setCurrentAd(data) {
  return {
    type: SET_CURRENT_AD,
    payload: data,
  };
}
//Sets the current article
export function setCurrentArticle(data) {
  return {
    type: SET_CURRENT_ARTICLE,
    payload: data,
  };
}

//Sets the current photo
export function setCurrentPhoto(data) {
  return {
    type: SET_CURRENT_PHOTO,
    payload: data,
  };
}

//Sets an error message
function setErrorMessage(message) {
  return {
    type: SET_ERROR_MESSAGE,
    payload: message,
  };
}

//Sets the issue list returned from the API request
function setIssueList(data) {
  return {
    type: SET_ISSUE_LIST,
    payload: data,
  };
}

//Set all ads for an issue
function setAds(data) {
  return {
    type: SET_ADS,
    payload: data,
  };
}
//Set all articles for an issue
function setArticles(data) {
  return {
    type: SET_ARTICLES,
    payload: data,
  };
}
//Set all photos for an issue
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
