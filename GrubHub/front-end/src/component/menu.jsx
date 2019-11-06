import React, { Component } from "react";
import { Accordion, Card } from "react-bootstrap";
import axios from "axios";
import util from "../utils";

class Menu extends Component {
  state = {
    restId: "",
    sections: [],
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
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwt"
    );
    axios.get(`${util.base_url}/menu/${props.value}`).then(response => {
      let items = [];
      items = response.data;
      this.setState({ sections: items, restId: props.value });
    });
  }
  addItem = e => {
    let cart = this.state.cart;
    if (cart.hasOwnProperty(e._id)) {
      let current_count = cart[e._id]["quantity"];
      cart[e._id]["quantity"] = current_count + 1;
      cart[e._id]["price"] = e.price;
    } else {
      cart[e._id] = {};
      cart[e._id]["quantity"] = 1;
      cart[e._id]["name"] = e.itemName;
      cart[e._id]["price"] = e.price;
      cart[e._id]["restId"] = this.state.restId;
    }
    sessionStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart: cart });
  };
  deductItem = e => {
    let cart = this.state.cart;
    if (cart.hasOwnProperty(e._id)) {
      let current_count = cart[e._id]["quantity"];
      if (current_count != 0) {
        cart[e._id]["quantity"] = current_count - 1;
        cart[e._id]["price"] = e.price;
        if (cart[e._id]["quantity"] == 0) {
          delete cart[e._id];
        }
      }
    }
    sessionStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart: cart });
  };
  render() {
    let ItemList = null;
    const imageStyle = {
      height: "100px"
    };
    console.log("--------sections--------");
    console.log(this.state.sections);
    ItemList = this.state.sections.map(section => (
      <Accordion defaultActiveKey={section.sectionName}>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey={section.sectionName}>
            {section.sectionName}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={section.sectionName}>
            <div>
              {section.items.map(e => {
                let quantity = <p>0</p>;
                console.log(this.state.cart);
                if (this.state.cart.hasOwnProperty(e._id)) {
                  quantity = <p>{this.state.cart[e._id]["quantity"]}</p>;
                }
                let imageUrl = `${util.base_url}/profileImage/item${e._id}`;
                return (
                  <Card.Body className="row">
                    <div className="col-sm-2">
                      <img src={imageUrl} style={imageStyle} />
                    </div>
                    <div className="col-sm-10">
                      <h5>{e.itemName}</h5>
                      <p>{e.description}</p>
                      <p>${e.price}</p>
                      <div className="row">
                        <button
                          className="btn btn-danger mx-2"
                          onClick={() => this.deductItem(e)}
                        >
                          -
                        </button>
                        {quantity}
                        <button
                          className="btn btn-danger mx-2"
                          onClick={() => this.addItem(e)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </Card.Body>
                );
              })}
            </div>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    ));
    return <div ClassName="container">{ItemList}</div>;
  }
}

export default Menu;
