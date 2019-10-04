import React, { Component } from "react";
import { Link } from "react-router-dom";

class RestuarantCards extends Component {
  state = {
    rest_id: "",
    restuarant_name: "",
    restuarant_dp: ""
  };
  componentWillMount() {
    const restuarant = Object.assign({}, this.props.restuarant);
    this.setState({ ...restuarant });
  }

  render() {
    const imageStyle = {
      width: "100%",
      height: "100px",
      backgroundColor: "grey"
    };
    const restuarantPageUrl = "/restuarant/" + this.state.rest_id;
    return (
      <div class="row my-3">
        <Link to={restuarantPageUrl} className="col-sm-12">
          <div className="card">
            <img className="card-img-top" style={imageStyle} alt="..."></img>
            <div className="card-body">
              <h5 className="card-title">{this.state.restuarant_name}</h5>
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
