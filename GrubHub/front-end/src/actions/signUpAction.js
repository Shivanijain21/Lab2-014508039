import { CREATE_PROFILE } from "./types";
import axios from "axios";
import util from "../utils";

export const createProfile = data => dispatch => {
  console.log("in action: register new user");
  //set the with credentials to true
  axios.defaults.withCredentials = true;
  axios
    .post(`${util.base_url}/signup`, data)
    .then(response => response.data)
    .then(register =>
      dispatch({
        type: CREATE_PROFILE,
        payload: register
      })
    )
    .catch(error =>
      dispatch({
        type: CREATE_PROFILE,
        payload: error.response.data
      })
    );
};
