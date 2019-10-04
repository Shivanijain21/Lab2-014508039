import React, { Component } from "react";
import cookie from "react-cookies";
import Axios from "axios";
import Navbar from "../navbar";
import { Modal, Button } from "react-bootstrap";
import { resolve } from "dns";

class OwnerHome extends Component {
  state = {
    onGoingOrders: [],
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
        this.setState({ onGoingOrders: onGoingOrders });
      }
    );
  };

  render() {
    console.log(this.state.onGoingOrders);
    let displayBlock = null;
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
                  Pick your favorite flavor:
                  <select
                    value={eachOrder.orderStatus}
                    onChange={e => this.handleChange(e, eachOrder)}
                  >
                    <option value="New">New</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Delivering">Delivering</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancel">Cancelled</option>
                  </select>
                </label>
                <input type="submit" value="Submit" />
              </form>
            </div>
          </div>
        </div>
      ));
    }
    return (
      <div className="container-fluid">
        <h2>Manage Orders</h2>
        <div className="container">
          <div className="row">{displayBlock}</div>
        </div>
      </div>
    );
  }
}

export default OwnerHome;
