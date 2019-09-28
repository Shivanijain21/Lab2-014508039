import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchProfile, updateProfile } from "../../actions/profileAction";
import PropTypes from "prop-types";

class BuyerProfile extends Component {
  state = {
    buyer: {
      email: "",
      name: "",
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
      name: buyer.name,
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
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                id="name"
                onChange={this.handleChange}
                value={buyer.name}
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
              />
            </div>
          </div>

          <div className="row">
            <button type="submit" className="col-sm-12 btn btn-primary">
              Update
            </button>

            <Link className="col-sm-12 btn btn-primary" to="/home">
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
