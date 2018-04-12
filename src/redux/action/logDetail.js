export const GET_LOG_DETAIL_REQUEST_POST = 'GET_LOG_DETAIL_REQUEST_POST';

export const GET_LOG_DETAIL_RECEIVE_SUCCESS_POST = 'GET_LOG_DETAIL_RECEIVE_SUCCESS_POST';

export const GET_LOG_DETAIL_RECEIVE_ERROR_POST = 'GET_LOG_DETAIL_RECEIVE_ERROR_POST';

export const PRAISE_COMMENT_REQUEST_POST = 'PRAISE_COMMENT_REQUEST_POST';

export const PRAISE_COMMENT_RECEIVE_SUCCESS_POST = 'PRAISE_COMMENT_RECEIVE_SUCCESS_POST';

export const PRAISE_COMMENT_RECEIVE_ERROR_POST = 'PRAISE_COMMENT_RECEIVE_ERROR_POST';

export const DELETE_COMMENT_REQUEST_POST = 'DELETE_COMMENT_REQUEST_POST';

export const DELETE_COMMENT_RECEIVE_SUCCESS_POST = 'DELETE_COMMENT_RECEIVE_SUCCESS_POST';

export const DELETE_COMMENT_RECEIVE_ERROR_POST = 'DELETE_COMMENT_RECEIVE_ERROR_POST';

export const PRAISE_LOG_REQUEST_POST = 'PRAISE_LOG_REQUEST_POST';

export const PRAISE_LOG_RECEIVE_SUCCESS_POST = 'PRAISE_LOG_RECEIVE_SUCCESS_POST';

export const PRAISE_LOG_RECEIVE_ERROR_POST = 'PRAISE_LOG_RECEIVE_ERROR_POST';

export const STORE_LOG_REQUEST_POST = 'STORE_LOG_REQUEST_POST';

export const STORE_LOG_RECEIVE_SUCCESS_POST = 'STORE_LOG_RECEIVE_SUCCESS_POST';

export const STORE_LOG_RECEIVE_ERROR_POST = 'STORE_LOG_RECEIVE_ERROR_POST';

export const CANCEL_STORE_LOG_REQUEST_POST = 'CANCEL_STORE_LOG_REQUEST_POST';

export const CANCEL_STORE_LOG_RECEIVE_SUCCESS_POST = 'CANCEL_STORE_LOG_RECEIVE_SUCCESS_POST';

export const CANCEL_STORE_LOG_RECEIVE_ERROR_POST = 'CANCEL_STORE_LOG_RECEIVE_ERROR_POST';


export const doGetLogDetailRequestPost = () => {
  return {
    type: GET_LOG_DETAIL_REQUEST_POST
  }
}

export const doGetLogDetailReceiveSuccessPost = (detailData) => {
  return {
    type: GET_LOG_DETAIL_RECEIVE_SUCCESS_POST,
    detailData
  }
}

export const doGetLogDetailReceiveErrorPost = () => {
  return {
    type: GET_LOG_DETAIL_RECEIVE_ERROR_POST
  }
}

export const doGetLogDetail = (logId, successCallback, errorCallback) => (dispatch) => {
  dispatch(doGetLogDetailRequestPost());
  //如果为私密ID
  return fetch('/server/log/getDetailData', {
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: 'logId=' + encodeURIComponent(logId),
    credentials: 'include'
  }).then(res => {
    return res.json()
  }).then(res => {
    if(res.err){
      dispatch(doGetLogDetailReceiveErrorPost());
      errorCallback && errorCallback()
    }
    else{
      let detailData = {...res.detailData, comment: res.comment, store: res.store.map((item, index) => {
        return item.user
      })};
      dispatch(doGetLogDetailReceiveSuccessPost(detailData));
      successCallback && successCallback(detailData);
    }
  })
}

export const doPraiseCommentRequestPost = () => {
  return {
    type: PRAISE_COMMENT_REQUEST_POST 
  }
}

export const doPraiseCommentReceiveSuccessPost = () => {
  return {
    type: PRAISE_COMMENT_RECEIVE_SUCCESS_POST
  }
}

export const doPraiseCommentReceiveErrorPost = () => {
  return {
    type: PRAISE_COMMENT_RECEIVE_ERROR_POST
  }
}

