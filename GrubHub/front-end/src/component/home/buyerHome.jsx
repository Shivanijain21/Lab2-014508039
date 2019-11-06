import React, { Component } from "react";
import { Form, Card } from "react-bootstrap";
import image from "../../Images/pizza.jpg";
import { Link } from "react-router-dom";
import Axios from "axios";
import util from "../../utils";
import Chat from "../chat";

class BuyerHome extends Component {
  state = {
    searchString: null,
    orders: {
      pastOrders: [],
      upcomingOrders: []
    },
    buyerId: ""
  };
  componentWillMount() {
    let _id = localStorage.getItem("id");
    // let token = localStorage.getItem("jwt");
    Axios.get(`${util.base_url}/order/${_id}`).then(response => {
      // console.log(response.data);
      let Orders = response.data;
      // console.log(Orders);
      this.setState({ orders: Orders, buyerId: _id });
    });
  }
  render() {
    console.log(this.state.orders);
    let UpcomingOrder,
      PastOrder = null;
    const imageStyle = {
      width: "100%",
      height: "100%"
    };
    const searchWrapper = {
      position: "relative"
    };
    const searchbar = {
      position: "absolute",
      top: "50%"
    };
    this.handleChange = ({ currentTarget: input }) => {
      const searchString = input.value;
      this.setState({ searchString: searchString });
    };
    this.handleSearch = e => {
      e.preventDefault();
      const searchString = this.state.searchString;
      console.log("/search/" + searchString);
    };
    const url = "/searchResult/" + this.state.searchString;
    console.log(this.state);
    if (this.state.orders.pastOrders.length != 0) {
      PastOrder = this.state.orders.pastOrders.map(order => (
        <Card className="col-sm-4">
          <div className="card-body">
            <div>
              <h5>Restuarant Name</h5>
              <p>{order.restuarantName}</p>
            </div>
            <div>
              <h5>Order Details</h5>
              <p>{order.orderDescription}</p>
            </div>
            <div>
              <h5>Total Price</h5>
              <p>{order.totalPrice}</p>
            </div>
            <div>
              <h5>Order Status</h5>
              <p>{order.orderStatus}</p>
            </div>
          </div>
        </Card>
      ));
    } else
      PastOrder = (
        <Card className="col-sm-4">
          <h2>No orders yet</h2>
        </Card>
      );

    if (this.state.orders.upcomingOrders.length != 0) {
      UpcomingOrder = (
        <div className="row my-5">
          <h2 className="col-sm-12">Upcoming Orders</h2>
          {this.state.orders.upcomingOrders.map(order => (
            <Card className="col-sm-4">
              <div className="card-body">
                <div>
                  <h5>Restuarant Name</h5>
                  <p>{order.restuarantName}</p>
                </div>
                <div>
                  <h5>Order Details</h5>
                  <p>{order.orderDescription}</p>
                </div>
                <div>
                  <h5>Total Price</h5>
                  <p>{order.totalPrice}</p>
                </div>
                <div>
                  <h5>Order Status</h5>
                  <p>{order.orderStatus}</p>
                </div>
                <div>
                  <Chat
                    order={Object.assign(
                      {},
                      { id: this.state.buyerId, orderId: order._id }
                    )}
                  ></Chat>
                </div>
              </div>
            </Card>
          ))}
        </div>
      );
    }

    return (
      <div>
        <div className="searchWrapper  mb-5" style={searchWrapper}>
          <img src={image} style={imageStyle} />
          <div className="searchbar col-sm-12" style={searchbar}>
            <Form
              inline
              className="container justify-content-sm-center"
              onSubmit={this.handleSearch}
            >
              <input
                type="text"
                placeholder="food Item or Restuarant Name"
                className="col-sm-4 mr-sm-2 form-control"
                // value={this.state.searchString}
                onChange={this.handleChange}
                name="searchString"
              />
              <Link to={url} className="btn btn-primary">
                Find Food
              </Link>
            </Form>
          </div>
        </div>
        <div class="container">
          <div class="col-sm-12">
            <h2>Your Orders</h2>
            {UpcomingOrder}
            <div className="row mt-2">
              <h2 className="col-sm-12">Past Orders</h2>
              {PastOrder}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default BuyerHome;
