import React, { Component } from "react";
import axios from "axios";
import RestuarantCards from "./RestuarantCards";
import { Redirect } from "react-router";
import Navbar from "./navbar";
import util from "../utils";
import Pagination from "./pagination";
import { paginate } from "./paginate/paginate";

class SearchResult extends Component {
  state = {
    dataSet: [],
    totalDataSet: [],
    currentPage: 1,
    pageSize: 2
  };
  componentWillMount() {
    if (this.props.match.params.searchString === "null") {
      axios.defaults.headers.common["Authorization"] = localStorage.getItem(
        "jwt"
      );
      axios.get(`${util.base_url}/search/`).then(response => {
        const data = response.data;
        console.log("In search result");
        console.log(data);
        this.setState({ dataSet: data, totalDataSet: data });
      });
    } else {
      axios
        .get(`${util.base_url}/search/${this.props.match.params.searchString}`)
        .then(response => {
          const data = response.data;
          console.log("In search result");
          console.log(data);
          this.setState({ dataSet: data, totalDataSet: data });
        })
        .catch(err => console.log(err));
    }
  }

  handleChange = e => {
    let dataSet = this.state.dataSet;
    const cuisine = e.currentTarget.value;
    if (cuisine !== "All") {
      dataSet = this.state.totalDataSet.filter(
        data => data.cuisine === cuisine
      );
    } else dataSet = this.state.totalDataSet;
    this.setState({ dataSet: dataSet });
  };
  handlePageChange = page => {
    console.log(page);
    this.setState({ currentPage: page });
  };
  render() {
    let redirectVar = null;
    if (!localStorage.getItem("id")) {
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
      const restuarants = paginate(
        this.state.dataSet,
        this.state.currentPage,
        this.state.pageSize
      );
      restuarantList = (
        <div class="card-deck col-sm-9">
          {restuarants.map(data => (
            <div class="col-sm-12">
              <RestuarantCards key={data._id} restuarant={data} />
            </div>
          ))}
        </div>
      );
    }
    return (
      <div class="container-fluid">
        {redirectVar}
        <Navbar />
        <div class="row mt-5 mx-2">
          <div className="col-sm-3">
            <h2>Filter using cuisine</h2>
            <label>
              <select onChange={this.handleChange}>
                <option value="All">All</option>
                <option value="Indian">Indian</option>
                <option value="Chinese">Chinese</option>
                <option value="American">American</option>
                <option value="mexican">mexican</option>
                <option value="Japanese">Japanese</option>
                <option value="Italian">Japanese</option>
              </select>
            </label>
          </div>
          {restuarantList}
          <Pagination
            count={this.state.dataSet.length}
            pageSize={this.state.pageSize}
            currentPage={this.state.currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default SearchResult;
