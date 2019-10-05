import React, { Component } from "react";
import logo from "../Images/grubhub-icon.png";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { logout } from "../actions/loginAction";
import PropTypes from "prop-types";

//create the Navbar Component
class CustomNav extends Component {
  //handle logout to destroy the cookie
  handleLogout = () => {
    localStorage.name = "";
    sessionStorage.clear();
    if (cookie.load("Buyer")) {
      cookie.remove("Buyer", { path: "/" });
    } else if (cookie.load("Owner")) {
      cookie.remove("Owner", { path: "/" });
    }
    this.props.logout();
  };

  render() {
    let homelink = null;
    let customLink = null;
    let user = `Hi`;
    //commonNav loop
    if (cookie.load("Owner") || cookie.load("Buyer")) {
      console.log("Able to read cookie");
      if (cookie.load("Buyer")) {
        homelink = "/home";
        customLink = (
          <Link to="/cart" className="linkinNav nav-link">
            Cart
          </Link>
        );
      } else {
        homelink = "/home";
        customLink = (
          <Link to="/restuarantMenu" className="linkinNav nav-link">
            Menu
          </Link>
        );
      }
    }

    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
          <Navbar.Brand>
            <Link to={homelink} className="nav-link">
              <img
                src={logo}
                width="60"
                height="auto"
                className="d-inline-block align-top"
                alt=""
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              {customLink}
              <NavDropdown title={user} id="collasible-nav-dropdown">
                <NavDropdown.Item>Past Order</NavDropdown.Item>
                <NavDropdown.Item>Upcoming Order</NavDropdown.Item>
                <NavDropdown.Item>Saved</NavDropdown.Item>
                <NavDropdown.Item>Gift Card</NavDropdown.Item>
                <NavDropdown.Item>Past Order</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>Refer a friend</NavDropdown.Item>
                <NavDropdown.Item>Perks</NavDropdown.Item>
                <NavDropdown.Item>Account</NavDropdown.Item>
                <NavDropdown.Item>Help</NavDropdown.Item>
                <Link
                  to="/"
                  className="dropdown-item"
                  onClick={this.handleLogout}
                >
                  Logout
                </Link>
              </NavDropdown>

              <Link to="/profile" className="linkinNav nav-link">
                Profile
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
CustomNav.propTypes = {
  logout: PropTypes.func.isRequired,
  login: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  login: state.login.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(CustomNav);
