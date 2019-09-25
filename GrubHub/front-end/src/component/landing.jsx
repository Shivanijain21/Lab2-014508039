import React from "react";
import { Link } from "react-router-dom";
import image from "../Images/grubhub.png";
import Navbar from "./navbar";

const Landing = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="row">
            <div className="col-sm-6 image-container">
              <img src={image} className="burger-image" />
            </div>
            <div className="col-sm-6 text-center">
              <div className="row">
                <Link to="/login">
                  <button className="btn btn-link">SignIn</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
