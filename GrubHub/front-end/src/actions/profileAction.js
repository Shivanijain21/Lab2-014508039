import { FETCH_PROFILE, UPDATE_PROFILE } from "./types";
import axios from "axios";
import util from "../utils";

export const fetchProfile = () => dispatch => {
  console.log("in profile action: fetching profile");
  let url;
  if (localStorage.getItem("userProfile") == "buyer") {
    url = `${util.base_url}/buyer/profile/${localStorage.getItem("id")}`;
  } else if (localStorage.getItem("userProfile") == "owner") {
    url = `${util.base_url}/owner/profile/${localStorage.getItem("id")}`;
  }
  axios.defaults.headers.common["Authorization"] = localStorage.getItem("jwt");
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
  if (localStorage.getItem("userProfile") == "buyer") {
    url = `${util.base_url}/buyer/profileUpdate/${localStorage.getItem("id")}`;
  } else if (localStorage.getItem("userProfile") == "owner") {
    url = `${util.base_url}/owner/profileUpdate/${localStorage.getItem("id")}`;
  }
  axios.defaults.headers.common["Authorization"] = localStorage.getItem("jwt");
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
