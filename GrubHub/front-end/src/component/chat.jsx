import React, { Component } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import util from "../utils";

class Chat extends Component {
  state = {
    eachOrder: {},
    displayMessageModal: false,
    messages: [],
    messageContent: ""
  };
  componentDidMount() {
    console.log(this.props);
    console.log(this.props.order);
    this.setState({ eachOrder: this.props.order });
  }
  showMessageModal = eachOrder => {
    let data = {
      id: this.state.eachOrder.id,
      orderId: this.state.eachOrder.orderId,
      sender: localStorage.getItem("userProfile") == "owner" ? "Owner" : "Buyer"
    };
    console.log(data);
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwt"
    );
    axios.post(`${util.base_url}/message/`, data).then(response => {
      const messages = response.data;
      this.setState({
        messages: messages,
        displayMessageModal: true
      });
    });
  };
  handleSendMessage = e => {
    e.preventDefault();
    let data = {
      id: this.state.eachOrder.id,
      orderId: this.state.eachOrder.orderId,
      messageContent: this.state.messageContent,
      sender: localStorage.getItem("userProfile") == "owner" ? "Owner" : "Buyer"
    };
    axios
      .post(`${util.base_url}/message/sendMessage`, data)
      .then(response => {
        const messages = response.data;
        this.setState({
          messages: messages,
          messageContent: ""
        });
      })
      .catch(err => console.log(err.response.data));
  };
  handleClose = () => {
    this.setState({ displayMessageModal: false, messageContent: "" });
  };
  handleMessage = ({ currentTarget: input }) => {
    this.setState({ messageContent: input.value });
  };
  render() {
    let eachOrder = this.state.eachOrder;
    let cusClassName = "";
    return (
      <>
        <button
          onClick={() => this.showMessageModal(eachOrder)}
          className="btn btn-secondary ml-2"
        >
          Message
        </button>
        <Modal show={this.state.displayMessageModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Chat</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.messages.map(message => {
              if (message.senderId === this.state.eachOrder.id) {
                cusClassName = "col-sm-12 btn btn-danger";
              } else cusClassName = "col-sm-12 btn btn-secondary";
              return (
                <div key={message._id} className="my-2">
                  <p>
                    {message.sentBy}, {message.timestamp}
                  </p>
                  <p className={cusClassName}>{message.messageBody}</p>
                </div>
              );
            })}
          </Modal.Body>
          <Modal.Footer>
            <form onSubmit={this.handleSendMessage} className="row col-sm-12">
              <input
                type="text"
                name="messageContent"
                className="col-sm-10"
                value={this.state.messageContent}
                onChange={this.handleMessage}
              />
              <button type="submit" className="btn btn-primary col-sm-2">
                send
              </button>
            </form>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Chat;
