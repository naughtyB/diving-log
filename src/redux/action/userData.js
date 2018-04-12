import fetch from 'isomorphic-fetch'

export const GET_USER_DATA_REQUEST_POST = 'GET_USER_DATA_REQUEST_POST';

export const GET_USER_DATA_RECEIVE_SUCCESS_POST = 'GET_USER_DATA_RECEIVE_SUCCESS_POST';

export const GET_USER_DATA_RECEIVE_ERROR_POST = 'GET_USER_DATA_RECEIVE_ERROR_POST';

export const CHANGE_USER_DATA_FIELDS = 'CHANGE_USER_DATA_FIELDS';

export const SUBMIT_USER_DATA_REQUEST_POST = 'SUBMIT_USER_DATA_REQUEST_POST';

export const SUBMIT_USER_DATA_RECEIVE_SUCCESS_POST = 'SUBMIT_USER_DATA_RECEIVE_SUCCESS_POST';

export const SUBMIT_USER_DATA_RECEIVE_ERROR_POST = 'SUBMIT_USER_DATA_RECEIVE_ERROR_POST';

export const doGetUserDataRequestPost = () => {
  return {
    type: GET_USER_DATA_REQUEST_POST
  }
}

export const doGetUserDataReceiveSuccessPost = (userData) => {
  return {
    type: GET_USER_DATA_RECEIVE_SUCCESS_POST,
    userData
  }
}

export const doGetUserDataReceiveErrorPost = (errorType, error) => {
  return {
    type: GET_USER_DATA_RECEIVE_ERROR_POST,
    errorType,
    error
  }
}

export const doGetUserData = (successCallback, errorCallback, unloginCallback) => (dispatch) => {
  dispatch(doGetUserDataRequestPost());
  return fetch('/server/user/data', {
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    credentials: 'include'
  }).then(res => {
    return res.json()
  }).then(res => {
    if(res.err){
      dispatch(doGetUserDataReceiveErrorPost())
      if(res.err === 'unlogin'){
        unloginCallback && unloginCallback()
      }
      else{
        errorCallback && errorCallback()
      }
    }
    else{
      dispatch(doGetUserDataReceiveSuccessPost(res.userData));
      successCallback && successCallback(res.userData.imgUrl);
    }
  })
}

export const doChangeUserDataFields = (fieldsChanged) => {
  return {
    type: CHANGE_USER_DATA_FIELDS,
    fieldsChanged
  }
}

export const doSubmitUserDataRequestPost = () => {
  return {
    type: SUBMIT_USER_DATA_REQUEST_POST
  }
}

export const doSubmitUserDataReceiveSuccessPost = (userData) => {
  return {
    type: SUBMIT_USER_DATA_RECEIVE_SUCCESS_POST,
    userData
  }
}

export const doSubmitUserDataReceiveErrorPost = (errorType, error) => {
  return {
    type: SUBMIT_USER_DATA_RECEIVE_ERROR_POST,
    errorType,
    error
  }
}

export const doSubmitUserData = (userData, successCallback, errorCallback, unloginCallback) => (dispatch) => {
  dispatch(doSubmitUserDataRequestPost());
  return fetch('/server/user/modifyData', {
    method: 'post',
    headers:{
      'Content-Type':'application/json'
    },
    body: userData,
    credentials: 'include'
  }).then(res => {
    return res.json()
  }).then(res => {
    if(res.err){
      dispatch(doSubmitUserDataReceiveErrorPost())
      if(res.err === 'unlogin'){
        unloginCallback && unloginCallback()
      }
      else{
        errorCallback && errorCallback()
      }
    }
    else{
      dispatch(doSubmitUserDataReceiveSuccessPost(res.userData));
      successCallback && successCallback();
    }
  })
}