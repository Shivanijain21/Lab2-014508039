import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, animateScroll as scroll } from "react-scroll";
import Menu from "./menu";
import Axios from "axios";

class Restuarant extends Component {
  state = {
    restuarant: {
      rest_id: "",
      restuarant_name: "",
      restuarant_add: "",
      cuisine: "",
      restuarant_dp: ""
    }
  };

  componentWillMount() {
    let rest_id = this.props.match.params.id;
    let restuarant = { ...this.state.restuarant };
    Axios.get("http://localhost:3001/owner/profile/" + rest_id)
      .then(response => {
        console.log("In profile");
        restuarant.rest_id = rest_id;
        restuarant.restuarant_name = response.data.restuarant_name;
        restuarant.restuarant_add = response.data.restuarant_add;
        restuarant.cuisine = response.data.cuisine;
        restuarant.restuarant_dp = response.data.restuarant_dp;
        this.setState({ restuarant: restuarant });
      })
      .catch(err => console.log(err));
  }

  render() {
    const imageStyle = {
      width: "100%",
      height: "300px",
      backgroundColor: "grey"
    };
    return (
      <div class="container-fluid">
        <div className="row">
          <img
            className="col-sm-12 rest-img-top mt-3"
            style={imageStyle}
            alt="..."
          ></img>
        </div>
        <h3 className="col-sm-12 mt-3">
          {this.state.restuarant.restuarant_name}
        </h3>
        <div className="col-sm-12">
          <p>{this.state.restuarant.restuarant_add}</p>
        </div>
        <div className="col-sm-12">
          <p>Cuisine : {this.state.restuarant.cuisine}</p>
        </div>
        <Navbar sticky="top" bg="light" variant="light">
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
        </Navbar>
        <div id="menu">
          <h2>Menu</h2>
          <Menu />
          <div></div>
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
    );
  }
}

export default Restuarant;
