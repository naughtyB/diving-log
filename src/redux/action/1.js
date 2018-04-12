export const CANCEL_STORE_LOG_REQUEST_POST = 'CANCEL_STORE_LOG_REQUEST_POST';

export const CANCEL_STORE_LOG_RECEIVE_SUCCESS_POST = 'CANCEL_STORE_LOG_RECEIVE_SUCCESS_POST';

export const CANCEL_STORE_LOG_RECEIVE_ERROR_POST = 'CANCEL_STORE_LOG_RECEIVE_ERROR_POST';

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