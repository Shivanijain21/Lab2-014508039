import React, { Component } from "react";
import cookie from "react-cookies";
import Axios from "axios";
import Navbar from "../navbar";
import { Modal, Button } from "react-bootstrap";
import { resolve } from "dns";

class OwnerHome extends Component {
  state = {
    onGoingOrders: [],
    completedOrders: [],
    rest_id: "",
    pastOrders: []
  };
  componentWillMount() {
    let rest_id = cookie.load("Owner");
    Axios.get("http://localhost:3001/order/rest/ongoing/" + rest_id).then(
      response => {
        console.log(response.data);
        let onGoingOrders = response.data;
        this.setState({ onGoingOrders: onGoingOrders, rest_id: rest_id });
      }
    );
    Axios.get("http://localhost:3001/order/rest/complete/" + rest_id).then(
      response => {
        console.log(response.data);
        let completedOrders = response.data;
        this.setState({ completedOrders: completedOrders });
      }
    );
  }
  handleChange = (e, eachOrder) => {
    let order = this.state.onGoingOrders;
    let data = eachOrder;
    eachOrder.orderStatus = e.currentTarget.value;
    order[order.indexOf(data)] = { ...eachOrder };
    console.log(order);
    this.setState({ order: order });
    // this.setState({ order: eachOrder, showModal: true });
  };
  handleSubmit = (e, eachOrder) => {
    e.preventDefault();
    let data = {
      rest_id: this.state.rest_id,
      orderId: eachOrder.orderId,
      orderStatus: eachOrder.orderStatus
    };
    console.log(data);
    Axios.post("http://localhost:3001/order/rest/changeStatus", data).then(
      response => {
        console.log(response.data);
        let onGoingOrders = response.data;
        Axios.get(
          "http://localhost:3001/order/rest/complete/" + data.rest_id
        ).then(response => {
          console.log(response.data);
          let completedOrders = response.data;
          this.setState({
            completedOrders: completedOrders,
            onGoingOrders: onGoingOrders
          });
        });
      }
    );
  };

  render() {
    console.log(this.state.onGoingOrders);
    console.log(this.state.completedOrders);
    let displayBlock,
      completedOrders = null;
    if (this.state.onGoingOrders.length != 0) {
      displayBlock = this.state.onGoingOrders.map(eachOrder => (
        <div class="card col-sm-3">
          <div className="card-body m-1">
            <h2 className="text-center">{eachOrder.name}</h2>
            <p>{eachOrder.orderDescription}</p>
            <p>{eachOrder.totalPrice}</p>
            <p>{eachOrder.address}</p>
            <div className="row justify-content-sm-center">
              <form onSubmit={e => this.handleSubmit(e, eachOrder)}>
                <label>
                  Order Status:
                  <select
                    value={eachOrder.orderStatus}
                    onChange={e => this.handleChange(e, eachOrder)}
                  >
                    <option value="New">New</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Delivering">Delivering</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancel</option>
                  </select>
                </label>
                <input type="submit" value="Submit" />
              </form>
            </div>
          </div>
        </div>
      ));
    } else {
      displayBlock = (
        <div className="card col-sm-3">
          <h2>No Pending Orders</h2>
        </div>
      );
    }
    if (this.state.completedOrders.length != 0) {
      completedOrders = (
        <div className="row mt-5">
          <h2 className="col-sm-12">Completed Orders</h2>
          {this.state.completedOrders.map(eachOrder => (
            <div className="card col-sm-3">
              <div className="card-body">
                <div>
                  <h5>Buyer Name</h5>
                  <p>{eachOrder.name}</p>
                </div>
                <div>
                  <h5>Order Details</h5>
                  <p>{eachOrder.orderDescription}</p>
                </div>
                <div>
                  <h5>Total Price</h5>
                  <p>{eachOrder.totalPrice}</p>
                </div>
                <div>
                  <h5>Delivery Address</h5>
                  <p>{eachOrder.address}</p>
                </div>
                <div>
                  <h5>Order Status</h5>
                  <p>{eachOrder.orderStatus}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
    return (
      <div className="container-fluid">
        <div className="container">
          <h2>Manage Orders</h2>
          <div className="row">{displayBlock}</div>
          {completedOrders}
        </div>
      </div>
    );
  }
}

export default OwnerHome;
