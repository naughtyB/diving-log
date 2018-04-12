import {
  CHANGE_VISIBLE,
  CREATE_COMMENT_REQUEST_POST,
  CREATE_COMMENT_RECEIVE_SUCCESS_POST,
  CREATE_COMMENT_RECEIVE_ERROR_POST,
  CHANGE_REPLY_CONTENT
} from '../action/reply'

const initialReply = {
  visible: false,
  userReplyedData: {},
  logId: '',
  isCreatingComment: false,
  replyContent: '',
  successCallback: () => {},
  errorCallback: () => {},
  unloginCallback: () => {}
};

export const reply = (state = initialReply, action) => {
  switch(action.type){
    case CHANGE_VISIBLE:
      return {...state, visible: action.visible, userReplyedData: action.userReplyedData || state.userReplyedData, logId: action.logId || state.logId, successCallback: action.successCallback, errorCallback: action.errorCallback, unloginCallback: action.unloginCallback };
    case CREATE_COMMENT_REQUEST_POST:
      return {...state, isCreatingComment: true};
    case CREATE_COMMENT_RECEIVE_SUCCESS_POST:
      return {...state, isCreatingComment: false, visible: false, replyContent: ''};
    case CREATE_COMMENT_RECEIVE_ERROR_POST:
      return {...state, isCreatingComment: false};
    case CHANGE_REPLY_CONTENT:
      return {...state, replyContent: action.replyContent}
    default:
      return state;
  }
}

export default reply;