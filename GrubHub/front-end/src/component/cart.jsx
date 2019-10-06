import React, { Component } from "react";
import Navbar from "./navbar";
import Axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import util from "../utils";

class Cart extends Component {
  state = {
    cart: {},
    restId: "",
    totalOrder: "",
    totalPrice: 0,
    orderPlaced: ""
  };
  componentWillMount() {
    if (sessionStorage.getItem("cart") != null) {
      let cart = JSON.parse(sessionStorage.getItem("cart"));
      // let itemBreakDown = [];
      let totalPrice = 0;
      let totalOrder = "";
      let restId;
      for (let item in cart) {
        let e = cart[item];
        restId = e.restId;
        totalPrice += e.price * e.quantity;
        totalOrder = totalOrder.concat(
          `${e.name} x ${e.quantity}: ${e.price},`
        );
      }
      this.setState({
        cart: cart,
        restId: restId,
        totalOrder: totalOrder,
        totalPrice: totalPrice
      });
    }
  }
  handleOrder = e => {
    e.preventDefault();
    let data = {
      restId: this.state.restId,
      totalPrice: this.state.totalPrice,
      totalOrder: this.state.totalOrder,
      buyerId: cookie.load("Buyer")
    };
    console.log(data);
    Axios.post(`${util.base_url}/order/placeOrder`, data)
      .then(response => this.setState({ orderPlaced: 200 }))
      .catch(err => this.setState({ orderPlaced: 500 }));
  };
  render() {
    let displayBlock,
      redirectVar = null;
    if (!cookie.load("Buyer")) {
      redirectVar = <Redirect to="/login" />;
    }
    if (this.state.cart == {}) {
      displayBlock = (
        <div className="alert alert-danger">There are currently no items</div>
      );
    }
    if (this.state.orderPlaced === 200) {
      sessionStorage.clear();
      redirectVar = <Redirect to="/home" />;
    } else if (this.state.orderPlaced === 500) {
      redirectVar = (
        <div className="alert alert-danger">Something went wrong</div>
      );
    }
    let itemBreakDown = [];
    for (let item in this.state.cart) {
      let e = this.state.cart[item];
      let itemprice = e.price * e.quantity;
      console.log(e.price);
      console.log(e.quantity);
      console.log(e.name);

      itemBreakDown.push(
        <div className="d-flex justify-content-between">
          <div>
            {e.name} x {e.quantity}
          </div>
          <div>{itemprice}</div>
        </div>
      );
    }

    displayBlock = (
      <div className="col-sm-3">
        <h2> Your Order</h2>
        {itemBreakDown}
        <div className="d-flex justify-content-between">
          <p>Total price</p>
          <p>{this.state.totalPrice}</p>
        </div>
      </div>
    );
    let disabled = true;
    if (this.state.totalPrice != 0) {
      disabled = false;
    }

    return (
      <div ClassName="container-fluid">
        <Navbar />
        {redirectVar}
        <div className="container">
          <div className="row justify-content-sm-center">{displayBlock}</div>
          <button
            className="btn btn-primary"
            onClick={this.handleOrder}
            disabled={disabled}
          >
            Place Order
          </button>
        </div>
      </div>
    );
  }
}

export default Cart;
