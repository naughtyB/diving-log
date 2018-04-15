export const GET_USER_LOG_REQUEST_POST = 'GET_USER_LOG_REQUEST_POST';

export const GET_USER_LOG_RECEIVE_SUCCESS_POST = 'GET_USER_LOG_RECEIVE_SUCCESS_POST';

export const GET_USER_LOG_RECEIVE_ERROR_POST = 'GET_USER_LOG_RECEIVE_ERROR_POST';

export const DELETE_USER_LOG_REQUEST_POST = 'DELETE_USER_LOG_REQUEST_POST';

export const DELETE_USER_LOG_RECEIVE_SUCCESS_POST = 'DELETE_USER_LOG_RECEIVE_SUCCESS_POST';

export const DELETE_USER_LOG_RECEIVE_ERROR_POST = 'DELETE_USER_LOG_RECEIVE_ERROR_POST';

export const doGetUserLogRequestPost = () => {
  return {
    type: GET_USER_LOG_REQUEST_POST
  }
}

export const doGetUserLogReceiveSuccessPost = (userLog, userCreateTime) => {
  return {
    type: GET_USER_LOG_RECEIVE_SUCCESS_POST,
    userLog,
    userCreateTime
  }
}

export const doGetUserLogReceiveErrorPost = () => {
  return {
    type: GET_USER_LOG_RECEIVE_ERROR_POST
  }
}

export const doGetUserLog = (successCallback, errorCallback, unloginCallback) => (dispatch) => {
  dispatch(doGetUserLogRequestPost());
  return fetch('/server/user/log', {
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    credentials: 'include'
  }).then(res => {
    return res.json()
  }).then(res => {
    if(res.err){
      dispatch(doGetUserLogReceiveErrorPost())
      if(res.err === 'unlogin'){
        unloginCallback && unloginCallback()
      }
      else{
        errorCallback && errorCallback()
      }
    }
    else{
      dispatch(doGetUserLogReceiveSuccessPost(res.userLog, res.userCreateTime));
      successCallback && successCallback();
    }
  })
}

export const doDeleteUserLogRequestPost = () => {
  return {
    type: DELETE_USER_LOG_REQUEST_POST
  }
}

export const doDeleteUserLogReceiveSuccessPost = (userLog) => {
  return {
    type: DELETE_USER_LOG_RECEIVE_SUCCESS_POST,
    userLog
  }
}

export const doDeleteUserLogReceiveErrorPost = () => {
  return {
    type: DELETE_USER_LOG_RECEIVE_ERROR_POST
  }
}

export const doDeleteUserLog = (logId, successCallback, errorCallback, unloginCallback) => (dispatch) => {
  dispatch(doDeleteUserLogRequestPost());
  return fetch('/server/user/deleteLog', {
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: 'logId=' + decodeURIComponent(logId),
    credentials: 'include'
  }).then(res => {
    return res.json()
  }).then(res => {
    if(res.err){
      dispatch(doDeleteUserLogReceiveErrorPost())
      if(res.err === 'unlogin'){
        unloginCallback && unloginCallback()
      }
      else{
        errorCallback && errorCallback()
      }
    }
    else{
      dispatch(doDeleteUserLogReceiveSuccessPost(res.userLog));
      successCallback && successCallback();
    }
  })
}