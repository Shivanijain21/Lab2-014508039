import React, { Component } from "react";
import Axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import Navbar from "../navbar";

class OwnerMenu extends Component {
  state = {
    restId: "",
    section: [],
    addsection: {
      sectionName: "",
      description: ""
    },
    showAddSection: false
  };
  componentWillMount() {
    let restId = cookie.load("Owner");
    // console.log(restId);
    Axios.get("http://localhost:3001/menu/section/" + restId).then(response => {
      console.log(response.data);
      this.setState({ section: response.data, restId: restId });
    });
  }
  handleAddSection = e => {
    e.preventDefault();
    let data = {
      restId: this.state.restId,
      sectionName: this.state.addsection.sectionName,
      description: this.state.addsection.description,
      errorMessage: "",
      url: ""
    };
    // console.log(data);

    Axios.post("http://localhost:3001/menu/addSection", data).then(response => {
      console.log(response.data);
      if (response.data === 200) {
        Axios.get("http://localhost:3001/menu/section/" + data.restId).then(
          response => {
            console.log(response.data);
            let addsection = {
              sectionName: "",
              description: ""
            };
            this.setState({
              section: response.data,
              showAddSection: false,
              errorMessage: 200,
              addsection: addsection
            });
          }
        );
      }
      if (response.data === 400) {
        this.setState({ errorMessage: 400 });
      } else this.setState({ errorMessage: 500 });
    });
  };
  handleChange = ({ currentTarget: input }) => {
    const addsection = { ...this.state.addsection };
    addsection[input.name] = input.value;
    this.setState({ addsection: addsection });
  };

  showAddSection = () => {
    this.setState({ showAddSection: true });
  };
  handleDelete = e => {
    let data = {
      sectionName: e.currentTarget.name,
      restId: this.state.restId
    };
    console.log(data);
    Axios.post("http://localhost:3001/menu/deleteSection", data).then(
      response => {
        console.log(response.data);
        if (response.data === 200) {
          Axios.get("http://localhost:3001/menu/section/" + data.restId).then(
            response => {
              console.log(response.data);
              this.setState({
                section: response.data,
                showAddSection: false,
                errorMessage: 200
              });
            }
          );
        } else this.setState({ errorMessage: 500 });
      }
    );
  };
  redirectToItem = e => {
    const url = "/itemList/" + e.currentTarget.name;
    this.setState({ url: url });
  };
  render() {
    let errorBlock,
      sectionCard,
      redirectToItemlist = null;
    if (this.state.url) {
      redirectToItemlist = <Redirect to={this.state.url} />;
    }
    let displayCard = (
      <div className="card-body row justify-content-center">
        <button
          className="btn btn-primary col-sm-12"
          onClick={this.showAddSection}
        >
          + add section
        </button>
      </div>
    );
    if (this.state.showAddSection) {
      displayCard = (
        <div className="card-body">
          <h2>Add section</h2>
          <form onSubmit={this.handleAddSection}>
            <div className="form-group">
              <label htmlFor="sectionName">Section Name</label>
              <input
                type="text"
                name="sectionName"
                value={this.state.addsection.sectionName}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                name="description"
                value={this.state.addsection.description}
                onChange={this.handleChange}
                required
              />
            </div>
            <button className="btn btn-danger" type="submit">
              +
            </button>
          </form>
        </div>
      );
    }
    if (this.state.errorMessage === 400) {
      errorBlock = <div className="alert alert-danger">already exist</div>;
    } else if (this.state.errorMessage === 500) {
      errorBlock = (
        <div className="alert alert-danger">Something went wrong</div>
      );
    }
    if (this.state.section.length === 0) {
      sectionCard = (
        <div className="card col-sm-3">
          <div className="card-body">
            <h2>No sections</h2>
          </div>
        </div>
      );
    } else {
      sectionCard = this.state.section.map(data => (
        <div class="card col-sm-3">
          <div className="card-body m-1">
            <h2 className="text-center">{data.section_name}</h2>
            <div className="row justify-content-sm-center">
              <button
                type="button"
                onClick={this.handleDelete}
                name={data.section_name}
                className="btn btn-danger"
              >
                delete
              </button>
              <button
                className="btn btn-secondary"
                name={data.section_name}
                onClick={this.redirectToItem}
                className="btn btn-primary ml-2"
              >
                View
              </button>
            </div>
          </div>
        </div>
      ));
    }
    return (
      <div className="Container-fluid">
        {redirectToItemlist}
        {errorBlock}
        <Navbar />
        <div className="container mt-5">
          <div className="row">
            <div className="card col-sm-3">{displayCard}</div>
            {sectionCard}
          </div>
        </div>
      </div>
    );
  }
}

export default OwnerMenu;
