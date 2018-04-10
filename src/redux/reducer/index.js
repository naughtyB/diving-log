import { combineReducers } from "redux";
import user from './user.js';
import releaseLog from './releaseLog.js';
import logDetail from './logDetail.js';

export const reducer = combineReducers({
  user,
  releaseLog,
  logDetail
});

export default reducer;