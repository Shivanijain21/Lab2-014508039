import React, { Component } from "react";
import { Link } from "react-router-dom";
import util from "../utils";

class RestuarantCards extends Component {
  state = {};
  componentWillMount() {
    const restuarant = Object.assign({}, this.props.restuarant);
    this.setState({ ...restuarant });
  }

  render() {
    console.log(this.state);
    const imageStyle = {
      width: "100%",
      height: "100px",
      backgroundColor: "grey"
    };
    const imageUrl = `${util.base_url}/profileImage/Rest${this.state._id}`;
    const restuarantPageUrl = "/restuarant/" + this.state._id;
    return (
      <div class="row my-3">
        <Link to={restuarantPageUrl} className="col-sm-12">
          <div className="card">
            <img
              src={imageUrl}
              className="card-img-top"
              style={imageStyle}
              alt="..."
            ></img>
            <div className="card-body">
              <h5 className="card-title">{this.state.restuarantName}</h5>
              <p className="card-text">Deliver Time</p>
              <a href="#" className="btn btn-link">
                Explore
              </a>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default RestuarantCards;
