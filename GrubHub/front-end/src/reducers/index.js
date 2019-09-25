import { combineReducers } from "redux";
import profileReducer from "./profileReducer";
import loginReducer from "./loginReducer";
import signUpReducer from "./signUpReducer";
import { reducer as reduxFormReducer } from "redux-form";

export default combineReducers({
  profile: profileReducer,
  login: loginReducer,
  register: signUpReducer,
  form: reduxFormReducer
});
