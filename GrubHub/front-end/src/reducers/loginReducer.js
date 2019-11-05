import { FETCH_CRED, LOGOUT } from "../actions/types";

const initialState = {
  auth: Object
};
export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_CRED:
      console.log("In login");

      return {
        ...state,
        auth: action.payload
      };
    case LOGOUT:
      console.log("In lougout");
      console.log(action.payload);
      return {
        ...state,
        auth: action.payload
      };
    default:
      return state;
  }
}
