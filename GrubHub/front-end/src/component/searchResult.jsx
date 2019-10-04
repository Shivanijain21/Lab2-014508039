import React, { Component } from "react";
import Axios from "axios";
import RestuarantCards from "./RestuarantCards";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import Navbar from "./navbar";

class SearchResult extends Component {
  state = {
    dataSet: [],
    cuisine: ""
  };
  componentWillMount() {
    if (this.props.match.params.searchString === "null") {
      Axios.get("http://localhost:3001/search/").then(response => {
        const data = response.data;
        console.log("In search result");
        console.log(data);
        this.setState({ dataSet: data });
      });
    } else {
      Axios.get(
        "http://localhost:3001/search/" + this.props.match.params.searchString
      )
        .then(response => {
          const data = response.data;
          console.log("In search result");
          console.log(data);
          this.setState({ dataSet: data });
        })
        .catch(err => console.log(err));
    }
  }

  handleOptionChange = e => {
    const user = { ...this.state };
    user.cuisine = e.currentTarget.value;
    user.dataSet = this.state.dataSet.filter(
      data => data.cuisine === user.cuisine
    );
    this.setState(user);
  };
  render() {
    let redirectVar = null;
    if (!cookie.load("Buyer")) {
      redirectVar = <Redirect to="/login" />;
    }
    let restuarantList = null;
    if (this.state.dataSet.length === 0) {
      restuarantList = (
        <div className="col-sm-9">
          <div className="alert alert-danger">No result found</div>
        </div>
      );
    } else {
      restuarantList = (
        <div class="card-deck col-sm-9">
          {this.state.dataSet.map(data => (
            <div class="col-sm-12">
              <RestuarantCards key={data.rest_id} restuarant={data} />
            </div>
          ))}
        </div>
      );
    }
    // console.log(this.state.dataSet);
    return (
      <div class="container-fluid">
        {redirectVar}
        <Navbar />
        <div class="row mt-5">
          <div className="col-sm-3">
            <h2>Filter using cuisine</h2>
            <div className="radio">
              <label>You are a: </label>
              <label className="px-2">
                <input
                  className="mr-2"
                  type="radio"
                  value="Indian"
                  name="cuisine"
                  checked={this.state.cuisine === "Indian"}
                  onChange={this.handleOptionChange}
                  required
                />
                Indian
              </label>
              <label className="px-2">
                <input
                  className="mr-2"
                  type="radio"
                  value="Mexican"
                  name="cuisine"
                  checked={this.state.cuisine === "Mexican" ? true : false}
                  onChange={this.handleOptionChange}
                  required
                />
                Mexican
              </label>
            </div>
          </div>
          {restuarantList}
        </div>
      </div>
    );
  }
}

export default SearchResult;
