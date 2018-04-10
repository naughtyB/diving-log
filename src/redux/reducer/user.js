import { 
  CHANGE_USER_LOGIN_STATE,
  CHANGE_USER_LOGIN_FIELDS,
  SUBMIT_LOGIN_REQUEST_POST,
  SUBMIT_LOGIN_RECEIVE_SUCCESS_POST,
  SUBMIT_LOGIN_RECEIVE_ERROR_POST,
  CHANGE_USER_REGISTER_FIELDS,
  SUBMIT_REGISTER_REQUEST_POST,
  SUBMIT_REGISTER_RECEIVE_SUCCESS_POST,
  SUBMIT_REGISTER_RECEIVE_ERROR_POST,
  CHANGE_USER_RESET_PASSWORD_FIELDS,
  SUBMIT_RESET_PASSWORD_REQUEST_POST,
  SUBMIT_RESET_PASSWORD_RECEIVE_SUCCESS_POST,
  SUBMIT_RESET_PASSWORD_RECEIVE_ERROR_POST
} from '../action/user';

const initialUser = {
  loginState: false,
  isLogging: false,
  isRegistering: false,
  isResettingPassword: false,
  loginFields: {
    username: {
      value: ''
    },
    password: {
      value: ''
    }
  },
  registerFields: {
    username: {
      value: ''
    },
    password: {
      value: ''
    },
    confirm: {
      value: ''
    },
    name: {
      value: ''
    },
    securityQuestion: {
      value: undefined
    },
    securityAnswer: {
      value: ''
    }
  },
  resetPasswordFields: {
    username:{
      value: ''
    },
    password: {
      value: ''
    },
    confirm: {
      value: ''
    },
    securityQuestion: {
      value: undefined
    },
    securityAnswer: {
      value: ''
    }
  },
  userData: {}
}

export const user = (state = initialUser, action) => {
  switch(action.type){
    case CHANGE_USER_LOGIN_STATE:
      return {...state, loginState: action.loginState, userData: action.userData};
    case CHANGE_USER_LOGIN_FIELDS:
      return {...state, loginFields: {...state.loginFields, ...action.fieldsChanged}}
    case SUBMIT_LOGIN_REQUEST_POST:
      return {...state, isLogging: true};
    case SUBMIT_LOGIN_RECEIVE_SUCCESS_POST:
      return {...state, isLogging: false, loginState: true, userData: action.userData};
    case SUBMIT_LOGIN_RECEIVE_ERROR_POST:
      return {
        ...state, 
        isLogging: false,
        loginFields: {
          ...state.loginFields,
          [action.errorType]: {
            ...state.loginFields[action.errorType],
            errors: [{field: action.errorType, message: action.error}]
          }
        }  
      };
    case CHANGE_USER_REGISTER_FIELDS:
      return {...state, registerFields: {...state.registerFields, ...action.fieldsChanged}};
    case SUBMIT_REGISTER_REQUEST_POST:
      return {...state, isRegistering: true};
    case SUBMIT_REGISTER_RECEIVE_SUCCESS_POST:
      return {...state, isRegistering: false, loginState: true, userData: action.userData};
    case SUBMIT_REGISTER_RECEIVE_ERROR_POST:
      return {
        ...state, 
        isRegistering: false,
        registerFields: {
          ...state.registerFields,
          [action.errorType]: {
            ...state.registerFields[action.errorType],
            errors: [{field: action.errorType, message: action.error}]
          }
        }  
    }
    case CHANGE_USER_RESET_PASSWORD_FIELDS:
      return {...state, resetPasswordFields: {...state.resetPasswordFields, ...action.fieldsChanged}};
    case SUBMIT_RESET_PASSWORD_REQUEST_POST:
      return {...state, isResettingPassword: true};
    case SUBMIT_RESET_PASSWORD_RECEIVE_SUCCESS_POST:
      return {...state, isResettingPassword: false, loginState: true, userData: action.userData};
    case SUBMIT_RESET_PASSWORD_RECEIVE_ERROR_POST:
      return {
        ...state,
        isResettingPassword: false,
        resetPasswordFields: {
          ...state.resetPasswordFields,
          [action.errorType]: {
            ...state.resetPasswordFields[action.errorType],
            errors: [{field: action.errorType, message: action.error}]
          }
        }
      }
    default:
      return state;
  }
}

export default user;