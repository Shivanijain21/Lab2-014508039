import React, { Component } from "react";
import Navbar from "./navbar";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import axios from "axios";
import { fetchProfile } from "../actions/profileAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Home extends Component {
  componentWillMount() {
    this.props.fetchProfile();
  }
  componentWillReceiveProps({ profile }) {
    console.log("from Home");
    console.log(profile);
  }
  render() {
    let redirectVar = null;
    if (!(cookie.load("Buyer") || cookie.load("Owner"))) {
      redirectVar = <Redirect to="/login" />;
    }
    let profile = this.props.profile;
    localStorage.name = profile.name;
    return (
      <div>
        <Navbar />
        {redirectVar}
        <h2>welcome to home, {profile.name}</h2>
      </div>
    );
  }
}
Home.propTypes = {
  fetchProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile.items
});
export default connect(
  mapStateToProps,
  { fetchProfile }
)(Home);
