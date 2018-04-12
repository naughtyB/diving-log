import fetch from 'isomorphic-fetch';
import { doAddLogReceiveErrorPost } from './releaseLog';

export const CHANGE_VISIBLE = 'CHANGE_VISIBLE';

export const CREATE_COMMENT_REQUEST_POST = 'CREATE_COMMENT_REQUEST_POST';

export const CREATE_COMMENT_RECEIVE_SUCCESS_POST = 'CREATE_COMMENT_RECEIVE_SUCCESS_POST';

export const CREATE_COMMENT_RECEIVE_ERROR_POST = 'CREATE_COMMENT_RECEIVE_ERROR_POST';

export const CHANGE_REPLY_CONTENT = 'CHANGE_REPLY_CONTENT';

export const doChangeVisible = (visible, userReplyedData, logId, successCallback, errorCallback, unloginCallback) => {
  return {
    type: CHANGE_VISIBLE,
    visible,
    userReplyedData,
    logId,
    successCallback,
    errorCallback,
    unloginCallback
  }
}

export const doCreateCommentRequestPost = () => {
  return {
    type: CREATE_COMMENT_REQUEST_POST
  }
}

export const doCreateCommentReceiveSuccessPost = () => {
  return {
    type: CREATE_COMMENT_RECEIVE_SUCCESS_POST
  }
}

export const doCreateCommentReceiveErrorPost = () => {
  return {
    type: CREATE_COMMENT_RECEIVE_ERROR_POST
  }
}

export const doCreateComment = (commentData, successCallback, errorCallback, unloginCallback) => (dispatch) => {
  dispatch(doCreateCommentRequestPost());
  return fetch('/server/comment/create', {
    method: 'post',
    headers:{
      'Content-Type':'application/json'
    },
    body: commentData,
    credentials: 'include'
  }).then(res => {
    return res.json()
  }).then(res => {
    if(res.err){
      dispatch(doCreateCommentReceiveErrorPost())
      if(res.err === 'unlogin'){
        unloginCallback && unloginCallback()
      }
      else{
        errorCallback && errorCallback()
      }
    }
    else{
      dispatch(doCreateCommentReceiveSuccessPost());
      successCallback && successCallback();
    }
  })
}

export const doChangeReplyContent = (replyContent) => {
  return {
    type: CHANGE_REPLY_CONTENT,
    replyContent
  }
}
