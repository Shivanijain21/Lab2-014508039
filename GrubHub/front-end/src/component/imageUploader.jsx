import React, { Component } from "react";
import cookie from "react-cookies";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Row, Col, Image } from "react-bootstrap";
import util from "../utils";

const axios = require("axios");

class ImageUploader extends Component {
  state = {
    file: null,
    image: `${util.base_url}/profileImage/${
      cookie.load("Buyer")
        ? "Buyer" + cookie.load("Buyer")
        : "Owner" + cookie.load("Owner")
    }`
  };
  handleChange = e => {
    this.setState({
      file: e.target.files[0]
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Image", this.state.file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    let param;
    if (cookie.load("Buyer")) {
      param = "Buyer" + cookie.load("Buyer");
    } else param = "Owner" + cookie.load("Owner");
    axios
      .post(`${util.base_url}/profileImage/upload/${param}`, formData, config)
      .then(response => {
        window.location.reload();
      });
  };

  render() {
    console.log("In image Uploader");
    console.log(this.props.profile);
    return (
      <div>
        <Row>
          <Col xs={12} md={12}>
            <Image
              src={this.state.image}
              roundedCircle
              style={{ height: "100%", width: "100%" }}
              alt="GrubHub"
            />
          </Col>
        </Row>
        <Row className="mt-5">
          <form onSubmit={this.handleSubmit}>
            <div className="col-sm-12">
              <input
                type="file"
                name="Image"
                className="col-sm-12 btn btn-secondary"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="col-sm-12">
              <button type="submit" className="btn btn-primary col-sm-12">
                Upload
              </button>
            </div>
          </form>
        </Row>
      </div>
    );
  }
}
ImageUploader.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile.items
});
export default connect(
  mapStateToProps,
  {}
)(ImageUploader);
