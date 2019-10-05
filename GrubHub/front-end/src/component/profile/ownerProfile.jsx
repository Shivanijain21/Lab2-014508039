import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateProfile, fetchProfile } from "../../actions/profileAction";
import PropTypes from "prop-types";
import { Image } from "react-bootstrap";
import cookie from "react-cookies";
import Axios from "axios";

class OwnerProfile extends Component {
  state = {
    owner: {
      email: "",
      password: "",
      name: "",
      owner_dp: "",
      restuarant_name: "",
      restuarant_dp: "",
      cuisine: "",
      restuarant_add: "",
      restuarant_zip: ""
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
    let image = "http://localhost:3001/profileImage/Rest" + owner.rest_id;
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
    param = "Rest" + cookie.load("Owner");
    Axios.post(
      "http://localhost:3001/profileImage/upload/" + param,
      formData,
      config
    ).then(response => {
      alert("successfully uploaded");
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
          <div className="row">
            <div className="col-sm-3">
              <Image
                src={this.state.image}
                roundedCircle
                style={{ height: "100%", width: "100%" }}
                alt="restuarantImg"
              />
            </div>
          </div>
          <div className="row" className="mt-5">
            <form onSubmit={this.handleUpload}>
              <div className="row">
                <input
                  type="file"
                  name="Image"
                  className="col-sm-6"
                  onChange={this.handleImageChange}
                />
              </div>
              <div className="row">
                <button type="submit" className="btn btn-primary col-sm-4">
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
        <form onSubmit={this.handleUpdate}>
          <div className="row">
            <div className="form-group col-sm-6">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                id="name"
                onChange={this.handleChange}
                value={owner.name}
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
            <label htmlFor="restuarant_name">Restuarant Name</label>
            <input
              type="text"
              className="form-control"
              name="restuarant_name"
              id="restuarant_name"
              onChange={this.handleChange}
              value={owner.restuarant_name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="owner_dp">owner dp</label>
            <input
              type="text"
              className="form-control"
              name="owner_dp"
              id="owner_dp"
              onChange={this.handleChange}
              value={owner.owner_dp}
            />
          </div>
          <div className="form-group">
            <label htmlFor="restuarant_dp">restuarant dp</label>
            <input
              type="text"
              className="form-control"
              name="restuarant_dp"
              id="restuarant_dp"
              onChange={this.handleChange}
              value={owner.restuarant_dp}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cuisine">Cuisine</label>
            <input
              type="text"
              className="form-control"
              name="cuisine"
              id="cuisine"
              onChange={this.handleChange}
              value={owner.cuisine}
            />
          </div>
          <div className="form-group">
            <label htmlFor="restuarant_add">restuarant add</label>
            <input
              type="text"
              className="form-control"
              name="restuarant_add"
              id="restuarant_add"
              onChange={this.handleChange}
              value={owner.restuarant_add}
            />
          </div>
          <div className="form-group">
            <label htmlFor="restuarant_zip">restuarant_zip</label>
            <input
              type="text"
              className="form-control"
              name="restuarant_zip"
              id="restuarant_zip"
              onChange={this.handleChange}
              value={owner.restuarant_zip}
            />
          </div>
          <div className="row">
            <button type="submit" className="col-sm-12 btn btn-primary">
              Update
            </button>
            <Link to="/home">
              <button className="col-sm-12 btn btn-primary">cancel</button>
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
