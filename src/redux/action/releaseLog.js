import fetch from 'isomorphic-fetch';

export const CHANGE_MARKER = 'CHANGE_MARKER';

export const CHANGE_CENTER = 'CHANGE_CENTER';

export const CHANGE_STEP = 'CHANGE_STEP';

export const CHANGE_BASIC_FIELDS = 'CHANGE_BASIC_FIELDS';

export const CHANGE_DETAIL_RECORD = 'CHANGE_DETAIL_RECORD';

export const ADD_LOG_REQUEST_POST = 'ADD_LOG_REQUEST_POST';

export const ADD_LOG_RECEIVE_SUCCESS_POST = 'ADD_LOG_RECEIVE_SUCCESS_POST';

export const ADD_LOG_RECEIVE_ERROR_POST = 'ADD_LOG_RECEIVE_ERROR_POST';

export const doChangeMarker = (marker) => {
  return {
    type: CHANGE_MARKER,
    marker
  }
}

export const doChangeCenter = (center) => {
  return {
    type: CHANGE_CENTER,
    center
  }
}

export const doChangeStep = (step) => {
  return {
    type: CHANGE_STEP,
    step
  }
}

export const doChangeBasiCFields = (fieldsChanged) => {
  return {
    type: CHANGE_BASIC_FIELDS,
    fieldsChanged
  }
}

export const doChangeDetailRecord = (detailRecord) => {
  return {
    type: CHANGE_DETAIL_RECORD,
    detailRecord
  }
}

export const doAddLogRequestPost = () => {
  return {
    type: ADD_LOG_REQUEST_POST
  }
}

export const doAddLogReceiveSuccessPost = () => {
  return {
    type: ADD_LOG_RECEIVE_SUCCESS_POST
  }
}

export const doAddLogReceiveErrorPost = () => {
  return {
    type: ADD_LOG_RECEIVE_ERROR_POST
  }
}

export const doAddLog = (logData, successCallback, errorCallback, unloginCallback) => (dispatch) => {
  dispatch(doAddLogRequestPost());
  return fetch('/server/log/add', {
    method: 'post',
    headers:{
      'Content-Type':'application/json'
    },
    body: logData,
    credentials: 'include'
  }).then(res => {
    return res.json();
  }).then(res => {
    if(res.err){
      dispatch(doAddLogReceiveErrorPost())
      if(res.err === 'unlogin'){
        errorCallback && errorCallback()
      }
      else{
        unloginCallback && unloginCallback()
      }
    }
    else{
      dispatch(doAddLogReceiveSuccessPost(res.detailData));
      successCallback && successCallback();
    }
  })
}