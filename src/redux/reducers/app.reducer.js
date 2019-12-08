import {
  SET_TITLE,
  SET_ISSUE_LIST,
  GET_ISSUE_LIST,
  API_START,
  API_END,
  GET_PAYMENT_LIST,
  SET_PAYMENT_LIST,
  SET_ERROR_MESSAGE,
  SET_CURRENT_ISSUE,
  GET_CURRENT_ISSUE,
  ADD_ARTICLE_TO_ISSUE,
  ADD_AD_TO_ISSUE,
  ADD_PHOTO_TO_ISSUE,
  UPLOAD_PHOTO,
  SET_CURRENT_AD,
  SET_CURRENT_ARTICLE,
  SET_CURRENT_PHOTO,
  GET_CURRENT_AD,
  GET_CURRENT_ARTICLE,
  GET_CURRENT_PHOTO,
  UPDATE_AD_WITH_ID,
  SET_ADS,
  SET_AD_PLACEMENT,
  SET_ARTICLES,
  SET_ARTICLE_TITLE,
  SET_ARTICLE_CONTENT,
  UPDATE_ARTICLE_WITH_ID,
  UPDATE_PHOTO_WITH_ID,
  UPDATE_PHOTO_WITH_IMAGE,
  SET_PHOTOS,
  SET_PHOTO_SIZE,
  SET_CURRENT_PAYMENT,
  SET_PAYMENT_STATUS,
  UPDATE_PAYMENT,
  SET_PAYMENT_FILTER,
} from '../actions/types.actions';

//Default state for store
const defaultState = {
  currentPayment: undefined,
  currentAd: undefined,
  currentPhoto: undefined,
  currentArticle: undefined,
  articles: undefined,
  photos: undefined,
  ads: undefined,
  paymentFilter: {payed: 'ALL'},
  currentIssue: {title: 'Issues'},
  data: [],
  paymentData: undefined,
  isLoading: false,
  errorMessage: '',
};

const content = (state = defaultState, action) => {
  //The reducer receives the actions and determines based on its label what to do with them
  switch (action.type) {
    //Ad related actions
    case SET_ADS:
      return {...state, ads: action.payload};
    case SET_CURRENT_AD:
      return {...state, currentAd: action.payload};
    case SET_AD_PLACEMENT:
      return {
        ...state,
        currentAd: {...state.currentAd, placement: action.payload},
      };
    //Article related actions
    case SET_ARTICLES:
      return {...state, articles: action.payload};
    case SET_CURRENT_ARTICLE:
      return {...state, currentArticle: action.payload};
    case SET_ARTICLE_TITLE:
      return {
        ...state,
        currentArticle: {...state.currentArticle, title: action.payload},
      };
    case SET_ARTICLE_CONTENT:
      return {
        ...state,
        currentArticle: {...state.currentArticle, content: action.payload},
      };
    //Photo related actions
    case SET_PHOTOS:
      return {...state, photos: action.payload};
    case SET_CURRENT_PHOTO:
      return {...state, currentPhoto: action.payload};
    case SET_PHOTO_SIZE:
      return {
        ...state,
        currentPhoto: {...state.currentPhoto, size: action.payload},
      };

    //Other
    case SET_ISSUE_LIST:
      return {...state, data: action.payload};
    case SET_CURRENT_ISSUE:
      return {
        ...state,
        currentIssue: action.payload,
        articles: action.payload.articles,
        ads: action.payload.ads,
        photos: action.payload.photos,
      };
    case SET_PAYMENT_LIST:
      return {...state, paymentData: action.payload};
    case SET_CURRENT_PAYMENT:
      return {...state, currentPayment: action.payload};
    case SET_PAYMENT_STATUS:
      return {
        ...state,
        currentPayment: {
          ...state.currentPayment,
          payed: action.payload.payed,
          escalated: action.payload.escalated,
        },
      };
    case SET_PAYMENT_FILTER:
      return {
        ...state,
        paymentFilter: {...state.paymentFilter, payed: action.payload},
      };
    case SET_ERROR_MESSAGE:
      return {...state, errorMessage: action.payload};
    //If the label is API start and the payload contains the following labels set the loading state to true
    case API_START:
      if (
        action.payload === UPDATE_PAYMENT ||
        action.payload === UPDATE_PHOTO_WITH_IMAGE ||
        action.payload === UPDATE_PHOTO_WITH_ID ||
        action.payload === UPDATE_ARTICLE_WITH_ID ||
        action.payload === UPDATE_AD_WITH_ID ||
        action.payload === GET_CURRENT_AD ||
        action.payload === GET_CURRENT_ARTICLE ||
        action.payload === GET_CURRENT_PHOTO ||
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
    //If the label is API end and the payload contains the following labels set the loading state to false
    case API_END:
      if (
        action.payload === UPDATE_PAYMENT ||
        action.payload === UPDATE_PHOTO_WITH_IMAGE ||
        action.payload === UPDATE_PHOTO_WITH_ID ||
        action.payload === UPDATE_ARTICLE_WITH_ID ||
        action.payload === UPDATE_AD_WITH_ID ||
        action.payload === GET_CURRENT_AD ||
        action.payload === GET_CURRENT_ARTICLE ||
        action.payload === GET_CURRENT_PHOTO ||
        action.payload === ADD_PHOTO_TO_ISSUE ||
        action.payload === ADD_ARTICLE_TO_ISSUE ||
        action.payload === ADD_AD_TO_ISSUE ||
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
