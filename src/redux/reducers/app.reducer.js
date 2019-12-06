import {
  SET_TITLE,
  SET_ISSUE_LIST,
  GET_ISSUE_LIST,
  API_START,
  API_END,
  SET_SELECTED_ISSUE,
  GET_PAYMENT_LIST,
  SET_PAYMENT_LIST,
  SET_ERROR_MESSAGE,
  SET_CURRENT_ISSUE,
  GET_CURRENT_ISSUE,
  ADD_ARTICLE_TO_ISSUE,
  ADD_AD_TO_ISSUE,
  ADD_PHOTO_TO_ISSUE,
  UPLOAD_PHOTO,
} from '../actions/types.actions';

const defaultState = {
  title: 'Issues',
  issueItem: {title: 'Issues'},
  currentIssue: {title: 'Issues'},
  data: undefined,
  paymentData: undefined,
  isLoading: false,
  errorMessage: '',
};

const content = (state = defaultState, action) => {
  switch (action.type) {
    case SET_TITLE: {
      return {...state, title: action.payload};
    }
    case SET_SELECTED_ISSUE:
      return {...state, issueItem: action.payload};
      break;
    case SET_ISSUE_LIST:
      return {...state, data: action.payload};
      break;
    case SET_CURRENT_ISSUE:
      return {...state, currentIssue: action.payload};
      break;
    case SET_PAYMENT_LIST:
      return {...state, paymentData: action.payload};
      break;
    case SET_ERROR_MESSAGE:
      return {...state, errorMessage: action.payload};
      break;
    case API_START:
      if (
        action.payload === ADD_PHOTO_TO_ISSUE ||
        action.payload === ADD_AD_TO_ISSUE ||
        action.payload === ADD_ARTICLE_TO_ISSUE ||
        action.payload === GET_CURRENT_ISSUE ||
        action.payload === GET_ISSUE_LIST ||
        action.payload === GET_PAYMENT_LIST
      ) {
        return {...state, isLoading: true};
      }
      break;
    case API_END:
      if (
        action.payload === ADD_PHOTO_TO_ISSUE ||
        action.payload === ADD_ARTICLE_TO_ISSUE ||
        action.payload === GET_CURRENT_ISSUE ||
        action.payload === GET_ISSUE_LIST ||
        action.payload === GET_PAYMENT_LIST
      ) {
        return {...state, isLoading: false};
      }
      break;
    default:
      return state;
  }
};

export default content;
