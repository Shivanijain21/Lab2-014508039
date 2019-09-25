import React, { Component } from "react";
import Redirect from "react";
import { Link } from "react-router-dom";

class RestuarantCards extends Component {
  state = {};

  render() {
    const imageStyle = {
      width: "100%",
      height: "100px",
      backgroundColor: "grey"
    };
    return (
      <div>
        <div class="row justify-content-sm-center">
          <Link to="/restuarant">
            <div className="card">
              <img
                className="card-img-top mt-3"
                style={imageStyle}
                alt="..."
              ></img>
              <div className="card-body">
                <h5 className="card-title">Restuarant Title</h5>
                <p className="card-text">Deliver Time</p>
                <a href="#" className="btn btn-link">
                  Explore
                </a>
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default RestuarantCards;
