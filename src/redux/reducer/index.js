import { combineReducers } from "redux";
import loginReducer from '../../containers/Login/reducer';
import polllistReducer from '../../containers/PollList/reducer';
const rootReducer = combineReducers({
  login: loginReducer,
  polllist:polllistReducer
});

export default rootReducer;