import {
  GET_USER_LOG_RECEIVE_ERROR_POST,
  GET_USER_LOG_REQUEST_POST,
  GET_USER_LOG_RECEIVE_SUCCESS_POST,
  DELETE_USER_LOG_REQUEST_POST,
  DELETE_USER_LOG_RECEIVE_SUCCESS_POST,
  DELETE_USER_LOG_RECEIVE_ERROR_POST
} from '../action/userLog'

const initialUserLog = {
  isGettingUserLog: false,
  userLog: [],
  isDeletingUserLog: false,
  userCreateTime: ''
};

export const userLog = (state = initialUserLog, action) => {
  switch(action.type){
    case GET_USER_LOG_REQUEST_POST:
      return {...state, isGettingUserLog: true};
    case GET_USER_LOG_RECEIVE_SUCCESS_POST:
      return {...state, isGettingUserLog: false, userLog: action.userLog, userCreateTime: action.userCreateTime};
    case GET_USER_LOG_RECEIVE_ERROR_POST:
      return {...state, isGettingUserLog: false};
    case DELETE_USER_LOG_REQUEST_POST:
      return {...state, isDeletingUserLog: true};
    case DELETE_USER_LOG_RECEIVE_SUCCESS_POST:
      return {...state, isDeletingUserLog: false};
    case DELETE_USER_LOG_RECEIVE_ERROR_POST:
      return {...state, isDeletingUserLog: false};
    default:
      return state;
  }
}

export default userLog;