import React, { Component } from "react";
import { Form } from "react-bootstrap";
import image from "../../Images/pizza.jpg";
import RestuarantCards from "../RestuarantCards";
import Axios from "axios";
import { Link } from "react-router-dom";

class BuyerHome extends Component {
  state = {
    searchString: null,
    dataSet: []
  };
  render() {
    let searchResult = null;
    const imageStyle = {
      width: "100%",
      height: "100%"
    };
    const searchWrapper = {
      position: "relative"
    };
    const searchbar = {
      position: "absolute",
      top: "50%"
    };
    this.handleChange = ({ currentTarget: input }) => {
      const searchString = input.value;
      this.setState({ searchString: searchString });
    };
    this.handleSearch = e => {
      e.preventDefault();
      const searchString = this.state.searchString;
      console.log("/search/" + searchString);
      // Axios.get("http://localhost:3001/search/" + searchString)
      //   .then(response => {
      //     const data = response.data;
      //     console.log(data);
      //     this.setState({ dataSet: data });
      //   })
      //   .catch(err => console.log(err));
    };
    // if (this.state.dataSet.length > 0) {
    //   searchResult = (
    //     <div class="card-deck">
    //       {this.state.dataSet.map(data => (
    //         <div class="col-sm-4">
    //           <RestuarantCards restuarant={data} />
    //         </div>
    //       ))}
    //     </div>
    //   );
    // }
    // console.log(this.state.data);
    const url = "/searchResult/" + this.state.searchString;
    return (
      <div>
        <div className="searchWrapper  mb-5" style={searchWrapper}>
          <img src={image} style={imageStyle} />
          <div className="searchbar col-sm-12" style={searchbar}>
            <Form
              inline
              className="container justify-content-sm-center"
              onSubmit={this.handleSearch}
            >
              <input
                type="text"
                placeholder="cuisine"
                className="col-sm-4 mr-sm-2 form-control"
                value={this.state.searchString}
                onChange={this.handleChange}
                name="searchString"
              />
              <Link to={url} className="btn btn-primary">
                Find Food
              </Link>
            </Form>
          </div>
        </div>
        <div class="container">
          <div class="col-sm-12">
            <h2>Your Orders</h2>
            {/* {searchResult} */}
          </div>
        </div>
      </div>
    );
  }
}
export default BuyerHome;
