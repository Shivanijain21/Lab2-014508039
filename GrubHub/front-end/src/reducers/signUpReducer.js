import { CREATE_PROFILE } from "../actions/types";

const initialState = {
  registerRes: Number
};
export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_PROFILE:
      console.log("In signUp reducer");
      console.log(action.payload);
      return {
        ...state,
        registerRes: action.payload
      };
    default:
      return state;
  }
}
