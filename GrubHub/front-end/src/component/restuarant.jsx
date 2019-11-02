import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, animateScroll as scroll } from "react-scroll";
import { Link as Alink } from "react-router-dom";
import Menu from "./menu";
import Axios from "axios";
import CustomNavbar from "./navbar";
import { Redirect } from "react-router";
import cookie from "react-cookies";
import util from "../utils";

class Restuarant extends Component {
  state = {
    restuarant: {
      _id: "",
      restuarant_name: "",
      restuarant_add: "",
      cuisine: "",
      restuarant_dp: ""
    }
  };

  componentWillMount() {
    let _id = this.props.match.params.id;
    let restuarant = { ...this.state.restuarant };
    Axios.get(`${util.base_url}/owner/profile/${_id}`)
      .then(response => {
        console.log("In profile");
        restuarant._id = _id;
        restuarant.restuarantName = response.data.restuarantName;
        restuarant.restuarantAdd = response.data.restuarantAdd;
        restuarant.cuisine = response.data.cuisine;
        this.setState({ restuarant: restuarant });
      })
      .catch(err => console.log(err));
  }

  render() {
    let redirectVar = null;
    const imageStyle = {
      width: "100%",
      height: "300px",
      backgroundColor: "grey"
    };
    if (!cookie.load("Buyer")) {
      redirectVar = <Redirect to="/login" />;
    }
    const imageUrl = `${util.base_url}/profileImage/Rest${this.state.restuarant._id}`;
    return (
      <div class="container-fluid">
        {redirectVar}
        <CustomNavbar />
        <div className="row">
          <img
            className="col-sm-12 rest-img-top mt-3"
            src={imageUrl}
            style={imageStyle}
            alt="..."
          ></img>
        </div>
        <h3 className="col-sm-12 mt-3">
          {this.state.restuarant.restuarantName}
        </h3>
        <div className="col-sm-12">
          <p>{this.state.restuarant.restuarantAdd}</p>
        </div>
        <div className="col-sm-12">
          <p>Cuisine : {this.state.restuarant.cuisine}</p>
        </div>
        <Navbar
          sticky="top"
          bg="light"
          variant="light"
          className="d-flex justify-content-between"
        >
          <Nav sticky="top">
            <Nav.Item>
              <Link
                eventkey="1"
                className="nav-link"
                activeClass="active"
                to="menu"
                spy={true}
                smooth={true}
                offset={-20}
                duration={500}
              >
                Menu
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                eventkey="2"
                className="nav-link"
                to="about"
                activeClass="active"
                spy={true}
                smooth={true}
                offset={-20}
                duration={500}
              >
                About
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                eventkey="3"
                activeClass="active"
                className="nav-link"
                to="review"
                spy={true}
                smooth={true}
                offset={-20}
                duration={500}
              >
                Review
              </Link>
            </Nav.Item>
          </Nav>
          <Alink to="/cart" className="btn btn-primary col-sm-3">
            Checkout
          </Alink>
        </Navbar>
        <div className="container">
          <div id="menu">
            <h2>Menu</h2>
            <Menu value={this.state.restuarant._id} />
          </div>
          <div id="about">
            <h2>about</h2>
            <div>About Content</div>
          </div>
          <div id="review">
            <h2>review</h2>
            <div>Review Content</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Restuarant;
