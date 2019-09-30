import React, { Component } from "react";
import Axios from "axios";
import cookie from "react-cookies";

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
      errorMessage: ""
    };
    // console.log(data);

    Axios.post("http://localhost:3001/menu/addSection", data).then(response => {
      console.log(response.data);
      if (response.data === 200) {
        this.setState({ showAddSection: false, errorMessage: 200 });
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
          this.setState({ errorMessage: 200 });
        } else this.setState({ errorMessage: 500 });
      }
    );
  };

  render() {
    let errorBlock,
      sectionCard = null;
    let displayCard = (
      <div className="card-body">
        <button className="btn btn-primary" onClick={this.showAddSection}>
          +
        </button>
        <p>add section</p>
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
              <label htmlFor="description">Description</label>
              <input
                type="text"
                name="description"
                value={this.state.addsection.description}
                onChange={this.handleChange}
                required
              />
              <button className="btn btn-danger" type="submit">
                +
              </button>
            </div>
          </form>
        </div>
      );
    }
    if (this.state.errorMessage === 400) {
      errorBlock = <div className="alert alert-danger">already exist</div>;
    } else if (this.state.errorMessage === 500) {
      errorBlock = (
        <div className="alert alert-danger">something went wrong</div>
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
          <div className="card-body">
            <button
              type="button"
              onClick={this.handleDelete}
              name={data.section_name}
            >
              delete
            </button>
            <p>{data.section_name}</p>
          </div>
        </div>
      ));
    }
    return (
      <div className="Container-fluid">
        {errorBlock}
        <div className="row">
          <div className="col-sm-12 card-deck">
            <div className="card col-sm-3">{displayCard}</div>
            {sectionCard}
          </div>
        </div>
      </div>
    );
  }
}

export default OwnerMenu;
