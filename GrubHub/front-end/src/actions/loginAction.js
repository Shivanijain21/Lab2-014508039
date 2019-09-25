import { FETCH_CRED } from "./types";
import axios from "axios";
// import cookie from "react-cookies";

export const fetchcred = data => dispatch => {
  console.log("in action: authenticating login cred");
  axios.defaults.withCredentials = true;
  axios
    .post("http://localhost:3001/login", data)
    .then(response => response.data)
    .then(auth =>
      dispatch({
        type: FETCH_CRED,
        payload: auth
      })
    )
    .catch(error =>
      dispatch({
        type: FETCH_CRED,
        payload: error
      })
    );
};
