import {
  GET_USER_STORE_RECEIVE_ERROR_POST,
  GET_USER_STORE_REQUEST_POST,
  GET_USER_STORE_RECEIVE_SUCCESS_POST,
  CANCEL_STORE_LOG_REQUEST_POST,
  CANCEL_STORE_LOG_RECEIVE_SUCCESS_POST,
  CANCEL_STORE_LOG_RECEIVE_ERROR_POST
} from '../action/userStore'

const initialUserStore = {
  isGettingUserStore: false,
  userStore: [],
  userCreateTime: '',
  isCancelingStoreLog: false
};

export const userStore = (state = initialUserStore, action) => {
  switch(action.type){
    case GET_USER_STORE_REQUEST_POST:
      return {...state, isGettingUserStore: true};
    case GET_USER_STORE_RECEIVE_SUCCESS_POST:
      return {...state, isGettingUserStore: false, userStore: action.userStore, userCreateTime:action.userCreateTime};
    case GET_USER_STORE_RECEIVE_ERROR_POST:
      return {...state, isGettingUserStore: false};
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

export default userStore;