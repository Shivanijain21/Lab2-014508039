import React, { Component } from "react";
import { Accordion, Card } from "react-bootstrap";
import Axios from "axios";
import util from "../utils";

class Menu extends Component {
  state = {
    restId: "",
    items: {},
    cart: {}
  };
  componentWillMount() {
    console.log("value" + sessionStorage.getItem("cart"));
    if (sessionStorage.getItem("cart") != null) {
      let cart = JSON.parse(sessionStorage.getItem("cart"));
      this.setState({ cart: cart });
    }
  }
  componentWillReceiveProps(props) {
    Axios.get(`${util.base_url}/menu/${props.value}`).then(response => {
      let items = [];
      items = response.data;
      this.setState({ items: items });
    });
  }
  addItem = e => {
    let cart = this.state.cart;
    if (cart.hasOwnProperty(e.item_id)) {
      let current_count = cart[e.item_id]["quantity"];
      cart[e.item_id]["quantity"] = current_count + 1;
    } else {
      cart[e.item_id] = {};
      cart[e.item_id]["quantity"] = 1;
      cart[e.item_id]["name"] = e.item_name;
      cart[e.item_id]["price"] = e.price;
      cart[e.item_id]["restId"] = e.restId;
    }
    sessionStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart: cart });
  };
  deductItem = e => {
    let cart = this.state.cart;
    if (cart.hasOwnProperty(e.item_id)) {
      let current_count = cart[e.item_id]["quantity"];
      if (current_count != 0) {
        cart[e.item_id]["quantity"] = current_count - 1;
      }
    }
    sessionStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart: cart });
  };
  render() {
    const itemList = [];
    for (let menuItem in this.state.items) {
      let itemDesc = [];

      this.state.items[menuItem].forEach(e => {
        let quantity = <p>0</p>;
        console.log(this.state.cart);
        if (this.state.cart.hasOwnProperty(e.item_id)) {
          quantity = <p>{this.state.cart[e.item_id]["quantity"]}</p>;
        }

        itemDesc.push(
          <Card.Body>
            <p>{e.item_name}</p>
            <p>{e.description}</p>
            <p>{e.price}</p>
            <button onClick={() => this.addItem(e)}>+</button>
            <button onClick={() => this.deductItem(e)}>-</button>
            {quantity}
          </Card.Body>
        );
      });

      itemList.push(
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey={menuItem}>
            {menuItem}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={menuItem}>
            <div>{itemDesc}</div>
          </Accordion.Collapse>
        </Card>
      );
    }

    return (
      <div ClassName="container">
        <Accordion>{itemList}</Accordion>
      </div>
    );
  }
}

export default Menu;
