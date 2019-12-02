import {
  SET_TITLE,
  SET_ISSUE_LIST,
  GET_ISSUE_LIST,
  API_START,
  API_END,
  SET_SELECTED_ISSUE,
  GET_PAYMENT_LIST,
  SET_PAYMENT_LIST,
} from '../actions/types.actions';

const defaultState = {
  title: 'Issues',
  issueItem: {title: 'Issues'},
  data: null,
  paymentData: null,
  isLoading: false,
};

const content = (state = defaultState, action) => {
  switch (action.type) {
    case SET_TITLE: {
      console.log('called set title with title' + action.payload);
      return {...state, title: action.payload};
    }
    case SET_SELECTED_ISSUE:
      return {...state, issueItem: action.payload};
      break;
    case SET_ISSUE_LIST:
      return {...state, data: action.payload};
      break;
    case SET_PAYMENT_LIST:
      return {...state, paymentData: action.payload};
      break;
    case API_START:
      if (
        action.payload === GET_ISSUE_LIST ||
        action.payload === GET_PAYMENT_LIST
      ) {
        return {...state, isLoading: true};
      }
      break;
    case API_END:
      if (
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
