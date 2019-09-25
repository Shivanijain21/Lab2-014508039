import React, { Component } from "react";
import { Route } from "react-router-dom";
import SignUp from "./component/signUp";
import Login from "./component/login";
import Home from "./component/home";
import Landing from "./component/landing";
import Profile from "./component/profile/profile";
import store from "./store";
import { Provider } from "react-redux";
import RestuarantCards from "./component/RestuarantCards";
import Restuarant from "./component/restuarant";

class Main extends Component {
  state = {};
  render() {
    return (
      <Provider store={store}>
        <div>
          <Route path="/" exact component={Landing} />
          <Route path="/profile" component={Profile} />
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/restuarantCards" component={RestuarantCards} />
          <Route path="/restuarant" component={Restuarant} />
        </div>
      </Provider>
    );
  }
}

export default Main;
