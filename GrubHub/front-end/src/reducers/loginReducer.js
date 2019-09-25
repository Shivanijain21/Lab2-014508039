import { FETCH_CRED } from "../actions/types";

const initialState = {
  auth: Number
};
export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_CRED:
      console.log("In login");
      console.log(action.payload);
      return {
        ...state,
        auth: action.payload
      };
    default:
      return state;
  }
}
