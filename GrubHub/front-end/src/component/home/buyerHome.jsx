import React, { Component } from "react";
import { Form, Card, Accordion } from "react-bootstrap";
import image from "../../Images/pizza.jpg";
import { Link } from "react-router-dom";
import Axios from "axios";
import cookie from "react-cookies";

class BuyerHome extends Component {
  state = {
    searchString: null,
    dataSet: [],
    orders: {}
  };
  componentWillMount() {
    let buyer_id = cookie.load("Buyer");
    Axios.get("http://localhost:3001/order/" + buyer_id).then(response => {
      // console.log(response.data);
      let Orders = response.data;
      console.log(Orders);
      this.setState({ orders: Orders });
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

    if (this.state.orders.pastOrders) {
      PastOrder = this.state.orders.pastOrders.map(order => (
        <Card className="col-sm-4">
          <h2>{order.restuarant_name}</h2>
          <p>{order.orderDescription}</p>
          <p>{order.OrderStatus}</p>
          <p>{order.totalPrice}</p>
        </Card>
      ));
    } else
      PastOrder = (
        <Card className="col-sm-4">
          <h2>No orders yet</h2>
        </Card>
      );

    if (this.state.orders.upComingOrders) {
      UpcomingOrder = (
        <div className="row my-5">
          <h2 className="col-sm-12">Upcoming Orders</h2>
          {this.state.orders.upComingOrders.map(order => (
            <Card className="col-sm-4">
              <h2>{order.restuarant_name}</h2>
              <p>{order.orderDescription}</p>
              <p>{order.OrderStatus}</p>
              <p>{order.totalPrice}</p>
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
                placeholder="cuisine"
                className="col-sm-4 mr-sm-2 form-control"
                value={this.state.searchString}
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
