import { combineReducers } from "redux";
import user from './user.js';
import releaseLog from './releaseLog.js';
import logDetail from './logDetail.js';
import reply from './reply.js';
import userData from './userData.js';
import userLog from './userLog.js';
import userStore from './userStore.js'

export const reducer = combineReducers({
  user,
  releaseLog,
  logDetail,
  reply,
  userData,
  userLog,
  userStore
});

export default reducer;