import React, { Component } from "react";
import Navbar from "../navbar";
import { Redirect } from "react-router";
import BuyerHome from "./buyerHome";
import OwnerHome from "./ownerHome";

class Home extends Component {
  render() {
    let redirectVar,
      homeComponent = null;
    if (!localStorage.getItem("id")) {
      redirectVar = <Redirect to="/login" />;
    } else {
      if (localStorage.getItem("userProfile") === "buyer") {
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
