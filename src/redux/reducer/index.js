import { combineReducers } from "redux";
import user from './user.js';
import releaseLog from './releaseLog.js';

export const reducer = combineReducers({
  user,
  releaseLog
});

export default reducer;