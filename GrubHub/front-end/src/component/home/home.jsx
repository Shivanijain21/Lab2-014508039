import React, { Component } from "react";
import Navbar from "../navbar";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import BuyerHome from "./buyerHome";
import OwnerHome from "./ownerHome";

class Home extends Component {
  render() {
    let redirectVar,
      homeComponent = null;
    if (!(cookie.load("Buyer") || cookie.load("Owner"))) {
      redirectVar = <Redirect to="/login" />;
    } else {
      if (cookie.load("Buyer")) {
        homeComponent = <BuyerHome />;
      } else homeComponent = <OwnerHome />;
    }
    console.log("in home");
    return (
      <div>
        <Navbar />
        {redirectVar}
        {homeComponent}
      </div>
    );
  }
}
export default Home;
