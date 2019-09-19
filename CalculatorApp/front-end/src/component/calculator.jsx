import React, { Component } from "react";
import axios from "axios";

class Calculator extends Component {
  state = {
    input: ""
  };
  handleChange = ({ currentTarget: input }) => {
    let Input = input.value;
    this.setState({ input: Input });
  };
  handleClick = e => {
    e.preventDefault();
    let Input = this.state.input;
    // let operators = ["+", "-", "/", "*"];
    const currentInput = e.currentTarget.value;
    const lastInput = Input.slice(-1);
    if (
      currentInput === "+" ||
      currentInput === "-" ||
      currentInput === "*" ||
      currentInput === "/"
    ) {
      if (
        lastInput !== "+" &&
        lastInput !== "-" &&
        lastInput !== "*" &&
        lastInput !== "/"
      ) {
        Input = Input + currentInput;
      }
    } else Input = Input + currentInput;
    this.setState({ input: Input });
  };
  handleSubmit = e => {
    e.preventDefault();
    const data = {
      input: this.state.input
    };
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post("http://localhost:3001/submit", data)
      .then(response => {
        console.log(response.data.output);
        this.setState({ input: response.data.output });
      })
      .catch(error => {
        console.log(error);
      });
  };
  handleReset = e => {
    e.preventDefault();
    this.setState({ input: "" });
  };
  render() {
    return (
      <div class="container">
        <form>
          <div className="row justify-content-sm-center">
            <div className="col-4">
              <div className="row display py-2">
                <input
                  className="form-control col-12"
                  type="text"
                  name="display"
                  onChange={this.handleChange}
                  value={this.state.input}
                ></input>
              </div>
              <div className="row">
                <button
                  onClick={this.handleReset}
                  className="col-sm-3 btn btn-light"
                  value="CE"
                >
                  CE
                </button>
                <button
                  onClick={this.handleClick}
                  className="col-sm-3 btn btn-light"
                  value="("
                >
                  (
                </button>
                <button
                  onClick={this.handleClick}
                  className="col-sm-3 btn btn-light"
                  value=")"
                >
                  )
                </button>
                <button
                  onClick={this.handleClick}
                  className="col-sm-3 btn btn-light"
                  value="+"
                >
                  +
                </button>
              </div>
              <div className="row">
                <button
                  onClick={this.handleClick}
                  className="col-sm-3 btn btn-light"
                  value="7"
                >
                  7
                </button>
                <button
                  onClick={this.handleClick}
                  className="col-sm-3 btn btn-light"
                  value="8"
                >
                  8
                </button>
                <button
                  onClick={this.handleClick}
                  className="col-sm-3 btn btn-light"
                  value="9"
                >
                  9
                </button>
                <button
                  onClick={this.handleClick}
                  className="col-sm-3 btn btn-light"
                  value="-"
                >
                  -
                </button>
              </div>
              <div className="row">
                <button
                  onClick={this.handleClick}
                  className="col-sm-3 btn btn-light"
                  value="6"
                >
                  6
                </button>
                <button
                  onClick={this.handleClick}
                  className="col-sm-3 btn btn-light"
                  value="5"
                >
                  5
                </button>
                <button
                  onClick={this.handleClick}
                  className="col-sm-3 btn btn-light"
                  value="4"
                >
                  4
                </button>
                <button
                  onClick={this.handleClick}
                  className="col-sm-3 btn btn-light"
                  value="*"
                >
                  *
                </button>
              </div>
              <div className="row">
                <button
                  onClick={this.handleClick}
                  className="col-sm-3 btn btn-light"
                  value="3"
                >
                  3
                </button>
                <button
                  onClick={this.handleClick}
                  className="col-sm-3 btn btn-light"
                  value="2"
                >
                  2
                </button>
                <button
                  onClick={this.handleClick}
                  className="col-sm-3 btn btn-light"
                  value="1"
                >
                  1
                </button>
                <button
                  onClick={this.handleClick}
                  className="col-sm-3 btn btn-light"
                  value="/"
                >
                  /
                </button>
              </div>
              <div className="row">
                <button
                  onClick={this.handleClick}
                  className="col-sm-3 btn btn-light"
                  value="."
                >
                  .
                </button>
                <button
                  onClick={this.handleClick}
                  className="col-sm-3 btn btn-light"
                  value="0"
                >
                  0
                </button>
                <button
                  onClick={this.handleSubmit}
                  type="submit"
                  className="col-sm-6 btn btn-light"
                  value="="
                >
                  =
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Calculator;
