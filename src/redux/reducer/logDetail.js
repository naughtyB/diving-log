import {
  GET_LOG_DETAIL_REQUEST_POST,
  GET_LOG_DETAIL_RECEIVE_SUCCESS_POST,
  GET_LOG_DETAIL_RECEIVE_ERROR_POST
} from '../action/logDetail';

const initialLogDetail = {
  data: {},
  isGettingDetail: false
};

export const logDetail = (state = initialLogDetail, action) => {
  switch(action.type){
    case GET_LOG_DETAIL_REQUEST_POST:
      return {...state, isGettingDetail: true};
    case GET_LOG_DETAIL_RECEIVE_SUCCESS_POST:
      return {...state, isGettingDetail: false, data: action.detailData};
    case GET_LOG_DETAIL_RECEIVE_ERROR_POST:
      return {...state, isGettingDetail: false};
    default:
      return state;
  }
}

export default logDetail;