import {
  GET_LOG_DETAIL_REQUEST_POST,
  GET_LOG_DETAIL_RECEIVE_SUCCESS_POST,
  GET_LOG_DETAIL_RECEIVE_ERROR_POST,
  PRAISE_COMMENT_REQUEST_POST,
  PRAISE_COMMENT_RECEIVE_SUCCESS_POST,
  PRAISE_COMMENT_RECEIVE_ERROR_POST,
  DELETE_COMMENT_REQUEST_POST,
  DELETE_COMMENT_RECEIVE_SUCCESS_POST,
  DELETE_COMMENT_RECEIVE_ERROR_POST,
  PRAISE_LOG_REQUEST_POST,
  PRAISE_LOG_RECEIVE_SUCCESS_POST,
  PRAISE_LOG_RECEIVE_ERROR_POST,
  STORE_LOG_REQUEST_POST,
  STORE_LOG_RECEIVE_SUCCESS_POST,
  STORE_LOG_RECEIVE_ERROR_POST,
  CANCEL_STORE_LOG_REQUEST_POST,
  CANCEL_STORE_LOG_RECEIVE_SUCCESS_POST,
  CANCEL_STORE_LOG_RECEIVE_ERROR_POST
} from '../action/logDetail';

const initialLogDetail = {
  data: {},
  isGettingDetail: false,
  isPraisingComment: false,
  isDeletingComment: false,
  isPraisingLog: false,
  isStoringLog: false,
  isCancelingStoreLog: false
};

export const logDetail = (state = initialLogDetail, action) => {
  switch(action.type){
    case GET_LOG_DETAIL_REQUEST_POST:
      return {...state, isGettingDetail: true};
    case GET_LOG_DETAIL_RECEIVE_SUCCESS_POST:
      return {...state, isGettingDetail: false, data: action.detailData};
    case GET_LOG_DETAIL_RECEIVE_ERROR_POST:
      return {...state, isGettingDetail: false};
    case PRAISE_COMMENT_REQUEST_POST:
      return {...state, isPraisingComment: true}
    case PRAISE_COMMENT_RECEIVE_SUCCESS_POST:
      return {...state, isPraisingComment: false};
    case PRAISE_COMMENT_RECEIVE_ERROR_POST:
      return {...state, isPraisingComment: false};
    case DELETE_COMMENT_REQUEST_POST:
      return {...state, isDeletingComment: true};
    case DELETE_COMMENT_RECEIVE_SUCCESS_POST:
      return {...state, isDeletingComment: false};
    case DELETE_COMMENT_RECEIVE_ERROR_POST:
      return {...state, isDeletingComment: false};
    case PRAISE_LOG_REQUEST_POST:
      return {...state, isPraisingLog: true}
    case PRAISE_LOG_RECEIVE_SUCCESS_POST:
      return {...state, isPraisingLog: false};
    case PRAISE_LOG_RECEIVE_ERROR_POST:
      return {...state, isPraisingLog: false};
    case STORE_LOG_REQUEST_POST:
      return {...state, isStoringLog: true}
    case STORE_LOG_RECEIVE_SUCCESS_POST:
      return {...state, isStoringLog: false};
    case STORE_LOG_RECEIVE_ERROR_POST:
      return {...state, isStoringLog: false};
    case CANCEL_STORE_LOG_REQUEST_POST:
      return {...state, isCancelingStoreLog: true};
    case CANCEL_STORE_LOG_RECEIVE_SUCCESS_POST:
      return {...state, isCancelingStoreLog: false};
    case CANCEL_STORE_LOG_RECEIVE_ERROR_POST:
      return {...state, isCancelingStoreLog: false};
    default:
      return state;
  }
}

export default logDetail;