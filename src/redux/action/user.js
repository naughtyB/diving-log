import fetch from 'isomorphic-fetch';
import Promise from 'promise-polyfill';
import Cookies from 'js-cookie'; 
//兼容性处理
if(!window.Promise){
    window.Promise=Promise
}

export const CHANGE_USER_LOGIN_STATE = 'CHANGE_USER_LOGIN_STATE';

export const CHANGE_USER_LOGIN_FIELDS = 'CHANGE_USER_LOGIN_FIELDS';

export const SUBMIT_LOGIN_REQUEST_POST = 'SUBMIT_LOGIN_REQUEST_POST';

export const SUBMIT_LOGIN_RECEIVE_SUCCESS_POST = 'SUBMIT_LOGIN_RECEIVE_SUCCESS_POST';

export const SUBMIT_LOGIN_RECEIVE_ERROR_POST = 'SUBMIT_LOGIN_RECEIVE_ERROR_POST';

export const CHANGE_USER_REGISTER_FIELDS = 'CHANGE_USER_REGISTER_FIELDS';

export const SUBMIT_REGISTER_REQUEST_POST = 'SUBMIT_REGISTER_REQUEST_POST';

export const SUBMIT_REGISTER_RECEIVE_SUCCESS_POST = 'SUBMIT_REGISTER_RECEIVE_SUCCESS_POST';

export const SUBMIT_REGISTER_RECEIVE_ERROR_POST = 'SUBMIT_REGISTER_RECEIVE_ERROR_POST';

export const CHANGE_USER_RESET_PASSWORD_FIELDS = 'CHANGE_USER_RESET_PASSWORD_FIELDS';

export const SUBMIT_RESET_PASSWORD_REQUEST_POST = 'SUBMIT_RESET_PASSWORD_REQUEST_POST';

export const SUBMIT_RESET_PASSWORD_RECEIVE_SUCCESS_POST = 'SUBMIT_RESET_PASSWORD_RECEIVE_SUCCESS_POST';

export const SUBMIT_RESET_PASSWORD_RECEIVE_ERROR_POST = 'SUBMIT_RESET_PASSWORD_RECEIVE_ERROR_POST';

export const doChangeUserLoginState = (loginState, userData) => {
  return {
    type: CHANGE_USER_LOGIN_STATE,
    loginState,
    userData
  }
}

export const doChangeUserLoginFields = (fieldsChanged) => {
  return {
    type: CHANGE_USER_LOGIN_FIELDS,
    fieldsChanged
  }
}

export const doSubmitLoginRequestPost = () => {
  return {
    type: SUBMIT_LOGIN_REQUEST_POST
  }
}

export const doSubmitLoginReceiveSuccessPost = (userData) => {
  return {
    type: SUBMIT_LOGIN_RECEIVE_SUCCESS_POST,
    userData
  }
}

export const doSubmitLoginReceiveErrorPost = (errorType, error) => {
  return {
    type: SUBMIT_LOGIN_RECEIVE_ERROR_POST,
    errorType,
    error
  }
}

export const doSubmitLogin = (username, password, successCallback) => (dispatch) => {
  dispatch(doSubmitLoginRequestPost());
  return fetch('/server/user/login', {
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: 'username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password)
  }).then(res => {
    return res.json();
  }).then(res => {
    if(!res.isCorrect){
      dispatch(doSubmitLoginReceiveErrorPost(res.errorType, res.error))
    }
    else{
      dispatch(doSubmitLoginReceiveSuccessPost(res.userData));
      successCallback && successCallback();
      Cookies.set('username', res.userData['username']);
      Cookies.set('userId',res.userData['_id']);
    }
  })
}

export const doChangeUserRegisterFields = (fieldsChanged) => {
  return {
    type: CHANGE_USER_REGISTER_FIELDS,
    fieldsChanged
  }
}

export const doSubmitRegisterRequestPost = () => {
  return {
    type: SUBMIT_REGISTER_REQUEST_POST
  }
}

export const doSubmitRegisterReceiveSuccessPost = (userData) => {
  return {
    type: SUBMIT_REGISTER_RECEIVE_SUCCESS_POST,
    userData
  }
}

export const doSubmitRegisterReceiveErrorPost = (errorType, error) => {
  return {
    type: SUBMIT_REGISTER_RECEIVE_ERROR_POST,
    errorType,
    error
  }
}

export const doSubmitRegister = (username, password, name, securityQuestion, securityAnswer, successCallback) => (dispatch) => {
  dispatch(doSubmitRegisterRequestPost());
  return fetch('/server/user/register', {
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    credentials: 'include',
    body: 'username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password) + '&name=' + encodeURIComponent(name) + '&securityQuestion=' + encodeURIComponent(securityQuestion) + '&securityAnswer=' + encodeURIComponent(securityAnswer)
  }).then(res => {
    return res.json()
  }).then(res => {
    if(res.isSuccessful){
      dispatch(doSubmitRegisterReceiveSuccessPost(res.userData));
      successCallback && successCallback();
      Cookies.set('username', res.userData['username']);
      Cookies.set('userId',res.userData['_id']);
    }
    else{
      dispatch(doSubmitRegisterReceiveErrorPost(res.errorType, res.error))
    }
  })
}

export const doChangeUserResetPasswordFields = (fieldsChanged) => {
  return {
    type: CHANGE_USER_RESET_PASSWORD_FIELDS,
    fieldsChanged
  }
}

export const doSubmitResetPasswordRequestPost = () => {
  return {
    type: SUBMIT_RESET_PASSWORD_REQUEST_POST
  }
}

export const doSubmitResetPasswordReceiveSuccessPost = (userData) => {
  return {
    type: SUBMIT_RESET_PASSWORD_RECEIVE_SUCCESS_POST,
    userData
  }
}

export const doSubmitResetPasswordReceiveErrorPost = (errorType, error) => {
  return {
    type: SUBMIT_RESET_PASSWORD_RECEIVE_ERROR_POST,
    errorType,
    error
  }
}

export const doSubmitResetPassword = (username, password, securityQuestion, securityAnswer, successCallback) => (dispatch) =>{
  dispatch(doSubmitResetPasswordRequestPost());
  return fetch('/server/user/resetPassword',{
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password) + '&securityQuestion=' + encodeURIComponent(securityQuestion) + '&securityAnswer=' + encodeURIComponent(securityAnswer)
  }).then(res => {
    return res.json();
  }).then(res => {
    if(res.isSuccessful){
      dispatch(doSubmitResetPasswordReceiveSuccessPost());
      successCallback && successCallback();
      Cookies.set('username', res.userData['username']);
      Cookies.set('userId',res.userData['_id']);
    }
    else{
      dispatch(doSubmitResetPasswordReceiveErrorPost(res.errorType, res.error));
    }
  })
}

