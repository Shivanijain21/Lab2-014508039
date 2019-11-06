import React, { Component } from "react";
import logo from "../Images/grubhub-icon.png";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { logout } from "../actions/loginAction";
import PropTypes from "prop-types";
import setAuthToken from "../setAuthToken";

//create the Navbar Component
class CustomNav extends Component {
  //handle logout to destroy the cookie
  handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    setAuthToken();
    this.props.logout();
  };

  render() {
    let homelink = null;
    let customLink = null;
    let user = `Hi`;
    //commonNav loop
    if (localStorage.getItem("id")) {
      console.log("Able to read cookie");
      if (localStorage.getItem("userProfile") == "buyer") {
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
