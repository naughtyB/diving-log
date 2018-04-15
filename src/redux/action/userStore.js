export const GET_USER_STORE_REQUEST_POST = 'GET_USER_STORE_REQUEST_POST';

export const GET_USER_STORE_RECEIVE_SUCCESS_POST = 'GET_USER_STORE_RECEIVE_SUCCESS_POST';

export const GET_USER_STORE_RECEIVE_ERROR_POST = 'GET_USER_STORE_RECEIVE_ERROR_POST';

export const CANCEL_STORE_LOG_REQUEST_POST = 'CANCEL_STORE_LOG_REQUEST_POST';

export const CANCEL_STORE_LOG_RECEIVE_SUCCESS_POST = 'CANCEL_STORE_LOG_RECEIVE_SUCCESS_POST';

export const CANCEL_STORE_LOG_RECEIVE_ERROR_POST = 'CANCEL_STORE_LOG_RECEIVE_ERROR_POST';

export const doGetUserStoreRequestPost = () => {
  return {
    type: GET_USER_STORE_REQUEST_POST
  }
}

export const doGetUserStoreReceiveSuccessPost = (userStore, userCreateTime) => {
  return {
    type: GET_USER_STORE_RECEIVE_SUCCESS_POST,
    userStore,
    userCreateTime
  }
}

export const doGetUserStoreReceiveErrorPost = () => {
  return {
    type: GET_USER_STORE_RECEIVE_ERROR_POST
  }
}

export const doGetUserStore = (successCallback, errorCallback, unstoreinCallback) => (dispatch) => {
  dispatch(doGetUserStoreRequestPost());
  return fetch('/server/user/store', {
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    credentials: 'include'
  }).then(res => {
    return res.json()
  }).then(res => {
    if(res.err){
      dispatch(doGetUserStoreReceiveErrorPost())
      if(res.err === 'unstorein'){
        unstoreinCallback && unstoreinCallback()
      }
      else{
        errorCallback && errorCallback()
      }
    }
    else{
      dispatch(doGetUserStoreReceiveSuccessPost(res.userStore, res.userCreateTime));
      successCallback && successCallback();
    }
  })
}

export const doCancelStoreLogRequestPost = () => {
  return {
    type: CANCEL_STORE_LOG_REQUEST_POST 
  }
}

export const doCancelStoreLogReceiveSuccessPost = () => {
  return {
    type: CANCEL_STORE_LOG_RECEIVE_SUCCESS_POST
  }
}

export const doCancelStoreLogReceiveErrorPost = () => {
  return {
    type: CANCEL_STORE_LOG_RECEIVE_ERROR_POST
  }
}

export const doCancelStoreLog = (storeData, successCallback, errorCallback, unloginCallback) => (dispatch) => {
  dispatch(doCancelStoreLogRequestPost());
  //如果为私密ID
  return fetch('/server/log/cancelStore', {
    method: 'post',
    headers: {
      'Content-Type':'application/json'
    },
    body: storeData,
    credentials: 'include'
  }).then(res => {
    return res.json()
  }).then(res => {
    if(res.err){
      dispatch(doCancelStoreLogReceiveErrorPost());
      if(res.err === 'unlogin'){
        unloginCallback && unloginCallback()
      }
      else{
        errorCallback && errorCallback()
      }
    }
    else{
      dispatch(doCancelStoreLogReceiveSuccessPost());
      successCallback && successCallback();
    }
  })
}