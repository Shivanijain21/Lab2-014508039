import React, { Component } from "react";

class SignUp extends Component {
  state = {
    selectedOption: ""
  };
  handleOptionChange = e => {
    let selectedOption = e.currentTarget.value;
    this.setState({ selectedOption: selectedOption });
  };
  render() {
    return (
      <div className="container-fluid">
        <div className="row justify-content-sm-center">
          <div className="col-sm-4 mt-3 signUp">
            <h4 className="my-2">Create your Account</h4>
            <form>
              <div className="row">
                <div className="form-group col-sm-6">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    id="firstName"
                  />
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    id="lastName"
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-sm-12">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="password"
                />
              </div>
              <div className="radio">
                <label>You are a: </label>
                <label className="px-2">
                  <input
                    className="mr-2"
                    type="radio"
                    value="Buyer"
                    checked={this.state.selectedOption === "Buyer"}
                    onChange={this.handleOptionChange}
                  />
                  Buyer
                </label>
                <label className="px-2">
                  <input
                    className="mr-2"
                    type="radio"
                    value="Owner"
                    checked={this.state.selectedOption === "Owner"}
                    onChange={this.handleOptionChange}
                  />
                  Owner
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
