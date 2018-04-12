import {
  GET_USER_DATA_REQUEST_POST,
  GET_USER_DATA_RECEIVE_SUCCESS_POST,
  GET_USER_DATA_RECEIVE_ERROR_POST,
  CHANGE_USER_DATA_FIELDS,
  SUBMIT_USER_DATA_RECEIVE_ERROR_POST,
  SUBMIT_USER_DATA_RECEIVE_SUCCESS_POST,
  SUBMIT_USER_DATA_REQUEST_POST
} from '../action/userData';

const initialUserData = {
  isGettingData: false,
  userDataFields: {
    name: {
      value: ''
    },
    sex: {
      value: ''
    },
    imgUrl: {
      value: []
    }
  },
  isSubmittingData: false
};

export const userData = (state = initialUserData, action) => {
  switch(action.type){
    case GET_USER_DATA_REQUEST_POST:
      return {...state, isGettingData: true};
    case GET_USER_DATA_RECEIVE_SUCCESS_POST:
      return {...state, isGettingData: false, userDataFields: {name: {value: action.userData.name}, sex: {value: action.userData.sex}, imgUrl: {value: [{response:{url: action.userData.imgUrl ? action.userData.imgUrl : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"}}]}}};
    case GET_USER_DATA_RECEIVE_ERROR_POST:
      return {
        ...state, 
        isGettingData: false,
        userDataFields: {
          ...state.userDataFields,
          [action.errorType]: {
            ...state.userDataFields[action.errorType],
            errors: [{field: action.errorType, message: action.error}]
          }
        }
      };
    case CHANGE_USER_DATA_FIELDS:
      return {...state, userDataFields: {...state.userDataFields, ...action.fieldsChanged}}
    case SUBMIT_USER_DATA_REQUEST_POST:
      return {...state, isSubmittingData: true};
    case SUBMIT_USER_DATA_RECEIVE_SUCCESS_POST:
      return {...state, isSubmittingData: false};
    case SUBMIT_USER_DATA_RECEIVE_ERROR_POST:
      return {
        ...state, 
        isSubmittingData: false,
        userDataFields: {
          ...state.userDataFields,
          [action.errorType]: {
            ...state.userDataFields[action.errorType],
            errors: [{field: action.errorType, message: action.error}]
          }
        }
      };
    default:
      return state;
  }
}

export default userData;