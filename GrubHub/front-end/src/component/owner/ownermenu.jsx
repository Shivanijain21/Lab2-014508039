import React, { Component } from "react";
import Axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import Navbar from "../navbar";
import util from "../../utils";
import { Modal, Button } from "react-bootstrap";

class OwnerMenu extends Component {
  state = {
    restId: "",
    section: [],
    addsection: {
      sectionName: "",
      description: ""
    },
    updateSection: {
      section_id: "",
      section_name: "",
      description: "",
      prevSectionName: ""
    },
    showAddSection: false,
    showUpdateModal: false
  };
  componentWillMount() {
    let restId = cookie.load("Owner");
    Axios.get(`${util.base_url}/menu/section/${restId}`).then(response => {
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

    Axios.post(`${util.base_url}/menu/addSection`, data).then(response => {
      console.log(response.data);
      if (response.data === 200) {
        Axios.get(`${util.base_url}/menu/section/${data.restId}`).then(
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
    Axios.post(`${util.base_url}/menu/deleteSection`, data).then(response => {
      console.log(response.data);
      if (response.data === 200) {
        Axios.get(`${util.base_url}/menu/section/${data.restId}`).then(
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
    });
  };
  redirectToItem = e => {
    const url = "/itemList/" + e.currentTarget.name;
    this.setState({ url: url });
  };
  handleUpdateModal = section => {
    let updateSection = {
      section_id: section.section_id,
      section_name: section.section_name,
      prevSectionName: section.section_name,
      description: section.description
    };
    let showUpdateModal = !this.state.showUpdateModal;
    this.setState({
      updateSection: updateSection,
      showUpdateModal: showUpdateModal
    });
  };
  handleClose = () => {
    this.setState({ showUpdateModal: false });
  };
  handleUpdateChanges = ({ currentTarget: input }) => {
    let updateSection = { ...this.state.updateSection };
    updateSection[input.name] = input.value;
    this.setState({ updateSection: updateSection });
  };
  handleSectionUpdate = e => {
    e.preventDefault();
    let data = {
      restId: this.state.restId,
      section_name: this.state.updateSection.section_name,
      prevSectionName: this.state.updateSection.prevSectionName,
      section_id: this.state.updateSection.section_id
    };
    console.log(data);
    Axios.post(`${util.base_url}/menu/editSection`, data).then(response => {
      console.log(response.data);
      if (response.data === 200) {
        Axios.get(`${util.base_url}/menu/section/${data.restId}`).then(
          response => {
            console.log(response.data);
            this.setState({
              section: response.data,
              showUpdateModal: false,
              errorMessage: 200
            });
          }
        );
      } else this.setState({ errorMessage: 500 });
    });
  };
  render() {
    console.log("sections");
    console.log(this.state.updateSection);
    let errorBlock,
      sectionCard,
      redirectVar,
      redirectToItemlist = null;
    if (!cookie.load("Owner")) {
      redirectVar = <Redirect to="/login" />;
    }
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
            <p className="text-center">{data.description}</p>
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
                onClick={() => this.handleUpdateModal(data)}
                className="btn btn-secondary ml-2"
              >
                Update
              </button>
              <button
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
        {redirectVar}
        {redirectToItemlist}
        {errorBlock}
        <Navbar />
        <div className="container mt-5">
          <div className="row">
            <div className="card col-sm-3">{displayCard}</div>
            {sectionCard}
          </div>
          <Modal show={this.state.showUpdateModal} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{this.state.updateSection.section_name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={this.handleSectionUpdate}>
                <label htmlFor="section_name">item Name</label>
                <input
                  type="text"
                  value={this.state.updateSection.section_name}
                  onChange={this.handleUpdateChanges}
                  name="section_name"
                />
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  value={this.state.updateSection.description}
                  onChange={this.handleUpdateChanges}
                  name="description"
                />
                <button type="submit" class="btn btn-primary">
                  Update
                </button>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

export default OwnerMenu;
