import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateProfile, fetchProfile } from "../../actions/profileAction";
import PropTypes from "prop-types";
import { Image } from "react-bootstrap";
import axios from "axios";
import util from "../../utils";

class OwnerProfile extends Component {
  state = {
    owner: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      restuarantName: "",
      cuisine: "",
      restuarantAdd: "",
      Zip: ""
    },
    file: null,
    image: ""
  };
  componentWillMount() {
    this.props.fetchProfile();
  }
  componentWillReceiveProps({ profile }) {
    console.log("in recieve prop");
    console.log(profile);
    let owner = Object.assign({}, profile);
    let image = `${util.base_url}/profileImage/Rest${owner.rest_id}`;
    this.setState({ owner: owner, image: image });
  }
  handleUpdate = e => {
    e.preventDefault();
    console.log("inside handle update");
    const user = this.state.owner;
    let data = Object.assign({}, user);
    console.log("from handleUpdate");
    this.props.updateProfile(data);
  };
  handleChange = ({ currentTarget: input }) => {
    const owner = { ...this.state.owner };
    owner[input.name] = input.value;
    this.setState({ owner });
  };
  handleUpload = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Image", this.state.file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    let param;
    param = "Rest" + localStorage.getItem("id");
    axios
      .post(`${util.base_url}/profileImage/upload/${param}`, formData, config)
      .then(response => {
        window.location.reload();
      });
  };
  handleImageChange = e => {
    this.setState({
      file: e.target.files[0]
    });
  };
  render() {
    const owner = this.state.owner;
    return (
      <div>
        <div>
          <div className="row justify-content-end">
            <div className="col-sm-3">
              <h5>Restuarant Image</h5>
              <Image
                src={this.state.image}
                roundedCircle
                style={{ height: "100%", width: "100%" }}
                alt="restuarantImg"
              />
            </div>
          </div>
          <div className="row justify-content-end mt-5">
            <form onSubmit={this.handleUpload}>
              <input
                type="file"
                name="Image"
                className="col-sm-12 btn btn-secondary my-1"
                onChange={this.handleImageChange}
                required
              />
              <button type="submit" className="btn btn-primary col-sm-12">
                Upload
              </button>
            </form>
          </div>
        </div>
        <form onSubmit={this.handleUpdate}>
          <div className="row">
            <div className="form-group col-sm-6">
              <label htmlFor="name">First Name</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                id="name"
                onChange={this.handleChange}
                value={owner.firstName}
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
                onChange={this.handleChange}
                value={owner.lastName}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-sm-12">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                onChange={this.handleChange}
                value={owner.email}
                disabled
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="restuarantName">Restuarant Name</label>
            <input
              type="text"
              className="form-control"
              name="restuarantName"
              id="restuarantName"
              onChange={this.handleChange}
              value={owner.restuarantName}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cuisine">Cuisine</label>
            <select
              name="cuisine"
              id="cuisine"
              className="form-control"
              value={owner.cuisine}
              onChange={this.handleChange}
            >
              <option value="Indian">Indian</option>
              <option value="Chinese">Chinese</option>
              <option value="American">American</option>
              <option value="mexican">mexican</option>
              <option value="Japanese">Japanese</option>
              <option value="Japanese">Italian</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="restuarantAdd">restuarant address</label>
            <input
              type="text"
              className="form-control"
              name="restuarantAdd"
              id="restuarantAdd"
              onChange={this.handleChange}
              value={owner.restuarantAdd}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Zip">restuarant zip</label>
            <input
              type="text"
              className="form-control"
              name="Zip"
              id="Zip"
              onChange={this.handleChange}
              value={owner.Zip}
            />
          </div>
          <div className="row justify-content-between mb-5">
            <button type="submit" className="col-sm-5 btn btn-primary">
              Update
            </button>
            <Link to="/home" className="col-sm-5 btn btn-primary">
              cancel
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
OwnerProfile.propTypes = {
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
)(OwnerProfile);
