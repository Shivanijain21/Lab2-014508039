import { FETCH_PROFILE, UPDATE_PROFILE } from "./types";
import axios from "axios";
import cookie from "react-cookies";

export const fetchProfile = () => dispatch => {
  console.log("in profile action: fetching profile");
  let url;
  if (cookie.load("Buyer")) {
    url = "http://localhost:3001/buyer/profile/" + cookie.load("Buyer");
  } else if (cookie.load("Owner")) {
    url = "http://localhost:3001/owner/profile/" + cookie.load("Owner");
  }
  axios
    .get(url)
    .then(response => response.data)
    .then(profile =>
      dispatch({
        type: FETCH_PROFILE,
        payload: profile
      })
    )
    .catch(error => {
      console.log(error);
    });
};

export const updateProfile = postData => dispatch => {
  let url;
  console.log("in profile action: update profile");
  if (cookie.load("Buyer")) {
    url = "http://localhost:3001/buyer/profileUpdate/" + cookie.load("Buyer");
  } else if (cookie.load("Owner")) {
    url = "http://localhost:3001/owner/profileUpdate/" + cookie.load("Owner");
  }
  axios
    .post(url, postData)
    .then(response => response.data)
    .then(updateProfile =>
      dispatch({
        type: UPDATE_PROFILE,
        payload: updateProfile
      })
    )
    .catch(error => {
      console.log(error);
    });
};
