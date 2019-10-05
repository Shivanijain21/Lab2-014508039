import React, { Component } from "react";
import cookie from "react-cookies";
import Axios from "axios";
import Navbar from "../navbar";
import { Button, Modal } from "react-bootstrap";
import { Redirect } from "react-router";
import util from "../../utils";

class ItemList extends Component {
  state = {
    restId: "",
    sectionName: "",
    Items: [],
    showAddSectionForm: false,
    Item: {
      itemName: "",
      price: "",
      description: ""
    },
    showItemModal: false,
    ItemUpdate: {
      itemName: "",
      price: "",
      description: "",
      itemId: ""
    },
    errorFlag: "",
    file: null
  };
  componentWillMount() {
    let restId = cookie.load("Owner");
    let sectionName = this.props.match.params.section;
    let data = {
      restId: restId,
      sectionName: sectionName
    };
    let Items = [];
    Axios.post(`${util.base_url}/menu`, data).then(response => {
      Items = [...response.data];
      Items.forEach(item => {
        item.image = `${util.base_url}/profileImage/item${item.item_id}`;
      });
      console.log(Items);
      this.setState({
        restId: restId,
        sectionName: sectionName,
        Items: Items,
        showAddSectionForm: false
      });
    });
  }
  showAddSection = () => {
    this.setState({ showAddSectionForm: true });
  };
  insertItem = e => {
    e.preventDefault();
    let data = {
      itemName: this.state.Item.itemName,
      price: this.state.Item.price,
      description: this.state.Item.description,
      restId: this.state.restId,
      sectionName: this.state.sectionName
    };
    let Items = [];
    Axios.post(`${util.base_url}/menu/addItem`, data)
      .then(response => {
        console.log("in insert item");

        Items = [...response.data];
        Items.forEach(item => {
          item.onUpdate = "";
        });
        console.log(Items);
        let Item = Object.assign(
          {},
          { itemName: "", price: "", description: "" }
        );
        this.setState({
          Items: Items,
          errorFlag: "",
          Item: Item,
          showAddSectionForm: false
        });
      })
      .catch(err => {
        console.log(err.response.data);
        this.setState({ errorFlag: err.response.data });
      });
  };
  handleChange = ({ currentTarget: input }) => {
    let Item = { ...this.state.Item };
    Item[input.name] = input.value;
    this.setState({ Item: Item });
  };
  handleDelete = ({ currentTarget: input }) => {
    let data = {
      restId: this.state.restId,
      itemId: input.name,
      sectionName: this.state.sectionName
    };
    console.log(data);
    let Items = [];
    Axios.post(`${util.base_url}/menu/deleteItem`, data)
      .then(response => {
        console.log("in delete item");
        Items = [...response.data];
        this.setState({ Items: Items, errorFlag: "" });
      })
      .catch(err => {
        console.log(err.response.data);
        this.setState({ errorFlag: err.response.data });
      });
  };
  showUpdateModal = ({ item }) => {
    let ItemUpdate = {
      itemName: item.item_name,
      price: item.price,
      description: item.description,
      itemId: item.item_id
    };
    let showItemModal = !this.state.showItemModal;
    this.setState({ ItemUpdate: ItemUpdate, showItemModal: showItemModal });
  };
  handleClose = () => {
    window.location.reload();
    this.setState({ showItemModal: false });
  };
  handleUpdateChanges = ({ currentTarget: input }) => {
    let ItemUpdate = { ...this.state.ItemUpdate };
    ItemUpdate[input.name] = input.value;
    this.setState({ ItemUpdate: ItemUpdate });
  };
  itemUpdate = e => {
    e.preventDefault();
    let data = { ...this.state.ItemUpdate };
    data.sectionName = this.state.sectionName;
    data.restId = this.state.restId;
    let Items = [];
    Axios.post(`${util.base_url}/menu/editItem`, data)
      .then(response => {
        console.log("in insert item");
        console.log(response.data);
        Items = [...response.data];
        this.setState({ Items: Items, showItemModal: false, errorFlag: "" });
      })
      .catch(err => {
        console.log(err.response.data);
        this.setState({ errorFlag: err.response.data, showItemModal: false });
      });
  };
  handleImageChange = e => {
    this.setState({
      file: e.target.files[0]
    });
  };
  handleUpload = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Image", this.state.file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    let param;
    param = "item" + this.state.ItemUpdate.itemId;
    Axios.post(
      `${util.base_url}/profileImage/upload/${param}`,
      formData,
      config
    ).then(response => {
      alert("successfully uploaded");
    });
  };
  render() {
    let ItemList,
      errorBlock,
      addAnItem,
      redirectVar = null;
    console.log("Items");
    console.log(this.state.Items);
    if (!cookie.load("Owner")) {
      redirectVar = <Redirect to="/login" />;
    }
    if (this.state.errorFlag === 500) {
      errorBlock = (
        <div className="alert alert-danger">Something went wrong</div>
      );
    }
    if (this.state.Item.length === 0) {
      ItemList = (
        <div className="alert alert-primary">
          No item in this section. You can add one.
        </div>
      );
    } else {
      ItemList = this.state.Items.map(item => (
        <div class="col-sm-12 my-1 item">
          <div className="row justify-content-md-center py-1">
            <img
              src={item.image}
              style={{ height: "60px" }}
              className="col-sm-1"
            />
            <div className="col-sm-3 my-auto">{item.item_name}</div>
            <div className="col-sm-1 my-auto">{item.price}</div>
            <div className="col-sm-3 my-auto">{item.description}</div>
            <button
              className="btn btn-danger col-sm-1"
              name={item.item_id}
              onClick={this.handleDelete}
            >
              -
            </button>
            <button
              className="btn btn-danger ml-1 col-sm-1"
              onClick={() => this.showUpdateModal({ item })}
            >
              Update
            </button>
          </div>
        </div>
      ));
    }
    if (this.state.showAddSectionForm === true) {
      addAnItem = (
        <div class="col-sm-12 item">
          <form
            onSubmit={this.insertItem}
            className="row justify-content-sm-center"
          >
            <div className="form-group col-sm-3">
              <label htmlFor="itemName">Item Name</label>
              <input
                type="text"
                name="itemName"
                className="form-control"
                onChange={this.handleChange}
                value={this.state.Item.itemName}
              />
            </div>
            <div className="form-group col-sm-3">
              <label htmlFor="price">price</label>
              <input
                type="number"
                name="price"
                className="form-control"
                onChange={this.handleChange}
                value={this.state.Item.price}
              />
            </div>
            <div className="form-group col-sm-3">
              <label htmlFor="description">description</label>
              <input
                type="text"
                name="description"
                className="form-control"
                onChange={this.handleChange}
                value={this.state.Item.description}
              />
            </div>
            <button className="btn btn-danger col-sm-1 my-auto" type="submit">
              +
            </button>
          </form>
        </div>
      );
    } else {
      addAnItem = (
        <button
          className="btn btn-primary col-sm-12"
          onClick={this.showAddSection}
        >
          + add item
        </button>
      );
    }

    return (
      <div class="container-fluid">
        {redirectVar}
        <Navbar />
        <div class="container">
          <h2 className="my-5"> List of Item in {this.sectionName} section</h2>
          {errorBlock}
          <div class="row card-deck">
            {ItemList}
            {addAnItem}
          </div>
          <Modal show={this.state.showItemModal} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{this.state.ItemUpdate.item_name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={e => this.handleUpload(e, this.state.ItemUpdate)}>
                <div className="row">
                  <input
                    type="file"
                    name="Image"
                    className="col-sm-6"
                    onChange={this.handleImageChange}
                  />
                </div>
                <div className="row">
                  <button type="submit" className="btn btn-primary col-sm-4">
                    Upload
                  </button>
                </div>
              </form>
              <form onSubmit={this.itemUpdate}>
                <label htmlFor="ItemName">item Name</label>
                <input
                  type="text"
                  value={this.state.ItemUpdate.itemName}
                  onChange={this.handleUpdateChanges}
                  name="itemName"
                />
                <label htmlFor="price">price</label>
                <input
                  type="text"
                  value={this.state.ItemUpdate.price}
                  onChange={this.handleUpdateChanges}
                  name="price"
                />
                <label htmlFor="description">description</label>
                <input
                  type="text"
                  value={this.state.ItemUpdate.description}
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

export default ItemList;
