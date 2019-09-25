import { FETCH_PROFILE, UPDATE_PROFILE } from "../actions/types";

const initialState = {
  items: {},
  item: {}
};
export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_PROFILE:
      console.log("in fetch profile reducer");
      return {
        ...state,
        items: action.payload
      };
    case UPDATE_PROFILE:
      console.log("in update profile reducer");
      return {
        ...state,
        item: action.payload
      };
    default:
      return state;
  }
}