export const doPraiseComment = (praiseData, successCallback, errorCallback, unloginCallback) => (dispatch) => {
  dispatch(doPraiseCommentRequestPost());
  //如果为私密ID
  return fetch('/server/log/praiseComment', {
    method: 'post',
    headers: {
      'Content-Type':'application/json'
    },
    body: praiseData,
    credentials: 'include'
  }).then(res => {
    return res.json()
  }).then(res => {
    if(res.err){
      dispatch(doPraiseCommentReceiveErrorPost());
      if(res.err === 'unlogin'){
        unloginCallback && unloginCallback()
      }
      else{
        errorCallback && errorCallback()
      }
    }
    else{
      dispatch(doPraiseCommentReceiveSuccessPost());
      successCallback && successCallback();
    }
  })
}

export const doDeleteCommentRequestPost = () => {
  return {
    type: DELETE_COMMENT_REQUEST_POST 
  }
}

export const doDeleteCommentReceiveSuccessPost = () => {
  return {
    type: DELETE_COMMENT_RECEIVE_SUCCESS_POST
  }
}

export const doDeleteCommentReceiveErrorPost = () => {
  return {
    type: DELETE_COMMENT_RECEIVE_ERROR_POST
  }
}

export const doDeleteComment = (deleteData, successCallback, errorCallback, unloginCallback) => (dispatch) => {
  dispatch(doDeleteCommentRequestPost());
  //如果为私密ID
  return fetch('/server/comment/delete', {
    method: 'post',
    headers: {
      'Content-Type':'application/json'
    },
    body: deleteData,
    credentials: 'include'
  }).then(res => {
    return res.json()
  }).then(res => {
    if(res.err){
      dispatch(doDeleteCommentReceiveErrorPost());
      if(res.err === 'unlogin'){
        unloginCallback && unloginCallback()
      }
      else{
        errorCallback && errorCallback()
      }
    }
    else{
      dispatch(doDeleteCommentReceiveSuccessPost());
      successCallback && successCallback();
    }
  })
}

export const doPraiseLogRequestPost = () => {
  return {
    type: PRAISE_LOG_REQUEST_POST 
  }
}

export const doPraiseLogReceiveSuccessPost = () => {
  return {
    type: PRAISE_LOG_RECEIVE_SUCCESS_POST
  }
}

export const doPraiseLogReceiveErrorPost = () => {
  return {
    type: PRAISE_LOG_RECEIVE_ERROR_POST
  }
}

export const doPraiseLog = (praiseData, successCallback, errorCallback, unloginCallback) => (dispatch) => {
  dispatch(doPraiseLogRequestPost());
  //如果为私密ID
  return fetch('/server/log/praise', {
    method: 'post',
    headers: {
      'Content-Type':'application/json'
    },
    body: praiseData,
    credentials: 'include'
  }).then(res => {
    return res.json()
  }).then(res => {
    if(res.err){
      dispatch(doPraiseLogReceiveErrorPost());
      if(res.err === 'unlogin'){
        unloginCallback && unloginCallback()
      }
      else{
        errorCallback && errorCallback()
      }
    }
    else{
      dispatch(doPraiseLogReceiveSuccessPost());
      successCallback && successCallback();
    }
  })
}

export const doStoreLogRequestPost = () => {
  return {
    type: STORE_LOG_REQUEST_POST 
  }
}

export const doStoreLogReceiveSuccessPost = () => {
  return {
    type: STORE_LOG_RECEIVE_SUCCESS_POST
  }
}

export const doStoreLogReceiveErrorPost = () => {
  return {
    type: STORE_LOG_RECEIVE_ERROR_POST
  }
}

export const doStoreLog = (storeData, successCallback, errorCallback, unloginCallback) => (dispatch) => {
  dispatch(doStoreLogRequestPost());
  //如果为私密ID
  return fetch('/server/log/createStore', {
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
      dispatch(doStoreLogReceiveErrorPost());
      if(res.err === 'unlogin'){
        unloginCallback && unloginCallback()
      }
      else{
        errorCallback && errorCallback()
      }
    }
    else{
      dispatch(doStoreLogReceiveSuccessPost());
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