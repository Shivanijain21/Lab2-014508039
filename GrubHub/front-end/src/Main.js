import React, { Component } from "react";
import { Route } from "react-router-dom";
import SignUp from "./component/signUp";

class Main extends Component {
  state = {};
  render() {
    return <Route path="/" component={SignUp} />;
  }
}

export default Main;
