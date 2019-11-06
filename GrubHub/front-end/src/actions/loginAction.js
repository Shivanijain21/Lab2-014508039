import { FETCH_CRED, LOGOUT } from "./types";
import axios from "axios";
import util from "../utils";

export const fetchcred = data => dispatch => {
  console.log("in action: authenticating login cred");
  axios.defaults.headers.common["Authorization"] = localStorage.getItem("jwt");
  axios
    .post(`${util.base_url}/login`, data)
    .then(response => {
      console.log(response);
      return response.data;
    })
    .then(auth =>
      dispatch({
        type: FETCH_CRED,
        payload: auth
      })
    )
    .catch(error =>
      dispatch({
        type: FETCH_CRED,
        payload: error.response.data
      })
    );
};

export const logout = () => dispatch => {
  let auth = "";
  dispatch({
    type: LOGOUT,
    payload: auth
  });
};
