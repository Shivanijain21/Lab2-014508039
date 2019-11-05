import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchProfile, updateProfile } from "../../actions/profileAction";
import PropTypes from "prop-types";

class BuyerProfile extends Component {
  state = {
    buyer: {
      email: "",
      firstName: "",
      lastName: "",
      phone_num: "",
      address: ""
    }
  };
  componentWillMount() {
    this.props.fetchProfile();
  }
  componentWillReceiveProps({ profile }) {
    console.log("in recieve prop");
    console.log(profile);
    let buyer = Object.assign({}, profile);
    this.setState({ buyer });
  }
  handleUpdate = e => {
    e.preventDefault();
    const buyer = this.state.buyer;
    console.log(buyer.address);
    let data = {
      address: buyer.address,
      firstName: buyer.firstName,
      lastName: buyer.lastName,
      phone_num: buyer.phone_num
    };
    this.props.updateProfile(data);
  };
  handleChange = ({ currentTarget: input }) => {
    const buyer = { ...this.state.buyer };
    buyer[input.name] = input.value;
    this.setState({ buyer });
  };
  render() {
    const buyer = this.state.buyer;
    return (
      <div>
        <form onSubmit={this.handleUpdate}>
          <div className="row">
            <div className="form-group col-sm-6">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                name="email"
                id="email"
                value={buyer.email}
                disabled
              />
            </div>
            <div className="form-group col-sm-6">
              <label htmlFor="name">First Name</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                id="name"
                required
                onChange={this.handleChange}
                value={buyer.firstName}
                required
              />
            </div>
            <div className="form-group col-sm-6">
              <label htmlFor="name">Last Name</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                id="name"
                required
                onChange={this.handleChange}
                value={buyer.lastName}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-sm-12">
              <label htmlFor="phone_num">phone Number</label>
              <input
                type="number"
                className="form-control"
                name="phone_num"
                id="phone_num"
                onChange={this.handleChange}
                value={buyer.phone_num}
              />
            </div>
            <div className="form-group col-sm-12">
              <label htmlFor="address">address</label>
              <input
                type="text"
                className="form-control"
                name="address"
                id="address"
                onChange={this.handleChange}
                value={buyer.address}
                required
              />
            </div>
          </div>

          <div className="row justify-content-between my-5">
            <button type="submit" className="col-sm-5 btn btn-primary">
              Update
            </button>

            <Link className="col-sm-5 btn btn-primary" to="/home">
              cancel
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
BuyerProfile.propTypes = {
  fetchProfile: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile.items
});
export default connect(
  mapStateToProps,
  { fetchProfile, updateProfile }
)(BuyerProfile);
