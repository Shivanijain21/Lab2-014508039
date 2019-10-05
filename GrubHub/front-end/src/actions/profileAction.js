import { FETCH_PROFILE, UPDATE_PROFILE } from "./types";
import axios from "axios";
import cookie from "react-cookies";
import util from "../utils";

export const fetchProfile = () => dispatch => {
  console.log("in profile action: fetching profile");
  let url;
  if (cookie.load("Buyer")) {
    url = `${util.base_url}/buyer/profile/${cookie.load("Buyer")}`;
  } else if (cookie.load("Owner")) {
    url = `${util.base_url}/owner/profile/${cookie.load("Owner")}`;
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
    url = `${util.base_url}/buyer/profileUpdate/${cookie.load("Buyer")}`;
  } else if (cookie.load("Owner")) {
    url = `${util.base_url}/owner/profileUpdate/${cookie.load("Owner")}`;
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
