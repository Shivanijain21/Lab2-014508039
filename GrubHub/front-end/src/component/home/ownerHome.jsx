import React, { Component } from "react";
import axios from "axios";
import util from "../../utils";
import Draggable from "react-draggable";
import Chat from "../chat";

class OwnerHome extends Component {
  state = {
    orders: {
      upcomingOrders: [],
      pastOrders: []
    },
    rest_id: ""
  };
  componentWillMount() {
    let rest_id = localStorage.getItem("id");
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwt"
    );
    axios.get(`${util.base_url}/order/rest/${rest_id}`).then(response => {
      console.log(response.data);
      const orders = response.data;
      this.setState({ orders: orders, rest_id: rest_id });
    });
  }
  handleChange = (e, eachOrder) => {
    let prevOrder = this.state.orders.upcomingOrders;
    let data = eachOrder;
    eachOrder.orderStatus = e.currentTarget.value;
    prevOrder[prevOrder.indexOf(data)] = { ...eachOrder };
    let order = this.state.orders;
    order.upcomingOrders = prevOrder;
    this.setState({ orders: order });
    // this.setState({ order: eachOrder, showModal: true });
  };
  handleSubmit = (e, eachOrder) => {
    e.preventDefault();
    let data = {
      rest_id: this.state.rest_id,
      orderId: eachOrder._id,
      orderStatus: eachOrder.orderStatus
    };
    console.log(data);
    axios
      .post(`${util.base_url}/order/rest/changeStatus`, data)
      .then(response => {
        const orders = response.data;
        this.setState({ orders: orders });
      });
  };

  render() {
    console.log(this.state.orders.upcomingOrders);
    console.log(this.state.orders.pastOrders);
    let displayBlock,
      completedOrders = null;
    if (this.state.orders.upcomingOrders.length != 0) {
      displayBlock = this.state.orders.upcomingOrders.map(eachOrder => (
        <Draggable key={eachOrder._id}>
          <div className="card col-sm-3">
            <div className="card-body m-1">
              <div>
                <h5>Buyer Name</h5>
                <p>{eachOrder.buyerName}</p>
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
                <p>{eachOrder.buyerAddress}</p>
              </div>
              <div className="row justify-content-sm-center">
                <form onSubmit={e => this.handleSubmit(e, eachOrder)}>
                  <label>
                    <h2>Order Status:</h2>
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
              <Chat
                order={Object.assign(
                  {},
                  { id: this.state.rest_id, orderId: eachOrder._id }
                )}
              ></Chat>
            </div>
          </div>
        </Draggable>
      ));
    } else {
      displayBlock = (
        <div className="card col-sm-3">
          <h2>No Pending Orders</h2>
        </div>
      );
    }
    if (this.state.orders.pastOrders.length != 0) {
      completedOrders = (
        <div className="row mt-5">
          <h2 className="col-sm-12">Completed Orders</h2>
          {this.state.orders.pastOrders.map(eachOrder => (
            <div className="card col-sm-3" key={eachOrder._id}>
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
