import React, { Component } from "react";
import cookie from "react-cookies";
import Axios from "axios";

class OwnerHome extends Component {
  state = {
    pastOrders: [],
    onGoingOrders: [],
    rest_id: ""
  };
  componentWillMount() {
    let rest_id = cookie.load("Owner");
  }
  render() {
    return <h2>Manage Orders</h2>;
  }
}

export default OwnerHome;
