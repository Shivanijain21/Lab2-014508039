import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { createProfile } from "../actions/signUpAction";
import PropTypes from "prop-types";

class SignUp extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userProfile: "",
    restuarantInfo: {
      restuarantName: "",
      restuarantAdd: "",
      Zip: Number
    },
    authFlag: ""
  };
  handleOptionChange = e => {
    const user = { ...this.state };
    user.userProfile = e.currentTarget.value;
    this.setState(user);
  };
  handleChange = ({ currentTarget: input }) => {
    const user = { ...this.state };
    user[input.name] = input.value;
    this.setState(user);
  };
  handleRestInfo = ({ currentTarget: input }) => {
    const user = { ...this.state };
    const restInfo = { ...user.restuarantInfo };
    restInfo[input.name] = input.value;
    this.setState({ restuarantInfo: restInfo });
  };
  handleSignUp = e => {
    e.preventDefault();
    const user = this.state;
    let data;
    if (this.state.userProfile === "Owner") {
      data = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        userProfile: user.userProfile,
        restuarantInfo: { ...user.restuarantInfo }
      };
    } else {
      data = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        userProfile: user.userProfile
      };
    }
    this.props.createProfile(data);
  };
  render() {
    const register = this.props.register;
    let user = this.state;
    var restuarantInfo = null;
    let redirectVar = null;
    let errorMessage = null;
    console.log("in signup render");
    if (this.state.userProfile === "Owner") {
      restuarantInfo = (
        <div className="RestInfo">
          <p>Enter your Restuarant Information</p>
          <div className="row">
            <div className="form-group col-sm-12">
              <label htmlFor="restuarantName">Restuarant Name</label>
              <input
                type="text"
                className="form-control"
                name="restuarantName"
                id="restuarantName"
                maxLength="150"
                onChange={this.handleRestInfo}
                value={user.restuarantInfo.restuarantName}
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-sm-12">
              <label htmlFor="restuarantAdd">Restuarant Address</label>
              <input
                type="text"
                className="form-control"
                name="restuarantAdd"
                id="restuarantAdd"
                maxLength="150"
                onChange={this.handleRestInfo}
                value={user.restuarantInfo.restuarantAdd}
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-sm-6">
              <label htmlFor="Zip">Zip</label>
              <input
                type="number"
                className="form-control"
                name="Zip"
                id="Zip"
                onChange={this.handleRestInfo}
                value={user.restuarantInfo.Zip}
              />
            </div>
          </div>
        </div>
      );
    }
    if (register === 200) {
      redirectVar = <Redirect to="/login" />;
    } else if (register === 400) {
      errorMessage = (
        <div class="alert alert-danger" role="alert">
          Email already Exist
        </div>
      );
    } else if (register === 500) {
      errorMessage = (
        <div class="alert alert-danger" role="alert">
          Bad Request
        </div>
      );
    }
    return (
      <div>
        {redirectVar}
        <div className="container-fluid">
          <div className="row justify-content-sm-center">
            <div className="col-sm-4 mt-3 signUp">
              <h4 className="my-2">Create your Account</h4>
              <form onSubmit={this.handleSignUp}>
                <div className="row">
                  <div className="form-group col-sm-6">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      id="firstName"
                      onChange={this.handleChange}
                      value={user.firstName}
                      required
                    />
                  </div>
                  <div className="form-group col-sm-6">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      id="lastName"
                      onChange={this.handleChange}
                      value={user.lastName}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-sm-12">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      id="email"
                      onChange={this.handleChange}
                      value={user.email}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="password">
                    Password (8 character minimum)
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="password"
                    onChange={this.handleChange}
                    value={user.password}
                    required
                  />
                </div>
                <div className="radio">
                  <label>You are a: </label>
                  <label className="px-2">
                    <input
                      className="mr-2"
                      type="radio"
                      value="Buyer"
                      name="userProfile"
                      checked={this.state.userProfile === "Buyer"}
                      onChange={this.handleOptionChange}
                      required
                    />
                    Buyer
                  </label>
                  <label className="px-2">
                    <input
                      className="mr-2"
                      type="radio"
                      value="Owner"
                      name="userProfile"
                      checked={
                        this.state.userProfile === "Owner" ? true : false
                      }
                      onChange={this.handleOptionChange}
                      required
                    />
                    Owner
                  </label>
                </div>
                {restuarantInfo}

                <button type="submit" className="col-sm-12 btn btn-primary">
                  Create your Account
                </button>

                <div class="col-sm-12 text-center">or</div>

                <button className="col-sm-12 my-2 btn btn-secondary">
                  Login with Facebook
                </button>

                <button className="col-sm-12 btn btn-danger">
                  Login with google
                </button>

                <div className="col-sm-12 text-center">
                  Have an Account?
                  <Link to="/login" className="btn btn-link">
                    Sign In
                  </Link>
                </div>

                {errorMessage}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
SignUp.propTypes = {
  createProfile: PropTypes.func.isRequired,
  register: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  register: state.register.registerRes
});

export default connect(
  mapStateToProps,
  { createProfile }
)(SignUp);
