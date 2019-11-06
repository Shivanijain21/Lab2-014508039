import React, { Component } from "react";
import { Route } from "react-router-dom";
import SignUp from "./component/signUp";
import Login from "./component/login";
import Home from "./component/home/home";
import Landing from "./component/landing";
import Profile from "./component/profile/profile";
import store from "./store";
import { Provider } from "react-redux";
import Restuarant from "./component/restuarant";
import SearchResult from "./component/searchResult";
import Menu from "./component/owner/ownermenu";
import ItemList from "./component/owner/itemList";
import Cart from "./component/cart";

class Main extends Component {
  state = {};
  render() {
    return (
      <Provider store={store}>
        <div>
          <Route path="/" exact component={Landing} />
          <Route path="/profile" component={Profile} />
          <Route path="/home" component={Home} />
          <Route path="/restuarant/:id" component={Restuarant} />
          <Route path="/searchResult/:searchString" component={SearchResult} />
          <Route path="/restuarantMenu" component={Menu} />
          <Route path="/itemList/:section" component={ItemList} />
          <Route path="/cart" component={Cart} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
        </div>
      </Provider>
    );
  }
}

export default Main;
