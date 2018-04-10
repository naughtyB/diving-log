export const GET_LOG_DETAIL_REQUEST_POST = 'GET_LOG_DETAIL_REQUEST_POST';

export const GET_LOG_DETAIL_RECEIVE_SUCCESS_POST = 'GET_LOG_DETAIL_RECEIVE_SUCCESS_POST';

export const GET_LOG_DETAIL_RECEIVE_ERROR_POST = 'GET_LOG_DETAIL_RECEIVE_ERROR_POST';

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
    body: 'logId=' + encodeURIComponent(logId)
  }).then(res => {
    return res.json()
  }).then(res => {
    if(res.err){
      dispatch(doGetLogDetailReceiveErrorPost());
      errorCallback && errorCallback()
    }
    else{
      dispatch(doGetLogDetailReceiveSuccessPost(res.detailData));
      successCallback && successCallback();
    }
  })
}