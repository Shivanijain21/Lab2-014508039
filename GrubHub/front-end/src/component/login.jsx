import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { fetchcred } from "../actions/loginAction";
import PropTypes from "prop-types";
import jwt_decode from "jwt-decode";

class Login extends Component {
  state = {
    username: "",
    password: "",
    userProfile: "buyer",
    authFlag: ""
  };
  componentWillReceiveProps({ login }) {
    this.setState({ authFlag: login.data });
  }
  handleChange = e => {
    const user = this.state;
    user[e.currentTarget.name] = e.currentTarget.value;
    this.setState(user);
  };
  handleLogin = e => {
    e.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password,
      userProfile: this.state.userProfile
    };

    //set the with credentials to true
    this.props.fetchcred(data);
  };
  render() {
    const storedata = this.props.login;
    const authFlag = this.state.authFlag;
    console.log("state");
    console.log(authFlag);
    let redirectVar = null;
    let errorMessage = null;
    if (authFlag === 200) {
      localStorage.setItem("id", storedata.id);
      localStorage.setItem("jwt", storedata.token);
      let decodeJwt = jwt_decode(storedata.token);
      localStorage.setItem("userProfile", decodeJwt.userProfile);
      redirectVar = <Redirect to="/home" />;
    }
    if (authFlag === 400) {
      errorMessage = (
        <div className="alert alert-danger">Invalid Credentials</div>
      );
    } else if (authFlag === 500) {
      errorMessage = <div className="alert alert-danger">Bad request</div>;
    }
    return (
      <React.Fragment>
        {redirectVar}
        <div className="container-fluid">
          <div className="row justify-content-sm-center">
            <div className="col-sm-4 mt-3 signIn">
              <div class="col-sm-12 row">
                <h4 className="my-3">Sign in with your Grubhub account</h4>
              </div>
              <form onSubmit={this.handleLogin}>
                <div className="row">
                  <div className="form-group col-sm-12">
                    <label htmlFor="username">Email</label>
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      onChange={this.handleChange}
                      value={this.state.username}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-sm-12">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      onChange={this.handleChange}
                      value={this.state.password}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-sm-12">
                    <label htmlFor="userProfile">You are a:</label>
                    <select name="userProfile" onChange={this.handleChange}>
                      <option value="buyer">Buyer</option>
                      <option value="owner">Owner</option>
                    </select>
                  </div>
                </div>
                <button className="btn btn-danger col-sm-12" type="submit">
                  Sign In
                </button>
                <Link to="/signup" className="btn btn-primary col-sm-12 my-3">
                  Create an account
                </Link>
                <br></br>
                {errorMessage}
              </form>
              {/* <Spinner animation="border" role={login}>
                <span className="sr-only">Loading...</span>
              </Spinner> */}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
Login.propTypes = {
  fetchcred: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  login: state.login.auth
});

export default connect(
  mapStateToProps,
  { fetchcred }
)(Login);
