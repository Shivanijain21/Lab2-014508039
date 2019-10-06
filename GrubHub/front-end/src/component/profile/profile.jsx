import React from "react";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import Navbar from "../navbar";
import BuyerProfile from "./buyerProfile";
import OwnerProfile from "./ownerProfile";
import ImageUploader from "../imageUploader";
import { Container, Row } from "react-bootstrap";

const Profile = () => {
  let profileComponent = null;
  let redirectVar = null;
  if (cookie.load("Buyer") || cookie.load("Owner")) {
    if (cookie.load("Buyer")) profileComponent = <BuyerProfile />;
    else profileComponent = <OwnerProfile />;
  } else {
    redirectVar = <Redirect to="/login" />;
  }
  return (
    <div className="container-fluid">
      {redirectVar}
      <Navbar />
      <Container>
        <Row>
          <br />
          <div className="col-sm-3 mt-3">
            <ImageUploader />
          </div>
          <div class="col-sm-9 mt-3">{profileComponent}</div>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
