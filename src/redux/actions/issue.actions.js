import {createAction} from 'redux-actions';
import {
  SET_TITLE,
  GET_ISSUE_LIST,
  API,
  SET_ISSUE_LIST,
  SET_SELECTED_ISSUE,
} from './types.actions';
import {getIssueUrl} from '../../config/api';

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
    onFailure: () => console.log('Error in network request'),
    label: GET_ISSUE_LIST,
  });
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
